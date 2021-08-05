import React from "react"
import Row, { RowBetween } from "components/Row"
import {
  LightGreyCardDark,
  OutlineCard99,
  OutlineCard95,
  OutlineCard90,
  OutlineCard80,
  OutlineCard70,
} from "components/Card"
import { Text } from "rebass"
import { ExternalLink, ExternalLinkColor } from "../../theme"
import FadeIn from "./FadeIn"

interface ToolsBlockProps {
  block: any
}

export default function ToolsBlock({ block }: ToolsBlockProps) {
  if (block && block.responseData && block.responseData.blockPrices[0]) {
    return (
      <>
        <LightGreyCardDark style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>
          <RowBetween align="center">
            <ExternalLinkColor color="white" href={"https://www.blocknative.com/gas-estimator"}>
              futureBlock.gasPrice
            </ExternalLinkColor>
          </RowBetween>
          <Row justify="center">
            <Row justify="center" style={{ width: "100%", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
              <OutlineCard99>
                <Text color={"#5aea98"} fontWeight={500} fontSize={14}>
                  {"99% "}
                </Text>
                <Text color={"#5aea98"} fontWeight={800} fontSize={14}>
                  <FadeIn text={block.responseData.blockPrices[0].estimatedPrices[0].price + " Gwei"}></FadeIn>
                </Text>
              </OutlineCard99>
              <OutlineCard95>
                <Text color={"#5dea5a"} fontWeight={500} fontSize={14}>
                  {"95% "}
                </Text>
                <Text color={"#5dea5a"} fontWeight={800} fontSize={14}>
                  <FadeIn text={block.responseData.blockPrices[0].estimatedPrices[1].price + " Gwei"}></FadeIn>
                </Text>
              </OutlineCard95>
              <OutlineCard90>
                <Text color={"#bcea5a"} fontWeight={500} fontSize={14}>
                  {"90% "}
                </Text>
                <Text color={"#bcea5a"} fontWeight={800} fontSize={14}>
                  <FadeIn text={block.responseData.blockPrices[0].estimatedPrices[2].price + " Gwei"}></FadeIn>
                </Text>
              </OutlineCard90>
              <OutlineCard80>
                <Text color={"#ffe600"} fontWeight={500} fontSize={14}>
                  {"80% "}
                </Text>
                <Text color={"#ffe600"} fontWeight={800} fontSize={14}>
                  <FadeIn text={block.responseData.blockPrices[0].estimatedPrices[3].price + " Gwei"}></FadeIn>
                </Text>
              </OutlineCard80>
              <OutlineCard70>
                <Text color={"#eab05a"} fontWeight={500} fontSize={14}>
                  {"70% "}
                </Text>
                <Text color={"#eab05a"} fontWeight={800} fontSize={14}>
                  <FadeIn text={block.responseData.blockPrices[0].estimatedPrices[4].price + " Gwei"}></FadeIn>
                </Text>
              </OutlineCard70>
            </Row>
          </Row>
        </LightGreyCardDark>

        <LightGreyCardDark>
          <RowBetween align="center" style={{ marginBottom: "0.2rem" }}>
            <ExternalLink href={"https://etherscan.io/block/" + (block.blockNumber + 1)}>
              nextBlock.maxGasPrice
            </ExternalLink>
            <ExternalLink href={"https://etherscan.io/block/" + (block.blockNumber + 1)}>
              <FadeIn text={block.responseData.maxPrice + " Gwei"}></FadeIn>
            </ExternalLink>
          </RowBetween>
          <RowBetween align="center" style={{ marginBottom: "0.2rem" }}>
            <ExternalLink href={"https://etherscan.io/block/" + (block.blockNumber + 1)}>
              nextBlock.transactions
            </ExternalLink>
            <ExternalLink href={"https://etherscan.io/block/" + (block.blockNumber + 1)}>
              <FadeIn text={block.responseData.blockPrices[0].estimatedTransactionCount + " TXs"}></FadeIn>
            </ExternalLink>
          </RowBetween>
        </LightGreyCardDark>
      </>
    )
  } else return <></>
}
