import './App/Config/ReactotronConfig';
import 'react-native-gesture-handler';
import { AppRegistry, YellowBox } from 'react-native';

import App from './App/Containers/App';

window.LOG_LEVEL = 'DEBUG';

YellowBox.ignoreWarnings(['Warning: componentWill']);

AppRegistry.registerComponent('PrestoDriver', () => App);
