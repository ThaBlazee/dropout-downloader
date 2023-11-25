chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTitle") {
        const seriesTitleElement = document.querySelector('.series-title a.context-link');
        const seasonEpisodeElement = document.querySelector('.text a.site-font-secondary-color');

        let seriesTitle = seriesTitleElement ? seriesTitleElement.textContent.trim() : '';
        let seasonEpisode = seasonEpisodeElement ? seasonEpisodeElement.textContent.trim().replace('Season', 'S').replace('Episode', 'E').replace(',', '').replace(/ /g, '') : '';

        let title = `${seasonEpisode}_${seriesTitle}`.replace(/ /g, '_');
        sendResponse({title});
    }
});
