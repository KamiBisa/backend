const app = require('./server');

app.get('/', () => {
    res.json({
        success: true
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})