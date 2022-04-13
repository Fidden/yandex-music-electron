export default {
	methods: {
		//convert milliseconds to minutes
		//todo: make conversion to hours
		ConvertDuration(milliseconds) {
			const date = new Date(milliseconds);
			return `${date.getMinutes()}:${date.getSeconds() < 10
				? `0${date.getSeconds()}`
				: date.getSeconds()}`;
		}
	}
};
