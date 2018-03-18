import React from 'react';
import {
    View,
    Text,
    Image,
    // Button,
    Dimensions,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageSelector from 'react-native-image-picker';
import isEqual from 'lodash.isequal';
import {
    Icon,
    Button,
} from 'react-native-elements';
import { connect } from 'react-redux';

import { saveImage } from '../../actions';

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
    static navigationOptions = ({ navigation }) => ({
        title: 'GAME',
        headerTitle: 'Game',
        headerRight: (
            <Button
                title="Settings"
                textStyle={{
                    color: "rgba(0, 122, 255, 1)"
                }}
                backgroundColor="rgba(0, 0, 0, 0)"
                onPress={() => navigation.navigate('settings')}
            />
        ),
        tabBarIcon: ({ tintColor }) => (
            <Icon
                size={30}
                name="videogame-asset"
                color={tintColor}
            />
        )
    });
    
    screenWidth = Dimensions.get('window');
    
    state = {
        tiles: Array(9).fill(''),
        currentType: 'x',
        type: null,
        winner: null,
        iconSource: '',
        image: {
            x: require('../Tile/x.png'),
            o: require('../Tile/o.png'),
        },
    }
    
    componentDidMount() {
        AsyncStorage.getItem('x_path')
            .then(uri => {
                if (uri) {
                    imagePath = { uri };
                    
                    this.props.saveImage('x_path', uri);
                }
            })
            .catch(e => console.log(e));
    
        AsyncStorage.getItem('o_path')
            .then(uri => {
                if (uri) {
                    imagePath = { uri };
                    
                    this.props.saveImage('o_path', uri);
                }
            })
            .catch(e => console.log(e));
        
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
            // if (isEqual(option.sort(), xPositions.sort())) {
            if (option.every(el => xPositions.indexOf(el) > -1)) {
                winner = 'x';
            // } else if (isEqual(option.sort(), oPositions.sort())) {
            } else if (option.every(el => oPositions.indexOf(el) > -1)) {
                winner = 'o';
            } 
        });
        
        return winner;
        
        // this.setState({ winner }, this.AIMove);
    }
    
    AIMove = () => {
        const { level } = this.props;
        const { tiles } = this.state;
        
        let freeTilesIndexes = [];
        
        tiles.forEach((tile, index) => {
            if (tile === '') {
                freeTilesIndexes.push(index);
            }
        });
        
        let randomIndex;
        
        if (level === 1) {
            randomIndex = this.getRendomMove(freeTilesIndexes);
        } else if (level === 2) {
            if (Math.random() > 0.7) {
                randomIndex = this.getRendomMove(freeTilesIndexes);
            } else {
                randomIndex = this.getRealMove(freeTilesIndexes);
            }
        } else {
            randomIndex = this.getRealMove(freeTilesIndexes);
        }
        
        const newTiles = [ ...tiles ];
        newTiles[randomIndex] = 'o';
        
        this.setState({ tiles: newTiles }, () => {
            const winner = this.findWinner();
            
            if (winner !== '') {
                this.setState({ winner });
            }
        });
    }
    
    getRealMove = (freeTilesIndexes) => {
        if (!this.isCenterOccupied()) {
            return 4;
        }
        
        const oWinIndex = this.getMoveByPair('o');
        
        if (oWinIndex !== false) {
            return oWinIndex;
        }
        
        const xWinIndex = this.getMoveByPair('x');
        
        if (xWinIndex !== false) {
            return xWinIndex;
        }
        
        const specialMoveIndex = this.getSpecialIndex();
        
        if (specialMoveIndex !== false) {
            return specialMoveIndex;
        }
        
        const cornerIndex = this.getRandomFreeCorner();
        
        if (cornerIndex !== false) {
            return cornerIndex;
        }
        
        return this.getRendomMove(freeTilesIndexes);
    }
    
    getRandomFreeCorner = () => {
        const freeCorners = [0, 2, 6, 8].filter(i => {
            this.state.tiles[i] === '';
        });
        
        if (freeCorners.length > 0) {
            return this.getRendomMove(freeCorners);
        }
        
        return false;
    }
    
    getSpecialIndex = () => {
        const { tiles } = this.state;
        const oCount = tiles.filter(tile => tile === 'o').length;
        
        if (oCount === 1) {
            if (
                (tiles[1] === 'x' && tiles[4] === 'o' && tiles[3] === 'x')
                ||
                (tiles[5] === 'x' && tiles[4] === 'o' && tiles[7] === 'x')
            ) {
                return this.getRendomMove([2, 6])
            }
            
            if (
                (tiles[1] === 'x' && tiles[4] === 'o' && tiles[5] === 'x')
                ||
                (tiles[3] === 'x' && tiles[4] === 'o' && tiles[7] === 'x')
            ) {
                return this.getRendomMove([0, 8])
            }
        }
        
        return false;
    }
    
    // getRendomNumberFromRange = (min, max) => {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }
    
    getMoveByPair = (tile) => {
        let moveIndex = false;
        
        winningOptions.forEach(options => {
            const countOfUsed = options.filter(option => this.state.tiles[option] === tile).length;
            const countOfFree = options.filter(option => this.state.tiles[option] === '').length;
            
            if (countOfUsed === 2 && countOfFree === 1) {
                
                options.forEach((option) => {
                    if (this.state.tiles[option] === '') {
                        moveIndex = option;
                    }
                });
            }
        });
        
        if (moveIndex !== false) {
            return moveIndex
        } else {
            return false;
        }
    }
    
    isCenterOccupied = () => {
        return this.state.tiles[4] !== '';
    }
    
    getRendomMove = (freeTilesIndexes) => {
        return freeTilesIndexes[Math.floor(Math.random() * freeTilesIndexes.length)];
    }
    
    onPress = (index) => {
        const { tiles, currentType } = this.state;
        
        tiles[index] = currentType;
        
        this.setState({
            tiles,
            currentType,
        }, this.findWinnerOrMove);
    }
    
    hasEmptyTile = () => {
        return this.state.tiles.some(tile => tile === '');
    }
    
    findWinnerOrMove = () => {
        const winner = this.findWinner();
        
        if (!this.hasEmptyTile() && winner === '') {
            this.setState({ winner: 'Draw!' })
        } else if (winner === '') {
            this.AIMove();
        } else {
            this.setState({ winner });
        }
    }
    
    renderBoard() {
        const { winner } = this.state;
        const { width } = Dimensions.get('window');
        
        if (winner) {
            const winnerText = winner === 'x'
                ? 'You won :)' 
                    : winner === 'o'
                        ? 'You loose :('
                        : 'Draw!';
            
            return (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}
                >
                    <Text style={{ fontSize: 24 }}>{winnerText}</Text>
                    
                    <Icon
                        name="autorenew"
                        color="orange"
                        onPress={() => this.setState({
                            winner: '',
                            tiles: Array(9).fill(''),
                        })}
                    />
                </View>
            );
        }
        
        return (
            <View style={{
                flex: 3,
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: width - 50,
            }}>
                {this.state.tiles.map((tile, index) => {
                    const path = tile === 'x'
                        ? 'x_path'
                        : tile === 'o'
                            ? 'o_path'
                            : '';
                            
                    return (
                        <Tile
                            imagePath={this.props.image[path]}
                            key={index}
                            type={tile}
                            style={{
                                width: ((width - 50) / 3) - 2 ,
                                height: ((width - 50) / 3) - 2 ,
                            }}
                            index={index}
                            onPress={this.onPress}
                        />
                    )
                })}
            </View>
        );
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.settingsContainer}>
                    
                </View>
                
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
        flexDirection: 'column',
    },
    settingsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = (state) => {
    return {
        image: state.images,
        level: state.level,
    }
}

export default connect(mapStateToProps, { saveImage })(Board);
