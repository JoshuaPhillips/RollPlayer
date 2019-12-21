import React, { useState, useContext } from "react";
import { CharacterBuilderContext } from "../index";
import SectionHeader from "../shared/SectionHeader";
import RandomArrayAssignmentPanel from "./RandomArrayAssignmentPanel";
import StandardArrayAssignmentPanel from "./StandardArrayAssignmentPanel";

const AbilityScoreSelection = props => {
  const { sectionRef } = props;
  const [selectedScoreCalculationMethod, setSelectedScoreCalculationMethod] = useState(null);
  const { currentStage } = useContext(CharacterBuilderContext);

  const ScoreSelectionMethodOption = props => {
    const { methodId, methodName, className } = props;

    return (
      <div
        className={`flex justify-between items-center px-4 hover:bg-gray-200 ${className}`}
        onClick={() => setSelectedScoreCalculationMethod(methodId)}>
        <p className='px-2 py-4 font-semibold'>{methodName}</p>
        <span className={`text-xl font-bold ${selectedScoreCalculationMethod === methodId ? "inline" : "hidden"}`}>
          {"\u2713"}
        </span>
      </div>
    );
  };

  return (
    <section className={`${currentStage >= 2 ? "block" : "hidden"}`} ref={sectionRef}>
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
          <div className='panel w-3/4 mx-auto border-gray-800 mt-6 cursor-pointer'>
            <ScoreSelectionMethodOption methodId={"standard"} methodName='Standard Array' />
            <ScoreSelectionMethodOption methodId={"random"} methodName='Random Array' />
            <ScoreSelectionMethodOption methodId={"pointBuy"} methodName='Point Buy' />
            <ScoreSelectionMethodOption methodId={"custom"} methodName='Custom' />
          </div>
        </div>

        <div className={`${selectedScoreCalculationMethod ? "block" : "hidden"}`}>
          <h2 className='pt-6 mx-6 font-semibold uppercase tracking-wide text-sm'>
            B. Assign your scores to each of your characer's attributes.
          </h2>

          {selectedScoreCalculationMethod === "random" && <RandomArrayAssignmentPanel />}
          {selectedScoreCalculationMethod === "standard" && <StandardArrayAssignmentPanel />}
        </div>
      </div>
    </section>
  );
};

export default AbilityScoreSelection;
