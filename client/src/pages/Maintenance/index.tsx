import React from "react"
import { Row, Col, Grid } from "react-styled-flexboxgrid"
import { Text } from "rebass/styled-components"
import { ExternalLink } from "theme"
import LogoDark from "assets/svg/logo_white.svg"
import { DataCard, CardSection } from "components/Common/styled"
import { AutoColumn } from "components/Column"
import { UniIcon } from "../styled"

export default function Maintenance({}) {
  return (
    <>
      <Grid
        style={{
          paddingRight: "0.8rem",
          paddingLeft: "0.8rem",
          paddingTop: "0.5rem",
          width: "100%",
        }}
      >
        <Row center="xs">
          <Col xs={12} sm={12} md={4} lg={4}></Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <Row center="xs">
              <Text textAlign="center" style={{ padding: "0rem" }}>
                <DataCard>
                  <CardSection>
                    <AutoColumn gap="md">
                      <Text fontWeight={500} fontSize={16}>
                        {"Trojan is currently under maintenance -- It'll be back shortly."}
                      </Text>
                      <UniIcon>
                        <img width={"30%"} src={LogoDark} alt="logo" />
                      </UniIcon>
                      <Text fontWeight={400} fontSize={14}>
                        Trojan is part of the Offshore DAO 🏝
                      </Text>
                      <ExternalLink href={"https://discord.com/invite/offshore"}>[Discord]</ExternalLink>
                    </AutoColumn>
                  </CardSection>
                </DataCard>
              </Text>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}></Col>
        </Row>
      </Grid>
    </>
  )
}
