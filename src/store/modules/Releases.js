export default {
	state: {
		new: [],
	},
	mutations: {
		SET_NEW_RELEASES(state, releases) {
			state.new = releases;
		},
	},
	actions: {
		setNewReleases({commit}, releases) {
			commit('SET_NEW_RELEASES', releases);
		},
	},
	getters: {
		firstReleases(state) {
			return state.new.slice(0, 5);
		}
	}
};
