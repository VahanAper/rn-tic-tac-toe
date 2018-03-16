import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
} from 'react-native';
import isEqual from 'lodash.isequal';

import Tile from '../Tile';

const winningOptions = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 2, 4, 6 ],
    [ 0, 4, 8 ],
];

class Board extends React.Component {
    screenWidth = Dimensions.get('window');
    
    state = {
        tiles: Array(9).fill(''),
        currentType: 'x',
        type: null,
        winner: null,
    }
    
    findWinner = () => {
        const xPositions = [];
        const oPositions = [];
        
        this.state.tiles.forEach((tile, index) => {
            if (tile === 'x') {
                xPositions.push(index);
            } else if (tile === 'o') {
                oPositions.push(index);
            }
        });
        
        let winner = '';
        
        winningOptions.forEach((option) => {
            if (isEqual(option, xPositions)) {
                winner = 'x';
            } else if (isEqual(option, oPositions)) {
                winner = 'o';
            }
        });
        
        this.setState({ winner });
    }
    
    onPress = (index) => {
        const { tiles, currentType } = this.state;
        
        tiles[index] = currentType;
        
        this.setState({
            tiles,
            currentType: currentType === 'x' ? 'o' : 'x',
        }, this.findWinner);
    }
    
    renderBoard() {
        const { winner } = this.state;
        const { width } = Dimensions.get('window');
        
        if (winner) {
            return (
                <View>
                    <Text>{`The winner is ${winner}`}</Text>
                </View>
            );
        }
        
        return (
            <View style={{
                // flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: width - 50,
            }}>
                {this.state.tiles.map((tile, index) => (
                    <Tile
                        key={index}
                        type={tile}
                        style={{
                            width: ((width - 50) / 3) - 2 ,
                            height: ((width - 50) / 3) - 2 ,
                        }}
                        index={index}
                        onPress={this.onPress}
                    />
                ))}
            </View>
        );
    }
    
    render() {
        return (
            <View style={styles.container}>
                {this.renderBoard()}
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

export default Board;
