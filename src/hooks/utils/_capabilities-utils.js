/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _capabilitiesUtils = {
    /**
     * @param {String} text
     */
    copyToClipboard: async (text) => {
        if(_capabilitiesUtils.isCopiedToClipboard(text))
            return

        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text)
            window.lastCopiedToClipboardText = text
            return
        }

        const textArea = document.createElement("textarea")
        textArea.value = text
        textArea.style.position = "absolute"
        textArea.style.left = "-999999px"
        document.body.prepend(textArea)
        textArea.select()

        try {
            document.execCommand('copy')
            window.lastCopiedToClipboardText = text
        }
        catch (error) {}
        finally {
            textArea.remove()
        }
    },

    /**
     * @param {String} text
     */
    isCopiedToClipboard: (text) => {
        return window.lastCopiedToClipboardText === text
    },

    /**
     * @return {Boolean}
     */
    isFullscreen: () => {
        return Boolean(document.fullscreenElement)
    },

    /**
     * @param {Number} top
     * @param {Boolean} instant
     */
    scrollTo: (top, instant) => {
        const behavior = instant ?
            "instant" :
            "smooth"

        window.scrollTo({
            top: top,
            behavior: behavior
        })
    },

    /**
     * @public
     */
    toggleFullscreen: () => {
        const isFullscreen = _capabilitiesUtils.isFullscreen()
        if(isFullscreen) {
            document.exitFullscreen()
                .catch(err => {
                    console.warn(`Error attempting to exit full-screen mode: ${err.message}`)
                })
        }
        else {
            document.documentElement.requestFullscreen({ navigationUI: 'hide' })
                .catch(err => {
                    console.warn(`Error attempting to enter full-screen mode: ${err.message}`)
                })
        }
    }
}