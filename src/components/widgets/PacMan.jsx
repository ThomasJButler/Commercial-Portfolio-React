import "./PacMan.scss"
import React, {useEffect, useState} from 'react'

function PacMan({ className = "", color = "pacman-color-variant-loader", hidden = false }) {
    const hiddenClass = hidden ?
        `pacman-wrapper-hidden` : ``

    return (
        <div className={`pacman-wrapper ${className} ${hiddenClass}`}>
            <div className={`pacman ${color}`}>
                <div className={`pacman-content`}>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

PacMan.ColorVariants = {
    LOADER: "pacman-color-variant-loader"
}

export default PacMan