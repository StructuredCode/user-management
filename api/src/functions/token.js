const { app, HttpResponse } = require("@azure/functions");
// const axios = require("axios");
// const qs = require("qs");

/**
 * Spica api-token proxy.
 * Can be used as a proxy to avoid directly Spica api call from browser to avoid CORS.
 */
app.http("token", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    // context.info("Token request received.");

    // const body = await request.json();
    let res;

    // try {
    //   const response = await axios(
    //     new TokenRequest(body.client_id, body.client_secret).getRequest()
    //   );

    //   context.debug("response data: ", JSON.stringify(response.data));

    //   res = new HttpResponse({
    //     status: response.status,
    //     body: JSON.stringify(response.data),
    //   });
    // } catch (error) {
    //   context.error("Get token response error: ", error);

    //   res = new HttpResponse({
    //     status: error.response ? error.response.status : 500,
    //     body: error.response
    //       ? JSON.stringify(error.response.data)
    //       : { error: error.message },
    //   });
    // }

    return res;
  },
});

class TokenRequest {
  #client_id;
  #client_secret;

  constructor(client_id, client_secret) {
    this.client_id = client_id;
    this.client_secret = client_secret;
  }

  #getBody() {
    return qs.stringify({
      grant_type: "client_credentials",
      client_id: this.client_id,
      client_secret: this.client_secret,
      scope: "api",
    });
  }

  getRequest() {
    return {
      method: "post",
      url: "https://login.allhours.com/connect/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: this.#getBody(),
    };
  }
}
