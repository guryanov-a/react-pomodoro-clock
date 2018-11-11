import { AUDIO_SET, RESET, AUDIO_PLAY } from "../constants";

let playPromise;

const audio = (
  state = null,
  action,
) => {
  
  switch(action.type) {
    case AUDIO_SET:
      return action.audio;
    case AUDIO_PLAY:
      playPromise = state.play();
      return state;
    case RESET:
      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            state.pause();
            state.currentTime = 0;
          });
      }
      return state;
    default:
      return state;
  }
};

export default audio;