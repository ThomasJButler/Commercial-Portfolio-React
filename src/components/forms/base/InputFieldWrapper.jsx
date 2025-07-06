import "./InputFieldWrapper.scss"
import React, {useEffect, useState} from 'react'
import {InputGroup} from "react-bootstrap"
import InputGroupText from "react-bootstrap/InputGroupText"

function InputFieldWrapper({ children, isFocused = false, faIconPrefix = "" }) {
    const focusClass = isFocused ?
        "input-field-wrapper-focused" :
        ""

    return (
        <InputGroup className={`input-field-wrapper ${focusClass}`}>
            {faIconPrefix && (
                <InputFieldWrapperPrefixIcon isFocused={isFocused}
                                             faIcon={faIconPrefix}/>
            )}

            {children}
        </InputGroup>
    )
}

function InputFieldWrapperPrefixIcon({ isFocused, faIcon }) {
    const focusClass = isFocused ?
        "input-field-wrapper-attach-focused" :
        ""

    return (
        <InputGroupText className={`input-field-wrapper-attach ${focusClass}`}>
            <i className={faIcon}/>
        </InputGroupText>
    )
}

export default InputFieldWrapper