import {createRouter, createWebHistory} from 'vue-router';
import HomePage from '../pages/HomePage';
import PlaylistPage from '../pages/PlaylistPage';
import AlbumPage from '../pages/AlbumPage';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
			name: 'home',
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
	]
});
