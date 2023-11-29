const { createPublication, getOnePublication, getAllPublications, updatePublication, deletePublication } = require('./../controllers/publication');
const publicationDatabase = require("./../services/database/publicationDatabase");
const userDatabase = require("./../services/database/userDatabase");
const profileDatabase = require("./../services/database/profileDatabase");
const { mockedProfile, mockedProfileWithUserInfo } = require('./../__mocks__/profile');
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
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockedPublication);
    });

});

describe('Get Publication Function', () => {
    it('should get a profile and return profile information', async () => {
        const req = {
            params: {
                id: mockedPublication.id
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        profileDatabase.getOneProfile.mockResolvedValue(mockedProfileWithUserInfo);
        publicationDatabase.getOnePublication.mockResolvedValue(mockedPublication);

        const publicationWithUser = {
            ...mockedPublication,
            ...mockedProfileWithUserInfo
        };

        await getOnePublication(req, res);

        expect(profileDatabase.getOneProfile).toHaveBeenCalledTimes(1);
        expect(publicationDatabase.getOnePublication).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(publicationWithUser);
    });
});


describe('Delete Publications Function', () => {
    it('should delete a publication and return a success response', async () => {
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

        userDatabase.getOneUser.mockResolvedValue(mockedProfile);
        profileDatabase.getOneProfile.mockResolvedValue(mockedProfile);
        publicationDatabase.getOnePublication.mockResolvedValue(mockedPublication);
        publicationDatabase.deletePublication.mockResolvedValue(mockedPublication);

        await deletePublication(req, res);

        expect(publicationDatabase.deletePublication).toHaveBeenCalledTimes(1);
        expect(publicationDatabase.deletePublication).toHaveBeenCalledWith({
            where: {
                id: req.params.id
            }
        });
        expect(res.status).toHaveBeenCalledWith(200);
    });

});
