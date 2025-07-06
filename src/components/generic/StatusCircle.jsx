import "./StatusCircle.scss"
import React, {useEffect, useState} from 'react'
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import Tooltip from "/src/components/generic/Tooltip.jsx"
import {useUtils} from "/src/hooks/utils.js"
import {useInput} from "/src/providers/InputProvider.jsx"

function StatusCircle({ variant, message, size = "status-circle-size-default", className = "", onClick = null }) {
    const viewport = useViewport()
    const input = useInput()
    const utils = useUtils()
    const isTouchDevice = utils.device.isTouchDevice()

    const [tooltipVisible, setTooltipVisible] = useState(false)

    /** @listens viewport.innerWidth **/
    useEffect(() => {
        setTooltipVisible(false)
    }, [viewport.innerWidth])

    /** @listens input.mouseUpStatus **/
    useEffect(() => {
        if(input.lastMouseTarget?.classList?.contains("status-circle-content"))
            return
        setTooltipVisible(false)
    }, [input.mouseUpStatus])

    const _onMouseEnter = () => {
        if(isTouchDevice)
            return
        setTooltipVisible(true)
    }

    const _onMouseLeave = () => {
        if(isTouchDevice)
            return
        setTooltipVisible(false)
    }

    const _onClick = (e) => {
        if(!isTouchDevice)
            onClick()
        else
            setTooltipVisible(!tooltipVisible)
    }

    return (
        <div className={`status-circle ${className} ${size} status-circle-variant-${variant}`}
             onMouseEnter={_onMouseEnter}
             onMouseLeave={_onMouseLeave}
             onClick={_onClick}>
            <div className={`status-circle-content`}>
                {tooltipVisible && (
                    <Tooltip label={message}
                             className={`status-circle-tooltip text-center`}/>
                )}

                <div className={`status-circle-pulse`}/>
                <div className={`status-circle-body`}/>
            </div>
        </div>
    )
}

StatusCircle.Sizes = {
    SMALL: "status-circle-size-small",
    DEFAULT: "status-circle-size-default"
}

export default StatusCircle