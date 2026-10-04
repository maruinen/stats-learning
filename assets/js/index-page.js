import { getPopulatedCategories, loadLearningData } from './items-repository.js';

const searchInput = document.querySelector('#search-input');
const categoryFilter = document.querySelector('#category-filter');
const itemList = document.querySelector('#item-list');
const statusMessage = document.querySelector('#status-message');
const sequentialModeLink = document.querySelector('#sequential-mode-link');
let learningData;

/**
 * Generates a new seed for a sequential study session.
 *
 * @returns {number} Unsigned 32-bit seed.
 */
function generateStudySeed() {
    if (window.crypto?.getRandomValues) {
        return window.crypto.getRandomValues(new Uint32Array(1))[0];
    }
    return Date.now() >>> 0;
}

sequentialModeLink.addEventListener('click', (event) => {
    event.preventDefault();
    const url = new URL(sequentialModeLink.href);
    url.searchParams.set('seed', String(generateStudySeed()));
    url.searchParams.set('position', '0');
    window.location.assign(url);
});

/**
 * Escapes text before it is inserted into an HTML attribute.
 *
 * @param {string} value Text to escape.
 * @returns {string} Escaped text.
 */
function escapeAttribute(value) {
    return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

/**
 * Returns whether an item matches the current search query.
 *
 * @param {object} item Learning item to evaluate.
 * @param {string} query Normalized query text.
 * @returns {boolean} Whether the item matches the query.
 */
function matchesQuery(item, query) {
    if (!query) {
        return true;
    }

    return [item.title, item.summary, ...item.tags]
        .join(' ')
        .toLocaleLowerCase('ja-JP')
        .includes(query);
}

/**
 * Renders the category filter with all populated categories.
 *
 * @param {{categories: Array, items: Array}} data Learning-item data.
 * @returns {void}
 */
function renderCategoryFilter(data) {
    for (const category of getPopulatedCategories(data)) {
        const option = document.createElement('option');
        const count = data.items.filter((item) => item.categoryId === category.id).length;
        option.value = category.id;
        option.textContent = `${category.name} (${count})`;
        categoryFilter.append(option);
    }
}

/**
 * Renders the current learning-item results.
 *
 * @returns {void}
 */
function renderItems() {
    const query = searchInput.value.trim().toLocaleLowerCase('ja-JP');
    const selectedCategoryId = categoryFilter.value;
    const filteredItems = learningData.items.filter((item) => (
        (selectedCategoryId === 'all' || item.categoryId === selectedCategoryId)
        && matchesQuery(item, query)
    ));

    itemList.replaceChildren();
    for (const category of getPopulatedCategories(learningData)) {
        const categoryItems = filteredItems.filter((item) => item.categoryId === category.id);
        if (categoryItems.length === 0) {
            continue;
        }

        const section = document.createElement('section');
        section.className = 'category-section';
        const heading = document.createElement('h2');
        heading.textContent = category.name;
        const description = document.createElement('p');
        description.className = 'category-description';
        description.textContent = category.description;
        const grid = document.createElement('div');
        grid.className = 'card-grid';

        for (const item of categoryItems) {
            const card = document.createElement('a');
            card.className = 'card item-card';
            card.href = `study.html?id=${encodeURIComponent(item.id)}`;
            card.innerHTML = `
                <h3>${escapeAttribute(item.title)}</h3>
                <p>${escapeAttribute(item.summary)}</p>
                <span class="card-count">${item.cards.length}枚のカード</span>
                <span class="tag-list">${item.tags.map((tag) => `<span class="tag">${escapeAttribute(tag)}</span>`).join('')}</span>
            `;
            grid.append(card);
        }

        section.append(heading, description, grid);
        itemList.append(section);
    }

    statusMessage.textContent = filteredItems.length === 0
        ? '条件に一致する学習項目はありません。'
        : `${filteredItems.length}件の学習項目`;
}

/**
 * Displays an item-data loading error.
 *
 * @param {Error} error Error raised while loading data.
 * @returns {void}
 */
function showError(error) {
    statusMessage.textContent = error.message;
    itemList.replaceChildren();
}

/**
 * Initializes the learning-item list page.
 *
 * @returns {Promise<void>} A promise that resolves after rendering the page.
 */
async function init() {
    try {
        learningData = await loadLearningData();
        renderCategoryFilter(learningData);
        searchInput.addEventListener('input', renderItems);
        categoryFilter.addEventListener('change', renderItems);
        renderItems();
    } catch (error) {
        showError(error);
    }
}

init();
