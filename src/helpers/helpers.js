export function oauthModal(url) {
    window.open(url, '_blank', 'width=800,height=600');
}

export function goTo(href, data = []) {
    window.location.href = href;
}