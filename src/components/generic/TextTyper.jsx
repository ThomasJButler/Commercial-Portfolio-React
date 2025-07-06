import "./TextTyper.scss"
import React, {useEffect, useState} from 'react'
import Animable from "/src/components/capabilities/Animable.jsx"
import {useUtils} from "/src/hooks/utils.js"
import {useNavigation} from "/src/providers/NavigationProvider.jsx"

function TextTyper({ strings, id, typingSpeed = 0.03, deletingSpeed = 0, displayTime = 2, className = "" }) {
    const utils = useUtils()
    const navigation = useNavigation()

    const [parsedStrings, setParsedStrings] = useState(null)
    const [currentText, setCurrentText] = useState("")
    const [targetWord, setTargetWord] = useState("")
    const [status, setStatus] = useState(TextTyper.Status.INITIALIZING)
    const [statusElapsed, setStatusElapsed] = useState(0)
    const [cursorVisible, setCursorVisible] = useState(false)
    const [cursorElapsed, setCursorElapsed] = useState(0)

    const animationId = `text-typer-` + (id || "default")

    useEffect(() => {
        if(!strings || !strings.length)
            return

        _reset()
        setParsedStrings(strings.map(string => { return utils.string.stripHTMLTags(string) }))
    }, [strings])

    const _reset = () => {
        setStatus(TextTyper.Status.INITIALIZING)
        setCurrentText("")
        setTargetWord(null)
        setStatusElapsed(0)
        setCursorVisible(false)
        setCursorElapsed(0)
    }

    const _update = (event) => {
        if(!parsedStrings || !parsedStrings.length) {
            _reset()
            return
        }

        setStatusElapsed(prevState => prevState + event.currentTickElapsed)
        setCursorElapsed(prevState => prevState + event.currentTickElapsed)

        const statusHandlers = {
            [TextTyper.Status.INITIALIZING]:        { hook: _onStatusInitializing },
            [TextTyper.Status.TYPING]:              { hook: _onStatusTyping },
            [TextTyper.Status.SHOWING]:             { hook: _onStatusShowing },
            [TextTyper.Status.DELETING]:            { hook: _onStatusDeleting },
        }

        if(navigation.isTransitioning()) {
            if(targetWord.length > 0) _toggleCursor(0.2)
            else setCursorVisible(false)
            return
        }

        const handler = statusHandlers[status]
        const handlerHook = handler?.hook
        if(handlerHook) handlerHook(event.ticks)
    }

    const _onStatusInitializing = (ticks) => {
        setTargetWord(parsedStrings[0])
        setCursorVisible(false)
        _nextStatus()
    }

    const _onStatusTyping = (ticks) => {
        setCursorVisible(false)
        if(statusElapsed <= typingSpeed)
            return

        const nextChar = targetWord.charAt(currentText.length)
        setCurrentText(currentText + nextChar)
        setStatusElapsed(0)
        if(currentText.length >= targetWord.length) {
            _nextStatus()
        }
    }

    const _onStatusShowing = () => {
        _toggleCursor(0.2)

        if(statusElapsed > displayTime) {
            _nextStatus()
        }
    }

    const _onStatusDeleting = () => {
        if(statusElapsed <= deletingSpeed)
            return

        setCursorVisible(false)

        const currentTextSliced = currentText.slice(0, currentText.length - 1)
        setCurrentText(currentTextSliced)
        if(currentTextSliced.length <= 0) {
            const targetWordIndex = parsedStrings.indexOf(targetWord)
            const nextWordIndex = (targetWordIndex + 1) % parsedStrings.length
            setTargetWord(parsedStrings[nextWordIndex])
            _nextStatus()
        }
    }

    const _nextStatus = () => {
        const order = {
            [TextTyper.Status.INITIALIZING]:        TextTyper.Status.TYPING,
            [TextTyper.Status.TYPING]:              TextTyper.Status.SHOWING,
            [TextTyper.Status.SHOWING]:             TextTyper.Status.DELETING,
            [TextTyper.Status.DELETING]:            TextTyper.Status.TYPING,
        }

        setStatusElapsed(0)

        const nextStatus = order[status]
        if(nextStatus) setStatus(nextStatus)
    }

    const _toggleCursor = (frequency) => {
        if(cursorElapsed > frequency) {
            setCursorVisible(!cursorVisible)
            setCursorElapsed(0)
        }
    }

    return (
        <Animable animationId={animationId}
                  className={`text-typer ${className}`}
                  onEnterFrame={_update}>
            <TextTyperSpan currentText={currentText}
                           cursorVisible={cursorVisible}
                           status={status}/>
        </Animable>
    )
}

function TextTyperSpan({ currentText, cursorVisible, status }) {
    const visibleClass = cursorVisible ?
        `text-typer-span-cursor-visible` :
        ``

    const transitionClass = currentText.length === 0 ?
        `text-typer-span-cursor-no-transition` :
        ``

    const mainText = status === TextTyper.Status.SHOWING ?
        currentText :
        currentText.slice(0, -1)

    const lastChar = status === TextTyper.Status.SHOWING ?
        `` :
        currentText.slice(-1)

    return (
        <span className={`text-typer-span`}>
            {mainText}
            {lastChar && <span className="opacity-50">{lastChar}</span>}
            <span className={`text-typer-span-cursor ${visibleClass} ${transitionClass}`}>_</span>
        </span>
    );
}

TextTyper.Status = {
    INITIALIZING: "initializing",
    TYPING: "typing",
    SHOWING: "showing",
    DELETING: "deleting"
}

export default TextTyper