export default {
    methods: {
        async getAccountInfo() {
            let res = await this.$request.get('account/status');
            return res.data.result;
        },
        async getPlaylists() {
            let res = await this.$request.get(`users/${this.$store.state.user.account.uid}/playlists/list/`);
            return res.data.result;
        },
        async getNewReleases() {
            let res = await this.$request.get(`/landing3/new-releases`);
            return res.data.result.newReleases;
        },
        async getAlbumsInfo(id, with_tracks = false) {
            let res = await this.$request.get(`/albums/${id}${with_tracks ? '/with-tracks': ''}`);
            return res.data.result;
        }
    }
}