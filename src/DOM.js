/**
 * Вставляет на страницу указанный тег с указанным содержимым указанное число раз.
 * @param {string} tag Имя тега.
 * @param {string} content Содержимое тега.
 * @param {number} count Количество вставок.
 */
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const element = document.createElement(tag);
        element.textContent = content;
        document.body.appendChild(element);
    }
}

/**
 * Создаёт дерево вложенных тегов DIV.
 * Каждый узел дерева содержит childrenCount узлов.
 * Глубина дерева задается параметром level.
 * Каждый элемент имеет класс вида item_n, где n - глубина вложенности элемента.
 * @param {number} childrenCount Количество детей у каждого узла.
 * @param {number} level Глубина дерева.
 * @returns {HTMLElement} Корневой элемент дерева.
 */
export function generateTree(childrenCount, level) {
    function createLevel(currentLevel) {
        const parent = document.createElement('div');
        parent.className = `item_${currentLevel}`;

        if (currentLevel < level) {
            for (let i = 0; i < childrenCount; i++) {
                parent.appendChild(createLevel(currentLevel + 1));
            }
        }

        return parent;
    }

    return createLevel(1);
}

/**
 * Создаёт дерево тегов DIV с вложенностью 3 и числом элементов в каждом узле 2,
 * затем заменяет все узлы второго уровня на теги SECTION.
 * @returns {HTMLElement} Корневой элемент дерева.
 */
export function replaceNodes() {
    const tree = generateTree(2, 3);

    // Поиск и замена узлов второго уровня
    const level2Nodes = tree.querySelectorAll('.item_2');
    level2Nodes.forEach((node) => {
        const section = document.createElement('section');
        section.className = node.className;
        section.innerHTML = node.innerHTML;
        node.replaceWith(section);
    });

    return tree;
}
