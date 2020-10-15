const DataUri = require('datauri/parser')
const path = require('path')

const dUri = new DataUri()

const dataUri = ( req ) => {
  return dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer)
}

module.exports = dataUri