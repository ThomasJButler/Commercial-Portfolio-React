import "./PropList.scss"
import React, {useEffect, useState} from 'react'
import {useViewport} from "/src/providers/ViewportProvider.jsx"

function PropList({ children, className = ``, inlineBreakpoint = `xl` }) {
    const viewport = useViewport()

    const isInline = viewport.isBreakpoint(inlineBreakpoint)
    const inlineClass = isInline ?
        `prop-list-inline` :
        ``

    return (
        <ul className={`prop-list ${inlineClass} ${className}`}>
            {children}
        </ul>
    )
}

function PropListItem({ children, type, value, faIcon, iconSpacing = 25, className = `` }) {
    return (
        <li className={`prop-list-item ${className}`}>
            <i className={`fa-icon ${faIcon}`} style={{minWidth: iconSpacing}}/>

            {type === PropListItem.Types.SINGLE && (
                <span dangerouslySetInnerHTML={{__html: value}}/>
            )}

            {type === PropListItem.Types.INTERVAL && (
                <>
                    <span dangerouslySetInnerHTML={{__html: value[0]}}/>
                    <i className={`fa-solid fa-arrow-right-long mx-1 mx-sm-2 text-1 prop-list-separator`}/>
                    <span dangerouslySetInnerHTML={{__html: value[1]}}/>
                </>
            )}

            {type === PropListItem.Types.DUO && (
                <>
                    <span dangerouslySetInnerHTML={{__html: value[0]}}/>
                    <span className={`mx-1 px-1 px-sm-0 mx-sm-2 prop-list-separator`}>·</span>
                    <span dangerouslySetInnerHTML={{__html: value[1]}}/>
                </>
            )}
        </li>
    )
}

PropListItem.Types = {
    DUO: "prop-list-item-duo",
    INTERVAL: "prop-list-item-interval",
    SINGLE: "prop-list-item-single"
}

export {PropList, PropListItem}