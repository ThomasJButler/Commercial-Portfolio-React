import "./NavLinkPillsFixed.scss"
import React, {useEffect, useState} from 'react'
import NavLinkPills from "/src/components/nav/partials/NavLinkPills.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useNavigation} from "/src/providers/NavigationProvider.jsx"

function NavLinkPillsFixed({ links, className = "" }) {
    const navigation = useNavigation()
    const viewport = useViewport()

    const [status, setStatus] = useState(NavLinkPillsFixed.Status.HIDDEN)

    useEffect(() => {
        const navToolsEl = document.querySelector("#nav-link-pills-menu")
        const navToolsElRect = navToolsEl?.getBoundingClientRect()

        if(!navToolsElRect || viewport.innerHeight < 400) {
            setStatus(NavLinkPillsFixed.Status.HIDDEN)
            return
        }

        const navToolsStartY = navToolsElRect.y
        const navToolsEndY = navToolsElRect.y + navToolsElRect.height

        if(navigation.nextSection || navigation.scheduledNextSection) setStatus(NavLinkPillsFixed.Status.HIDING)
        else if(navToolsEndY < 0 && navToolsStartY < 0) setStatus(NavLinkPillsFixed.Status.SHOWN)
        else if(navToolsStartY < 0) setStatus(NavLinkPillsFixed.Status.HIDING)
        else setStatus(NavLinkPillsFixed.Status.HIDDEN)
    }, [viewport.scrollY, navigation.nextSection, navigation.scheduledNextSection])

    return (
        <div className={`nav-link-pills-fixed-wrapper nav-link-pills-fixed-wrapper-${status}`}>
            <NavLinkPills id={"nav-link-pills-fixed"}
                          className={className}
                          links={links}/>
        </div>
    )
}

NavLinkPillsFixed.Status = {
    SHOWN: "shown",
    HIDING: "hiding",
    HIDDEN: "hidden"
}

export default NavLinkPillsFixed