import { createAction } from "@reduxjs/toolkit"
import { Currency } from "@uniswap/sdk-core"

export const setHoursFilter = createAction<{ hoursFilter: number }>("freshTokens/setHoursFilter")
export const setSelectedFreshToken = createAction<{ selectedFreshToken: Currency | null }>(
  "freshTokens/setSelectedFreshToken"
)
