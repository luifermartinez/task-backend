/**
 * It takes a context object as an argument and returns the bearer token from the authorization header.
 * @param {any} ctx - The context object that is passed to the resolver.
 * @returns The token is being returned.
 */
export const getBearerToken = (ctx: any) => {
  const authorization = ctx.headers.authorization;
  if (authorization) {
    const token = authorization.split(" ")[1];
    return token;
  }
  return null;
};
