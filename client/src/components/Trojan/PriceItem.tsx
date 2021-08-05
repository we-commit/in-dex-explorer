import { Currency } from "@uniswap/sdk-core"
import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { useBlockNumber } from "../../state/application/hooks"
import { Text } from "rebass/styled-components"
import useTheme from "hooks/useTheme"
import useUSDCPrice from "hooks/useUSDCPrice"
import { formatPrice } from "utils/formatTokenAmount"

const StyledPollingDot = styled.div`
  width: 8px;
  height: 8px;
  min-height: 8px;
  min-width: 8px;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 0.5rem;
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

interface PriceItemDetailProps {
  currency?: Currency
}

const StyledPolling = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  color: white;
  transition: opacity 0.25s ease;
  color: ${({ theme }) => theme.green1};
  :hover {
    opacity: 1;
  }
`
export default function PriceItem({ currency = undefined }: PriceItemDetailProps) {
  const priceUSD = useUSDCPrice(currency || undefined)
  const blockNumber = useBlockNumber()
  const [isMounted, setIsMounted] = useState(true)
  const theme = useTheme()

  useEffect(() => {
    if (priceUSD && currency) {
      document.title = currency.symbol + " $" + priceUSD?.toSignificant(4) + " | Trojan.Finance"
    } else {
      document.title = "Trojan.Finance"
    }
  }, [priceUSD, currency])

  useEffect(
    () => {
      const timer1 = setTimeout(() => setIsMounted(true), 1000)

      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        setIsMounted(false)
        clearTimeout(timer1)
      }
    },
    [blockNumber] //useEffect will run only one time
    //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  )

  return (
    <>
      <StyledPolling>
        <Text style={{ opacity: isMounted ? "0.9" : "0.7" }} color={theme.text1}>
          {currency && (
            <>
              1 {currency.symbol + " : $"} {formatPrice(priceUSD, 4)}
            </>
          )}
        </Text>
        <StyledPollingDot>{!isMounted && <Spinner />}</StyledPollingDot>
      </StyledPolling>
    </>
  )
}
