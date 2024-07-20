import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOutgoingOffer, registerIncomingOffer } from './asyncThunks';

export enum PeerType {
  HOST,
  PLAYER
}

export enum ConnectionStateType {
  /** No connection occurred */
  UNCONNECTED,
  /** Connected and ready to go. */
  CONNECTED,
  /** Waiting for new connection */
  AWAITING,
  /** In the process of joining */
  JOINING
}

interface ConnectionState {
  peerType: PeerType;
  outgoingOffer: string;
  connectionState: ConnectionStateType;
  errorOnJoin: {
    hasError: boolean,
    message: string
  }
};

const initialState: ConnectionState = {
  peerType: PeerType.HOST,
  outgoingOffer: '',
  connectionState: ConnectionStateType.UNCONNECTED,
  errorOnJoin: {
    hasError: false,
    message: ''
  }
};

export const connectionSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Incoming offer register actions.
    builder
      .addCase(registerIncomingOffer.fulfilled, state => {
        // If connected as a player, set the type.
        state.connectionState = ConnectionStateType.CONNECTED;
        state.peerType = PeerType.PLAYER;
      })
      .addCase(registerIncomingOffer.rejected, (state, payload) => {
        state.errorOnJoin = {
          hasError: true,
          message: payload.error.message?.toString() || ''
        };
      })
      .addCase(registerIncomingOffer.pending, state => {
        state.connectionState = ConnectionStateType.JOINING;
      });

    // Outgoing offer generation
    builder
      .addCase(createOutgoingOffer.fulfilled, (state, action) => {
        console.log(action);
        state.outgoingOffer = action.payload;
        state.connectionState = ConnectionStateType.AWAITING;
      })
      .addCase(createOutgoingOffer.rejected, (state, action) => {
        console.log(action.error);
      });

  }
});

export default connectionSlice.reducer;
