const express = require('express')
const { generateWords, WordsError } = require('./words')

const PORT = 3000;

const server = express()

server.get('/', (req, res) => {
  const count = req.query.count || 2;

  try {
    const words = generateWords(count)

    return res.status(200).json({ words })
  } catch (error) {
    if (error instanceof WordsError) {
      return res.status(400).json({ error: error.message })
    }

    res.status(500).json({ error: 'internal server error'})
  }

})


function startServer() {
  return new Promise((resolve) => server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    resolve();
  }))
}

function stopServer() {
  return new Promise((resolve) => server.close(() => {
    console.log('Server stopped');
    resolve()
  }))
}

module.exports = {
  server,
  startServer,
  stopServer,
}
