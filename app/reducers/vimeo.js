import vimeoApi from "helpers/vimeoApi";

export const REQUEST = "vimeo/videos/REQUEST"
export const SUCCESS = "vimeo/videos/SUCCESS"
export const ERROR = "vimeo/videos/ERROR"

const initialState = {}

const format = (obj) => {

  return obj.data.map((item, index) => {

    const authPicUrl = 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown_1-2-128.png';
    const bgUrl = 'http://www.allprodad.com/wp-content/uploads/2014/06/video_default.png';

    return {
      id: item.link.split('/').pop(),
      type: 'vimeo',
      title: item.name,
      url: item.link,
      description: item.description,
      date: item.created_time,
      duration: item.duration,
      author: {
        name: item.user.name,
        picture: (item.user.pictures) ? item.user.pictures.sizes[1].link : authPicUrl
      },
      thumbnail: {
        small: (item.pictures.sizes[1]) ? item.pictures.sizes[1].link : bgUrl,
        medium: (item.pictures.sizes[3]) ? item.pictures.sizes[3].link : bgUrl,
        large: (item.pictures.sizes[4]) ? item.pictures.sizes[4].link : bgUrl
      }
    }
  });
}

// redux reducer
export default function reducer(state = initialState, action) {
  
  if (action.type === SUCCESS) {
    console.log(action.response);
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
      vimeoApi.search(query)
    )
  }
}
