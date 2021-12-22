const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_NAME, SERVER_PORT } =
  process.env;

/**
 * MONGODB_URI construct the connection string from the parameters
 */
exports.MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@sandbox.qnvqb.mongodb.net/${MONGODB_NAME}?retryWrites=true &
w=majority`;

exports.SERVER_PORT = SERVER_PORT || 5000;
