"use client";
import { CopyButton } from './CopyButton';
import { RootState } from "@/lib";
import { AppDispatch } from "@/lib/store";
import { ConnectionStateType, createOutgoingOffer } from "@/lib/features/connections";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Intro } from './intro';

interface CreateProps {
  offer: string;
  connectionState: ConnectionStateType;
  createOutgoingOffer: () => void;
}

function Create({
  offer,
  connectionState,
  createOutgoingOffer
}: CreateProps) {
  useEffect(() => {
    createOutgoingOffer();
  }, [createOutgoingOffer]);
  return (
    <section className=" w-full flex flex-col items-center justify-center gap-5">
      <Intro
        offer={offer}
        connectionState={connectionState}
      />
    </section>
  );
}

function mapStatetoProps(state: RootState) {
  const { connectionState, outgoingOffer } = state.connections;
  return {
    offer: outgoingOffer,
    connectionState 
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    createOutgoingOffer: () => dispatch(createOutgoingOffer())
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(Create);
