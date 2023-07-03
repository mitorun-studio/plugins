const sharp = require("sharp");

async function optimize() {
	try {
		await sharp("sharp/example.png")
			// Изменение разрешения картинки:
			.resize({
				width: 200,
				height: 200,
				fit: 'contain',
				position: 'center',
				background: { r: 255, g: 0, b: 0, alpha: 0.25 }
			})
			.png({
				colors: 128,// количество цветов, default "256".
				quality: 70,// использовать минимум цветов для заданного качества (0-100?), default "100".
				compressionLevel: 6,// сжатие "0"(fastest, largest) to "9"(slowest, smallest), default "6".
				effort: 7,// ресурсы процессора, "0-9", default "7".
			})
			// Изменение формата и качества картинки:
			.toFormat("jpeg", { mozjpeg: true })
			// Изменение имени и папки вывода картинки:
			.toFile("sharp/example-resized.jpeg")
			.then(() => console.log('SHARP DONE :)'));
	} catch (error) {
		console.log(error);
	}
}

optimize();
