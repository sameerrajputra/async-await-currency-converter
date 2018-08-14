const users = [{
	id: 1,
	name: 'Samir',
	schoolId: 123
}, {
	id: 2,
	name: 'Hari',
	schoolId: 156
}];

const grades = [{
	id: 1,
	schoolId: 123,
	grade: 86
}, {
	id: 2,
	schoolId: 156,
	grade: 100
}, {
	id: 1,
	schoolId: 123,
	grade: 80
}];

const getUser = (id) => {
	return new Promise((resolve, reject) => {
		const user = users.find((user) => user.id === id);
	
		if(user) {
			resolve(user);
		}else {
			reject(`Unable to find the user of id: ${id}`);
		}
	});
};

const getGrades = (schoolId) => {
	return new Promise((resolve, reject) => {
		resolve(grades.filter((grades) => grades.schoolId === schoolId));
	})
};

const getStatus = (userId) => {
	let user;
	return getUser(userId).then((tempUser) => {
		user = tempUser;
		return getGrades(user.schoolId);
	}).then((grades) => {	//here we do not have acces to user
		var average = 0;
		if(grades.length > 0){
			average = grades.map((grade) => grade.grade).reduce((a, b) => a+b) / grades.length;
		}
		console.log(`${user.name} has average score of ${average}`);
	});
};

const getStatusAlt = async (userId) => {
	const user = await getUser(userId);
	const grades = await getGrades(user.schoolId);
		
	var average = 0;
	if(grades.length > 0){
		average = grades.map((grade) => grade.grade).reduce((a, b) => a+b) / grades.length;
	}
	console.log(`${user.name} has average score of ${average}`);
	

};

getStatusAlt(1).then((status) => {
	console.log(status);
}).catch((e) => {
	console.log(e);
})


getUser(9).then((user) => {
	console.log(user);
}).catch((e) => {
	console.log(e);
})

// getGrades(15).then((grade) => {
// 	console.log(grade);
// }).catch((e) => {
// 	console.log(e);
// })

// getStatus(1).then((status) => {
// 	console.log(status);
// }).catch((e) => {
// 	console.log(e);
// })