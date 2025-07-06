import "./Tags.scss"
import React, {useEffect, useState} from 'react'
import {useTheme} from "/src/providers/ThemeProvider.jsx"

function Tags({ children, className = "" }) {
    return (
        <ul className={`tags ${className}`}>
            {children}
        </ul>
    )
}

function Tag({ text, variant = "tag-default", className = "" }) {
    const theme = useTheme()
    const [transitionClass, setTransitionClass] = useState(``)

    useEffect(() => {
        setTransitionClass(`tag-no-transition`)
        setTimeout(() => {
            setTransitionClass(``)
        }, 1000/30)
    }, [theme.getSelectedTheme()])

    return (
        <li className={`tag ${className} ${variant} ${transitionClass}`}
            dangerouslySetInnerHTML={{__html: text}}/>
    )
}

Tag.Variants = {
    DEFAULT: "tag-default",
    DARK: "tag-dark"
}

export {Tags, Tag}