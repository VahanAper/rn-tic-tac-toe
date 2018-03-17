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
        
        console.log('asd2 ::: ');
        
        AsyncStorage.getItem('x_path')
            .then(uri => {
                
                console.log('x ::: ', uri);
                if (uri) {
                    imagePath = { uri };
                    
                    
                    this.props.saveImage('x_path', uri);
                    
                    // this.setState({ image: { ...this.state.image, x: imagePath } });
                }
            })
            .catch(e => console.log(e));
    
        AsyncStorage.getItem('o_path')
            .then(uri => {
                console.log('o ::: ', uri);
                if (uri) {
                    imagePath = { uri };
                    
                    
                    this.props.saveImage('o_path', uri);
                    
                    // this.setState({ image: { ...this.state.image, o: imagePath } });
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
        console.log('this.props.image ;::: ', this.props.image);
        
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
    }
}

export default connect(mapStateToProps, { saveImage })(Board);
