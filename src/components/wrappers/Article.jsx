import "./Article.scss"
import React from 'react'
import StylizedTitle from "/src/components/generic/StylizedTitle.jsx"
import {useUtils} from "/src/helpers/utils.js"
import {useScrollAnimation} from "/src/hooks/useScrollAnimation.js"

function Article({ title, children, className }) {
    const utils = useUtils()
    const {ref, className: animationClass} = useScrollAnimation({ threshold: 0.1 })

    return (
        <article ref={ref} className={`${className} w-100 ${animationClass} fade-in`}>
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