// 代码生成时间: 2025-09-24 14:19:05
const os = require('os');
const { NextResponse } = require('next/server');

// Function to get CPU information
async function getCpuInfo() {
  return os.cpus();
}

// Function to get memory information
async function getMemoryInfo() {
  return {
    total: os.totalmem(),
    free: os.freemem()
  };
}

// Function to get system uptime
async function getSystemUptime() {
  return os.uptime();
}

// Main function to gather system performance data
async function getSystemPerformanceData() {
  try {
    const cpuInfo = await getCpuInfo();
    const memoryInfo = await getMemoryInfo();
    const systemUptime = await getSystemUptime();

    return {
      cpu: cpuInfo,
      memory: memoryInfo,
      uptime: systemUptime
    };
  } catch (error) {
    console.error('Error fetching system performance data:', error);
    throw new Error('Failed to fetch system performance data');
  }
}

// Next.js middleware to handle system performance monitoring
export async function middleware(request) {
  try {
    // Call the main function to get system performance data
    const performanceData = await getSystemPerformanceData();

    // Return the performance data as JSON
    return NextResponse.json(performanceData);
  } catch (error) {
    // Handle errors and return an error response
    return NextResponse.error(new Response('System performance data is unavailable', { status: 500 }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Additional comments and documentation
// This middleware can be used to fetch system performance data such as CPU usage, memory usage, and system uptime.
// It can be expanded to include more system performance metrics and can be adapted to different environments.
// The error handling ensures that any issues in fetching the data are caught and handled gracefully.
