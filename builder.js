/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require("fs");
const { program } = require("commander");
const webpack = require("webpack");
const fflate = require("fflate");
const webpackConfig = require("./webpack.config");

program
  .requiredOption(
    "-p, --payload <string>",
    "Path to payload file you want to smuggle"
  )
  .requiredOption(
    "-n, --name <string>",
    "Name of file, that would be downloaded"
  )
  .option(
    "-t, --type <string>",
    "Contet-Type of downlonaded file",
    "application/octet-stream"
  )
  .option("-c, --compress", "Enable payload compression (gzip)");

program.parse();

console.log("Using payload:", program.opts().payload);
console.log("Using filename:", program.opts().name);
console.log("Using Content-Type:", program.opts().type);

const dst = "src/assets/payload.bin";
fs.readFile(program.opts().payload, { encoding: "utf8" }, (err, data) => {
  if (err) throw err;

  const payload = program.opts().compress
    ? fflate.compressSync(fflate.strToU8(data), { level: 9, mem: 12 })
    : data;
  console.log("Payload size:", payload.length);

  fs.writeFile(dst, payload, { flag: "w+" }, (err2) => {
    if (err2) throw err2;

    const compiler = webpack(
      webpackConfig({
        type: program.opts().type,
        name: program.opts().name,
        compress: program.opts().compress,
      })
    );
    compiler.run((err3, stats) => {
      if (err3) throw err3;
      console.log(
        stats.toString({
          colors: true,
        })
      );
    });
  });
});
