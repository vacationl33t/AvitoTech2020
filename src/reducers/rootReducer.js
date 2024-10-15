import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeIdNews: "",
}

export const rootReducer = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setActiveIdNews(state, action) {
        state.activeIdNews = action.payload

    }
  },
})

export const { setActiveIdNews } = rootReducer.actions

export default rootReducer.reducer