import { readFile } from 'node:fs/promises';

/**
 * Validates that a generated sequence contains each canonical card exactly once.
 *
 * @param {{items: Array}} data Canonical learning data.
 * @param {{cards: Array}} sequence Generated card sequence.
 * @returns {string[]} Validation errors.
 */
function validateSequence(data, sequence) {
    const expectedCards = new Set(data.items.flatMap((item) => item.cards.map((card) => `${item.id}:${card.id}`)));
    const errors = [];
    const actualCards = new Set();

    if (!Array.isArray(sequence.cards)) {
        return ['sequence.cards は配列でなければなりません。'];
    }

    for (const entry of sequence.cards) {
        const key = `${entry.itemId}:${entry.cardId}`;
        if (!expectedCards.has(key)) {
            errors.push(`正本に存在しないカードです: ${key}`);
        }
        if (actualCards.has(key)) {
            errors.push(`カードが重複しています: ${key}`);
        }
        actualCards.add(key);
    }

    for (const key of expectedCards) {
        if (!actualCards.has(key)) {
            errors.push(`カードが順序データにありません: ${key}`);
        }
    }

    return errors;
}

const data = JSON.parse(await readFile(new URL('../data/items.json', import.meta.url), 'utf8'));
const sequence = JSON.parse(await readFile(new URL('../data/study-sequence.json', import.meta.url), 'utf8'));
const errors = validateSequence(data, sequence);
if (errors.length > 0) {
    for (const error of errors) {
        console.error(`- ${error}`);
    }
    process.exitCode = 1;
} else {
    console.log(`単語帳順序は有効です: ${sequence.cards.length}枚`);
}