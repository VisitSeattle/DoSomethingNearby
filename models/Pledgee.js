const model = {
  businessName: 'Business Name',
  streetAddress: 'Street Address',
  addressLine2: 'Address Line 2',
  city: 'City',
  zipCode: 'Zip Code',
  website: 'Website',
  phoneNumber: 'Phone',
  latitudeLongitude: 'LatLong',
  neighborhoodRegion: 'Neighborhood / Region',
  region: 'Region',
  seattleNeighborhood: 'Seattle Neighborhood'
}

const categories = {
  accommodations: 'Accommodations',
  foodDrink: 'Food & Drink',
  museumsAttractions: 'Museums & Attractions',
  thingsToDo: 'Things To Do',
  retail: 'Retail',
  services: 'Services',
  transportation: 'Transportation'
}

const isPledgeeFormatCorrect = (pledgee) => {
  const requiredFields = { ...model, ...categories }
  for (const keyIndex in requiredFields) {
    const key = requiredFields[keyIndex]
    if (!Object.prototype.hasOwnProperty.call(pledgee, key)) {
      return {
        value: false,
        reason: `CSV file is missing ${key} value`
      }
    }
  }
  return {
    value: true
  }
}

const regions = [
  'Auburn',
  'Bellevue',
  'Black Diamond',
  'Bothell',
  'Burien',
  'Carnation',
  'Covington',
  'Des Moines',
  'Duvall',
  'Enumclaw',
  'Fall City',
  'Federal Way',
  'Issaquah',
  'Kenmore',
  'Kent',
  'Kirkland',
  'Maple Valley',
  'Mercer Island',
  'Normandy Park',
  'North Bend',
  'Redmond',
  'Renton',
  'Sammamish',
  'SeaTac',
  'Seattle',
  'Shoreline',
  'Snoqualmie',
  'Snoqualmie Pass',
  'Tukwila',
  'Woodinville'
]

const seattleNeighborhoods = [
  'Ballard',
  'Beacon Hill',
  'Belltown',
  'Capitol Hill',
  'Central District',
  'Columbia City',
  'Downtown',
  'Fremont',
  'Georgetown',
  'Greenlake',
  'Greenwood',
  'International District',
  'Maple Leaf',
  'Phinney Ridge',
  'Pioneer Square',
  'Queen Anne',
  'Rainier Valley',
  'SoDo',
  'South Lake Union',
  'South Park',
  'University District',
  'Wallingford',
  'Waterfront',
  'West Seattle'
]

const Pledgee = {
  model,
  categories,
  regions,
  seattleNeighborhoods,
  isPledgeeFormatCorrect
}

export default Pledgee
