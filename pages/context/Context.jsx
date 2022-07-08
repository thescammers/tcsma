import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {

walletconnect: {
package: WalletConnectProvider,
options: {
 infuraId: "708f71622d184ef1bf7f8e3753a61134"
}
 },
      coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "Net2Dev NFT Minter", // Required
          infuraId: "708f71622d184ef1bf7f8e3753a61134", // Required
          rpc: "", // Optional if `infuraId` is provided; otherwise it's required
          chainId: 1, // Optional. It defaults to 1 if not provided
          darkMode: true // Optional. Use dark theme, defaults to false
        }
      }
};
let web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'rinkeby', // optional
    cacheProvider: false,
    theme: "dark",
    providerOptions, // required
  })
}
export const Context = React.createContext();


export const Provider = ({ children }) => {

    const [address, setAddress] = useState();

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectwallet()
    }
  }, [connectwallet])
  

    async function connectwallet() {
      try {

        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();
        const address = await signer.getAddress()
        setAddress(address);

        } catch (err) {

          console.log("지갑연결 안함")

        }
       
       
    }
     

      return (
        <Context.Provider
          value={{
           connectwallet,
            address,
          }}
        >
          {children}
        </Context.Provider>
      );
};