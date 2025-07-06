import "./Collapsable.scss"
import React, {useEffect, useState} from 'react'
import {useUtils} from "/src/hooks/utils.js"
import StandardButton from "/src/components/buttons/StandardButton.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

function Collapsable({ children, id, breakpointId, initialVisibleItems = 0, itemsPerStep = 0, className = "", trailingItemComponent = null }) {
    const utils = useUtils()
    const language = useLanguage()

    const [visibleItems, setVisibleItems] = useState(0)

    const totalItems = children?.length
    const canExpand = visibleItems && totalItems && visibleItems < totalItems

    /** @listens children **/
    useEffect(() => {
        Collapsable.savedStates = Collapsable.savedStates || {}
        Collapsable.savedStates[id] = Collapsable.savedStates[id] || {}

        const initialAmount = Collapsable.savedStates[id][breakpointId] || initialVisibleItems
        _updateVisibleItemsCount(initialAmount)
    }, [null, breakpointId])

    const _updateVisibleItemsCount = (visibleItems) => {
        const clamped = utils.number.clamp(visibleItems, 0, totalItems)
        setVisibleItems(clamped)
        Collapsable.savedStates[id][breakpointId] = clamped
    }

    const _expand = () => {
        const increment = itemsPerStep || totalItems
        _updateVisibleItemsCount(visibleItems + increment)
    }

    return (
        <div className={`collapsable`}>
            <div className={`collapsable-content ${className}`}>
                {children?.slice(0, visibleItems).map((child, key) => (
                    <div className={`collapsable-item`} key={key}>
                        {child}
                    </div>
                ))}

                {trailingItemComponent && (() => {
                    const Component = trailingItemComponent
                    return <Component hasMore={visibleItems < totalItems}/>
                })()}
            </div>

            {Boolean(canExpand) && (
                <div className={`collapsable-menu`}>
                    <StandardButton variant={`contrast`}
                                    faIcon={`fa-solid fa-caret-down`}
                                    label={language.getString("see_more")}
                                    tooltip={language.getString("see_more")}
                                    onClick={_expand}/>
                </div>
            )}
        </div>
    )
}

export default Collapsable