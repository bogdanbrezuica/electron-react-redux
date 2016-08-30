import Dexie from "dexie";

let db;

function init() {
	db = new Dexie('Articles');
	db.version(1).stores({
		article: '++id'
	});

	db.open().catch((error) => {
		console.error('Couldn\'t open database ' + error);
	});
}

export function getAllArticles() {
	if (!db) {
		init();
	}

	return db.article.toArray();
}

export function saveArticle(article) {
	return db.transaction('rw', db.article, () => {
		db.article.put(article);
	});
}

export function deleteArticle(id) {
	return db.article.delete(id);
}