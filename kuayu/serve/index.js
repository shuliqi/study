const express = require('express')
const app = express()
const port = 3000

app.get('/api/getName', (req, res) => {
  console.log("请求到后端了")
  res.send('舒丽琦')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})