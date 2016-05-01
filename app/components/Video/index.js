import React, { Component, PropTypes } from 'react';

import styles from "./index.css"

export default class Video extends Component {

  static propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    item: {},
    onClick: () => {},
  };

  render() {

    const {
      item,
      onClick
    } = this.props
    
    const clickFct = () => {
      if (typeof onClick === 'function') {
        onClick(item.type, item.id)
      }
    };

    const divStyle = {
      backgroundImage: `url(${item.thumbnail.medium})`
    };

    return (
      <div onClick={clickFct} className={styles['pageHome--card']}>
        <div className={styles['pageHome--overlay']}></div>

        <div className={styles['pageHome--overlay--content']}>
          <img src={item.author.picture} alt=""/>
          <div className={styles['pageHome--overlay--content--text-wrap']}>
            <span className={styles['pageHome--overlay--content--title']}>{item.title}</span>
            <span className={styles['pageHome--overlay--content--author']}>{item.author.name}</span>
          </div>
        </div>

        <div style={divStyle} className={styles['pageHome--bg']}></div>
      </div>
    )
  }
}
