import {
    AsyncStorage,
} from 'react-native';

export const saveImage = (path, uri) => (dispatch) => {
    dispatch({
        type: 'SAVE_IMAGE',
        payload: {
            path,
            uri,
        },
    });
};

export const resetImages = () => async (dispatch) => {
    const result = await AsyncStorage.multiRemove(['x_path', 'o_path']);
    
    dispatch({
        type: 'RESET_IMAGES',
    });
};

export const setLevel = (level) => {
    return {
        type: 'SET_LEVEL',
        payload: level,
    };
};
