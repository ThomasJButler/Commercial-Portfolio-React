import "./NavSocialLinks.scss"
import React from 'react'
import FaIcon from "/src/components/generic/FaIcon.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

const socialLinks = [
    {
        href: "https://github.com/ThomasJButler",
        icon: "fa-brands fa-github",
        label: "GitHub",
        color: "#333"
    },
    {
        href: "https://www.linkedin.com/in/thomasbutleruk/",
        icon: "fa-brands fa-linkedin",
        label: "LinkedIn",
        color: "#0077B5"
    }
]

function NavSocialLinks({ shrink }) {
    const {getString} = useLanguage()
    
    return (
        <div className={`nav-social-links ${shrink ? 'nav-social-links-shrink' : ''}`}>
            <div className="social-links-header">
                <span className="text-muted text-uppercase text-1">
                    {getString('connect')}
                </span>
            </div>
            <div className="social-links-wrapper">
                {socialLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label={link.label}
                        title={link.label}
                    >
                        <FaIcon 
                            iconName={link.icon} 
                            className="social-icon"
                            style={{ color: link.color }}
                        />
                        {!shrink && (
                            <span className="social-label">{link.label}</span>
                        )}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default NavSocialLinks