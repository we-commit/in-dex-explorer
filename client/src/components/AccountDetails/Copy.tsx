import React from "react"
import styled from "styled-components/macro"
import useCopyClipboard from "../../hooks/useCopyClipboard"

import { LinkStyledButton } from "../../theme"
import { CheckCircle, Copy } from "react-feather"

const CopyIcon = styled(LinkStyledButton)`
  position: relative;
  border: none;
  background-color: ${({ theme }) => theme.bg2};
  margin: 0.5rem;
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
    stroke: ${({ theme }) => theme.blue1};
  }
`
const TransactionStatusText = styled.span`
  margin-left: 0.25rem;
  font-size: 0.825rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`

export default function CopyHelper(props: { toCopy: string; children?: React.ReactNode }) {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <CopyIcon onClick={() => setCopied(props.toCopy)}>
      {isCopied ? (
        <TransactionStatusText>
          <CheckCircle size={"18"} />
          <TransactionStatusText>Copied</TransactionStatusText>
        </TransactionStatusText>
      ) : (
        <TransactionStatusText>
          <Copy size={"18"} />
        </TransactionStatusText>
      )}
      {isCopied ? "" : props.children}
    </CopyIcon>
  )
}
