import React, { Component } from 'react';
import moment from 'moment';
import * as constants from '../constants';

export class TimeAgo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeAgo: moment(props.timestamp).fromNow(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), constants.TIME_AGO_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({ timeAgo: moment(this.props.timestamp).fromNow() });
  }

  render() {
    return <span>{this.state.timeAgo}</span>;
  }
}
