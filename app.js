const app = require('./server');
const db = require('./db/db');

app.get('/', (req, res) => {
    db.query("SELECT * FROM users")
        .then(data => {
            res.json({
                success: true,
                user: data
            })
        })
        .catch(err => {
            res.json(err);
        })
    // res.json({
    //     success: true
    // })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})