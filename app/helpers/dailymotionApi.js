import fetchJSON from 'helpers/fetchJSON';
import config from '../consts';

const apiKey = config.dailymotion.apiKey;
const apiPath = config.dailymotion.entry;
const searchFields = '&fields=' + config.dailymotion.searchFields.join(',');
const limit = config.video.limit;

export default {
  search: (query) => {
    let url = apiPath + `videos?limit=${limit}&search=${query}` + searchFields;
    return fetchJSON(url);
  },
  loadIframe: (elementId, videoId) => {
    const iframe = document.createElement('iframe');
    const div = document.getElementById(elementId);

    iframe.src = `http://www.dailymotion.com/embed/video/${videoId}`;
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
