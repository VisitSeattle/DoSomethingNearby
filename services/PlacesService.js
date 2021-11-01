import contentfulPlugin from '~/plugins/contentful.js'
const cache = require('memory-cache')

const PlacesService = {
  isExpired () {
    return !cache.get('isFresh')
  },
  addIsExpiredToCache (config) {
    cache.put('isFresh', true, parseInt(config.CACHE_TIMEOUT))
  },
  addBusinessToCache (businesses) {
    cache.put('businesses', this.getBusinessesParsed(businesses))
  },
  getBusinessesCache () {
    return cache.get('businesses')
  },
  getBusinessesContentful (config) {
    const businessTypeId = config.CTF_BUSINESS_TYPE_ID
    const client = contentfulPlugin(config).createClient()
    return Promise.all([client.getEntries({
      content_type: businessTypeId,
      order: '-sys.createdAt',
      limit: 1000 // max limit is 1000 (https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters/limit)
    })])
  },
  getBusinessesParsed (businesses) {
    return businesses.map(business => ({ ...business.fields, id: business.sys.id }))
  },
  async getBusinesses (config) {
    if (this.getBusinessesCache() === null) {
      const [businesses] = await this.getBusinessesContentful(config)
      this.addBusinessToCache(businesses.items)
      this.addIsExpiredToCache(config)
    } else if (this.isExpired()) {
      this.addIsExpiredToCache(config)
      this.getBusinessesContentful(config)
        .then(([businesses]) => {
          this.addBusinessToCache(businesses.items)
        })
    }
    return this.getBusinessesCache()
  }
}

export default PlacesService
