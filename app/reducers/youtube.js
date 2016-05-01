import youtubeApi from "helpers/youtubeApi";

export const REQUEST = "youtube/videos/REQUEST"
export const SUCCESS = "youtube/videos/SUCCESS"
export const ERROR = "youtube/videos/ERROR"

const initialState = {}

const format = (obj) => {

  return obj.items.map((item, index) => {
    return {
      id: item.id,
      type: 'youtube',
      title: item.snippet.title,
      // url: item.link,
      description: item.snippet.description,
      date: item.snippet.publishedAt,
      duration: item.contentDetails.duration,
      author: {
        name: item.snippet.channelTitle,
        picture: item.snippet.channelThumbnail
      },
      thumbnail: {
        small: item.snippet.thumbnails.default.url,
        medium: item.snippet.thumbnails.high.url,
        large: (item.snippet.thumbnails.maxres || item.snippet.thumbnails.high).url
      }
    }
  });
}

// redux reducer
export default function reducer(state = initialState, action) {

  if (action.type === SUCCESS) {
    return format(action.response);
  }

  if (action.type === ERROR) {
    /* eslint-disable no-console */
    console.error(ERROR, action.error)
    /* eslint-disable no-console */
    return {
      error: (
        action.error && action.error.data &&
        action.error.data.error && action.error.data.error.user_message
      ) || true
    }
  }

  return state;
}

// redux actions
export function searchList(query) {
  return (dispatch) => {

    const errorHandler = () => {
      dispatch({type: ERROR})
    };

    const dispatchAction = (data) => {
      dispatch({type: SUCCESS, response: data})
    };

    const getVideoData = (data) => {

      let ids = data.items.map((item) => { return item.id.videoId }).join(',');

      youtubeApi.search(ids)
        .then(getChannelData)
        .catch(errorHandler)

    };

    const getChannelData = (data) => {

      let ids = data.items.map((item) => { return item.snippet.channelId }).join(',');

      youtubeApi.channel(ids)
       .then((res) => {
         res.items.forEach((item, index) => {
           data.items[index].snippet.channelThumbnail = item.snippet.thumbnails.default.url;
         });
         dispatchAction(data);
       })
       .catch(errorHandler)

    };

    youtubeApi.list(query)
      .then(getVideoData)
      .catch(errorHandler)

  };
}

