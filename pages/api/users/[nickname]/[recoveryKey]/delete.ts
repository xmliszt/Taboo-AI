import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserByNicknameAndRecoveryKey } from '../../../../../lib/services/userService';

export default async function deleteUserHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ error: string }>
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nickname, recoveryKey } = req.query;
  if (!nickname || !recoveryKey) {
    return res
      .status(400)
      .json({ error: 'Nickname and recoveryKey are required' });
  }

  try {
    await deleteUserByNicknameAndRecoveryKey(
      nickname.toString(),
      recoveryKey.toString()
    );
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
}
