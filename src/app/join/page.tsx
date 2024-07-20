'use client';
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { RootState } from "@/lib";
import { AppDispatch } from "@/lib/store";
import { connect } from "react-redux";
import { registerIncomingOffer } from "@/lib/features/connections";
import { ConnectionStateType } from "@/lib/features/connections";

interface JoinProps {
  connectionState: ConnectionStateType,
  hasError: boolean,
  errorMessage: string,
  registerIncomingOffer: (offer: string) => void;
}

/**
 * Page to join a new game.
 */
function Join({
  connectionState,
  hasError,
  errorMessage,
  registerIncomingOffer
}: JoinProps) {
  const searchParams = useSearchParams();
  const encodedOffer = useMemo(
    () => searchParams.get('offer'),
    [searchParams]
  );

  useEffect(() => {
    if (encodedOffer && connectionState === ConnectionStateType.UNCONNECTED) {
      registerIncomingOffer(encodedOffer);
    }
  }, [
    encodedOffer,
    registerIncomingOffer,
    connectionState
  ]);

  return (<div>
    {hasError ? errorMessage : connectionState.toString()}
  </div>);
}

const mapStatetoProps = (state: RootState) => {
  const {
    connectionState,
    errorOnJoin: {
      hasError,
      message: errorMessage
    }
  } = state.connections;

  return {
    connectionState,
    hasError,
    errorMessage
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  registerIncomingOffer: (offer: string) => dispatch(registerIncomingOffer(offer))
});

export default connect(mapStatetoProps, mapDispatchToProps)(Join);