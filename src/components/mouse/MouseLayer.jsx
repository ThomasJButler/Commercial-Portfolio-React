import "./MouseLayer.scss"
import React, {useEffect, useState} from 'react'
import MouseLayerCircle from "/src/components/mouse/MouseLayerCircle.jsx"
import MouseLayerTooltip from "/src/components/mouse/MouseLayerTooltip.jsx"
import {useScheduler} from "/src/hooks/scheduler.js"
import {useConstants} from "/src/hooks/constants.js"
import {useInput} from "/src/providers/InputProvider.jsx"

function MouseLayer({ active, isBlockedByOverlay, hidden }) {
    const input = useInput()
    const scheduler = useScheduler()
    const constants = useConstants()

    const [targetElementParameters, setTargetElementParameters] = useState(null)
    const [circleProperties, setCircleProperties] = useState(null)
    const [animationTicks, setAnimationTicks] = useState(0)
    const [dt, setDt] = useState(1)

    const hiddenClass = hidden ?
        `invisible` :
        ``

    /** @constructs **/
    useEffect(() => {
        let animationFrameId

        const animate = () => {
            setAnimationTicks(prevState => prevState + 1)
            const now = new Date().getTime()
            const elapsedTime = now - (MouseLayer.lastTickTime || now)
            setDt(elapsedTime/17)

            MouseLayer.lastTickTime = now
            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)
        return () => { cancelAnimationFrame(animationFrameId) }
    }, [])

    /** @listens input.lastMouseTarget **/
    useEffect(() => {
        _updateMouseTargetParameters()
    }, [input.lastMouseTarget])

    /** @listens input.isClicked **/
    useEffect(() => {
        setTimeout(() => {
            _updateMouseTargetParameters()
        }, 60)
    }, [input.isClicked])

    /** @listens isBlockedByOverlay **/
    useEffect(() => {
        setTargetElementParameters(null)
        scheduler.clearAllWithTag("overlay-changed-animated-cursor")
        scheduler.schedule(() => {
            setTargetElementParameters(null)
        }, 100, "overlay-changed-animated-cursor")
    }, [isBlockedByOverlay])

    const _updateMouseTargetParameters = () => {
        if(!input.lastMouseTarget) {
            setTargetElementParameters(null)
            return
        }

        if(input.isClicked && targetElementParameters?.faIcon)
            return

        const parameters = _generateMouseTargetParameters()
        if(parameters)
            setTargetElementParameters(parameters)
        else
            setTargetElementParameters(null)
    }

    const _generateMouseTargetParameters = () => {
        if(!input.lastMouseTarget)
            return

        let parameters = null
        if(input.lastMouseTarget.matches("a"))
            parameters = {type: "link"}
        if(input.lastMouseTarget.matches("button"))
            parameters = {type: "button"}
        if(input.lastMouseTarget.getAttribute('data-tooltip'))
            parameters = {type: "custom"}

        const trackableTarget = constants.TRACKABLE_CLASSES.find(item => {
            return input.lastMouseTarget.classList.contains(item.name)
        })

        parameters = parameters || trackableTarget
        if(!parameters)
            return null

        const dataTooltip = input.lastMouseTarget.getAttribute('data-tooltip')
        parameters.dataTooltip = dataTooltip || null
        return parameters
    }

    return (
        <>
            {active && (
                <div className={`mouse-layer ${hiddenClass}`}>
                    <MouseLayerCircle targetElementParameters={targetElementParameters}
                                      animationTicks={animationTicks}
                                      hidden={hiddenClass}
                                      dt={dt}
                                      onCircleChanged={setCircleProperties}/>

                    <MouseLayerTooltip x={circleProperties?.x}
                                       y={circleProperties?.y}
                                       offset={circleProperties?.diameter}
                                       targetElementParameters={targetElementParameters}
                                       animationTicks={animationTicks}/>
                </div>
            )}
        </>
    )
}

export default MouseLayer