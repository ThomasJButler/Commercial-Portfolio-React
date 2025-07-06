import "./Notification.scss"
import React, {useEffect, useState} from 'react'
import {useScheduler} from "/src/hooks/scheduler.js"

function Notification({ id, type, title, message, onDismiss }) {
    const scheduler = useScheduler()

    const [transitionStatus, setTransitionStatus] = useState("hidden")
    const [displayingData, setDisplayingData] = useState({})

    const tag = "notification-scheduler-" + id
    const typeMetadata = Notification.Types[displayingData.type] ||
        Notification.Types["default"]

    useEffect(() => {
        _reset()
        if(!title || !message)
            return

        _show()
    }, [type, title, message])

    const _reset = () => {
        scheduler.clearAllWithTag(tag)
        setTransitionStatus("hidden")
    }

    const _updateDisplayingData = () => {
        setDisplayingData({
            type: type,
            title: title,
            message: message
        })
    }

    const _show = () => {
        scheduler.clearAllWithTag(tag)
        scheduler.schedule(() => {_updateDisplayingData()}, 30, tag)
        scheduler.schedule(() => {setTransitionStatus("shown")}, 60, tag)
        scheduler.schedule(() => {setTransitionStatus("hiding")}, 4000, tag)
        scheduler.schedule(() => {onDismiss && onDismiss()}, 4400, tag)
    }

    return (
        <div className={`notification notification-${transitionStatus} ${typeMetadata.class}`}>
            <div className={`notification-header`}>
                <div className={`notification-title text-4`}>
                    <i className={`${typeMetadata.faIcon} ${typeMetadata.faIconClass} me-2`}/>

                    <span className={``}
                          dangerouslySetInnerHTML={{__html: displayingData.title}}/>
                </div>

                <button className={`notification-close-button btn btn-link-default-inv text-4`}
                        onClick={onDismiss}>
                    <i className={`fa-icon-no-select fa-solid fa-xmark`}/>
                </button>
            </div>

            <div className={`notification-body text-3`}
                 dangerouslySetInnerHTML={{__html: displayingData.message}}/>
        </div>
    )
}

Notification.Types = {
    default:    {class: "",                     faIcon: "fa-solid fa-bell",    faIconClass: "text-normal"},
    error:      {class: "notification-error",   faIcon: "fa-solid fa-warning", faIconClass: "text-normal"}
}

export default Notification