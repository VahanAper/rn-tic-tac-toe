import { combineReducers } from 'redux';

const DEFAULT_STATE = {
    x_path: require('../components/Tile/x.png'),
    o_path: require('../components/Tile/o.png'),
}

const images = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'SAVE_IMAGE':
            return {
                ...state,
                [action.payload.path]: { uri: action.payload.uri },
            };
            
        default:
            return state;
    }
};

const level = (state = 1, action) => {
    switch (action.type) {
        case 'SET_LEVEL':
            return action.paload;
            
        default:
            return state;
    }
}

export default combineReducers({
    images,
    level,
});