import "./ArticleNotFound.scss"
import React, {useEffect, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import {Alert, Row, Col} from "react-bootstrap"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleNotFound({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    const alertMessage = `Component <strong>${dataWrapper.component}</strong> not found! Make sure the component exists and is listed on the <i>SectionBody.ARTICLES</i> dictionary on <b>SectionBody.jsx</b>.`

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-not-found`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <Alert variant={`danger`} className={`text-3 mb-0`}>
                <span dangerouslySetInnerHTML={{__html: alertMessage}}/>
            </Alert>

            <ArticleNotFoundItems dataWrapper={dataWrapper}
                                  selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleNotFoundItems({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)

    return (
        <Row className={`article-not-found-items-row g-3 mt-2`}>
            {filteredItems.map((itemWrapper, key) => (
                <Col className={`col-12 col-xxl-6`}
                     key={key}>
                    <ArticleNotFoundItem itemWrapper={itemWrapper}/>
                </Col>
            ))}
        </Row>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @constructor
 */
function ArticleNotFoundItem({ itemWrapper }) {
    const props = itemWrapper.listProps()

    return (
        <table className={`article-not-found-item-table table table-sm table-bordered text-2`}>
            <tbody>
            {props.map((prop) => (
                <tr key={prop.name}>
                    <th>{prop.name}</th>
                    <td><span dangerouslySetInnerHTML={{__html: prop.value}}/></td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default ArticleNotFound