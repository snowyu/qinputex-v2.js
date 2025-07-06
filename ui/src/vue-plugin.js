import QInputEx from './components/QInputEx/QInputEx.vue'
import Directive from './directives/Directive.js'
import {version} from '../package.json'

// const version = __UI_VERSION__

function install (app) {
  app.component(QInputEx.name, QInputEx)
  app.directive(Directive.name, Directive)
}

export {
  version,
  QInputEx,
  Directive,
  install
}
