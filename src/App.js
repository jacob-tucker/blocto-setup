import './App.css';
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { useEffect, useState } from 'react';
import { readFlowTokenTotalSupplyScript, readNumberScript } from './cadence/scripts';
import { updateNumberTx } from './cadence/transactions';

fcl.config()
  .put("accessNode.api", "https://testnet.onflow.org")
  .put("discovery.wallet", "https://flow-wallet-testnet.blocto.app/authn")
  // .put("accessNode.api", "https://mainnet.onflow.org")
  // .put("discovery.wallet", "https://flow-wallet.blocto.app/authn")
  .put("0xSimpleTest", "0x6c0d53c676256e8c")


function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);

  const readNumber = async () => {
    const result = await fcl.send([
      fcl.script(readNumberScript),
      fcl.args([])
    ]).then(fcl.decode);

    console.log(result);
  }

  const updateNumber = async () => {
    const transactionId = await fcl.send([
      fcl.transaction(updateNumberTx),
      fcl.args([
        fcl.arg(10, t.Int)
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(999)
    ]).then(fcl.decode);

    console.log(transactionId);
  }

  const readFlowTokenTotalSupply = async () => {
    const result = await fcl.send([
      fcl.script(readFlowTokenTotalSupplyScript),
      fcl.args([])
    ]).then(fcl.decode);

    console.log(result);
  }

  return (
    <div className="App">
      <h1>User's Address: {user?.addr}</h1>
      <button onClick={() => fcl.authenticate()}>Connect Wallet</button>
      <button onClick={() => fcl.unauthenticate()}>Disconnect Wallet</button>
      <button onClick={readNumber}>Read Number</button>
      <button onClick={updateNumber}>Update Number</button>
      <button onClick={readFlowTokenTotalSupply}>Read Flow Token</button>
    </div>
  );
}

export default App;
