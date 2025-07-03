import "./Article.scss"
import React from 'react'
import StylizedTitle from "/src/components/generic/StylizedTitle.jsx"
import {useUtils} from "/src/helpers/utils.js"
import {useScrollAnimation} from "/src/hooks/useScrollAnimation.js"

function Article({ title, children, className }) {
    const utils = useUtils()
    const {ref, isVisible} = useScrollAnimation({ threshold: 0.2, delay: 100 })

    return (
        <article ref={ref} className={`${className} w-100 animate-fade-in-up ${isVisible ? 'animate-visible' : ''}`}>
            {title && (
                <StylizedTitle text={utils.parseJsonText(title)} size={`default`} classList={`mb-3`}/>
            )}

            <div className={`article-content-wrapper mx-2 mx-md-3 text-4`}>
                {children}
            </div>
        </article>
    )
}

export default Article