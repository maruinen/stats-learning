import { readFile, writeFile } from 'node:fs/promises';

const dataUrl = new URL('../data/items.json', import.meta.url);
const sequenceUrl = new URL('../data/study-sequence.json', import.meta.url);

/**
 * Creates a seeded pseudo-random generator for reproducible group ordering.
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
 * Shuffles an array in place using the supplied random generator.
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
 * Builds a static card sequence while keeping cards in each item contiguous.
 *
 * @param {{categories: Array, items: Array}} data Canonical learning data.
 * @param {{shuffleGroups: boolean, seed: number | null}} options Build options.
 * @returns {object} Generated sequence data.
 */
function buildSequence(data, options) {
    const categoryOrder = new Map(data.categories.map((category) => [category.id, category.order]));
    const groups = [...data.items].sort((firstItem, secondItem) => {
        const categoryDifference = categoryOrder.get(firstItem.categoryId) - categoryOrder.get(secondItem.categoryId);
        return categoryDifference || data.items.indexOf(firstItem) - data.items.indexOf(secondItem);
    });

    if (options.shuffleGroups) {
        shuffle(groups, createRandomGenerator(options.seed));
    }

    return {
        version: 1,
        sourceVersion: data.version,
        orderMode: options.shuffleGroups ? 'shuffled-item-groups' : 'category-and-item-order',
        seed: options.shuffleGroups ? options.seed : null,
        generatedAt: new Date().toISOString(),
        cards: groups.flatMap((item) => item.cards.map((card) => ({ itemId: item.id, cardId: card.id })))
    };
}

/**
 * Parses command-line options for sequence generation.
 *
 * @param {string[]} argumentsList Command-line arguments.
 * @returns {{shuffleGroups: boolean, seed: number | null}} Build options.
 */
function parseOptions(argumentsList) {
    const shuffleGroups = argumentsList.includes('--shuffle-groups');
    const seedArgument = argumentsList.find((argument) => argument.startsWith('--seed='));
    const seed = seedArgument ? Number(seedArgument.slice('--seed='.length)) : null;
    if (shuffleGroups && !Number.isInteger(seed)) {
        throw new Error('--shuffle-groups を使う場合は --seed=<整数> を指定してください。');
    }
    return { shuffleGroups, seed };
}

const options = parseOptions(process.argv.slice(2));
const data = JSON.parse(await readFile(dataUrl, 'utf8'));
const sequence = buildSequence(data, options);
await writeFile(sequenceUrl, `${JSON.stringify(sequence, null, 2)}\n`);
console.log(`単語帳順序を生成しました: ${sequence.cards.length}枚 (${sequence.orderMode})`);