import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

const googleVerification = async(token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT
  });

  if(!ticket) {
    return null;
  }

  const payload = ticket.getPayload();
  const { name, email, picture } = payload!;

  return { name, email, picture };
};

export default googleVerification;
