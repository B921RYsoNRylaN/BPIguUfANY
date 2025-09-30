// 代码生成时间: 2025-09-30 22:19:28
// Import necessary modules
const { NextApiRequest, NextApiResponse } = require('next')
const axios = require('axios')
const config = require('./config') // Configuration file for API keys

// Define the translation API endpoint
const translationApiUrl = 'https://api-deepl.com/v2/translate'

// Define the handler for the translation API route
const translationHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Extract text and target language from the request body
      const { text, targetLanguage } = req.body
      
      // Check if text and target language are provided
      if (!text || !targetLanguage) {
        return res.status(400).json({ error: 'Text and target language are required' })
      }
      
      // Prepare the API request to the translation service
      const response = await axios.post(translationApiUrl, {
        auth_key: config.deeplApiKey,
        text: text,
        target_lang: targetLanguage,
        source_lang: 'EN-US'
      })
      
      // Return the translated text
      return res.status(200).json({ translatedText: response.data.translations[0].text })
    } catch (error) {
      // Handle any errors that occur during the translation process
      console.error('Translation error:', error)
      return res.status(500).json({ error: 'Failed to translate text' })
    }
  } else {
    // Handle non-POST requests
    return res.status(405).json({ error: 'Method not allowed' })
  }
}

// Export the API route handler
module.exports = { translationHandler }