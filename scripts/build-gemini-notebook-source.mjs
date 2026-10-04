import { mkdir, readFile, writeFile } from 'node:fs/promises';

/**
 * Builds Markdown content for Gemini Notebook from canonical learning data.
 *
 * @param {{categories: Array, items: Array}} data Learning-item data.
 * @returns {string} Markdown source content.
 */
function buildMarkdown(data) {
    const categoryItems = new Map(
        data.categories
            .sort((firstCategory, secondCategory) => firstCategory.order - secondCategory.order)
            .map((category) => [
                category.id,
                data.items.filter((item) => item.categoryId === category.id),
            ]),
    );
    const itemTitles = new Map(data.items.map((item) => [item.id, item.title]));
    const lines = [
        '# 統計学学習資料',
        '',
        'この資料はWebアプリケーションの学習データから生成されています。',
        '',
    ];

    for (const category of data.categories.sort((firstCategory, secondCategory) => firstCategory.order - secondCategory.order)) {
        const items = categoryItems.get(category.id) ?? [];
        if (items.length === 0) {
            continue;
        }

        lines.push(`## ${category.name}`, '', category.description, '');
        for (const item of items) {
            lines.push(`### ${item.title}`, '', item.summary, '');
            for (const card of item.cards) {
                lines.push(`#### ${card.label}`, '', `問い: ${card.prompt}`, '', `答え: ${card.answer}`, '');
                if (card.note) {
                    lines.push(`補足: ${card.note}`, '');
                }
            }
            const relatedTitles = (item.relatedItemIds ?? [])
                .map((relatedItemId) => itemTitles.get(relatedItemId))
                .filter(Boolean);
            if (relatedTitles.length > 0) {
                lines.push(`関連項目: ${relatedTitles.join('、')}`, '');
            }
        }
    }

    return `${lines.join('\n')}\n`;
}

/**
 * Generates a Gemini Notebook source document from canonical learning data.
 *
 * @returns {Promise<void>} A promise that resolves after writing the document.
 */
async function main() {
    const rawData = await readFile(new URL('../data/items.json', import.meta.url), 'utf8');
    const data = JSON.parse(rawData);
    const outputDirectory = new URL('../generated/', import.meta.url);
    const outputFile = new URL('gemini-notebook-source.md', outputDirectory);

    await mkdir(outputDirectory, { recursive: true });
    await writeFile(outputFile, buildMarkdown(data), 'utf8');
    console.log(`Gemini Notebook用資料を生成しました: ${outputFile.pathname}`);
}

main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
