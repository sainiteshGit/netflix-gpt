import {createSlice} from "@reduxjs/toolkit";


const movieSlice = createSlice({
    name: "movies",
    initialState:{
        addNowPlayingMovies: null,
        addTrailerVideo: null,
        popularMovies: null
    },
    reducers:{
        addNowPlayingMovies: (state,action)=>{
            state.addNowPlayingMovies = action.payload;
        },
        addPopularMovies: (state,action)=>{
            state.popularMovies = action.payload;
        },
        addTrailerVideo: (state,action)=>{
            state.trailerVideo= action.payload;   
        }
    }
});

export const { addNowPlayingMovies,addTrailerVideo, addPopularMovies } = movieSlice.actions;

export default movieSlice.reducer;
