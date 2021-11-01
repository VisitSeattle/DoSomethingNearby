require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const contentfulManagement = require('contentful-management')

const ContentfulService = {
  async createEntry (fields, clientManagement) {
    const parsedFields = {}
    Object.keys(fields).forEach(key => {
      parsedFields[key] = {
        'en-US': fields[key]
      }
    })
    return new Promise((resolve, reject) => {
      clientManagement.getSpace()
        .then((space) => {
          space.createEntry('business', {
            fields: parsedFields
          })
        })
        .then(resolve())
        .catch(error => reject(error))
    })
  }
}

app.post('/verifyImportPass', async (req, res) => {
  const { key } = req.body
  res.json({ auth: key === process.env.IMPORT_PASSWORD })
})

app.post('/contentful', async (req, res) => {
  const { key, fields } = req.body
  const managementConfig = {
    accessToken: process.env.CTF_MANAGEMENT_ACCESS_TOKEN,
    space: process.env.CTF_SPACE_ID
  }
  if (key !== process.env.IMPORT_PASSWORD) {
    res.status(400).send({ error: 'Unauthorized' })
  } else {
    const clientManagement = contentfulManagement.createClient(managementConfig)
    ContentfulService.createEntry(fields, clientManagement)
    res.send('OK')
  }
})

module.exports = {
  path: '/api',
  handler: app
}
