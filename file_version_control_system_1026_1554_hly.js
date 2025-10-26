// 代码生成时间: 2025-10-26 15:54:11
// Import necessary modules
const fs = require('fs');
const path = require('path');

class FileVersionControl {
  // Constructor to initialize the file path and version directory
  constructor(filePath, versionDir = './versions') {
    this.filePath = filePath;
    this.versionDir = versionDir;
    this.originalFile = path.join(process.cwd(), filePath);
    this.versionsPath = path.join(process.cwd(), versionDir);
  }

  // Check if the file exists
  fileExists() {
    return fs.existsSync(this.originalFile);
  }

  // Save a new version of the file
  saveVersion(versionName) {
    if (!this.fileExists()) {
      throw new Error('Original file does not exist.');
    }

    const versionPath = path.join(this.versionsPath, versionName);
    fs.copyFileSync(this.originalFile, versionPath);
    return versionPath;
  }

  // Restore a version of the file
  restoreVersion(versionPath) {
    if (!fs.existsSync(versionPath)) {
      throw new Error('Version file does not exist.');
    }

    fs.copyFileSync(versionPath, this.originalFile);
  }

  // List all versions
  listVersions() {
    if (!fs.existsSync(this.versionsPath)) {
      return [];
    }

    const files = fs.readdirSync(this.versionsPath);
    return files.map(file => path.join(this.versionsPath, file));
  }

  // Remove a version
  removeVersion(versionPath) {
    if (!fs.existsSync(versionPath)) {
      throw new Error('Version file does not exist.');
    }

    fs.unlinkSync(versionPath);
  }
}

// Example usage
const fileVC = new FileVersionControl('example.txt');

try {
  // Save a new version
  const newVersionPath = fileVC.saveVersion('v1.0');
  console.log(`New version saved at: ${newVersionPath}`);

  // List all versions
  const versions = fileVC.listVersions();
  console.log('All versions:', versions);

  // Restore a version
  fileVC.restoreVersion(newVersionPath);
  console.log('Version restored.');

  // Remove a version
  fileVC.removeVersion(newVersionPath);
  console.log('Version removed.');
} catch (error) {
  console.error('Error:', error.message);
}