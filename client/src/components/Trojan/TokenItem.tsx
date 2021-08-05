import React from "react"
import { ExternalLinkColor, IconWrapper, TYPE, ExternalLink } from "../../theme"
import styled from "styled-components"
import TimeAgo from "react-timeago"
import { Box } from "rebass/styled-components"
import { darken } from "polished"
import { Row, Col } from "react-styled-flexboxgrid"
import { ButtonLight } from "components/Button"
import { Eye } from "react-feather"
import { ChainId, Token } from "@uniswap/sdk-core"
import ToolsCurrency from "./ToolsCurrency"

interface TokenItemProps {
  index: number
  token: any
  selectedHandled: any
  currency: any
  dexSpaces: any
}

const Card = styled(Box)<{ width?: string; padding?: string; border?: string; borderRadius?: string }>`
  width: ${({ width }) => width ?? "100%"};
  border-radius: 12px;
  padding: 0.7rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`

const LightCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.text5};
  background-color: ${({ theme }) => theme.bg1};
`

const Proposal = styled(Box)`
  width: 100%;
  margin-top: 0.5rem;
  border-radius: 12px;
  align-items: center;
  text-align: left;
  outline: none;
  color: ${({ theme }) => theme.text1};
  text-decoration: none;
  background-color: ${({ theme }) => theme.bg1};
  &:focus {
    background-color: ${({ theme }) => darken(0.05, theme.bg1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.bg1)};
  }
`

export default function TokenItem({ index, token, selectedHandled, currency = null, dexSpaces }: TokenItemProps) {
  const old = Number(((new Date().getTime() - token.timestampTx) / (1000 * 60)).toFixed(1))
  const t = new Token(ChainId.MAINNET, token.address, token.decimals, token.symbol, token.name)

  return (
    <Row key={token.address}>
      <Proposal style={{ direction: "ltr" }} key={token.address}>
        <LightCard>
          <Row center="xs">
            <Col xs={1}>
              <TYPE.small>{index}</TYPE.small>
            </Col>
            <Col xs={2}>
              <TYPE.small>Symbol:</TYPE.small>
              <ExternalLinkColor color="white" href={"https://etherscan.io/address/" + token.address}>
                {token.symbol}
              </ExternalLinkColor>
            </Col>

            {token.basePair ? (
              <Col xs={4}>
                <TYPE.small>Dextools: </TYPE.small>
                <ExternalLink href={"https://www.dextools.io/app/uniswap/pair-explorer/" + token.basePair}>
                  {token.symbol}
                </ExternalLink>
              </Col>
            ) : (
              <Col xs={4}>
                <TYPE.small>Name:</TYPE.small>
                <ExternalLinkColor color="white" href={"https://etherscan.io/address/" + token.address}>
                  {token.name}
                </ExternalLinkColor>
              </Col>
            )}
            <Col xs={4}>
              <TYPE.small>First detected: </TYPE.small>
              {old <= 60 && (
                <TYPE.green>
                  <TimeAgo key={token.timestampTx} date={token.timestampTx}></TimeAgo>
                </TYPE.green>
              )}
              {old > 60 && (
                <TYPE.yellow>
                  <TimeAgo key={token.timestampTx} date={token.timestampTx}></TimeAgo>
                </TYPE.yellow>
              )}
            </Col>
            <Col xs={1}>
              <ButtonLight
                onClick={() => {
                  selectedHandled(t)
                }}
                width={"16"}
                height={"16"}
                padding={"10px"}
              >
                <IconWrapper size={"16"}>
                  <Eye size={16}></Eye>
                </IconWrapper>
              </ButtonLight>
            </Col>
          </Row>
          {currency?.isToken && currency?.address === token?.address && (
            <ToolsCurrency dexSpaces={dexSpaces} currencyAddress={t.address}></ToolsCurrency>
          )}
        </LightCard>
      </Proposal>
    </Row>
  )
}
