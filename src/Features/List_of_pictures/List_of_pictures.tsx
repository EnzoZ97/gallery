import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface List_of_pictures{
    value : Array<{
        id : string,
        url : string
    }>
}

const initialState : List_of_pictures = {
    value : []
}

export const List_of_pictures_Slice = createSlice({
    name: 'List_of_pictures',
    initialState,
    reducers : {
        updateList : (state, action : PayloadAction<{id : string, url : string}> ) => {
            state.value = [action.payload, ...state.value];
        },

        removePicture : (state, action : PayloadAction< string >) => {
            state.value = state.value.filter((elem) => elem.id != action.payload);
        }
    }
})

export const { updateList, removePicture } = List_of_pictures_Slice.actions;
export default List_of_pictures_Slice.reducer;