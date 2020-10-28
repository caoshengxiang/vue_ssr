const Vue = require('vue')
const serve = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
serve.get('*', (req, res) => {
  res.setHeader('Content-type', 'text/html;charset=UTF-8')
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `
        <div>访问的 URL 是： {{ url }}</div>`
  })

  const context = {
    title: 'vue 服务端渲染',
    keywords: '关键词',
    description: 'vue ssr 服务端渲染',
  }
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

serve.listen(8080)
