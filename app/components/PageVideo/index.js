import React, { Component, PropTypes } from 'react';

import ytApi from "helpers/youtubeApi";
import dmApi from 'helpers/dailymotionApi';
import vmApi from 'helpers/vimeoApi';

export default class PageVideo extends Component {

  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
    })
  };

  static defaultProps = {
    params: {}
  };

  componentDidMount() {

    const {
      type,
      id
    } = this.props.params;

    switch (type) {
      case 'youtube':
        ytApi.loadIframe('test', id);
        break;
      case 'dailymotion':
        dmApi.loadIframe('test', id);
        break;
      case 'vimeo':
        vmApi.loadIframe('test', id);
        break;
    }
  }

  render() {
    return (
      <div id="test"></div>
    )
  }
}
