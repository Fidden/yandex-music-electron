import { defineStore } from 'pinia';
import PlaylistInterface from '@/interfaces/PlaylistInterface';
import { Entity } from '@/interfaces/LandingBlocksInterface';
import PersonalPlaylistInterface from '@/interfaces/PersonalPlaylistsInterface';

interface State {
    all: Array<PlaylistInterface>;
    hits: Array<Entity>;
    personal: Array<PersonalPlaylistInterface>;
}

export const usePlaylistStore = defineStore('playlist', {
    state: (): State => ({
        all: [],
        hits: [],
        personal: []
    }),
    actions: {
        setPlaylists(playlists: Array<PlaylistInterface>) {
            this.all = playlists;
        },
        setHits(payload: Array<Entity>) {
            this.hits = payload;
        },
        setPersonal(payload: Array<PersonalPlaylistInterface>) {
            this.personal = payload;
        }
    }
});
