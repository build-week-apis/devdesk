const server = require('./server.js')
const request = require('supertest')

describe('server.js', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })


    describe('GET /', () => {

        it('should return 200 OK', () => {
            return request(server)
                .get('/')
                .then(res => {
                expect(res.status).toBe(200)
            })
        })

        it('should return JSON', async () => {
            const res = await request(server).get('/')

            expect(res.type).toBe('text/html')
        })

        it('should return object', async () => {
            const res = await request(server).get('/')

            expect(res.body).toEqual({})
        })
    })

})