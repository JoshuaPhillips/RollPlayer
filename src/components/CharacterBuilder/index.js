import React from "react";
import RaceSelection from "./Races";
import ClassSelection from "./Classes";
import AbilityScoreSelection from "./AbilityScores";
import BackgroundSelection from "./Backgrounds";

import { connect } from "react-redux";

const CharacterBuilder = props => {
  const { currentBuildStage, setBuildStage, canContinue, setCanContinue } = props;

  const buildStages = ["race-selection", "class-selection", "ability-scores", "background-selection"];

  const moveToNextStage = () => {
    setBuildStage(buildStages[buildStages.indexOf(currentBuildStage) + 1]);
    setCanContinue(false);
  };

  return (
    <main className='bg-gray-100 min-h-screen'>
      {currentBuildStage === "race-selection" && <RaceSelection />}
      {currentBuildStage === "class-selection" && <ClassSelection />}
      {currentBuildStage === "ability-scores" && <AbilityScoreSelection />}
      {currentBuildStage === "background-selection" && <BackgroundSelection />}

      <div className='fixed bottom-0 right-0 w-full bg-gray-800'>
        <button
          className='w-full h-full text-white uppercase tracking-widest py-4 font-semibold disabled:text-gray-500 disabled:bg-gray-200'
          onClick={() => moveToNextStage()}
          disabled={!canContinue}>
          Continue
        </button>
      </div>
    </main>
  );
};

const mapStateToProps = state => {
  const { canContinue, currentBuildStage } = state.characterBuilder;
  return {
    canContinue,
    currentBuildStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCanContinue: value => dispatch({ type: "SET_CAN_CONTINUE", payload: { value } }),
    setBuildStage: stage => dispatch({ type: "SET_BUILD_STAGE", payload: { stage } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterBuilder);
