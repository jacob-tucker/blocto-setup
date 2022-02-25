export const readNumberScript = `
import SimpleTest from 0xSimpleTest
pub fun main(): Int {
  return SimpleTest.number
}
`

export const readFlowTokenTotalSupplyScript = `
import FlowToken from 0x1654653399040a61
pub fun main(): UFix64 {
  return FlowToken.totalSupply
}
`