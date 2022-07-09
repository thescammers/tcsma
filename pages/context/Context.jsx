import React, { useCallback, useEffect, useState } from "react";
import {address, ABI} from "../constant/Constant";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from "@walletconnect/web3-provider";


const providerOptions = {

      walletconnect: {
        package: WalletConnectProvider,
        options: {
          
         infuraId: "765d4237ce7e4d999f706854d5b66fdc"
        }
       },
      coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "the scam.", // Required
          infuraId: "765d4237ce7e4d999f706854d5b66fdc", // Required
          rpc: "", // Optional if `infuraId` is provided; otherwise it's required
          chainId: 4, // Optional. It defaults to 1 if not provided
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


    const [provider, setProvider] = useState();
    const [supply, setSupply] = useState();
    const [account, setAccount] = useState();

  const connectwallet = useCallback(async function () {
    try {
        const provider = await web3Modal.connect();
        const ethProvider = new ethers.providers.Web3Provider(provider);
        const accounts = await ethProvider.listAccounts();
        setProvider(provider);
        if (accounts) setAccount(accounts[0]);

        console.log(provider)
        } catch (err) {
          console.log("지갑연결 안함")
        }
  }, [])

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectwallet()
    }
  }, [connectwallet])
  


    const getSupply = async() => {
      try {
        if(provider){

            const ethProvider = new ethers.providers.Web3Provider(provider);
            const contract = new ethers.Contract(address, ABI, ethProvider);
            const supply = await contract.totalSupply();
            const supplyinString = supply.toString()
            setSupply(supplyinString)
          }
        } catch (err) {
          console.log(err)
        }
    }
    

    async function mint() {
      try {
        if(provider){
            const ethProvider = new ethers.providers.Web3Provider(provider);
            const signer = ethProvider?.getSigner();
            const userAddress = await signer.getAddress()
            
        
            const contract = new ethers.Contract(address, ABI, signer);
            const mint = await contract.mint(userAddress, 1)
            await mint.wait()
            getSupply();
          }
        } catch (err) {
          console.log(err)
        }
    }
      return (
        <Context.Provider
          value={{
           connectwallet,
            account,
            mint,
            getSupply,
            supply,
          }}
        >
          {children}
        </Context.Provider>
      );
};