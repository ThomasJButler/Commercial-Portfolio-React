import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(options = {}) {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    
    const {
        threshold = 0.1,
        rootMargin = '0px',
        once = true,
        delay = 0
    } = options
    
    useEffect(() => {
        const element = ref.current
        if (!element) return
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                const shouldAnimate = entry.isIntersecting && (!once || !hasAnimated)
                
                if (shouldAnimate) {
                    if (delay > 0) {
                        setTimeout(() => {
                            setIsVisible(true)
                            setHasAnimated(true)
                        }, delay)
                    } else {
                        setIsVisible(true)
                        setHasAnimated(true)
                    }
                } else if (!once) {
                    setIsVisible(false)
                }
            },
            {
                threshold,
                rootMargin
            }
        )
        
        observer.observe(element)
        
        return () => {
            observer.unobserve(element)
        }
    }, [threshold, rootMargin, once, delay, hasAnimated])
    
    return {
        ref,
        isVisible,
        className: isVisible ? 'scroll-animated' : ''
    }
}