/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 * @description This provider is responsible for managing feedbacks, modals and UI interactions.
 */

import React, {createContext, useContext, useEffect, useState} from 'react'
import {useUtils} from "/src/hooks/utils.js"
import {useScheduler} from "/src/hooks/scheduler.js"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import ActivitySpinner from "/src/components/loaders/ActivitySpinner.jsx"
import MouseLayer from "/src/components/mouse/MouseLayer.jsx"
import NotificationsLayer from "/src/components/notifications/NotificationsLayer.jsx"
import YoutubeVideoModal from "/src/components/modals/YoutubeVideoModal.jsx"
import ConfirmationWindowModal from "/src/components/modals/ConfirmationWindowModal.jsx"
import GalleryModal from "/src/components/modals/GalleryModal.jsx"

function FeedbacksProvider({ children, canHaveAnimatedCursor }) {
    const scheduler = useScheduler()
    const language = useLanguage()
    const viewport = useViewport()
    const utils = useUtils()

    const [spinnerActivities, setSpinnerActivities] = useState([])
    const [animatedCursorEnabled, setAnimatedCursorEnabled] = useState(false)
    const [animatedCursorActive, setAnimatedCursorActive] = useState(true)
    const [animatedCursorLocked, setAnimatedCursorLocked] = useState(false)
    const [displayingNotification, setDisplayingNotification] = useState(null)
    const [displayingYoutubeVideo, setDisplayingYoutubeVideo] = useState(null)
    const [displayingGallery, setDisplayingGallery] = useState(null)
    const [pendingConfirmation, setPendingConfirmation] = useState(null)

    /** @listens canHaveAnimatedCursor|viewport.innerWidth **/
    useEffect(() => {
        setAnimatedCursorEnabled(
            canHaveAnimatedCursor &&
            !utils.device.isTouchDevice() &&
            viewport.isBreakpoint("md")
        )
    }, [canHaveAnimatedCursor, viewport.innerWidth])

    const setActivitySpinnerVisible = (visible, activityId, message) => {
        setSpinnerActivities(prev => {
            if (visible) {
                if (prev.some(activity => activity.id === activityId)) return prev
                return [...prev, { id: activityId, message }]
            }
            else {
                return prev.filter(activity => activity.id !== activityId)
            }
        })
    }

    const showActivitySpinnerFor = (milliseconds, activityId, message) => {
        scheduler.clearAllWithTag("spinner-auto-interval")
        setActivitySpinnerVisible(true, activityId, message)
        scheduler.schedule(() => {
            setActivitySpinnerVisible(false, activityId)
        }, milliseconds, "spinner-auto-interval")
    }

    const isShowingActivitySpinner = () => {
        return Boolean(spinnerActivities.length)
    }

    const toggleAnimatedCursorActive = (withNotification) => {
        const newValue = !animatedCursorActive
        setAnimatedCursorActive(newValue)
        if(!withNotification)
            return

        displayNotification(
            language.getString("magic_cursor"),
            language.getString(newValue ? "activate_magic_cursor_message" : "deactivate_magic_cursor_message"),
            "default"
        )
    }

    const displayNotification = (title, message, type) => {
        setDisplayingNotification({
            type: type,
            title: title,
            message: message
        })
    }

    const killNotification = () => {
        setDisplayingNotification(null)
    }

    const displayYoutubeVideo = (url, title, description) => {
        setDisplayingYoutubeVideo({
            url: url,
            title: title,
            description: description
        })
    }

    const closeYoutubeVideo = () => {
        setDisplayingYoutubeVideo(null)
    }

    const displayGallery = (images, type, title) => {
        setDisplayingGallery({
            images: images,
            type: type,
            title: title
        })
    }

    const closeGallery = () => {
        setDisplayingGallery(null)
    }

    const showConfirmationDialog = (title, message, faIcon, onConfirm, confirmLabel, onCancel, cancelLabel) => {
        setPendingConfirmation({
            title: title,
            message: message,
            faIcon: faIcon,
            onConfirm: onConfirm,
            confirmLabel: confirmLabel,
            onCancel: onCancel,
            cancelLabel: cancelLabel
        })
    }

    const isBlockedByOverlay = () => {
        return Boolean(
            isShowingActivitySpinner() ||
            displayingYoutubeVideo ||
            displayingGallery ||
            pendingConfirmation
        )
    }

    return (
        <FeedbacksContext.Provider value={{
            setActivitySpinnerVisible,
            showActivitySpinnerFor,
            isShowingActivitySpinner,

            animatedCursorEnabled,
            animatedCursorActive,
            setAnimatedCursorActive,
            setAnimatedCursorLocked,
            toggleAnimatedCursorActive,

            displayNotification,
            killNotification,

            displayYoutubeVideo,
            closeYoutubeVideo,

            displayGallery,
            closeGallery,

            showConfirmationDialog,
            isBlockedByOverlay
        }}>
            <ActivitySpinner activities={spinnerActivities}
                             defaultMessage={language.getString("loading")}/>

            <MouseLayer active={animatedCursorEnabled && animatedCursorActive}
                        hidden={animatedCursorLocked}
                        isBlockedByOverlay={isBlockedByOverlay()}/>

            <NotificationsLayer target={displayingNotification}
                                onNotificationDismissed={killNotification}/>

            <YoutubeVideoModal target={displayingYoutubeVideo}
                               onDismiss={closeYoutubeVideo}/>

            <ConfirmationWindowModal target={pendingConfirmation}
                                     onDismiss={() => {setPendingConfirmation(null)}}/>

            <GalleryModal target={displayingGallery}
                          onDismiss={closeGallery}/>

            {children}
        </FeedbacksContext.Provider>
    )
}

const FeedbacksContext = createContext(null)
/**
 * @return {{
 *    setActivitySpinnerVisible: Function,
 *    showActivitySpinnerFor: Function,
 *    isShowingActivitySpinner: Function,
 *
 *    animatedCursorEnabled: Boolean,
 *    animatedCursorActive: Boolean,
 *    setAnimatedCursorActive: Function,
 *    setAnimatedCursorLocked: Function,
 *    toggleAnimatedCursorActive: Function,
 *
 *    displayNotification: Function,
 *    killNotification: Function,
 *
 *    displayYoutubeVideo: Function,
 *    closeYoutubeVideo: Function,
 *
 *    displayGallery: Function,
 *    closeGallery: Function,
 *
 *    showConfirmationDialog: Function,
 *    isBlockedByOverlay: Function,
 * }}
 */
export const useFeedbacks = () => useContext(FeedbacksContext)

export default FeedbacksProvider