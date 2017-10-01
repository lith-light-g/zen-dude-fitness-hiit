import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

class Timer extends Component {
  static propTypes = {
    time: PropTypes.number,
    play: PropTypes.bool,
    onFinish: PropTypes.func,
  };
  static defaultProps = {
    time: 10000,
    play: false,
    onFinish: () => 0,
  };
  state = {
    remaining: 0,
  };

  componentWillMount() {
    this.resetTimer();
  }

  componentDidMount() {
    this.time = new Date().getTime();
    this.interval = setInterval(() => {
      this.setState((prevState, props) => {
        if (props.play) {
          if (prevState.remaining > 0) {
            const previousTime = this.time;
            this.time = new Date().getTime();
            return {
              remaining: Math.max(prevState.remaining - (this.time - previousTime), 0),
            };
          }
          props.onFinish();
          return {
            remaining: 0,
          };
        }
        return {};
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { time, play } = this.props;
    const shouldResetTimer = nextProps.time !== time;
    if (shouldResetTimer) {
      // new timer
      this.time = new Date().getTime();
      this.resetTimer(nextProps.time);
    }
    if (nextProps.play !== play && nextProps.play === true) {
      // resume timer
      this.time = new Date().getTime();
    }
    return (
      shouldResetTimer || nextProps.play !== play || nextState.remaining !== this.state.remaining
    );
  }

  isFinished = false;

  resetTimer(time) {
    this.isFinished = false;
    this.setState({
      remaining: time || this.props.time,
    });
  }

  finish() {
    const { onFinish } = this.props;
    if (!this.isFinished && onFinish) {
      this.isFinished = true;
      onFinish();
    }
  }

  render() {
    return (
      <Text
        style={{
          fontFamily: 'ShareTechMono',
          fontSize: 64,
        }}
      >
        {(this.state.remaining / 1000).toFixed(3)}
      </Text>
    );
  }
}

export default Timer;
