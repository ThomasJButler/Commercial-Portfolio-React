import "./RowForm.scss"
import React, {useEffect, useState} from 'react'
import {Alert, Row} from "react-bootstrap"
import StandardButton from "/src/components/buttons/StandardButton.jsx"
import {useTheme} from "/src/providers/ThemeProvider.jsx"

function RowForm({ children, id, className = "", onSubmit }) {
    const theme = useTheme()

    useEffect(() => {
        const form = document.getElementById(id)
        form?.reset()
    }, [theme.getSelectedTheme()])

    return (
        <form id={id}
              onSubmit={onSubmit}>
            <Row className={`row-form gx-3 ${className}`}>
                {children}
            </Row>
        </form>
    )
}

function RowFormGroup({ children, className = "" }) {
    return (
        <div className={`row-form-group ${className}`}>
            {children}
        </div>
    )
}

function RowFormGroupItem({ children, className = "" }) {
    return (
        <div className={`row-form-group-item ${className}`}>
            {children}
        </div>
    )
}

function RowFormGroupAlert({ variant, message }) {
    return (
        <RowFormGroup className={`row-form-alert col-12`}>
            <Alert className={`text-3`}
                   dismissible={false}
                   variant={variant}>
                <i className={`fa-solid fa-warning me-2`}/>
                <span dangerouslySetInnerHTML={{__html: message}}/>
            </Alert>
        </RowFormGroup>
    )
}

function RowFormGroupSubmit({ label, faIcon }) {
    return (
        <RowFormGroup className={`row-form-submit col-12`}>
            <RowFormGroupItem>
                <StandardButton label={label}
                                faIcon={faIcon}
                                type={`submit`}
                                size={StandardButton.Size.LARGE}
                                tooltip={label}/>
            </RowFormGroupItem>
        </RowFormGroup>
    )
}

export {
    RowForm,
    RowFormGroup,
    RowFormGroupItem,
    RowFormGroupAlert,
    RowFormGroupSubmit
}