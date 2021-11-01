const defaultState = {
  sizes: {
    xs: 0,
    sm: 570,
    md: 720,
    lg: 975,
    xl: 1400
  }
}

export const state = () => ({ ...defaultState })

export const getters = {
  sizes: state => state.sizes
}
