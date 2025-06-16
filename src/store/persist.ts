// import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'

// import { BRAND_ENVIRONMENT } from '@env';
import { persistReducer } from 'redux-persist';
import { ESliceNames } from './slices/types';
import { cartSliceReducer as cart } from './slices/cart';
// import { newCartSliceReducer as newCart } from './slices/newCart';
// import { favoriteSliceReducer as favorite } from './slices/favorite';
// import { wishListSliceReducer as wishList } from './slices/wishList';
// import { appStateSliceReducer as appState } from './slices/appState';
// import { authSliceReducer as auth } from './slices/auth';
// import { profileSliceReducer as profile } from './slices/profile';
// import { voltageConfirmationSliceReducer as voltageConfirmation } from './slices/voltageConfirmation';
// import { homeScreenSliceReducer as homeScreen } from './slices/home';
// import { filterSliceReducer as filter } from './slices/filter';
// import { globalStateSliceReducer as globalState } from './slices/globalState';

const combinedReducers = combineReducers({
  cart,
//   newCart,
//   favorite,
//   appState,
//   auth,
//   profile,
//   voltageConfirmation,
//   homeScreen,
//   filter,
//   wishList,
//   globalState,
});

const reducerProxy = (state: any, action: AnyAction) => {
  return combinedReducers(state, action);
};

export const persistedReducers = () => {
  const persistedReducer = persistReducer(
    {
      key: `persist:pizzaria-irmas-redux`,
      storage,
      // WhiteList contains a list of Slices names which can be stored on AsyncStorage
      whitelist: [
        ESliceNames.CART,
        // ESliceNames.FAVORITE,
        // ESliceNames.APP_STATE,
        // ESliceNames.PROFILE,
        // ESliceNames.AUTH,
        // ESliceNames.HOME_SCREEN
      ],
    },
    reducerProxy as typeof combinedReducers,
  );

  return persistedReducer;
};