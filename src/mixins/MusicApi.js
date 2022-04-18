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
		async getPlaylistData(kind, uid = null) {
			if (uid == null)
				uid = this.$store.state.user.account.uid;

			let res = await this.$request.get(`/users/${uid}/playlists/${kind}`);
			return res.data.result;
		},
		async getNewReleases() {
			let res = await this.$request.get('/landing3/new-releases');
			return res.data.result.newReleases;
		},
		async getHitsPlaylists() {
			let res = await this.$request.get('/landing3/new-playlists');
			return res.data.result.newPlaylists;
		},
		async getAlbum(id) {
			let res = await this.$request.get(`/albums/${id}`);
			return res.data.result;
		},
		async getAlbumData(id) {
			let res = await this.$request.get(`/albums/${id}/with-tracks`);
			let album = res.data.result;

			album.volumes[0].forEach((item, index) => {
				album.volumes[0][index] = {track: item};
			});

			return album;
		},
		async getChart() {
			let res = await this.$request.get('/landing3/chart');
			return res.data.result;
		},
		async getHomepageData() {
			let res = await this.$request.get('https://api.music.yandex.net/landing3?blocks=personalplaylists%2Cpromotions%2Cnew-releases%2Cnew-playlists%2Cmixes%2Cchart%2Ccharts%2Cartists%2Calbums%2Cplaylists%2Cplay_contexts%2Cpodcasts');
			return res.data.result;
		},
		async getTrackDirectLink(track_id) {
			//получение листа возможных битрейтов и типов трека
			let res = await this.$request.get(`tracks/${track_id}/download-info`);
			//загрузка данных xml
			let xml_file = await this.$request.get(res.data.result[0].downloadInfoUrl); //format=json
			//создаем элемент чтоб затем распарсить
			let html_file = document.createElement('div');
			html_file.innerHTML = xml_file.data;

			//xml парсинг эленента
			let host = html_file.getElementsByTagName('host')[0].childNodes[0].nodeValue;
			let path = html_file.getElementsByTagName('path')[0].childNodes[0].nodeValue;
			let ts = html_file.getElementsByTagName('ts')[0].childNodes[0].nodeValue;
			let s = html_file.getElementsByTagName('s')[0].childNodes[0].nodeValue;

			let sign = require('crypto')
				.createHash('md5')
				.update(`XGRlBW9FXlekgbPrRHuSiA${path.slice(1)}${s}`)
				.digest('hex');

			return `https://${host}/get-mp3/${sign}/${ts}${path}`;
		}
	}
};
