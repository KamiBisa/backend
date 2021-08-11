const request = require('supertest')
const app = require('../../server')

// this test depends on register functionality

describe('logout', () => {
    it.only("register then logout", done => {
        const donor = {"username":"donor@logout", "password":"asd", "role":"donor"}

        request(app)
            .post("/api/postRegister")
            .send(donor)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).toBe(true)
                const jwt = res.body.token

                request(app)
                .get("/api/getLogout")
                .set("Cookie", "auth_token="+jwt)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).toBe(true)
                    done()
                })
            })
    })
})