const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_KEY);

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);

  await resend.emails.send({
    from: "AERIX <onboarding@resend.dev>",
    to: email,
    subject: "Order confirmed",
    html: "<h1>Order confirmed</h1>"
  });

  return { statusCode: 200 };
};
