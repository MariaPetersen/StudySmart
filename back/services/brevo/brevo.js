const auth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();
var SibApiV3Sdk = require("sib-api-v3-sdk");

function Mail(email, username) {
  var defaultClient = SibApiV3Sdk.ApiClient.instance;

  // Configure API key authorization: api-key
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey =
    "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";

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
