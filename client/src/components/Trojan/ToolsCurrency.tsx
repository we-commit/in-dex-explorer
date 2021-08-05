import React from "react"
import { ExternalLinkColor, SmallOnly } from "theme"
import Row from "components/Row"
import { LightGreyCardDark } from "components/Card"
import { useV2Pair } from "hooks/useV2Pairs"
import { ChainId, WETH9 } from "@uniswap/sdk-core"
import { useCurrency } from "hooks/Tokens"

interface ToolsCurrencyProps {
  currencyAddress: string
  dexSpaces: any
}

export default function ToolsCurrency({ currencyAddress, dexSpaces }: ToolsCurrencyProps) {
  const currency = useCurrency(currencyAddress)
  const linkIn = dexSpaces.isV2Sushi
    ? "https://app.sushi.com//#/swap?inputCurrency="
    : "https://app.uniswap.org/#/swap?inputCurrency="
  const linkOut = dexSpaces.isV2Sushi
    ? "https://app.sushi.com//#/swap?outputCurrency="
    : "https://app.uniswap.org/#/swap?outputCurrency="

  const infoLink = dexSpaces.isV2Sushi ? "https://sushiswap.vision/token/" : "https://info.uniswap.org/token/"
  const pair = useV2Pair(WETH9[ChainId.MAINNET], currency ? currency : undefined)
  return (
    <LightGreyCardDark key={"card-block-curr"} style={{ padding: "0.5rem", marginTop: "0.5rem" }}>
      <Row justify="center" style={{ width: "100%", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
        <ExternalLinkColor href={linkIn + currencyAddress} target="_blank" color="red">
          Sell
        </ExternalLinkColor>
        <ExternalLinkColor href={linkOut + currencyAddress} target="_blank" color="green">
          Buy
        </ExternalLinkColor>
        <ExternalLinkColor href={infoLink + currencyAddress} target="_blank" color="gray">
          Info
        </ExternalLinkColor>
        <SmallOnly>
          <ExternalLinkColor href={"https://etherscan.io/token/" + currencyAddress} target="_blank" color="gray">
            Contract
          </ExternalLinkColor>
        </SmallOnly>
        <SmallOnly>
          <ExternalLinkColor
            href={"https://app.trojan.finance/#/explorer?inputCurrency=" + currencyAddress}
            target="_blank"
            color="blue"
          >
            Mempool
          </ExternalLinkColor>
        </SmallOnly>
        {pair && pair[1]?.liquidityToken && (
          <ExternalLinkColor
            href={"https://www.dextools.io/app/uniswap/pair-explorer/" + pair[1]?.liquidityToken.address}
            target="_blank"
            color="blue"
          >
            Dextools
          </ExternalLinkColor>
        )}
      </Row>
    </LightGreyCardDark>
  )
}
