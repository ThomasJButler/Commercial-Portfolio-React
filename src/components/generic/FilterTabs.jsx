import "./FilterTabs.scss"
import React, {useState} from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import SensitiveButton from "/src/components/generic/SensitiveButton"
import {useUtils} from "/src/helpers/utils.js"

function FilterTabs({items, selectedItemId, onSelect}) {
    const utils = useUtils()
    const [lastSelectTime, setLastSelectTime] = useState(0)
    
    const _onTabClicked = (item) => {
        const now = Date.now()
        if (!item || now - lastSelectTime < 50) {
            return
        }
        
        setLastSelectTime(now)
        if(onSelect) {
            onSelect(item.id)
        }
    }

    return (
        <div className="filter-tabs">
            <div className={`btn-group`} role={`group`}>
                {items.map((item, key) => (
                    <FilterTabButton key={key}
                                     item={item}
                                     isSelected={item.id === selectedItemId}
                                     onClick={_onTabClicked}
                                     isTouchDevice={utils.isTouchDevice()}/>
                ))}
            </div>
        </div>
    )
}

function FilterTabButton({item, isSelected, onClick, isTouchDevice}) {
    const {getString} = useLanguage()

    const customBtnClass = isSelected ? `btn-selected` : null
    const hoverClass = isTouchDevice ? `filter-tab-no-hover` : ''
    const tooltipText = getString('filter_by').replace('{x}', item.label)
    const label = item.label + (item.count ? ` (${item.count})` : '')

    const _onClick = (e) => {
        e.preventDefault()
        onClick(item)
    }

    return (
        <SensitiveButton className={`btn btn-primary text-1 ${customBtnClass} ${hoverClass}`}
                         onMouseDown={_onClick}
                         onTouchStart={_onClick}
                         tooltipText={tooltipText}>
            <span>{label}</span>
        </SensitiveButton>
    )
}

export default FilterTabs