/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

import {useConstants} from "/src/hooks/constants.js"

const constants = useConstants()

export const _domUtils = {
    /**
     * @return {boolean}
     **/
    didLoadImagesWithQuerySelector: (querySelector) => {
        const images = document.querySelectorAll(querySelector || 'img')
        return Array.from(images).every(img => img.complete && img.naturalHeight !== 0)
    },

    /**
     * @param {String} imageClass
     * @return {number}
     */
    getImageCount: (imageClass) => {
        const imageElements = document.querySelectorAll(`.${imageClass}`)
        return Array.from(imageElements).length
    },

    /**
     * @param {String} imageClass
     * @return {number}
     */
    getImageLoadPercentage: (imageClass) => {
        const imageElements = document.querySelectorAll(`.${imageClass}`)
        const imageLoadProgress = { loaded: 0, total: 0 }

        Array.from(imageElements).map(item => {
            imageLoadProgress.total++
            if(item.classList.contains(imageClass + "-loaded") || item.classList.contains(imageClass + "-error"))
                imageLoadProgress.loaded++
        })

        if(imageLoadProgress.total === 0)
            return 100

        const percentage = Math.round(100*imageLoadProgress.loaded/imageLoadProgress.total)
        return Math.max(0, Math.min(100, percentage))
    },

    /**
     * @param {HTMLElement} element
     * @return {boolean}
     */
    isElementOutsideBounds: (element) => {
        const rect = element.getBoundingClientRect()

        return (
            rect.bottom < 0 ||
            rect.right < 0 ||
            rect.left > window.innerWidth ||
            rect.top > window.innerHeight
        )
    },

    /**
     * @param {HTMLElement} element
     * @param {Number} x
     * @param {Number} y
     * @return {boolean}
     */
    isInsideElement: (element, x, y) => {
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        )
    },

    /**
     * @param {Boolean} enabled
     */
    setBodyScrollEnabled: (enabled) => {
        if(enabled) {
            document.body.classList.remove(constants.HTML_CLASSES.bodyNoScroll)
        }
        else {
            document.body.classList.add(constants.HTML_CLASSES.bodyNoScroll)
        }
    }
}