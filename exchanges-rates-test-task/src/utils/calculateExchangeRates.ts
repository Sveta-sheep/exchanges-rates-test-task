import { CurrencyType, RatesType } from "../redux/exchangeRatesReducer";

export const calculateExchangeRates = (rates: RatesType, baseCurrency: CurrencyType): [string, number][] => {
    const multiplier = 1 / (rates[baseCurrency] || 1);

    return Object.entries(rates).map(r => {
        if (r[0] === baseCurrency) {
            return [
                'EUR',
                multiplier
            ]
        }

        return [
            r[0],
            r[1] * multiplier
        ]
    })
}