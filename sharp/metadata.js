const sharp = require("sharp");

async function getMetadata() {
	try {
		const metadata = await sharp("sharp/example.png").metadata();
		console.log(metadata);
	} catch (error) {
		console.log(`An error occurred during processing: ${error}`);
	}
}

getMetadata();
