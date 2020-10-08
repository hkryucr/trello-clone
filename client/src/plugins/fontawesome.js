import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, faCreditCard)

Vue.component('AppIcon', FontAwesomeIcon)
