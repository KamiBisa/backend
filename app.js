const app = require('./server');
const db = require('./db/db');

app.get('/', (req, res) => {
    db.query("SELECT * FROM users")
        .catch(err)
        .then(data => {
            res.json({
                success: true,
                user: data
            })
        })
    // res.json({
    //     success: true
    // })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})