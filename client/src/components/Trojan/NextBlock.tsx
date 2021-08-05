import React, { useEffect, useState } from "react"
import Row, { RowBetween } from "components/Row"
import styled, { keyframes } from "styled-components"
import { TYPE, ExternalLink } from "../../theme"
import { LightGreyCardDark } from "components/Card"

const StyledPolling = styled.div`
  display: flex;
  justify-content: center;
  top: 0rem;
  padding: 0rem;
  color: white;
  transition: opacity 0.25s ease;
  color: ${({ theme }) => theme.green1};
  :hover {
    opacity: 1;
  }
`
const StyledPollingDot = styled.div`
  width: 8px;
  height: 8px;
  min-height: 8px;
  min-width: 8px;
  margin-left: 0.5rem;
  margin-right: 0rem;
  margin-top: 5px;

  border-radius: 50%;
  position: relative;
  background-color: ${({ theme }) => theme.green1};
`
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  animation: ${rotate360} 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  transform: translateZ(0);

  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 2px solid ${({ theme }) => theme.green1};
  background: transparent;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: relative;

  left: -3px;
  top: -3px;
`

interface NextBlockP {
  block: any
}

export default function NextBlock({ block }: NextBlockP) {
  const footerStyles = { fontSize: "14px", marginLeft: "0.5rem", marginRight: "0.5rem" }

  const [isMounted, setIsMounted] = useState(true)

  useEffect(
    () => {
      const timer1 = setTimeout(() => setIsMounted(true), 500)

      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        setIsMounted(false)
        clearTimeout(timer1)
      }
    },
    [block] //useEffect will run only one time
    //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  )

  return block ? (
    <LightGreyCardDark key={"card-block-tools2"} style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
      <Row justify="center" style={{ width: "100%" }}>
        <RowBetween align="center">
          <StyledPolling>
            <TYPE.small style={{ fontSize: "14px", opacity: isMounted ? "0.9" : "0.7" }}>nextBlock# </TYPE.small>
            <StyledPollingDot>{!isMounted && <Spinner />}</StyledPollingDot>
            <ExternalLink style={footerStyles} href={"https://etherscan.io/block/" + (block.blockNumber + 1)}>
              <TYPE.link style={{ opacity: isMounted ? "0.9" : "0.7" }}>{block.blockNumber + 1}</TYPE.link>
            </ExternalLink>
          </StyledPolling>
        </RowBetween>
      </Row>
    </LightGreyCardDark>
  ) : (
    <></>
  )
}
