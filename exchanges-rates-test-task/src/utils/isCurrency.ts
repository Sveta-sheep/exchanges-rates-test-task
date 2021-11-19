import { CurrencyType } from "../redux/exchangeRatesReducer";

const CURRENCIES: CurrencyType[] = [
    'CAD',
    'EUR',
    'PLN',
    'RUB',
    'UAH',
    'USD'
]

export function isCurrencyType(str: string): boolean {
    return CURRENCIES.includes(str as CurrencyType);
}