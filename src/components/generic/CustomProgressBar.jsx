import "./CustomProgressBar.scss"
import React from 'react'
import {useScrollAnimation} from "/src/hooks/useScrollAnimation.js"

function CustomProgressBar({now, fillColor}) {
    const {ref, isVisible} = useScrollAnimation({ threshold: 0.5 })
    
    return (
        <div ref={ref} className={`progress progress-animate`}>
            <div className={`progress-bar ${isVisible ? 'animate-visible' : ''}`}
                 role="progressbar"
                 style={{
                     '--progress-width': `${now}%`,
                     backgroundColor: fillColor || 'auto',
                     opacity: 0.25 + (now/100)*0.75
                 }
            }/>
        </div>
    )
}

export default CustomProgressBar