/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _fileUtils = {
    /**
     * @string
     */
    BASE_URL: import.meta.env.BASE_URL,

    /**
     * @param {String} url
     * @param {String} filename
     */
    download: (url, filename) => {
        window.open(_fileUtils.resolvePath(url), "_blank")
    },

    /**
     * @param {String} path
     * @return {Promise<any>}
     */
    loadJSON: async (path) => {
        try {
            const resolvedPath = _fileUtils.resolvePath(path)
            const response = await fetch(resolvedPath)
            const contentType = response.headers.get("content-type") || ""

            if (!response.ok || !contentType.includes("application/json")) {
                return null
            }

            return await response.json()
        }
        catch (error) {
            console.error(`Failed to load JSON from ${path}:`, error)
            return null
        }
    },

    /**
     * @param {String} path
     * @return {String}
     */
    resolvePath: (path) => {
        if(!path)
            return null
            
        if(path.startsWith("http"))
            return path
            
        // Remove trailing slash from base URL to prevent double slashes
        const baseUrl = (_fileUtils.BASE_URL || "").replace(/\/$/, "")
        
        // Ensure path starts with /
        if(path.charAt(0) !== '/') {
            path = '/' + path
        }
        
        return baseUrl + path
    },
}