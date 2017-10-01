/* eslint-disable global-require */
import React, { PureComponent } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';
import Main from './components/Main';
import Settings from './components/Settings';
import configureStore from './store';

const store = configureStore();

const Navigator = StackNavigator({
  main: { screen: Main },
  settings: { screen: Settings },
});

export default class Index extends PureComponent {
  state = { loading: true };

  async componentWillMount() {
    await Font.loadAsync({
      Raleway: require('../assets/fonts/Raleway-Regular.ttf'),
      ShareTechMono: require('../assets/fonts/ShareTechMono-Regular.ttf'),
    });
    this.setState({
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
