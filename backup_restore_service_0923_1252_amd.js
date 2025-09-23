// 代码生成时间: 2025-09-23 12:52:15
const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Constants for backup and restore operations
const BACKUP_DIR = './backups';
const BACKUP_FILE_NAME = 'data_backup.json';

class BackupRestoreService {
  /**
   * Creates a new instance of BackupRestoreService.
   * @param {string} dataDirectory - The directory where the data is stored.
   */
  constructor(dataDirectory) {
    this.dataDirectory = dataDirectory;
  }

  /**
   * Creates a backup of the data by copying the data directory.
   * @returns {Promise<void>} A promise that resolves when the backup is completed.
   */
  async backupData() {
    try {
      const backupPath = path.join(BACKUP_DIR, BACKUP_FILE_NAME);
      const dataPath = path.join(this.dataDirectory, '**');

      await exec(`tar -czf ${backupPath} -C ${this.dataDirectory} .`);
      console.log('Data backup completed successfully.');
    } catch (error) {
      console.error('Error during data backup:', error.message);
      throw error;
    }
  }

  /**
   * Restores data from the last backup.
   * @returns {Promise<void>} A promise that resolves when the restore is completed.
   */
  async restoreData() {
    try {
      const backupPath = path.join(BACKUP_DIR, BACKUP_FILE_NAME);
      const targetPath = this.dataDirectory;

      await exec(`tar -xzf ${backupPath} -C ${targetPath}`);
      console.log('Data restore completed successfully.');
    } catch (error) {
      console.error('Error during data restore:', error.message);
      throw error;
    }
  }
}

// Example usage
const dataDirectory = './data'; // Replace with your actual data directory path
const service = new BackupRestoreService(dataDirectory);

// Backup the data
service.backupData()
  .then(() => console.log('Backup successful.'))
  .catch(error => console.error('Backup failed:', error));

// Restore the data
service.restoreData()
  .then(() => console.log('Restore successful.'))
  .catch(error => console.error('Restore failed:', error));