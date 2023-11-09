/* FUBCTION TO SEARCH IN A SORTED ARRAY */
/* THIS FUNCTION RECEIVES AN ARRAY TO LOOK FOR A TARGET IN A KEY */
function binarySearch (array, target, key)
{
	let min = 0;
	let max = array.length - 1;
	while (min <= max)
	{
		let guess = Math.floor((max + min) / 2);
		let testValue = parseInt(array[guess][`${key}`]);
		if (testValue === target)
			return guess;
		(testValue < target) ? min = guess + 1 : max = guess - 1;
	}
	return -1;
}
module.exports = { binarySearch };