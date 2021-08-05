import { createReducer } from "@reduxjs/toolkit"
import { ITransaction } from "types/trojan/tx-model"
import {
  addConfirmed,
  addPending,
  loadConfirmed,
  loadPendings,
  removeConfirmed,
  removePending,
  selectCurrency,
  resetStateTx,
} from "./actions"
import { oldTransactionFirst } from "./hooks"

export interface TrojanTransactionState {
  selectedCurrencyId: string
  pendings: {
    [txHash: string]: ITransaction
  }
  confirmeds: {
    [txHash: string]: ITransaction
  }
}

export const initialState: TrojanTransactionState = {
  selectedCurrencyId: "",
  pendings: {},
  confirmeds: {},
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(resetStateTx, (state) => {
      state.pendings = initialState.pendings
      state.confirmeds = initialState.confirmeds
    })
    .addCase(selectCurrency, (state, { payload: currencyId }) => {
      state.selectedCurrencyId = currencyId
    })
    .addCase(addPending, (state, { payload: trojanTx }) => {
      const txValues = Object.values(state.pendings)
      if (txValues.length > 29) {
        const txs = state.pendings
        const sorted = txValues.sort(oldTransactionFirst)
        delete txs[sorted[0].hash]
        txs[trojanTx.hash] = trojanTx
        state.pendings = txs
      } else {
        state.pendings[trojanTx.hash] = { ...trojanTx }
      }
    })
    .addCase(addConfirmed, (state, { payload: trojanTx }) => {
      const txValues = Object.values(state.confirmeds)
      if (txValues.length > 29) {
        const txs = { ...state.confirmeds }
        const sorted = txValues.sort(oldTransactionFirst)
        delete txs[sorted[0].hash]
        txs[trojanTx.hash] = trojanTx
        state.confirmeds = txs
      } else {
        state.confirmeds[trojanTx.hash] = { ...trojanTx }
      }
    })
    .addCase(removePending, (state, { payload: trojanTx }) => {
      if (state.pendings?.[trojanTx.hash]) {
        const txs = state.pendings
        delete txs[trojanTx.hash]
        state.pendings = txs
      }
    })
    .addCase(removeConfirmed, (state, { payload: trojanTx }) => {
      if (state.confirmeds?.[trojanTx.hash]) {
        const txs = state.confirmeds
        delete txs[trojanTx.hash]
        state.confirmeds = txs
      }
    })
    .addCase(loadPendings, (state, { payload: txs }) => {
      state.pendings = { ...initialState.pendings }
      for (const tx of txs) {
        state.pendings[tx.hash] = tx
      }
    })
    .addCase(loadConfirmed, (state, { payload: txs }) => {
      state.confirmeds = { ...initialState.confirmeds }
      for (const tx of txs) {
        state.confirmeds[tx.hash] = tx
      }
    })
)
