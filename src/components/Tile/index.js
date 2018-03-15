import React from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

class Tile extends React.Component {
    static defaultProps = {
        // imagePath: null,
        style: {},
        onPress: () => {},
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
        
        const image = type === 'x'
            ? require('./x.png')
            : require('./o.png');
        
        return (
            <View style={tileStyles}>
                <Image
                    style={tileStyles}
                    source={image}
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
