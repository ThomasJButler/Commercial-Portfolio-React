/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _jsonUtils = {
    /**
     * @param {Object} json
     * @return {string}
     */
    sanitizeForLogs: (json) => {
        const hasFilledField = Object.values(json).some((value) => { return value })

        if(!hasFilledField)
            return ""

        return JSON.stringify(json).replaceAll(`",`, `",<br>`)
            .replaceAll(`":`, `": `)
            .replaceAll(`"`, ``)
            .replaceAll(`{`, ``)
            .replaceAll(`}`, ``)
            .replaceAll(` ,`, ``)
    }
}