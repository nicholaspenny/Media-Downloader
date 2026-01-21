function send(action) {
  chrome.runtime.sendMessage({ action });
  window.close(); // optional: close popup after click
}

document.getElementById('download-mp3').onclick = () =>
  send('download_current_audio');

document.getElementById('download-mp4').onclick = () =>
  send('download_current_video');

document.getElementById('stop-download').onclick = () =>
  send('stop_download');