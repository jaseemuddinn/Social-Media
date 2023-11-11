import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient';


export const getMyInfo = createAsyncThunk('user/getMyInfo', async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true))
        const result = await axiosClient.get('/user/getMyInfo')
        console.log('api called data', result);
    } catch (e) {
        return Promise.reject(e)
    } finally {
        thunkAPI.dispatch(setLoading(false))
    }
} )

const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState: {
        isLoading: false
    },
    reducers:{
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        } 
    }
})

export default appConfigSlice.reducer;

export const {setLoading} = appConfigSlice.actions;