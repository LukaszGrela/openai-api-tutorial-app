import { ILocalStorage, IStorageData } from './types';

export class LocalStorage implements ILocalStorage {
  private storage: Storage = window.localStorage;

  private getNsKey(key: string) {
    return `${this.ns}::${key}`;
  }

  constructor(private ns: string) {}

  getNamespace(): string {
    return this.ns;
  }

  has(key: string): boolean {
    if (this.storage.length === 0) return false;
    return Object.keys(this.storage).indexOf(this.getNsKey(key)) !== -1;
  }

  clearLocalStorage(): void {
    if (this.storage.length > 0) {
      Object.keys(this.storage).map((key) => {
        if (key.indexOf(this.getNsKey('')) === 0) {
          this.storage.removeItem(key);
        }
      });
    }
  }

  clear(): void {
    this.storage.clear();
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(this.getNsKey(key), value);
  }

  setObject(key: string, value: unknown): void {
    const parsed = JSON.stringify(value);
    this.setItem(key, parsed);
  }

  removeItem(key: string): void {
    this.storage.removeItem(this.getNsKey(key));
  }

  getItem(key: string): string | null {
    return this.storage.getItem(this.getNsKey(key));
  }

  getObject<T = IStorageData>(key: string): T | null {
    const item = this.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
    return null;
  }
}
