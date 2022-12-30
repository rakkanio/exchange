import { Injectable } from '@angular/core';
import { getDefaultProvider } from 'ethers';
import { createClient, connect, disconnect, getAccount, signMessage, InjectedConnector,fetchBalance } from '@wagmi/core';

@Injectable({
  providedIn: 'root'
})
export class WagmiService {

  constructor() { 
    this.init()
  }
  async init(){
      createClient({
      autoConnect: true,
      provider: getDefaultProvider(),
    });
  }
  async isWalletConnected(){
    const { isConnected } = await getAccount();
    return isConnected;
  }
  async disconnectWallet(){
    const { isConnected } = await getAccount();
    if(isConnected){
      disconnect();//disconnects the web3 provider if it's already active
    }
    return isConnected
  }

  async connectToWallet(){
    const provider = await connect({ connector: new InjectedConnector() }); // enabling the web3 provider metamask
    return provider;
  }
  async signMessage(message){
    const signature = await signMessage({message}) // enabling the web3 provider metamask
    return signMessage;
  }

  async fetchBalance(address: any){
    const balance= await fetchBalance({addressOrName: address,})
    console.log('balance', balance)
  }
}
