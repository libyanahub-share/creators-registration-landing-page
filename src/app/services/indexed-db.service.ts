import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private readonly DB_NAME = 'libyana_hub_registration';
  private readonly DB_VERSION = 1;
  private readonly STORE_NAME = 'registration_draft';
  private readonly VIDEO_KEY = 'intro_video';

  constructor() {}

  /**
   * Initialize and open the IndexedDB database
   */
  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME);
        }
      };
    });
  }

  /**
   * Save video File to IndexedDB
   */
  async saveVideo(videoFile: File): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);

      store.put(videoFile, this.VIDEO_KEY);

      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => {
          db.close();
          resolve();
        };
        transaction.onerror = () => {
          db.close();
          reject(new Error('Failed to save video to IndexedDB'));
        };
      });
    } catch (error) {
      console.error('Error saving video to IndexedDB:', error);
      throw error;
    }
  }

  /**
   * Retrieve video File from IndexedDB
   */
  async getVideo(): Promise<File | null> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.STORE_NAME], 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.get(this.VIDEO_KEY);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          db.close();
          resolve(request.result || null);
        };
        request.onerror = () => {
          db.close();
          reject(new Error('Failed to retrieve video from IndexedDB'));
        };
      });
    } catch (error) {
      console.error('Error retrieving video from IndexedDB:', error);
      return null;
    }
  }

  /**
   * Clear video from IndexedDB
   */
  async clearVideo(): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);

      store.delete(this.VIDEO_KEY);

      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => {
          db.close();
          resolve();
        };
        transaction.onerror = () => {
          db.close();
          reject(new Error('Failed to clear video from IndexedDB'));
        };
      });
    } catch (error) {
      console.error('Error clearing video from IndexedDB:', error);
      throw error;
    }
  }

  /**
   * Clear all data from IndexedDB
   */
  async clearAll(): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);

      store.clear();

      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => {
          db.close();
          resolve();
        };
        transaction.onerror = () => {
          db.close();
          reject(new Error('Failed to clear IndexedDB'));
        };
      });
    } catch (error) {
      console.error('Error clearing IndexedDB:', error);
      throw error;
    }
  }
}
