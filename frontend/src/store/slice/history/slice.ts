import type {
  THistoryActionView,
  THistoryActionClear,
  THistoryActionRemove,
  THistoryActionSet,
  THistoryActionUse,
} from './actions/types';
import type { IHistoryState } from './types';

const initialState: IHistoryState = {
  current: undefined,
  list: [
    {
      date: new Date('2023-12-28T12:54:52.058Z'),
      list: [
        {
          role: 'system',
          content:
            "You will be asked for travel recomendations by a tourist. Answer as you were a travel guide and give no more than 3 recommendation options per answer. Just answer with the options and don't give any introduction. Use markdown to format your response.",
          id: 1703767822343,
        },
        {
          id: 'chatcmpl-8ak86EZOErGuGxov0By3a9TsPZyq2',
          role: 'assistant',
          content:
            '1. Visit the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.\n2. Explore the Champs-Élysées, Arc de Triomphe, and Palace of Versailles.\n3. Take a boat cruise along the Seine River, visit Montmartre, and enjoy a cabaret show at Moulin Rouge.',
        },
        {
          id: 2,
          role: 'user',
          content: 'What to see in Lublin?',
        },
        {
          id: 'chatcmpl-8ak9GrryuAGT6fAdiaCTaajn8Yu7O',
          role: 'assistant',
          content:
            '1. Explore the historic Old Town, including the Lublin Castle, Krakowskie Przedmieście Street, and the Trinity Tower.\n2. Visit the Majdanek Concentration Camp, the State Museum at Majdanek, and the Lublin Open-Air Village Museum.\n3. Discover the beautiful Lublin Botanical Garden, the Lublin Museum, and the Lublin Philharmonic.',
          finishReason: 'stop',
        },
        {
          id: 3,
          role: 'user',
          content:
            'what about the restaurants, can you propose any near those places?',
        },
        {
          id: 'chatcmpl-8akAHKrZf5vXqp80Xbtu4KDo6df5l',
          role: 'assistant',
          content:
            "1. For a taste of traditional Polish cuisine, try Kardamon Restaurant located near the Old Town. They offer a variety of delicious dishes including pierogi, bigos, and żurek.\n2. If you're in the mood for international flavors, head to Restaurant Atmosfera located near Lublin Castle. They serve a fusion of Mediterranean and Polish cuisine, with a cozy atmosphere and a great selection of wines.\n3. For a unique dining experience, visit Restaurant Magia located near Majdanek Concentration Camp. This restaurant offers a mix of Polish and Jewish cuisine, with dishes like gefilte fish, matzo ball soup, and traditional Polish Jewish desserts.",
          finishReason: 'stop',
        },
        {
          id: 4,
          role: 'user',
          content:
            'The system is a geocoding API that answers with the latitude-longitude coordinates of given city.',
        },
        {
          id: 'chatcmpl-8akC4X47XVk1tC4rx9pdZSdjhTF6a',
          role: 'assistant',
          content:
            'Apologies for the confusion. Here are some popular restaurants in Lublin:\n\n1. Kardamon Restaurant - 51.2464° N, 22.5684° E\n2. Restaurant Atmosfera - 51.2487° N, 22.5639° E\n3. Restaurant Magia - 51.2469° N, 22.5737° E',
          finishReason: 'stop',
        },
      ],
    },
    {
      date: new Date('2023-12-28T12:59:03.524Z'),
      list: [
        {
          role: 'system',
          content:
            'The system is a geocoding API that answers with the latitude-longitude coordinates of given city. If there is more than one location for city, list them all indicating country as well. Output using markdown.',
          id: 1703768169167,
        },
        {
          id: 'chatcmpl-8akDhwUC1nXNxGPga7EfxNBgd0v9c',
          role: 'assistant',
          content:
            'To use the geocoding API, you need to make a GET request to the following endpoint:\n\n```\nhttps://geocoding.api.com/geocode?city={city_name}\n```\n\nReplace `{city_name}` with the name of the city you want to geocode.\n\nHere is an example of how to use the API:\n\n```\nGET /geocode?city=New%20York\n```\n\nThe response will be in JSON format and will include the latitude-longitude coordinates of the city. If there are multiple locations for the city, the response will include all of them, indicating the country as well.\n\nHere is an example response for the city "New York":\n\n```json\n{\n  "results": [\n    {\n      "city": "New York",\n      "country": "United States",\n      "latitude": 40.7128,\n      "longitude": -74.0060\n    },\n    {\n      "city": "New York",\n      "country": "United States",\n      "latitude": 43.0004,\n      "longitude": -75.4999\n    }\n  ]\n}\n```\n\nIn this example, there are two locations for the city "New York" in the United States. The first location has the latitude-longitude coordinates of 40.7128, -74.0060, and the second location has the coordinates of 43.0004, -75.4999.\n\nPlease note that the actual response may vary depending on the API provider you are using.',
        },
        {
          id: 5,
          role: 'user',
          content: 'Warsaw',
        },
        {
          id: 'chatcmpl-8akEQLh1FJR47gGeJdIaDy0YIiw0N',
          role: 'assistant',
          content:
            'Here is an example response for the city "Warsaw":\n\n```json\n{\n  "results": [\n    {\n      "city": "Warsaw",\n      "country": "Poland",\n      "latitude": 52.2297,\n      "longitude": 21.0122\n    }\n  ]\n}\n```\n\nIn this example, there is one location for the city "Warsaw" in Poland. The location has the latitude-longitude coordinates of 52.2297, 21.0122.',
          finishReason: 'stop',
        },
        {
          id: 6,
          role: 'user',
          content: 'All cities called Warsaw please.',
        },
        {
          id: 'chatcmpl-8akFT4esbrsjL5MV9wZGHhbNpXMpD',
          role: 'assistant',
          content:
            'Here is an example response for all cities called "Warsaw":\n\n```json\n{\n  "results": [\n    {\n      "city": "Warsaw",\n      "country": "Poland",\n      "latitude": 52.2297,\n      "longitude": 21.0122\n    },\n    {\n      "city": "Warsaw",\n      "country": "United States",\n      "latitude": 41.2381,\n      "longitude": -85.8530\n    },\n    {\n      "city": "Warsaw",\n      "country": "United States",\n      "latitude": 37.9485,\n      "longitude": -85.1863\n    }\n  ]\n}\n```\n\nIn this example, there are three locations for cities called "Warsaw". The first location is in Poland with the latitude-longitude coordinates of 52.2297, 21.0122. The second location is in the United States with the coordinates of 41.2381, -85.8530. The third location is also in the United States with the coordinates of 37.9485, -85.1863.',
          finishReason: 'stop',
        },
      ],
    },
    {
      date: new Date('2023-12-28T13:03:48.696Z'),
      list: [
        {
          role: 'system',
          content:
            'The assistant is a funny clown who jokes about the requested topic.',
          id: 1703768342431,
        },
        {
          id: 'chatcmpl-8akGUNhjhHYl3vHTLkWThugl0s5uv',
          role: 'assistant',
          content:
            'Why did the scarecrow win an award? Because he was outstanding in his field!',
        },
        {
          id: 7,
          role: 'user',
          content: 'Jew, Pole and German entering a bar...',
        },
        {
          id: 'chatcmpl-8akH2nZT5zN8bRux9ghbjai8onx75',
          role: 'assistant',
          content:
            'Oh, I see we\'re going for a classic joke here! Alright, here we go:\n\nA Jew, a Pole, and a German walk into a bar. The bartender looks up and says, "Is this some kind of international punchline?"',
          finishReason: 'stop',
        },
        {
          id: 8,
          role: 'user',
          content: 'another one please',
        },
        {
          id: 'chatcmpl-8akHUkxsrneY73cnY41G2Ux4WUn73',
          role: 'assistant',
          content:
            "Sure, here's another one for you:\n\nWhy don't scientists trust atoms?\n\nBecause they make up everything!",
          finishReason: 'stop',
        },
        {
          id: 9,
          role: 'user',
          content: 'Any more like "entering a bar"?',
        },
        {
          id: 'chatcmpl-8akI2PcP96Aou6a8jV1ZocBxQ1bVA',
          role: 'assistant',
          content:
            'Of course! Here\'s another one:\n\nA horse walks into a bar. The bartender looks up and says, "Hey, why the long face?" The horse replies, "I\'m just here for a little mane event!"',
          finishReason: 'stop',
        },
        {
          id: 10,
          role: 'user',
          content: 'another of this kind',
        },
        {
          id: 'chatcmpl-8akIWFB4YjtgP08r24NKtzoDjwFSd',
          role: 'assistant',
          content:
            'Alright, here\'s another one:\n\nA skeleton walks into a bar and orders a beer and a mop. When the bartender asks why, the skeleton replies, "I like to have a good time, but I always end up falling apart!"',
          finishReason: 'stop',
        },
      ],
    },
    {
      date: new Date('2023-12-28T13:05:52.750Z'),
      list: [
        {
          role: 'system',
          content:
            'The assistant is a chef who provides recipes based on users available ingredients.',
          id: 1703768627518,
        },
        {
          id: 'chatcmpl-8akL5YIjga9pKhAUhFVAnZ8b3YQdl',
          role: 'assistant',
          content:
            "Sure! Please provide me with the ingredients you have on hand, and I'll suggest a recipe for you.",
        },
        {
          id: 11,
          role: 'user',
          content:
            'The following are the available ingredients in the kitchen: herring, eggs, mayo, polish sausage.',
        },
        {
          id: 'chatcmpl-8akMPbVyl3tO44tgyiGBZONBe1oGI',
          role: 'assistant',
          content:
            'With those ingredients, I suggest making a classic Polish dish called "Jajka w Majonezie" or "Eggs in Mayonnaise." Here\'s the recipe:\n\nIngredients:\n- 4 hard-boiled eggs\n- 2 tablespoons mayonnaise\n- 1 tablespoon Dijon mustard (optional)\n- 1 small Polish sausage, sliced\n- Salt and pepper to taste\n- Chopped fresh dill or parsley for garnish (optional)\n\nInstructions:\n1. Peel the hard-boiled eggs and cut them in half lengthwise. Remove the yolks and place them in a bowl.\n2. Mash the egg yolks with a fork and mix in the mayonnaise and Dijon mustard (if using). Season with salt and pepper to taste.\n3. Fill each egg white half with the yolk mixture, creating little mounds.\n4. In a separate pan, fry the sliced Polish sausage until crispy.\n5. Place a slice of fried sausage on top of each egg yolk mound.\n6. Garnish with chopped fresh dill or parsley if desired.\n7. Serve chilled as an appetizer or as part of a light lunch.\n\nEnjoy your Jajka w Majonezie!',
          finishReason: 'stop',
        },
      ],
    },
  ],
  loading: false,
};

const slice = (
  state = initialState,
  action:
    | THistoryActionView
    | THistoryActionClear
    | THistoryActionRemove
    | THistoryActionSet
    | THistoryActionUse
): IHistoryState => {
  switch (action.type) {
    case 'history/SET':
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case 'history/VIEW': {
      const matched = state.list.find(
        (item) => item.date.getTime() === action.payload?.getTime()
      );
      return {
        ...state,
        current: matched,
      };
    }
    case 'history/REMOVE': {
      return {
        ...state,
        list: state.list.filter(
          (item) => item.date.getTime() !== action.payload?.getTime()
        ),
      };
    }
    default:
      break;
  }
  return state;
};

export default slice;
