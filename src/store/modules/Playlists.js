export default {
	state: {
		playlists: {
			all: [],
			last_played: [],
		}
	},
	mutations: {
		SET_USER_PLAYLISTS(state, playlists) {
			state.playlists.all = playlists;
		},
		SET_LAST_PLAYED_PLAYLISTS(state, playlists) {
			state.playlists.last_played = playlists;
		},
	},
	actions: {
		setPlaylists({commit}, playlists) {
			commit('SET_USER_PLAYLISTS', playlists);
		},
		setLastPlayedPlaylist({commit}, playlists) {
			commit('SET_LAST_PLAYED_PLAYLISTS', playlists);
		},
	},
	getters: {
		lastPlayedPlaylists(state) {
			return state.playlists.last_played.concat(state.playlists.all.slice(0, 6 - state.playlists.last_played.length));
		},
	}
};
