import dailymotionApi from "helpers/dailymotionApi";

export const REQUEST = "dailymotion/videos/REQUEST"
export const SUCCESS = "dailymotion/videos/SUCCESS"
export const ERROR = "dailymotion/videos/ERROR"

const initialState = {}

const format = (obj) => {

  return obj.list.map((item) => {
    return {
      id: item.id,
      type: 'dailymotion',
      title: item.title,
      url: item.url,
      description: item.description,
      date: item.taken_time,
      duration: item.duration,
      author: {
        name: item['owner.screenname'],
        picture: item['owner.cover_100_url']
      },
      thumbnail: {
        small: item.thumbnail_120_url,
        medium: item.thumbnail_480_url,
        large: item.thumbnail_url
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
  return {
    types: [
      REQUEST,
      SUCCESS,
      ERROR,
    ],
    promise: (
      dailymotionApi.search(query)
    )
  }
}
