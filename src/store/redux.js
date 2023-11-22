import {configureStore} from '@reduxjs/toolkit'
import colllectionreducer from './slices/colllectionreducer'
const store= configureStore({reducer:{
    collection:colllectionreducer
}})
export default store;