import {
  CharacterActions,
  FETCH_CHARACTER_BEGIN,
  FETCH_CHARACTER_FAILURE,
  FETCH_CHARACTER_SUCCESS,
  UPDATE_CHARACTERISTICS_BEGIN
} from "./characterActions";
import { Character, CharacterViewState } from "./types";

export const initialState: CharacterViewState = {
  character: emptyCharacter(),
  error: null,
  loading: false
};

export function characterReducer(
  state: CharacterViewState = initialState,
  action: CharacterActions
): CharacterViewState {
  switch (action.type) {
    case FETCH_CHARACTER_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        error: null,
        loading: true
      };

    case FETCH_CHARACTER_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        character: action.character,
        loading: false
      };

    case FETCH_CHARACTER_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case UPDATE_CHARACTERISTICS_BEGIN:
      console.log("reducer " + UPDATE_CHARACTERISTICS_BEGIN);
      return {
        ...state,
        character: {
          ...state.character,
          characteristics: action.characteristics
        }
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

function emptyCharacter(): Character {
  return {
    name: "",
    attributes: {
      endurance: 0,
      agility: 0,
      strength: 0,
      will: 0,
      intelligence: 0,
      leadership: 0,
      power: 0,
      defense: 0,
      extension: 0
    },
    equipment: {
      hand1: null,
      hand2: null,
      body: null,
      bag: [{}]
    },
    characteristics: {
      initiative: {
        current: 0,
        max: 0
      },
      stamina: {
        current: 0,
        max: 0
      },
      impact: 0,
      damage: 0,
      health: {
        current: 0,
        max: 0
      },
      dodge: 0,
      coverage: {
        current: 0,
        max: 0
      },
      blunt: 0,
      cut: 0,
      penetrating: 0
    }
  };
}
