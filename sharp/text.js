const sharp = require("sharp");

// addTextOnImage() – функция добавления текста на картинку, используя SVG-текст:
async function addTextOnImage() {
	try {
		const width = 750;
		const height = 483;
		const text = "Example text";
		// Создание SVG с текстом:
		const svgImage = `
		<svg width="${width}" height="${height}">
			<style>
			.title { fill: #001; font-size: 70px; font-weight: bold;}
			</style>
			<text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
		</svg>
		`;
		const svgBuffer = Buffer.from(svgImage);
		// Соединение картинки с SVG-текстом из буфера:
		const image = await sharp("sharp/example.png")
			.composite([
				{
					input: svgBuffer,
					top: 0,
					left: 0,
				},
			])
			.toFile("sharp/example-text-overlay.png")
			.then(() => console.log('Sharp done'));
	} catch (error) {
		console.log(error);
	}
}

addTextOnImage();
