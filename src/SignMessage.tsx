import React from 'react'
import { type WalletClient } from "viem";
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const SignMessage = () => {
  const { primaryWallet } = useDynamicContext();

  const signMessage = async () => {
    if (!primaryWallet) return;

    const signer = await primaryWallet.connector.getSigner() as WalletClient;

    if (!signer) return;

    const signature = await signer.signMessage({account: primaryWallet.address as `0x${string}`, message: 'example'});

    console.log('signature', signature);
  };

  return <button onClick={signMessage}>Sign message</button>;
};


export default SignMessage;