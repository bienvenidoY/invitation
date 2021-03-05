import Hammer from 'hammerjs'
const vueTouch = {}

const gestures = ['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe']
const directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all']
const customEvents = {}

if (!Hammer) {
  throw new Error('[vue-touch] cannot locate Hammer.js.')
}

// exposed global options
vueTouch.config = {}

vueTouch.install = function (Vue) {
  Vue.directive('touch', {
    isFn: true,
    acceptStatement: true,
    beforeMount(el, binding) {
      if (!el.hammer) {
        el.hammer = new Hammer.Manager(el)
      }

      const mc = el.hammer

      const event = binding.arg
      if (!event) {
        console.warn('[vue-touch] event type argument is required.')
      }
      let recognizerType, recognizer

      if (customEvents[event]) {
        // custom event
        const custom = customEvents[event]
        recognizerType = custom.type
        recognizer = new Hammer[capitalize(recognizerType)](custom)
        recognizer.recognizeWith(mc.recognizers)
        mc.add(recognizer)
      } else {
        // built-in event
        for (let i = 0; i < gestures.length; i++) {
          if (event.indexOf(gestures[i]) === 0) {
            recognizerType = gestures[i]
            break
          }
        }
        if (!recognizerType) {
          console.warn('[vue-touch] invalid event type: ' + event)
          return
        }
        recognizer = mc.get(recognizerType)
        if (!recognizer) {
          // add recognizer
          recognizer = new Hammer[capitalize(recognizerType)]()
          // make sure multiple recognizers work together...
          recognizer.recognizeWith(mc.recognizers)
          mc.add(recognizer)
        }
        // apply global options
        const globalOptions = vueTouch.config[recognizerType]
        if (globalOptions) {
          guardDirections(globalOptions)
          recognizer.set(globalOptions)
        }
        // apply local options
        const localOptions =
            el.hammerOptions &&
            el.hammerOptions[recognizerType]
        if (localOptions) {
          guardDirections(localOptions)
          recognizer.set(localOptions)
        }
      }
    },
    beforeUpdate(el, binding) {
      const mc = el.hammer

      const event = binding.arg

      // teardown old handler
      if (mc.handler) {
        mc.off(event, mc.handler)
      }
      if (typeof binding.value !== 'function') {
        mc.handler = null
        console.warn(
            '[vue-touch] invalid handler function for v-touch: ' +
            binding.arg + '="'
        )
      } else {
        mc.on(event, (mc.handler = binding.value))
      }
    },
    unmounted(el, binding) {
      const mc = el.hammer

      const event = binding.arg

      // teardown old handler
      if (mc.handler) {
        mc.off(event, mc.handler)
      }

      if (!Object.keys(mc.handlers).length) {
        mc.destroy()
        el.hammer = null
      }
    }
  })
}


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function guardDirections(options) {
  var dir = options.direction
  if (typeof dir === 'string') {
    var hammerDirection = 'DIRECTION_' + dir.toUpperCase()
    if (directions.indexOf(dir) > -1 && Hammer.hasOwnProperty(hammerDirection)) {
      options.direction = Hammer[hammerDirection]
    } else {
      console.warn('[vue-touch] invalid direction: ' + dir)
    }
  }
}

export default vueTouch