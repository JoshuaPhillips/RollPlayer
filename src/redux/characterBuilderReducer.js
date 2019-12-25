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
    case "SET_SELECTED_RACE":
      return {
        ...state,
        selectedRace: action.payload.race
      };

    case "SET_SELECTED_CLASS":
      return {
        ...state,
        selectedClass: action.payload.selectedClass
      };

    case "SET_ABILITY_SCORE_ASSIGNMENTS":
      return {
        ...state,
        abilityScoreAssignments: action.payload.assignments
      };

    case "SET_CAN_CONTINUE":
      return {
        ...state,
        canContinue: action.payload.value
      };

    case "SET_BUILD_STAGE":
      return {
        ...state,
        currentBuildStage: action.payload.stage
      };

    default:
      return state;
  }
};
