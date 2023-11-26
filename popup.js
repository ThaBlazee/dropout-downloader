document.addEventListener('DOMContentLoaded', function() {
  const profilesContainer = document.getElementById('profiles');

  // Check if the current tab's URL is on the dropout.tv website
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs[0].url.includes('dropout.tv')) {
      profilesContainer.textContent = 'Error: Not on dropout.tv website';
      return;
    }

    chrome.storage.local.get(['videoProfiles'], function(result) {
      if (result.videoProfiles && result.videoProfiles.length > 0) {
        // Sort the video profiles by quality
        const sortedProfiles = result.videoProfiles.sort((a, b) => {
          const qualityA = parseInt(a.quality.replace('p', ''), 10);
          const qualityB = parseInt(b.quality.replace('p', ''), 10);
          return qualityA - qualityB;
        });

        sortedProfiles.forEach(profile => {
          const downloadButton = document.createElement('button');
          downloadButton.textContent = `${profile.quality}`;
          downloadButton.addEventListener('click', function() {
            chrome.tabs.sendMessage(tabs[0].id, {action: "getTitle"}, response => {
              let filename = response && response.title ? 
                `${response.title.replace(/[\/:*?"<>|]/g, '_')}_${profile.quality}.mp4` : 
                `video_${profile.quality}.mp4`;
              chrome.downloads.download({
                url: profile.url,
                filename: filename
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
});
