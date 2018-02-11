import jQuery from 'jquery';

let howsLib = {};

// Ajax util
( function () {
    //
    'use strict';

    const contextName = 'HowsCiLibrary';

    /**
     * Get Json AJAX
     *
     * <p>postJSON(String url, Object paramData)</p>
     *
     * @param url url
     * @param param
     * @returns {*}
     */
    howsLib.getJSON = function (url, param) {
        //
        console.debug(`[${contextName}] getJSON : ${url}`);
        if (!url || typeof url !== 'string') {
            console.error(`[${contextName}] Invalid url for Ajax getJSON -> url: ${url}, param: ${param}`);
        }
        return commonRequestJson(url, 'GET', param).pipe(function (jsonResult, status, jqXHR) {
            return jsonResult;
        });
    };

    /**
     * Post Json AJAX
     *
     * <p>postJSON(String url, Object paramData)</p>
     *
     * @param url url
     * @param param
     * @returns {*}
     */
    howsLib.postJSON = function (url, param) {
        //
        if (!url || typeof url !== 'string') {
            console.error(`[${contextName}] Invalid arguments for Ajax postJSON -> url: ${url}, param: ${param}`);
        }
        return commonRequestJson(url, 'POST', param);
    };

    howsLib.putJSON = function (url, param) {
        //
        if (!url || typeof url !== 'string') {
            console.error(`[${contextName}] Invalid arguments for Ajax putJSON -> url: ${url}, param: ${param}`);
        }
        return commonRequestJson(url, 'PUT', param);
    };

    howsLib.deleteJSON = function (url, param) {
        //
        if (!url || typeof url !== 'string') {
            console.error(`[${contextName}] Invalid arguments for Ajax deleteJSON -> url: ${url}, param: ${param}`);
        }
        return commonRequestJson(url, 'DELETE', param);
    };

    let commonRequestJson = function (url, method, param) {
        //
        if (!url || typeof url !== 'string') {
            console.error(`[${contextName}] Invalid arguments for Ajax JSON -> url: ${url}, param: ${param}`);
        }

        let jqAjaxReq = {
            url: url,
            method: method,
            contentType: 'application/json',
            cache: false,
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(`[${contextName}] Fail the request. -> ${textStatus}, ${errorThrown}`);
                if (jqXHR.status === 401) {
                    //
                    location.reload();
                }
            },
            complete: function (jqXHR, textStatus) {
                //
            }
        };

        if (param) {
            jqAjaxReq.data = typeof param === 'object' ? JSON.stringify(param) : param;
        }
        return jQuery.ajax(jqAjaxReq);
    };

})();

export default howsLib
