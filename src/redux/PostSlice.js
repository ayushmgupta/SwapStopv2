import {createSlice} from '@reduxjs/toolkit';

export const PostSlice = createSlice({
  name: 'post',
  initialState: {
    data: [],
  },
  reducers: {
    addPost(state, action) {
      state.data.push(action.payload);
    },
    // getItemsByCategory(state, action) {
    //   let tempData = [];
    //   tempData = state.data.filter(item => {
    //     return item.category === action.payload;
    //   });
    //   state.data = tempData;
    // },
  },
});

export const {addPost} = PostSlice.actions;

export default PostSlice.reducer;
