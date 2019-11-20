import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import createAccount from 'database/createGuestAccount';
import { findEntityOrThrow } from 'utils/typeorm';
import { User } from 'entities';

export const createGuestAccount = catchErrors(async (_req, res) => {
  const user = await createAccount();
  res.respond({
    authToken: signToken({ sub: user.id }),
  });
});

export const getTokenForUser = catchErrors(async (req, res) => {
  const { userId } = req.params;

  const user = await findEntityOrThrow(User, userId);

  res.respond({
    authToken: signToken({ sub: user.id }),
  });
});
