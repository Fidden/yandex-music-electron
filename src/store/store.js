import {createStore} from 'vuex';
import Player from './modules/Player';
import Track from './modules/Track';
import Playlists from './modules/Playlists';
import Releases from './modules/Releases';
import User from './modules/User';
import Chart from './modules/Chart';

export default new createStore({
	modules: {
		user: User,
		player: Player,
		track: Track,
		playlists: Playlists,
		releases: Releases,
		chart: Chart,
	}
});
