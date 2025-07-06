import "./LayoutNavigation.scss"
import React, {useEffect, useState} from 'react'
import NavSidebar from "/src/components/nav/NavSidebar.jsx"
import NavTabController from "/src/components/nav/NavTabController.jsx"
import NavHeaderMobile from "/src/components/nav/NavHeaderMobile.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import NavLinkPillsFixed from "/src/components/nav/partials/NavLinkPillsFixed.jsx"

function LayoutNavigation({ children, profile = null, sectionLinks = [], categoryLinks = [] }) {
    const viewport = useViewport()

    const isMobileLayout = viewport.isMobileLayout()
    const targetCategoryId = categoryLinks.find(link => link.active)?.id
    const currentCategorySectionLinks = sectionLinks.filter(link => link.categoryId === targetCategoryId)

    const shouldAddFooterOffset = viewport.getLayoutConstraints()?.shouldAddFooterOffset
    const offsetClass = shouldAddFooterOffset ? `layout-navigation-children-wrapper-with-offset` : ``

    return (
        <div className={`layout-navigation-wrapper`}>
            {!isMobileLayout && (
                <NavSidebar profile={profile}
                            links={sectionLinks}/>
            )}

            {isMobileLayout && (
                <>
                    <NavLinkPillsFixed links={currentCategorySectionLinks}/>
                    <NavHeaderMobile profile={profile}
                                     links={currentCategorySectionLinks}/>
                </>
            )}

            <div className={`layout-navigation-children-wrapper ${offsetClass}`}>
                {children}
            </div>

            {isMobileLayout && (
                <NavTabController links={categoryLinks}/>
            )}
        </div>
    )
}

export default LayoutNavigation