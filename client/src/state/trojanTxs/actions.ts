import { createAction } from "@reduxjs/toolkit"
import { ITransaction } from "types/trojan/tx-model"

export const addPending = createAction<ITransaction>("trojanTxs/addPending")
export const removePending = createAction<ITransaction>("trojanTxs/removePending")

export const addConfirmed = createAction<ITransaction>("trojanTxs/addConfirmed")
export const removeConfirmed = createAction<ITransaction>("trojanTxs/removeConfirmed")

export const loadPendings = createAction<Array<ITransaction>>("trojanTxs/loadPendings")
export const loadConfirmed = createAction<Array<ITransaction>>("trojanTxs/loadConfirmed")

export const selectCurrency = createAction<string>("trojanTxs/selectCurrency")

export const resetStateTx = createAction<void>("trojanTxs/resetStateTx")
