import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

export const mapStateToProps = props => ({});

export const mapDispatchToProps = dispatch => ({});

export class SettingsBase extends PureComponent {
  state = {};
  render() {
    return <View />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsBase);
