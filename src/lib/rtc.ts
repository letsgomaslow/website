import { REALTIME_URL, AIMessage, SessionConfig } from './constants';

export class RTCManager {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private audioStream: MediaStream | null = null;
  private tracks: RTCRtpSender[] = [];

  constructor(private onMessage: (message: AIMessage) => void) {
    this.audioElement = document.createElement('audio');
    this.audioElement.autoplay = true;
  }

  async startSession(sessionToken: string): Promise<void> {
    try {
      const pc = new RTCPeerConnection();
      
      // Handle remote audio stream
      pc.ontrack = (e) => {
        if (this.audioElement) {
          this.audioElement.srcObject = e.streams[0];
        }
      };

      // Set up local audio stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => {
        const sender = pc.addTrack(track, stream);
        if (sender) this.tracks.push(sender);
      });

      // Create data channel
      const dc = pc.createDataChannel('oai-events');
      dc.onmessage = (e) => this.onMessage(JSON.parse(e.data));
      this.dataChannel = dc;

      // Create and set local description
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Get remote description from OpenAI
      const response = await fetch(`${REALTIME_URL}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/sdp'
        },
        body: offer.sdp
      });

      const answer = await response.text();
      await pc.setRemoteDescription({
        type: 'answer',
        sdp: answer
      });

      this.peerConnection = pc;
      this.audioStream = stream;
    } catch (error) {
      console.error('Failed to start RTCSession:', error);
      throw error;
    }
  }

  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioStream = stream;

      if (this.tracks.length > 0) {
        const track = stream.getAudioTracks()[0];
        this.tracks.forEach(sender => sender.replaceTrack(track));
      } else if (this.peerConnection) {
        stream.getTracks().forEach(track => {
          const sender = this.peerConnection?.addTrack(track, stream);
          if (sender) this.tracks.push(sender);
        });
      }
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw error;
    }
  }

  stopRecording(): void {
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
    }

    // Replace with silent track
    const silentTrack = this.createSilentAudioTrack();
    this.tracks.forEach(sender => sender.replaceTrack(silentTrack));
  }

  private createSilentAudioTrack(): MediaStreamTrack {
    const ctx = new AudioContext();
    const dest = ctx.createMediaStreamDestination();
    return dest.stream.getAudioTracks()[0];
  }

  sendEvent(event: SessionConfig): void {
    if (this.dataChannel?.readyState === 'open') {
      event.event_id = event.event_id || crypto.randomUUID();
      this.dataChannel.send(JSON.stringify(event));
    }
  }

  cleanup(): void {
    this.stopRecording();
    this.dataChannel?.close();
    this.peerConnection?.close();
    this.peerConnection = null;
    this.dataChannel = null;
    this.tracks = [];
  }
}