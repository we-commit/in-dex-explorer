import React, { useState, useCallback, useEffect, useMemo, useContext } from "react"
import { ThemeContext } from "styled-components"
import { Row, Col, Grid } from "react-styled-flexboxgrid"
import { Text } from "rebass/styled-components"
import { ExternalLink, StyledFilterButton } from "theme"
import { RouteComponentProps } from "react-router-dom"
import { Token } from "@uniswap/sdk-core"
import LogoDark from "assets/svg/logo_white.svg"
import UniLogo from "assets/svg/uni-logo.svg"
import SushiLogo from "assets/svg/sushi-logo.svg"
import InchLogo from "assets/svg/1inch-logo.svg"
import CurrencyLogo from "components/CurrencyLogo"
import CurrencySearchModal from "components/SearchModal/CurrencySearchModal"
import TokenWarningModal from "components/TokenWarningModal"
import ToolsCurrency from "components/Trojan/ToolsCurrency"
import ToolsBlock from "components/Trojan/ToolsBlock"
import CurrentBlock from "components/Trojan/CurrentBlock"
import NextBlock from "components/Trojan/NextBlock"
import PriceItem from "components/Trojan/PriceItem"
import TradeItem from "components/Trojan/TradeItem"
import TradeItemMulticall from "components/Trojan/TradeItemMulticall"
import TradeItem1Inch from "components/Trojan/TradeItem1Inch"
import Emoji from "components/Trojan/Emoji"
import useCopyClipboard from "hooks/useCopyClipboard"
import { LoadingViewClear } from "components/ModalViews"
import { ButtonDropdownGrey } from "components/Button"
import { DataCard, CardSection } from "components/Common/styled"
import { AutoColumn } from "components/Column"
import { currencyId } from "utils/currencyId"
import { RefreshCcw, Copy, CheckCircle } from "react-feather"
import { useAllTokens, useCurrency } from "hooks/Tokens"
import { Wrapper, UniIcon, ButtonRefrash, ButtonRefrashPad } from "../styled"
import { SocketContext } from "../context/socket"
import { ITransaction } from "types/trojan/tx-model"
import { useTrojanBlockActionHandlers, useTrojanBlockState } from "state/trojanBlocks/hooks"
import {
  isTransactionRecent,
  newTransactionsFirst,
  useDefaultsFromURLSearch,
  useAllPendingTrojanTxs,
  useAllConfirmedTrojanTxs,
  useTrojanTxsActions,
  useDerivedTrojanTxsInfo,
  useTrojanTxsState,
} from "state/trojanTxs/hooks"

const defaultSpaces = {
  isV2: true,
  isV3: true,
  isV2Sushi: true,
  is_1inch: true,
}

export default function Explorer({ history }: RouteComponentProps) {
  // Socket Context for Mempool Scanner
  const socket = useContext(SocketContext)
  const theme = useContext(ThemeContext)

  const {
    onPendingTxRemoved,
    onPendingTxAdded,
    onConfirmedTxAdded,
    onLoadPendings,
    onLoadConfirmeds,
    onCurrencySelection,
    onClearStateTx,
  } = useTrojanTxsActions()

  const { onSetBlock } = useTrojanBlockActionHandlers()
  const { block } = useTrojanBlockState()
  const [isCopied, setCopied] = useCopyClipboard()

  const [pageLink, setPageLink] = useState<string>(window.location.origin + "/#")
  const [dexSpaces, setDexSpaces] = useState<any>(defaultSpaces)

  const loadedUrlParams = useDefaultsFromURLSearch()
  const [loadedInputCurrency] = [useCurrency(loadedUrlParams?.inputCurrencyId)]

  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)

  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency]
  )

  // Pendings
  const allPendingTxs = useAllPendingTrojanTxs()
  const sortedPendingTransactions = useMemo(() => {
    const txs = Object.values(allPendingTxs)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allPendingTxs])

  // Confirmed
  const allConfirmedTxs = useAllConfirmedTrojanTxs()
  const sortedConfirmedTransactions = useMemo(() => {
    const txs = Object.values(allConfirmedTxs)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allConfirmedTxs])

  /***
   *  selectedCurrencyId from state
   */
  const { selectedCurrencyId } = useTrojanTxsState()
  const { currency } = useDerivedTrojanTxsInfo()

  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !Boolean(token.address in defaultTokens)
    })

  // reset if they close warning without tokens in params
  const handleDismissTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
    history.push("/explorer/")
  }, [history])

  useEffect(() => {
    if (dexSpaces !== {}) {
      socket.emit("join_to_address", { address: selectedCurrencyId, dexSpaces })
      onClearStateTx()
    }
  }, [socket, selectedCurrencyId, dexSpaces, onClearStateTx])

  // every time user change currency on modal
  const handleInputSelect = useCallback(
    (inputCurrency) => {
      const c = currencyId(inputCurrency)
      if (c !== "ETH") {
        setPageLink(window.location.origin + "/#/explorer?inputCurrency=" + c)
        onCurrencySelection(c)
      }
    },
    [onCurrencySelection]
  )

  /***
   *  Never Load ETH as currency selected
   * */
  useEffect(() => {
    if (loadedInputCurrency) {
      handleInputSelect(loadedInputCurrency)
    }
  }, [loadedInputCurrency, handleInputSelect])

  /***
   * Currency Modal Search and selected
   * */
  const [showSearch, setShowSearch] = useState<boolean>(false)

  const clearTxHandler = (tx: ITransaction) => {
    onPendingTxRemoved(tx)
  }

  useEffect(() => {
    document.title = "Trojan.Finance"
  }, [])

  useEffect(() => {
    socket.on("confirmed_txs", (txs: Array<ITransaction>) => {
      onLoadConfirmeds(txs)
    })
    socket.on("pending_txs", (txs: Array<ITransaction>) => {
      onLoadPendings(txs)
    })
    socket.on("insert_pending_tx", (tx: ITransaction) => {
      onPendingTxAdded(tx)
    })
    socket.on("insert_confirmed_tx", (tx: ITransaction) => {
      onConfirmedTxAdded(tx)
    })
    socket.on("delete_pending_tx", (tx: ITransaction) => {
      onPendingTxRemoved(tx)
    })
  }, [onConfirmedTxAdded, onLoadConfirmeds, onPendingTxAdded, onLoadPendings, onPendingTxRemoved, socket])

  useEffect(() => {
    socket.emit("join_to_blocks")
    socket.on("last_block", (b: any) => {
      onSetBlock(b)
    })
    socket.on("new_block", (b: any) => {
      onSetBlock(b)
    })
  }, [socket, onSetBlock])

  // handlers for currency modal search dismiss
  const handleSearchDismiss = useCallback(() => {
    setShowSearch(false)
  }, [setShowSearch])

  return (
    <>
      <TokenWarningModal
        isOpen={importTokensNotInDefault.length > 0 && !dismissTokenWarning}
        tokens={importTokensNotInDefault}
        onConfirm={handleConfirmTokenWarning}
        onDismiss={handleDismissTokenWarning}
      />
      <CurrencySearchModal
        isOpen={showSearch}
        onCurrencySelect={handleInputSelect}
        onDismiss={handleSearchDismiss}
        showCommonBases={false}
        selectedCurrency={currency}
      />
      <Grid
        style={{
          paddingRight: "0.8rem",
          paddingLeft: "0.8rem",
          paddingTop: "0.5rem",
          width: "100%",
        }}
      >
        <Row center="xs">
          <Col xs={12} sm={12} md={4} lg={4}>
            <Row center="xs" style={{ paddingTop: "0.5rem" }}>
              <StyledFilterButton style={{ textAlign: "center", textTransform: "none" }}>
                {sortedPendingTransactions.length} {"Mempool Pending TXs "}
                <Emoji symbol="🔮" />
              </StyledFilterButton>

              {sortedPendingTransactions.length === 0 && <LoadingViewClear txt={"Scanning Pending TXs"} />}

              {currency && (
                <Wrapper
                  style={{
                    direction: "rtl",
                    marginTop: "1rem",
                  }}
                >
                  {sortedPendingTransactions.map((tx) => {
                    if (tx.isV2_1Inch || tx.isV3_1Inch) {
                      return (
                        <TradeItem1Inch
                          key={tx.hash}
                          tx={tx}
                          currency={currency}
                          initOpen={true}
                          clearTxHandler={clearTxHandler}
                        ></TradeItem1Inch>
                      )
                    } else if (tx.mempoolData.txMethod === "multicall") {
                      return (
                        <TradeItemMulticall
                          key={tx.hash}
                          tx={tx}
                          currency={currency}
                          initOpen={true}
                          clearTxHandler={clearTxHandler}
                        ></TradeItemMulticall>
                      )
                    } else
                      return (
                        <TradeItem
                          key={tx.hash}
                          tx={tx}
                          currency={currency}
                          initOpen={true}
                          clearTxHandler={clearTxHandler}
                        ></TradeItem>
                      )
                  })}
                </Wrapper>
              )}
            </Row>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <Row center="xs">
              <ButtonDropdownGrey
                onClick={() => {
                  setShowSearch(true)
                }}
                width={"100%"}
                marginTop="0.35rem"
                marginBottom="0.35rem"
              >
                {currency ? (
                  <Row>
                    <CurrencyLogo currency={currency} />
                    <Text fontWeight={500} fontSize={18} marginLeft={"12px"}>
                      {currency && <PriceItem currency={currency} />}
                    </Text>
                  </Row>
                ) : (
                  <Text fontWeight={500} fontSize={18} marginLeft={"12px"}>
                    Select Token to listen
                  </Text>
                )}
              </ButtonDropdownGrey>
            </Row>
            <Row center="xs">
              <ButtonRefrash
                onClick={() => {
                  setDexSpaces({ ...dexSpaces, isV2: dexSpaces.isV2 === true ? false : true })
                }}
              >
                <Text fontWeight={500} fontSize={16} color={dexSpaces.isV2 ? theme.green1 : theme.text3}>
                  <UniIcon>
                    <img width={"40px"} src={UniLogo} alt="logo" />
                  </UniIcon>
                  {"V2"}
                </Text>
              </ButtonRefrash>
              <ButtonRefrash
                onClick={() => {
                  setDexSpaces({ ...dexSpaces, isV3: dexSpaces.isV3 === true ? false : true })
                }}
              >
                <Text fontWeight={500} fontSize={16} color={dexSpaces.isV3 ? theme.blue1 : theme.text3}>
                  <UniIcon>
                    <img width={"40px"} src={UniLogo} alt="logo" />
                  </UniIcon>
                  {"V3"}
                </Text>
              </ButtonRefrash>
              <ButtonRefrash
                onClick={() => {
                  setDexSpaces({ ...dexSpaces, isV2Sushi: dexSpaces.isV2Sushi === true ? false : true })
                }}
              >
                <Text fontWeight={500} fontSize={16} color={dexSpaces.isV2Sushi ? theme.yellow1 : theme.text3}>
                  <UniIcon style={{ padding: "5px" }}>
                    <img width={"25px"} src={SushiLogo} alt="logo" />
                  </UniIcon>
                  {"V2"}
                </Text>
              </ButtonRefrash>
              <ButtonRefrash
                onClick={() => {
                  setDexSpaces({ ...dexSpaces, is_1inch: dexSpaces.is_1inch === true ? false : true })
                }}
                style={{ paddingBottom: "4px", paddingTop: "4px", paddingLeft: "0.3em", paddingRight: "0.3em" }}
              >
                <Text fontWeight={500} fontSize={16} color={dexSpaces.is_1inch ? theme.primary3 : theme.text3}>
                  <UniIcon>
                    <img width={"25px"} src={InchLogo} alt="logo" />
                  </UniIcon>
                  {"1Inch"}
                </Text>
              </ButtonRefrash>
              <ButtonRefrashPad onClick={() => setCopied(pageLink)}>
                <Text fontWeight={500} fontSize={16} color={theme.blue1}>
                  {isCopied ? <CheckCircle size={"16"} /> : <Copy size={"16"} />}
                  {isCopied ? "" : ""}
                </Text>
              </ButtonRefrashPad>
              <ButtonRefrashPad
                onClick={() => {
                  setDexSpaces({})
                  setDexSpaces(defaultSpaces)
                }}
              >
                <Text fontWeight={500} fontSize={16} color={theme.blue1}>
                  <RefreshCcw size={16}></RefreshCcw>
                </Text>
              </ButtonRefrashPad>
            </Row>

            {block ? (
              <>
                <CurrentBlock block={block}></CurrentBlock>
                <NextBlock block={block}></NextBlock>
                <ToolsBlock block={block}></ToolsBlock>
              </>
            ) : (
              <LoadingViewClear txt={"Loading Blocks..."} />
            )}

            {currency?.isToken && (
              <ToolsCurrency dexSpaces={dexSpaces} currencyAddress={selectedCurrencyId}></ToolsCurrency>
            )}
            <Row center="xs">
              <Text textAlign="center" style={{ padding: "0rem" }}>
                <DataCard>
                  <CardSection>
                    <AutoColumn gap="md">
                      <UniIcon>
                        <img width={"90%"} src={LogoDark} alt="logo" />
                      </UniIcon>
                      <Text fontWeight={500} fontSize={14}>
                        <br></br> We are stronger together. <br></br>
                        <ExternalLink href={"https://discord.gg/VZkFP78aeF"}>[Discord]</ExternalLink>
                      </Text>
                    </AutoColumn>
                  </CardSection>
                </DataCard>
              </Text>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <Row center="xs" style={{ paddingTop: "0.5rem" }}>
              <StyledFilterButton style={{ textAlign: "center", textTransform: "none" }}>
                {sortedConfirmedTransactions.length}
                {" Confirmed TXs "}
                <Emoji symbol="☑️" />
              </StyledFilterButton>

              {sortedConfirmedTransactions.length === 0 && <LoadingViewClear txt={"Loading Confirmed TXs"} />}
              {currency && (
                <Wrapper
                  style={{
                    direction: "ltr",
                    marginTop: "1rem",
                  }}
                >
                  {sortedConfirmedTransactions.map((tx) => {
                    if (tx.isV2_1Inch || tx.isV3_1Inch) {
                      return (
                        <TradeItem1Inch
                          key={tx.hash}
                          tx={tx}
                          currency={currency}
                          initOpen={false}
                          clearTxHandler={clearTxHandler}
                        ></TradeItem1Inch>
                      )
                    } else if (tx.mempoolData.txMethod === "multicall") {
                      return (
                        <TradeItemMulticall
                          key={tx.hash}
                          tx={tx}
                          currency={currency}
                          initOpen={false}
                          clearTxHandler={clearTxHandler}
                        ></TradeItemMulticall>
                      )
                    } else
                      return (
                        <TradeItem
                          key={tx.hash}
                          tx={tx}
                          currency={currency}
                          initOpen={false}
                          clearTxHandler={clearTxHandler}
                        ></TradeItem>
                      )
                  })}
                </Wrapper>
              )}
            </Row>
          </Col>
        </Row>
      </Grid>
    </>
  )
}
