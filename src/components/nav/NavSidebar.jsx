import "./NavSidebar.scss"
import React, {useEffect, useState} from 'react'
import {Card} from "react-bootstrap"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useConstants} from "/src/hooks/constants.js"
import NavProfileCard from "/src/components/nav/partials/NavProfileCard.jsx"
import NavLinkList from "/src/components/nav/partials/NavLinkList.jsx"
import NavToolList from "/src/components/nav/partials/NavToolList.jsx"
import NavToolShrinkToggle from "/src/components/nav/tools/NavToolShrinkToggle.jsx"
import {useInput} from "/src/providers/InputProvider.jsx"

function NavSidebar({ profile, links }) {
    const constants = useConstants()
    const viewport = useViewport()
    const input = useInput()

    const [expandedOption, setExpandedOption] = useState(true)

    const shouldForceShrink = !viewport.isBreakpoint("lg")
    const expanded = !shouldForceShrink && expandedOption
    const shrinkClass = expanded ?
        `` :
        `nav-sidebar-shrink`

    useEffect(() => {
        if(shouldForceShrink)
            return

        const keyId = input.lastKeyPressed.id
        if(keyId === "ArrowLeft") setExpandedOption(false)
        else if(keyId === "ArrowRight") setExpandedOption(true)
    }, [input.lastKeyPressed])

    return (
        <nav className={`nav-sidebar ${constants.HTML_CLASSES.scrollbarDecorator} ${shrinkClass}`}>
            <Card className={`nav-sidebar-card-wrapper`}>
                {!shouldForceShrink && (
                    <NavToolShrinkToggle expanded={expandedOption}
                                         setExpanded={setExpandedOption}/>
                )}

                <NavProfileCard profile={profile}
                                expanded={expanded}/>

                <NavLinkList links={links}
                             expanded={expanded}/>

                <NavToolList expanded={expanded}/>
            </Card>
        </nav>
    )
}

export default NavSidebar