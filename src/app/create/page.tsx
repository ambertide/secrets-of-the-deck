"use client";
import { CopyButton } from './CopyButton';
import { RootState } from "@/lib";
import { AppDispatch } from "@/lib/store";
import { ConnectionStateType, createOutgoingOffer } from "@/lib/features/connections";
import { connect } from "react-redux";
import { useEffect } from "react";

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
  if (connectionState === ConnectionStateType.UNCONNECTED) {
    return (
      <section className=" w-full flex flex-col items-center justify-center gap-5"> 
        <p className=" text-xl w-6/12">
          Calculating your destiny...
        </p>
      </section>
    );
  } else if (connectionState === ConnectionStateType.AWAITING) {
    return (
      <section className=" w-full flex flex-col items-center justify-center gap-5">
        <p className=" text-xl w-6/12">
        Click the bellow button when the planets align to generate
        a link between you and your friends, once they press the link
        your destinies will be aligned with the cards&apos;.
        </p>
        <section className=" w-full flex justify-center">
          <CopyButton link={offer}/>
        </section>
      </section>
    );
  } else {
    return (
      <section className=" w-full flex flex-col items-center justify-center gap-5">
        <p className=" text-xl w-6/12">
          Connection completed!
        </p>
        <section className=" w-full flex justify-center">
          <CopyButton link={offer}/>
        </section>
      </section> 
    );
  }
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
