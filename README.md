# @jcamp/tailwindcss-plugin-animate

<div align="center">
  <img src="./.github/tailwindcss-mark.svg" alt="Tailwind CSS" width="108" height="66">
  <h1>Tailwind CSS Animation Plugin</h1>
  <p>An updated animation plugin for Tailwind CSS v3</p>
</div>

Easily add animations to your Tailwind projects. Uses the animations from [animate.css](https://github.com/animate-css/animate.css) but through Tailwind's system.

```html
<div class="animate-shake-x animate-delay animate-infinite">(icon)</div>
```

Keyframes are only added to the generated CSS if an animation using them is added.

## Install

```bash
npm i -D @jcamp/tailwindcss-plugin-animate
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
const animate = require('@jcamp/tailwindcss-plugin-animate')
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    animate({
      /* options */
    }),
    // ...
  ],
}
```

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import animate from '@jcamp/tailwindcss-plugin-animate'

export default <Partial<Config>>{
  theme: {
    // ...
  },
  plugins: [
    animate({
      /* options */
    }),
  ],
}
```

## Configuration

Refer to the [type definition](https://github.com/jcamp-code/tailwindcss-plugin-animate/blob/main/src/types.ts) for all configurations avaliable.

## Credits

This plugin is heaviliy inspired by and based on the work of [tailwindcss-animate.css](https://github.com/bentzibentz/tailwindcss-animate.css) created by [Fabian Bentz](https://github.com/bentzibentz). Unfortunately, this package has not been updated in a few years and not for Tailwind v3 either.

It is also includes some ideas by [Jamie Kyle](https://github.com/jamiebuilds) and his work at [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate). I wanted more keyframes built in, but liked his ideas for matching utilities.

## License

MIT License &copy; 2022-PRESENT [John Campion](https://github.com/JohnCampionJr/)
