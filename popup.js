document.addEventListener('DOMContentLoaded', function() {
  const profilesContainer = document.getElementById('profiles');

  chrome.storage.local.get(['videoProfiles'], function(result) {
    if (result.videoProfiles && result.videoProfiles.length > 0) {
      result.videoProfiles.forEach(profile => {
        const downloadButton = document.createElement('button');
        downloadButton.textContent = `${profile.quality}`;
        downloadButton.addEventListener('click', function() {
          chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "getTitle"}, response => {
              let filename;
              if (response && response.title) {
                let validFilename = response.title.replace(/[\/:*?"<>|]/g, '_');
                filename = `${validFilename}_${profile.quality}.mp4`;
              } else {
                filename = `video_${profile.quality}.mp4`;
              }
              chrome.downloads.download({
                url: profile.url,
                filename: filename
              });
            });
          });
        });
        profilesContainer.appendChild(downloadButton);
      });
    } else {
      profilesContainer.textContent = 'No video profiles found.';
    }
  });
});
