import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// export const fetchUsers = createAsyncThunk(
//     'dashboardSlice/fetchUsers',
//     async () => {
//       try {
//         const url = "http://localhost:5000/api/auth/login";
//         const response = await axios.get(url, {

//         });
//         const { success, redirectUrl } = response.data;
//         console.log("Password", password);
//         if (success) {
//           localStorage.setItem('role', response.data.role);
//           return response;
//         } else {
//           return rejectWithValue("Login failed. Please check your credentials.");
//         }
//       } catch (error) {
//         return rejectWithValue(error.message || 'Internal Server Error');
//       }
//     }
//   );

// /investor/submit-artist-project

let data = {
  artistName: "Example Artist",
  projectTitle: "Example Project",
  artistDescription: "Description of the artist",
  phoneNumber: "123456789",
  socialMediaLinks: "http://example.com",
  artistVision: "Artist's vision for the project",
  projectOverview: "Overview of the project",
  fundingTargetAmount: 10000
}

export const userCreation = createAsyncThunk(
  'signupSlice/userCreation',
  async ({data}, { rejectWithValue }) => {
    try {
      const url = "http://localhost:5000/api/auth/create-user";
      console.log("Url", url)
      const response = await axios.post(url, {
        headers: {
          Authorization: localStorage.getItem("access_token") !== null ? `Bearer` + localStorage.getItem("access_token") : null,
          "Content-Type": "application/json"
        }
      }, {
        data
      });
      // const { success, redirectUrl } = response.data;
      // if (success) {
      //   alert("Artist Campaign Created Successfully");
      //   return response;
      // } else {
      //   alert("Artist Campaign Not Created");
      //   return rejectWithValue("Login failed. Please check your credentials.");
      // }
    } catch (error) {
      return rejectWithValue(error.message || 'Internal Server Error');
    }
  }
);


export const signupSlice = createSlice({
  name: 'signupSlice',
  initialState: {
    role: null,
    username: null,
    loading: false
  },
  reducers: {

  },
  extraReducers(builder) {
    builder

      .addCase(userCreation.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(userCreation.fulfilled, (state, action) => {
        
      })
      .addCase(userCreation.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})


export default dashboardSlice.reducer