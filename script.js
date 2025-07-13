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

const body = document.body;
const toggleBtn = document.getElementById('menu-toggle');
const overlay = document.getElementById('modal-overlay');
const closeBtn = document.getElementById('modal-close');

// 1) Open the modal
toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    body.classList.add('modal-open');
});

// 2) Close via the “✕”
closeBtn.addEventListener('click', () => {
    body.classList.remove('modal-open');
});

// 3) Close by clicking outside (on the overlay)
overlay.addEventListener('click', () => {
    body.classList.remove('modal-open');
});
