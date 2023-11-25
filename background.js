chrome.webRequest.onCompleted.addListener(
  function(details) {
    if (details.url.startsWith("https://player.vimeo.com/video/")) {
      fetch(details.url)
        .then(response => response.json())
        .then(data => {
          if (data && data.request && data.request.files && data.request.files.progressive) {
            chrome.storage.local.set({ 'videoProfiles': data.request.files.progressive });
          }
        })
        .catch(console.error);
    }
  },
  {urls: ["<all_urls>"]}
);
