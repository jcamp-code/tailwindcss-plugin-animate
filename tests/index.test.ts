import path from 'node:path'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import animate from '../dist/index.js'

function run(config, css = '@tailwind utilities', plugin = tailwindcss) {
  const { currentTestName } = expect.getState()
  config = {
    ...{
      plugins: [animate(config.animate)],
      corePlugins: {
        preflight: false,
      },
    },
    ...config,
  }

  return postcss(plugin(config)).process(css, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  })
}

it('hasDuration1000', () => {
  const config = {
    content: [{ raw: String.raw`<div class="animate-duration-1000"></div>` }],
  }

  return run(config, '@tailwind utilities').then((result) => {
    const value = String.raw`.animate-duration-1000 {
    animation-duration: 1000ms
}`
    expect(result.css).toContain(value)
  })
})

it('hasDuration2000', () => {
  const config = {
    content: [{ raw: String.raw`<div class="animate-duration-2000"></div>` }],
  }

  return run(config, '@tailwind utilities').then((result) => {
    const value = String.raw`.animate-duration-2000 {
    animation-duration: 2000ms
}`
    expect(result.css).toContain(value)
  })
})

it('hasDurationArbitrary', () => {
  const config = {
    content: [{ raw: String.raw`<div class="animate-duration-[2500]"></div>` }],
  }

  return run(config, '@tailwind utilities').then((result) => {
    const value = String.raw`.animate-duration-\[2500\] {
    animation-duration: 2500ms
}`
    expect(result.css).toContain(value)
  })
})

it('hasAnimateShake-X', () => {
  const config = {
    content: [{ raw: String.raw`<div class="animate-shake-x"></div>` }],
  }

  return run(config, '@tailwind utilities').then((result) => {
    const value = String.raw`.animate-shake-x {
    animation-name: shake-x;
    animation-duration: 1000ms
}
@keyframes shake-x {`

    expect(result.css).toContain(value)
  })
})

it('hasAnimateShakeX', () => {
  const config = {
    content: [{ raw: String.raw`<div class="animate-shakeX"></div>` }],
  }

  return run(config, '@tailwind utilities').then((result) => {
    const value = String.raw`.animate-shakeX {
    animation-name: shakeX;
    animation-duration: 1000ms
}
@keyframes shakeX {`

    expect(result.css).toContain(value)
  })
})

it('warnsOnArbitrary', () => {
  const config = {
    content: [{ raw: String.raw`<div class="animate-[nonsense]"></div>` }],
  }
  console.warn = jest.fn()

  return run(config, '@tailwind utilities').then((result) => {
    expect(console.warn).toHaveBeenCalledTimes(1)
  })
})

it('includesRunning', () => {
  const config = {
    content: [{ raw: String.raw`<div class="animate-running"></div>` }],
  }

  return run(config, '@tailwind utilities').then((result) => {
    const value = String.raw`.animate-running {
    animation-play-state: running
}`

    expect(result.css).toContain(value)
  })
})

it('includesExtraPropsForHeartBeat', () => {
  const config = {
    content: [{ raw: String.raw`<div class="animate-heart-beat"></div>` }],
  }

  return run(config, '@tailwind utilities').then((result) => {
    const value = String.raw`.animate-heart-beat {
    animation-name: heart-beat;
    animation-duration: 1300ms;
    animation-timing-function: ease-in-out
}
@keyframes heart-beat {`

    expect(result.css).toContain(value)
  })
})

it('includesExtraPropsForHeartBeatWithConfig', () => {
  const config = {
    animate: { heartBeatSpeed: 2000 },
    content: [{ raw: String.raw`<div class="animate-heart-beat"></div>` }],
  }

  return run(config, '@tailwind utilities').then((result) => {
    const value = String.raw`.animate-heart-beat {
    animation-name: heart-beat;
    animation-duration: 2000ms;
    animation-timing-function: ease-in-out
}
@keyframes heart-beat {`

    expect(result.css).toContain(value)
  })
})

it('usesPrefixOption', () => {
  const config = {
    animate: { prefix: 'an-' },
    content: [{ raw: String.raw`<div class="an-shakeX"></div>` }],
  }

  return run(config, '@tailwind utilities').then((result) => {
    const value = String.raw`.an-shakeX {
    animation-name: shakeX;
    animation-duration: 1000ms
}
@keyframes shakeX {`

    expect(result.css).toContain(value)
  })
})
