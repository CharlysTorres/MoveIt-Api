declare {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_DEFAULT_REGION: string;
      AWS_BUCKET: string;
      AWS_ACL: string;
      STORAGE_TYPE: string;
    }
  }
}