const request = require('supertest')
const app = require('../../server')

// this test depends on register functionality

describe('login', () => {
    it("login as freshly registered donor", done => {
        const donor = {"username":"donor@login", "password":"asd", "role":"donor"}

        request(app)
            .post("/api/postRegister")
            .send(donor)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).toBe(true)
                if (err) {
                    console.log(res.body);
                }

                delete donor.role
                request(app)
                    .post("/api/postLogin")
                    .send(donor)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.success).toBe(true)
                        expect(res.body.token).toBeDefined()
                        expect(res.body.user.is_verified).toBeTruthy()
                        done()
                    })
            })
    })

    it("login as freshly registered fundraiser", done => {
        const fundraiser = {"username":"fund@login", "password":"asd", "role":"fundraiser"}

        request(app)
            .post("/api/postRegister")
            .send(fundraiser)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).toBe(true)
                if (err) {
                    console.log(res.body);
                }

                request(app)
                    .post("/api/postLogin")
                    .send(fundraiser)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.success).toBe(true)
                        expect(res.body.token).toBeDefined()
                        expect(res.body.user.is_verified).toBeNull()
                        done()
                    })
            })
    })
})