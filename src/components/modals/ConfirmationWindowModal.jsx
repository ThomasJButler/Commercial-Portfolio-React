import "./ConfirmationWindowModal.scss"
import React, {useEffect, useState} from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {ModalWrapper, ModalWrapperBody, ModalWrapperTitle} from "/src/components/modals/base/ModalWrapper"
import StandardButton from "/src/components/buttons/StandardButton.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"

function ConfirmationWindowModal({ target, onDismiss }) {
    const language = useLanguage()
    const viewport = useViewport()

    const [shouldDismiss, setShouldDismiss] = useState(false)

    useEffect(() => {
        setShouldDismiss(false)
    }, [target])

    if(!target)
        return <></>

    const modalClass = shouldDismiss ? `` : `fade`
    const modalDialogClass = viewport.isDesktopLayout() ? `` : `modal-dialog-centered`

    const title = target.title || ""
    const faIcon = target.faIcon || "fa-solid fa-question-mark"
    const message = target.message
    const cancelLabel = target.cancelLabel || language.getString("no")
    const confirmLabel = target.confirmLabel || language.getString("yes")

    const _onCancel = () => {
        target.onCancel && target.onCancel()
        setShouldDismiss(true)
    }

    const _onConfirm = () => {
        target.onConfirm && target.onConfirm()
        setShouldDismiss(true)
    }

    const _onClose = () => {
        target.onCancel && target.onCancel()
        setShouldDismiss(true)
    }

    return (
        <ModalWrapper id={`confirmation-window`}
                      className={`modal-md ${modalClass}`}
                      dialogClassName={modalDialogClass}
                      shouldDismiss={shouldDismiss}
                      onDismiss={onDismiss}>
            <ModalWrapperTitle title={title}
                               faIcon={faIcon}
                               tooltip={language.getString("cancel")}
                               onClose={_onClose}/>

            <ModalWrapperBody>
                <div className={`confirmation-window-message text-3`}
                     dangerouslySetInnerHTML={{__html: message}}/>

                <div className={`confirmation-window-menu`}>
                    <StandardButton label={cancelLabel}
                                    tooltip={cancelLabel}
                                    variant={`contrast`}
                                    faIcon={`fa-solid fa-xmark`}
                                    onClick={_onCancel}/>

                    <StandardButton label={confirmLabel}
                                    tooltip={confirmLabel}
                                    variant={`primary`}
                                    faIcon={`fa-solid fa-caret-right`}
                                    displayIconAsSuffix={true}
                                    onClick={_onConfirm}/>
                </div>
            </ModalWrapperBody>
        </ModalWrapper>
    )
}

export default ConfirmationWindowModal