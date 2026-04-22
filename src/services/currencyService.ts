/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExchangeRates {
  [currency: string]: number;
}

export interface CurrencyData {
  base: string;
  date: string;
  rates: ExchangeRates;
}

export const getExchangeRates = async (base: string = 'USD'): Promise<CurrencyData> => {
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
    if (!response.ok) throw new Error('Failed to fetch exchange rates');
    return await response.json();
  } catch (error) {
    console.error('Error fetching rates:', error);
    // Fallback data if API fails
    return {
      base: 'USD',
      date: new Date().toISOString().split('T')[0],
      rates: {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 151.42,
        CAD: 1.36,
        AUD: 1.52,
        CHF: 0.91,
        CNY: 7.23,
        INR: 83.33,
      }
    };
  }
};

export const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '元' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
];
