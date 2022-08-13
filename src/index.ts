import plugin = require('tailwindcss/plugin')
import { camelCase, kebabCase } from 'lodash'
import type { AnimateOptions } from './types'
import type { PluginCreator } from 'tailwindcss/types/config'

//TO-DO:  Combine these into one; since this is dev-side, no need for tree-shaking
const keyframes = require('./keyframes/keyframes')
const keyframesLightSpeed = require('./keyframes/lightspeed')
const keyframesFlip = require('./keyframes/flip')
const keyframesRotateIn = require('./keyframes/rotateIn')
const keyframesRotateOut = require('./keyframes/rotateOut')
const keyframesRoll = require('./keyframes/roll')
const keyframesZoomIn = require('./keyframes/zoomIn')
const keyframesZoomOut = require('./keyframes/zoomOut')
const keyframesBounceIn = require('./keyframes/bounceIn')
const keyframesBounceOut = require('./keyframes/bounceOut')
const keyframesSlideIn = require('./keyframes/slideIn')
const keyframesSlideOut = require('./keyframes/slideOut')
const keyframesFadeIn = require('./keyframes/fadeIn')
const keyframesFadeOut = require('./keyframes/fadeOut')
const keyframesBackIn = require('./keyframes/backIn')
const keyframesBackOut = require('./keyframes/backOut')

const PREFIX = 'animate-'

function filterDefault(values) {
  return Object.fromEntries(Object.entries(values).filter(([key]) => key !== 'DEFAULT'))
}

export function createPluginAnimate(options: AnimateOptions = {}): PluginCreator {
  const fallbackKeyframes = {
    '@keyframes bounce': keyframes.keyframeBounce,
    '@keyframes flash': keyframes.keyframeFlash,
    '@keyframes pulse': keyframes.keyframePulse,
    '@keyframes rubberBand': keyframes.keyframeRubberBand,
    '@keyframes shakeX': keyframes.keyframeShakeX,
    '@keyframes shakeY': keyframes.keyframeShakeY,
    '@keyframes headShake': keyframes.keyframeHeadShake,
    '@keyframes swing': keyframes.keyframeSwing,
    '@keyframes tada': keyframes.keyframeTada,
    '@keyframes wobble': keyframes.keyframeWobble,
    '@keyframes jello': keyframes.keyframeJello,
    '@keyframes heartBeat': keyframes.keyframeHeartBeat,
    '@keyframes hinge': keyframes.keyframeHinge,
    '@keyframes jackInTheBox': keyframes.keyframeJackInTheBox,
    '@keyframes lightSpeedInLeft': keyframesLightSpeed.keyframeLightSpeedInLeft,
    '@keyframes lightSpeedInRight': keyframesLightSpeed.keyframeLightSpeedInRight,
    '@keyframes lightSpeedOutLeft': keyframesLightSpeed.keyframeLightSpeedOutLeft,
    '@keyframes lightSpeedOutRight': keyframesLightSpeed.keyframeLightSpeedOutRight,
    '@keyframes flip': keyframesFlip.keyframeFlip,
    '@keyframes flipInX': keyframesFlip.keyframeFlipInX,
    '@keyframes flipInY': keyframesFlip.keyframeFlipInY,
    '@keyframes flipOutX': keyframesFlip.keyframeFlipOutX,
    '@keyframes flipOutY': keyframesFlip.keyframeFlipOutY,
    '@keyframes rotateIn': keyframesRotateIn.keyframeRotateIn,
    '@keyframes rotateInDownLeft': keyframesRotateIn.keyframeRotateInDownLeft,
    '@keyframes rotateInDownRight': keyframesRotateIn.keyframeRotateInDownRight,
    '@keyframes rotateInUpLeft': keyframesRotateIn.keyframeRotateInUpLeft,
    '@keyframes rotateInUpRight': keyframesRotateIn.keyframeRotateInUpRight,
    '@keyframes rotateOut': keyframesRotateOut.keyframeRotateOut,
    '@keyframes rotateOutDownLeft': keyframesRotateOut.keyframeRotateOutDownLeft,
    '@keyframes rotateOutDownRight': keyframesRotateOut.keyframeRotateOutDownRight,
    '@keyframes rotateOutUpLeft': keyframesRotateOut.keyframeRotateOutUpLeft,
    '@keyframes rotateOutUpRight': keyframesRotateOut.keyframeRotateOutUpRight,
    '@keyframes rollIn': keyframesRoll.keyframeRollIn,
    '@keyframes rollOut': keyframesRoll.keyframeRollOut,
    '@keyframes zoomIn': keyframesZoomIn.keyframeZoomIn,
    '@keyframes zoomInDown': keyframesZoomIn.keyframeZoomInDown,
    '@keyframes zoomInLeft': keyframesZoomIn.keyframeZoomInLeft,
    '@keyframes zoomInRight': keyframesZoomIn.keyframeZoomInRight,
    '@keyframes zoomInUp': keyframesZoomIn.keyframeZoomInUp,
    '@keyframes bounceIn': keyframesBounceIn.keyframeBounceIn,
    '@keyframes bounceInDown': keyframesBounceIn.keyframeBounceInDown,
    '@keyframes bounceInLeft': keyframesBounceIn.keyframeBounceInLeft,
    '@keyframes bounceInRight': keyframesBounceIn.keyframeBounceInRight,
    '@keyframes bounceInUp': keyframesBounceIn.keyframeBounceInUp,
    '@keyframes bounceOut': keyframesBounceOut.keyframeBounceOut,
    '@keyframes bounceOutDown': keyframesBounceOut.keyframeBounceOutDown,
    '@keyframes bounceOutLeft': keyframesBounceOut.keyframeBounceOutLeft,
    '@keyframes bounceOutRight': keyframesBounceOut.keyframeBounceOutRight,
    '@keyframes bounceOutUp': keyframesBounceOut.keyframeBounceOutUp,
    '@keyframes zoomOut': keyframesZoomOut.keyframeZoomOut,
    '@keyframes zoomOutDown': keyframesZoomOut.keyframeZoomOutDown,
    '@keyframes zoomOutLeft': keyframesZoomOut.keyframeZoomOutLeft,
    '@keyframes zoomOutRight': keyframesZoomOut.keyframeZoomOutRight,
    '@keyframes zoomOutUp': keyframesZoomOut.keyframeZoomOutUp,
    '@keyframes slideInDown': keyframesSlideIn.keyframeSlideInDown,
    '@keyframes slideInLeft': keyframesSlideIn.keyframeSlideInLeft,
    '@keyframes slideInRight': keyframesSlideIn.keyframeSlideInRight,
    '@keyframes slideInUp': keyframesSlideIn.keyframeSlideInUp,
    '@keyframes slideOutDown': keyframesSlideOut.keyframeSlideOutDown,
    '@keyframes slideOutLeft': keyframesSlideOut.keyframeSlideOutLeft,
    '@keyframes slideOutRight': keyframesSlideOut.keyframeSlideOutRight,
    '@keyframes slideOutUp': keyframesSlideOut.keyframeSlideOutUp,
    '@keyframes fadeIn': keyframesFadeIn.keyframeFadeIn,
    '@keyframes fadeInDown': keyframesFadeIn.keyframeFadeInDown,
    '@keyframes fadeInDownBig': keyframesFadeIn.keyframeFadeInDownBig,
    '@keyframes fadeInLeft': keyframesFadeIn.keyframeFadeInLeft,
    '@keyframes fadeInLeftBig': keyframesFadeIn.keyframeFadeInLeftBig,
    '@keyframes fadeInRight': keyframesFadeIn.keyframeFadeInRight,
    '@keyframes fadeInRightBig': keyframesFadeIn.keyframeFadeInRightBig,
    '@keyframes fadeInTopLeft': keyframesFadeIn.keyframeFadeInTopLeft,
    '@keyframes fadeInTopRight': keyframesFadeIn.keyframeFadeInTopRight,
    '@keyframes fadeInBottomLeft': keyframesFadeIn.keyframeFadeInBottomLeft,
    '@keyframes fadeInBottomRight': keyframesFadeIn.keyframeFadeInBottomRight,
    '@keyframes fadeInUp': keyframesFadeIn.keyframeFadeInUp,
    '@keyframes fadeInUpBig': keyframesFadeIn.keyframeFadeInUpBig,
    '@keyframes fadeOut': keyframesFadeOut.keyframeFadeOut,
    '@keyframes fadeOutDown': keyframesFadeOut.keyframeFadeOutDown,
    '@keyframes fadeOutDownBig': keyframesFadeOut.keyframeFadeOutDownBig,
    '@keyframes fadeOutLeft': keyframesFadeOut.keyframeFadeOutLeft,
    '@keyframes fadeOutLeftBig': keyframesFadeOut.keyframeFadeOutLeftBig,
    '@keyframes fadeOutRight': keyframesFadeOut.keyframeFadeOutRight,
    '@keyframes fadeOutRightBig': keyframesFadeOut.keyframeFadeOutRightBig,
    '@keyframes fadeOutUp': keyframesFadeOut.keyframeFadeOutUp,
    '@keyframes fadeOutUpBig': keyframesFadeOut.keyframeFadeOutUpBig,
    '@keyframes fadeOutTopLeft': keyframesFadeOut.keyframeFadeOutTopLeft,
    '@keyframes fadeOutTopRight': keyframesFadeOut.keyframeFadeOutTopRight,
    '@keyframes fadeOutBottomLeft': keyframesFadeOut.keyframeFadeOutBottomLeft,
    '@keyframes fadeOutBottomRight': keyframesFadeOut.keyframeFadeOutBottomRight,
    '@keyframes backInDown': keyframesBackIn.keyframeBackInDown,
    '@keyframes backInUp': keyframesBackIn.keyframeBackInUp,
    '@keyframes backInLeft': keyframesBackIn.keyframeBackInLeft,
    '@keyframes backInRight': keyframesBackIn.keyframeBackInRight,
    '@keyframes backOutDown': keyframesBackOut.keyframeBackOutDown,
    '@keyframes backOutUp': keyframesBackOut.keyframeBackOutUp,
    '@keyframes backOutLeft': keyframesBackOut.keyframeBackOutLeft,
    '@keyframes backOutRight': keyframesBackOut.keyframeBackOutRight,
  }
  function createAnimateValues() {
    let utilities = {}
    const keys = Object.keys(fallbackKeyframes)

    keys.forEach(el => {
      const animationName = el.replace('@keyframes ', '')
      const className = kebabCase(animationName)

      utilities[className] = className
      utilities[animationName] = animationName
    })

    return utilities
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

  return function ({ addBase, addUtilities, matchUtilities, theme: _theme }) {
    let animatedSpeed = options.animatedSpeed
      ? options.animatedSpeed
      : _theme('animationDuration.DEFAULT')

    if (!animatedSpeed) animatedSpeed = 1000

    function processAnimate(value: any) {
      const framesName = `@keyframes ${camelCase(value)}`
      if (!fallbackKeyframes[framesName]) {
        console.warn(`invalid animation name: ${value}; arbitrary values not supported`)
      }

      let extras = {}
      if (Object.keys(extraProperties).includes(camelCase(value))) {
        extras = extraProperties[camelCase(value)]
      }

      return [
        { animationName: value, animationDuration: animatedSpeed, ...extras },
        { [`@keyframes ${value}`]: fallbackKeyframes[framesName] },
      ]
    }

    function theme(name: string) {
      return filterDefault(_theme(name))
    }

    matchUtilities(
      // @ts-expect-error typing does not allow for array of results
      { [`${PREFIX.replace(/-$/, '')}`]: value => processAnimate(value) },
      { values: createAnimateValues() }
    )

    matchUtilities(
      { [`${PREFIX}duration`]: value => ({ animationDuration: processValue(value) }) },
      { values: theme('animationDuration') }
    )

    matchUtilities(
      { [`${PREFIX}delay`]: value => ({ animationDelay: processValue(value) }) },
      { values: theme('animationDelay') }
    )

    matchUtilities(
      { [`${PREFIX}ease`]: value => ({ animationTimingFunction: value as string }) },
      { values: theme('animationTimingFunction') }
    )

    addUtilities({
      [`.${PREFIX}running`]: { animationPlayState: 'running' },
      [`.${PREFIX}paused`]: { animationPlayState: 'paused' },
      [`.${PREFIX}infinite`]: { animationIterationCount: 'infinite' },
      [`.${PREFIX}delay`]: { animationDelay: processValue(animationDelaySpeed) },
    })

    matchUtilities(
      { [`${PREFIX}fill-mode`]: value => ({ animationFillMode: value as string }) },
      { values: theme('animationFillMode') }
    )

    matchUtilities(
      { [`${PREFIX}direction`]: value => ({ animationDirection: value as string }) },
      { values: theme('animationDirection') }
    )

    matchUtilities(
      { [`${PREFIX}repeat`]: value => ({ animationIterationCount: value as string }) },
      { values: theme('animationRepeat') }
    )
  }
}

const pluginIcons = plugin.withOptions<AnimateOptions>(
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

module.exports = pluginIcons
