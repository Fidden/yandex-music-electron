export default {
	state: {
		all: [],
		last_played: [],
		hits: []
	},
	mutations: {
		SET_USER_PLAYLISTS(state, playlists) {
			state.all = playlists;
		},
		SET_LAST_PLAYED_PLAYLISTS(state, playlists) {
			state.last_played = playlists;
		},
		SET_HITS_PLAYLISTS(state, playlists) {
			state.hits = playlists;
		}
	},
	actions: {
		setPlaylists({commit}, playlists) {
			commit('SET_USER_PLAYLISTS', playlists);
		},
		setHitsPlaylists({commit}, playlists) {
			commit('SET_HITS_PLAYLISTS', playlists);
		},
		setLastPlayedPlaylist({commit}, playlists) {
			commit('SET_LAST_PLAYED_PLAYLISTS', playlists);
		},
	},
	getters: {
		lastPlayedPlaylists(state) {
			return state.last_played.concat(state.all.slice(0, 6 - state.last_played.length));
		},
		firstHits(state) {
			return state.hits.slice(0, 5);
		}
	}
};
