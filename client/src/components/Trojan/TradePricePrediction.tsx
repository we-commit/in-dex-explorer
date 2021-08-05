import React from "react"
import { useContext, useState } from "react"
import { Repeat } from "react-feather"
import { Text } from "rebass"
import { ThemeContext } from "styled-components"
import styled from "styled-components"

const StyledBalanceMaxMini = styled.button`
  height: 22px;
  width: 22px;
  background-color: ${({ theme }) => theme.bg2};
  border: none;
  border-radius: 50%;
  padding: 0.2rem;
  font-size: 0.875rem;
  font-weight: 400;
  margin-left: 0.4rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text2};
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;

  :hover {
    background-color: ${({ theme }) => theme.bg3};
  }
  :focus {
    background-color: ${({ theme }) => theme.bg3};
    outline: none;
  }
`

interface TradePricePredictionProps {
  formattedPriceFrom: string
  formattedPriceTo: string
  label: string
  labelInverted: string
}

export default function TradePricePrediction({
  formattedPriceFrom,
  formattedPriceTo,
  label,
  labelInverted,
}: TradePricePredictionProps) {
  const [showInverted, setShowInverted] = useState<boolean>(false)

  const theme = useContext(ThemeContext)

  const formattedPrice = showInverted ? formattedPriceFrom : formattedPriceTo
  const labelFormatted = showInverted ? label : labelInverted

  return (
    <Text
      fontWeight={500}
      fontSize={14}
      color={theme.text1}
      style={{ justifyContent: "center", alignItems: "center", display: "flex" }}
    >
      {formattedPrice ?? "-"} {labelFormatted}
      <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
        <Repeat size={14} />
      </StyledBalanceMaxMini>
    </Text>
  )
}
