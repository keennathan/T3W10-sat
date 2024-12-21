// Importing the code that we want to test
const { app } = require('../src/server.js');    

// Importing a testing helper function from supertest
const request = require('supertest');

describe("Users route", () => {
    test("Get all users' route returns array of users", async () => {
        // GET localhost:3300/users
        const response = await request(app).get('/users');
        
        const expectedUsers = [
            "Alice",
            "Bob",
            "Charlie",
            "David",
            "Eve",
            "Frank",
            "Grace",
            "Helen",,
            "Ivy",
            "Jack",
            "Katie",
            "Liam",
            "Mia",
            "Nathan"
        ]

        expect(response.body.data).toHaveLength(15);
        expect(response.body.data.length).toBeGreaterThan(3);
        expect(response.body.data).toEqual(expect.arrayContaining(expectedUsers));
    });

    test("Get user by ID' route returns a specific user only", async () => {
        // GET localhost:3300/users/:id
        let targetUserId = "1";
        const response = await request(app).get('/users/' + targetUserId);

        expect(response.body.result.id).toBe(targetUserId);
        expect(response.body.result.username).toBe("Username from DB");
    });

    test("Create a new user' route returns the newly created user", async () => {
        // POST localhost:3300/users/signup
        const response = await request(app)
        .post('/users/signup')
        .send({
            username: "Alice",
            password: "abc123"
        });
        expect(response.body.username).toBe("Alice");
        expect(response.body.password).toBe("EncryptedPassword");

    });

    test("Login user' route returns a specific user only", async () => {
        // POST localhost:3300/users/login
        const response = await request(app)
        .post('/users/login')
        // Ideally, we would set the authorisation header to be set 
            // by the value from JWT token
        .set("Authorisation", "Some header value");

        // .send({
        //     username: "Alice",
        //     password: "abc123"
        // });

        expect(response.body.authHeaderData).toBe("Some header value");
        
        
    });

    test("Login user' route throws an error when invalid login data is passed", async () => {
        // POST localhost:3300/users/login
        const response = await request(app)
        .post('/users/login')
        // Ideally, we would set the authorisation header to be set 
            // by the value from JWT token
        .set("Authorisation", "Error header value");

        // .send({
        //     username: "Alice",
        //     password: "abc123"
        // });

        expect(response.body.authHeaderData).toBeUndefined();
        expect(response.body.status).toBe(500);
        expect(response.body.error).toBe("Not a valid login data");
        
    });

    test.skip("Update/Edit user' route returns a specific user only", async () => {
        // PUT/PATCH localhost:3300/users/:id
        let targetUserId = "1";
        const response = await request(app)
        .patch('/users/' + targetUserId)
        .send({
            username: "Alice",
            password: "Abc12345"
        });
    });

    test.skip("Delete user by ID' route returns an acknowledgement message", async () => {
        // DELETE localhost:3300/users/:id
        let targetUserId = "1";
        const response = await request(app).delete('/users/' + targetUserId)
        .send({
            username: "Alice",
            password: "Abc12345"
    });
})
});