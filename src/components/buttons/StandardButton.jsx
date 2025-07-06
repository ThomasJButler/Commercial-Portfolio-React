import "./StandardButton.scss"
import React, {useEffect, useState} from 'react'

function StandardButton({ label, onClick = null, id = null, type = null, className = "", variant = "primary", faIcon = "", tooltip = "", displayIconAsSuffix = false, size = "btn-default-size", status = "btn-enabled" }) {
    return (
        <button id={id}
                type={type}
                className={`standard-button btn text-3 btn-${variant} ${className} ${status} ${size}`}
                data-tooltip={tooltip}
                onClick={onClick}>
            {!displayIconAsSuffix && faIcon && (
                <i className={`${faIcon} me-2`}/>
            )}

            <span dangerouslySetInnerHTML={{__html: label}}/>

            {displayIconAsSuffix && faIcon && (
                <i className={`${faIcon} ms-1`}/>
            )}
        </button>
    )
}

StandardButton.Status = {
    ENABLED: "btn-enabled",
    DISABLED: "btn-disabled",
    SELECTED: "btn-selected"
}

StandardButton.Size = {
    DEFAULT: "standard-button-default-size",
    LARGE: "standard-button-large-size"
}

export default StandardButton