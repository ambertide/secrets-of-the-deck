/**
 * Make sure there is one, client generated connection.
 */
class ConnectionManager {
  private static peerConnection: RTCPeerConnection;

  constructor() {
    
  }

  get connection() {
    if (!ConnectionManager.peerConnection) {
      ConnectionManager.peerConnection = new RTCPeerConnection();
    }
    return ConnectionManager.peerConnection;
  }
}

export const connectionManager = new ConnectionManager();