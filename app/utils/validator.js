const validate = (value, rules) => {
	let obj = {
		valid: true,
		errors: []
	}

	for (let rule in rules) {
		switch (rule) {
			case 'require':
				if (requireValidator(value, rules[rule])) break
				obj.errors.push({
					rule: rule,
					message: 'Ce champs est obligatoire !'
				})
				break

			case 'minLength':
				if (minLengthValidator(value, rules[rule])) break
				obj.errors.push({
					rule: rule,
					message: `Le champ doit contenir au moins ${rules[rule]} caractères !`
				})
				break

			case 'isEmail':
				if (emailValidator(value)) break
				obj.errors.push({
					rule: rule,
					message: `Vous devez saisir un email valide !`
				})
				break
		}
	}

	obj.valid = obj.errors.length === 0
	return obj
}
export default validate

/**
 * Check if value is not empty or whitespace
 * @param value
 * @param active
 */
const requireValidator = (value, active) => {
	return !active || value.trim() !== ''
}

/**
 * minLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const minLengthValidator = (value, minLength) => {
	return value.length >= minLength
}

/**
 * Email validation
 *
 * @param value
 * @return
 */
const emailValidator = value => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(value).toLowerCase())
}
