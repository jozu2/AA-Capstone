import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  originDescription: null,
  destination: null,
  destinationDescription: null,
  travelTimeInformation: null,
  viewBookings: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    //gotoschool datas
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setRideInfo: (state, action) => {
      state.rideInfo = action.payload;
    },
    setOriginDescription: (state, action) => {
      state.originDescription = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setDestinationDescription: (state, action) => {
      state.destinationDescription = action.payload;
    },
    setViewBookings: (state, action) => {
      state.viewBookings = action.payload;
    },
    setSavedRequest: (state, action) => {
      state.savedRequest = action.payload;
    },
    setCardData: (state, action) => {
      state.cardData = action.payload;
    },

    setUserLocationBooked: (state, action) => {
      state.userLocationBooked = action.payload;
    },

    setGoingHomeTraveltime: (state, action) => {
      state.goingHomeTraveltime = action.payload;
    },

    setUserIsLoggedin: (state, action) => {
      state.userIsLoggedIn = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },

    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },

    setDriverLocation: (state, action) => {
      state.driverLocation = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setOriginDescription,
  setViewBookings,
  setTravelTimeInformation,
  setUserLocationBooked,
  setGoingHomeTraveltime,
  setUserIsLoggedin,
  setSavedRequest,
  setIsLoading,
  setUserId,
  setUserProfile,
  setRideInfo,
  setDriverLocation,
  setCardData,
  setDestinationDescription,
} = navSlice.actions;

//Selectors go to school user
export const selectOrigin = (state) => state.nav.origin;
export const selectOriginDescription = (state) => state.nav.originDescription;
export const selectDestination = (state) => state.nav.destination;
export const selectDestinationDescription = (state) =>
  state.nav.destinationDescription;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectViewBookings = (state) => state.nav.viewBookings;
export const selectedCardData = (state) => state.nav.cardData;
export const selectSavedRequest = (state) => state.nav.savedRequest;
export const selectRideInfo = (state) => state.nav.rideInfo;

//Selectors go to home user
export const selectUserLocationBooked = (state) => state.nav.userLocationBooked;
export const SelectGoingHomeTraveltime = (state) =>
  state.nav.goingHomeTraveltime;

export const selectUserIsLoggedIn = (state) => state.nav.userIsLoggedIn;

export const selectIsLoading = (state) => state.nav.isLoading;

export const selectUserId = (state) => state.nav.userId;
export const selectUserProfile = (state) => state.nav.userProfile;

export const selectDriverLocation = (state) => state.nav.driverLocation;

export default navSlice.reducer;
