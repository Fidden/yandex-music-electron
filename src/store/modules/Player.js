export default {
	state: {
		shuffle: false,
	},
	mutations: {
		SET_SHUFFLE(state, value) {
			state.shuffle = value;
		}
	},
	actions: {
		setShuffle({commit}, value) {
			commit('SET_SHUFFLE', value);
		}
	}
};
