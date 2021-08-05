import { createReducer } from "@reduxjs/toolkit"
import { setHoursFilter, setSelectedFreshToken } from "./actions"
import { Currency } from "@uniswap/sdk-core"

export interface FreshTokensState {
  readonly hoursFilter: number | undefined
  readonly selectedFreshToken: Currency | null
}

const initialState: FreshTokensState = {
  hoursFilter: 6,
  selectedFreshToken: null,
}

export default createReducer<FreshTokensState>(initialState, (builder) =>
  builder
    .addCase(setHoursFilter, (state, { payload: { hoursFilter } }) => {
      return {
        ...state,
        hoursFilter,
      }
    })
    .addCase(setSelectedFreshToken, (state, { payload: { selectedFreshToken } }) => {
      return {
        ...state,
        selectedFreshToken,
      }
    })
)
