/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 * @description This component is a custom hook that provides a way to schedule and manage timeouts and intervals.
 */
const timeouts = []
const intervals = []

export const useScheduler = () => {
    /**
     * @param {Function} callback
     * @param {Number} timeInMilliseconds
     * @param {string} tag
     */
    const schedule = (callback, timeInMilliseconds, tag) => {
        const timeoutId = setTimeout(callback, timeInMilliseconds)
        timeouts.push({id: timeoutId, tag: tag})
    }

    /**
     * @param {Function} callback
     * @param {Number} timeInMilliseconds
     * @param {string} tag
     */
    const interval = (callback, timeInMilliseconds, tag) => {
        const intervalId = setInterval(callback, timeInMilliseconds)
        intervals.push({id: intervalId, tag: tag})
    }

    /**
     * @param {Function} callback
     * @param {String} [tag]
     */
    const dispatchOnNextFrame = (callback, tag) => {
        tag = tag || "dispatch-on-next-frame"
        clearAllWithTag(tag)
        schedule(callback, 35, tag)
    }

    /**
     * @param {String} tag
     */
    const clearAllWithTag = (tag) => {
        for (let i = timeouts.length - 1; i >= 0; i--) {
            if (timeouts[i].tag === tag) {
                clearTimeout(timeouts[i].id)
                timeouts.splice(i, 1)
            }
        }

        for (let i = intervals.length - 1; i >= 0; i--) {
            if (intervals[i].tag === tag) {
                clearInterval(intervals[i].id)
                intervals.splice(i, 1)
            }
        }
    }

    /**
     * @return {void}
     */
    const clearAll = () => {
        timeouts.forEach(timeout => {
            clearTimeout(timeout.id)
        })

        intervals.forEach(interval => {
            clearInterval(interval.id)
        })

        timeouts.length = 0
        intervals.length = 0
    }

    return {
        schedule,
        interval,
        dispatchOnNextFrame,
        clearAllWithTag,
        clearAll
    }
}