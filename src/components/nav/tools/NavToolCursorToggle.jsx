import React, {useEffect, useState} from 'react'
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import OptionPickerButton from "/src/components/buttons/OptionPickerButton.jsx"

function NavToolCursorToggle() {
    const feedbacks = useFeedbacks()
    const language = useLanguage()

    const isEnabled = feedbacks.animatedCursorEnabled
    const isEnabledAndActive = feedbacks.animatedCursorEnabled && feedbacks.animatedCursorActive

    const options = [
        {
            id: "magic_cursor_on",
            faIcon: "fa-solid fa-wand-magic-sparkles",
            label: language.getString("magic_cursor_on")
        },

        {
            id: "magic_cursor_off",
            faIcon: "fa-solid fa-wand-magic",
            label: language.getString("magic_cursor_off")
        }
    ]

    const selectedOptionId = isEnabledAndActive ?
        "magic_cursor_on" :
        "magic_cursor_off"

    const tooltipLabel = language.getString("magic_cursor_on")

    const _onOptionSelected = () => {
        feedbacks.toggleAnimatedCursorActive()
    }

    return (
        <>
            {isEnabled && (
                <OptionPickerButton mode={OptionPickerButton.Modes.MODE_BUTTON}
                                    options={options}
                                    selectedOptionId={selectedOptionId}
                                    onOptionSelected={_onOptionSelected}
                                    tooltipLabel={tooltipLabel}/>
            )}
        </>
    )
}

export default NavToolCursorToggle