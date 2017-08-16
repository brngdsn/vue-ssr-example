const server = require('express')()
const { createBundleRenderer } = require('vue-server-renderer')

const template = require('fs').readFileSync('index.html', 'utf-8')
const serverBundle = require('./src/vue-ssr-server-bundle.json')
const clientManifest = require('./src/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

server.get('*', (req, res) => {
  const context = { url: req.url }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(8080)