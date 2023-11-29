const dotenv = require('dotenv');
var SibApiV3Sdk = require("sib-api-v3-sdk");

dotenv.config();

function Mail(email, username) {
  var defaultClient = SibApiV3Sdk.ApiClient.instance;

  // Configure API key authorization: api-key
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

  sendSmtpEmail = {
    to: [
      {
        email: email,
        username: username,
      },
    ],
    templateId: 2,
    params: {
      username: username,
    },
    headers: {
      "X-Mailin-custom": "Nouvelle Publication",
    },
  };
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API called successfully. Returned data: " + data);
    },
    function (error) {
      console.error(error);
    }
  );
}
module.exports = {
  Mail
};
