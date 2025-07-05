/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */

function extendConf (conf, api) {
  // register our boot file
  conf.boot.push(
    '~quasar-app-extension-qinputex/src/boot/register.js',
    '~quasar-app-extension-qinputex/src/boot/i18n.js'
  )

  // ensure Quasar components and directives are included
  conf.framework.components = conf.framework.components || []
  conf.framework.components.push(
    'QBtn',
    'QIcon',
    'QPopupProxy',
    'QCard',
    'QCardSection',
    'QToolbar',
    'QToolbarTitle',
    'QInput',
    'QSelect',
    'QDate',
    'QTime',
    'QColor',
    'QChip'
  )

  conf.framework.directives = conf.framework.directives || []
  conf.framework.directives.push(
    'ClosePopup'
  )

  if (api.hasWebpack) {
    // make sure app extension files & ui package gets transpiled
    const transpileTarget = (
      conf.build.webpackTranspileDependencies // q/app-webpack >= v4
      || conf.build.transpileDependencies // q/app-webpack v3
    )
    transpileTarget.push(/quasar-app-extension-qinputex[\\/]src/)
  }

  // make sure the stylesheet goes through webpack to avoid SSR issues
  conf.css.push('~quasar-ui-qinputex/src/index.sass')
}

export default function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app-*" CLI
  api.compatibleWith('quasar', '^2.0.0')

  if (api.hasVite) {
    api.compatibleWith('@quasar/app-vite', '^1.5.0 || ^2.0.0')
  }
  else if (api.hasWebpack) {
    api.compatibleWith('@quasar/app-webpack', '^3.10.0 || ^4.0.0')
  }


  // Uncomment the line below if you provide a JSON API for your component
  // api.registerDescribeApi('QInputEx', '~quasar-ui-qinputex/src/components/QInputEx.json')

  // Uncomment the line below if you provide a JSON API for your directive
  // api.registerDescribeApi('my-directive', '~quasar-ui-qinputex/src/directives/my-directive.json')


  // We extend /quasar.conf.js
  api.extendQuasarConf(extendConf)
}
