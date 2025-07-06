import "./Separator.scss"
import React, {useEffect, useState} from 'react'

function Separator({ className = "" }) {
    return (
        <hr className={`separator ${className}`}>
        </hr>
    )
}

export default Separator