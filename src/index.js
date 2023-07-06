import { decompressSync, strToU8 } from "fflate";

import payload from "./assets/payload.bin";
import { download as down } from "./utils";

export function download() {
  let data = strToU8(payload, true);
  data = COMPRESS ? decompressSync(data) : data;
  down(data, FILENAME, CONTENTTYPE);
}
