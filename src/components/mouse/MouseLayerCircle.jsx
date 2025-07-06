import "./MouseLayerCircle.scss"
import React, {useEffect, useState} from 'react'
import {useInput} from "/src/providers/InputProvider.jsx"

function MouseLayerCircle({ targetElementParameters, animationTicks, hidden, dt, onCircleChanged }) {
    const input = useInput()

    const CIRCLE_SIZE_IN_PIXELS = 75
    const MIN_SCALE = 1.0
    const MAX_SCALE = 3.0
    const MIN_OPACITY = 0.1
    const MAX_OPACITY = 0.6
    const MAX_IDLE_TIME_IN_SECONDS = 0.5

    const [currentX, setCurrentX] = useState(input.mouseMoveStatus.clientX)
    const [currentY, setCurrentY] = useState(input.mouseMoveStatus.clientY)
    const [currentScale, setCurrentScale] = useState(1)
    const [currentOpacity, setCurrentOpacity] = useState(0)
    const [currentFaIcon, setCurrentFaIcon] = useState(null)
    const [stoppedFor, setStoppedFor] = useState(0)

    const isPositioned = currentX === input.mouseMoveStatus.clientX
        && currentY === input.mouseMoveStatus.clientY

    const shouldFadeOut = stoppedFor > MAX_IDLE_TIME_IN_SECONDS && !targetElementParameters

    /** @listens animationTicks **/
    useEffect(() => {
        const circleDiv = document.getElementById('mouse-layer-circle')
        if(!circleDiv)
            return

        _updateStoppedFor()
        _updateTransform(circleDiv)
        _updateOpacity(circleDiv)
        _setHighlighted(circleDiv, Boolean(targetElementParameters))
        _detectFaIcon()

        onCircleChanged({
            x: currentX,
            y: currentY,
            diameter: CIRCLE_SIZE_IN_PIXELS * currentScale/3,
            opacity: currentOpacity
        })
    }, [animationTicks])

    /** @listens input.isClicked **/
    useEffect(() => {
        if(input.isClicked)
            return
        setStoppedFor(MAX_IDLE_TIME_IN_SECONDS)
    }, [input.isClicked])

    const _updateTransform = (circleDiv) => {
        let targetScale = MIN_SCALE
        if (targetElementParameters)
            targetScale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) / 2
        if (input.isClicked)
            targetScale = MAX_SCALE
        if (hidden)
            targetScale = 0

        _tween(currentX, input.mouseMoveStatus.clientX, setCurrentX, 0.15 * dt, 1)
        _tween(currentY, input.mouseMoveStatus.clientY, setCurrentY, 0.15 * dt, 1)
        _tween(currentScale, targetScale, setCurrentScale, 0.2, 0.1)

        circleDiv.style.transform = `translate3d(${currentX - CIRCLE_SIZE_IN_PIXELS/2}px, ${currentY - CIRCLE_SIZE_IN_PIXELS/2}px, 0) scale(${currentScale/3})`
    }

    const _updateOpacity = (circleDiv) => {
        let targetOpacity = 0
        if(!shouldFadeOut)
            targetOpacity = MIN_OPACITY
        if(targetElementParameters)
            targetOpacity = (MAX_OPACITY - MIN_OPACITY)/2
        if(input.isClicked)
            targetOpacity += (MAX_OPACITY - MIN_OPACITY)/2
        if(hidden)
            targetOpacity = 0

        _tween(currentOpacity, targetOpacity, setCurrentOpacity, 0.2, 0.025)
        circleDiv.style.opacity = currentOpacity.toString()
    }

    const _tween = (currentValue, targetValue, setter, multiplier, diffBreakpoint) => {
        const diff = targetValue - currentValue
        if(Math.abs(diff) > diffBreakpoint) {
            setter(prevState => prevState + diff * multiplier)
        }
        else {
            setter(targetValue)
        }
    }

    const _updateStoppedFor = () => {
        if(isPositioned)
            setStoppedFor(prevState => prevState + dt/60)
        else
            setStoppedFor(0)
    }

    const _setHighlighted = (circleDiv, highlighted) => {
        circleDiv.classList.toggle('mouse-layer-circle-highlight', highlighted)
    }

    const _detectFaIcon = () => {
        setCurrentFaIcon(targetElementParameters?.faIcon || null)
    }

    return (
        <div className={`mouse-layer-circle`}
             id={`mouse-layer-circle`}
             style={{opacity: 0}}>
            <MouseLayerCircleIcon faIcon={currentFaIcon}/>
        </div>
    )
}

function MouseLayerCircleIcon({ faIcon }) {
    const hiddenClass = faIcon ?
        `` :
        `mouse-layer-circle-fa-icon-hidden`

    const displayClass = faIcon
        || `fa-solid fa-circle`

    return (
        <i className={`mouse-layer-circle-fa-icon ${hiddenClass} ${displayClass}`}/>
    )
}

export default MouseLayerCircle