import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Icon,
} from 'react-native-elements';

import LevelButton from './LevelButton';

class Levels extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'LEVELS',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                size={30}
                name="subject"
                color={tintColor}
            />
        )
    });
    
    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <View style={styles.container}>
                <View style={{ height: 200 }}>
                    <LevelButton level={1} navigate={navigate} />
                    <LevelButton level={2} navigate={navigate} />
                    <LevelButton level={3} navigate={navigate} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Levels;
