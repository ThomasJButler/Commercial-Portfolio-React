import "./ArticleSkills.scss"
import React, {useEffect, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import {useUtils} from "/src/hooks/utils.js"
import Collapsable from "/src/components/capabilities/Collapsable.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useConstants} from "/src/hooks/constants.js"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import {useLocation} from "/src/providers/LocationProvider.jsx"
import NumberAnimation from "/src/components/generic/NumberAnimation.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkills({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-skills`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleSkillsItems dataWrapper={dataWrapper}
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
function ArticleSkillsItems({ dataWrapper, selectedItemCategoryId }) {
    const constants = useConstants()
    const utils = useUtils()
    const viewport = useViewport()

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const customBreakpoint = viewport.getCustomBreakpoint(constants.SWIPER_BREAKPOINTS_FOR_THREE_SLIDES)
    const customBreakpointId = customBreakpoint?.id
    const customBreakpointRowThreshold = customBreakpoint?.slidesPerView || 1

    const maxItemsPerRow = utils.number.clamp(dataWrapper.settings.maxItemsPerRow, 1, customBreakpointRowThreshold)
    const maxRowsCollapseThreshold = dataWrapper.settings.maxRowsCollapseThreshold

    const itemsPerRowClass = `article-skills-items-${Math.min(customBreakpointRowThreshold, maxItemsPerRow)}-per-row`

    const initialVisibleItemsCount = maxRowsCollapseThreshold ?
        maxItemsPerRow * maxRowsCollapseThreshold :
        filteredItems.length

    return (
        <Collapsable className={`article-skills-items ${itemsPerRowClass}`}
                     id={dataWrapper.uniqueId}
                     breakpointId={customBreakpointId}
                     initialVisibleItems={initialVisibleItemsCount}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleSkillsItem itemWrapper={itemWrapper}
                                   key={key}/>
            ))}
        </Collapsable>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkillsItem({ itemWrapper }) {
    const avatarViewClass = itemWrapper.articleWrapper.settings.roundIcons ?
        `article-skills-item-avatar-round` :
        ``

    return (
        <div className={`article-skills-item`}>
            <div className={`article-skills-item-avatar-wrapper`}>
                <AvatarView src={itemWrapper.img}
                            faIcon={itemWrapper.faIconWithFallback}
                            style={itemWrapper.faIconStyle}
                            alt={itemWrapper.imageAlt}
                            className={`article-skills-item-avatar ${avatarViewClass}`}/>
            </div>

            <ArticleSkillsItemInfo itemWrapper={itemWrapper}/>
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkillsItemInfo({ itemWrapper }) {
    const utils = useUtils()
    const location = useLocation()

    const percentage = itemWrapper.percentage
    const initialPercentage = location.getActiveSection()?.id === itemWrapper.articleWrapper.sectionId ?
        percentage :
        0

    const [animationPercentage, setAnimationPercentage] = useState(initialPercentage)

    const level = itemWrapper.locales.level
    const description = itemWrapper.locales.text
    const experienceTime = itemWrapper.dateStartDisplayAsExperienceTime

    const displayLevel = utils.string.if(level, ` - ${level}`)
    const hasPercentage = utils.number.isValidNumber(percentage)

    const progressStyle = {
        width: `${utils.string.toDisplayPercentage(animationPercentage)}`,
        opacity: percentage ? 0.25 + percentage/75 : 0
    }

    let descriptionClass = `text-3`
    if(percentage) descriptionClass = `text-2`
    if(!experienceTime) descriptionClass += ` mt-1`

    useEffect(() => {
        setAnimationPercentage(initialPercentage)
    }, [location.getActiveSection()])

    return (
        <div className={`article-skills-item-info`}>
            <div className={`article-skills-item-title text-5`}>
                <div className={`article-skills-item-title-left-column`}>
                    <span className={`article-skills-item-title-main`}
                          dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>

                    {displayLevel && (
                        <span className={`article-skills-item-title-suffix text-5`}
                              dangerouslySetInnerHTML={{__html: displayLevel}}/>
                    )}
                </div>

                <div className={`article-skills-item-title-right-column`}>
                    {percentage && (
                        <NumberAnimation className={`article-skills-item-title-percentage text-3`}
                                         id={`article-skills-item-title-percentage-${itemWrapper.uniqueId}`}
                                         initialValue={initialPercentage}
                                         targetValue={animationPercentage}
                                         format={`{n}%`}/>
                    )}
                </div>
            </div>

            {hasPercentage && (
                <div className="article-skills-item-progress progress">
                    <div className="progress-bar"
                         role="progressbar"
                         aria-valuenow={animationPercentage}
                         aria-valuemin={0}
                         aria-valuemax={100}
                         style={progressStyle}/>
                </div>
            )}

            {experienceTime && (
                <div className={`article-skills-item-experience text-2`}>
                    <span dangerouslySetInnerHTML={{__html: experienceTime}}/>
                </div>
            )}

            {description && (
                <div className={`article-skills-item-description ${descriptionClass}`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
            )}
        </div>
    )
}

export default ArticleSkills
