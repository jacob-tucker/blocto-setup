export const updateNumberTx = `
import SimpleTest from 0xSimpleTest
transaction(newNumber: Int) {
  prepare(signer: AuthAccount) {

  }

  execute {
    SimpleTest.updateNumber(newNumber: newNumber)
  }
}
`