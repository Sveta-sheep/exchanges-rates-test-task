import { Action, ActionCreator } from './typescript';

const SET_ERROR = 'errorMessages/SET_ERROR';

type SET_ERROR_ACTION = Action<typeof SET_ERROR, string>;

type ErrorStateType = {
    errorMessage: string,
}

const initialState: ErrorStateType = {
    errorMessage: ''
}

export const errorReducer = (state: ErrorStateType = initialState, action: SET_ERROR_ACTION): ErrorStateType => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.payload || 'Something goes wrong'
            }
        default: 
            return state;
    }
}

export const setError: ActionCreator<typeof SET_ERROR, string> = errorText => ({
    type: SET_ERROR,
    payload: errorText
})