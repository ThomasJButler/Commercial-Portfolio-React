import "./GestureAwareButton.scss"
import React, {useEffect, useState} from 'react'

function GestureAwareButton({ children, className = "", onClick = null, tooltip = "", disabled = false, hrefToolTip = null }) {
    const [isTouched, setIsTouched] = useState(false)
    const [dispatchClickAt, setDispatchClickAt] = useState(0)

    useEffect(() => {
        if(!dispatchClickAt)
            return
        onClick && onClick()
    }, [dispatchClickAt])

    const _onTouchStart = (e) => {
        setIsTouched(true)
    }

    const _onTouchMove = (e) => {
        setIsTouched(false)
    }

    const _onTouchEnd = (e) => {
        if(isTouched)
            _dispatchClick()
        setIsTouched(false)
    }

    const _onClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        _dispatchClick()
    }

    const _dispatchClick = () => {
        const now = new Date().getTime()
        const timespan = now - dispatchClickAt
        if(timespan > 150) {
            setDispatchClickAt(now)
        }
    }

    return (
        <a  className={`gesture-aware-button ${className}`}
            data-tooltip={tooltip}
            type={`button`}
            href={hrefToolTip}
            onTouchStart={_onTouchStart}
            onTouchMove={_onTouchMove}
            onTouchEnd={_onTouchEnd}
            onClick={_onClick}
            draggable={false}>
            {children}
        </a>
    )
}

export default GestureAwareButton