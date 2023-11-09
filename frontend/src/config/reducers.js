import { combineReducers } from 'redux';
import { TabReducer } from './tabReducer/tabReducer';
import { FontReducer } from './fontReducer/fontReducer';
import { TextIndexReducer } from './textIndexReducer/textIndexReducer';
import { BackgroundColorReducer } from './backgroundColorReducer/backgroundColorReducer';

const rootReducer = combineReducers({
  tab: TabReducer,
  font: FontReducer,
  tIndex: TextIndexReducer,
  bgColor: BackgroundColorReducer,
});

export default rootReducer;
