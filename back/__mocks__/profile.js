const mockedProfile = {
    id: 8,
    user_id: 20,
    description: "je suis un boss en popcorn"
};

const mockedNewProfile = {
    id: 9,
    user_id: 1,
    description: "je suis fort en java"
};

const mockedProfileWithUserInfo = {
    id: 7,
    user_id: 13,
    description: "je suis un boss en popcorn",
    user: {
        "lastname": "paul",
        "firstname": "pipip",
        "username": "popthecorn",
        "email": "pompom@gm.com"
    },
    profilePicture: {
        remotePath: "https://res.cloudinary.com/dns9y8jad/image/upload/v1701018696/profileImages/1701018694895.jpg"
    }
};

module.exports = { mockedProfile, mockedNewProfile, mockedProfileWithUserInfo };