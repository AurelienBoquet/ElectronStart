import fetchJSON from 'helpers/fetchJSON';
import config from '../consts';

const apiPath = config.google.entry;
const apiKey = `&key=${config.google.apiKey}`;
const limit = config.video.limit;

export default {
  list: (query) => {
    let url = apiPath + `search/?maxResults=${limit}&type=video&part=id&q=${query}` + apiKey;
    return fetchJSON(url);
  },
  search: (ids) => {
    let url = apiPath + `videos/?id=${ids}&part=snippet,contentDetails` + apiKey;
    return fetchJSON(url)
  },
  channel: (ids) => {
    let url = apiPath + `channels/?id=${ids}&part=snippet,contentDetails` + apiKey;
    return fetchJSON(url)
  },
  loadIframe: (elementId, videoId) => {
    const iframe = document.createElement('iframe');
    const div = document.getElementById(elementId);

    iframe.src = `http://www.youtube.com/embed/${videoId}`;
    iframe.height = '390';
    iframe.width = '640';
    iframe.frameborder = '0';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('webkitallowfullscreen', '');
    iframe.setAttribute('mozallowfullscreen', '');
    iframe.setAttribute('allowFullScreen', '');

    div.appendChild(iframe);
  },
}
