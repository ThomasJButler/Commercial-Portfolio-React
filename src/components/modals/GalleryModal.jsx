import "./GalleryModal.scss"
import React, {useEffect, useState} from 'react'
import {ModalWrapper, ModalWrapperTitle, ModalWrapperBody} from "/src/components/modals/base/ModalWrapper"
import { Swiper, SwiperSlide } from 'swiper/react'
import {Pagination} from "swiper/modules"
import {useUtils} from "/src/hooks/utils.js"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useScheduler} from "/src/hooks/scheduler.js"
import {Spinner} from "react-bootstrap"

function GalleryModal({ target, onDismiss }) {
    const utils = useUtils()
    const viewport = useViewport()
    const scheduler = useScheduler()

    const tag = "gallery-modal"
    const images = target?.images
    const type = target?.type
    const title = target?.title
    const isMobile = !viewport.isBreakpoint("lg")

    const [didLoadAllImages, setDidLoadAllImages] = useState(false)
    const [shouldDismiss, setShouldDismiss] = useState(false)

    const modalCustomClass = !didLoadAllImages ? `gallery-modal-loading` : ``

    useEffect(() => {
        setDidLoadAllImages(false)
        if(!images || !images.length) {
            scheduler.clearAllWithTag(tag)
            return
        }

        scheduler.clearAllWithTag(tag)
        scheduler.interval(() => {
            const isReady = utils.dom.didLoadImagesWithQuerySelector(".swiper-image")
            if(!isReady)
                return

            scheduler.clearAllWithTag(tag)
            setDidLoadAllImages(true)
        }, 500, tag)
    }, [images])

    useEffect(() => {
        setShouldDismiss(false)
    }, [target])

    if(!target)
        return <></>

    const parameters = utils.array.withId([
        { id: "9:16",   suffix: "portrait",     direction: "horizontal" },
        { id: "16:9",   suffix: "landscape",    direction: isMobile ? "vertical" : "horizontal" },
        { id: "1:1",    suffix: "default",      direction: isMobile ? "vertical" : "horizontal" },
    ], type, "default")

    const visibilityClassName = didLoadAllImages ?
        `visible` :
        `invisible`

    const _onClose = () => {
        setShouldDismiss(true)
    }

    return (
        <ModalWrapper id={`gallery-modal`}
                      className={`${modalCustomClass} gallery-modal-${parameters.direction}`}
                      dialogClassName={`modal-fullscreen`}
                      shouldDismiss={shouldDismiss}
                      onDismiss={onDismiss}>
            <ModalWrapperTitle title={title}
                               faIcon={`fa-regular fa-image`}
                               onClose={_onClose} tooltip={"hidden"}/>

            <ModalWrapperBody className={`gallery-modal-body`}>
                {parameters.direction === "horizontal" && (
                    <GalleryModalSwiper className={visibilityClassName}
                                        images={images}
                                        type={parameters.suffix}/>
                )}

                {parameters.direction === "vertical" && (
                    <GalleryModalImageStack className={visibilityClassName}
                                            images={images}/>
                )}

                {!didLoadAllImages && (
                    <GalleryModalSpinner/>
                )}
            </ModalWrapperBody>
        </ModalWrapper>
    )
}

function GalleryModalSwiper({ className, images, type }) {
    const utils = useUtils()

    return (
        <Swiper slidesPerView={"auto"}
                direction={"horizontal"}
                spaceBetween={15}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className={`gallery-swiper gallery-swiper-${type} ${className}`}>
            {images.map((image, key) => (
                <SwiperSlide key={key}
                             className={`gallery-swiper-slide`}>
                    <img className={`swiper-image`}
                         alt={`img-` + key}
                         src={utils.file.resolvePath(image)}/>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

function GalleryModalImageStack({ className, images }) {
    const utils = useUtils()

    return (
        <div className={`gallery-modal-image-stack ${className}`}>
            {images.map((image, key) => (
                <div key={key}
                     className={`gallery-modal-image-stack-item`}>
                    <img className={`swiper-image`}
                         alt={`img-` + key}
                         src={utils.file.resolvePath(image)}/>
                </div>
            ))}
        </div>
    )
}

function GalleryModalSpinner() {
    return (
        <div className={`gallery-modal-spinner`}>
            <Spinner/>
        </div>
    )
}

export default GalleryModal