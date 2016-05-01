import React, { PropTypes, Component } from "react"
import classNames from 'classnames/bind';

import styles from "./index.css"

const cx = classNames.bind(styles);

export default class Input extends Component {

  static propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    styleName: PropTypes.string
  };

  static defaultProps = {
    type: "text",
    onChange: ()=> {},
    name: null,
    placeholder: null,
    value: null,
    styleName: null
  };

  state = {
    value: this.props.value
  };

  onChangeHandler = (event) => {
    const {
      onChange
    } = this.props

    this.setState({value: event.target.value});

    if (typeof onChange == "function") {
      onChange(event.target.value)
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value})
    }
  }

  render() {

    const {
      type,
      name,
      placeholder,
      styleName
    } = this.props

    let className = cx({
      research: styleName === 'research'
    });

    return (
      <input
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        value={this.state.value}
        onChange={this.onChangeHandler}/>
    )

  }
}
