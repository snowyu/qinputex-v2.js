import QInputEx from './components/QInputEx/QInputEx.vue'
import {version} from '../package.json'

// const version = __UI_VERSION__

function install (app) {
  app.component(QInputEx.name, QInputEx)
}

export {
  version,
  QInputEx,
  install
}
