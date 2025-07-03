import React from 'react'

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