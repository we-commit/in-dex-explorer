import React from "react"

import useScrollPosition from "@react-hook/window-scroll"
import { NavLink } from "react-router-dom"
import { darken } from "polished"
import { Moon, Sun } from "react-feather"
import styled from "styled-components/macro"

import Logo from "../../assets/svg/logo.svg"
import LogoDark from "../../assets/svg/logo_white.svg"

import { useDarkModeManager } from "../../state/user/hooks"

import { ETHER } from "@uniswap/sdk-core"

import Row, { RowFixed } from "../Row"
import useUSDCPrice from "hooks/useUSDCPrice"
import { SmallOnly } from "theme"
import { formatPrice } from "utils/formatTokenAmount"
import { useTrojanBlockState } from "state/trojanBlocks/hooks"
import { MouseoverTooltip } from "components/Tooltip"

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;

  /* Background slide effect on scroll. */
  background-image: ${({ theme }) => `linear-gradient(to bottom, transparent 50%, ${theme.bg0} 50% )}}`};
  background-position: ${({ showBackground }) => (showBackground ? "0 -100%" : "0 0")};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px ${({ theme, showBackground }) => (showBackground ? theme.bg2 : "transparent;")};
  transition: background-position 0.1s, box-shadow 0.1s;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding:  1rem;
    grid-template-columns: 2rem 1fr  ;

  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const HeaderRowLinksFull = styled(RowFixed)`
  justify-self: center;
  width: max-content;
  display: flex;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const HeaderLinks = styled(Row)`
  justify-self: center;
  background-color: ${({ theme }) => theme.bg0};
  width: fit-content;
  margin-right: 12px;
  padding: 4px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: flex-end;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display:none;
  `};
`

const activeClassName = "ACTIVE"

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
  padding: 8px 8px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg2};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const StyledNavPrice = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  outline: none;
  text-decoration: none;
  font-size: 1rem;
  width: max-content;
  padding: 8px 8px;
  overflow: visible;

  border-radius: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text2};
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg2};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

export default function Header() {
  const [darkMode, toggleDarkMode] = useDarkModeManager()
  const scrollY = useScrollPosition()
  const { block } = useTrojanBlockState()
  const priceUSD = useUSDCPrice(ETHER)
  const REACT_APP_APP_IS_OFFLINE: string = process.env.REACT_APP_APP_IS_OFFLINE || "false"

  return (
    <HeaderFrame showBackground={scrollY > 45}>
      <HeaderRow>
        <Title href=".">
          <UniIcon>
            <img width={"40px"} src={darkMode ? LogoDark : Logo} alt="logo" />
          </UniIcon>
        </Title>
      </HeaderRow>

      <HeaderRowLinksFull>
        <HeaderLinks>
          <StyledNavLink id={`explorer-nav-link`} to={"/explorer"}>
            {REACT_APP_APP_IS_OFFLINE === "true" ? "Offline" : "Explorer"}
          </StyledNavLink>
        </HeaderLinks>
      </HeaderRowLinksFull>

      <HeaderControls>
        {priceUSD && block && (
          <HeaderElementWrap>
            <HeaderLinks>
              <MouseoverTooltip
                text={
                  "Fastest: " +
                  block.responseDataGas.fastest / 10 +
                  " Gwei | Average: " +
                  block.responseDataGas.average / 10 +
                  " Gwei"
                }
              >
                <StyledNavPrice>
                  {"Eth: " + formatPrice(priceUSD, 6) + " | Gas " + block.responseDataGas.fastest / 10 + " Gwei"}
                </StyledNavPrice>
              </MouseoverTooltip>
            </HeaderLinks>
          </HeaderElementWrap>
        )}
        {priceUSD && block && (
          <HeaderElementWrap>
            <SmallOnly>
              <StyledNavPrice>
                {"Eth: " + formatPrice(priceUSD, 6) + " | Gas " + block.responseDataGas.fastest / 10 + " Gwei"}
              </StyledNavPrice>
            </SmallOnly>
          </HeaderElementWrap>
        )}

        <HeaderElementWrap>
          <StyledMenuButton onClick={() => toggleDarkMode()}>
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </StyledMenuButton>
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  )
}
