import * as ACTION_TYPES from "./ActionTypes";

const initialState = {
  currentBuildStage: "race-selection",
  canContinue: false,
  selectedRace: null,
  selectedClass: null,
  abilityScoreAssignments: {
    strength: null,
    dexterity: null,
    constitution: null,
    intelligence: null,
    wisdom: null,
    charisma: null
  }
};

export const characterBuildReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SELECTED_RACE:
      return {
        ...state,
        selectedRace: action.payload.race
      };

    case ACTION_TYPES.SET_SELECTED_CLASS:
      return {
        ...state,
        selectedClass: action.payload.selectedClass
      };

    case ACTION_TYPES.SET_ABILITY_SCORE_ASSIGNMENTS:
      return {
        ...state,
        abilityScoreAssignments: action.payload.assignments
      };

    case ACTION_TYPES.SET_CAN_CONTINUE:
      return {
        ...state,
        canContinue: action.payload.value
      };

    case ACTION_TYPES.SET_BUILD_STAGE:
      return {
        ...state,
        currentBuildStage: action.payload.stage
      };

    default:
      return state;
  }
};
