import React from "react"
import styled from "styled-components"
import { ExternalLink, TYPE } from "theme"
import Card from "components/Card"
import { AutoColumn } from "components/Column"
import { AlertTriangle } from "react-feather"
import { transparentize } from "polished"
import useTheme from "hooks/useTheme"
import { ButtonPrimary } from "components/Button"
import { SectionBreak } from "components/swap/styleds"
import { PaddedColumn } from "./styleds"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
`

interface CustomAlertProps {
  alertHeader: string
  alertText: string
  alertTitle: string
  alertBody: string
  buttonText: string
  links: Array<string>
  onConfirm: () => void
}

export function CustomAlert({
  alertHeader,
  alertTitle,
  alertText,
  alertBody,
  buttonText,
  links,
  onConfirm,
}: CustomAlertProps) {
  const theme = useTheme()

  return (
    <Wrapper>
      <PaddedColumn gap="14px" style={{ textAlign: "center", width: "100%", flex: "1 1" }}>
        <AutoColumn justify="center" style={{ textAlign: "center" }}>
          <TYPE.mediumHeader>{alertHeader}</TYPE.mediumHeader>
        </AutoColumn>
      </PaddedColumn>
      <SectionBreak />
      <PaddedColumn gap="md">
        <Card style={{ backgroundColor: transparentize(0.8, theme.yellow2) }}>
          <AutoColumn justify="center" style={{ textAlign: "center", gap: "16px", marginBottom: "12px" }}>
            <AlertTriangle stroke={theme.yellow2} size={32} />
            <TYPE.body fontWeight={600} fontSize={20} color={theme.yellow2}>
              {alertTitle}
            </TYPE.body>
          </AutoColumn>
          <AutoColumn style={{ textAlign: "center", gap: "16px", marginBottom: "12px" }}>
            <TYPE.body fontWeight={400} color={theme.yellow2}>
              {alertText}
            </TYPE.body>
            <TYPE.body fontWeight={600} color={theme.yellow2}>
              {alertBody}
            </TYPE.body>
            {links.length > 0 && (
              <ExternalLink href={links[0]} target="_blank">
                <TYPE.small>{links[0]}</TYPE.small>
              </ExternalLink>
            )}
          </AutoColumn>
        </Card>

        <ButtonPrimary
          altDisabledStyle={true}
          borderRadius="20px"
          padding="10px 1rem"
          onClick={() => {
            onConfirm()
          }}
          className=".token-dismiss-button"
        >
          {buttonText}
        </ButtonPrimary>
      </PaddedColumn>
    </Wrapper>
  )
}
