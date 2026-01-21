// ===== constants =====

const CONTROL_ICON =`
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d=" M 25 8 H 75 V 48 H 95 L 50 92 L 5 48 H 25 Z" stroke-width="7"/>
  </svg>`;
const ACTION_ICON =`
  <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d=" M 23 5 H 57 V 35 H 75 L 40 65 L 5 35 H 23 Z" stroke-width="6" />
    <line x1="10" y1="75" x2="70" y2="75" stroke-width="7"/>
  </svg>`;

const CLOSE_BUTTON_HTML = `
  <button class="md-close-btn" aria-label="Close">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.293 5.293 12 10.586 6.707 5.293a1 1 0 10-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414Z"/>
    </svg>
  </button>
`;

// ===== styles =====

const STYLES = []

STYLES.push({
  id: 'md-styles',
  css: `
  html[dark] {
    --md-action-bg: 255,255,255;
    --md-action-bg-opacity: 0.1;
    --md-action-fg: rgba(241, 241, 241, 1);
    --md-action-menu-bg: rgba(40,40,40,1);
  }

  /* Light mode */
  html:not([dark]) {
    --md-action-bg: 0,0,0;
    --md-action-bg-opacity: 0.05;
    --md-action-fg: rgba(15, 15, 15, 1);
    --md-action-menu-bg: rgba(255,255,255,1);
  }

  .action-row {}
  .control-row {}
  .shorts-row {}

  .md-btn {
    --bg-alpha: var(--md-action-bg-opacity);
    background-color: rgba(var(--md-action-bg), var(--bg-alpha));
    color: var(--md-action-fg);
    display: flex;
    align-items: center;
    justify-content: center ;
    padding: 0px;
    font-family: Roboto, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    border: none;
    cursor: pointer;
  }

  .action-row.md-btn {
    height: 36px;
    width: 36px;
    border-radius: 17px;
    margin-left: 8px;
  }
  .action-row.md-btn:hover { background-color: rgba(var(--md-action-bg),calc(var(--bg-alpha) * 2));}
  .action-row.md-btn svg {width: 24px; height: 24px; fill: none;}

  .shorts-row.md-btn-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-wrap: wrap;
    overflow-wrap: anywhere;
  }

  .md-shorts-label {
    display: flow-root;
    color: var(--md-action-fg);
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    pointer-events: none;
    text-size-adjust: 100%;
    text-align: center;
    overflow-wrap: anywhere;
    margin-left: -8px;
    margin-right: -8px;
  }

  .shorts-row.md-btn {
    height: 48px;
    width: 48px;
    border-radius: 24px;
    margin-bottom: 4px;
  }
  .shorts-row.md-btn:hover { background-color: rgba(var(--md-action-bg),calc(var(--bg-alpha) * 2));}
  .shorts-row.md-btn svg {width: 24px; height: 24px; fill: none;}

  ytd-reel-video-renderer[overlay-density="2"] .shorts-row.md-btn {
    background-color: rgba(0,0,0,0.3);
    color: white
  }

  ytd-reel-video-renderer[overlay-density="2"] .shorts-row.md-btn:hover { background-color: rgba(40,40,40,0.6);}

  ytd-reel-video-renderer[overlay-density="2"] .md-shorts-label {color: white}

  .control-row.md-btn {
    position: relative;
    --bg-alpha: 0;
    color: #FFFFFF;
    -webkit-font-smoothing: antialiased;
    display: flex;
    margin: 0px;
    width: 48px;
    height: 100%;
    padding: 4px 0px;
    vertical-align: top;
  }

  .control-row.md-btn::before {
    content: '';
    position: absolute;
    border-radius: 40px;
    height: 32px;
    width: 48px;
    pointer-events: none;
  }
  .control-row.md-btn svg {width: 24px; height: 24px;}
  .control-row.md-btn:hover::before { background-color: rgba(255,255,255,0.15);}

  .md-menu {
    position: absolute;
    border-radius: 8px;
    display: none;
    box-shadow: 0px 4px 32px rgba(0,0,0,0.1);
    min-width: 130px;
    -webkit-font-smoothing: antialiased;
    padding: 8px;
  }
  .action-row.md-menu {
    background-color: var(--md-action-menu-bg);
    color: var(--md-action-fg);
    width: 200px;
  }
  .shorts-row.md-menu {
    background-color: var(--md-action-menu-bg);
    color: var(--md-action-fg);
    width: 200px;
    border-radius: 12px;
  }
  .control-row.md-menu {
    background-color: rgba(0, 0, 0, 0.60);
    color: rgb(238, 238, 238);
    width: 160px;
    z-index: 70;
  }
  .html5-video-player.ytp-autohide .md-menu {
    opacity: 0;
    pointer-events: none;
  }

  .md-menu-header {
    align-items: center;
    padding: 2px 8px;
    text-align: left;
    border: none;
    -webkit-font-smoothing: antialiased;
    font-size: 20px;
    font-weight: 700;
    font-family: Roboto, Arial, sans-serif;
  }
  .md-item {
    color: inherit;
    background-color: transparent;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    text-align: left;
    border: none;
    -webkit-font-smoothing: antialiased;
    cursor: pointer;
    font-family: Roboto, Arial, sans-serif;
  }

  .action-row .md-item {
    font-size: 16px;
    font-weight: 400;
    border-radius: 8px;
  }
  .action-row .md-item:hover {background-color: rgba(var(--md-action-bg), var(--md-action-bg-opacity));}

  .shorts-row .md-item {
    font-size: 16px;
    font-weight: 400;
    border-radius: 8px;
  }
  .shorts-row .md-item:hover {background-color: rgba(var(--md-action-bg), var(--md-action-bg-opacity));}

  .control-row .md-item {
    font-size: 14px;
    font-weight: 400;
    border-radius: 8px;
    padding-left: 12px;
  }
  .control-row .md-item:hover {background-color: rgba(255, 255, 255, 0.1);}

  .control-row .md-item .md-icon {
    width: 15px;          /* future SVG width */
    min-width: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .control-row .md-item .md-label {
    margin-left: 10px;   /* spacing to text */
    pointer-events: none;
  }

  .md-close-btn {
    position: absolute;

    top: 8px;
    right: 8px;

    width: 24px;
    height: 24px;

    padding: 0px;
    border: none;
    background: transparent;
    border-radius: 50%;

    color: var(--yt-spec-text-primary);
    cursor: pointer;
  }

  .md-close-btn svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
    pointer-events: none;
  }

  html[dark] .md-close-btn:hover {
    background: rgb(255, 255, 255, 0.1);
  }

  html[dark] .md-close-btn:active {
    background: rgb(255, 255, 255, 0.2);
  }

  html:not([dark]) .md-close-btn:hover {
    background: rgb(0, 0, 0, 0.1);
  }

  html:not([dark]) .md-close-btn:active {
    background: rgb(0, 0, 0, 0.2);
  }

  .md-tooltip {
    position: absolute;
    display: block;
    visibility: hidden;
    color: #eeeeeeff;
    -webkit-font-smoothing: antialiased;
    white-space: nowrap;
    pointer-events: none; /* Let clicks pass through */
  }

  .action-row.md-tooltip {
    background-color: rgba(97, 97, 97, .90);
    border-radius: 4px;
    padding: 8px 8px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    font-family: Roboto, Arial, sans-serif;
    font-weight: 400;
    font-size: 12px;
  }

  .shorts-row.md-tooltip {
    background-color: rgba(97, 97, 97, .90);
    border-radius: 4px;
    padding: 8px 8px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    font-family: Roboto, Arial, sans-serif;
    font-weight: 400;
    font-size: 12px;
  }

  .control-row.md-tooltip {
    background-color: rgba(0, 0, 0, 0.30);
    border-radius: 8px;
    padding: 5px 9px;
    opacity: 0;
    transition: opacity 0.4s ease-out;
    font-family: "YouTube Noto", Roboto, Arial, Helvetica, sans-serif;
    font-weight: 500;
    font-size: 12.98px;
  }

  .md-kbd {
    display: inline-block;
    padding: 0px 3px;
    margin: 0 2px;
    font-family: monospace;
    font-size: 12px;
    font-weight: 500;
    color: white;
    -webkit-font-smoothing: antialiased;
    border-radius: 3px;
    border: 1px solid rgba(255,255,255,0.3);
  }`
});

// ===== style injection =====

function injectStyles() {
  for (const { id, css } of STYLES) {
    if (document.getElementById(id)) continue;

    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  }
}

// ===== helpers =====

const injectWithRetry = (injectFn, retries = 5, delay = 1000) => {
  if (injectFn()) return;
  if (retries > 0) {
    setTimeout(() => injectWithRetry(injectFn, retries - 1, delay), delay);
  }
}

const triggerDownload = (mode) => {
  for (const menu of document.querySelectorAll('.md-menu')) {
    closeMenu(menu);
  }

  chrome.runtime.sendMessage({
    action: "md_download_" + mode,
    url: window.location.href,
    title: document.title,
    mode: mode
  });
}

// ===== factories =====

function injectControlBtn() {
  if (document.querySelector('.md-btn[data-type="control"]')) return true;
  const controlContainer = document.querySelector('.ytp-right-controls-right');
  if (controlContainer) {
    const btn = document.createElement('button');
    btn.className = 'control-row md-btn md-trigger';
    btn.innerHTML = CONTROL_ICON;
    btn.dataset.type = 'control';

    btn.addEventListener('click', toggleMenu);
    btn.addEventListener('mouseenter', showTooltip);
    btn.addEventListener('mouseleave', hideTooltip);
    if (controlContainer.lastChild){
      controlContainer.insertBefore(btn, controlContainer.lastChild);
    }
    else controlContainer.appendChild(btn);
    return true;
  }
  return false
}

function injectControlMenu(type="control") {
  if (document.querySelector(`.md-menu[data-type="${type}"]`)) return;

  const menu = document.createElement('div');
  menu.className = 'control-row md-menu md-trigger';
  menu.dataset.type = type;

  menu.innerHTML = `
    <button class="md-item md-mp3">
      <span class="md-icon">🎵</span>
      <span class="md-label">Audio (MP3)</span>
    </button>
    <button class="md-item md-mp4">
      <span class="md-icon">🎬</span>
      <span class="md-label">Video (MP4)</span>
    </button>
  `;

  const ytVideoPlayer = document.querySelector('.html5-video-player');
  if (ytVideoPlayer) {
    menu.style.right="12px";
    menu.style.bottom="62px";
    ytVideoPlayer.appendChild(menu);
    return true;
  }

  return false;
}

function injectControlTooltip(type="control") {
  if (document.querySelector(`.md-tooltip[data-type="${type}"]`)) return;

  const tooltip = document.createElement('div');
  tooltip.className = 'control-row md-tooltip';
  tooltip.dataset.type = type;

  tooltip.innerHTML = `
    Download
    <span class="md-kbd">Alt</span>
     + 
    <span class="md-kbd">S</span>
  `;
  document.body.appendChild(tooltip);

}

function injectActionBtn() {
  if (document.querySelector('.md-btn[data-type="action"]')) return false;
  const candidates = document.querySelectorAll('#top-level-buttons-computed');
  let actionContainer = null;

  for (const el of candidates) {
    if (el.querySelector('.ryd-tooltip')) {
      actionContainer = el;
      break;
    }
  }
  if (actionContainer) {
    const actionBtn = document.createElement('button');
    actionBtn.className = 'action-row md-btn md-trigger';
    actionBtn.innerHTML = ACTION_ICON;
    actionBtn.dataset.type = 'action';
    actionBtn.addEventListener('click', toggleMenu);
    actionBtn.addEventListener('mouseenter', showTooltip);
    actionBtn.addEventListener('mouseleave', hideTooltip);
    actionContainer.appendChild(actionBtn);
    return true;
  }
}

function injectShortsBtn() {
  if (document.querySelector('.md-btn[data-type="shorts"]')) return false;
  const shortsContainer = document.querySelector('.ytwReelActionBarViewModelHost');
  if (shortsContainer) {
    const shortsBtn = document.createElement('button');
    shortsBtn.className = 'shorts-row md-btn md-trigger';
    shortsBtn.innerHTML = ACTION_ICON;
    shortsBtn.dataset.type = 'shorts';

    const shortsBtnWrapper = document.createElement('div');
    shortsBtnWrapper.className = "shorts-row md-btn-wrapper"
    shortsBtnWrapper.appendChild(shortsBtn);
    const label = document.createElement("span");
    label.className = "md-shorts-label";
    label.textContent = "Download";
    shortsBtnWrapper.appendChild(label);

    shortsBtn.addEventListener('click', toggleMenu);
    shortsBtn.addEventListener('mouseenter', showTooltip);
    shortsBtn.addEventListener('mouseleave', hideTooltip);
    if (shortsContainer.lastChild){
      shortsContainer.insertBefore(shortsBtnWrapper, shortsContainer.lastChild);
    }
    else shortsContainer.appendChild(shortsBtnWrapper);
  }
}

// ===== ensures =====

function ensureMenus(types) {
  const list = Array.isArray(types) ? types : [types];
  for (const type of list) {
    if (document.querySelector(`.md-menu[data-type="${type}"]`)) return;

    const menu = document.createElement('div');
    menu.className = `md-menu ${type}-row md-trigger`;
    menu.dataset.type = type;

    menu.innerHTML = `
    <h2 class="md-menu-header">Download As...</h2>
    <button class="md-item md-mp4">🎬 Video (MP4)</button>
    <button class="md-item md-mp3">🎵 Audio (MP3)</button>
    `;
    menu.insertAdjacentHTML('afterbegin', CLOSE_BUTTON_HTML);

    document.body.appendChild(menu);
  }
  document.querySelectorAll('.md-mp3').forEach(mp3El => {
    mp3El.addEventListener('click', () => triggerDownload("audio"));
  });
  document.querySelectorAll('.md-mp4').forEach(mp4El => {
    mp4El.addEventListener('click', () => triggerDownload("video"));
  });
}

function ensureTooltips(types) {
  const list = Array.isArray(types) ? types : [types];

  for (const type of list) {
    if (document.querySelector(`.md-tooltip[data-type="${type}"]`)) return;

    const tooltip = document.createElement('div');
    tooltip.className = `${type}-row md-tooltip`;
    tooltip.dataset.type = type;

    tooltip.innerHTML = `Download`;
    document.body.appendChild(tooltip);
  }
}

// ===== interactions =====

function toggleMenu(e) {
  hideTooltip();

  const btn = e.target.closest('button');
  if (!btn) return;
  const btnType = btn.dataset.type;
  const menu = document.querySelector(`.md-menu[data-type="${btnType}"]`);

  for (const otherMenu of document.querySelectorAll(`.md-menu:not([data-type="${btnType}"])`)) {
    closeMenu(otherMenu);
  }

  if (btn.hasAttribute('data-menu-open')) {
    closeMenu(menu);
    return;
  }

  closeMenu(menu);
  btn.setAttribute('data-menu-open', 'true');

  menu.style.visibility = 'hidden';
  menu.style.display = 'block';
  const menuHeight = menu.offsetHeight;
  const menuWidth = menu.offsetWidth;

  let topPos = 0;
  let leftPos = 0;

  const rect = btn.getBoundingClientRect();
  if (btn.dataset.type === 'control') {
    const progressBar = document.querySelector('.ytp-progress-bar-container');

    let referenceTop;
    let referenceRight;
    if (progressBar) {
      referenceTop = progressBar.getBoundingClientRect().top;
      referenceRight = progressBar.getBoundingClientRect().right;
    }
    else {referenceTop = rect.top; referenceRight = rect.right;}
    menu.style.visibility = 'visible';
    return;
  }
  else if (btn.dataset.type === 'action') {
    topPos = window.scrollY + rect.top - menuHeight - 8;
    leftPos = window.scrollX + rect.left;
    if (topPos - window.scrollY < 56) topPos = rect.bottom + window.scrollY + 14;
  }
  else if (btn.dataset.type === 'shorts') {
    menu.style.position = 'fixed';
    menu.style.top = '50%';
    menu.style.left = '50%';
    menu.style.transform = 'translate(-50%, -50%)';
    menu.style.visibility = 'visible';
    return
  }

  if (leftPos < 10) leftPos = 10;
  if (topPos < 10) topPos = 10;

  menu.style.top = topPos + 'px';
  menu.style.left = leftPos + 'px';
  menu.style.visibility = 'visible';
}

const closeMenu = (menu) => {
  menu.style.display = 'none';
  const rowClass =  ['shorts-row', 'action-row', 'control-row'].find(cls => menu.classList.contains(cls));

  if (rowClass) {
    document.querySelectorAll(`.md-trigger.${rowClass}`).forEach(b => b.removeAttribute('data-menu-open'));
  }
};

function showTooltip(e) {
  const btn = e.currentTarget;
  if (btn.hasAttribute('data-menu-open') && btn.classList.contains('control-row')) return;

  const rect = btn.getBoundingClientRect();

  const btnType = btn.dataset.type;
  const tooltip = document.querySelector(`.md-tooltip[data-type="${btn.dataset.type}"]`);

  let topPos;
  if (btnType === 'action') {
    topPos = window.scrollY + rect.bottom + 15;
  }
  else if (btnType === 'shorts') {
    topPos = window.scrollY + rect.bottom + 10;
  }
  else if (btnType === 'control') {
    const progressBar = document.querySelector('.ytp-progress-bar-container') || document.querySelector('.ytp-progress-bar');
    if (progressBar) {
      const progressTop = progressBar.getBoundingClientRect().top;
      const progressBottom = progressBar.getBoundingClientRect().bottom;
      topPos = window.scrollY + progressTop + progressBottom - btn.getBoundingClientRect().top - tooltip.offsetHeight;
    }
  }

  // Center horizontally
  const leftPos = window.scrollX + rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);

  tooltip.style.top = topPos + 'px';
  tooltip.style.left = leftPos + 'px';
  tooltip.style.visibility = 'visible';
  tooltip.style.opacity = 1;
}

function hideTooltip() {
  document.querySelectorAll('.md-tooltip').forEach(t => {t.style.opacity = 0; t.style.visibility = 'hidden';});
}

// ===== handlers =====

const handleCloseBtnClick = (e) => {
  const closeBtn = e.target.closest('.md-close-btn');
  if (!closeBtn) return;

  const menu = closeBtn.closest('.md-menu');
  if (!menu) return;

  closeMenu(menu);
};

const handleGlobalClick = (e) => {
  // Global Click (Close Menus On Clicking Elsewhere)
  if (e.target.closest('.md-menu')) return;

  // If we clicked a trigger button, the toggleMenu catches it
  if (!e.target.closest('.md-trigger')) {
    for (const menu of document.querySelectorAll('.md-menu')) {
        closeMenu(menu);
    }
  }
};

document.addEventListener('click', handleCloseBtnClick);
document.addEventListener('click', handleGlobalClick);

// ===== bootstrap =====

window.addEventListener('yt-navigate-finish', () => {
  injectStyles()
  injectWithRetry(injectControlBtn, 3);
  injectWithRetry(injectControlMenu, 3);
  injectWithRetry(injectControlTooltip, 3);
  injectWithRetry(injectActionBtn, 4);
  injectWithRetry(injectShortsBtn, 3, 500);

  ensureMenus(['action', 'shorts']);
  ensureTooltips(['action', 'shorts', 'control']);
});