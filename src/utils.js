import { load } from "@fingerprintjs/botd";

function download(data, filename, type) {
  const blob = new Blob([data], { type });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    console.log("Sleeping:", ms, "ms");
    setTimeout(resolve, ms);
  });
}

async function isBot() {
  let ib = false;
  await load({
    monitoring: false,
  })
    .then((botd) => botd.detect())
    .then((result) => {
      console.log("Antibot result:", result);
      // dirty hack to bypass obfuscator renameProperties
      ib = Object.values(result).some((val) => val === true);
    })
    .catch((error) => {
      console.log("Antibot error:", error);
    });
  return ib;
}

export { download, isBot, sleep };
