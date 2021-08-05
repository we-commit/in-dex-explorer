export interface ITransaction {
  status: string // current status of the transaction
  hash: string
  txHash?: string
  to: string

  isV2?: boolean
  isV3?: boolean
  isV2Sushi?: boolean
  isV2Bal?: boolean
  isV2_1Inch?: boolean
  isV3_1Inch?: boolean

  from: string
  gas: any
  gasPrice: any
  gasUsed: string // present on on-chain txns
  nonce?: number
  value?: any
  blockHash?: string
  cumulativeGasUsed?: number
  transactionHash?: string
  blockNumber?: number
  data: string
  timestampTx: number // the UTC time of first detection of current status
  transactionIndex?: number // optional, present if status confirmed, failed
  logsBloom?: string

  // CUSTOM DATA
  links?: {
    etherscan?: string
  }
  fromTokenAddress: string
  midTokenAddress?: string
  toTokenAddress: string
  checkedPath?: Array<any>
  // CUSTOM DATA
  whaleData?: any
  // FOR PENDING
  mempoolData?: any
  // FOR CONFIRMED
  logs?: any
  events?: any
  // wich server, when
  notes?: {
    message?: string
    timestampTx?: number
  }
}
