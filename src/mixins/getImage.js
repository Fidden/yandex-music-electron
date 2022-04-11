export default {
	methods: {
		getImage(ogImage, size='100x100') {
			return `https://${ogImage.replace('%%', size)}`;
		},
	}
}
