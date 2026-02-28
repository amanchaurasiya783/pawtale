const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  blogs: [],
  searchTerm: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setBlogs, setSearchTerm } = blogSlice.actions;
export default blogSlice.reducer;
