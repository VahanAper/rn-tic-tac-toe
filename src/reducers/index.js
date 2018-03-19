import { combineReducers } from 'redux';

import x_path from '../assets/x.png';
import o_path from '../assets/o.png';

const DEFAULT_IMAGES = {
    x_path,
    o_path,
};
const DEFAULT_LEVEL = 1;

const images = (state = DEFAULT_IMAGES, action) => {
    switch (action.type) {
        case 'SAVE_IMAGE':
            const { path, uri } = action.payload;
            
            return {
                ...state,
                [path]: { uri },
            };
            
        default:
            return state;
    }
};

const level = (state = DEFAULT_LEVEL, action) => {
    switch (action.type) {
        case 'SET_LEVEL':
            return action.payload;
            
        default:
            return state;
    }
}

export default combineReducers({
    images,
    level,
});