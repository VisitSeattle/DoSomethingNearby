import _ from 'lodash'
import Pledgee from './Pledgee'

const orderKeys = [
  {
    label: 'Status',
    value: 'status'
  },
  Pledgee.model.businessName,
  Pledgee.model.phoneNumber,
  Pledgee.model.website,
  Pledgee.model.region,
  Pledgee.model.seattleNeighborhood
]

const getPledgeeKeys = (reportObj) => {
  const reportKeys = []
  for (const reportKey in reportObj) {
    if (orderKeys.filter(orderKey => orderKey.value === reportKey || orderKey === reportKey).length === 0) {
      reportKeys.push(reportKey)
    }
  }
  return reportKeys
}

// Get the fields in the order we want them to be
const getOrderFields = (reportObj) => {
  const reportKeys = getPledgeeKeys(reportObj)
  return _.union(orderKeys, reportKeys)
}

export default getOrderFields
