import {createRouter, createWebHistory} from "vue-router";
import HomePage from "../pages/HomePage";
import ItemTracksPage from "../pages/ItemTracksPage";

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
			name: 'home',
		},
		{
			path: '/item/:id',
			component: ItemTracksPage,
			name: 'tracks'
		}
	]
})
