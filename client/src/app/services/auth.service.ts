import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { AlgoSignerService } from "./algo-signer.service";
import { CacheService } from "./cache.service";
import { EmmiterService } from "./emmiter.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private cacheService: CacheService,
    private algoService: AlgoSignerService,
    private event: EmmiterService,
    private readonly location: Location
  ) {}

  async isLoggedIn() {
    const self = this;
    const account = self.cacheService.get("walletAddress");
    if (account !== "null") {
      const accountInfo = await self.algoService.getAccountInfo(account);
      self.event.setAccountInfo(accountInfo.data);
      self.event.setAdminRole(accountInfo.data.showUpload);
      if (accountInfo.data.showUpload) {
        return true;
      } else {
        if (String(self.location.path()).includes("item/upload")) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }
  }
}
