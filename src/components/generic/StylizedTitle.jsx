import React from 'react'

/**
 * Renders a stylized heading with a highlighted vertical bar and HTML-formatted title text.
 * 
 * @param {Object} props
 * @param {string} props.text - The HTML content to display as the title.
 * @param {string} props.classList - Additional CSS classes to apply to the heading element.
 * @return {JSX.Element} The stylized heading component.
 */
function StylizedTitle({text, classList}) {
    const classes = {tag: 'h3', lineTag: 'eq-h3'}
    const HeadingTag = classes.tag

    return (
        <HeadingTag className={`stylized-title d-flex align-items-center fw-bold ` + classList}>
            <span className={`text-highlight ${classes.lineTag} ms-1 me-2 pe-1`}>|</span>
            <span className={`mb-0`} dangerouslySetInnerHTML={{__html: text}}/>
        </HeadingTag>
    )
}

export default StylizedTitle