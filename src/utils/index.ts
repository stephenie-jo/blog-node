export function getEnv() {
  if (process.env.NODE_ENV === 'development') {
    return 'dev'
  }
  // prod pre uat
  return process.env.DEPLOY_ENV
}