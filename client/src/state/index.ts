import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { save, load } from "redux-localstorage-simple"

import application from "./application/reducer"
import { updateVersion } from "./global/actions"
import user from "./user/reducer"
import transactions from "./transactions/reducer"
import lists from "./lists/reducer"
import multicall from "./multicall/reducer"

import freshTokens from "./freshTokens/reducer"
import trojanTxs from "./trojanTxs/reducer"
import trojanBlocks from "./trojanBlocks/reducer"

const PERSISTED_KEYS: string[] = ["user", "transactions", "lists"]

const store = configureStore({
  reducer: {
    application,
    user,
    transactions,
    multicall,
    lists,

    freshTokens,
    trojanTxs,
    trojanBlocks,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), save({ states: PERSISTED_KEYS, debounce: 1000 })],
  preloadedState: load({ states: PERSISTED_KEYS }),
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
