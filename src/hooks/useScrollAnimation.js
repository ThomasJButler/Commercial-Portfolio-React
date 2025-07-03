import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(options = {}) {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)

    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true,
        delay = 0
    } = options

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
                    setTimeout(() => {
                        setIsVisible(true)
                        setHasAnimated(true)
                    }, delay)
                } else if (!triggerOnce && !entry.isIntersecting) {
                    setIsVisible(false)
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(element)

        return () => {
            if (element) {
                observer.unobserve(element)
            }
        }
    }, [threshold, rootMargin, triggerOnce, hasAnimated, delay])

    return { ref, isVisible }
}