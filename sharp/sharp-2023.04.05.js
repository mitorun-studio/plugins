const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

let directory_name = 'gamebeat.studio/src/img_RAW';

let filenames = fs.readdirSync(directory_name);

filenames.forEach((file) => {
	const fileFormat = getExtension(file);
	if (fileFormat === 'svg') {
		console.log('sharp: SVG not processed');
		return;
	}

	let sh = sharp('./gamebeat.studio/src/img_RAW/' + file);
	if (fileFormat === 'jpg' || fileFormat === 'jpeg') {
		sh = sh.jpeg({
			quality: 70,// качество "1-100", default "80".
			mozjpeg: true,// Включить настройки mozjpeg, с ними меньше размер и медленнее, default false.
			//chromaSubsampling: '4:4:4',// Цветовая субдискретизация, с 4:4:4 качественнее и больше размер, default '4:2:0'.
			//progressive: true,// Прогрессивная чересстрочная развертка, default false.
			//optimiseCoding: false,// Оптимизировать по таблицам Хоффмана, default true.
			//force: false,// Принудительно выводит файлы в .jpeg, default true.
		});
	} else if (fileFormat === 'png') {
		sh = sh.png({
			quality: 70,// использовать минимум цветов для заданного качества (0-100?), default "100".
			colors: 64,// макимальное количество цветов, default "256".
			palette: true,// Квантизация изображения на основе палитры с поддержкой альфа-канала, нужно ставить true чтобы работали colors и quality, default false.
			compressionLevel: 9,// сжатие zlib от "0"(fastest, largest) до "9"(slowest, smallest), default "6".
			effort: 9,// ресурсы процессора, от 0 (быстро некачественно) до 10 (медленно и качественно), default "7".
			//progressive: true,// Прогрессивная чересстрочная развертка, default false.
			//adaptiveFiltering: true,// Адаптивная фильтрация строк, default false.
			//dither: 1.0,// Уровень диффузии ошибки Флойда-Стейнберга, default "1.0".
			//force: false,// Принудительно выводит файлы в .png, default true.
		});
	}

	sh.toFile('gamebeat.studio/src/img/' + file, function (err, info) {
		console.log(info);
		if (err) {
			console.log('sharp: error in image optimization');
			return;
		}
	});
});

function getExtension(filename) {
	let ext = path.extname(filename || '').split('.');
	return ext[ext.length - 1];
}
