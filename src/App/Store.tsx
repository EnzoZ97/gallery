import { configureStore } from '@reduxjs/toolkit';
import { List_of_pictures_Slice } from '../Features/List_of_pictures/List_of_pictures';

export const store = configureStore({
    reducer:{
        List_of_pictures: List_of_pictures_Slice.reducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;