const { createProfile, getOneProfile, deleteProfile, updateProfile } = require('./../controllers/profile');
const profileDatabase = require("./../services/database/profileDatabase");
const { mockedProfile, mockedNewProfile, mockedProfileWithUserInfo } = require('./../__mocks__/profile');
const { mockedUser } = require('./../__mocks__/user');
const { describe } = require('node:test');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

jest.mock("./../services/database/profileDatabase", () => jest.fn());
profileDatabase.createProfile = jest.fn(() => { });
profileDatabase.getOneProfile = jest.fn(() => { });
profileDatabase.updateProfile = jest.fn(() => { });
profileDatabase.deleteProfile = jest.fn(() => { });

describe('Create Profile Function', () => {
    it('should create a profile and return a sucess message', async () => {
        const req = {
            body: {
                description: mockedNewProfile.description
            },
            auth: {
                userId: mockedUser.user_id
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        profileDatabase.getOneProfile.mockResolvedValue(false);
        profileDatabase.createProfile.mockResolvedValue(mockedNewProfile);
        await createProfile(req, res);

        expect(profileDatabase.getOneProfile).toHaveBeenCalledTimes(1);
        expect(profileDatabase.createProfile).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockedNewProfile);
    });

    it('should fail to create a profile because profile already exxists', async () => {
        const req = {
            body: {
                description: mockedProfile.description
            },
            auth: {
                userId: mockedProfile.user_id
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        profileDatabase.getOneProfile.mockResolvedValue(mockedProfile);

        await createProfile(req, res);

        expect(profileDatabase.getOneProfile).toHaveBeenCalledTimes(1);
        expect(profileDatabase.createProfile).not.toHaveBeenCalled;
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith("User profile already exists");
    });


});

describe('Get Profile Function', () => {
    it('should get a profile and return profile information', async () => {
        const req = {
            params: {
                id: mockedProfileWithUserInfo.id
            },
            auth: {
                userId: mockedProfileWithUserInfo.user_id
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        profileDatabase.getOneProfile.mockResolvedValue(mockedProfileWithUserInfo);
        await getOneProfile(req, res);

        expect(profileDatabase.getOneProfile).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockedProfileWithUserInfo);
    });

});

describe('Delete Profile Function', () => {
    it('should delete a profile and return a success response', async () => {
        const req = {
            params: {
                id: mockedProfile.id
            },
            auth: {
                userId: mockedProfile.user_id
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        profileDatabase.getOneProfile.mockResolvedValue(mockedProfile);
        profileDatabase.deleteProfile.mockResolvedValue(mockedProfile);

        await deleteProfile(req, res);

        expect(profileDatabase.getOneProfile).toHaveBeenCalledTimes(1);
        expect(profileDatabase.getOneProfile).toHaveBeenCalledWith({
            where: {
                user_id: mockedProfile.user_id
            }
        });
        expect(profileDatabase.deleteProfile).toHaveBeenCalledTimes(1);
        expect(profileDatabase.deleteProfile).toHaveBeenCalledWith({
            where: {
                id: mockedProfile.id
            }
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockedProfile);
    });

});

describe('Update Profile Function', () => {
    it('should update a profile and new profile info', async () => {
        const req = {
            body: {
                description: "hello"
            },
            params: {
                id: mockedProfile.id
            },
            auth: {
                userId: mockedProfile.user_id
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const updatedProfile = {
            ...mockedProfile,
            description: req.body.description
        };

        profileDatabase.getOneProfile.mockResolvedValue(mockedProfile);
        profileDatabase.updateProfile.mockResolvedValue(updatedProfile);

        await updateProfile(req, res);

        expect(profileDatabase.getOneProfile).toHaveBeenCalledTimes(1);
        expect(profileDatabase.getOneProfile).toHaveBeenCalledWith({
            where: {
                user_id: mockedProfile.user_id
            }
        });
        expect(profileDatabase.updateProfile).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedProfile);
    });

});
