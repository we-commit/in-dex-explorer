import { createAction } from "@reduxjs/toolkit"

export const setBlock = createAction<{ block: any }>("trojanBlocks/setBlock")
export const clearBlock = createAction<void>("trojanBlocks/clearBlock")
