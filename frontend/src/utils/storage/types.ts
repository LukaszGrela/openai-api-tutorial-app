export interface IStorageData {
  [key: string]: unknown;
}

export interface ILocalStorage {
  /**
   * Clear data set by this instance of `LocalStorage`
   */
  clearLocalStorage: () => void;

  /**
   * Empties the list associated with the object of all key/value pairs, if there are any.
   * Shortcut to `window.localStorage.clear();`
   */
  clear(): void;

  /**
   * Stores piece of information under given key for this instance of `LocalStorage`
   * @param key key under which data is stored
   * @param value data to store
   */
  setItem(key: string, value: string): void;

  /**
   * Converts to string with `JSON.stringify` and stores it under given key for this instance of `LocalStorage`
   *
   * @param key key under which data is stored
   * @param value object that will be `JSON.stringify`'ied and stored
   * @throws JSON parsing error if it fails
   */
  setObject(key: string, value: unknown): void;

  /**
   * Remove item for this instance of `LocalStorage`
   * @param key key under which data is stored
   */
  removeItem(key: string): void;

  /**
   * Returns stored string set by this instance of `LocalStorage`
   * @param key key under which data is stored
   */
  getItem(key: string): string | null;

  /**
   * Returns stored JSON object set by this instance of `LocalStorage`
   * @param key key under which data is stored
   * @throws JSON parsing error if it fails
   */
  getObject(key: string): IStorageData | null;

  /**
   * Returns namespace used for this instance
   */
  getNamespace(): string;

  /**
   * Returns true if given key exists in the storage for this instance of `LocalStorage`
   * @param key key under which data is stored to test
   */
  has(key: string): boolean;
}
