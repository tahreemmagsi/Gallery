
import { createSlice } from '@reduxjs/toolkit';

const collectionSlice = createSlice({
  name: 'collection',
  initialState: [],
  reducers: {
    collectiondata(state, action) { 
      state.push(action.payload);
    },
    removeImage(state, action) {
      const imageId = action.payload;
      return state.filter((image) => image.id !== imageId);
    },
  },
});

export const { collectiondata, removeImage } = collectionSlice.actions;
export default collectionSlice.reducer;
