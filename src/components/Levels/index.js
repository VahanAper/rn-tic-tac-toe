import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

class Levels extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Level 1</Text>
                <Text>Level 2</Text>
                <Text>Level 3</Text>
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
