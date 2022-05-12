export default {
	state: {
		shuffle: false,
		track_index: -1,
		playing: false,
	},
	mutations: {
		SET_SHUFFLE(state, value) {
			state.shuffle = value;
		},
		SET_TRACK_INDEX(state, index) {
			state.track_index = index;
		},
		SET_PLAYING(state, value) {
			state.playing = value;
		},
	},
	actions: {
		setShuffle({commit}, value) {
			commit('SET_SHUFFLE', value);
		},
		setTrackIndex({commit}, value) {
			commit('SET_TRACK_INDEX', value);
		},
		setPlaying({commit}, value) {
			commit('SET_PLAYING', value);
		},
	}
};
