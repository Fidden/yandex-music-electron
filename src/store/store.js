import {createStore} from "vuex";

export default createStore({
	state() {
		return {
			user: null,
			track: {
				current: null,
				queue: [],
				played: [],
			},
			playlists: {
				all: [],
				last_played: [],
			},
			new_releases: [],
		}
	},
	mutations: {
		SET_CURRENT_TRACK(state, track) {
			state.track.current = track;
		},
		SET_USER(state, user) {
			state.user = user;
		},
		ADD_TRACK_TO_QUEUE(state, track) {
			state.track.queue.push(track);
		},
		SET_USER_PLAYLISTS(state, playlists) {
			state.playlists.all = playlists;
		},
		SET_LAST_PLAYED_PLAYLISTS(state, playlists) {
			state.playlists.last_played = playlists;
		},
		SET_NEW_RELEASES(state, releases) {
			state.new_releases = releases;
		}
	},
	actions: {
		setCurrentTrack({commit}, track) {
			commit('SET_CURRENT_TRACK', track);
		},
		setUser({commit}, user) {
			commit('SET_USER', user);
		},
		addTrackToQueue({commit}, track) {
			commit('ADD_TRACK_TO_QUEUE', track);
		},
		setPlaylists({commit}, playlists) {
			commit('SET_USER_PLAYLISTS', playlists);
		},
		setLastPlayedPlaylist({commit}, playlists) {
			commit('SET_LAST_PLAYED_PLAYLISTS', playlists)
		},
		setNewReleases({commit}, releases) {
			commit('SET_NEW_RELEASES', releases)
		}
	},
	getters: {
		lastPlayedPlaylists(state) {
			return state.playlists.last_played.concat(state.playlists.all.slice(0, 6 - state.playlists.last_played.length));
		},
		firstReleases(state) {
			return state.new_releases.slice(0, 5);
		}
	}
})
