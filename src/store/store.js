import {createStore} from 'vuex';

export default createStore({
	state() {
		return {
			user: null,
			track: {
				queue: [],
				played: [],
			},
			playlists: {
				all: [],
				last_played: [],
			},
			new_releases: [],
			player: {
				playing: false,
				volume: 10,
				time: 0,
				duration: 0,
				buffered: 0,
			}
		};
	},
	mutations: {
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
		},
		SET_QUEUE(state, queue) {
			state.track.queue = queue;
		},
		REMOVE_FROM_QUEUE(state, q_item) {
			let index = state.track.queue.findIndex(item => item === q_item);
			if (index === -1)
				return;
			
			state.track.queue.splice(index, 1);
		},
		ADD_TO_PLAYED(state, q_item) {
			state.track.played.push(q_item);
		}
	},
	actions: {
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
			commit('SET_LAST_PLAYED_PLAYLISTS', playlists);
		},
		setNewReleases({commit}, releases) {
			commit('SET_NEW_RELEASES', releases);
		},
		setQueue({commit}, queue) {
			commit('SET_QUEUE', queue);
		},
		removeFromQueue({commit}, q_item) {
			commit('REMOVE_FROM_QUEUE', q_item);
		},
		addToPlayed({commit}, q_item) {
			commit('ADD_TO_PLAYED', q_item);
		}
	},
	getters: {
		lastPlayedPlaylists(state) {
			return state.playlists.last_played.concat(state.playlists.all.slice(0, 6 - state.playlists.last_played.length));
		},
		firstReleases(state) {
			return state.new_releases.slice(0, 5);
		},
		currentTrack(state) {
			return state.track.queue[0];
		}
	}
});
