const contentful = require('contentful')

export default (config) => {
  const cdConfig = {
    space: config.CTF_SPACE_ID,
    accessToken: config.CTF_CDA_ACCESS_TOKEN
  }
  const previewConfig = {
    accessToken: config.CTF_PREVIEW_ACCESS_TOKEN,
    space: config.CTF_SPACE_ID,
    host: 'preview.contentful.com'
  }
  return {
    createClient () {
      return contentful.createClient(cdConfig)
    },
    createClientPreview () {
      return contentful.createClient(previewConfig)
    }
  }
}
