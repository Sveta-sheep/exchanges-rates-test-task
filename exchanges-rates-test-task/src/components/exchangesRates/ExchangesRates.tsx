import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redux/rootReducers'
import { CurrencyType, getRates } from '../../redux/exchangeRatesReducer';
import { RatesType } from '../../redux/exchangeRatesReducer';
import { calculateExchangeRates } from '../../utils/calculateExchangeRates';
import s from './ExchangesRates.module.css'

const ExchangesRates = () => {
    const rates = useSelector<AppState, RatesType>(state => state.exchangeRatesReducer.rates)
    const baseCurrency = useSelector<AppState, CurrencyType>(state => state.exchangeRatesReducer.baseCurrency)
    const dispatch = useDispatch()
    const r1 = useMemo(() => {
        return Object.entries(rates).map(r => {
            return <li className={s.ratesListItem}>{r[0]}: {r[1].toFixed(4)}</li>
        })
    }, [rates])

    useEffect(() => {
        dispatch(getRates())
    }, [getRates])

    const r2 = useMemo(() => {
        const sum = Object.entries(rates).find(r => r[0] === baseCurrency)
        if (!sum) return [];

        return calculateExchangeRates(rates, sum[0] as CurrencyType).map(r => {
            return <li className={s.ratesListItem}>{r[0]}: {r[1].toFixed(4)}</li>
        })
    }, [rates, baseCurrency])



    return (
        <div className={s.ratesWrapper}>
            <h2 className={s.baseCurrency}> 1 {baseCurrency}</h2>
            <ul className={s.ratesList}>
                {baseCurrency === 'EUR' ? r1 : r2}
            </ul>
        </div>
    )
}

export default ExchangesRates;
