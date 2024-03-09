enum ENVIRONMENT {
  DEV = 'development',
  PROD = 'production',
  TEST = 'test',
}

enum CONFIG {
  PORT = 'PORT',
  NODE_ENV = 'NODE_ENV',
  API_PREFIX = 'API_PREFIX',
  API_DEFAULT_VERSION = 'API_DEFAULT_VERSION',
  DB_NAME = 'DB_NAME',
  DB_URI = 'DB_URI',
}

enum SIGNUP_METHOD {
  MANUAL = 'manual',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

enum ROLE {
  ADMIN = 'admin',
  SELLER = 'seller',
  CUSTOMER = 'customer',
}

// Dependency Injection Tokens
const LoggerToken = Symbol('LoggerToken');

export { ENVIRONMENT, CONFIG, SIGNUP_METHOD, ROLE, LoggerToken };
