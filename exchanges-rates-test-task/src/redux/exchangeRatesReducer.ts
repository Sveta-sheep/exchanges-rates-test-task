import { Dispatch } from 'react';
import { exchangeApi } from '../api/api';
import { Action, ActionCreator } from './typescript';

const SET_RATES = 'exchangeRates-reducer/SET_RATES';
const SET_BASE_CURRENCY = 'exchangeRates-reducer/SET_BASE_CURRENCY';
const SET_CONVERTER_AMOUNT = 'exchangeRates-reducer/SET_CONVERTER_AMOUNT';

type SET_RATES_ACTION = Action<typeof SET_RATES, RatesType>;
type SET_BASE_CURRENCY_ACTION = Action<typeof SET_BASE_CURRENCY, CurrencyType>;
type SET_CONVERTER_AMOUNT = Action<typeof SET_CONVERTER_AMOUNT, ConverterAmountType>;

type ExchangeRatesActionsTypes =
    SET_RATES_ACTION
    | SET_BASE_CURRENCY_ACTION
    | SET_CONVERTER_AMOUNT;

export type CurrencyType = 'EUR' | 'USD' | 'UAH' | 'CAD' | 'PLN' | 'RUB';
export type RatesType = {[K in CurrencyType]?: number}
export type ConverterAmountType = string;


type ExchangeRatesState = {
    converterAmount: string,
    baseCurrency: CurrencyType,
    rates: RatesType
}

const initialState: ExchangeRatesState = {
    converterAmount: '',
    baseCurrency: 'EUR',
    rates: {}
}

export const exchangeRatesReducer = (state: ExchangeRatesState = initialState, action: ExchangeRatesActionsTypes): ExchangeRatesState => {
    switch (action.type) {
        case SET_BASE_CURRENCY:
            return {
                ...state,
                baseCurrency: action.payload || 'EUR'
            }
        case SET_RATES:
            return {
                ...state,
                rates: action.payload || {}
            }
            case SET_CONVERTER_AMOUNT:
            return {
                ...state,
                converterAmount: action.payload || ''
            }
        default: {
            return state;
        }
    }
}

export const setRates: ActionCreator<typeof SET_RATES, RatesType> = rates => ({
    type: SET_RATES,
    payload: rates
})

export const setBaseCurrency: ActionCreator<typeof SET_BASE_CURRENCY, CurrencyType> = baseCurrency => ({
    type: SET_BASE_CURRENCY,
    payload: baseCurrency
})

export const setConverterAmount: ActionCreator<typeof SET_CONVERTER_AMOUNT, ConverterAmountType> = newConverterAmount => ({
    type: SET_CONVERTER_AMOUNT,
    payload: newConverterAmount
})

export const getRates = () => async (dispatch: Dispatch<SET_RATES_ACTION>) => {
    const response = await exchangeApi.getLatestRates()

    dispatch(setRates(response.rates))
} 