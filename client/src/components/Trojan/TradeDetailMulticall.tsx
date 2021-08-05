import React, { useContext } from "react"
import { Text } from "rebass/styled-components"
import { ExternalLink } from "../../theme"
import { RowBetween } from "components/Row"
import { ThemeContext } from "styled-components"
import { utils } from "ethers"
import { ITransaction } from "types/trojan/tx-model"
import { TradeDetailShow } from "components/Card"

interface TradeDetailProps {
  tx: ITransaction
  showMe: boolean
  tradeType: string
}

export default function TradeDetailMulticall({ tx, showMe, tradeType }: TradeDetailProps) {
  const { hash, from, gasPrice, mempoolData, whaleData } = tx
  const { txMethod } = mempoolData

  const theme = useContext(ThemeContext)

  return (
    <TradeDetailShow show={showMe}>
      {whaleData && (
        <>
          {whaleData !== {} && (
            <RowBetween align="center" style={{ marginTop: "0.3rem" }}>
              <ExternalLink style={{ color: "#674acf" }} href={"https://etherscan.io/address/" + from}>
                {"Known " + whaleData.address.slice(0, 5) + "..." + whaleData.address.slice(36, 42)}{" "}
              </ExternalLink>
              <ExternalLink style={{ color: "#674acf" }} href={"https://twitter.com/" + whaleData.twitter.handle}>
                {"Twitter " + whaleData.twitter.handle}
              </ExternalLink>
            </RowBetween>
          )}
        </>
      )}

      <RowBetween align="center" style={{ marginTop: "0.2rem" }}>
        <Text fontWeight={500} fontSize={12} color={theme.text2}>
          Gas Price
        </Text>
        <Text fontWeight={500} fontSize={12}>
          {gasPrice && utils.formatUnits(Number(gasPrice), "gwei").slice(0, 6)} Gwei
        </Text>
      </RowBetween>

      <RowBetween align="center" style={{ marginTop: "0.3rem" }}>
        <Text fontWeight={500} fontSize={12} color={theme.text2}>
          Trade Method
        </Text>
        <Text fontWeight={500} fontSize={12}>
          {txMethod + " (" + tradeType + ")"}
        </Text>
      </RowBetween>

      <RowBetween align="center" style={{ marginTop: "0.5rem" }}>
        <ExternalLink style={{ fontSize: "13px", color: "#674acf" }} href={"https://etherscan.io/address/" + from}>
          {"Maker " + from.slice(0, 5) + "..." + from.slice(36, 42)}{" "}
        </ExternalLink>
        <ExternalLink style={{ fontSize: "13px", color: "#674acf" }} href={"https://etherscan.io/tx/" + hash}>
          {"Tx ..." + hash.slice(57, 66)}
        </ExternalLink>
      </RowBetween>
    </TradeDetailShow>
  )
}
