const { createPublication, getOnePublication, getAllPublications, updatePublication, deletePublication } = require('./../controllers/publication');
const publicationDatabase = require("./../services/database/publicationDatabase");
const userDatabase = require("./../services/database/userDatabase");
const profileDatabase = require("./../services/database/profileDatabase");
const { mockedProfile } = require('./../__mocks__/profile');
const { mockedUser } = require('./../__mocks__/user');
const { mockedPublication } = require("./../__mocks__/publication");
const { describe } = require('node:test');

jest.mock("./../services/database/publicationDatabase", () => jest.fn());
publicationDatabase.createPublication = jest.fn(() => { });
publicationDatabase.getOnePublication = jest.fn(() => { });
publicationDatabase.getAllPublications = jest.fn(() => { });
publicationDatabase.updatePublication = jest.fn(() => { });
publicationDatabase.deletePublication = jest.fn(() => { });

jest.mock("./../services/database/profileDatabase", () => jest.fn());
profileDatabase.getOneProfile = jest.fn(() => { });

jest.mock("./../services/database/userDatabase", () => jest.fn());
userDatabase.getOneUser = jest.fn(() => { });

describe('Create Publication Function', () => {
    it('should create a publication and return a sucess message', async () => {
        const req = {
            auth: {
                userId: mockedProfile.user_id
            },
            body: {
                title: mockedPublication.title,
                description: mockedPublication.description,
                text: mockedPublication.text,
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        profileDatabase.getOneProfile.mockResolvedValue(mockedProfile);
        publicationDatabase.createPublication.mockResolvedValue(mockedPublication);
        await createPublication(req, res);

        expect(profileDatabase.getOneProfile).toHaveBeenCalledTimes(1);
        expect(publicationDatabase.createPublication).toHaveBeenCalledTimes(1);
        expect(publicationDatabase.createPublication).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockedNewProfile);
    });

    async function createPublication(req, res, next) {
        try {
            const { userId } = req.auth;
            const profile = await profileDatabase.getOneProfile({
                where: {
                    user_id: userId
                }
            });
            const { title, description, text } = req.body;
            const publication = await publicationDatabase.createPublication({
                data: {
                    profile_id: profile.id,
                    title: title,
                    description: description,
                    text: text,
                    link: "http"
                }
            });
            res.status(200).json(publication);
        } catch (error) {
            res.status(500).json(error);
        }
    }


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
