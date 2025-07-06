import "./Textarea.scss"
import React, {useEffect, useState} from 'react'
import InputFieldWrapper from "/src/components/forms/base/InputFieldWrapper.jsx"
import {useUtils} from "/src/hooks/utils.js"

function TextArea({
   id,
   name = "",
   model = "",
   setModel = null,
   required = false,
   className = "",
   placeholder = "",
   maxLength = 2048
}) {
    const utils = useUtils()

    const [isFocused, setIsFocused] = useState(false)
    const placeholderFull = `${placeholder}${utils.string.if(required, " *")}`
    const focusClass = utils.string.if(isFocused, "form-textarea-focused")

    return (
        <InputFieldWrapper isFocused={isFocused}>
            <textarea className={`form-control form-textarea ${focusClass} ${className}`}
                      id={id}
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

export default TextArea