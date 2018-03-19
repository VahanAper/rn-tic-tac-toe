import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import {
    Icon,
    Button,
} from 'react-native-elements';
import {
    connect,
} from 'react-redux';

import Tile from '../Tile';

import {
    saveImage,
} from '../../actions';

import {
    findWinner,
    getRealMove,
    hasEmptyTile,
    getRendomMove,
} from '../../helpers/TicTacToeAI';

class Board extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'GAME',
        headerTitle: 'Game',
        headerRight: (
            <Button
                title="Settings"
                backgroundColor="rgba(0, 0, 0, 0)"
                textStyle={{ color: "rgba(0, 122, 255, 1)" }}
                onPress={() => navigation.navigate('settings')}
            />
        ),
        tabBarIcon: ({ tintColor }) => (
            <Icon
                size={30}
                color={tintColor}
                name="videogame-asset"
            />
        ),
    });
    
    state = {
        winner: null,
        currentType: 'x',
        tiles: Array(9).fill(''),
    }
    
    componentDidMount() {
        AsyncStorage.getItem('x_path')
            .then(uri => {
                if (uri) {
                    this.props.saveImage('x_path', uri);
                }
            })
            .catch(this.handleErrors);
    
        AsyncStorage.getItem('o_path')
            .then(uri => {
                if (uri) {
                    this.props.saveImage('o_path', uri);
                }
            })
            .catch(this.handleErrors);
    }
    
    handleErrors = (e) => {
        console.error(e);
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
            randomIndex = getRendomMove(freeTilesIndexes);
        } else if (level === 2) {
            if (Math.random() > 0.7) {
                randomIndex = getRendomMove(freeTilesIndexes);
            } else {
                randomIndex = getRealMove(tiles, freeTilesIndexes);
            }
        } else {
            randomIndex = getRealMove(tiles, freeTilesIndexes);
        }
        
        const newTiles = [ ...tiles ];
        newTiles[randomIndex] = 'o';
        
        this.setState({ tiles: newTiles }, () => {
            const winner = findWinner(this.state.tiles);
            
            if (winner !== '') {
                this.setState({ winner });
            }
        });
    }
    
    onPress = (index) => {
        const { tiles, currentType } = this.state;
        
        tiles[index] = currentType;
        
        this.setState({
            tiles,
            currentType,
        }, this.findWinnerOrMove);
    }
    
    findWinnerOrMove = () => {
        const winner = findWinner(this.state.tiles);
        
        if (!hasEmptyTile(this.state.tiles) && winner === '') {
            this.setState({ winner: 'Draw!' })
        } else if (winner === '') {
            this.AIMove();
        } else {
            this.setState({ winner });
        }
    }
    
    renderBoard() {
        const { image } = this.props; 
        const { winner, tiles } = this.state;
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
                marginTop: 50,
                flexWrap: 'wrap',
                width: width - 50,
                flexDirection: 'row',
            }}>
                {tiles.map((tile, index) => {
                    const path = tile === 'x'
                        ? 'x_path'
                        : tile === 'o'
                            ? 'o_path'
                            : '';
                            
                    return (
                        <Tile
                            key={index}
                            type={tile}
                            index={index}
                            onPress={this.onPress}
                            imagePath={image[path]}
                            style={{
                                width: ((width - 50) / 3) - 2 ,
                                height: ((width - 50) / 3) - 2 ,
                            }}
                        />
                    )
                })}
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
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

const mapStateToProps = (state) => {
    return {
        image: state.images,
        level: state.level,
    }
}

export default connect(mapStateToProps, { saveImage })(Board);
