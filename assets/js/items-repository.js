/**
 * Loads the canonical learning-item data.
 *
 * @returns {Promise<{version: number, categories: Array, items: Array}>} Parsed item data.
 * @throws {Error} When the data cannot be loaded or has an invalid shape.
 */
export async function loadLearningData() {
    const response = await fetch('data/items.json', { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('学習データを読み込めませんでした。');
    }

    const data = await response.json();

    if (!Array.isArray(data.categories) || !Array.isArray(data.items)) {
        throw new Error('学習データの形式が正しくありません。');
    }

    return data;
}

/**
 * Finds an item using its stable identifier.
 *
 * @param {{items: Array}} data Learning-item data.
 * @param {string | null} itemId Item identifier from the URL.
 * @returns {object | undefined} Matching item, when present.
 */
export function findItemById(data, itemId) {
    return data.items.find((item) => item.id === itemId);
}

/**
 * Returns categories that contain at least one item in display order.
 *
 * @param {{categories: Array, items: Array}} data Learning-item data.
 * @returns {Array} Categories containing learning items.
 */
export function getPopulatedCategories(data) {
    return data.categories
        .filter((category) => data.items.some((item) => item.categoryId === category.id))
        .sort((firstCategory, secondCategory) => firstCategory.order - secondCategory.order);
}
