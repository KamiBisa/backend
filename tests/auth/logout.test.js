const request = require('supertest')
const app = require('../../server')

// this test depends on register functionality

describe('logout', () => {
    it.only("register then logout", done => {
        const donor = {
            "fullname": "andi donor logout",
            "username": "andilogout",
            "email": "andi3@gmail.com",
            "password": "andi",
            "avatar": "https://image.flaticon.com/icons/png/512/21/21104.png",
            "role": "donor"
        }

        request(app)
            .post("/api/authentication/postRegister")
            .send(donor)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).toBe(true)
                const jwt = res.body.token

                request(app)
                .get("/api/authentication/getLogout")
                .set("Cookie", "auth_token="+jwt)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).toBe(true)
                    done()
                })
            })
    })
})