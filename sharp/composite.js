const sharp = require("sharp");

async function compositeImages() {
	try {
		// Соединение изображений (например водяные знаки):
		await sharp("sharp/underwater.png")
			.composite([
				{
					input: "sharp/example-transparent.png",
					top: 50,
					left: 50,
				},
			])
			.toFile("sharp/example-underwater.png")
			.then(() => console.log('Sharp done'));
	} catch (error) {
		console.log(error);
	}
}

compositeImages()
