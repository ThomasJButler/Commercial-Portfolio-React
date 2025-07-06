import "./YoutubeVideoModal.scss"
import React, {useEffect, useState} from 'react'
import {useUtils} from "/src/hooks/utils.js"
import {ModalWrapper, ModalWrapperBody, ModalWrapperFooterDescription, ModalWrapperTitle} from "/src/components/modals/base/ModalWrapper"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

function YoutubeVideoModal({ target, onDismiss }) {
    const language = useLanguage()
    const utils = useUtils()

    const [shouldDismiss, setShouldDismiss] = useState(false)

    useEffect(() => {
        setShouldDismiss(false)
    }, [target])

    if(!target)
        return <></>

    const modalClass = shouldDismiss ? `` : `fade`
    const modalDialogClass = `modal-dialog-centered`

    const url = target?.url || ""
    const title = target.title
    const description = target.description
    const parsedUrl = utils.url.toYoutubeEmbed(url)

    const _onClose = () => {
        setShouldDismiss(true)
    }

    return (
        <ModalWrapper id={`youtube-video-modal`}
                      className={`modal-xl ${modalClass}`}
                      dialogClassName={modalDialogClass}
                      shouldDismiss={shouldDismiss}
                      onDismiss={onDismiss}>
            <ModalWrapperTitle title={title}
                               faIcon={`fa-brands fa-youtube`}
                               onClose={_onClose}/>

            <ModalWrapperBody className={`youtube-modal-body`}>
                <iframe src={parsedUrl}
                        className={`youtube-iframe`}/>
            </ModalWrapperBody>

            {description && (
                <ModalWrapperFooterDescription title={language.getString("about_video")}
                                               description={description}
                                               faIcon={`fa-regular fa-folder-open`}/>
            )}
        </ModalWrapper>
    )
}

export default YoutubeVideoModal