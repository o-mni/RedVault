// Snapshot original HTML of each box and initialize filter on load
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.box').forEach(box => {
        box.dataset.original = box.innerHTML;
    });
    filterBoxes();
});

// Escape user input for use in RegExp
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Track the current category filter ('all' sets no category filter)
let activeFilter = '';

// Apply category filter and update UI
function applyFilter(filter, btn) {
    // Update active button styling
    document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 'all' clears the filter, otherwise set to given category
    activeFilter = (filter === 'all' ? '' : filter);

    // Re-run the combined search + category filter
    filterBoxes();
}

// Combined search + category filtering, with highlighting
function filterBoxes() {
    const input = document.getElementById('global-search');
    const q = input?.value.trim().toLowerCase() || '';
    const re = q ? new RegExp(`(${escapeRegExp(q)})`, 'gi') : null;

    document.querySelectorAll('.box').forEach(box => {
        // 1) Restore original content & show by default
        box.innerHTML = box.dataset.original;
        box.style.display = '';

        // 2) Category filter
        if (activeFilter && box.dataset.category !== activeFilter) {
            box.style.display = 'none';
            return;
        }

        // 3) If no search query, skip search filtering
        if (!q) return;

        // 4) Build "haystack" from <h2>, <h4.description>, and .code-snippet <code>
        const titleEl = box.querySelector('h2');
        const descEls = box.querySelectorAll('h4');

        let hay = '';
        if (titleEl) hay += titleEl.innerText + ' ';
        descEls.forEach(el => hay += el.innerText + ' ');
        hay = hay.toLowerCase();

        // 5) Hide boxes that don't match the query
        if (!hay.includes(q)) {
            box.style.display = 'none';
            return;
        }

        // 6) Highlight matches in title, description, and code
        if (titleEl) {
            titleEl.innerHTML = titleEl.innerHTML.replace(re, '<span class="highlight">$1</span>');
        }
        descEls.forEach(el => {
            el.innerHTML = el.innerHTML.replace(re, '<span class="highlight">$1</span>');
        });
    });
    updateTemplates();
}

// Copy command text to clipboard and show a checkmark temporarily
function copyCommand(button) {
    // 1) locate the <code> next to this button
    const snippet = button.closest('.code-snippet');
    const codeEl = snippet.querySelector('code');
    const text = codeEl.innerText;

    // 2) copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        // 3) swap the button icon to a checkmark
        const original = button.innerHTML;
        button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18" fill="currentColor">
        <path d="M9 16.2l-4.2-4.2L3 13.8 9 19.8 21 7.8l-1.4-1.4z"/>
      </svg>
    `;
        // 4) after 1s, restore original icon
        setTimeout(() => button.innerHTML = original, 1000);
    });
}


// after your filterBoxes() definition, or at the bottom of the file:
document.getElementById('search-clear').addEventListener('click', () => {
    const inp = document.getElementById('global-search');
    inp.value = '';
    filterBoxes();
    inp.focus();
});

// called whenever the user types in the target field
function updateTemplates() {
    const tgt = document.getElementById('target-input').value || '{{target}}';
    const local = document.getElementById('local-input')?.value || '{{local}}';
    const port = document.getElementById('port-input')?.value || '{{port}}';
    document.querySelectorAll('code.templated').forEach(codeEl => {
        const tpl = codeEl.dataset.template;
        codeEl.textContent = tpl
            .replace(/{{target}}/g, tgt)
            .replace(/{{local}}/g, local)
            .replace(/{{port}}/g, port);
    });


}

// wire it up
const targetInput = document.getElementById('target-input');
const localInput = document.getElementById('local-input');
const portInput = document.getElementById('port-input');

localInput.addEventListener('input', updateTemplates);
portInput.addEventListener('input', updateTemplates);
targetInput.addEventListener('input', updateTemplates);

// initialize on page load (in case you want a default)
updateTemplates();
