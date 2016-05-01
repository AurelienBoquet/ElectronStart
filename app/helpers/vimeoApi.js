import fetchJSON from 'helpers/fetchJSON';
import config from '../consts';

const apiPath = config.vimeo.entry;
const apiKey = `&access_token=${config.vimeo.apiKey}`;
const limit = config.video.limit;

export default {
  search: (query) => {
    let url = apiPath + `videos?per_page=${limit}&query=${query}` + apiKey;
    return fetchJSON(url);
  },
  loadIframe: (elementId, videoId) => {
    const iframe = document.createElement('iframe');
    const div = document.getElementById(elementId);

    iframe.src = `http://player.vimeo.com/video/${videoId}`;
    iframe.height = '390';
    iframe.width = '640';
    iframe.frameborder = '0';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('webkitallowfullscreen', '');
    iframe.setAttribute('mozallowfullscreen', '');
    iframe.setAttribute('allowFullScreen', '');

    div.appendChild(iframe);
  }
}
