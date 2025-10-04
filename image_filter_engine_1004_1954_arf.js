// 代码生成时间: 2025-10-04 19:54:31
 * It applies filters to images and returns the modified image.
 *
 * @author Your Name
 * @version 1.0
 */

const { NextApiRequest, NextApiResponse } = require('next');

// Import necessary modules
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Define available filters
const filters = {
  grayscale: (imageBuffer) => sharp(imageBuffer).grayscale(),
  sepia: (imageBuffer) => sharp(imageBuffer).sepia(),
  invert: (imageBuffer) => sharp(imageBuffer).invert()
};

// Define the handler for POST requests
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { image, filter } = req.body;
      // Check if the required fields are present
      if (!image || !filter) {
        return res.status(400).json({ message: 'Image and filter are required' });
      }
      // Check if the filter is available
      if (!filters[filter]) {
        return res.status(400).json({ message: 'Invalid filter' });
      }
      
      // Read the image from the buffer
      const imageBuffer = Buffer.from(image, 'base64');
      
      // Apply the filter
      const filteredImage = await filters[filter](imageBuffer);
      
      // Convert the filtered image to a buffer
      const buffer = await filteredImage.toBuffer();
      
      // Set the content type and send the buffer
      res.setHeader('Content-Type', 'image/jpeg');
      return res.send(buffer);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // If not a POST request, return a 405 Method Not Allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

// Export the handler
module.exports = { handlePostRequest };
