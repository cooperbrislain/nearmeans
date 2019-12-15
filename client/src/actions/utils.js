// promise for getCurrentPosition
// found here: https://blog.larapulse.com/es-2015/synchronous-fetch-browser-geolocation
export function getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}
