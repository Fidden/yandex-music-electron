export default {
    methods: {
        getArtist(artists) {
            return artists.map(item => item.name).toString().replace(',', ', ');
        }
    }
}