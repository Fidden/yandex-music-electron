export default {
	methods: {
		GetImage(ogImage, size='100x100') {
			return `https://${ogImage.replace('%%', size)}`;
		},
	}
};
