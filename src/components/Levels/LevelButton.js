import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {
    connect,
} from 'react-redux';

import {
    setLevel,
} from '../../actions';

class LevelButton extends React.Component {
    setGameLevel = () => {
        this.props.setLevel(this.props.level);
        
        this.props.navigate('game');
    }
    
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
            >
                <TouchableOpacity onPress={this.setGameLevel}>
                    <Text
                        style={{
                            fontSize: 18,
                        }}
                    >
                        {`Level ${this.props.level}`}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(null, { setLevel })(LevelButton);
