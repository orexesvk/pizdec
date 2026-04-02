const axios = require("axios");

exports.handler = async (event) => {
  const { amount } = JSON.parse(event.body);

  const response = await axios.post(
    "https://api.nowpayments.io/v1/invoice",
    {
      price_amount: amount,
      price_currency: "usd"
    },
    {
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_KEY
      }
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ url: response.data.invoice_url })
  };
};
