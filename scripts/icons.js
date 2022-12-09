//@ts-check
import Jimp from "jimp";
import toIco from "to-ico";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const resizeImages = async (sizes) => {
  for (const size of sizes) {
    const icon = await Jimp.read(`${__dirname}/icon.png`);
    icon.resize(size, size).write(`${__dirname}/../static/favicon-${size}x${size}.png`);
  }
};

const generateIco = (sizes) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/icon.png`, (err, data) => {
      if (err) return reject(err);
      toIco(data, {
        resize: true,
        sizes,
      }).then((buf) => {
        fs.writeFile(`${__dirname}/../static/favicon.ico`, buf, (err) => {
          if (err) return reject(err);
          resolve(null);
        });
      });
    });
  });
};

(async () => {
  await generateIco([16, 24, 32, 48, 64, 96]);
  console.log("generated favicon");
  await resizeImages([8, 16, 24, 32, 48, 64, 72, 96, 128, 144, 168, 192, 256, 512, 1024]);
  console.log("generated images");
})();
