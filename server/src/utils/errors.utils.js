class HTTPError {
  constructor(statusCode, description, errorDetails = null) {
    this.status = statusCode;
    this.description = description;
    if (errorDetails) {
      this.details = errorDetails;
    }
  }
};

module.exports = {
  HTTPError
}