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

export default combineReducers({
    images,
});