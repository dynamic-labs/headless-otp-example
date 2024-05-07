import React, { useState } from 'react';

import { useDynamicContext, useEmbeddedWallet } from "@dynamic-labs/sdk-react-core";

import SignMessage from "./SignMessage.tsx";

import "./styles/otp.css";

const OTPActions = () => {
    const { primaryWallet } = useDynamicContext();
    const [result, setResult] = useState<string | undefined>(undefined);

    const {
      createOrRestoreSession,
      isSessionActive,
      sendOneTimeCode,
      userHasEmbeddedWallet,
      revealWalletKey
    } = useEmbeddedWallet();

    const [codeSent, setCodeSent] = useState(isSessionActive);

    const onSendOneTimeCodeHandler = async () => {
        if (!isSessionActive) {
          try {
            await sendOneTimeCode();
            setCodeSent(true);
          } catch (e) {
            console.error(e);
          }
        }
      };

      const onCreateSessionHandler = async (event) => {
        try {
          event.stopPropagation();
          event.preventDefault();
    
          if (!primaryWallet || !userHasEmbeddedWallet()) return;
    
          const otc = event.currentTarget.otc.value;
    
          await createOrRestoreSession({ oneTimeCode: otc })
            .then((result) =>
                console.log("Session created: ", result)
            )
            .catch((error) =>
              console.log("Error creating session: ", error.message)
            );
        } catch (err) {
          console.error(err);
        }
      };


  const onRevealHandler = async (
    selectedKey: 'recoveryPhrase' | 'privateKey',
  ) => {
    try {
      await revealWalletKey({
        htmlContainerId: 'reveal-example-container-id',
        type: selectedKey,
      });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };
    
  

    return (
        <div>
            <h1>OTP Actions</h1>
            <div>
                <p className={isSessionActive ? "active" : "inactive"}>
                    Session {isSessionActive ? "active" : "inactive"}
                </p>
            </div>

            {!isSessionActive && (
                <div>
                    {!codeSent && (
                    <button className="cta-button" onClick={onSendOneTimeCodeHandler}>
                        Send one-time code
                    </button>
                    )}

                    <div className="embedded-wallet-actions-one-time-code">
                        {codeSent && (
                        <form
                            onSubmit={onCreateSessionHandler}
                            className="create-session-method"
                        >
                            <p>Enter one-time code sent to email to create a session</p>

                            <input name="otc" type="text" placeholder="One-time code" />
                            <br />
                            <button className="cta-button" type="submit">
                            Create session
                            </button>
                        </form>
                        )}
                    </div>
                </div>
            )}

            {isSessionActive && (
            <div>
                <SignMessage />
                <div className='reveal-method'>
                    <p>
                        Choose which type of key you want to reveal from the embedded wallet
                    </p>

                    <button onClick={() => onRevealHandler('privateKey')}>
                        Reveal private key
                    </button>
                    <button onClick={() => onRevealHandler('recoveryPhrase')}>
                        Reveal recovery phrase
                    </button>
                    {result}
                    <div id='reveal-example-container-id'></div>
                    </div>
            </div>
            )}
        </div>
    )
}

export default OTPActions;