# Component QInputEx and Directive v-my-directive

[![npm](https://img.shields.io/npm/v/quasar-ui-qinputex.svg?label=quasar-ui-qinputex)](https://www.npmjs.com/package/quasar-ui-qinputex)
[![npm](https://img.shields.io/npm/dt/quasar-ui-qinputex.svg)](https://www.npmjs.com/package/quasar-ui-qinputex)

**Compatible with Quasar UI v2 and Vue 3**.


# Component QInputEx
> Short description of the component



# Directive v-my-directive
> Short description of the directive


# Usage

## Quasar CLI project


Install the [App Extension](../app-extension).

**OR**:


Create and register a boot file:

```js
import { createApp } from 'vue'
import Plugin from 'quasar-ui-qinputex'
import 'quasar-ui-qinputex/dist/index.css'

const app = createApp({})
app.use(Plugin)
```

**OR**:

```html
<style src="quasar-ui-qinputex/dist/index.css"></style>

<script>
import { QInputEx, Directive } from 'quasar-ui-qinputex'

export default {
  
  components: {
    QInputEx
  },
  
  
  directives: {
    Directive
  }
  
}
</script>
```

## Vue CLI project

```js
import { createApp } from 'vue'
import Plugin from 'quasar-ui-qinputex'
import 'quasar-ui-qinputex/dist/index.css'

const app = createApp({})
app.use(Plugin)
```

**OR**:

```html
<style src="quasar-ui-qinputex/dist/index.css"></style>

<script>
import { QInputEx, Directive } from 'quasar-ui-qinputex'

export default {
  
  components: {
    QInputEx
  },
  
  
  directives: {
    Directive
  }
  
}
</script>
```

## UMD variant

Exports `window.qinputex`.

Add the following tag(s) after the Quasar ones:

```html
<head>
  <!-- AFTER the Quasar stylesheet tags: -->
  <link href="https://cdn.jsdelivr.net/npm/quasar-ui-qinputex/dist/index.min.css" rel="stylesheet" type="text/css">
</head>
<body>
  <!-- at end of body, AFTER Quasar script(s): -->
  <script src="https://cdn.jsdelivr.net/npm/quasar-ui-qinputex/dist/index.umd.min.js"></script>
</body>
```
If you need the RTL variant of the CSS, then go for the following (instead of the above stylesheet link):
```html
<link href="https://cdn.jsdelivr.net/npm/quasar-ui-qinputex/dist/index.rtl.min.css" rel="stylesheet" type="text/css">
```

# Setup
```bash
$ yarn
```

# Developing
```bash
# start dev in SPA mode
$ yarn dev

# start dev in UMD mode
$ yarn dev:umd

# start dev in SSR mode
$ yarn dev:ssr

# start dev in Cordova iOS mode
$ yarn dev:ios

# start dev in Cordova Android mode
$ yarn dev:android

# start dev in Electron mode
$ yarn dev:electron
```

# Building package
```bash
$ yarn build
```

# Adding Testing Components
in the `ui/dev/src/pages` you can add Vue files to test your component/directive. When using `yarn dev` to build the UI, any pages in that location will automatically be picked up by dynamic routing and added to the test page.

# Adding Assets
If you have a component that has assets, like language or icon-sets, you will need to provide these for UMD. In the `ui/build/script.javascript.js` file, you will find a couple of commented out commands that call `addAssets`. Uncomment what you need and add your assets to have them be built and put into the `ui/dist` folder.

# Donate
If you appreciate the work that went into this, please consider [donating to Quasar](https://donate.quasar.dev).

# License
MIT (c) Riceball LEE <snowyu.lee@gmail.com>
