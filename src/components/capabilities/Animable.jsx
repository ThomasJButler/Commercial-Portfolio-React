import "./Animable.scss"
import React, {useEffect, useState} from 'react'

function Animable({ children, animationId, onEnterFrame, className = "" }) {
    const [ticks, setTicks] = useState(0)
    const [lastTickTimeSpan, setLastTickTimeSpan] = useState(null)
    const [totalElapsed, setTotalElapsed] = useState(0)

    /** @constructs **/
    useEffect(() => {
        window.ANIMATION_DATA = window.ANIMATION_DATA || {}
        window.ANIMATION_DATA[animationId] = window.ANIMATION_DATA[animationId] || {}

        let animationFrameId
        const animate = () => {
            setTicks(prevState => prevState + 1)
            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrameId)
    }, [null])

    /** @listens ticks **/
    useEffect(() => {
        const now = new Date().getTime()
        const then = lastTickTimeSpan || now
        const dt = (now - then)/1000

        setLastTickTimeSpan(now)
        setTotalElapsed(prevState => prevState + dt)

        window.ANIMATION_DATA[animationId].event = window.ANIMATION_DATA[animationId].event || {}
        window.ANIMATION_DATA[animationId].event.timespan = now
        window.ANIMATION_DATA[animationId].event.ticks = ticks
        window.ANIMATION_DATA[animationId].event.currentTickElapsed = dt
        window.ANIMATION_DATA[animationId].event.totalElapsed = totalElapsed
        onEnterFrame && onEnterFrame(window.ANIMATION_DATA[animationId].event)
    }, [ticks])

    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Animable