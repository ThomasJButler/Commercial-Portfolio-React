import "./MessageCard.scss"
import React, {useEffect, useState} from 'react'
import {Card, CardBody} from "react-bootstrap"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import Separator from "/src/components/generic/Separator.jsx"

function MessageCard({ children, faIcon = "fa-solid fa-circle", title = null, body = null, footer = null, className = "" }) {
    return (
        <div className={`message-card-wrapper ${className}`}>
            <Card className={`message-card`}>
                <CardBody className={`message-card-body`}>
                    {children}
                </CardBody>
            </Card>
        </div>
    )
}

function MessageCardIcon({ faIcon = "fa-solid fa-circle" }) {
    return (
        <div className={`message-card-avatar-wrapper`}>
            <AvatarView className={`message-card-avatar`}
                        faIcon={`${faIcon}`}/>
        </div>
    )
}

function MessageCardBody({ children,  title = null, text = null }) {
    return (
        <div className={`message-card-title-wrapper`}>
            {title && (
                <h5 className={`message-card-title lead-2`}
                    dangerouslySetInnerHTML={{__html: title}}/>
            )}

            {text && (
                <p className={`message-card-body text-3`}
                   dangerouslySetInnerHTML={{__html: text}}/>
            )}

            {children && (
                <>{children}</>
            )}
        </div>
    )
}

function MessageCardFooter({ children, text = null }) {
    return (
        <div className={`message-card-footer-wrapper`}>
            <Separator className={`message-card-separator mt-4 mb-3`}/>

            <p className={`message-card-footer text-2`}
               dangerouslySetInnerHTML={{__html: text}}/>

            {children && (
                <>{children}</>
            )}
        </div>
    )
}

export {
    MessageCard,
    MessageCardIcon,
    MessageCardBody,
    MessageCardFooter
}