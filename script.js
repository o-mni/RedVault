// script.js

function showPage(pageId, btn) {
    // hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));

    // show the selected one
    document.getElementById(pageId).classList.remove('hidden');

    // update active button
    document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function copyCommand(codeId, button) {
    const text = document.getElementById(codeId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        const original = button.innerHTML;
        button.innerHTML = `<svg ...>✔︎</svg>`;
        setTimeout(() => button.innerHTML = original, 1000);
    });
}