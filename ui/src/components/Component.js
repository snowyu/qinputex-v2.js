import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'QInputEx',

  setup () {
    return () => h(QBadge, {
      class: 'QInputEx',
      label: 'QInputEx'
    })
  }
}
