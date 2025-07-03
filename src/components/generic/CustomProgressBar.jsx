import "./CustomProgressBar.scss"
import React from 'react'
import {useScrollAnimation} from "/src/hooks/useScrollAnimation.js"

function CustomProgressBar({now, fillColor}) {
    const {ref, className} = useScrollAnimation({ threshold: 0.5 })
    
    return (
        <div ref={ref} className={`progress ${className} progress-animate`}>
            <div className="progress-bar"
                 role="progressbar"
                 style={{
                     width: `${now}%`,
                     backgroundColor: fillColor || 'auto',
                     opacity: 0.25 + (now/100)*0.75
                 }
            }/>
        </div>
    )
}

export default CustomProgressBar