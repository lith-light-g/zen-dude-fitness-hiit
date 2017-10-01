import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getSelectedSettings } from '../selectors';
import Timer from './Timer';

export const mapStateToProps = state => ({
  ...getSelectedSettings(state),
});

export const mapDispatchToProps = () => ({});

const styles = StyleSheet.create({
  mainBg: {
    backgroundColor: '#FFF',
    position: 'relative',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  exerciseHeader: {
    position: 'absolute',
    top: 32,
  },
  exercise: {
    fontSize: 32,
    fontFamily: 'Raleway',
    textAlign: 'center',
  },
  timer: {
    position: 'absolute',
    bottom: 32,
  },
});

export class MainBase extends PureComponent {
  static propTypes = {
    set: PropTypes.arrayOf(
      PropTypes.shape({
        img: PropTypes.string,
        name: PropTypes.string,
        sound: PropTypes.string,
      }),
    ),
    restTime: PropTypes.number,
    exerciseTime: PropTypes.number,
    setRestTime: PropTypes.number,
    repetitions: PropTypes.number,
  };
  static defaultProps = {
    set: [],
    restTime: 10000,
    exerciseTime: 30000,
    setRestTime: 60000,
    repetitions: 5,
  };

  state = {
    currentExercise: 0,
    play: false,
    // current set repetition
    currentSet: 0,
    // 0 = not resting, 1 = short rest, 2 = set rest
    rest: 0,
  };

  play = () => {
    this.setState({
      play: !this.state.play,
    });
  };

  next = () => {
    const { currentSet, currentExercise, rest } = this.state;
    const { repetitions, set } = this.props;
    switch (rest) {
      case 1:
        // rest time done
        this.setState({
          currentExercise: currentExercise + 1,
          rest: 0,
        });
        break;
      case 2:
        // set rest time done
        if (currentSet < repetitions) {
          // get to next set
          this.setState({
            currentExercise: 0,
            currentSet: currentSet + 1,
            rest: 0,
          });
        } else {
          // final set done
          this.setState({
            currentSet: 0,
            play: false,
            rest: 0,
          });
        }
        break;
      default:
        // exercise done
        if (currentExercise < set.length - 1) {
          // rest
          this.setState({
            rest: 1,
          });
        } else {
          // set rest
          this.setState({
            rest: 2,
          });
        }
        break;
    }
  };

  render() {
    const { exerciseTime, restTime, setRestTime, set, repetitions } = this.props;
    const { rest, play, currentExercise, currentSet } = this.state;
    let timer = 0;
    const exercise = set[currentExercise];
    switch (rest) {
      case 1:
        timer = restTime;
        break;
      case 2:
        timer = setRestTime;
        break;
      default:
        timer = exerciseTime;
        break;
    }
    return (
      <TouchableOpacity style={styles.mainBg} onPress={this.play}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.exercise}>{`Set #${currentSet + 1}/${repetitions}`}</Text>
          {rest === 0 && (
            <Text style={styles.exercise}>{`Exercise #${currentExercise + 1}/${set.length}`}</Text>
          )}
        </View>
        <View>
          <Text style={styles.exercise}>{rest === 0 ? exercise.name : 'Rest'}</Text>
        </View>
        <View style={styles.timer}>
          <Timer time={timer} play={play} onFinish={this.next} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBase);
