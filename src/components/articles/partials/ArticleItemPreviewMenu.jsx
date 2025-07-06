import "./ArticleItemPreviewMenu.scss"
import React, {useEffect, useState} from 'react'
import Link from "/src/components/generic/Link.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import CircularButton from "/src/components/buttons/CircularButton.jsx"
import {useUtils} from "/src/hooks/utils.js"

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @param {Boolean} spaceBetween
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemPreviewMenu({ itemWrapper, className = "", spaceBetween }) {
    const utils = useUtils()

    const hasScreenshotsOrVideo = itemWrapper.preview?.hasScreenshotsOrYoutubeVideo
    const hasLinks = itemWrapper.preview?.hasLinks
    const links = itemWrapper.preview?.links

    const linksListClass = utils.string.if(
        hasScreenshotsOrVideo && spaceBetween,
        `justify-content-end`)

    return (
        <div className={`article-item-preview-menu ${className}`}>
            {(hasScreenshotsOrVideo || !spaceBetween) && (
                <div className={`article-item-preview-menu-button-list`}>
                    <ItemPreviewMenuYoutubeButton itemWrapper={itemWrapper}/>
                    <ItemPreviewMenuGalleryButton itemWrapper={itemWrapper}/>
                    {hasLinks && !spaceBetween && (
                        <>
                            {links.map((link, key) => (
                                <ItemPreviewMenuCustomLinkButton link={link}
                                                                 key={key}/>
                            ))}
                        </>
                    )}
                </div>
            )}

            {hasLinks && spaceBetween && (
                <div className={`article-item-preview-menu-button-list ${linksListClass}`}>
                    {links.map((link, key) => (
                        <ItemPreviewMenuCustomLinkButton link={link}
                                                         key={key}/>
                    ))}
                </div>
            )}
        </div>
    )
}

function ItemPreviewMenuYoutubeButton({ itemWrapper }) {
    const language = useLanguage()
    const utils = useUtils()

    const title = itemWrapper.locales.title?.length < 30 ?
        itemWrapper.locales.title :
        language.getString("get_to_know_more")

    const href = itemWrapper.preview?.youtubeVideo
    const metadata = {
        title: title,
        description: utils.string.extractFirstPeriod(itemWrapper.locales.text),
    }

    if(!href)
        return <></>

    return (
        <Link href={href}
              metadata={metadata}
              className={`article-item-preview-menu-link`}
              tooltip={language.getString("watch_video")}>
            <CircularButton variant={CircularButton.Variants.DARK}
                            size={CircularButton.Sizes.EXTRA_EXTRA_LARGE}
                            className={`article-item-preview-menu-circular-button`}
                            tooltip={language.getString("watch_video")}
                            faIcon={`fa-brands fa-youtube`}/>
        </Link>
    )
}

function ItemPreviewMenuGalleryButton({ itemWrapper }) {
    const language = useLanguage()
    const utils = useUtils()

    const screenshots = itemWrapper.preview?.screenshots
    const screenshotsAspectRatio = itemWrapper.preview?.screenshotsAspectRatio

    const splitTitle = utils.string.extractFirstPart(itemWrapper.locales.title || "")
    const title = splitTitle.length < 35 ?
        splitTitle :
        language.getString("get_to_know_more")

    const metadata = {
        title: title,
        images: screenshots,
        aspectRatio: screenshotsAspectRatio,
    }

    if(!screenshots || screenshots.length === 0)
        return <></>

    return (
        <Link href={"#gallery:open"}
              metadata={metadata}
              className={`article-item-preview-menu-link`}
              tooltip={language.getString("watch_video")}>
            <CircularButton variant={CircularButton.Variants.DARK}
                            size={CircularButton.Sizes.EXTRA_EXTRA_LARGE}
                            className={`article-item-preview-menu-circular-button`}
                            tooltip={language.getString("open_gallery")}
                            faIcon={`fa-solid fa-camera`}/>
        </Link>
    )
}

function ItemPreviewMenuCustomLinkButton({ link }) {
    const href = link.href
    const tooltip = link.tooltip
    const faIcon = link.faIcon

    return (
        <Link href={href}
              className={`article-item-preview-menu-link`}
              tooltip={tooltip}>
            <CircularButton variant={CircularButton.Variants.DARK}
                            size={CircularButton.Sizes.EXTRA_EXTRA_LARGE}
                            className={`article-item-preview-menu-circular-button`}
                            tooltip={tooltip}
                            faIcon={faIcon}/>
        </Link>
    )
}

export default ArticleItemPreviewMenu