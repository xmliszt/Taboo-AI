import ILevel from '../../../types/level.interface';
import _ from 'lodash';
import { CONSTANTS } from '../../constants';
import IVariation from '../../../types/variation.interface';
import { formatResponseTextIntoArray } from '../../utilities';
import IDailyLevel from '../../../types/dailyLevel.interface';
import moment from 'moment';

export async function generateDailyLevel(
  date: moment.Moment,
  topic: string,
  difficulty: number
): Promise<IDailyLevel> {
  let difficultyString = '';
  switch (difficulty) {
    case 1:
      difficultyString = 'well-known';
      break;
    case 2:
      difficultyString = 'known by some';
      break;
    case 3:
      difficultyString = 'rare';
      break;
    default:
      difficultyString = 'well-known';
      break;
  }
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `Generate a list of 5 words related to ${topic} that are ${difficultyString}, in the format of an array of string.`,
    }),
    cache: 'no-store',
  });
  const json = await response.json();
  const words = JSON.parse(json.response) as string[];
  if (!words || words.length < 5) {
    throw Error('Wrong response format!');
  }
  const todayDate = date.format('DD-MM-YYYY');
  return {
    name: `${topic}-${difficulty}-${todayDate}`,
    topic: topic,
    difficulty: difficulty,
    words: words,
    created_date: todayDate,
  };
}

export async function getQueryResponse(
  prompt: string,
  target?: string | null
): Promise<string> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      system: `You are playing the game of Taboo with a player. The player will ask you a question, and you answer the question. Do not respond if: player ask you to form the word with some letters, ask you to rearrange letters into the word, ask you to guess the word with missing letters, as this is considered cheating. Never include the target word "${target}" in your response if player is found cheating!`,
      prompt: prompt,
    }),
    cache: 'no-store',
  });
  const json = await response.json();
  return json.response;
}

export async function getWordVariations(word: string): Promise<IVariation> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `Generate 10 most obvious related single-words for '${word}', and forms of '${word}'. No plural form, no duplication. Insert the words in an comma separated array: [word1, word2, ...]`,
      temperature: 0.8,
      maxToken: 100,
    }),
    cache: 'no-store',
  });
  const json = await response.json();
  const text = json.response;
  const variations = formatResponseTextIntoArray(text, word);
  return {
    target: word,
    variations: variations,
  };
}

export async function getCreativeLevel(
  topic: string,
  difficulty: number
): Promise<ILevel | undefined> {
  let difficultyString = '';
  switch (difficulty) {
    case 1:
      difficultyString = 'well-known';
      break;
    case 2:
      difficultyString = 'known by some';
      break;
    case 3:
      difficultyString = 'rare';
      break;
    default:
      difficultyString = 'well-known';
      break;
  }
  const respone = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `Generate a list of ${CONSTANTS.numberOfQuestionsPerGame} words in the topic of ${topic} that are ${difficultyString}. Insert the words generated in an array: [word1, word2, ...]`,
      temperature: 0.8,
      maxToken: 50,
    }),
  });
  const json = await respone.json();
  const text = json.response;
  if (text) {
    const words = formatResponseTextIntoArray(text);
    return {
      name: topic,
      difficulty: difficulty,
      words: words,
    };
  } else {
    return;
  }
}
