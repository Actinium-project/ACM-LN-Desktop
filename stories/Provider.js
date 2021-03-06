import React from 'react'
import PropTypes from 'prop-types'
import 'lib/i18n/locale'
import translations from 'lib/i18n/translation'
import EventEmitter from 'events'
import { Provider as ReduxProvider } from 'react-intl-redux'
import jstz from 'jstimezonedetect'
import { configureStore } from 'store/configureStore'
import { getDefaultLocale } from 'lib/i18n'
import { getDb } from 'store/db'
import { getDbName } from 'lib/utils/db'

export const db = getDb(getDbName(CONFIG))
db.open()

window.Zap = {
  openExternal: uri => window.open(uri, '_blank'),
}

window.ipcRenderer = new EventEmitter()

window.env = {
  ZAP_NAMESPACE: process.env.ZAP_NAMESPACE,
  NODE_ENV: process.env.NODE_ENV,
}

// Default the locale to English.
const defaultLocale = getDefaultLocale()

// Initialise the intl store with data from the users current locale.
export const initialState = {
  intl: {
    locale: defaultLocale,
    messages: translations[defaultLocale],
    timeZone: jstz.determine().name(),
  },
}

export const store = configureStore(initialState)

export const Provider = ({ story }) => {
  return <ReduxProvider store={store}>{story}</ReduxProvider>
}

Provider.propTypes = {
  story: PropTypes.any.isRequired,
}

store.dispatch({
  type: 'RECEIVE_INFO',
  data: {
    chains: [
      {
        chain: 'bitcoin',
        network: 'mainnet',
      },
    ],
  },
})
store.dispatch({
  type: 'RECIEVE_TICKERS',
  btcTicker: {
    EUR: '2992.105',
    GBP: '2612.025',
    USD: '3412.015',
  },
  acmTicker: {
    EUR: '27.005',
    GBP: '23.605',
    USD: '30.775',
  },
})
store.dispatch({
  type: 'SET_CRYPTO',
  crypto: 'bitcoin',
})
store.dispatch({
  type: 'SET_CURRENCY',
  currency: 'btc',
})
store.dispatch({
  type: 'RECEIVE_BALANCE',
  walletBalance: 47238944,
  walletBalanceConfirmed: 37236599,
  walletBalanceUnconfirmed: 10002345,
  channelBalance: 256474,
})
