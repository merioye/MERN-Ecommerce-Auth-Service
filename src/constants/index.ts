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
  HASHING_ALGORITHM = 'HASHING_ALGORITHM',
}

enum SOCIAL_SIGNUP_METHOD {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

enum HASHING_ALGORITHM {
  SHA256 = 'sha256',
  SHA384 = 'sha384',
  SHA512 = 'sha512',
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

export {
  ENVIRONMENT,
  CONFIG,
  SOCIAL_SIGNUP_METHOD,
  SIGNUP_METHOD,
  ROLE,
  HASHING_ALGORITHM,
};
