import React, { useEffect, useState } from "react";
import {address, ABI } from "../constant/Constant";

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
    const [instance, setInstance] = useState();

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectwallet()
    }
  }, [connectwallet])
  

    async function connectwallet() {
      try {

        const instance1 = await web3Modal.connect();
        setInstance(instance1);
        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();
        const address = await signer.getAddress()
        setAddress(address);
        } catch (err) {
          console.log("지갑연결 안함")
        }
    }

    async function mint() {
      try {
        if(instance){
            const provider = new ethers.providers.Web3Provider(instance);
            const signer = provider.getSigner();
            const address = await signer.getAddress()
            const contract = new ethers.Contract(address, ABI, signer);
            const mint = await contract.mint(address, 1)
          }
        } catch (err) {
          console.log("지갑연결 안함")
        }
    }
      return (
        <Context.Provider
          value={{
           connectwallet,
            address,
            mint,
          }}
        >
          {children}
        </Context.Provider>
      );
};