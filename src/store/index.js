import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import commonReducer from '../service/common/reducer';
import carReducer from '../service/car/reducer'
import hotelReducer from '../service/hotel/reducer';
import { reducer as reduxForm } from 'redux-form';
import loginReducer from '../service/login/reducer';
import addcartReducer from '../service/addCart/reducer';
import dashboardReducer from '../service/dashboard/reducer';
import cardReducer from "../service/card/reducer";
import paymentReducer from '../service/payment/reducer';
import loaderReducer from '../service/loader/reducer'
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  stateReconciler: autoMergeLevel1
  // whitelist: ["paymentDetails", "loginStatus"]

}

const rootReducer = combineReducers({
  commonReducer,
  loaderReducer,
  hotelReducer,
  carReducer,
  form: reduxForm,
  addcartReducer,
  loginReducer: persistReducer(persistConfig, loginReducer),
  dashboardReducer: persistReducer(persistConfig, dashboardReducer),
  cardReducer,
  paymentReducer: persistReducer(persistConfig, paymentReducer)

});

export default rootReducer;