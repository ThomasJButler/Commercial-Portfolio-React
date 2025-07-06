/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _cssUtils = {
    /**
     * @const
     **/
    BREAKPOINTS: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
    },

    /**
     * @param {String} variable
     * @return {string | null}
     */
    getRootSCSSVariable: (variable) => {
        const root = document.documentElement
        const computedStyle = getComputedStyle(root)
        const propertyValue = computedStyle?.getPropertyValue(variable) || ""
        return propertyValue?.trim() || null
    },

    /**
     * @param {String} hex
     * @param {Number} opacity
     * @return {`rgba(${number}, ${number}, ${number}, ${string})`}
     */
    hexToRgba: (hex, opacity) => {
        hex = hex.replace('#', '')

        const bigint = parseInt(hex, 16)
        const r = (bigint >> 16) & 255
        const g = (bigint >> 8) & 255
        const b = bigint & 255

        return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }
}