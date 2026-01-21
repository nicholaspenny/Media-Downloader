// ===== helpers =====

function notifyUser(url, mode="audio") {
  let filetype = (mode === 'audio') ? 'MP3' : 'MP4';
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'logo512.png',
    title: mode.toUpperCase() + ' Download',
    message: 'Attempting to Download ' + filetype + '...\n' + url,
    priority: 2
  },  (id) => {
    setTimeout(() => {
      chrome.notifications.clear(id);
    }, (mode === 'audio') ? 7000 : 15000);
  });
};

function chromeUpdate(url, title="", mode="audio") {
  chrome.tabs.update({url: url}, () => {
    if (chrome.runtime.lastError) {
      // notifyError()
      console.log('URL SCHEME ERROR');
      return
    }
    notifyUser(title ? title : url, mode);
  });
}

// ===== context menus =====

chrome.contextMenus.create({
  id: "md-download-mp3",
  title: "Download MP3 | Audio",
  contexts: ["link", "page", "selection"]
});

chrome.contextMenus.create({
  id: "md-download-mp4",
  title: "Download MP4 | Video",
  contexts: ["link", "page", "selection"]
});

// ===== handlers =====

chrome.contextMenus.onClicked.addListener((info, tab) => {
  let url = info.linkUrl || info.selectionText || info.pageUrl;
  let prefix = "mydl:";
  let mode = "audio";

  if (info.menuItemId.includes("mp4")) {
    mode = "video";
    prefix += "video+";
  }

  if (url) {
    chromeUpdate(prefix + url, mode=mode);
  }
});

function mediaDownload(command, downloadTab) {
  if (downloadTab && downloadTab.url) {
    if (command === "download_current_audio") {
      chromeUpdate("mydl:" + downloadTab.url , title=downloadTab.title, mode="audio");
    }
    else if (command === "download_current_video") {
      chromeUpdate("mydl:video+" + downloadTab.url , title=downloadTab.title, mode="video");
    }
  }
}

function mediaDownloadURL(mode, title, url) {
  header = "mydl:"
  if (mode === "video") {        
    header += "video+"
  }
  chromeUpdate(header + url, title=title, mode=mode);
}

chrome.commands.onCommand.addListener((command) => {
  if (command.startsWith('download_current')) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const currentTab = tabs[0];
      mediaDownload(command, currentTab)
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'stop_download') {
    fetch("http://127.0.0.1:45678/stop", { method: "POST" });
    return;
  }
  if (request.action.startsWith('download_current')) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const currentTab = tabs[0];
      mediaDownload(request.action, currentTab);
    });
  } else if (request.action.startsWith('md_download')) {
    mediaDownloadURL(request.mode, request.title, request.url);
  }
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === 'get_shortcuts') {
    chrome.commands.getAll(cmds => {
      sendResponse(cmds);
    });
    return true;
  }
});