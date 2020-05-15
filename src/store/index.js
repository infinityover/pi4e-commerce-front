import { combineReducers, createStore } from "redux";
import storage from 'redux-persist/lib/storage';
import {persistStore,persistReducer} from 'redux-persist';


import cart from './cart';
import user from './user';

const combinedReducer = combineReducers({
        user,
        cart
    });


const persistConfig = {
    key: "pi4",
    storage
}

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);



export { store, persistor} ;