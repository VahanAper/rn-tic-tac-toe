import React from 'react';
import { 
    View,
    Text,
} from 'react-native';
import {
    TabBarBottom,
    TabNavigator,
    StackNavigator,
} from 'react-navigation';

import { Provider } from 'react-redux';

import Levels from './src/components/Levels';
import Board from './src/components/Board';
import Settings from './src/components/Settings';

import store from './src/store';

const MainNavigator = TabNavigator({
    levels: { screen: Levels },
    game : {
        screen: StackNavigator({
            game: { screen: Board }, 
            settings: { screen: Settings },
        }),
    },
}, {
    // this option will prevent to render all screens at the same time
    lazy: true,
    // this option prevents navigation swiping on Android
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    // this prop allows the Icons to be shown on android
    tabBarComponent: TabBarBottom,
    tabBarOptions: {
        labelStyle: {
            fontSize: 12,
        },
    },
});

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }
}

export default App;

