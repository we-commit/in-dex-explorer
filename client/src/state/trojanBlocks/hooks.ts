import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../index"
import { clearBlock, setBlock } from "./actions"

export function useTrojanBlockState(): AppState["trojanBlocks"] {
  return useSelector<AppState, AppState["trojanBlocks"]>((state) => state.trojanBlocks)
}

export function useTrojanBlockActionHandlers(): {
  onClearBlock: () => void
  onSetBlock: (block: any) => void
} {
  const dispatch = useDispatch<AppDispatch>()

  const onClearBlock = useCallback(() => {
    dispatch(clearBlock())
  }, [dispatch])

  const onSetBlock = useCallback(
    (block: any) => {
      dispatch(
        setBlock({
          block,
        })
      )
    },
    [dispatch]
  )

  return {
    onClearBlock,
    onSetBlock,
  }
}
