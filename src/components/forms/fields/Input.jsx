import "./Input.scss"
import React, {useEffect, useState} from 'react'
import InputFieldWrapper from "/src/components/forms/base/InputFieldWrapper.jsx"
import {useUtils} from "/src/hooks/utils.js"

function Input({
    id,
    name = "",
    model = "",
    setModel = null,
    faIconPrefix = "",
    required = false,
    type = "text",
    className = "",
    placeholder = "",
    maxLength = 128
}) {
    const utils = useUtils()

    const [isFocused, setIsFocused] = useState(false)
    const placeholderFull = `${placeholder}${utils.string.if(required, " *")}`
    const focusClass = utils.string.if(isFocused, "form-input-focused")

    return (
        <InputFieldWrapper isFocused={isFocused}
                           faIconPrefix={faIconPrefix}>
            <input className={`form-control form-input ${focusClass} ${className}`}
                   id={id}
                   type={type}
                   name={name}
                   value={model}
                   placeholder={placeholderFull}
                   required={required}
                   maxLength={maxLength}
                   onChange={(e) => { setModel && setModel(e.target.value) }}
                   onFocus={(e) => { setIsFocused(true) }}
                   onBlur={(e) => { setIsFocused(false) }}/>
        </InputFieldWrapper>
    )
}

export default Input