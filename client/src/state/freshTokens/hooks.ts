import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../index"
import { setHoursFilter, setSelectedFreshToken } from "./actions"
import { Currency } from "@uniswap/sdk-core"

export function useFreshTokensState(): AppState["freshTokens"] {
  return useSelector<AppState, AppState["freshTokens"]>((state) => state.freshTokens)
}

export function useFreshTokensActionHandlers(): {
  onFreshTokenSelection: (selectedFreshToken: Currency | null) => void
  onHourFilterSwitch: (hoursFilter: number) => void
} {
  const dispatch = useDispatch<AppDispatch>()
  const onFreshTokenSelection = useCallback(
    (selectedFreshToken: Currency | null) => {
      dispatch(
        setSelectedFreshToken({
          selectedFreshToken,
        })
      )
    },
    [dispatch]
  )

  const onHourFilterSwitch = useCallback(
    (hoursFilter: number) => {
      dispatch(
        setHoursFilter({
          hoursFilter,
        })
      )
    },
    [dispatch]
  )

  return {
    onFreshTokenSelection,
    onHourFilterSwitch,
  }
}
