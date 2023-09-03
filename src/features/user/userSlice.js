import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeoCoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAdress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    const positionObject = await getPosition();
    const position = {
      latitude: positionObject.coords.latitude,
      longitude: positionObject.coords.longitude,
    };

    const addressObject = await getAddress(position);
    const address = `${addressObject?.locality}, ${addressObject?.city} ${addressObject?.postcode}, ${addressObject?.countryName}`;

    return { position, address };
  },
);

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchAdress.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAdress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.address = action.payload.address;
        state.position = action.payload.position;
      })
      .addCase(fetchAdress.rejected, (state, action) => {
        (state.status = 'error'), (state.error = action.error.message);
      }),
});

export const { updateName } = userSlice.actions;
export const getUserName = state => state.user.username;
export default userSlice.reducer;
