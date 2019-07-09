/* Helper Functions for DBQ-Mapping App */

/* callAPI: submits GET or POST request to API */
export function callAPI(requestURL, method, data) {
    if (method == 'GET') {
        return fetch(requestURL, {
            method: method
        });
    } else if (method == 'POST') {
        return fetch(requestURL, {
            method: method,
            body: data
        });
    }
}

/* downloadFile: downloads returned file */
export function downloadFile(requestURL, filename) {
    // create url pointing to returned file
    const fileLink = document.createElement('a');
    fileLink.href = requestURL;
    fileLink.setAttribute('download', filename);
    document.body.appendChild(fileLink);

    // auto-click link to download file, then cleanup url
    fileLink.click();
    fileLink.parentNode.removeChild(fileLink);
    return;
}
