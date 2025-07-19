import { Injectable } from '@angular/core';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import algosdk from 'algosdk';
import { environment } from 'src/environments/environment';
import { EmmiterService } from './emmiter.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class WalletConnectService {
  public connector: any;
  constructor(private event: EmmiterService,
    private httpClient: HttpService) {
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
    // Create a connector
    const connector = new WalletConnect({
      bridge: environment.WALLET_CONNECT_BRIDGE_URL, // Required
      qrcodeModal: QRCodeModal,
    });

    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession();
    }
    self.setConnector(connector);

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      self.event.setWalletConnectAccount(accounts);

    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
      self.event.setWalletConnectAccount(accounts);
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
    });
  }
}