import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";

const initialState = {
  songs: [],
  playlist: [],
  playlistdata: [],
  user: [],
  searched: [],
  currentplaylist: [],
  isAuthenticated: false,
  justUpdated: false,
  error: "",
  responseplaylist: [],
};
const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    tokenReceived: (posts, action) => {
      posts.user = action.payload;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.user["first_name"]);

      posts.isAuthenticated = true;
      posts.error = "";
    },
    playlistsReceived: (state, action) => {
      state.playlist = action.payload;
      state.justUpdated = false;
    },
    songsRecieved: (state, action) => {
      state.songs = action.songs;
    },
    playlistdataReceived: (state, action) => {
      state.playlistdata = action.payload;
      state.justUpdated = false;
    },
    currentplaylist: (state, action) => {
      state.currentplaylist = action.payload.playlistsongs;
    },
    changePosts: (posts, action) => {
      posts.justUpdated = true;
      posts.searched = [];
    },
    songresults: (state, action) => {
      state.searched = action.payload;
    },
    logedout: (posts, action) => {
      localStorage.clear();
      return initialState;
    },
    errorOccoured: (posts, action) => {
      posts.error = action.payload;
    },
    responseplaylistReceived: (state, action) => {
      state.responseplaylist = action.payload;
      state.justUpdated = true;
      state.searched = [];
    },
  },
});
export const {
  tokenReceived,
  playlistsReceived,
  playlistdataReceived,
  changePosts,
  logedout,
  songresults,
  currentplaylist,
  errorOccoured,
  responseplaylistReceived,
} = slice.actions;

//authentication related
export const login = (data) =>
  actions.apicallbegan({
    method: "POST",
    onSuccess: tokenReceived.type,
    onRedirect: "/home",
    onError: errorOccoured.type,
    data: data,
    url: "/auth/login/",
  });
export const register = (data) =>
  actions.apicallbegan({
    method: "POST",
    url: "/users/",
    onSuccess: changePosts.type,

    data,
  });
export const logout = (headers) =>
  actions.apicallbegan({
    method: "POST",
    url: "/auth/logout/",
    onSuccess: logedout.type,

    headers,
    data: {},
  });
//songs related actions
export const songs = (data) =>
  actions.apicallbegan({
    method: "GET",
    url: "/song/",

    headers: data,
  });
export const addsong = (data) =>
  actions.apicallbegan({
    method: "POST",
    url: "/song/",
    data,
    onSuccess: changePosts.type,
  });

export const searched = (keyword, headers) =>
  actions.apicallbegan({
    method: "GET",
    url: `/song/?search=${keyword}`,
    headers,
    onSuccess: songresults.type,
  });

//playlist related
export const createplaylist = (data, headers) =>
  actions.apicallbegan({
    method: "POST",
    url: "/createplaylist/",
    onSuccess: responseplaylistReceived.type,
    data,
    headers,
  });

export const getplaylistdata = (data, id) =>
  actions.apicallbegan({
    method: "GET",
    url: `/playlist/${id}/`,
    onSuccess: playlistdataReceived.type,
    headers: data,
  });
export const addsongtoplaylist = (data, headers, id) =>
  actions.apicallbegan({
    method: "PATCH",
    url: `/addtoplaylist/${id}/`,
    data: data,
    headers,
    onSuccess: changePosts.type,
  });
export const deletesongfromplaylist = (data, headers, id) =>
  actions.apicallbegan({
    method: "PATCH",
    url: `/addtoplaylist/${id}/`,
    data: data,
    headers,
    onSuccess: changePosts.type,
  });

export const playlist = (data) =>
  actions.apicallbegan({
    method: "GET",
    url: "/playlist/",
    onSuccess: playlistsReceived.type,
    headers: data,
  });

export const getplaylistdataforupdate = (headers, id) =>
  actions.apicallbegan({
    method: "GET",
    url: `/addtoplaylist/${id}/`,
    headers,
    onSuccess: currentplaylist.type,
  });
export const adddummydatatoplaylist = (data, headers, id) =>
  actions.apicallbegan({
    method: "POST",
    url: `/addtoplaylist/`,
    data: data,
    headers,
  });

export default slice.reducer;
