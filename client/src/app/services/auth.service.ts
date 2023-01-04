import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { CacheService } from "./cache.service";
import { EmmiterService } from "./emmiter.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private cacheService: CacheService,
    private event: EmmiterService,
    private readonly location: Location
  ) {}

  async isLoggedIn() {
    const self = this;

  }
}
