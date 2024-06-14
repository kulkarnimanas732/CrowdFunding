import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { setErrorAlert, setSuccessAlert } from '../../Utility/Slice/alertsSlice';



export const campaignCreationArtist = createAsyncThunk(
  'dashboardSlice/artist',
  async ({ data }, thunkAPI) => {
    try {
      const url = "http://localhost:5000/api/investor/submit-artist-project";
      const response = await axios.post(url, data, {
        headers: {
          "Authorization": localStorage.getItem("access_token") !== null ? localStorage.getItem("access_token") : null,
          "Content-Type": "application/json"
        }
      });
      const { success, redirectUrl } = response.data;
      if (success) {
        setSuccessAlert("Campaign Created Successfully");
        return response;
      } else {
        setErrorAlert("Campaign Not Created. Please try again later.");
        return thunkAPI.rejectWithValue("Campaign Creation Failed.");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Internal Server Error');
    }
  }
);

export const campaignCreationNGO = createAsyncThunk(
  'dashboardSlice/ngo',
  async ({ data }, thunkAPI) => {
    try {
      const url = "http://localhost:5000/api/investor/create-charity-campaign";
      console.log("Url", url)
      const response = await axios.post(url, data, {
        headers: {
          // body: localStorage.setItem('role', response.data.userId);
          Authorization: localStorage.getItem("access_token") !== null ? localStorage.getItem("access_token") : null,
          "Content-Type": "application/json"
        }
      });
      const { success, redirectUrl } = response.data;
      if (success) {
        thunkAPI.dispatch(setSuccessAlert("Campaign Created Successfully"));
        return response;
      } else {
        thunkAPI.dispatch(setErrorAlert("Campaign Not Created. Please try again later."));
        return thunkAPI.rejectWithValue("NGO Campaign Creation failed. Please check your credentials.");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Internal Server Error');
    }
  }
);

export const getArtist = createAsyncThunk(
  'dashboardSlice/getArtist',
  async (_, thunkAPI) => {
    try {
      const url = "http://localhost:5000/api/investor/fetch-artist-project";
      const response = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("access_token") !== null ? localStorage.getItem("access_token") : null,
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        return response;
      } else {
        thunkAPI.dispatch(setErrorAlert('Details not fetched. Please try again later.'))
        return thunkAPI.rejectWithValue("Artist details not fetched");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Internal Server Error');
    }
  }
);


export const getNGO = createAsyncThunk(
  'dashboardSlice/getNGO',
  async (_, thunkAPI) => {
    try {
      const url = "http://localhost:5000/api/investor/fetch-charity-campaign";
      const response = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null,
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        return response;
      } else {
        thunkAPI.dispatch(setErrorAlert('Details not fetched. Please try again later.'))
        return thunkAPI.rejectWithValue("Charity details not fetched");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || 'Internal Server Error');
    }
  }
);


export const fetchAllNgos = createAsyncThunk(
  'dashboardSlice/fetchAllNgos',
  async (_, thunkAPI) => {
    try {
      const url = "http://localhost:5000/api/investor/fetch-charity-campaigns";
      const response = await axios.get(url);
      if (response.status === 200) {
        return response;
      } else {
        thunkAPI.dispatch(setErrorAlert('Details not fetched. Please try again later.'))
        return thunkAPI.rejectWithValue("Charity details not fetched");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || 'Internal Server Error');
    }
  }
);

export const fetchAllArtists = createAsyncThunk(
  'dashboardSlice/fetchAllArtists',
  async (_, thunkAPI) => {
    try {
      const url = "http://localhost:5000/api/investor/fetch-artist-projects";
      const response = await axios.get(url);
      if (response.status === 200) {
        return response;
      } else {
        thunkAPI.dispatch(setErrorAlert('Details not fetched. Please try again later.'))
        return thunkAPI.rejectWithValue("Artists details not fetched");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || 'Internal Server Error');
    }
  }
);

export const updatedNGO = createAsyncThunk(
  'dashboardSlice/updatedNGO',
  async ({data}, thunkAPI) => {
    try {
      const url = `http://localhost:5000/api/investor/update-charity-campaign/${data?._id}`;
      const response = await axios.put(url, data);
      if (response.status === 200) {
        thunkAPI.dispatch(setSuccessAlert('Details updated successfully.'));
        return response;
      } else {
        thunkAPI.dispatch(setErrorAlert('Details not updated. Please try again later.'));
        return thunkAPI.rejectWithValue("Ngo details not updated");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || 'Internal Server Error');
    }
  }
);

export const updatedArtist = createAsyncThunk(
  'dashboardSlice/updatedArtist',
  async ({data}, thunkAPI)=> {
    try {
      const url = `http://localhost:5000/api/investor/update-artist-project/${data?._id}`;
      const response = await axios.put(url, data);
      if (response.status === 200) {
        thunkAPI.dispatch(setSuccessAlert("Details updated successfully."));
        return response;
      } else {
        dispatchEvent(setSuccessAlert("Details not updated. Please try again later."));
        return thunkAPI.rejectWithValue("Artist details not updated");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || 'Internal Server Error');
    }
  }
);

export const deleteNGO = createAsyncThunk(
  'dashboardSlice/deleteNGO',
  async ({data}, thunkAPI) => {
    try {
      const url = `http://localhost:5000/api/investor/delete-charity-campaign/${data}`;
      const response = await axios.delete(url);
      if (response.status === 200) {
        thunkAPI.dispatch(setSuccessAlert("Campaign deleted successfully"));
        return response;
      } else {
        thunkAPI.dispatch(setErrorAlert("Failed to delete campaign. Please try again later or contact support for assistance"));
        return thunkAPI.rejectWithValue("Ngo not deleted");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || 'Internal Server Error');
    }
  }
);


export const deleteArtist = createAsyncThunk(
  'dashboardSlice/deleteArtist',
  async ({data}, thunkAPI) => {
    try {
      const url = `http://localhost:5000/api/investor/delete-artist-project/${data}`;
      const response = await axios.delete(url);
      if (response.status === 200) {
        thunkAPI.dispatch(setSuccessAlert("Campaign deleted successfully"));
        return response;
      } else {
        thunkAPI.dispatch(setErrorAlert("Failed to delete campaign. Please try again later or contact support for assistance"))
        return thunkAPI.rejectWithValue("Artist not deleted");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || 'Internal Server Error');
    }
  }
);

export const getDonationDetailsNgo = createAsyncThunk(
  'dashboardSlice/getDonationDetailsNgo',
  async ({data}, thunkAPI) => {
    try {
      const url = `http://localhost:5000/api/investor/charity-campaign-details/${data}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null,
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        return response;
      } else {
        thunkAPI.dispatch(setErrorAlert('Details not fetched. Please try again later.'))
        return thunkAPI.rejectWithValue("Charity details not fetched");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || 'Internal Server Error');
    }
  }
);

export const getDonationDetailsArtist = createAsyncThunk(
  'dashboardSlice/getDonationDetailsArtist',
  async ({data}, thunkAPI) => {
    try {
      const url = `http://localhost:5000/api/investor/project-details/${data}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null,
          "Content-Type": "application/json"
        },
        // params: data // Pass additional data as query parameters if needed
      });
      if (response.status === 200) {
        return response;
      } else {
        thunkAPI.dispatch(setErrorAlert('Details not fetched. Please try again later.'))
        return thunkAPI.rejectWithValue("Artist details not fetched");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || 'Internal Server Error');
    }
  }
);
export const getInvestorDonations = createAsyncThunk(
  'dashboardSlice/getInvestorDonations',
  async ({ data }, thunkAPI) => {
    const url = `http://localhost:5000/api/investor/donar-donations/${data}`;
    console.log("url", url);
    try {   
      const response = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("access_token") || null,
          "Content-Type": "application/json"
        }
      });
      console.log("url", url);
      if (response.status === 200) {
        return response.data; // Adjust return value based on your actual API response structure
      } else {
        thunkAPI.dispatch(setErrorAlert('Details not fetched. Please try again later.'));
        return thunkAPI.rejectWithValue("Artist details not fetched");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Internal Server Error');
    }
  }
);

export const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState: {
    role: null,
    username: null,
    loading: false,
    ngoCampaignDetails: null,
    artistCampaignDetails: null,
    error: null,
    allNgos: null,
    allArtists: null,
    donationHistory: null,
    investorDonations: [],
  },
  reducers: {

  },
  extraReducers: (builder) => {

    builder.addCase(campaignCreationArtist.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(campaignCreationArtist.fulfilled, (state, action) => {
      // state.role = action.role
    })
    builder.addCase(campaignCreationArtist.rejected, (state, action) => {
      state.error = action.error.message
    })

    builder.addCase(campaignCreationNGO.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(campaignCreationNGO.fulfilled, (state, action) => {
      // state.role = action.role
    })
    builder.addCase(campaignCreationNGO.rejected, (state, action) => {
      state.error = action.error.message
    })



    builder.addCase(getNGO.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getNGO.fulfilled, (state, action) => {
      state.loading = false;
      state.ngoCampaignDetails = action.payload.data.data;
      state.error = null;
    });

    builder.addCase(getNGO.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.error : action.error.message || 'Unknown Error';
    });

    builder.addCase(getArtist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getArtist.fulfilled, (state, action) => {
      state.loading = false;
      state.artistCampaignDetails = action.payload.data.data;
      state.error = null;
    });

    builder.addCase(getArtist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.error : action.error.message || 'Unknown Error';
    });



    builder.addCase(fetchAllNgos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAllNgos.fulfilled, (state, action) => {
      state.loading = false;
      state.allNgos = action.payload.data.data;
      state.error = null;
    });

    builder.addCase(fetchAllNgos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.error : action.error.message || 'Unknown Error';
    });

    builder.addCase(fetchAllArtists.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAllArtists.fulfilled, (state, action) => {
      state.loading = false;
      state.allArtists = action.payload.data.data;
      state.error = null;
    });

    builder.addCase(fetchAllArtists.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.error : action.error.message || 'Unknown Error';
    });

    builder.addCase(updatedNGO.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updatedNGO.fulfilled, (state, action) => {
      state.loading = false;
      state.ngoCampaignDetails = action.payload.data.data;
      state.error = null;
    });

    builder.addCase(updatedNGO.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.error : action.error.message || 'Unknown Error';
    });

    builder.addCase(updatedArtist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updatedArtist.fulfilled, (state, action) => {
      state.loading = false;
      state.ngoCampaignDetails = action.payload.data.data;
      state.error = null;
    });

    builder.addCase(updatedArtist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.error : action.error.message || 'Unknown Error';
    });

    builder.addCase(deleteNGO.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(deleteNGO.fulfilled, (state, action) => {
      state.loading = false;
      state.ngoCampaignDetails = null;
      state.error = null;
    });

    builder.addCase(deleteNGO.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.error : action.error.message || 'Unknown Error';
    });

    builder.addCase(deleteArtist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(deleteArtist.fulfilled, (state, action) => {
      state.loading = false;
      state.artistCampaignDetails = null;
      state.error = null;
    });

    builder.addCase(deleteArtist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.error : action.error.message || 'Unknown Error';
    });

    builder.addCase(getDonationDetailsNgo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getDonationDetailsNgo.fulfilled, (state, action) => {
      state.loading = false;
      state.donationHistory = action.payload;
      state.error = null;
    });

    builder.addCase(getDonationDetailsNgo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.error : action.error.message || 'Unknown Error';
    });
    
    builder.addCase(getDonationDetailsArtist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getDonationDetailsArtist.fulfilled, (state, action) => {
      state.loading = false;
      state.donationHistory = action.payload;
      state.error = null;
    });

    builder.addCase(getDonationDetailsArtist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.error : action.error.message || 'Unknown Error';
    });
    // builder.addCase(fetchInvestorDetails.fulfilled, (state, action) => {
    //   state.investorDetails = action.payload;
    // });
 
    builder.addCase(getInvestorDonations.pending, (state) => {
      state.loading = true;
      state.error = null;
  })
  // builder.addCase(getInvestorDonations.fulfilled, (state, action) => {
  //     state.donationHistory = action.payload.donations;
  //     state.loading = false;
  //     state.error = null;
  // })
builder.addCase(getInvestorDonations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
  });
  builder.addCase(getInvestorDonations.fulfilled, (state, action) => {
    state.investorDonations = action.payload;
  });
  }
})
// export const { /* your actions */ } = dashboardSlice.actions;
export const ngoCampaignDetails = (state) => state.dashboardSlice.ngoCampaignDetails;
export const artistCampaignDetails = (state) => state.dashboardSlice.artistCampaignDetails;
export const isLoading = (state) => state.dashboardSlice.loading;
export const allNgos = (state) => state.dashboardSlice.allNgos;
export const allArtists = (state) => state.dashboardSlice.allArtists;
export const investorDetails = (state) => state.dashboardSlice.investorDetails;
//export const investorDetails = (state) => state.dashboard.investorDetails;
export const { setLoading, clearError, resetDonationHistory } = dashboardSlice.actions;


export default dashboardSlice.reducer