export default {
	state: {
		all: []
	},
	mutations: {
		SET_CHART(state, value) {
			state.all = value;
		}
	},
	actions: {
		setChart({commit}, value) {
			commit('SET_CHART', value);
		}
	},
	getters: {
		firstChart(state) {
			return state.all.slice(0, 10);
		}
	}
};