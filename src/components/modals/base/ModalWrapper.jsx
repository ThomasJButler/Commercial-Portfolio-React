import "./ModalWrapper.scss"
import React, {useEffect, useState} from 'react'
import Modal from 'bootstrap/js/src/modal'
import CircularButton from "/src/components/buttons/CircularButton.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useUtils} from "/src/hooks/utils.js"

function ModalWrapper({ children, id = "", shouldDismiss, onDismiss, className = "", dialogClassName = "" }) {
    const viewport = useViewport()
    const utils = useUtils()

    const [elModal, setElModal] = useState(null)
    const [bsModal, setBsModal] = useState(null)
    const [savedScrollY, setSavedScrollY] = useState(null)

    /** @constructs **/
    useEffect(() => {
        const elModal = document.getElementById(id)
        setElModal(elModal)
        return () => { _destroy() }
    }, [null])

    /** @listens elModal - Create Element **/
    useEffect(() => {
        if(!elModal)
            return
        _create()
    }, [elModal])

    /** @listens shouldDismiss - Scroll Adjustments **/
    useEffect(() => {
        if(!utils.device.isTouchDevice() || viewport.isDesktopLayout())
            return

        if(!shouldDismiss) {
            setSavedScrollY(viewport.scrollY)
            utils.capabilities.scrollTo(0, false)
        }
        else {
            utils.capabilities.scrollTo(savedScrollY || 0, true)
        }
    }, [shouldDismiss])

    /** @listens shouldDismiss - Destroy Element **/
    useEffect(() => {
        if(!shouldDismiss)
            return

        _destroy()
    }, [shouldDismiss])

    const _create = () => {
        const config = {
            backdrop: onDismiss ? true : "static",
            keyboard: false
        }

        const bsModal = new Modal(elModal, config)
        elModal.addEventListener('hide.bs.modal', _onWillHide)
        elModal.addEventListener('hidden.bs.modal', () => {
            if(onDismiss)
                onDismiss()
        })
        bsModal.show()
        setBsModal(bsModal)
    }

    const _destroy = () => {
        if(!elModal || !bsModal)
            return

        elModal.removeEventListener('hide.bs.modal', _onWillHide)
        bsModal.hide()
    }

    const _onWillHide = () => {
        if(!document.activeElement)
            return
        document.activeElement.blur()
    }

    return (
        <div id={id}
             className={`modal ${className}`}>
            <div className={`modal-dialog ${dialogClassName}`}>
                <div className={`modal-content`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

function ModalWrapperTitle({ title, faIcon, onClose, tooltip }) {
    const language = useLanguage()

    return (
        <div className={`modal-header`}>
            <h4 className={`modal-title fw-bold`}>
                <i className={`${faIcon} me-2 me-xl-3 text-primary`}/>
                <span dangerouslySetInnerHTML={{__html: title}}/>
            </h4>


            {onClose && (
                <CircularButton onClick={onClose}
                                faIcon={`fa-solid fa-xmark`}
                                size={CircularButton.Sizes.LARGE}
                                variant={CircularButton.Variants.DEFAULT}
                                tooltip={tooltip || language.getString("close_window")}/>
            )}
        </div>
    )
}

function ModalWrapperBody({ children, className }) {
    return (
        <div className={`modal-body ${className}`}>
            {children}
        </div>
    )
}

function ModalWrapperFooterDescription({ title, description, faIcon }) {
    return (
        <div className={`modal-footer`}>
            <h6 className={`modal-footer-title text-default`}>
                <i className={`${faIcon} text-primary me-2 eq-h5`}/>
                <span className={`fw-bold`} dangerouslySetInnerHTML={{__html: title}}/>
            </h6>

            <div className={`modal-footer-description text-1`}
                 dangerouslySetInnerHTML={{__html: description}}/>
        </div>
    )
}

export {ModalWrapper, ModalWrapperTitle, ModalWrapperBody, ModalWrapperFooterDescription}