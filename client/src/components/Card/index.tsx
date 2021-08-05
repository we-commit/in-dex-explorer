import styled from "styled-components/macro"
import { Box } from "rebass/styled-components"

const Card = styled(Box)<{ width?: string; padding?: string; border?: string; borderRadius?: string }>`
  width: ${({ width }) => width ?? "100%"};
  border-radius: 16px;
  padding: 1rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`
export default Card

export const LightCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`
export const TradeDetailShow = styled.div<{ show: boolean }>`
  border: 1px solid ${({ theme }) => theme.bg1};
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 16px;
  padding: 0.5rem;
  display: ${({ show }) => (show ? "block" : "none")};
  z-index: ${({ show }) => (show ? 1 : -1)};
`

export const LightGreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg2};
  padding: 0.5rem 1rem;
`
export const LightGreyCardDark = styled(Card)`
  background-color: ${({ theme }) => theme.bg1};
  padding: 0.5rem 1rem;
`
export const LightGreyCardWhite = styled(Card)`
  border: 1px solid ${({ theme }) => theme.text5};
  background-color: ${({ theme }) => theme.bg1};
  padding: 0.5rem 1rem;
`

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg3};
`

export const DarkGreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg2};
`

export const DarkCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg0};
`

export const OutlineCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.bg3};
`

export const YellowCard = styled(Card)`
  background-color: rgba(243, 132, 30, 0.05);
  color: ${({ theme }) => theme.yellow3};
  font-weight: 500;
`

export const PinkCard = styled(Card)`
  background-color: rgba(255, 0, 122, 0.03);
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
`

export const BlueCard = styled(Card)`
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.blue2};
  border-radius: 12px;
`

/* TODO: Fix This, to bottom */
/* TODO: Fix This, to bottom */
/* TODO: Fix This, to bottom */
/* TODO: Fix This, to bottom */
/* TODO: Fix This, to bottom */
/* TODO: Fix This, to bottom */
export const OutlineCard99 = styled(Card)`
  border: 1px solid;
  border-color: #5aea98;
  margin: 0.2rem;
`

export const OutlineCard95 = styled(Card)`
  border: 1px solid;
  border-color: #5dea5a;
  margin: 0.2rem;
`

export const OutlineCard90 = styled(Card)`
  border: 1px solid;
  border-color: #bcea5a;
  margin: 0.2rem;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: none;
  `};
`

export const OutlineCard80 = styled(Card)`
  border: 1px solid;
  border-color: #ffe600;
  margin: 0.2rem;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: none;
  `};
`

export const OutlineCard70 = styled(Card)`
  border: 1px solid;
  border-color: #eab05a;
  margin: 0.2rem;
`

export const OutlineCardM = styled(Card)`
  border: 0.5px solid ${({ theme }) => theme.text3};
  padding: 0.6rem;
  padding-left: 1rem;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: none;
  `};
`

export const OutlineCardWithe = styled(Card)`
  border: 0.5px solid ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.advancedBG};
`

export const OutlineCardCurrencyButtons = styled(Card)`
  border: 0.5px solid ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.advancedBG};
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
`

export const OutlineCardInner = styled(Card)`
  border: 0.5px solid ${({ theme }) => theme.text3};
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
`
