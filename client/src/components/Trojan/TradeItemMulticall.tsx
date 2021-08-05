import React, { useContext, useState } from "react"
import { Box, Text } from "rebass/styled-components"
import { RowBetween } from "components/Row"
import TradeDetailMulticall from "./TradeDetailMulticall"
import styled from "styled-components"
import { ThemeContext } from "styled-components"
import { ClickableText } from "pages/styled"
import TimeAgo from "react-timeago"
import FormattedCurrencyAmount from "components/FormattedCurrencyAmount"
import { Token, CurrencyAmount, Currency } from "@uniswap/sdk-core"
import { Monitor } from "react-feather"
import { ITransaction } from "types/trojan/tx-model"
import { LightGreyCardWhite } from "components/Card"
import { currencyId } from "utils/currencyId"
import { MouseoverTooltip } from "components/Tooltip"
import { ButtonOutlinedError } from "components/Button"
import { Trash } from "react-feather"
import { TYPE } from "../../theme"

const Proposal = styled(Box)`
  width: 100%;
  margin-top: 0.5rem;
  border-radius: 12px;
  align-items: center;
  text-align: left;
  outline: none;
  color: ${({ theme }) => theme.text1};
  text-decoration: none;
`
interface TradeItemProps {
  currency: Currency
  tx: ITransaction
  initOpen: boolean
  clearTxHandler?: any
}

export default function TradeItemMulticall({ tx, currency, initOpen, clearTxHandler = null }: TradeItemProps) {
  const theme = useContext(ThemeContext)
  const [showMe, setShowMe] = useState(initOpen)

  const { hash, toTokenAddress, mempoolData, whaleData, isV3 } = tx
  const { txMethod, input, output, amountIn, amountOut } = mempoolData

  const cf = new Token(input.chainId, input.address, input.decimals, input.symbol, input.name)
  const ct = new Token(output.chainId, output.address, output.decimals, output.symbol, output.name)
  const tradeType = txMethod.includes("swapExact") || txMethod.includes("exactInput") ? "ExactIn" : "ExactOut"

  const caf = CurrencyAmount.fromRawAmount(cf, amountIn)
  const cat = CurrencyAmount.fromRawAmount(ct, amountOut)
  const cid = currencyId(currency)

  return (
    <Proposal style={{ direction: "ltr" }} key={hash}>
      <LightGreyCardWhite>
        <RowBetween>
          {cid === toTokenAddress ? (
            <>
              <ClickableText fontSize={12} color={theme.green1} onClick={() => setShowMe(!showMe)}>
                {"Buy ▲ "}
                {ct.symbol === "WETH9" ? "WETH " : ct.symbol + " "}
                <b>{<FormattedCurrencyAmount currencyAmount={cat} id={ct.address} />}</b>
              </ClickableText>
              <ClickableText fontSize={12} color={theme.text1} onClick={() => setShowMe(!showMe)}>
                {" For "} {cf.symbol === "WETH9" ? "WETH " : cf.symbol + " "}
                <b>{<FormattedCurrencyAmount currencyAmount={caf} id={cf.address} />}</b>
              </ClickableText>
            </>
          ) : (
            <>
              <ClickableText fontSize={12} color={theme.red3} onClick={() => setShowMe(!showMe)}>
                {"Sell ▼ "} {cf.symbol === "WETH9" ? "WETH " : cf.symbol + " "}
                <b> {<FormattedCurrencyAmount currencyAmount={caf} id={cf.address} />} </b>
              </ClickableText>
              <ClickableText fontSize={12} color={theme.text1} onClick={() => setShowMe(!showMe)}>
                {" For "} {ct.symbol === "WETH9" ? "WETH " : ct.symbol + " "}
                <b>{<FormattedCurrencyAmount currencyAmount={cat} id={ct.address} />}</b>
              </ClickableText>
            </>
          )}
          {whaleData && (
            <>
              {whaleData !== {} && (
                <ClickableText fontSize={12} color={theme.yellow1} onClick={() => setShowMe(!showMe)}>
                  {"Known " + "..." + whaleData.address.slice(36, 42)} <Monitor color={theme.yellow1} size={14} />
                </ClickableText>
              )}
            </>
          )}

          <TYPE.small>
            <TimeAgo key={tx.hash + tx.timestampTx} date={tx.timestampTx} />
          </TYPE.small>

          <Text fontSize={12} color={theme.blue1}>
            {isV3 && "V3"}
            {clearTxHandler && tx.status === "pending" && (
              <MouseoverTooltip text={"Double click to hide the tx."}>
                <ButtonOutlinedError
                  onClick={(e) => {
                    if (e.detail === 2) {
                      clearTxHandler(tx)
                    }
                  }}
                  width={"14"}
                  height={"14"}
                  padding={"4px"}
                >
                  <Trash size={14} color={theme.text3}></Trash>
                </ButtonOutlinedError>
              </MouseoverTooltip>
            )}
          </Text>
        </RowBetween>
      </LightGreyCardWhite>
      <TradeDetailMulticall tx={tx} showMe={showMe} tradeType={tradeType}></TradeDetailMulticall>
    </Proposal>
  )
}
