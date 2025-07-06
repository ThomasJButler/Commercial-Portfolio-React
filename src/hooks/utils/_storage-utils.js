/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _storageUtils = {
    LOCAL_STORAGE_ID: "storage-preferences",

    /**
     * @return {Object}
     */
    getPreference: () => {
        const raw = window.localStorage.getItem(_storageUtils.LOCAL_STORAGE_ID)
        return JSON.parse(raw) || {}
    },

    /**
     * @param id
     * @param value
     */
    setPreference: (id, value) => {
        const preferences = _storageUtils.getPreference()
        preferences[id] = value

        window.localStorage.setItem(
            _storageUtils.LOCAL_STORAGE_ID,
            JSON.stringify(preferences)
        )
    },

    /**
     * @param {String} id
     * @return {*}
     */
    getWindowVariable: (id) => {
        return window[id]
    },

    /**
     * @param {String} id
     * @param value
     */
    setWindowVariable: (id, value) => {
        window[id] = value
    },

    getPreferredLanguage: () => _storageUtils.getPreference()["preferredLanguage"],
    setPreferredLanguage: (value) => _storageUtils.setPreference("preferredLanguage", value),
    getPreferredTheme: () => _storageUtils.getPreference()["preferredTheme"],
    setPreferredTheme: (value) => _storageUtils.setPreference("preferredTheme", value),
}