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
		async getPlaylistData(kind) {
			let res = await this.$request.get(`/users/${this.$store.state.user.account.uid}/playlists/${kind}`);
			return res.data.result;
		},
		async getNewReleases() {
			let res = await this.$request.get('/landing3/new-releases');
			return res.data.result.newReleases;
		},
		
		async getAlbum(id) {
			let res = await this.$request.get(`/albums/${id}`);
			return res.data.result;
		},
		async getAlbumData(id) {
			let res = await this.$request.get(`/albums/${id}/with-tracks`);
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
