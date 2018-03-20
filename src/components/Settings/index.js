import React from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import {
    Icon,
    Button,
} from 'react-native-elements';
import ImageSelector from 'react-native-image-picker';
import {
    connect,
} from 'react-redux';

import {
    saveImage,
    resetImages,
} from '../../actions';

class Settings extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'GAME',
        headerTitle: 'Game',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                size={30}
                color={tintColor}
                name="videogame-asset"
            />
        ),
    });
    
    openImagePicker = (type) => {
        const options = {
            title: 'Select Icon',
            storageOptions: {
                path: 'images',
                skipBackup: true,
            }
        };
        
        ImageSelector.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            }
            else if (response.error) {
                return;
            }
            else {
                let source = { uri: response.uri };
                
                const path = type === 'x'
                    ? 'x_path'
                    : type === 'o'
                        ? 'o_path'
                        : null;
                
                this.props.saveImage(path, response.uri);
                
                const base64Data = 'data:image/jpeg;base64,' + response.data;
                
                AsyncStorage.setItem(path, base64Data);
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    large
                    title="Change Image for"
                    backgroundColor="green"
                    iconRight={{ name: 'close' }}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => this.openImagePicker('x')}
                />
                <Button
                    large
                    title="Change Image for"
                    backgroundColor="green"
                    buttonStyle={styles.buttonStyle}
                    iconRight={{ name: 'panorama-fish-eye' }}
                    onPress={() => this.openImagePicker('o')}
                />
                <Button
                    large
                    title="Reset Images"
                    backgroundColor="red"
                    buttonStyle={styles.buttonStyle}
                    iconRight={{ name: 'delete-forever' }}
                    // onPress={() => AsyncStorage.multiRemove(['x_path', 'o_path'])}
                    onPress={this.props.resetImages}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    buttonStyle: {
        width: 200,
        marginTop: 10,
    },
});

export default connect(null, { saveImage, resetImages })(Settings);
