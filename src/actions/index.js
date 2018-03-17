import {
    AsyncStorage,
} from 'react-native';

export const saveImage = (path, uri) => async (dispatch) => {
    
    // await AsyncStorage.getItem();
    
    
    dispatch({
        type: 'SAVE_IMAGE',
        payload: {
            path, uri,
        },
    });
    
    
};
