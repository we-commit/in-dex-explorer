import React, { HTMLProps, useCallback } from "react"
import ReactGA from "react-ga"
import { Link } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { darken } from "polished"
import { ArrowLeft, X, ExternalLink as LinkIconFeather, Trash } from "react-feather"

export const ButtonText = styled.button`
  outline: none;
  border: none;
  font-size: inherit;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }

  :focus {
    text-decoration: underline;
  }
`

export const Button = styled.button.attrs<{ warning: boolean }, { backgroundColor: string }>(({ warning, theme }) => ({
  backgroundColor: warning ? theme.red1 : theme.primary1,
}))`
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 3rem;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ theme }) => theme.white};
  width: 100%;

  :hover,
  :focus {
    background-color: ${({ backgroundColor }) => darken(0.05, backgroundColor)};
  }

  :active {
    background-color: ${({ backgroundColor }) => darken(0.1, backgroundColor)};
  }

  :disabled {
    background-color: ${({ theme }) => theme.bg1};
    color: ${({ theme }) => theme.text4};
    cursor: auto;
  }
`

export const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
`

// for wrapper react feather icons
export const IconWrapper = styled.div<{ stroke?: string; size?: string; marginRight?: string; marginLeft?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size ?? "20px"};
  height: ${({ size }) => size ?? "20px"};
  margin-right: ${({ marginRight }) => marginRight ?? 0};
  margin-left: ${({ marginLeft }) => marginLeft ?? 0};
  & > * {
    stroke: ${({ theme, stroke }) => stroke ?? theme.text2};
  }
`

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.primary1)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : "underline")};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : "underline")};
  }

  :active {
    text-decoration: none;
  }
`

// An internal link from the react-router-dom library that is correctly styled
export const StyledInternalLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

const LinkIconWrapper = styled.a`
  text-decoration: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    text-decoration: none;
    opacity: 0.7;
  }

  :focus {
    outline: none;
    text-decoration: none;
  }

  :active {
    text-decoration: none;
  }
`

export const LinkIcon = styled(LinkIconFeather)`
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.blue1};
`

export const TrashIcon = styled(Trash)`
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.text3};

  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    opacity: 0.7;
  }
`

const rotateImg = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`

export const UniTokenAnimated = styled.img`
  animation: ${rotateImg} 5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  padding: 2rem 0 0 0;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
`

/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLink({
  target = "_blank",
  href,
  rel = "noopener noreferrer",
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, "as" | "ref" | "onClick"> & { href: string }) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // don't prevent default, don't redirect if it's a new tab
      if (target === "_blank" || event.ctrlKey || event.metaKey) {
        ReactGA.outboundLink({ label: href }, () => {
          console.debug("Fired outbound link event", href)
        })
      } else {
        event.preventDefault()
        // send a ReactGA event and then trigger a location change
        ReactGA.outboundLink({ label: href }, () => {
          window.location.href = href
        })
      }
    },
    [href, target]
  )
  return <StyledLink target={target} rel={rel} href={href} onClick={handleClick} {...rest} />
}

export function ExternalLinkIcon({
  target = "_blank",
  href,
  rel = "noopener noreferrer",
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, "as" | "ref" | "onClick"> & { href: string }) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // don't prevent default, don't redirect if it's a new tab
      if (target === "_blank" || event.ctrlKey || event.metaKey) {
        ReactGA.outboundLink({ label: href }, () => {
          console.debug("Fired outbound link event", href)
        })
      } else {
        event.preventDefault()
        // send a ReactGA event and then trigger a location change
        ReactGA.outboundLink({ label: href }, () => {
          window.location.href = href
        })
      }
    },
    [href, target]
  )
  return (
    <LinkIconWrapper target={target} rel={rel} href={href} onClick={handleClick} {...rest}>
      <LinkIcon />
    </LinkIconWrapper>
  )
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.img`
  animation: 2s ${rotate} linear infinite;
  width: 16px;
  height: 16px;
`

const BackArrowLink = styled(StyledInternalLink)`
  color: ${({ theme }) => theme.text1};
`
export function BackArrow({ to }: { to: string }) {
  return (
    <BackArrowLink to={to}>
      <ArrowLeft />
    </BackArrowLink>
  )
}

export const CustomLightSpinner = styled(Spinner)<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

export const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

export const HideExtraSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

export const SmallOnly = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: block;
  `};
`

export const ExtraSmallOnly = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: block;
  `};
`
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/
/* <EDITED></EDITED>*/

export const StyledFilterButtonHeader = styled.button<{ active?: boolean }>`
  border: none;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg2};
  margin-right: 8px;
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

export const StyledFilterButton = styled.button<{ active?: boolean }>`
  border-radius: 25px;
  border: 0.5px solid ${({ theme }) => theme.bg3};
  padding: 0.6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0.2rem;
  background-color: ${({ theme }) => theme.bg1};

  text-decoration: none;
  cursor: pointer;
  font-weight: 500;

  color: ${({ theme }) => theme.text1};
  color: ${({ theme, active }) => (active ? theme.secondary1 : theme.text1)};

  :hover {
    color: ${({ theme }) => theme.secondary1};
  }

  :focus {
    color: ${({ theme }) => theme.secondary1};
  }

  :active {
    color: ${({ theme }) => theme.secondary1};
  }
`

export const FakeBtn = styled.div`
  border-radius: 25px;
  padding: 0.6rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin: 0.2rem;

  border: 0.5px solid ${({ theme }) => theme.text4};
  text-decoration: none;
  cursor: none;
  color: ${({ theme }) => theme.text4};
  font-weight: 500;
  font-size: 14px;

  :hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.text4};
  }

  :focus {
    outline: none;
    text-decoration: underline;
    color: ${({ theme }) => theme.text4};
  }

  :active {
    text-decoration: none;
    color: ${({ theme }) => theme.text4};
  }
`

const StyleLinkBlue = styled.a`
  border-radius: 25px;
  padding: 0.6rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin: 0.2rem;

  border: 0.5px solid ${({ theme }) => theme.blue1};
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.blue1};
  font-weight: 500;
  font-size: 14px;
  :hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.blue1};
  }

  :focus {
    outline: none;
    text-decoration: underline;
    color: ${({ theme }) => theme.blue1};
  }

  :active {
    text-decoration: none;
    color: ${({ theme }) => theme.blue1};
  }
`

const StyleLinkWhite = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text1};
  font-weight: 500;
  font-size: 14px;

  :hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.text1};
  }

  :focus {
    outline: none;
    text-decoration: underline;
    color: ${({ theme }) => theme.text1};
  }

  :active {
    text-decoration: none;
    color: ${({ theme }) => theme.text1};
  }
`

const StyledLinkGray = styled.a`
  border-radius: 25px;
  padding: 0.6rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin: 0.2rem;
  background-color: ${({ theme }) => theme.bg1};

  border: 0.5px solid ${({ theme }) => theme.text3};
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text3};
  font-weight: 500;
  font-size: 14px;

  :hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.text3};
  }

  :focus {
    outline: none;
    text-decoration: underline;
    color: ${({ theme }) => theme.text3};
  }

  :active {
    text-decoration: none;
    color: ${({ theme }) => theme.text3};
  }

  ${({ theme }) => theme.mediaWidth.upToLarge`
  display: none;
`};
`

const StyledLinkGreen = styled.a`
  border-radius: 25px;
  padding: 0.6rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin: 0.2rem;

  border: 0.5px solid ${({ theme }) => theme.green1};
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.green1};
  font-weight: 500;
  font-size: 14px;

  :hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.green1};
  }

  :focus {
    outline: none;
    text-decoration: underline;
    color: ${({ theme }) => theme.green1};
  }

  :active {
    text-decoration: none;
    color: ${({ theme }) => theme.green1};
  }
`

const StyledLinkRed = styled.a`
  border-radius: 25px;
  padding: 0.6rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin: 0.2rem;
  border: 0.5px solid ${({ theme }) => theme.red1};
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.red1};
  font-weight: 500;
  font-size: 14px;

  :hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.red1};
  }

  :focus {
    outline: none;
    text-decoration: underline;
    color: ${({ theme }) => theme.red1};
  }

  :active {
    text-decoration: none;
    color: ${({ theme }) => theme.red1};
  }
`

/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLinkColor({
  target = "_blank",
  href,
  color,
  rel = "noopener noreferrer",
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, "as" | "ref" | "onClick"> & { href: string }) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // don't prevent default, don't redirect if it's a new tab
      if (target === "_blank" || event.ctrlKey || event.metaKey) {
        ReactGA.outboundLink({ label: href }, () => {
          console.debug("Fired outbound link event", href)
        })
      } else {
        event.preventDefault()
        // send a ReactGA event and then trigger a location change
        ReactGA.outboundLink({ label: href }, () => {
          window.location.href = href
        })
      }
    },
    [href, target]
  )
  if (color === "blue") return <StyleLinkBlue target={target} rel={rel} href={href} onClick={handleClick} {...rest} />
  if (color === "white") return <StyleLinkWhite target={target} rel={rel} href={href} onClick={handleClick} {...rest} />
  if (color === "gray") return <StyledLinkGray target={target} rel={rel} href={href} onClick={handleClick} {...rest} />
  else if (color === "green")
    return <StyledLinkGreen target={target} rel={rel} href={href} onClick={handleClick} {...rest} />
  else return <StyledLinkRed target={target} rel={rel} href={href} onClick={handleClick} {...rest} />
}
