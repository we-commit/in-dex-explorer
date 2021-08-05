import { Text } from "rebass"
import styled, { keyframes } from "styled-components"
export const StandardPageWrapper = styled.div`
  padding-top: 160px;
  width: 100%;
`
export const ClickableText = styled(Text)`
  :hover {
    cursor: pointer;
  }
  color: ${({ theme }) => theme.primary1};
`
export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
`

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const UniIcon = styled.div`
  animation: ${rotate} linear 1800ms;

  :hover {
    animation: infinite ${rotate} linear 1400ms;
  }
`

export const ButtonRefrash = styled.button`
  position: relative;
  border: none;
  background-color: ${({ theme }) => theme.bg2};
  margin: 0.5rem;
  padding: 0.1rem 0.1rem;
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
export const ButtonRefrashPad = styled.button`
  position: relative;
  border: none;
  background-color: ${({ theme }) => theme.bg2};
  margin: 0.5rem;
  padding: 1rem 0.8rem;
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
