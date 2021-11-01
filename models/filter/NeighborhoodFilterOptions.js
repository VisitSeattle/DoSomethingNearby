import Pledgee from '~/models/Pledgee'
const { regions, seattleNeighborhoods } = Pledgee
export default regions.map(region => {
  if (region === 'Seattle') {
    return { value: region, children: seattleNeighborhoods }
  } else {
    return { value: region }
  }
})
