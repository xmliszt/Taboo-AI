import { NextApiRequest, NextApiResponse } from 'next';
import ILevel from '../../app/levels/(models)/level.interface';
import { queryAllLevels } from '../../lib/db/levelRespository';
import withMiddleware from '../../lib/middleware/middlewareWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { levels } = await queryAllLevels();
      const convertedLevels: ILevel[] = levels.map((level): ILevel => {
        return {
          name: level.name as string,
          difficulty: level.difficulty as number,
          author: level.author as string,
          new: level.new as boolean,
          words: (level.words as string).split(','),
          createdAt: Date.parse(level.created_at),
        };
      });
      res.status(200).json({ levels: convertedLevels });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.end();
  }
};

export default withMiddleware(handler);
