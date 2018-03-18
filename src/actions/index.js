import {
    AsyncStorage,
} from 'react-native';

export const saveImage = (path, uri) => async (dispatch) => {
    dispatch({
        type: 'SAVE_IMAGE',
        payload: {
            path, uri,
        },
    });
};

export const setLevel = (level) => {
    return {
        type: 'SET_LEVEL',
        paload: level,
    };
};
