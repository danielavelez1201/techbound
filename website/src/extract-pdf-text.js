var path = require('path')
var filePath = path.join(__dirname, 'sample.pdf')
var extract = require('pdf-text-extract')

extract(filePath, { splitPages: false }, function (err, pages) {
  if (err) {
    console.dir(err)
    return
  }
  console.dir(pages)
})