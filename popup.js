document.addEventListener('DOMContentLoaded', function() {
    const profilesContainer = document.getElementById('profiles');
  
    chrome.storage.local.get(['videoProfiles'], function(result) {
      if (result.videoProfiles && result.videoProfiles.length > 0) {
        result.videoProfiles.forEach(profile => {
          const downloadButton = document.createElement('button'); // Define downloadButton here
          downloadButton.textContent = `${profile.quality}`;
          downloadButton.addEventListener('click', function() {
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {
              chrome.tabs.sendMessage(tabs[0].id, {action: "getTitle"}, response => {
                if (response && response.title) {
                  let validFilename = response.title.replace(/[\/:*?"<>|]/g, '_'); // Replace invalid characters
                  let filename = `${validFilename}_${profile.quality}.mp4`;
                  chrome.downloads.download({
                    url: profile.url,
                    filename: filename // Valid filename
                  });
                } else {
                  // Fallback filename if title is not available
                  chrome.downloads.download({
                    url: profile.url,
                    filename: `video_${profile.quality}.mp4`
                  });
                }
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
  