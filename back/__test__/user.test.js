const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signup, login } = require('./../controllers/user');
const userDatabase = require("./../services/database/userDatabase");
const { mockedUser, mockHash } = require('./../__mocks__/user');
const { describe } = require('node:test');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

jest.mock("./../services/database/userDatabase", () => jest.fn());
userDatabase.createUser = jest.fn(() => { });
userDatabase.getOneUser = jest.fn(() => { });

describe('Signup Function', () => {
    it('should create a user and return success message', async () => {
        const req = {
            body: {
                lastname: 'Doe',
                firstname: 'John',
                email: 'jon@example.com',
                username: 'johdoe',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        bcrypt.hash.mockResolvedValue(mockHash);

        await signup(req, res);

        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
        expect(userDatabase.createUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('User was created');
    });

});

describe('Login function', () => {
    it('should login a user rand return user information', async () => {
        const req = {
            body: {
                email: 'jon@example.com',
                password: 'password123'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockedToken = 'token';
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockResolvedValue(mockedToken);
        userDatabase.getOneUser.mockResolvedValue(mockedUser);

        await login(req, res);

        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockedUser.password);
        expect(userDatabase.getOneUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
    });
});
