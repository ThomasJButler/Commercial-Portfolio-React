import "./MobileSocialLinks.scss"
import React from 'react'
import FaIcon from "/src/components/generic/FaIcon.jsx"

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

function MobileSocialLinks() {
    return (
        <div className="mobile-social-links">
            {socialLinks.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-social-link"
                    aria-label={link.label}
                >
                    <FaIcon 
                        iconName={link.icon} 
                        className="mobile-social-icon"
                        style={{ color: link.color }}
                    />
                </a>
            ))}
        </div>
    )
}

export default MobileSocialLinks