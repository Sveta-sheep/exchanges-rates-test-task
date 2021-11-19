import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../redux/errorMessages";
import { setConverterAmount } from "../../redux/exchangeRatesReducer";
import { calculateExchangeRates } from "../../utils/calculateExchangeRates";
import { isCurrencyType } from "../../utils/isCurrency";
import s from './ConvertingCurrency.module.css';

const ConvertingCurrency = () => {
    const convertingString = useSelector(state => state.exchangeRatesReducer.converterAmount);
    const rates = useSelector(state => state.exchangeRatesReducer.rates);
    const error = useSelector(state => state.errorReducer.errorMessage)
    const dispatch = useDispatch();

    const [res, setRes] = useState(0);

    const handleChangeInput = (e) => {
        dispatch(setConverterAmount(e.currentTarget.value))
    }

    const onButtonConverterClick = useCallback(() => {
        let currencies = []

        const convertingStringArray = convertingString.split(" ");
        const amount = +convertingStringArray[0] || 0;

        const maybeCurrencies = [convertingStringArray[1], convertingStringArray[3]]

        if (maybeCurrencies.map(c => isCurrencyType(c)).every(Boolean)) {
            console.log([...maybeCurrencies]);
            currencies = [...maybeCurrencies];


            const currencyExchangeRates = calculateExchangeRates(rates, currencies[0]).reduce((acc, [s, n]) => {
                acc[s] = n;
                return acc
            })

            currencies[1] === 'EUR'
                ? setRes(amount * currencyExchangeRates[1].toFixed(4))
                : setRes(amount * currencyExchangeRates[currencies[1]].toFixed(4))
        } else {
            dispatch(setError('Incorrect currency or amount'));
        }


    }, [setRes, convertingString, rates, calculateExchangeRates, setError]);

    return (
        <div className={s.converterWrapper}>
            <div className={s.converterExample} >
                Please, enter the amount you want to convert &#40;For example: "15 USD in UAH"&#41;
            </div>
            <input className={error? s.errorInput : s.converterInput} type='text' name='converter box' value={convertingString} onChange={handleChangeInput} />
            {error && <div className={s.error}>{error}</div>}
            <button className={s.converterButton} onClick={onButtonConverterClick}>Convert</button>
            <div className={s.result}>Result: {res}</div>
        </div>
    )
}

export default ConvertingCurrency;