import { defineStore } from 'pinia';
import PlaylistInterface from '@/interfaces/PlaylistInterface';
import { Entity } from '@/interfaces/LandingBlocksInterface';

interface State {
    all: Array<PlaylistInterface>,
    hits: Array<Entity>,
}

export const usePlaylistStore = defineStore('playlist', {
    state: (): State => ({
        all: [],
        hits: []
    }),
    actions: {
        setPlaylists(playlists: Array<PlaylistInterface>) {
            this.all = playlists;
        },
        setHits(payload: Array<Entity>) {
            this.hits = payload;
        }
    }
});
