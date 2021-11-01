import Pledgee from '../models/Pledgee'
import axios from 'axios'
import Vue from 'vue'

const MATCH_STATUS = {
  INVALID_REGION: 'invalid_region',
  INVALID_NEIGHBORHOOD: 'invalid_neighborhood',
  INVALID_PHONE: 'invalid_phone',
  INVALID_WEBSITE: 'invalid_website',
  SUCCESS: 'success'
}

const THROTTLE_MS = 450

const ReportService = {
  timer (ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms))
  },
  getPledgeeName (pledgeeBusiness) {
    return pledgeeBusiness[Pledgee.model.businessName]
  },
  getAddress (pledgeeBusiness) {
    let address = ''
    const addr1 = pledgeeBusiness[Pledgee.model.streetAddress]
    const addr2 = pledgeeBusiness[Pledgee.model.addressLine2]
    const city = pledgeeBusiness[Pledgee.model.city]
    const zip = pledgeeBusiness[Pledgee.model.zipCode]

    if (addr1.length > 0) {
      address += addr1
      if (addr2.length > 0) {
        address += ', ' + addr2
      }
      address += '\n'
    }

    address += city + ', WA'

    if (addr1.length > 0) {
      address += ' ' + zip
    }

    return address
  },
  getCoordinateValues (pledgeeBusiness) {
    const latLon = pledgeeBusiness[Pledgee.model.latitudeLongitude].split(',')
    if (latLon.length === 2) {
      return {
        lat: parseFloat(latLon[0]),
        lon: parseFloat(latLon[1])
      }
    } else {
      return null
    }
  },
  getCategoryValues (pledgeeBusiness) {
    const selectedCategories = []
    for (const index in Pledgee.categories) {
      // This business is associated with the category if it has any value in the column with that heading
      const categoryValue = Pledgee.categories[index]
      if (pledgeeBusiness[categoryValue].length > 0) {
        selectedCategories.push(categoryValue)
      }
    }
    return selectedCategories
  },
  getCityValues (business) {
    const cities = business[Pledgee.model.region].split(',')
    if (cities[0] && cities[0].indexOf('All') === 0) {
      // Add all valid regions
      const regions = []
      for (const index in Pledgee.regions) {
        regions.push(Pledgee.regions[index])
      }
      return regions
    } else {
      return cities.map(city => city.trim())
    }
  },
  getNeighborhoodValues (business) {
    const neighborhoods = business[Pledgee.model.seattleNeighborhood].split(',')
    const cities = business[Pledgee.model.region].split(',')
    if (cities[0] && cities[0].indexOf('All') === 0) {
      // Add all valid neighborhoods
      const allNeighborhoods = []
      for (const index in Pledgee.seattleNeighborhoods) {
        allNeighborhoods.push(Pledgee.seattleNeighborhoods[index])
      }
      return allNeighborhoods
    } else {
      return neighborhoods.map(n => n.trim()).filter(n => n.length > 0)
    }
  },
  validateRegion (business) {
    let result = true
    const regions = business[Pledgee.model.region].split(',')
    for (const i in regions) {
      if (!Pledgee.regions.includes(regions[i].trim()) && regions[i].toLocaleLowerCase() !== 'all') {
        result = false
      }
    }
    return result
  },
  validateNeighborhood (business) {
    let result = true
    const neighborhoods = business[Pledgee.model.seattleNeighborhood].split(',')
    for (const i in neighborhoods) {
      const n = neighborhoods[i].trim()
      if (business[Pledgee.model.region].split(',').includes('Seattle')) {
        // Neighborhood, if present, must match model
        if (!Pledgee.seattleNeighborhoods.includes(n) && n.length > 0) {
          result = false
        }
      } else {
        // No other region supports neighborhoods
        if (n.length > 0) result = false
      }
    }
    return result
  },
  validatePhone (business) {
    return /^$|^\(\d{3}\) \d{3}-\d{4}$/.test(business[Pledgee.model.phoneNumber])
  },
  validateWebsite (business) {
    return /^$|^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/.test(business[Pledgee.model.website])
  },
  async writePlaceToContentful (place) {
    const fields = {
      businessName: place[Pledgee.model.businessName],
      address: this.getAddress(place),
      coordinates: this.getCoordinateValues(place),
      websiteUrl: place[Pledgee.model.website],
      phoneNumber: place[Pledgee.model.phoneNumber],
      category: this.getCategoryValues(place),
      city: this.getCityValues(place),
      neighborhood: this.getNeighborhoodValues(place)
    }
    const key = Vue.$cookies.get('import_pass')
    await axios.post('api/contentful', {
      key,
      fields
    })
  },
  async getReport ({ pledgees }) {
    if (!pledgees.length) {
      return {
        error: 'No candidates found in CSV'
      }
    }
    const isPledgeeFormatCorrect = Pledgee.isPledgeeFormatCorrect(pledgees[0])
    if (!isPledgeeFormatCorrect.value) {
      return {
        error: isPledgeeFormatCorrect.reason
      }
    }
    const report = []

    // eslint-disable-next-line no-undef
    for (let index = 0; index <= pledgees.length - 1; index++) {
      const pledgeeBusiness = pledgees[index]
      if (!this.validatePhone(pledgeeBusiness)) {
        report.push({ ...pledgeeBusiness, status: MATCH_STATUS.INVALID_PHONE })
      } else if (!this.validateWebsite(pledgeeBusiness)) {
        report.push({ ...pledgeeBusiness, status: MATCH_STATUS.INVALID_WEBSITE })
      } else if (!this.validateRegion(pledgeeBusiness)) {
        report.push({ ...pledgeeBusiness, status: MATCH_STATUS.INVALID_REGION })
      } else if (!this.validateNeighborhood(pledgeeBusiness)) {
        report.push({ ...pledgeeBusiness, status: MATCH_STATUS.INVALID_NEIGHBORHOOD })
      } else {
        report.push({ ...pledgeeBusiness, status: MATCH_STATUS.SUCCESS })
        await this.writePlaceToContentful(pledgeeBusiness)
        await this.timer(THROTTLE_MS)
      }
    }

    return { report }
  }
}

export default ReportService
