// const nodes = [0, 1, 2, 3, 4, 5, 6];
// const edges = [
// 	[1, 2],
// 	[3, 5],
// 	[4, 6],
// ];

// const matrix = [
// 	[0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 1, 0, 0, 0, 0],
// 	[0, 1, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 1, 0],
// 	[0, 0, 0, 0, 0, 0, 1],
// 	[0, 0, 0, 1, 0, 0, 0],
// 	[0, 0, 0, 0, 1, 0, 0],
// ];

// const matrix = [
// 	[0, 1, 0, 1, 0, 0],
// 	[1, 0, 1, 1, 0, 1],
// 	[0, 1, 0, 0, 0, 0],
// 	[1, 1, 0, 0, 1, 0],
// 	[0, 0, 0, 1, 0, 1],
// 	[0, 1, 0, 0, 1, 0],
// ];

// const nodes = [0, 1, 2, 3];
// const edges = [
// 	[0, 1],
// 	[1, 3],
// 	[0, 2],
// 	[3, 2],
// ];

// const matrix = [
// 	[0, 1, 1, 0],
// 	[1, 0, 0, 1],
// 	[0, 0, 0, 0],
// 	[0, 0, 1, 0],
// ];

// const nodes = [0, 1, 2];
// const edges = [
// 	[0, 1, 3],
// 	[0, 2, 1],
// 	[2, 3, 1],
// ];

// const matrix = [
// 	[0, 3, 1],
// 	[0, 0, 0],
// 	[0, 0, 1],
// ];

// const nodes = [0, 1, 2, 3];
// const edges = [
// 	[0, 0],
// 	[0, 1],
// 	[0, 1],
// 	[0, 1],
// 	[1, 1],
// 	[1, 3],
// 	[2, 2],
// 	[2, 2],
// ];

const users = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const relationships = [
	[0, 3],
	[1, 3],
	[1, 4],
	[2, 5],
	[3, 6],
	[4, 6],
	[4, 7],
	[4, 10],
	[5, 7],
	[6, 8],
	[6, 10],
	[7, 8],
	[7, 9],
	[8, 10],
	[10, 11],
];

const matrix = getMatrix(users, relationships);

// console.log(matrix);
// console.log(getFriends(matrix, 8, 2));

function getFriends(matrix, ctrlIndex, round) {
	if (round === 0) {
		return;
	}

	const friends = [];

	for (let index = 0; index < matrix[ctrlIndex].length; index++) {
		if (matrix[ctrlIndex][index]) {
			friends.push(index);
		}
	}

	if (round === 1) {
		return friends;
	}

	if (round === 2) {
		let friends2 = [];

		for (const friend of friends) {
			friends2.push(...getFriends(matrix, friend, 1));
		}

		friends2 = friends2.filter((friend) => {
			if (friend === ctrlIndex) {
				return false;
			}

			if (friends.includes(friend)) {
				return false;
			}

			return true;
		});

		friends2 = [...new Set(friends2)];

		return friends2;
	}
}

function getMatrix(nodes, edges) {
	const matrix = [];

	for (let i = 0; i < nodes.length; i++) {
		const row = [];

		for (let j = 0; j < nodes.length; j++) {
			row.push(0);
		}

		matrix.push(row);
	}

	for (const [a, b] of edges) {
		matrix[a][b] = 1;
		matrix[b][a] = 1;
	}

	return matrix;
}

console.log(matrix);

// searchByWidth(matrix, 8, (x) => {
// 	console.log(x);
// });

searchByHeight(matrix, 8, (x) => {
	console.log(x);
});

function searchByWidth(matrix, ctrlIndex, callback) {
	const checked = [];
	const forCheck = [ctrlIndex];

	while (forCheck.length) {
		const node = forCheck.shift();
		checked.push(node);

		callback(node);

		for (let i = 0; i < matrix[node].length; i++) {
			const friend = matrix[node][i];

			if (friend && !checked.includes(i) && !forCheck.includes(i)) {
				forCheck.push(i);
			}
		}
	}
}

function searchByHeight(matrix, ctrlIndex, callback) {
	const checked = [];

	searchByHeightMaster(ctrlIndex);

	function searchByHeightMaster(currentIndex) {
		checked.push(currentIndex);
		callback(currentIndex);

		for (let i = 0; i < matrix[currentIndex].length; i++) {
			if (matrix[currentIndex][i] && !checked.includes(i)) {
				searchByHeightMaster(i);
			}
		}
	}
}
