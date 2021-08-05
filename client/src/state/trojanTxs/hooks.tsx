import JSBI from "jsbi"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { parseUnits } from "@ethersproject/units"
import { Currency, CurrencyAmount } from "@uniswap/sdk-core"
import { ParsedQs } from "qs"
import { isAddress } from "utils"
import { ITransaction } from "types/trojan/tx-model"
import { AppDispatch, AppState } from "../index"
import { useCurrency } from "hooks/Tokens"
import useParsedQueryString from "hooks/useParsedQueryString"
import {
  addPending,
  removePending,
  addConfirmed,
  removeConfirmed,
  resetStateTx,
  loadPendings,
  loadConfirmed,
  selectCurrency,
} from "./actions"

export function useTrojanTxsState(): AppState["trojanTxs"] {
  return useSelector<AppState, AppState["trojanTxs"]>((state) => state.trojanTxs)
}

// returns all the transactions for the current chain
export function useAllPendingTrojanTxs(): { [txHash: string]: ITransaction } {
  const state = useSelector<AppState, AppState["trojanTxs"]>((state) => state.trojanTxs)

  return state.pendings
}

// returns all the transactions for the current chain
export function useAllConfirmedTrojanTxs(): { [txHash: string]: ITransaction } {
  const state = useSelector<AppState, AppState["trojanTxs"]>((state) => state.trojanTxs)

  return state.confirmeds
}

export function useTrojanTxsActions(): {
  onPendingTxRemoved: (tx: ITransaction) => void
  onPendingTxAdded: (tx: ITransaction) => void
  onConfirmedTxAdded: (tx: ITransaction) => void
  onConfirmedTxRemoved: (tx: ITransaction) => void
  onLoadPendings: (txs: Array<ITransaction>) => void
  onLoadConfirmeds: (txs: Array<ITransaction>) => void
  onCurrencySelection: (currencyId: string) => void
  onClearStateTx: () => void
} {
  const dispatch = useDispatch<AppDispatch>()

  const onPendingTxRemoved = useCallback(
    (tx: ITransaction) => {
      dispatch(removePending(tx))
    },
    [dispatch]
  )
  const onPendingTxAdded = useCallback(
    (tx: ITransaction) => {
      dispatch(addPending(tx))
    },
    [dispatch]
  )

  const onConfirmedTxAdded = useCallback(
    (tx: ITransaction) => {
      dispatch(addConfirmed(tx))
    },
    [dispatch]
  )

  const onConfirmedTxRemoved = useCallback(
    (tx: ITransaction) => {
      dispatch(removeConfirmed(tx))
    },
    [dispatch]
  )

  const onClearStateTx = useCallback(() => {
    dispatch(resetStateTx())
  }, [dispatch])

  const onLoadPendings = useCallback(
    (txs: Array<ITransaction>) => {
      dispatch(loadPendings(txs))
    },
    [dispatch]
  )

  const onLoadConfirmeds = useCallback(
    (txs: Array<ITransaction>) => {
      dispatch(loadConfirmed(txs))
    },
    [dispatch]
  )

  const onCurrencySelection = useCallback(
    (currencyId: string) => {
      const checkedAddress = isAddress(currencyId)
      if (checkedAddress) dispatch(selectCurrency(checkedAddress))
    },
    [dispatch]
  )

  return {
    onPendingTxRemoved,
    onPendingTxAdded,
    onConfirmedTxAdded,
    onConfirmedTxRemoved,
    onLoadPendings,
    onClearStateTx,
    onLoadConfirmeds,
    onCurrencySelection,
  }
}

export function newTransactionsFirst(a: ITransaction, b: ITransaction) {
  return b.timestampTx - a.timestampTx
}

export function oldTransactionFirst(a: ITransaction, b: ITransaction) {
  return a.timestampTx - b.timestampTx
}

export function isTransactionRecent(tx: ITransaction): boolean {
  return new Date().getTime() - tx.timestampTx < 86_400_000
}

// from the current swap inputs, compute the best trade and return it.
export function useDerivedTrojanTxsInfo(): {
  currency: Currency | null
} {
  const { selectedCurrencyId } = useTrojanTxsState()
  const inputCurrency = useCurrency(selectedCurrencyId)

  if (inputCurrency && inputCurrency.isEther === false) {
    return {
      currency: inputCurrency,
    }
  } else {
    return {
      currency: null,
    }
  }
}

// updates the swap state to use the defaults for a given network
export function useDefaultsFromURLSearch(): { inputCurrencyId: string | undefined } | undefined {
  const dispatch = useDispatch<AppDispatch>()
  const parsedQs = useParsedQueryString()
  const [result, setResult] = useState<{ inputCurrencyId: string | undefined } | undefined>()

  useEffect(() => {
    const parsed = queryParametersToSwapState(parsedQs)

    dispatch(dispatch(selectCurrency(parsed.selectedCurrencyId)))

    setResult({ inputCurrencyId: parsed.selectedCurrencyId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return result
}

export function queryParametersToSwapState(parsedQs: ParsedQs): any {
  let inputCurrency = parseCurrencyFromURLParameter(parsedQs.inputCurrency)
  if (inputCurrency === "") {
    // default to ETH input
    inputCurrency = "ETH"
  }

  return { selectedCurrencyId: inputCurrency }
}

export function tryParseAmount<T extends Currency>(value?: string, currency?: T): CurrencyAmount<T> | undefined {
  if (!value || !currency) {
    return undefined
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString()
    if (typedValueParsed !== "0") {
      return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed))
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error)
  }
  // necessary for all paths to return a value
  return undefined
}

function parseCurrencyFromURLParameter(urlParam: any): string {
  if (typeof urlParam === "string") {
    const valid = isAddress(urlParam)
    if (valid) return valid
    if (urlParam.toUpperCase() === "ETH") return "ETH"
  }
  return ""
}
