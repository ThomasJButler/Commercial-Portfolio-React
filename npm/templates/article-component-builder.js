export default function makeArticleComponent(componentName, slug) {

/** ARTICLE FILE TEMPLATE **/
return `import "./${componentName}.scss"
import React, {useEffect, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ${componentName}({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={\`${slug}\`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <${componentName}Items dataWrapper={dataWrapper} 
                                   selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ${componentName}Items({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)

    return (
        <div className={\`${slug}-items\`}>
            {filteredItems.map((itemWrapper, key) => (
                <${componentName}Item itemWrapper={itemWrapper} 
                                      key={key}/>
            ))}
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ${componentName}Item({ itemWrapper }) {
    return (
        <div className={\`${slug}-item\`}>
            {itemWrapper.id}
        </div>
    )
}

export default ${componentName}
`
}