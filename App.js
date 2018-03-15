import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Tile from './src/components/Tile';
import Board from './src/components/Board';

export default class App extends React.Component {
    onPress = (index) => {
        console.log('index ::: ', index);
    }
    
    render() {
        return (
            <View style={styles.container}>
                
                <Board />
        
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
