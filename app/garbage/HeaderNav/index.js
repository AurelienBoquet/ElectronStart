import React, {PropTypes, Component } from 'react';
import {Link, IndexLink} from 'react-router'

import InputArtist from 'components/InputArtist'
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';

import styles from './index.css'

export default class HeaderNav extends Component {

    state = {
        open: false
    };

    handleToggle = () =>{
      this.setState({open: !this.state.open});
    };

    render() {

      return (
        <div>
          <AppBar
            title="React playlist Viewer"
            iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationMenu /></IconButton>}
            iconElementRight={<InputArtist />} />
            <LeftNav
                open={this.state.open}
                onRequestChange={(open) => {}}>
                    <AppBar
                        title="Menu"
                        iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationClose /></IconButton>}	/>
                    <IndexLink to="/" activeClassName={styles.activeLink} className={styles.link}>
                        <MenuItem>Home</MenuItem>
                    </IndexLink>
                    <Link to="/discover" activeClassName={styles.activeLink} className={styles.link}>
                        <MenuItem>Discover</MenuItem>
                    </Link>
          </LeftNav>
        </div>)

    }
}
