import "./NavLinkList.scss"
import React, {useEffect, useState} from 'react'
import Nav from "/src/components/nav/base/Nav.jsx"
import GestureAwareButton from "/src/components/buttons/GestureAwareButton.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useUtils} from "/src/hooks/utils.js"

function NavLinkList({ links, expanded }) {
    const viewport = useViewport()
    const utils = useUtils()

    const data = {expanded}
    const shrinkClass = expanded ?
        `` :
        `nav-link-list-shrink`

    useEffect(() => {
        const navLinkList = document.querySelector(`.nav-link-list`)
        const navLinks = document.querySelectorAll(`.nav-link-list .nav-link`)

        const totalHeight = navLinkList?.clientHeight - 10
        const amountOfItems = navLinks?.length || 0
        if(!totalHeight || !amountOfItems)
            return

        const targetItemHeight = utils.number.clamp(Math.floor(totalHeight / amountOfItems), 39, 52)
        navLinks.forEach((link) => {
            const currentHeight = link.clientHeight
            if(currentHeight !== targetItemHeight) {
                link.style.height = `${targetItemHeight}px`
            }
        })
    }, [null, viewport.innerHeight, expanded])

    return (
        <Nav links={links}
             data={data}
             tag={`nav-link-list`}
             className={`nav-link-list ${shrinkClass}`}
             itemComponent={NavLink}/>
    )
}

function NavLink({ link, active, data, onClick }) {
    const activeClass = active ?
        `nav-link-active` :
        ``
    const tooltip = data.expanded ?
        null :
        link.label

    return (
        <GestureAwareButton className={`nav-link ${activeClass}`}
                            hrefToolTip={link.href}
                            tooltip={tooltip}
                            onClick={onClick}>
            <i className={`${link.faIcon}`}/>
            <span dangerouslySetInnerHTML={{__html: link.label}}/>
        </GestureAwareButton>
    )
}

export default NavLinkList