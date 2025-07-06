/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 * @description This file contains a collection of utility functions that can be used throughout the application.
 */
import {_arrayUtils} from "./utils/_array-utils.js"
import {_capabilitiesUtils} from "./utils/_capabilities-utils.js"
import {_cssUtils} from "./utils/_css-utils.js"
import {_dateUtils} from "./utils/_date-utils.js"
import {_deviceUtils} from "./utils/_device-utils.js"
import {_domUtils} from "./utils/_dom-utils.js"
import {_fileUtils} from "./utils/_file-utils.js"
import {_jsonUtils} from "./utils/_json-utils.js"
import {_loggingUtils} from "./utils/_logging-utils.js"
import {_numberUtils} from "./utils/_number-utils.js"
import {_storageUtils} from "./utils/_storage-utils.js"
import {_stringUtils} from "./utils/_string-utils.js"
import {_urlUtils} from "./utils/_url-utils.js"
import {_validationUtils} from "./utils/_validation-utils.js"

export const useUtils = () => {
    const array = _arrayUtils
    const capabilities = _capabilitiesUtils
    const css = _cssUtils
    const date = _dateUtils
    const device = _deviceUtils
    const dom = _domUtils
    const file = _fileUtils
    const json = _jsonUtils
    const log = _loggingUtils
    const number = _numberUtils
    const storage = _storageUtils
    const string = _stringUtils
    const url = _urlUtils
    const validation = _validationUtils

    return {
        array,
        capabilities,
        css,
        date,
        device,
        dom,
        file,
        json,
        log,
        number,
        storage,
        string,
        url,
        validation
    }
}