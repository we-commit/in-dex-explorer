import React from "react"
import styled from "styled-components"
import { TYPE, ExternalLink } from "../../theme"
import { RowFixed } from "../Row"
import useScrollPosition from "@react-hook/window-scroll"

const HeaderRowT = styled(RowFixed)`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translate(-50%);
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `};
`

export default function Polling() {
  const footerStyles = { marginLeft: "0.5rem", marginRight: "0.5rem" }
  const scrollY = useScrollPosition()
  if (scrollY <= 45)
    return (
      <HeaderRowT>
        <ExternalLink style={footerStyles} href={"https://discord.com/invite/offshore"}>
          <TYPE.small>Discord</TYPE.small>
        </ExternalLink>
        <ExternalLink style={footerStyles} href={"https://twitter.com/offshoredao"}>
          <TYPE.small>Twitter</TYPE.small>
        </ExternalLink>
        <ExternalLink style={footerStyles} href={"https://github.com/we-commit"}>
          <TYPE.small>Github</TYPE.small>
        </ExternalLink>
      </HeaderRowT>
    )
  else {
    return <></>
  }
}
