import React, { Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import styled from "styled-components"
import GoogleAnalyticsReporter from "../components/analytics/GoogleAnalyticsReporter"
import Header from "../components/Header"
import Polling from "../components/Header/Polling"
// import URLWarning from '../components/Header/URLWarning'
import Popups from "../components/Popups"
import Web3ReactManager from "../components/Web3ReactManager"
import DarkModeQueryParamReader from "../theme/DarkModeQueryParamReader"

import Explorer from "./Explorer"

import { RedirectPathToTrojanOnly } from "./Explorer/redirects"
import { SocketContext, socket } from "./context/socket"

import { ThemedBackground } from "../theme"
import Maintenance from "./Maintenance"

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 4rem;
  align-items: center;
  flex: 1;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding-top: 6rem;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  const REACT_APP_APP_IS_OFFLINE: string = process.env.REACT_APP_APP_IS_OFFLINE || "false"
  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <SocketContext.Provider value={socket}>
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <ThemedBackground />
            <Popups />
            <Web3ReactManager>
              <Switch>
                {REACT_APP_APP_IS_OFFLINE === "true" ? (
                  <Route exact strict path="/explorer" component={Maintenance} />
                ) : (
                  <Route exact strict path="/explorer" component={Explorer} />
                )}

                <Route component={RedirectPathToTrojanOnly} />
              </Switch>
            </Web3ReactManager>
            <Marginer />
          </BodyWrapper>
        </AppWrapper>
      </SocketContext.Provider>
      <Polling />
    </Suspense>
  )
}
