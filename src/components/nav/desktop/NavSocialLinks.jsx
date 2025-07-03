import "./NavSocialLinks.scss"
import React from 'react'
import ExternalLink from "/src/components/generic/ExternalLink.jsx"
import FaIcon from "/src/components/generic/FaIcon.jsx"

function NavSocialLinks({ shrink }) {
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

    return (
        <div className={`nav-social-links ${shrink ? 'nav-social-links-shrink' : ''}`}>
            {socialLinks.map((link, index) => (
                <ExternalLink 
                    key={index}
                    href={link.href} 
                    className="social-link"
                    style={{ '--social-color': link.color }}
                >
                    <FaIcon 
                        iconName={link.icon} 
                        className={`social-icon ${shrink ? 'social-icon-large' : ''}`}
                    />
                    {!shrink && <span className="social-label">{link.label}</span>}
                </ExternalLink>
            ))}
        </div>
    )
}

export default NavSocialLinks