const sharp = require("sharp");

async function cropImage() {
	try {
		await sharp("sharp/example.png")
			.extract({ width: 300, height: 300, left: 120, top: 70 })
			.grayscale()
			.toFile("sharp/example-cropped-grayscale.png")
			.then(() => console.log('Sharp done'));
	} catch (error) {
		console.log(error);
	}
}

cropImage();
