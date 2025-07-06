import "./Balloon.scss"
import React, {useEffect, useState} from 'react'
import {useUtils} from "/src/hooks/utils.js"

function Balloon({ children, className = "" }) {
    return (
        <div className={`balloon ${className}`}>
            <div className="balloon-triangle"/>
            {children}
        </div>
    )
}

function BalloonQuote({ text, className }) {
    const utils = useUtils()

    let fullText = utils.string.limitTextSize(text, 300) || ""
    fullText = fullText.replaceAll("！", "！ ")
        .replaceAll("？", "？ ")
        .replaceAll("。", "。 ")
        .replaceAll("，", "， ")
        .trimEnd()

    const words = fullText.trim().split(/\s+/)

    const splitStart = words.length >= 2 ? words[0] + " " : ""
    const splitMid = words.length > 2 ? words.slice(1, -1).join(" ") : ""
    const splitEnd = words.length > 0 ? " " +  words[words.length - 1] : ""

    const firstSpanContent = `<i class="fa-solid fa-quote-left text-primary me-1"></i> ${splitStart} ${splitMid}`
    const secondSpanContent = `${splitEnd} <i class="fa-solid fa-quote-right text-primary ms-1"></i>`

    return (
        <div className={`balloon-quote ${className}`}>
            <span className={`balloon-quote-1`} dangerouslySetInnerHTML={{__html: firstSpanContent}}/>
            <span className={`balloon-quote-2`} dangerouslySetInnerHTML={{__html: secondSpanContent}}/>
        </div>
    )
}

export {Balloon, BalloonQuote}