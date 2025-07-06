import "./Layout.scss"
import React, {useEffect, useState} from 'react'
import LayoutAnimatedBackground from "/src/components/layout/LayoutAnimatedBackground.jsx"

function Layout({ id, children, animatedBackgroundEnabled }) {
    return (
        <div id={id}
             className={`layout`}>

            {animatedBackgroundEnabled && (
                <LayoutAnimatedBackground/>
            )}

            <div className={`layout-content`}>
                {children}
            </div>
        </div>
    )
}

export default Layout