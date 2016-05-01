import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from "./index.css"

import Video from 'components/Video'

const cx = classNames.bind(styles);

export default class ListVideo extends Component {
  
  static propTypes = {
    items : PropTypes.array,
    onVideoClick : PropTypes.func,
    styleName: PropTypes.string
  };

  static defaultProps = {
    items : [],
    onVideoClick: () => {},
    styleName: null,
  };

  render() {

    const {
      items,
      onVideoClick,
      styleName,
    } = this.props

    let className = cx({
      pageHome: styleName === 'pageHome'
    });

    return (
      <div className={className}>
        {
          items.length &&
          items.map((item, index) => {
            return (
              <Video
                item={item}
                onClick={onVideoClick}
              />
            );
          })
        }
      </div>
    )
  }
}
