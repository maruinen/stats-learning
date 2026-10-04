import { readFile } from 'node:fs/promises';

const REQUIRED_ITEM_FIELDS = ['id', 'categoryId', 'title', 'summary', 'tags', 'cards'];
const REQUIRED_CARD_FIELDS = ['id', 'label', 'prompt', 'answer'];

/**
 * Validates the canonical learning-item data.
 *
 * @param {object} data Parsed learning-item data.
 * @returns {string[]} Validation error messages.
 */
function validateLearningData(data) {
    const errors = [];
    const categoryIds = new Set();
    const itemIds = new Set();

    if (!Array.isArray(data.categories) || !Array.isArray(data.items)) {
        return ['categories と items は配列でなければなりません。'];
    }

    for (const category of data.categories) {
        if (!isNonEmptyString(category.id) || !isNonEmptyString(category.name)) {
            errors.push('カテゴリには id と name が必要です。');
            continue;
        }
        if (categoryIds.has(category.id)) {
            errors.push(`カテゴリIDが重複しています: ${category.id}`);
        }
        categoryIds.add(category.id);
    }

    for (const item of data.items) {
        for (const field of REQUIRED_ITEM_FIELDS) {
            if (!(field in item)) {
                errors.push(`項目に ${field} がありません: ${item.id ?? '(IDなし)'}`);
            }
        }
        if (!isNonEmptyString(item.id)) {
            errors.push('項目IDは空でない文字列でなければなりません。');
            continue;
        }
        if (itemIds.has(item.id)) {
            errors.push(`項目IDが重複しています: ${item.id}`);
        }
        itemIds.add(item.id);
        if (!categoryIds.has(item.categoryId)) {
            errors.push(`項目 ${item.id} のカテゴリが存在しません: ${item.categoryId}`);
        }
        if (!Array.isArray(item.tags) || !item.tags.every(isNonEmptyString)) {
            errors.push(`項目 ${item.id} の tags は空でない文字列の配列でなければなりません。`);
        }
        if (!Array.isArray(item.cards) || item.cards.length === 0) {
            errors.push(`項目 ${item.id} には1件以上のカードが必要です。`);
            continue;
        }

        const cardIds = new Set();
        for (const card of item.cards) {
            for (const field of REQUIRED_CARD_FIELDS) {
                if (!isNonEmptyString(card[field])) {
                    errors.push(`項目 ${item.id} のカードに有効な ${field} がありません。`);
                }
            }
            if (cardIds.has(card.id)) {
                errors.push(`項目 ${item.id} 内でカードIDが重複しています: ${card.id}`);
            }
            cardIds.add(card.id);
        }
    }

    for (const item of data.items) {
        for (const relatedItemId of item.relatedItemIds ?? []) {
            if (!itemIds.has(relatedItemId)) {
                errors.push(`項目 ${item.id} の関連項目が存在しません: ${relatedItemId}`);
            }
        }
    }

    return errors;
}

/**
 * Returns whether a value is a non-empty string.
 *
 * @param {unknown} value Value to evaluate.
 * @returns {boolean} Whether the value is a non-empty string.
 */
function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Reads and validates the canonical data, reporting errors to stderr.
 *
 * @returns {Promise<void>} A promise that resolves on successful validation.
 */
async function main() {
    const rawData = await readFile(new URL('../data/items.json', import.meta.url), 'utf8');
    const data = JSON.parse(rawData);
    const errors = validateLearningData(data);

    if (errors.length > 0) {
        for (const error of errors) {
            console.error(`- ${error}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(`学習データは有効です: ${data.categories.length}カテゴリ、${data.items.length}項目`);
}

main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
