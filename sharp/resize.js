// Документация https://sharp.pixelplumbing.com/api-resize
const sharp = require("sharp");

async function resizeImage() {
	try {
		await sharp("sharp/example.png")
			// Изменение разрешения картинки:
			.resize({
				width: 200,
				height: 200,
				fit: 'contain',
				position: 'right top',
				background: { r: 255, g: 0, b: 0, alpha: 0.25 }
			})
			// Изменение формата и качества картинки:
			.toFormat("jpeg", { mozjpeg: true })
			// Изменение имени и папки вывода картинки:
			.toFile("sharp/example-resized.jpeg")
			.then(() => console.log('Sharp done'));
	} catch (error) {
		console.log(error);
	}
}

resizeImage();
