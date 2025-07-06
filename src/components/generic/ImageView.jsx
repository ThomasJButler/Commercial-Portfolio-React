import "./ImageView.scss"
<<<<<<< HEAD
import React, {useEffect, useState} from 'react'
import {useConstants} from "/src/hooks/constants.js"
import {Spinner} from "react-bootstrap"
import {useUtils} from "/src/hooks/utils.js"
=======
import React, {useState, useEffect, useRef} from 'react'
>>>>>>> main

function ImageView({ src, alt = "", className = "", id= null, hideSpinner = false, style = null, onStatus = null }) {
    const [loadStatus, setLoadStatus] = useState(ImageView.LoadStatus.LOADING)
    const [loadedSrc, setLoadedSrc] = useState(null)
    const [errorSrc, setErrorSrc] = useState(null)

    /** @listens src **/
    useEffect(() => {
        if(src && src.length > 0) setLoadStatus(ImageView.LoadStatus.LOADING)
        else setLoadStatus(ImageView.LoadStatus.ERROR)
    }, [src])

    /** @listens loadedSrc|errorSrc **/
    useEffect(() => {
        if(loadedSrc && src === loadedSrc)
            setLoadStatus(ImageView.LoadStatus.LOADED)
        else if(errorSrc && src === errorSrc)
            setLoadStatus(ImageView.LoadStatus.ERROR)
        else if(src && src.length > 0)
            setLoadStatus(ImageView.LoadStatus.LOADING)
    }, [loadedSrc, errorSrc])

    /** @listens loadStatus **/
    useEffect(() => {
        onStatus && onStatus(loadStatus)
    }, [loadStatus])

    const spinnerVisible = loadStatus === ImageView.LoadStatus.LOADING && !hideSpinner
    const containerVisible = loadStatus === ImageView.LoadStatus.LOADED
    const errorVisible = loadStatus === ImageView.LoadStatus.ERROR

    const _onLoad = () => {
        setLoadedSrc(src)
        setErrorSrc(null)
    }

    const _onError = () => {
        setLoadedSrc(null)
        setErrorSrc(src)
    }

    return (
        <div className={`image-view ${className}`}
             id={id}
             style={style}>
            <ImageViewContainer src={src}
                                alt={alt}
                                visible={containerVisible}
                                loadStatus={loadStatus}
                                onLoad={_onLoad}
                                onError={_onError}/>

            <ImageViewSpinner visible={spinnerVisible}/>
            <ImageViewError visible={errorVisible}
                            hideIcon={hideSpinner}/>
        </div>
    )
}

ImageView.LoadStatus = {
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error"
}

<<<<<<< HEAD
function ImageViewContainer({ src, alt, visible, loadStatus, onLoad, onError }) {
    const constants = useConstants()
    const utils = useUtils()
=======
/**
 * React component for displaying an image with lazy loading, load status handling, and a loading spinner.
 *
 * Renders an image that supports lazy loading using Intersection Observer, displays a spinner while loading, and handles load success or error states. The image source and srcSet are only loaded when the image is near or within the viewport if lazy loading is enabled.
 *
 * @param {string} [className] - Additional CSS class names for the wrapper.
 * @param {string} [src] - The image source URL.
 * @param {string} [alt] - Alternative text for the image. Defaults to 'Image' if not provided.
 * @param {boolean} [lazy=true] - Enables lazy loading when true.
 * @param {string} [sizes] - The sizes attribute for responsive images.
 * @param {string} [srcSet] - The srcSet attribute for responsive images.
 * @returns {JSX.Element} The rendered image view component.
 */
function ImageView({className, src, alt, lazy = true, sizes, srcSet}) {
    const [loadStatus, setLoadStatus] = useState(LoadStatus.LOADING)
    const [isIntersecting, setIsIntersecting] = useState(!lazy)
    const imgRef = useRef(null)
>>>>>>> main

    const resolvedSrc = utils.file.resolvePath(src)
    const visibleClass = visible ? `visible` : `invisible`

    useEffect(() => {
        if (!lazy || !imgRef.current) return;

        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: load image immediately
            setIsIntersecting(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '50px',
                threshold: 0.01
            }
        );

        observer.observe(imgRef.current);

        return () => {
            observer.disconnect();
        };
    }, [lazy])

    return (
        <img className={`image-view-img ${visibleClass} ${constants.HTML_CLASSES.imageView} ${constants.HTML_CLASSES.imageView}-${loadStatus}`}
             src={resolvedSrc}
             alt={alt}
             loading="lazy"
             onLoad={onLoad}
             onError={onError}/>
    )
}

<<<<<<< HEAD
function ImageViewSpinner({ visible }) {
    if(!visible)
        return <></>

    return (
        <div className={`image-view-spinner-wrapper`}>
            <Spinner/>
=======
            {src && (
                <img ref={imgRef}
                 src={isIntersecting ? src : undefined}
                 srcSet={isIntersecting ? srcSet : undefined}
                 sizes={sizes}
                 onLoad={_onImageLoaded}
                 onError={_onImageError}
                 className={`image ${loadStatus === LoadStatus.LOADING ? `invisible position-absolute` : ``}`}
                 alt={alt || 'Image'}
                 loading={lazy ? 'lazy' : 'eager'}/>
            )}
>>>>>>> main
        </div>
    )
}

function ImageViewError({ visible, hideIcon }) {
    if(!visible)
        return <></>

    return (
        <div className={`image-view-error-wrapper`}>
            {!hideIcon && (
                <i className={`fa-solid fa-eye-slash`}/>
            )}
        </div>
    )

}

export default ImageView