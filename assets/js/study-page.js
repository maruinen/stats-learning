import { findItemById, loadLearningData } from './items-repository.js';

const titleElement = document.querySelector('#title');
const categoryElement = document.querySelector('#category-name');
const summaryElement = document.querySelector('#summary');
const cardsElement = document.querySelector('#flashcard-list');
const relatedItemsElement = document.querySelector('#related-items');
const errorElement = document.querySelector('#study-error');

/**
 * Renders MathJax for an answer only once after it becomes visible.
 *
 * @param {HTMLElement} element Newly visible answer element.
 * @returns {Promise<void>} A promise that resolves after MathJax processing.
 */
async function typesetMath(element) {
    if (element.dataset.mathTypeset === 'true') {
        return;
    }

    if (window.MathJax?.typesetPromise) {
        await window.MathJax.typesetPromise([element]);
        element.dataset.mathTypeset = 'true';
        return;
    }

    window.addEventListener('load', async () => {
        await window.MathJax?.typesetPromise([element]);
        element.dataset.mathTypeset = 'true';
    }, { once: true });
}

/**
 * Shows a recoverable error message on the study page.
 *
 * @param {string} message Message to display.
 * @returns {void}
 */
function showError(message) {
    titleElement.textContent = '学習項目を表示できません';
    errorElement.textContent = message;
    errorElement.hidden = false;
    summaryElement.hidden = true;
    cardsElement.replaceChildren();
    relatedItemsElement.hidden = true;
}

/**
 * Converts a formula-only inline TeX answer to display TeX.
 *
 * @param {string} answer Flashcard answer text.
 * @returns {string} Answer text formatted for MathJax.
 */
function formatAnswerForDisplay(answer) {
    const trimmedAnswer = answer.trim();
    if (trimmedAnswer.startsWith('\\(') && trimmedAnswer.endsWith('\\)')) {
        const formula = trimmedAnswer.slice(2, -2);
        if (!formula.includes('\\(') && !formula.includes('\\)')) {
            return `\\[${formula}\\]`;
        }
    }

    return answer;
}

/**
 * Creates one expandable flashcard.
 *
 * @param {{label: string, prompt: string, answer: string, note?: string}} card Card data.
 * @returns {HTMLElement} Flashcard element.
 */
function createFlashcard(card) {
    const article = document.createElement('article');
    article.className = 'flashcard';
    const label = document.createElement('p');
    label.className = 'flashcard-label';
    label.textContent = card.label;
    const prompt = document.createElement('h2');
    prompt.textContent = card.prompt;
    const answer = document.createElement('div');
    answer.className = 'flashcard-answer';
    answer.hidden = true;
    const answerText = document.createElement('p');
    answerText.textContent = formatAnswerForDisplay(card.answer);
    answer.append(answerText);
    if (card.note) {
        const note = document.createElement('p');
        note.className = 'flashcard-note';
        note.textContent = card.note;
        answer.append(note);
    }

    const revealButton = document.createElement('button');
    revealButton.className = 'reveal-button';
    revealButton.type = 'button';
    revealButton.textContent = '答えを表示';
    revealButton.setAttribute('aria-expanded', 'false');
    revealButton.addEventListener('click', async () => {
        const isHidden = answer.hidden;
        answer.hidden = !isHidden;
        revealButton.textContent = isHidden ? '答えを隠す' : '答えを表示';
        revealButton.setAttribute('aria-expanded', String(isHidden));
        if (isHidden) {
            await typesetMath(answer);
        }
    });

    article.append(label, prompt, revealButton, answer);
    return article;
}

/**
 * Renders links to related learning items.
 *
 * @param {{items: Array}} data Learning-item data.
 * @param {string[]} relatedItemIds Related item identifiers.
 * @returns {void}
 */
function renderRelatedItems(data, relatedItemIds) {
    const relatedItems = relatedItemIds
        .map((relatedItemId) => findItemById(data, relatedItemId))
        .filter(Boolean);

    relatedItemsElement.replaceChildren();
    if (relatedItems.length === 0) {
        relatedItemsElement.hidden = true;
        return;
    }

    const heading = document.createElement('h2');
    heading.textContent = '関連項目';
    const list = document.createElement('ul');
    list.className = 'related-item-list';
    for (const relatedItem of relatedItems) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `study.html?id=${encodeURIComponent(relatedItem.id)}`;
        link.textContent = relatedItem.title;
        listItem.append(link);
        list.append(listItem);
    }
    relatedItemsElement.append(heading, list);
    relatedItemsElement.hidden = false;
}

/**
 * Initializes the study page for the requested learning item.
 *
 * @returns {Promise<void>} A promise that resolves after rendering the page.
 */
async function init() {
    const itemId = new URLSearchParams(window.location.search).get('id');
    if (!itemId) {
        showError('項目IDが指定されていません。一覧から学習項目を選択してください。');
        return;
    }

    try {
        const data = await loadLearningData();
        const item = findItemById(data, itemId);
        if (!item) {
            showError('指定された学習項目は見つかりませんでした。');
            return;
        }

        const category = data.categories.find((candidate) => candidate.id === item.categoryId);
        document.title = `${item.title} - 統計学学習ツール`;
        titleElement.textContent = item.title;
        categoryElement.textContent = category?.name ?? '';
        summaryElement.textContent = item.summary;
        cardsElement.replaceChildren(...item.cards.map(createFlashcard));
        renderRelatedItems(data, item.relatedItemIds ?? []);
    } catch (error) {
        showError(error.message);
    }
}

init();
