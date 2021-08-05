import React from "react"
import styled from "styled-components"
import { TYPE, ExternalLink } from "../../theme"
import { Zap } from "react-feather"

const StyledPolling = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 0rem;
  right: 0rem;
  padding: 1rem;
  color: white;
  transition: opacity 0.25s ease;
  color: ${({ theme }) => theme.green1};
  :hover {
    opacity: 1;
  }

  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: none;
  `}
`
export default function FooterPooling() {
  const footerStyles = { marginLeft: "0.5rem", marginRight: "0.5rem", fontSize: "11px" }

  return (
    <StyledPolling>
      <ExternalLink style={footerStyles} href={"https://www.blocknative.com/"}>
        <TYPE.blue>
          <Zap size={11} /> Powered by Blocknative
        </TYPE.blue>
      </ExternalLink>
    </StyledPolling>
  )
}
