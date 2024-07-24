import React from 'react'

import Main from './Main.tsx';

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import './App.css';

function App() {
  return (
    <div className="App">
     <DynamicContextProvider
      settings={{
        environmentId: '2762a57b-faa4-41ce-9f16-abff9300e2c9',
        walletConnectors: [EthereumWalletConnectors],
        hideEmbeddedWalletTransactionUIs: true
      }}>
        <Main />
      </DynamicContextProvider>  
    </div>
  );
}

export default App;
