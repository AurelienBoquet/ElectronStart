import React, { Component, PropTypes } from 'react';
import {connect} from "react-redux"
import InputList from "components/InputList";

import { get as getArtists } from "reducers/artists"

import styles from "./index.css";

@connect(
    (state) => ({
        artists : state.artists,
    }),
    (dispatch) => ({
        getArtists : (value) => dispatch(getArtists(value)),
    })
)
export default class InputArtist extends Component {

  static contextTypes = {
      router: PropTypes.object,
  };

  static propTypes = {
      artists : PropTypes.object,
      getArtists : PropTypes.func,
  };

  static defaultProps = {
      artists : {},
      getArtists : () => {},
  };

  onInputArtistChange = (value) => {
      this.props.getArtists(value)
  };

  selectArtist = (item) => {
      this.context.router.push(`/artist/${item.id}/${item.name}`)
  };

  render() {
    
    console.log(this.props.artists);
    return (
      <div className={styles.input}>
        {
          this.props.artists &&
          <InputList title="Search Artists"
                     onItemClick={this.selectArtist}
                     items={this.props.artists.results}
                     autoFilter={true}
                     onInputChange={this.onInputArtistChange} />
        }
      </div>
    )
  }
}
