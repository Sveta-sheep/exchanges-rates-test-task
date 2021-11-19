import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { CurrencyType, setBaseCurrency } from '../../redux/exchangeRatesReducer';
import { isCurrencyType } from '../../utils/isCurrency';

const FIRST_LOGIN_KEY = 'FIRST_LOGIN_KEY';
const USER_CURRENCY_KEY = 'USER_CURRENCY_KEY';

export const FirstCurrencyWrapper = (props: { children: JSX.Element | JSX.Element[] }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const wasLogin = localStorage.getItem(FIRST_LOGIN_KEY);

        if (wasLogin === '1') {
            dispatch(setBaseCurrency(localStorage.getItem(USER_CURRENCY_KEY) as CurrencyType || 'UAH'))
            return;
        }

        while (true) {
            const currency = prompt('Please set your currency: ', 'UAH');

            if (isCurrencyType(currency || '')) {
                localStorage.setItem(FIRST_LOGIN_KEY, '1');
                localStorage.setItem(USER_CURRENCY_KEY, currency || '');
                dispatch(setBaseCurrency(currency as CurrencyType));
                break;
            }
        }
    }, [])

    return <>
        {props.children}
    </>
}
