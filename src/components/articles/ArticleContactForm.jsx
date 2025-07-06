import "./ArticleContactForm.scss"
import React, {useEffect, useState} from 'react'
import {useApi} from "/src/hooks/api.js"
import {useConstants} from "/src/hooks/constants.js"
import {useData} from "/src/providers/DataProvider.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useNavigation} from "/src/providers/NavigationProvider.jsx"
import {useUtils} from "/src/hooks/utils.js"
import Article from "/src/components/articles/base/Article.jsx"
import {RowForm, RowFormGroup, RowFormGroupAlert, RowFormGroupItem, RowFormGroupSubmit} from "/src/components/forms/containers/RowForm.jsx"
import {MessageCard, MessageCardIcon, MessageCardBody, MessageCardFooter} from "/src/components/generic/MessageCard.jsx"
import Input from "/src/components/forms/fields/Input.jsx"
import Textarea from "/src/components/forms/fields/Textarea.jsx"
import StandardButton from "/src/components/buttons/StandardButton.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleContactForm({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const [shouldHideTitle, setShouldHideTitle] = useState(false)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 forceHideTitle={shouldHideTitle}
                 className={`article-contact-form`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleContactFormContent dataWrapper={dataWrapper}
                                       selectedItemCategoryId={selectedItemCategoryId}
                                       setShouldHideTitle={setShouldHideTitle}/>
        </Article>
    )
}

ArticleContactForm.Status = {
    WAITING_FOR_SUBMISSION: "waiting-for-submission",
    SUBMITTING: "submitting",
    SUBMITTED: "submitted",
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @param {Function} setShouldHideTitle
 * @return {JSX.Element}
 * @constructor
 */
function ArticleContactFormContent({ dataWrapper, selectedItemCategoryId, setShouldHideTitle }) {
    const api = useApi()
    const constants = useConstants()
    const data = useData()
    const feedbacks = useFeedbacks()
    const language = useLanguage()
    const navigation = useNavigation()
    const utils = useUtils()

    const id = "contact-form"
    const windowStatus = utils.storage.getWindowVariable(id)

    const [fieldsBundle, setFieldsBundle] = useState(null)
    const [validationError, setValidationError] = useState(null)
    const [status, setStatus] = useState(windowStatus || ArticleContactForm.Status.WAITING_FOR_SUBMISSION)

    const name = fieldsBundle?.name
    const email = fieldsBundle?.email
    const subject = fieldsBundle?.subject
    const message = fieldsBundle?.message
    const emailDisplay = utils.storage.getWindowVariable(id + "-email")
    const didSubmit = status === ArticleContactForm.Status.SUBMITTED

    const errorMessage = validationError ?
        language.getString(validationError.errorCode).replace("{x}", validationError.errorParameter) :
        null

    useEffect(() => {
        const form = document.getElementById(id)

        switch (status) {
            case ArticleContactForm.Status.WAITING_FOR_SUBMISSION:
                form?.reset()
                utils.storage.setWindowVariable(id, null)
                utils.storage.setWindowVariable(id + "-email", null)
                setShouldHideTitle(false)
                break

            case ArticleContactForm.Status.SUBMITTED:
                utils.storage.setWindowVariable(id, ArticleContactForm.Status.SUBMITTED)
                if(email) utils.storage.setWindowVariable(id + "-email", email)
                setShouldHideTitle(true)
                break
        }
    }, [status])

    const _onReset = () => {
        setShouldHideTitle(false)
        setStatus(ArticleContactForm.Status.WAITING_FOR_SUBMISSION)
    }

    const _onSubmit = async (e) => {
        if(status !== ArticleContactForm.Status.WAITING_FOR_SUBMISSION)
            return

        e.preventDefault && e.preventDefault()
        e.stopPropagation && e.stopPropagation()
        navigation.forceScrollToTop()

        const apiValidation = api.validators.validateEmailRequest(name, email, subject, message)
        if(!apiValidation.success) {
            feedbacks.setActivitySpinnerVisible(true, dataWrapper.uniqueId, language.getString("sending_message"))
            setTimeout(() => {
                setValidationError(apiValidation)
                feedbacks.setActivitySpinnerVisible(false, dataWrapper.uniqueId)
            }, 300)
            return
        }

        setValidationError(null)
        setStatus(ArticleContactForm.Status.SUBMITTING)
        feedbacks.setActivitySpinnerVisible(true, dataWrapper.uniqueId, language.getString("sending_message"))

        const fakeEmailRequests = utils.storage.getWindowVariable("fakeEmailRequests") || false

        let apiResponse
        if(!fakeEmailRequests) {
            apiResponse = await api.handlers.sendEmailRequest(
                apiValidation.bundle,
                dataWrapper.settings.emailJsPublicKey,
                dataWrapper.settings.emailJsServiceId,
                dataWrapper.settings.emailJsTemplateId,
            )
        }
        else {
            apiResponse = await api.handlers.dummyRequest()
        }

        feedbacks.setActivitySpinnerVisible(false, dataWrapper.uniqueId)
        _onApiResponse(apiResponse?.success)

    }

    const _onApiResponse = (success) => {
        if(!success) {
            setStatus(ArticleContactForm.Status.WAITING_FOR_SUBMISSION)
            feedbacks.displayNotification(
                language.getString("error"),
                language.getString(constants.ErrorCodes.MESSAGE_SUBMIT_FAILED),
                "error"
            )
        }
        else {
            setStatus(ArticleContactForm.Status.SUBMITTED)
        }
    }

    return (
        <RowForm id={id}
                 onSubmit={_onSubmit}>
            {validationError && (
                <RowFormGroupAlert variant={"danger"}
                                   message={errorMessage}/>
            )}

            {!didSubmit && (
                <ArticleContactFormContentFields onInput={setFieldsBundle}
                                                 didSubmit={didSubmit}/>
            )}

            {didSubmit && (
                <ArticleContactFormSuccessMessage dataWrapper={dataWrapper}
                                                  email={emailDisplay}
                                                  onReset={_onReset}/>
            )}

            {!didSubmit && (
                <RowFormGroupSubmit faIcon={`fa-solid fa-envelope`}
                                    label={language.getString("send_message")}/>
            )}
        </RowForm>
    )
}

/**
 * @param {Function} onInput
 * @param {Boolean} didSubmit
 * @return {JSX.Element}
 * @constructor
 */
function ArticleContactFormContentFields({ onInput, didSubmit }) {
    const language = useLanguage()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const splitColClass = `col-12 col-xl-6`
    const textClass = `text-4`

    useEffect(() => {
        onInput({name, email, subject, message})
    }, [null, name, email, subject, message])

    useEffect(() => {
        if(!didSubmit) {
            setName('')
            setEmail('')
            setSubject('')
            setMessage('')
        }
    }, [didSubmit])

    return (
        <>
            <RowFormGroup className={`${splitColClass}`}>
                <RowFormGroupItem>
                    <Input id={`contact-form-name`}
                           name={`name`}
                           type={`text`}
                           model={name}
                           setModel={setName}
                           faIconPrefix={`fa-solid fa-signature`}
                           placeholder={language.getString("name")}
                           className={textClass}
                           required={true}/>
                </RowFormGroupItem>

                <RowFormGroupItem>
                    <Input id={`contact-form-email`}
                           name={`email`}
                           type={`email`}
                           model={email}
                           setModel={setEmail}
                           faIconPrefix={`fa-solid fa-envelope`}
                           placeholder={language.getString("email")}
                           className={textClass}
                           required={true}/>
                </RowFormGroupItem>

                <RowFormGroupItem>
                    <Input id={`contact-form-subject`}
                           name={`contact-message-subject`}
                           type={`text`}
                           model={subject}
                           setModel={setSubject}
                           faIconPrefix={`fa-solid fa-pen-to-square`}
                           placeholder={language.getString("subject")}
                           className={textClass}
                           required={true}/>
                </RowFormGroupItem>
            </RowFormGroup>

            <RowFormGroup className={`${splitColClass}`}>
                <RowFormGroupItem>
                    <Textarea id={`contact-form-textarea`}
                              name={`message`}
                              model={message}
                              setModel={setMessage}
                              placeholder={language.getString("message")}
                              className={textClass}
                              required={true}/>
                </RowFormGroupItem>
            </RowFormGroup>
        </>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} email
 * @param {Function} onReset
 * @return {JSX.Element}
 * @constructor
 */
function ArticleContactFormSuccessMessage({ dataWrapper, email, onReset }) {
    const language = useLanguage()

    const formattedEmail = `<br>«<span class="me-1"></span>${email}<span class="ms-1"></span>»`

    return (
        <MessageCard>
            <MessageCardIcon faIcon={`fa-solid fa-envelope-circle-check`}/>

            <MessageCardBody title={dataWrapper.locales.contactThankYouTitle}
                             text={dataWrapper.locales.contactThankYouBody}/>

            <MessageCardFooter text={dataWrapper.locales.contactThankYouFooter.replace("$email", formattedEmail)}>
                <StandardButton className={`article-contact-form-reset-button`}
                                variant={`primary`}
                                faIcon={`fa-regular fa-envelope`}
                                label={language.getString("send_another_message")}
                                tooltip={language.getString("send_another_message")}
                                onClick={onReset}/>
            </MessageCardFooter>
        </MessageCard>
    )
}

export default ArticleContactForm
