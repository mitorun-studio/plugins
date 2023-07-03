const sharp = require("sharp");

async function rotateImage() {
	try {
		await sharp("sharp/example.png")
			.rotate(33, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
			.blur(8)
			.toFile("sharp/example-rotated-blurred.png")
			.then(() => console.log('Sharp done'));
	} catch (error) {
		console.log(error);
	}
}

rotateImage();
