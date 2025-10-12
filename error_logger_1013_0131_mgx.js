// 代码生成时间: 2025-10-13 01:31:22
const fs = require('fs');
const path = require('path');

// 错误日志收集器配置
const loggerConfig = {
  directory: './logs', // 日志文件存储目录
  filename: 'error.log', // 日志文件名
  maxSize: 1024 * 1024 * 5, // 最大文件大小（5MB）
};

// 创建日志目录
if (!fs.existsSync(loggerConfig.directory)) {
  fs.mkdirSync(loggerConfig.directory, { recursive: true });
}

class ErrorLogger {
  // 写入错误日志
  static writeLog(message) {
    try {
      const logPath = path.join(loggerConfig.directory, loggerConfig.filename);
      const currentSize = fs.statSync(logPath).size;
      // 检查文件大小，如果超过最大限制，则创建新文件
      if (currentSize >= loggerConfig.maxSize) {
        this.rotateLog(logPath);
      }
      // 将错误信息追加到日志文件
      fs.appendFileSync(logPath, `${new Date().toISOString()}: ${message}
`, 'utf8');
    } catch (error) {
      // 错误处理
      console.error('Error writing to log file:', error);
    }
  }

  // 旋转日志文件，创建新的日志文件
  static rotateLog(logPath) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const newLogPath = `${logPath}.${timestamp}`;
    fs.renameSync(logPath, newLogPath);
    this.writeLog('Log rotated'); // 记录日志旋转事件
  }
}

// 导出ErrorLogger类
module.exports = ErrorLogger;

// 使用示例
// ErrorLogger.writeLog('Error occurred: Some error message');