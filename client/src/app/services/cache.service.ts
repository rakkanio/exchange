import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }
  set(key: string, value: string) {
    localStorage.setItem(key, value)
  }
  get(key: string): string {
    const value = String(localStorage.getItem(key));
    return value;
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
  clearAll() {
    localStorage.clear();
  }
}
