function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

function generateUniqueName(namesList) {
	const names = [
		'Rachel',
		'Monica',
		'Phoebe',
		'Joey',
		'Chandler',
		'Ross',
		'Gunther',
		'Janice',
		'Emily',
		'Mike',
		'Carol',
	]
	const surnames = [
		'Green',
		'Geller',
		'Buffay',
		'Tribbiani',
		'Bing',
		'Waltham',
		'Hannigan',
		'Willick',
	]
	const fullName = `${names[getRandomInt(0, 11)]} ${surnames[
		getRandomInt(0, 8)
	]}`
	if (namesList.indexOf(fullName) === -1) {
		return fullName
	}
	return generateUniqueName(namesList)
}

function generateFriendsList() {
	let friendsList = []
	for (let i = 0; i < 50; i++) {
		const fullName = generateUniqueName(friendsList).split(' ')
		const name = fullName[0]
		const surname = fullName[1]
		const age = getRandomInt(21, 90)
		const gender = ['male', 'female'][getRandomInt(0, 2)]
		const birthDate = new Date(
			new Date().setFullYear(new Date().getFullYear() - age)
		)
		friendsList.push({
			name,
			surname,
			age,
			gender,
			birthDate,
		})
	}
	return friendsList
}

function renderPageMarkup() {
	return `
		<!doctype html>
		<html lang="utf-8">
			<head>
				<meta charset="UTF-8">
				<title>Friends</title>
				<link rel="stylesheet" href="/assets/main.css" />
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
			</head>
			<body>
				<div id="container"></div>
				<script type="text/javascript" src="/assets/bundle.js"></script>
			</body>
		</html>`
}

module.exports = { friendsList: generateFriendsList(), renderPageMarkup }

// fetch('/login', {
// 	method: 'post',
// 	headers: new Headers({
// 		'Content-Type': 'application/json'
// 	}),
// 	credentials: 'same-origin',
// 	body: JSON.stringify({ username: 'gunther@gmail.com', password: 'RnJpZW5kcw==' })
// }).then(function(res) { console.log(res) })

// fetch('/', {
// 	method: 'GET',
// 	headers: new Headers({
// 		'Accept': 'application/json'
// 	}),
// 	credentials: 'same-origin'
// }).then(function(res) { console.log(res) })
