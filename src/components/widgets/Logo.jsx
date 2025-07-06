import "./Logo.scss"
import React, {useEffect, useState} from 'react'
import {useUtils} from "/src/hooks/utils.js"

function Logo({ className = "", style = {}, size, setDidLoad }) {
    const utils = useUtils()

    className = className || ``
    size = utils.number.forceIntoBounds(size, 0, 3, 3)

    const sizeClass = `logo-wrapper-size-${size}`

    return (
        <div className={`logo-wrapper ${sizeClass} ${className}`}
             style={style}>
            <img src={utils.file.resolvePath(`/images/svg/logo.svg`)}
                 onLoad={() => { setDidLoad && setDidLoad(true) }}
                 alt={`logo`}/>
        </div>
    )
}

export default Logo