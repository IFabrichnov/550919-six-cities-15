import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { LOCATIONS, RequestStatus } from '@const';
import { Offer } from '@type/offer';
import { fetchOffersAction } from '@store/thunks/offers';

type OffersState = {
  location: string;
  offers: Offer[];
  status: RequestStatus;
}

const initialState: OffersState = {
  location: LOCATIONS[0],
  offers: [],
  status: RequestStatus.Idle,
};

const offersSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  initialState,
  name: 'offers',
  reducers: {
    setLocation: (state: OffersState, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    updateOffers: (state: OffersState, action: PayloadAction<string>) => {
      state.offers = state.offers.map((offer) => offer.id === action.payload ? { ...offer, isFavorite: !offer.isFavorite } : offer);
    }
  },
  selectors: {
    selectLocation: (state: OffersState) => state.location,
    selectOffers: (state: OffersState) => state.offers,
    selectStatus: (state: OffersState) => state.status,
  }
});

const offersActions = offersSlice.actions;
const offersSelectors = {
  ...offersSlice.selectors,
  selectOffersByLocation: createSelector(offersSlice.selectors.selectOffers, offersSlice.selectors.selectLocation, (allOffers, location) =>
    allOffers?.filter((offer) => offer.city.name === location)
  )
};

export { offersActions, offersSlice, offersSelectors };
