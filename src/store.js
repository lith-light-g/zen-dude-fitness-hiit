import { createStore } from 'redux';
import hiitReducer from './modules/hiit';

export default defaultState => createStore(hiitReducer, defaultState);
