exports.handler = async (event) => {
  const { secret } = JSON.parse(event.body);

  if (secret !== process.env.ADMIN_SECRET) {
    return { statusCode: 403 };
  }

  return {
    statusCode: 200,
    body: JSON.stringify([])
  };
};
