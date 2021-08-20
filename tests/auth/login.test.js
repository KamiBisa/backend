const request = require('supertest')
const app = require('../../server')

// this test depends on register functionality

describe('login', () => {
    it("login as freshly registered donor", done => {
        const donor = {
            "fullname": "andi donor login",
            "username": "andilogin",
            "email": "andi1@gmail.com",
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
                if (err) {
                    console.log(res.body);
                }

                delete donor.role
                request(app)
                    .post("/api/authentication/postLogin")
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
        const fundraiser = {
            "fullname": "budi fundraiser login",
            "username": "budilogin",
            "email": "budi1@gmail.com",
            "password": "budi",
            "avatar": "https://image.flaticon.com/icons/png/512/21/21104.png",
            "role": "fundraiser"
        }

        request(app)
            .post("/api/authentication/postRegister")
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
                    .post("/api/authentication/postLogin")
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