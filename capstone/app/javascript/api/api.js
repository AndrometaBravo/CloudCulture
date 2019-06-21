
//////// users fetches/////////////


let getUsers = function() {
	return fetch('/allusers.json')
		.then((resp) => {
			let json = resp.json()
			console.log(json);
			return json
		})
}

export  {
	getUsers
}

let oneUser = function(id) {
	return fetch(`/users/${id}.json`)
		.then((resp) => {
			let json = resp.json()
			console.log(json);
			return json
		})
}

export  {
	oneUser
}

let myFriends = function() {
	return fetch(`/friends.json`)
		.then((resp) => {
			let json = resp.json()
			console.log(json);
			return json
		})
}

export  {
	myFriends
}
