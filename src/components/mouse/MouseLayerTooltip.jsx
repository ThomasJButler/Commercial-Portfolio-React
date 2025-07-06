import "./MouseLayerTooltip.scss"
import React, {useEffect, useState} from 'react'
import Tooltip from "/src/components/generic/Tooltip.jsx"

function MouseLayerTooltip({ x, y, offset, targetElementParameters, animationTicks }) {
    const [displayingLabel, setDisplayingLabel] = useState("")

    /** @listens animationTicks **/
    useEffect(() => {
        const tooltipDiv = document.getElementById('mouse-layer-tooltip')
        if(!tooltipDiv)
            return

        _updatePosition(tooltipDiv)
        _detectLabel()
    }, [animationTicks])

    const _updatePosition = (tooltipDiv) => {
        const tooltipBounds = tooltipDiv.getBoundingClientRect()
        const targetX = x - tooltipBounds.width/2
        const targetY = y - tooltipBounds.height - offset/2 - 5

        tooltipDiv.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
    }

    const _detectLabel = () => {
        const dataTooltip = targetElementParameters?.dataTooltip || null
        if(dataTooltip !== "hidden") {
            setDisplayingLabel(dataTooltip)
        }
    }

    return (
        <Tooltip id={`mouse-layer-tooltip`}
                 label={displayingLabel || ""}/>
    )
}

export default MouseLayerTooltip