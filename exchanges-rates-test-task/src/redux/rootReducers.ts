import { errorReducer } from './errorMessages';
import { AnyAction, combineReducers} from "redux";
import { exchangeRatesReducer } from "./exchangeRatesReducer";

let appReducer = combineReducers({
    exchangeRatesReducer,
    errorReducer
})

export const rootReducer = (state: any, action: AnyAction) => {
    return appReducer(state, action);
}

export type AppState = ReturnType<typeof appReducer>;