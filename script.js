function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function copyCommand(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text);
}
