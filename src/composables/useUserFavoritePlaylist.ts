import usePlaylist from '@/composables/usePlaylist';
import { useUserStore } from '@/store/user';

export default async function useUserFavoritePlaylist() {
    const res = await usePlaylist(3, useUserStore().userId);
    res.title = 'Мне нравится';
    res.ogImage = 'music.yandex.ru/blocks/playlist-cover/playlist-cover_like.png';
    return res;
}
