import { AUDIO_SET, RESET, AUDIO_PLAY } from "../constants";

const audio = (
  state = null,
  action,
) => {
  switch(action.type) {
    case AUDIO_SET:
      return action.audio;
    case AUDIO_PLAY:
      state.play();
      return state;
    case RESET:
      state.pause();
      state.currentTime = 0;
      return state;
    default:
      return state;
  }
};

export default audio;