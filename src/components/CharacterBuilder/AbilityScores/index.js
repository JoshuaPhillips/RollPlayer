import React, { useState, useEffect } from "react";
import SectionHeader from "../shared/SectionHeader";
import RandomArrayAssignmentPanel from "./RandomArrayAssignmentPanel";
import StandardArrayAssignmentPanel from "./StandardArrayAssignmentPanel";
import PointBuyAssignmentPanel from "./PointBuyAssignmentPanel";
import CustomAssignmentPanel from "./CustomAssignmentPanel";
import { connect } from "react-redux";

const AbilityScoreSelection = props => {
  const { setAbilityScoreAssignments, setCanContinue } = props;
  const [selectedScoreCalculationMethod, setSelectedScoreCalculationMethod] = useState(null);

  const ScoreSelectionMethodOption = props => {
    const { methodId, methodName, className } = props;

    const methodSelected = selectedScoreCalculationMethod === methodId;

    return (
      <div
        className={`flex justify-between items-center px-4 hover:bg-gray-200 ${className} ${methodSelected &&
          "bg-gray-200"}`}
        onClick={() => setSelectedScoreCalculationMethod(methodId)}>
        <p className='px-2 py-4 font-semibold'>{methodName}</p>
        <span className={`text-xl font-bold ${methodSelected ? "inline" : "hidden"}`}>{"\u2713"}</span>
      </div>
    );
  };

  useEffect(() => {
    switch (selectedScoreCalculationMethod) {
      case "pointBuy":
        setAbilityScoreAssignments({
          strength: 8,
          dexterity: 8,
          constitution: 8,
          intelligence: 8,
          wisdom: 8,
          charisma: 8
        });
        setCanContinue(false);
        break;

      case "custom":
        setAbilityScoreAssignments({
          strength: 10,
          dexterity: 10,
          constitution: 10,
          intelligence: 10,
          wisdom: 10,
          charisma: 10
        });
        setCanContinue(true);
        break;

      default:
        setAbilityScoreAssignments({
          strength: null,
          dexterity: null,
          constitution: null,
          intelligence: null,
          wisdom: null,
          charisma: null
        });
        setCanContinue(false);
        break;
    }
  }, [setCanContinue, selectedScoreCalculationMethod, setAbilityScoreAssignments]);

  return (
    <section className='pb-10'>
      <SectionHeader title='3. Ability Scores'>
        <p className='px-4'>
          Much of what your character does in the game depends on their abilities: <strong>Strength</strong>,{" "}
          <strong>Dexterity</strong>, <strong>Constitution</strong>, <strong>Intelligence</strong>,{" "}
          <strong>Wisdom</strong>, and <strong>Charisma</strong>. The six abilities and their use in the game are
          described below.
        </p>
        <p className='pt-4 px-4'>
          You can generate your character's six <strong>ability scores</strong> using a variety of methods. The standard
          process is through rolling a number of six-sided dice, but there are other, less random choices as well. These
          are described below.
        </p>
      </SectionHeader>

      <div className='pb-10'>
        <div>
          <h2 className='pt-6 mx-6 font-semibold uppercase tracking-wide text-sm'>
            A. How do you want to calculate your Ability Scores?
          </h2>
          <div className='panel mt-6 mx-6 border-gray-800 cursor-pointer'>
            <ScoreSelectionMethodOption methodId={"standard"} methodName='Standard Array' />
            <ScoreSelectionMethodOption methodId={"random"} methodName='Random Array' />
            <ScoreSelectionMethodOption methodId={"pointBuy"} methodName='Point Buy' />
            <ScoreSelectionMethodOption methodId={"custom"} methodName='Custom' />
          </div>
        </div>

        {selectedScoreCalculationMethod !== null && (
          <div className={`${selectedScoreCalculationMethod ? "block" : "hidden"}`}>
            <h2 className='pt-6 mx-6 font-semibold uppercase tracking-wide text-sm'>
              B. Assign your scores to each of your character's attributes.
            </h2>

            {selectedScoreCalculationMethod === "random" && <RandomArrayAssignmentPanel />}
            {selectedScoreCalculationMethod === "standard" && <StandardArrayAssignmentPanel />}
            {selectedScoreCalculationMethod === "pointBuy" && <PointBuyAssignmentPanel />}
            {selectedScoreCalculationMethod === "custom" && <CustomAssignmentPanel />}
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  const { currentBuildStage } = state.characterBuilder;

  return {
    currentBuildStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAbilityScoreAssignments: assignments =>
      dispatch({ type: "SET_ABILITY_SCORE_ASSIGNMENTS", payload: { assignments } }),
    setCanContinue: value => dispatch({ type: "SET_CAN_CONTINUE", payload: { value } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AbilityScoreSelection);
