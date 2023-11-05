import _ from 'lodash';
import crypto from 'crypto';
import { IHighlight } from './types/highlight.type';
import { IChat, IDisplayScore } from './types/score.type';
import { NextApiRequest } from 'next';
import IWord from './types/word.type';
import moment from 'moment';
import { DateUtils } from './utils/dateUtils';
import html2canvas from 'html2canvas';

export function getIp(req: NextApiRequest): string | undefined {
  let ip: string | undefined;
  if (req.headers['x-forwarded-for']) {
    if (req.headers['x-forwarded-for'] as string[]) {
      ip = req.headers['x-forwarded-for'][0];
    } else if (req.headers['x-forwarded-for'] as string) {
      ip = (req.headers['x-forwarded-for'] as string).split(',')[0];
    }
  } else if (req.headers['x-real-ip']) {
    ip = req.socket.remoteAddress;
  } else {
    ip = req.socket.remoteAddress;
  }
  return ip;
}

export function generateHashedString(...items: string[]): string {
  const stringToHash = items.join('_');
  const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
  const truncatedHash = hash.substring(0, 8);
  return truncatedHash;
}

export function calculateScore(score: IDisplayScore): number {
  return _.round(
    score.difficulty *
      (1 / (score.completion <= 0 ? 1 : score.completion)) *
      1000,
    2
  );
}

export function getFormattedToday(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    date
  );
  const day = ('0' + date.getDate()).slice(-2);
  return `${day}-${month}-${year}`;
}

/**
 * Sanitize the array of Highlight objects such that Highlight
 * with same start but different end will only keep the one
 * that has the larget end.
 * @param highlights The array of Highlight object
 */
export const sanitizeHighlights = (highlights: IHighlight[]): IHighlight[] => {
  const highlightMap: { [key: number]: IHighlight } = {};
  for (const highlight of highlights) {
    const start = highlight.start;
    if (start in highlightMap) {
      const currentHighlight = highlightMap[start];
      highlightMap[start] =
        highlight.end > currentHighlight.end ? highlight : currentHighlight;
    } else {
      highlightMap[start] = highlight;
    }
  }
  const highlightsArray = Object.values(highlightMap);
  highlightsArray.sort((a, b) => a.start - b.start);
  const results: IHighlight[] = [];
  let prevEnd = 0;
  let idx = 0;
  for (const highlight of highlightsArray) {
    if (highlight.start < prevEnd) {
      if (highlight.end > prevEnd) {
        results[idx - 1].end = highlight.end;
      }
    } else {
      results.push(highlight);
      prevEnd = highlight.end;
      idx++;
    }
  }
  return results;
};

export const formatResponseTextIntoArray = (
  text: string,
  target?: string
): string[] => {
  let wordList: string[];
  const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  try {
    wordList = JSON.parse(text) as string[];
  } catch {
    try {
      const sanitizedString = text.trim();
      wordList = sanitizedString.split(',');
      if (wordList.length <= 1) {
        wordList = sanitizedString.split('\n');
        if (wordList.length <= 1) {
          wordList = [];
        }
      }
      wordList = _.uniq(
        wordList.map((text) =>
          _.trim(text.replace(/\d/g, ''), punctuation).toLowerCase()
        )
      );
      wordList = wordList.filter((text) => text.length > 0);
    } catch {
      wordList = [];
    }
  }
  wordList = wordList.map((e) => _.toLower(_.trim(e, punctuation)));
  wordList = _.uniq(wordList);
  if (target) {
    const _word = _.toLower(target);
    if (!wordList.includes(_word)) {
      wordList.push(_word);
    }
  }
  wordList = wordList.filter((word) => word.length < 20);
  return wordList.map(_.trim);
};

export const getMockResponse = async (
  target: string,
  mode: string
): Promise<string | undefined> => {
  return new Promise<string | undefined>((res, rej) => {
    setTimeout(() => {
      switch (mode) {
        case '1':
          res(`The target response is: ${target}.`);
          break;
        case '2':
          res(`adfjlasdjflaksjdfklajsdfjaklsjaj`);
          break;
        case '3':
          res(undefined);
          break;
        case '4':
          rej('Mock Failure');
          break;
        default:
          res(`The target response is: ${target}.`);
      }
    }, 2000);
  });
};

export const getMockVariations = async (
  target: string,
  shouldSucceed = true
): Promise<IWord> => {
  return new Promise<IWord>((res, rej) => {
    setTimeout(() => {
      shouldSucceed
        ? res({
            target: target,
            taboos: Array(15).fill(target),
            isVerified: true,
            updatedAt: moment().format(DateUtils.formats.wordUpdatedAt),
          })
        : rej('Mock Failure');
    }, 1000);
  });
};

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatStringForDisplay = (s: string) => {
  return _.startCase(_.trim(_.toLower(s)));
};

export const getDifficulty = (
  difficulty: number,
  withNumber = true
): string => {
  let s = '';
  switch (difficulty) {
    case 1:
      s = 'Easy';
      break;
    case 2:
      s = 'Medium';
      break;
    case 3:
      s = 'Hard';
      break;
    default:
      s = 'Unknown';
      break;
  }
  if (withNumber) {
    s += ` (${difficulty})`;
  }
  return s;
};

export const getDifficultyMultipliers = (
  difficulty: number
): { timeMultipler: number; promptMultiplier: number } => {
  switch (difficulty) {
    case 1:
      return { timeMultipler: 0.4, promptMultiplier: 0.6 };
    case 2:
      return { timeMultipler: 0.3, promptMultiplier: 0.7 };
    case 3:
      return { timeMultipler: 0.2, promptMultiplier: 0.8 };
    default:
      return { timeMultipler: 0.5, promptMultiplier: 0.5 };
  }
};

export const getDisplayedTopicName = (name?: string): string => {
  return _.startCase(name) ?? 'Unknown';
};

export const getCompletionSeconds = (completion: number): number => {
  return completion <= 0 ? 1 : completion;
};

export const getCalculatedScore = (score: IDisplayScore): number => {
  const difficulty = score.difficulty;
  const multipliers = getDifficultyMultipliers(difficulty);
  const timeScore = calculateTimeScore(score) * multipliers.timeMultipler;
  const aiScore = (score.ai_score ?? 0) * multipliers.promptMultiplier;
  return _.round(timeScore + aiScore, 1);
};

export const calculateTimeScore = (score: IDisplayScore): number => {
  const scoreCompletionSeconds = getCompletionSeconds(score.completion);
  return Math.max(Math.min(100 - scoreCompletionSeconds, 100), 0);
};

export const b64toBlob = (
  b64Data: string,
  contentType = '',
  sliceSize = 512
) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

type ShareResult = {
  href: string;
  downloadName: string;
};
export const shareImage = (source: HTMLDivElement): Promise<ShareResult> => {
  return new Promise<ShareResult>((res, rej) => {
    html2canvas(source, {
      scale: 2,
      backgroundColor: 'transparent',
      height: source.scrollHeight,
    })
      .then((canvas) => {
        const href = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');
        const downloadName = `taboo-ai-scores-${moment().format(
          'DDMMYYYYHHmmss'
        )}.png`;
        res({
          href,
          downloadName,
        });
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export const createConversationFeedForAIJudge = (conversation: IChat[]) => {
  return conversation
    .filter((chat) => chat.role !== 'error' && chat.role !== 'system')
    .map((chat) => `${chat.role === 'user' ? 'P' : 'G'}:${chat.content}`)
    .join('||');
};
