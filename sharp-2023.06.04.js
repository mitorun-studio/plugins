const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Путь исходной и выходной папки:
//let myPathInput = './mitorun.studio/src/img_RAW/';
//let myPathOutput = 'mitorun.studio/src/img/';

// Передача пути в переменные при запуске:
const myPathInput = process.argv[2];
const myPathOutput = process.argv[3];

// Проверка, есть ли папка куда будут сохранены обработанные файлы. Если есть - пропускает, если нет - создаёт:
if (!fs.existsSync(myPathOutput)) {
  fs.mkdirSync(myPathOutput);
}

let totalSizeBefore = 0;
let totalSizeAfter = 0;

let filenames = fs.readdirSync(myPathInput);

const promises = filenames.map((file) => {
	const fileFormat = getExtension(file);
	// Код ниже позволяет пропускать SVG, иначе шарп их обрабатывает в растр(?):
	if (fileFormat === 'svg') {
		//console.log('sharp: SVG not processed');
		return;
	}

	const inputFile = myPathInput + file;
	const outputFile = myPathOutput + file;
	const inputSize = fs.statSync(inputFile).size;
	totalSizeBefore += inputSize;

	let sh = sharp(inputFile);
	if (fileFormat === 'jpg' || fileFormat === 'jpeg') {
		sh = sh.jpeg({
			quality: 70,// качество "1-100", default "80".
			mozjpeg: true,// Включить настройки mozjpeg, с ними меньше размер и медленнее, default false. Опыт: заметно меньше при таком же качестве - включать!
			//chromaSubsampling: '4:4:4',// Цветовая субдискретизация, с 4:4:4 качественнее и больше размер, default '4:2:0'. Опыт показывает что размер сильно увеличивает, а улучшения качества незаметно - не включать!
			//progressive: true,// Прогрессивная чересстрочная развертка, default false. Опыт показывает что размер сильно увеличивает, а улучшения качества незаметно - не включать!
			//optimiseCoding: false,// Оптимизировать по таблицам Хоффмана, default true.
			//force: false,// Принудительно выводит файлы в .jpeg, default true.
		});
	} else if (fileFormat === 'png') {
		sh = sh.png({
			quality: 40,// использовать минимум цветов для заданного качества (0-100?), default "100".
			//colors: 64,// макимальное количество цветов, default "256".
			dither: 0.0,// (Сглаживание?) Уровень диффузии ошибки Флойда-Стейнберга, от 0.0 до 1.0, default "1.0". Опыт: dither:0.0 уменьшает размер в 2-3 раза(!), только делает картинку пиксельной, надо изучить как картинки будут выглядеть на сайте.
			compressionLevel: 9,// сжатие zlib от "0"(fastest, largest) до "9"(slowest, smallest), default "6".
			effort: 9,// ресурсы процессора, от 0 (быстро некачественно) до 10 (медленно и качественно), default "7".
			palette: true,// Квантизация изображения на основе палитры с поддержкой альфа-канала, автоматом ставится true чтобы работали colors и quality, default false.
			//progressive: true,// Прогрессивная чересстрочная развертка, default false. Опыт: это делает файлы сильно тяжелей, качество незаметно - не применять!
			//adaptiveFiltering: true,// Адаптивная фильтрация строк, default false. Опыт: это делает файлы сильно тяжелей, качество незаметно - не применять!
			//force: false,// Принудительно выводит файлы в .png, default true.
		});
	}

  return sh.toFile(outputFile)
    .then((info) => {
      const outputSize = fs.statSync(outputFile).size;
      totalSizeAfter += outputSize;
    })
    .catch((err) => {
      console.log(`Sharp: ошибка при оптимизиции изображений: ${err.message}`);
    });
});

Promise.all(promises).then(() => {
  const compressionRatio = 1 - totalSizeAfter / totalSizeBefore;
  const compressionPercentage = Math.ceil(compressionRatio * 100);
  console.log(`Sharp: изображения были сжаты на ${compressionPercentage}%`);
});

function getExtension(filename) {
  let ext = path.extname(filename || '').split('.');
  return ext[ext.length - 1];
}
