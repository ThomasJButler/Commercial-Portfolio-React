/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 * @description This provider manages the navigation between sections and categories in the application.
 */

import React, {createContext, useContext, useEffect, useState} from 'react'
import {useLocation} from "/src/providers/LocationProvider.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useConstants} from "/src/hooks/constants.js"
import {useScheduler} from "/src/hooks/scheduler.js"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useUtils} from "/src/hooks/utils.js"
import {useLayout} from "/src/hooks/layout.js"

function NavigationProvider({ children, sections, categories }) {
    const language = useLanguage()
    const location = useLocation()
    const feedbacks = useFeedbacks()
    const constants = useConstants()
    const scheduler = useScheduler()
    const viewport = useViewport()
    const utils = useUtils()
    const layout = useLayout()

    const [didMount, setDidMount] = useState(false)
    const [transitionStatus, setTransitionStatus] = useState(NavigationProvider.TransitionStatus.NONE)
    const [transitionEnabled, setTransitionEnabled] = useState(true)
    const [ignoreNextLocationEvent, setIgnoreNextLocationEvent] = useState(false)
    const [resettingScrollYTo, setResettingScrollYTo] = useState(null)
    const [shouldForceScrollToTopCount, setShouldForceScrollToTopCount] = useState(false)

    const [targetSection, setTargetSection] = useState(null)
    const [previousSection, setPreviousSection] = useState(null)
    const [nextSection, setNextSection] = useState(null)
    const [scheduledNextSection, setScheduledNextSection] = useState(null)

    const [sectionLinks, setSectionLinks] = useState([])
    const [categoryLinks, setCategoryLinks] = useState([])

    const canTransitionToNextSection = nextSection && transitionStatus === NavigationProvider.TransitionStatus.NONE

    /** @constructs **/
    useEffect(() => {
        setDidMount(true)
        _updateLinks(null, null)
        return () => { setDidMount(false) }
    }, [null])

    /**
     * @listens language.getSelectedLanguage()
     */
    useEffect(() => {
        _updateLinks(targetSection, targetSection?.category)
    }, [language.getSelectedLanguage()])

    /**
     * @listens viewport.getBreakpoint()
     */
    useEffect(() => {
        utils.capabilities.scrollTo(0, true)
    }, [viewport.getBreakpoint()])

    /**
     * @listens canTransitionToNextSection
     */
    useEffect(() => {
        if(!canTransitionToNextSection)
            return

        if(viewport.isDesktopLayout()) _startTransition()
        else _adjustScrollBeforeTransition()
    }, [canTransitionToNextSection])

    const _startTransition = () => {
        setPreviousSection(targetSection)
        setTargetSection(nextSection)
        _updateLinks(nextSection, nextSection.category)

        if(!transitionEnabled) {
            setTransitionStatus(NavigationProvider.TransitionStatus.FINISHING)
            return
        }

        setTransitionStatus(NavigationProvider.TransitionStatus.RUNNING)
        scheduler.clearAllWithTag("transition-to-next-section")
        scheduler.schedule(() => {
            setTransitionStatus(NavigationProvider.TransitionStatus.FINISHING)
        }, constants.SECTION_TRANSITION_TOTAL_TIME, "transition-to-next-section")
    }

    const _adjustScrollBeforeTransition = () => {
        const mobileNavData = layout.getMobileNavData(viewport.scrollY)
        const didChangeCategory = targetSection?.category.id !== nextSection?.category.id

        scheduler.clearAllWithTag("adjust-scroll-top")

        if(!mobileNavData.isHeaderHidden) {
            if(didChangeCategory)
                utils.capabilities.scrollTo(0, false)
            _startTransition()
            return
        }

        if(nextSection?.category?.sections?.length <= 1) {
            utils.capabilities.scrollTo(0, false)
            _scheduleTransitionStart(0)
            return
        }

        _updateLinks(nextSection, nextSection?.category)
        utils.capabilities.scrollTo(mobileNavData.contentTop, false)
        _scheduleTransitionStart(mobileNavData.contentTop)
    }

    const _scheduleTransitionStart = (initialScrollY) => {
        setResettingScrollYTo(initialScrollY)

        let acc = 0
        scheduler.interval(() => {
            acc += 100
            if(Math.abs(window.scrollY - initialScrollY) < 10 || acc === 1000) {
                _startTransitionAfterScroll(initialScrollY)
            }
        }, 100, "adjust-scroll-top")
    }

    const _startTransitionAfterScroll = (initialScrollY) => {
        scheduler.clearAllWithTag("adjust-scroll-top")
        utils.capabilities.scrollTo(initialScrollY, true)
        setResettingScrollYTo(null)
        _startTransition()
    }

    /**
     * @listens transitionStatus
     */
    useEffect(() => {
        const isRunning = transitionStatus === NavigationProvider.TransitionStatus.RUNNING
        const isFinishing = transitionStatus === NavigationProvider.TransitionStatus.FINISHING

        feedbacks.setAnimatedCursorLocked(isRunning)

        if(isFinishing) _finishTransition()
    }, [transitionStatus])

    const _finishTransition = () => {
        if(!scheduledNextSection) {
            setNextSection(null)
            setScheduledNextSection(null)

            setIgnoreNextLocationEvent(true)
            location.goToSection(targetSection)

            scheduler.clearAllWithTag("set-ignore-next-location-event")
            scheduler.schedule(() => {
                setIgnoreNextLocationEvent(false)
            }, 100, "set-ignore-next-location-event")
            setTransitionStatus(NavigationProvider.TransitionStatus.NONE)
            return
        }

        setTransitionStatus(NavigationProvider.TransitionStatus.NONE)
        setNextSection(scheduledNextSection)
        setScheduledNextSection(null)
    }

    /** @listens scheduledNextSection **/
    useEffect(() => {
        if(!scheduledNextSection) {
            scheduler.clearAllWithTag("scheduled-next-section-spinner")
            scheduler.schedule(() => {
                feedbacks.setActivitySpinnerVisible(false, "scheduled-next-section", language.getString("loading"))
            }, 300, "scheduled-next-section-spinner")
        }
        else {
            feedbacks.setActivitySpinnerVisible(true, "scheduled-next-section", language.getString("loading"))
        }
    }, [scheduledNextSection])

    /** @listens location.getActiveSection() **/
    useEffect(() => {
        if(ignoreNextLocationEvent) {
            setIgnoreNextLocationEvent(false)
            return
        }

        const locationSection = location.getActiveSection()
        setTransitionEnabled(Boolean(targetSection))
        navigateToSection(locationSection)
    }, [location.getActiveSection()])

    /** @listens !nextSection && scheduledNextSection **/
    useEffect(() => {
        if(!nextSection && scheduledNextSection && transitionStatus === NavigationProvider.TransitionStatus.NONE) {
            setNextSection(scheduledNextSection)
            setScheduledNextSection(null)
        }
    }, [!nextSection && scheduledNextSection && transitionStatus === NavigationProvider.TransitionStatus.NONE])

    const navigateToSection = (section) => {
        if(!nextSection) {
            if(targetSection !== section) setNextSection(section)
            else forceScrollToTop()
        }

        else if(section !== nextSection) {
            setScheduledNextSection(section)
            if(resettingScrollYTo) {
                _startTransitionAfterScroll(resettingScrollYTo)
            }
        }
    }

    const navigateToSectionWithId = (sectionId) => {
        const section = sections.find(({ id }) => id === sectionId)
        navigateToSection(section)
    }

    const navigateToSectionWithLink = (href) => {
        setTransitionEnabled(true)

        if(href.startsWith("#cat:")) {
            const categoryId = href.replaceAll("#cat:", "")
            const category = categories.find(({ id }) => id === categoryId)
            if(!category)
                return

            const sectionId = location.visitHistoryByCategory[category.id] || category.sections[0].id
            navigateToSectionWithId(sectionId)
        }
        else {
            const sectionId = href.replaceAll("#", "")
            const section = sections.find(({ id }) => id === sectionId)
            navigateToSection(section)
        }
    }

    const isTransitioning = () => {
        return transitionStatus === NavigationProvider.TransitionStatus.RUNNING
    }

    const _updateLinks = (targetSection, targetCategory) => {
        const sectionLinks = sections.map(({ id, categoryId, faIcon, data }) => ({
            id,
            categoryId,
            href: `#${id}`,
            label: language.getTranslation(data?.title?.locales, "title_short_nav"),
            faIcon,
            active: targetSection?.id === id
        }))

        const categoryLinks = categories.map(({ id, faIcon, locales }) => ({
            id,
            href: `#cat:${id}`,
            label: language.getTranslation(locales, "title"),
            faIcon,
            active: targetCategory?.id === id
        }))

        setSectionLinks(sectionLinks)
        setCategoryLinks(categoryLinks)
    }

    const forceScrollToTop = () => {
        if(viewport.isMobileLayout()) {
            const mobileNavData = layout.getMobileNavData(window.scrollY)
            if(mobileNavData.navHeaderElHeight) {
                window.scrollTo({
                    top: mobileNavData.contentTop,
                    behavior: "smooth"
                })
            }
        }

        setShouldForceScrollToTopCount(prev => prev + 1)
    }

    return (
        <NavigationContext.Provider value={{
            targetSection,
            previousSection,
            nextSection,
            scheduledNextSection,
            sectionLinks,
            categoryLinks,
            transitionStatus,
            shouldForceScrollToTopCount,
            navigateToSectionWithLink,
            navigateToSection,
            navigateToSectionWithId,
            isTransitioning,
            forceScrollToTop
        }}>
            {didMount && children}
        </NavigationContext.Provider>
    )
}

NavigationProvider.TransitionStatus = {
    NONE: "transition_status_none",
    RUNNING: "transition_status_running",
    FINISHING: "transition_status_finishing",
}

const NavigationContext = createContext(null)
/**
 * @return {{
 *    targetSection: Object,
 *    previousSection: Object,
 *    nextSection: Object,
 *    scheduledNextSection: Object,
 *    sectionLinks: Array,
 *    categoryLinks: Array,
 *    transitionStatus: String,
 *    shouldForceScrollToTopCount: Number,
 *    navigateToSectionWithLink: Function,
 *    navigateToSection: Function,
 *    navigateToSectionWithId: Function,
 *    isTransitioning: Function,
 *    forceScrollToTop: Function,
 * }}
 */
export const useNavigation = () => useContext(NavigationContext)

export default NavigationProvider