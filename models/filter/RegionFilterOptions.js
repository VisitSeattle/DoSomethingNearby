import Pledgee from '~/models/Pledgee'
const { regions } = Pledgee
export default regions.filter(value => value !== 'Seattle').map(region => ({ value: region }))
