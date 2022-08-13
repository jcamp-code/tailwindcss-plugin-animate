import plugin = require('tailwindcss/plugin')
import { camelCase, kebabCase } from 'lodash'
import type { AnimateOptions } from './types'
import type { PluginCreator } from 'tailwindcss/types/config'
import { availableKeyframes } from './keyframes'

export function createPluginAnimate(options: AnimateOptions = {}): PluginCreator {
  const PREFIX = options.prefix ? options.prefix : 'animate-'

  function createAnimateValues() {
    let values = {}
    const keys = Object.keys(availableKeyframes)

    keys.forEach(el => {
      const animationName = el.replace('@keyframes ', '')
      const className = kebabCase(animationName)

      // lets both animate-shakeX and animate-shake-x work
      values[className] = className
      values[animationName] = animationName
    })

    return values
  }

  function processValue(value: unknown): string {
    if (isNaN(Number(value))) {
      return value as string
    }
    return value + 'ms'
  }

  // set fallback if speed not defined
  const heartBeatSpeed = options.heartBeatSpeed ? options.heartBeatSpeed : 1300
  const hingeSpeed = options.hingeSpeed ? options.hingeSpeed : 2000
  const bounceInSpeed = options.bounceInSpeed ? options.bounceInSpeed : 750
  const bounceOutSpeed = options.bounceOutSpeed ? options.bounceOutSpeed : 750
  const animationDelaySpeed = options.animationDelaySpeed ? options.animationDelaySpeed : 500

  const extraProperties = {
    bounce: {
      transformOrigin: 'center bottom',
    },
    headShake: {
      animationTimingFunction: 'ease-in-out',
    },
    swing: {
      transformOrigin: 'top center',
    },
    heartBeat: {
      animationDuration: processValue(heartBeatSpeed),
      animationTimingFunction: 'ease-in-out',
    },
    hinge: {
      animationDuration: processValue(hingeSpeed),
    },
    flip: {
      backfaceVisibility: 'visible',
    },
    flipInX: {
      backfaceVisibility: 'visible',
    },
    flipInY: {
      backfaceVisibility: 'visible',
    },
    flipOutX: {
      backfaceVisibility: 'visible',
    },
    flipOutY: {
      backfaceVisibility: 'visible',
    },
    bounceIn: {
      animationDuration: processValue(bounceInSpeed),
    },
    bounceOut: {
      animationDuration: processValue(bounceOutSpeed),
    },
  }

  return function ({ addUtilities, matchUtilities, theme }) {
    let animatedSpeed = options.animatedSpeed
      ? options.animatedSpeed
      : theme('animationDuration.DEFAULT')

    if (!animatedSpeed) animatedSpeed = 1000

    function processAnimate(value: any) {
      const framesName = `@keyframes ${camelCase(value)}`
      if (!availableKeyframes[framesName]) {
        console.warn(`invalid animation name: ${value}; arbitrary values not supported`)
      }

      let extras = {}
      if (Object.keys(extraProperties).includes(camelCase(value))) {
        extras = extraProperties[camelCase(value)]
      }

      return [
        { animationName: value, animationDuration: animatedSpeed, ...extras },
        { [`@keyframes ${value}`]: availableKeyframes[framesName] },
      ]
    }

    function filterTheme(name: string) {
      const values = theme(name)
      return Object.fromEntries(Object.entries(values).filter(([key]) => key !== 'DEFAULT'))
    }

    matchUtilities(
      // @ts-expect-error typing does not allow for array of results
      { [`${PREFIX.replace(/-$/, '')}`]: value => processAnimate(value) },
      { values: createAnimateValues() }
    )

    matchUtilities(
      { [`${PREFIX}duration`]: value => ({ animationDuration: processValue(value) }) },
      { values: filterTheme('animationDuration') }
    )

    matchUtilities(
      { [`${PREFIX}delay`]: value => ({ animationDelay: processValue(value) }) },
      { values: filterTheme('animationDelay') }
    )

    matchUtilities(
      { [`${PREFIX}ease`]: value => ({ animationTimingFunction: value as string }) },
      { values: filterTheme('animationTimingFunction') }
    )

    addUtilities({
      [`.${PREFIX}running`]: { animationPlayState: 'running' },
      [`.${PREFIX}paused`]: { animationPlayState: 'paused' },
      [`.${PREFIX}infinite`]: { animationIterationCount: 'infinite' },
      [`.${PREFIX}delay`]: { animationDelay: processValue(animationDelaySpeed) },
    })

    matchUtilities(
      { [`${PREFIX}fill-mode`]: value => ({ animationFillMode: value as string }) },
      { values: filterTheme('animationFillMode') }
    )

    matchUtilities(
      { [`${PREFIX}direction`]: value => ({ animationDirection: value as string }) },
      { values: filterTheme('animationDirection') }
    )

    matchUtilities(
      { [`${PREFIX}repeat`]: value => ({ animationIterationCount: value as string }) },
      { values: filterTheme('animationRepeat') }
    )
  }
}

const pluginAnimate = plugin.withOptions<AnimateOptions>(
  function (options) {
    return createPluginAnimate(options)
  },
  function (options) {
    return {
      content: {},
      theme: {
        extend: {
          animationDelay: ({ theme }) => ({
            1: '1s',
            2: '2s',
            3: '3s',
            4: '4s',
            5: '5s',
            2000: '2000ms',
            3000: '3000ms',
            4000: '4000ms',
            5000: '5000ms',
            ...theme('transitionDelay'),
          }),
          animationDuration: ({ theme }) => ({
            0: '0ms',
            1: '1s',
            2: '2s',
            3: '3s',
            4: '4s',
            5: '5s',
            2000: '2000ms',
            3000: '3000ms',
            4000: '4000ms',
            5000: '5000ms',
            ...theme('transitionDuration'),
            DEFAULT: '1000ms',
          }),
          animationTimingFunction: ({ theme }) => ({
            ...theme('transitionTimingFunction'),
          }),
          animationFillMode: {
            none: 'none',
            forwards: 'forwards',
            backwards: 'backwards',
            both: 'both',
          },
          animationDirection: {
            normal: 'normal',
            reverse: 'reverse',
            alternate: 'alternate',
            'alternate-reverse': 'alternate-reverse',
          },
          animationOpacity: ({ theme }) => ({
            ...theme('opacity'),
            DEFAULT: 0,
          }),
          animationTranslate: ({ theme }) => ({
            ...theme('translate'),
            DEFAULT: '100%',
          }),
          animationScale: ({ theme }) => ({
            ...theme('scale'),
            DEFAULT: 0,
          }),
          animationRotate: ({ theme }) => ({
            ...theme('rotate'),
            DEFAULT: '30deg',
          }),
          animationRepeat: {
            0: '0',
            1: '1',
            infinite: 'infinite',
          },
        },
      },
    } as any
  }
)

module.exports = pluginAnimate
