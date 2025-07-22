import { Injectable } from '@angular/core';
import { Core } from "@walletconnect/core";
import { WalletKit } from "@reown/walletkit";
import { environment } from '../../environments/environment.development';
import { Emmiter } from './emmiter.service';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class WalletConnect {
  public connector: any;
  private core = new Core({
    projectId: environment.PROJECT_ID
  });
  constructor(private event: Emmiter,
    private httpClient: Http) {

  }

  async initConnection() {
    if (!this.connector) {
      await this.connect();
    }
  }
  async setConnector(connector: any) {
    this.connector = connector;
  }
  getConnector() {
    return this.connector;
  }
  async connect(): Promise<any> {
    const self = this;
    const walletKit = await WalletKit.init({
      core: this.core, // <- pass the shared `core` instance
      metadata: {
        name: "Demo app",
        description: "Demo Client as Wallet/Peer",
        url: "https://reown.com/walletkit",
        icons: [],
      },
    });
    // // Create a connector
    // const connector = new WalletConnect({
    //   bridge: environment.WALLET_CONNECT_BRIDGE_URL, // Required
    //   qrcodeModal: QRCodeModal,
    // });

    // // Check if connection is already established
    // if (!connector.connected) {
    //   // create new session
    //   connector.createSession();
    // }
    // self.setConnector(connector);

    // // Subscribe to connection events
    // connector.on("connect", (error, payload) => {
    //   if (error) {
    //     throw error;
    //   }
    //   // Get provided accounts and chainId
    //   const { accounts, chainId } = payload.params[0];
    //   self.event.setWalletConnectAccount(accounts);

    // });

    // connector.on("session_update", (error, payload) => {
    //   if (error) {
    //     throw error;
    //   }
    //   // Get updated accounts and chainId
    //   const { accounts, chainId } = payload.params[0];
    //   self.event.setWalletConnectAccount(accounts);
    // });

    // connector.on("disconnect", (error, payload) => {
    //   if (error) {
    //     throw error;
    //   }
    // });
  }
}