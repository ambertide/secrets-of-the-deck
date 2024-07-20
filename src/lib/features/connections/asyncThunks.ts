'use client';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { connectionManager } from "./ConnectionManager";

/**
 * Wait for ICE gathering to finish.
 */
const gatherICECandidates = () => new Promise<RTCIceCandidate[]>((resolve, reject) => {
  const iceCandidates: RTCIceCandidate[] = [];
  connectionManager.connection.onicecandidate = e => {
    console.log(e);
    const newCandidate = e.target as RTCIceCandidate | null;
    if (newCandidate === null) {
      resolve(iceCandidates);
    } else {
      // Otherwise we just got a new one.
      iceCandidates.push(newCandidate);
    }
  };
  setTimeout(() => {
    resolve(iceCandidates);
  }, 12000);
});

/**
 * Register the incoming rtc connection offer.
 */
export const registerIncomingOffer = createAsyncThunk(
  'connections/registerIncomingOffer',
  async (encodedOffer: string) => {
    const decodedOffer = window.atob(encodedOffer);
    const parsedOffer = JSON.parse(decodedOffer);
    const constructedOffer = new RTCSessionDescription(parsedOffer);
    return await connectionManager.connection.setLocalDescription(constructedOffer);
  } 
);

/**
 * Create a new outgoing offer to be sent to the peers.
 */
export const createOutgoingOffer = createAsyncThunk(
  'connections/createOutgoingOffer',
  async () => {
    // So this is a bit absurd but basically you need
    // to create an initial offer for ICE candidates to be gathered at all.
    connectionManager.connection.createDataChannel('game');
    // Set self address.
    const iceCandidates = await gatherICECandidates();
    console.log(iceCandidates);
    const offer = await connectionManager.connection.createOffer();
    console.log(connectionManager.connection.getConfiguration());
    connectionManager.connection.setLocalDescription(offer);
    const binaryEncodedOffer = window.btoa(JSON.stringify(offer));
    return `${window.location.host}/join?offer=${binaryEncodedOffer}`;
  }
);
