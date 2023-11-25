// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTitle") {
        const seriesTitleElement = document.querySelector('.series-title a');
        const episodeTitleElement = document.querySelector('.video-title strong');
        const seasonEpisodeElement = document.querySelector('.text a');

        let seriesTitle = seriesTitleElement ? seriesTitleElement.textContent.trim() : '';
        let episodeTitle = episodeTitleElement ? episodeTitleElement.textContent.trim() : '';
        let seasonEpisode = seasonEpisodeElement ? seasonEpisodeElement.textContent.trim().replace('Season', 'S').replace('Episode', 'E').replace(',', '').replace(/ /g, '') : '';

        let title = `${seasonEpisode}_${seriesTitle}_${episodeTitle}`.replace(/ /g, '_');
        sendResponse({title});
    }
});
