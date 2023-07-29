import { NextApiRequest, NextApiResponse } from 'next';
import ILevel from '../../../types/level.interface';
import { queryAllLevels } from '../../../lib/database/levelRespository';
import withMiddleware from '../../../lib/middleware/middlewareWrapper';
import { getLevelByName } from '../../../lib/services/backend/levelService';

const getAllLevelsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    try {
      const { name } = req.query;
      if (!name || typeof name !== 'string') {
        const { levels } = await queryAllLevels();
        const convertedLevels: ILevel[] = levels.map((level): ILevel => {
          return {
            name: level.name as string,
            difficulty: level.difficulty as number,
            author: level.author as string,
            new: level.new as boolean,
            words: (level.words as string).split(','),
            isVerified: level.isverified as boolean,
            createdAt: Date.parse(level.created_at),
          };
        });
        res.status(200).json({ levels: convertedLevels });
      } else {
        const level = await getLevelByName(name);
        res.status(200).json({ levels: level === null ? [] : [level] });
      }
    } catch (err) {
      res.status(500).json({ error: err, details: err.message });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default withMiddleware(getAllLevelsHandler);
