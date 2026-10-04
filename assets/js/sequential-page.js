import { loadLearningData } from './items-repository.js';

const categoryElement = document.querySelector('#sequential-category');
const titleElement = document.querySelector('#sequential-title');
const progressElement = document.querySelector('#sequential-progress');
const errorElement = document.querySelector('#sequential-error');
const cardElement = document.querySelector('#sequential-card');
const labelElement = document.querySelector('#sequential-label');
const promptElement = document.querySelector('#sequential-prompt');
const revealButton = document.querySelector('#sequential-reveal');
const answerElement = document.querySelector('#sequential-answer');
const navigationElement = document.querySelector('.sequence-navigation');
const previousButton = document.querySelector('#previous-card');
const nextButton = document.querySelector('#next-card');
let cards;
let position = 0;

/**
 * Creates a seeded pseudo-random generator.
 *
 * @param {number} seed Initial generator state.
 * @returns {() => number} Function returning a value in the [0, 1) range.
 */
function createRandomGenerator(seed) {
    let state = seed >>> 0;
    return () => {
        state = (state * 1664525 + 1013904223) >>> 0;
        return state / 2 ** 32;
    };
}

/**
 * Shuffles values in place using a seeded generator.
 *
 * @param {Array} values Values to shuffle.
 * @param {() => number} random Random value generator.
 * @returns {void}
 */
function shuffle(values, random) {
    for (let index = values.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(random() * (index + 1));
        [values[index], values[swapIndex]] = [values[swapIndex], values[index]];
    }
}

/**
 * Generates a new seed using the browser cryptographic random source.
 *
 * @returns {number} Unsigned 32-bit seed.
 */
function generateSeed() {
    if (window.crypto?.getRandomValues) {
        return window.crypto.getRandomValues(new Uint32Array(1))[0];
    }
    return Date.now() >>> 0;
}

/**
 * Returns the URL seed, creating one for a new study session when absent.
 *
 * @returns {{seed: number, isNew: boolean}} Seed and whether it was generated now.
 */
function getSeed() {
    const url = new URL(window.location.href);
    const seedText = url.searchParams.get('seed');
    const seed = Number(seedText);
    const isNewSession = url.searchParams.get('new') === '1';
    if (!isNewSession && Number.isInteger(seed) && seed >= 0 && seed <= 0xffffffff) {
        return { seed, isNew: false };
    }

    const newSeed = generateSeed();
    url.searchParams.set('seed', String(newSeed));
    url.searchParams.set('position', '0');
    window.history.replaceState(null, '', url);
    return { seed: newSeed, isNew: true };
}

/**
 * Returns the first card key in an item-group sequence.
 *
 * @param {Array[]} groups Contiguous item groups.
 * @returns {string} First card key.
 */
function getFirstCardKey(groups) {
    const firstEntry = groups[0][0];
    return `${firstEntry.itemId}:${firstEntry.cardId}`;
}

/**
 * Shuffles item groups and avoids repeating the previous session's first card.
 *
 * @param {Array[]} sourceGroups Item groups from the static sequence.
 * @param {number} seed Initial seed.
 * @param {boolean} isNewSession Whether this is a newly started session.
 * @returns {{groups: Array[], seed: number}} Shuffled groups and effective seed.
 */
function createStudyOrder(sourceGroups, seed, isNewSession) {
    const previousFirstCard = window.localStorage.getItem('stats-learning:first-card');
    let effectiveSeed = seed;
    let groups;
    for (let attempt = 0; attempt < 20; attempt += 1) {
        groups = sourceGroups.map((group) => [...group]);
        shuffle(groups, createRandomGenerator(effectiveSeed));
        if (!isNewSession || groups.length < 2 || getFirstCardKey(groups) !== previousFirstCard) {
            return { groups, seed: effectiveSeed };
        }
        effectiveSeed = generateSeed();
    }
    [groups[0], groups[1]] = [groups[1], groups[0]];
    return { groups, seed: effectiveSeed };
}

/**
 * Groups contiguous static-sequence entries by item.
 *
 * @param {Array} entries Static sequence entries.
 * @returns {Array[]} Item groups.
 */
function groupSequenceEntries(entries) {
    const groups = [];
    for (const entry of entries) {
        const currentGroup = groups.at(-1);
        if (!currentGroup || currentGroup[0].itemId !== entry.itemId) {
            groups.push([entry]);
        } else {
            currentGroup.push(entry);
        }
    }
    return groups;
}

/**
 * Converts a formula-only inline TeX answer to display TeX.
 *
 * @param {string} answer Answer text.
 * @returns {string} Formatted answer text.
 */
function formatAnswerForDisplay(answer) {
    const trimmedAnswer = answer.trim();
    if (trimmedAnswer.startsWith('\\(') && trimmedAnswer.endsWith('\\)')) {
        return `\\[${trimmedAnswer.slice(2, -2)}\\]`;
    }
    return answer;
}

/**
 * Typesets the currently visible answer.
 *
 * @returns {Promise<void>} A promise resolved after MathJax processing.
 */
async function typesetAnswer() {
    if (window.MathJax?.typesetPromise) {
        await window.MathJax.typesetPromise([answerElement]);
    }
}

/**
 * Updates the URL position without adding browser history entries.
 *
 * @returns {void}
 */
function updateUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set('position', String(position));
    window.history.replaceState(null, '', url);
}

/**
 * Renders the current card and its navigation state.
 *
 * @returns {Promise<void>} A promise resolved after rendering.
 */
async function renderCard() {
    const currentCard = cards[position];
    const item = currentCard.item;
    categoryElement.textContent = currentCard.category?.name ?? '';
    titleElement.textContent = item.title;
    labelElement.textContent = currentCard.card.label;
    promptElement.textContent = currentCard.card.prompt;
    answerElement.replaceChildren();
    const answerText = document.createElement('p');
    answerText.textContent = formatAnswerForDisplay(currentCard.card.answer);
    answerElement.append(answerText);
    if (currentCard.card.note) {
        const note = document.createElement('p');
        note.className = 'flashcard-note';
        note.textContent = currentCard.card.note;
        answerElement.append(note);
    }
    answerElement.hidden = true;
    revealButton.textContent = '答えを表示';
    revealButton.setAttribute('aria-expanded', 'false');
    progressElement.textContent = `${position + 1} / ${cards.length}枚`;
    previousButton.disabled = position === 0;
    nextButton.disabled = position === cards.length - 1;
    cardElement.hidden = false;
    navigationElement.hidden = false;
    updateUrl();
}

/**
 * Reads and clamps the requested URL position.
 *
 * @param {number} cardCount Number of cards.
 * @returns {number} Valid card position.
 */
function getInitialPosition(cardCount) {
    const requestedPosition = Number.parseInt(new URLSearchParams(window.location.search).get('position') ?? '0', 10);
    if (!Number.isInteger(requestedPosition)) {
        return 0;
    }
    return Math.min(Math.max(requestedPosition, 0), cardCount - 1);
}

/**
 * Displays an initialization error.
 *
 * @param {string} message Error message.
 * @returns {void}
 */
function showError(message) {
    errorElement.textContent = message;
    errorElement.hidden = false;
    cardElement.hidden = true;
    navigationElement.hidden = true;
}

/**
 * Initializes the sequential flashcard page.
 *
 * @returns {Promise<void>} A promise resolved after initialization.
 */
async function init() {
    try {
        const data = await loadLearningData();
        const sequenceResponse = await fetch('data/study-sequence.json');
        if (!sequenceResponse.ok) {
            throw new Error('単語帳の順序データを読み込めませんでした。');
        }
        const sequence = await sequenceResponse.json();
        const seedInfo = getSeed();
        const sourceGroups = groupSequenceEntries(sequence.cards);
        const studyOrder = createStudyOrder(sourceGroups, seedInfo.seed, seedInfo.isNew);
        const seedUrl = new URL(window.location.href);
        seedUrl.searchParams.set('seed', String(studyOrder.seed));
        seedUrl.searchParams.delete('new');
        window.history.replaceState(null, '', seedUrl);
        const shuffledEntries = studyOrder.groups.flat();
        const itemsById = new Map(data.items.map((item) => [item.id, item]));
        const categoriesById = new Map(data.categories.map((category) => [category.id, category]));
        cards = shuffledEntries.map((entry) => {
            const item = itemsById.get(entry.itemId);
            const card = item?.cards.find((candidate) => candidate.id === entry.cardId);
            if (!item || !card) {
                throw new Error(`単語帳に存在しないカードが指定されています: ${entry.itemId}:${entry.cardId}`);
            }
            return { item, card, category: categoriesById.get(item.categoryId) };
        });
        if (cards.length === 0) {
            throw new Error('単語帳にカードがありません。');
        }
        window.localStorage.setItem('stats-learning:first-card', `${cards[0].item.id}:${cards[0].card.id}`);
        position = getInitialPosition(cards.length);
        await renderCard();
    } catch (error) {
        showError(error.message);
    }
}

revealButton.addEventListener('click', async () => {
    const isHidden = answerElement.hidden;
    answerElement.hidden = !isHidden;
    revealButton.textContent = isHidden ? '答えを隠す' : '答えを表示';
    revealButton.setAttribute('aria-expanded', String(isHidden));
    if (isHidden) {
        await typesetAnswer();
    }
});
previousButton.addEventListener('click', async () => {
    if (position > 0) {
        position -= 1;
        await renderCard();
    }
});
nextButton.addEventListener('click', async () => {
    if (position < cards.length - 1) {
        position += 1;
        await renderCard();
    }
});

init();