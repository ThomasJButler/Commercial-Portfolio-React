import "./ArticleStack.scss"
import React, {useEffect, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import Transitionable from "/src/components/capabilities/Transitionable.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useTheme} from "/src/providers/ThemeProvider.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleStack({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-stack`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleStackItems dataWrapper={dataWrapper}
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
function ArticleStackItems({ dataWrapper, selectedItemCategoryId }) {
    const language = useLanguage()
    const theme = useTheme()

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const refreshFlag = selectedItemCategoryId + "::" + language.getSelectedLanguage()?.id + "-" + theme.getSelectedTheme()?.id

    if(dataWrapper.categories?.length) {
        return (
            <Transitionable id={dataWrapper.uniqueId}
                            refreshFlag={refreshFlag}
                            delayBetweenItems={30}
                            animation={Transitionable.Animations.POP}
                            className={`article-stack-items`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticleStackItem itemWrapper={itemWrapper}
                                      key={key}/>
                ))}
            </Transitionable>
        )
    }
    else {
        return (
            <div className={`article-stack-items`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticleStackItem itemWrapper={itemWrapper}
                                      key={key}/>
                ))}
            </div>
        )
    }
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleStackItem({ itemWrapper }) {
    return (
        <div className={`article-stack-item`}>
            <AvatarView src={itemWrapper.img}
                        faIcon={itemWrapper.faIconWithFallback}
                        style={itemWrapper.faIconStyle}
                        alt={itemWrapper.imageAlt}
                        className={`article-stack-item-avatar`}/>

            <div className={`article-stack-item-title`}
                dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>

            {itemWrapper.dateStartDisplayAsExperienceTime && (
                <div className={`article-stack-item-experience`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.dateStartDisplayAsExperienceTime}}/>
            )}

            {itemWrapper.locales.text && (
                <div className={`article-stack-item-experience`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
            )}
        </div>
    )
}

export default ArticleStack
