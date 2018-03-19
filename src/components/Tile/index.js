import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

class Tile extends React.Component {
    static defaultProps = {
        style: {},
        onPress: () => {},
    }
    
    renderContent = () => {
        const {
            type,
            style: { width, height },
        } = this.props;
        
        const tileStyles = { width, height };
        
        if (!type) {
            return (
                <View style={tileStyles} />
            );
        }
        
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
            <View
                style={{
                    ...styles.tileWrapper,
                    ...this.props.style,
                }}
            >
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
