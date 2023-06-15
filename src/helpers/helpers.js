export function oauthModal(url) {
    return new Promise((resolve, reject) => {
        const win = window.open(url, '_blank', 'width=800,height=600')
        const timer = setInterval(function () {
            if (win.closed) {
                clearInterval(timer)
                resolve()
            }
        }, 1000)
    })
}

export function goTo(href, data = []) {
    window.location.href = href;
}