import "./InfoBadge.scss"
import React, {useEffect, useState} from 'react'

function InfoBadge({ children, faIcon = ``, className = `` }) {
    return (
        <div className={`info-badge ${className}`}>
            <i className={`${faIcon} fa-icon`}/>
            {children}
        </div>
    )
}

export default InfoBadge