/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _loggingUtils = {
    /**
     * @param {String} component
     * @param {String} errorMessage
     */
    throwError: (component, errorMessage) => {
        throw new Error(`[${component}] ${errorMessage}`)
    },

    /**
     * @param {String} component
     * @param {String} warningMessage
     */
    warn: (component, warningMessage) => {
        console.warn(`[${component}] ${warningMessage}`)
    }
}