import { createStore } from 'vuex';
import Player from './modules/Player';
import Track from './modules/Track';
import Playlists from './modules/Playlists';
import Releases from './modules/Releases';
import User from './modules/User';
import Chart from './modules/Chart';
import Stations from './modules/Stations.js';
import Artists from './modules/Artists.js';
import Page from './modules/Page.js';

export default new createStore({
	modules: {
		user: User,
		player: Player,
		track: Track,
		playlists: Playlists,
		releases: Releases,
		chart: Chart,
		stations: Stations,
		artists: Artists,
		page: Page,
	}
});
