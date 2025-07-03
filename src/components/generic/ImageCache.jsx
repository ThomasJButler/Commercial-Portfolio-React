import React from 'react'

/****
 * React component that preloads a list of image URLs by rendering them as hidden 5x5 pixel images.
 * 
 * Renders a container with two colored squares and a set of invisible images for each provided URL, aiding in image caching without affecting accessibility or layout.
 * 
 * @param {Object} props
 * @param {string[]} props.urls - Array of image URLs to preload.
 * @returns {JSX.Element} The invisible image cache container.
 */
function ImageCache({urls}) {
    return (
        <div className={`image-cache position-absolute invisible`}>
            <div className={`bg-dark`} style={{width: '5px', height: '5px'}}/>
            <div className={`bg-green`} style={{width: '5px', height: '5px'}}/>
            {urls.map((url, key) => (
                <img key={key}
                     alt={`Preloaded image ${key + 1}`}
                     src={url}
                     style={{width: '5px', height: '5px'}}
                     aria-hidden="true"/>
            ))}
        </div>
    )
}

export default ImageCache