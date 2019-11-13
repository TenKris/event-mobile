/**
 * Get the first of monday of the week of the date
 * @param {moment} date
 */
export const getFirstMondayOfWeek = date => {
	return date.clone().startOf('week')
}

/**
 * Get the first monday of month and of the week
 * @param {moment} date
 */
export const getFirstMondayOfWeekAndMonth = date => {
	return date
		.clone()
		.startOf('month')
		.startOf('week')
}
/**
 * Get the last sunday of month and of the week
 * @param {moment} date
 */
export const getLastSundayOfWeekAndMonth = date => {
	return date
		.clone()
		.endOf('month')
		.endOf('week')
}

/**
 * Get the number of weeks inside month
 * @param {moment} date
 */
export const getNumberofWeeks = date => {
	return (
		date
			.clone()
			.endOf('month')
			.endOf('week')
			.diff(date.clone().startOf('week'), 'week') + 1
	)
}
