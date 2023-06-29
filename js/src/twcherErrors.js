class TwitcherError extends Error {
    constructor(message, errorCode) {
      super(message);
      this.name = 'TwitcherError';
      this.errorCode = errorCode;
    }
}

export {TwitcherError};