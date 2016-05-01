import React, { Component, PropTypes } from 'react';
import {connect} from "react-redux"
import debounce from 'lodash.debounce';

import { searchList as getYoutubeVideos } from "reducers/youtube"
import { searchList as getDailymotionVideos } from "reducers/dailymotion"
import { searchList as getVimeoVideos } from "reducers/vimeo"

import Input from 'components/Input';
import ListVideo from "components/ListVideo";

import styles from "./index.css"

@connect(
  (state) => ({
    youtubeVideos : state.youtube,
    dailymotionVideos : state.dailymotion,
    vimeoVideos: state.vimeo
  }),
  (dispatch) => ({
    youtubeSearch: (value) => dispatch(getYoutubeVideos(value)),
    dailymotionSearch: (value) => dispatch(getDailymotionVideos(value)),
    vimeoSearch: (value) => dispatch(getVimeoVideos(value))
  })
)
export default class PageHome extends Component {
  
  static contextTypes = {
    router: PropTypes.object,
  };
  
  static propTypes = {
    youtubeVideos: PropTypes.array,
    youtubeSearch: PropTypes.func,
    vimeoVideos: PropTypes.array,
    vimeoSearch: PropTypes.func,
    dailymotionVideos: PropTypes.array,
    dailymotionSearch: PropTypes.func,
  };

  static defaultProps = {
    youtubeVideos: [],
    youtubeSearch: () => {},
    vimeoVideos: [],
    vimeoSearch: () => {},
    dailymotionVideos: [],
    dailymotionSearch: () => {},
  };

  fetchVideo = (query) => {
    if (query.length > 2) {
      this.props.youtubeSearch(query);
      this.props.dailymotionSearch(query);
      this.props.vimeoSearch(query);
    }
  };

  selectVideo = (type, id) => {
    this.context.router.push(`/video/${type}/${id}`);
  }

  onInputChange = debounce(this.fetchVideo, 750);

  render() {
    
    const {
      youtubeVideos,
      vimeoVideos,
      dailymotionVideos
    } = this.props

    return (
      <div>
        <Input
          styleName="research"
          onChange={this.onInputChange}
          placeholder="Recherche"
        />
        <div className={styles.content}>
          <ListVideo
            styleName="pageHome"
            onVideoClick={this.selectVideo}
            items={youtubeVideos}
          />
          <ListVideo
            styleName="pageHome"
            onVideoClick={this.selectVideo}
            items={vimeoVideos}
          />
          <ListVideo
            styleName="pageHome"
            onVideoClick={this.selectVideo}
            items={dailymotionVideos}
          />
        </div>
      </div>
    )
  }
}
