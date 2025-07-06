import React, {useEffect, useState} from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import OptionPickerButton from "/src/components/buttons/OptionPickerButton.jsx"
import {useUtils} from "/src/hooks/utils.js"

function NavToolLanguagePicker() {
    const language = useLanguage()
    const utils = useUtils()

    const supportsMultipleLanguages = language.supportsMultipleLanguages
    const availableLanguages = language.getAvailableLanguages(false)
    const selectedLanguage = language.getSelectedLanguage()

    const options = availableLanguages.map(lang => {
        return {
            id: lang.id,
            label: lang.name,
            img: utils.file.resolvePath(lang.flagUrl)
        }
    })

    const _onOptionSelected = (optionId) => {
        const targetLanguage = availableLanguages.find(lang => lang.id === optionId)
        if(targetLanguage) {
            language.setSelectedLanguage(targetLanguage)
        }
    }

    return (
        <>
            {supportsMultipleLanguages && (
                <OptionPickerButton mode={OptionPickerButton.Modes.MODE_DROPDOWN}
                                    options={options}
                                    selectedOptionId={selectedLanguage?.id}
                                    onOptionSelected={_onOptionSelected}
                                    tooltipLabel={language.getString("select_language")}/>
            )}
        </>
    )
}

export default NavToolLanguagePicker