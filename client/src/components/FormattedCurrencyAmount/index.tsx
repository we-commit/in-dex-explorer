import React from "react"
import { Currency, CurrencyAmount, WETH9, ChainId } from "@uniswap/sdk-core"

export default function FormattedCurrencyAmount({
  currencyAmount,
  significantDigits = 4,
  id,
}: {
  currencyAmount: CurrencyAmount<Currency>
  significantDigits?: number
  id: string
}) {
  if (id === WETH9[ChainId.MAINNET].address) return <>{currencyAmount.toSignificant(significantDigits)}</>

  return <>{numberWithCommas(Number(currencyAmount.toSignificant(significantDigits)))}</>
}

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
