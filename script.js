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

function showPage(pageId, button) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });

    // Show the selected page
    document.getElementById(pageId).classList.remove('hidden');

    // Remove .active from all buttons
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add .active to the clicked button
    button.classList.add('active');
}

function copyCommand(codeId, button) {
    const text = document.getElementById(codeId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        // Save original SVG content
        const originalSVG = button.innerHTML;

        // Replace with a checkmark SVG
        button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18" fill="currentColor">
        <path d="M9 16.2l-4.2-4.2L3 13.8 9 19.8 21 7.8l-1.4-1.4z"/>
      </svg>
    `;

        // Revert back after 1 second
        setTimeout(() => {
            button.innerHTML = originalSVG;
        }, 1000);
    });
}

const menuToggle = document.getElementById('menu-toggle');
const body = document.body;
menuToggle.addEventListener('click', () => {
    body.classList.toggle('menu-open');
});
