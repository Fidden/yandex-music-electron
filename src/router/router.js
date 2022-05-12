import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage';
import PlaylistPage from '../pages/PlaylistPage';
import AlbumPage from '../pages/AlbumPage';
import StationPage from '../pages/StationPage.vue';
import TracksPage from '../pages/TracksPage.vue';
import ArtistsPage from '../pages/ArtistsPage.vue';
import ArtistPage from '../pages/ArtistPage.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
			name: 'home'
		},
		{
			path: '/station',
			component: StationPage,
			name: 'station'
		},
		{
			path: '/tracks',
			component: TracksPage,
			name: 'tracks'
		},
		{
			path: '/playlist/:kind',
			component: PlaylistPage,
			name: 'playlist'
		},
		{
			path: '/album/:id',
			component: AlbumPage,
			name: 'album'
		},
		{
			path: '/artists',
			component: ArtistsPage,
			name: 'artists'
		},
		{
			path: '/artist/:id',
			component: ArtistPage,
			name: 'artist'
		}
	]
});
