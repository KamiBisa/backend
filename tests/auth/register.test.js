const request = require('supertest')
const app = require('../../server')

describe('register donor', () => {
    const donor = {
        "fullname": "andi donor regis",
        "username": "andiregis",
        "email": "andi2@gmail.com",
        "password": "andi",
        "avatar": "https://image.flaticon.com/icons/png/512/21/21104.png",
        "role": "donor"
    }

    it("register a donor must be immediately verified", done => {
        request(app)
            .post("/api/authentication/postRegister")
            .send(donor)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).toBe(true)
                expect(res.body.token).toBeDefined()
                expect(res.body.user.is_verified).toBe(true)
                done()
            })
    })

    it("register duplicate must be rejected", done => {
        request(app)
            .post("/api/authentication/postRegister")
            .send(donor)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).toBe(false)
                done()
            })
    })
})

describe('register fundraiser', () => {
    const fundraiser = {
        "fullname": "budi fundraiser regis",
        "username": "budiregis",
        "email": "budi2@gmail.com",
        "password": "budi",
        "avatar": "https://image.flaticon.com/icons/png/512/21/21104.png",
        "role": "fundraiser"
    }

    it("register a fundraiser must not be verified", done => {
        request(app)
            .post("/api/authentication/postRegister")
            .send(fundraiser)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).toBe(true)
                expect(res.body.token).toBeDefined()
                expect(res.body.user.is_verified).toBeUndefined()
                done()
            })
    })

    it("register duplicate must be rejected", done => {
        request(app)
            .post("/api/authentication/postRegister")
            .send(fundraiser)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).toBe(false)
                done()
            })
    })
})

describe('register edge cases', () => {
    const testUser = {
        "fullname": "edge case",
        "username": "edge1",
        "email": "edge1@gmail.com",
        "password": "edge",
        "avatar": "https://image.flaticon.com/icons/png/512/21/21104.png",
        "role": "edge tester"
    }

    it("register empty username must be rejected", done => {
        delete testUser.username
        request(app)
            .post("/api/authentication/postRegister")
            .send(testUser)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).toBe(false)
                done()
            })
    })

    it("register empty password must be rejected", done => {
        testUser.username = "testusername"
        delete testUser.password
        request(app)
            .post("/api/authentication/postRegister")
            .send(testUser)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).toBe(false)
                done()
            })
    })

    it("register with invalid role must be rejected", done => {
        request(app)
            .post("/api/authentication/postRegister")
            .send(testUser)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).toBe(false)
                done()
            })
    })
})