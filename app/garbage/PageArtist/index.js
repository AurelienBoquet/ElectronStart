import React, { Component, PropTypes } from 'react';
import {connect} from "react-redux"
import { get as getArtist } from "reducers/artist"

import ItemDetails from "components/ItemDetails"

@connect(
  (state) => ({
    artist : state.artist
  }),
  (dispatch) => ({
    getArtist : (id) => dispatch(getArtist(id)),
  })
)
export default class PageArtist extends Component {

  static propTypes = {
    params: PropTypes.shape({
      artistId:PropTypes.string,
      artistName:PropTypes.string,
    }),
    artist : PropTypes.object,
    getArtist : PropTypes.func,
  };

  static defaultProps = {
    params: {},
    artist : {},
    getArtist : () => {}
  };

  componentDidMount() {
    
    const {
      params,
      getArtist
    } = this.props;
    
    if (params.artistId) getArtist(params.artistId);
  }

  componentWillReceiveProps(nextProps) {

    const {
      params,
      getArtist
    } = nextProps;

    if (params !== this.props.params) getArtist(params.artistId);
  }

  render() {
    const {
      params, artist
    } = this.props;
    
    return (
      <div>
        {
          params.artistId && artist.results && artist.results.images.length &&
          <ItemDetails name={artist.results.name}
                       image={artist.results.images[0].url}
                       kinds={artist.results.genres}
                       songs={[{name:"..."},{name:"..."},{name:"..."}]}  />
        }
      </div>
    )
  }
}
