export default {
	state: {
		account: null
	},
	mutations: {
		SET_USER(state, user) {
			state.account = user.account;
		},
	},
	actions: {
		setUser({commit}, user) {
			commit('SET_USER', user);
		},
	}
};
