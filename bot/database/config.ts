const { logger } = require("../log/logconfig.ts");

var { dotenv } = require("dotenv").config();
var MongoClient = require("mongodb").MongoClient;

var url = process.env.DB_URL;

export function ddbbConfig() {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			throw err;
		}

		var dbo = db.db("discord-bot");

		// if (!db.getCollection("users").exists()) {
		// 	dbo.createCollection("users", function (err, res) {
		// 		if (err) {
		// 			throw err;
		// 		}
		// 		console.log("users Collection created!");

		// 		db.close();
		// 	});
		// }
	});
}
