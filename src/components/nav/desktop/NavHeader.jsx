import "./NavHeader.scss"
import React from 'react'
import {useUtils} from "/src/helpers/utils.js"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useData} from "/src/providers/DataProvider.jsx"
import ImageView from "/src/components/generic/ImageView.jsx"
import StatusBadge from "/src/components/generic/StatusBadge.jsx"

/**
 * Renders the navigation header with profile picture, status badge, logo, stylized name, and role information.
 * 
 * @param {Object} props
 * @param {boolean} props.shrink - If true, renders the header in a compact style.
 * @returns {JSX.Element} The navigation header component.
 */
function NavHeader({ shrink }) {
    const utils = useUtils()
    const {getTranslation} = useLanguage()
    const {getSettings} = useData()

    const settings = getSettings()

    const profile = settings.profile
    const stylizedName = utils.parseJsonText(profile["stylizedName"])
    const role = utils.parseJsonText(getTranslation(profile["locales"], "role"))
    const pfpUrl = utils.resolvePath(profile["profilePictureUrl"])
    const logoUrl = utils.resolvePath(profile["logoUrl"])

    const status = settings.status
    const statusVisible = status['visible']
    const statusAvailable = status['available']
    const statusMessage = getTranslation(status['locales'], 'message')

    return (
        <header className={`nav-header ${shrink ? "nav-header-shrink" : ""}`}>
            <ImageView src={pfpUrl}
                       className={`img-view-avatar`}
                       alt="Profile picture"/>

            {statusVisible && (
                <StatusBadge available={statusAvailable}
                         message={statusMessage}
                         smallMode={shrink}/>
            )}

            <div className={`info mt-3 text-center`}>
                <h1 className={`name h5`}>
                    <ImageView src={logoUrl}
                               alt=""
                               className={`img-view-logo me-1`}/>

                    <span dangerouslySetInnerHTML={{__html:stylizedName}}/>
                </h1>

                <div className={`role`}>
                    <span>{role}</span>
                </div>
            </div>
        </header>
    )
}

export default NavHeader