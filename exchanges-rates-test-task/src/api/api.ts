import axios from 'axios';
import { CurrencyType, RatesType } from '../redux/exchangeRatesReducer';

type ExchangeDataType = {
    success: boolean,
    timestamp: number,
    base: string,
    rates: RatesType
}

type ExchangeApiType = {
    getLatestRates: () => Promise<ExchangeDataType> 
}

export const exchangeApi: ExchangeApiType = {
    getLatestRates() {
        return axios.get(`http://data.fixer.io/api/latest?access_key=b1e8d074f6fd5ae006e16aa3813a7d9d&symbols=USD,UAH,CAD,PLN,RUB`)
            .then(res => res.data)
    }
}

