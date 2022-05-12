export default {
	methods: {
		GetImage(ogImage, size = '100x100') {
			return ogImage ? `https://${ogImage.replace('%%', size)}` : './assets/img/no-image.svg';
		},
	}
};
