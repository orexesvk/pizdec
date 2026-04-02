exports.handler = async (event) => {
  const { secret, product } = JSON.parse(event.body);

  if (secret !== process.env.ADMIN_SECRET) {
    return { statusCode: 403 };
  }

  console.log("New product:", product);

  return {
    statusCode: 200,
    body: "OK"
  };
};
