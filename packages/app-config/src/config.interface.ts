export interface ConfigDatabase {
  url: string;
}

export interface ConfigSwagger {
  username: string;
  password: string;
}

export interface EmailConfig {
  service_name: string;
  username: string;
  password: string;
}

export interface ApiConfig {
  apiUrl: string;
  apiKey: string;
}

export interface ConfigData {
  env: string;

  port: number;

  db: ConfigDatabase;

  swagger: ConfigSwagger;

  logLevel: string;

  email: EmailConfig;

  externalApi: ApiConfig;
}

export interface AuthConfig {
  jwtSecret: string;
  accessTokenSecret: string;
  refreshTokenSecret: string;
}

export interface UserServiceConfigOptions {
  host: string;
  port: number;
}

export interface UserServiceConfig {
  userService: UserServiceConfigOptions;
  transport: any;
}

export interface ElasticConfig {
  url: string;
  username?: string;
  password?: string;
  index?: string;
}
