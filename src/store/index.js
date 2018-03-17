import {
    compose,
    createStore,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const store = createStore(
    reducers,
    // Default state is empty object
    {},
    compose(
        applyMiddleware(thunk)
    ),
);

export default store;
