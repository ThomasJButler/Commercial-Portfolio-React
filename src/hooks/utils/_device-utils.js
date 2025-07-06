/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _deviceUtils = {
    /**
     * @return {boolean}
     */
    isAndroid: () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /android/.test(userAgent);
    },

    /**
     * @return {boolean}
     */
    isChrome: () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera
        return /CriOS/.test(userAgent) || /Chrome/.test(userAgent)
    },

    /**
     * @return {boolean}
     */
    isChromeAndroid: () => {
        const userAgent = navigator.userAgent
        return /Chrome\/[.0-9]* Mobile/i.test(userAgent) && !/OPR|Edg|SamsungBrowser|UCBrowser|CriOS/i.test(userAgent)
    },

    /**
     * @return {boolean}
     */
    isChromeOS: () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /cros/.test(userAgent);
    },

    /**
     * @return {boolean}
     **/
    isFirefox: () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /Firefox/.test(userAgent);
    },

    /**
     * @return {boolean}
     */
    isIOS: () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /iphone|ipad|ipod/.test(userAgent)
            || /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    },

    /**
     * @return {boolean}
     */
    isIPad: () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /ipad/.test(userAgent)
    },

    /**
     * @return {boolean}
     */
    isSafari: () => {
        const userAgent = navigator.userAgent
        return /^((?!chrome|android).)*safari/i.test(userAgent)
    },

    /**
     * @return {boolean}
     */
    isTouchDevice: () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0))
    }
}