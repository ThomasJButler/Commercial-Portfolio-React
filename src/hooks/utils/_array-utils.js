/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _arrayUtils = {
    /**
     * @param {Array} array
     * @param {string} key
     * @return {boolean}
     */
    hasDuplications: (array, key) => {
        const seen = new Set()
        for (const item of array) {
            if (seen.has(item[key]))
                return true

            seen.add(item[key])
        }
        return false
    },

    /**
     * @param {Array} array
     * @return {String}
     */
    toHtmlList: (array) => {
        if(!array.length)
            return ``

        let list = `<ul class="list-style-none">`
        array.forEach(item => { list += `<li>${item}</li>` })
        return list + `</ul>`
    },

    /**
     * @param {Array} array
     * @param {String} itemId
     * @param {String} fallbackId
     * @return {*}
     */
    withId: (array, itemId, fallbackId) => {
        const item = array.find(item => item.id === itemId)
        if(item) return item
        return array.find(item => item.id === fallbackId)
    }
}