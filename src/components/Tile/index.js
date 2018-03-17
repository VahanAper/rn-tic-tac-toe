import React from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
} from 'react-native';

class Tile extends React.Component {
    static defaultProps = {
        // imagePath: null,
        style: {},
        onPress: () => {},
    }
    
    state = {
        imagePath: null,
    }
    
    renderContent = () => {
        const {
            type,
            // imagePath,
            style: { width, height },
        } = this.props;
        
        const tileStyles = { width, height };
        
        if (!type) {
            return (
                <View style={tileStyles} />
            );
        }
        
        // const image = type === 'x'
        //     ? require('./x.png')
        //     : require('./o.png');
        
        // let imagePath = null;
        // 
        // if (type === 'x') {
        //     AsyncStorage.getItem('x_path')
        //         .then(uri => {
        //             if (uri) {
        //                 imagePath = { uri };
        //             } else {
        //                 imagePath = require('./x.png')
        //             }
        // 
        //             if (!this.state.imagePath) {
        //                 this.setState({ imagePath });
        //             }
        // 
        //         })
        //         .catch(e => console.log(e));
        // } else if (type === 'o') {
        //     AsyncStorage.getItem('o_path')
        //         .then(uri => {
        //             if (uri) {
        //                 imagePath = { uri };
        //             } else {
        //                 imagePath = require('./o.png');
        //             }
        // 
        //             if (!this.state.imagePath) {
        //                 this.setState({ imagePath });
        //             }
        // 
        //         })
        //         .catch(e => console.log(e));
        // }
        
        return (
            <View style={tileStyles}>
                <Image
                    style={tileStyles}
                    source={this.props.imagePath}
                />
            </View>
        );
    }
    
    handleOnPress = () => {
        if (this.props.type) {
            return;
        }
        
        this.props.onPress(this.props.index);
    }
    
    render() {
        return (
            <View style={{ ...styles.tileWrapper, ...this.props.style }}>
                <TouchableOpacity onPress={this.handleOnPress}>
                    {this.renderContent()}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    tileWrapper: {
        margin: 1,
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#000000',
    },
};

export default Tile;
