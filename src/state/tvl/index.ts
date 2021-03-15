/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
// import farmsConfig from 'config/constants/farms'
import fetchTvl from './fetchTvl'
import { TvlState, Tvl } from '../types'

const initialState: TvlState = { data: [{}] }
export const tvlSlice = createSlice({
  name: 'Tvl',
  initialState,
  reducers: {
    setTvlPublicData: (state, action) => {
      state.data = action.payload
    }
  },
})

// Actions
export const { setTvlPublicData } = tvlSlice.actions

// Thunks
export const fetchTvlPublicDataAsync = () => async(dispatch) => {
  const tvl = await fetchTvl()
  dispatch(setTvlPublicData(tvl))
}

export default tvlSlice.reducer
