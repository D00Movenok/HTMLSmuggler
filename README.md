# HTMLSmuggler

HTMLSmuggler - JS payload generator for IDS bypass and payload delivery via HTML smuggling.

## Description

The primary objective of HTML smuggling is to bypass network security controls, such as firewalls and intrusion detection systems, by disguising malicious payloads within seemingly harmless HTML and JavaScript code. By exploiting the dynamic nature of web applications, attackers can deliver malicious content to a user's browser without triggering security alerts or being detected by traditional security mechanisms. Thanks to this technique, the download of a malicious file is not displayed in any way in modern IDS solutions.

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

3. Modify [javascript-obfuscator options](https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options) in `obfuscator.js`, default preset is nice, but very slow.
4. Compile your JS payload:

    ```bash
    yarn build -p /path/ot/payload -n file.exe -t "application/octet-stream" -c
    ```

5. Get your payload from `dist/index.js`, insert it into your page and call `download()` function.

## Usage

```text
Options:
  -p, --payload <string>  Path to payload file you want to smuggle
  -n, --name <string>     Name of file, that would be downloaded
  -c, --compress          Enable payload compression (gzip)
  -t, --type <string>     Contet-Type of downlonaded file (default: "application/octet-stream")
  -h, --help              Display help for command
```

## FAQ

Q: I have an error `RangeError: Maximum call stack size exceeded`, how to solve it?
A: This [issue described here](https://github.com/javascript-obfuscator/javascript-obfuscator/issues/89). To fix it, try to disable `splitStrings` in `obfuscator.js` or make smaller payload (it's recommended to use up to 2 MB payloads because of this issue).

Q: Why does my payload build so long?
A: The bigger payload you use, the longer it takes to create a JS file. To decrease time of build, try to disable `splitStrings` in `obfuscator.js`. Below is a table with estimated build times using default `obfuscator.js`.

| Payload size | Build time |
| --- | --- |
| 525 KB | 53 s |
| 1.25 MB | 8 m |
| 3.59 MB | 25 m |
