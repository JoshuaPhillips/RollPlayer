import React, { useState, useEffect } from "react";

const AbilityScoreSelection = props => {
  const { sectionRef } = props;
  const [showSectionHelp, toggleSectionHelp] = useState(false);
  const [selectedScoreCalculationMethod, setSelectedScoreCalculationMethod] = useState(null);
  const [abilityScoreArray, setAbilityScoreArray] = useState([]);
  const [chosenAbilityScores, setChosenAbilityScores] = useState({
    strength: null,
    dexterity: null,
    constitution: null,
    intelligence: null,
    wisdom: null,
    charisma: null
  });

  const generateHighestRollsArray = () => {
    let array = [];

    for (let i = 0; i < 6; i++) {
      let diceRolls = [];
      for (let j = 0; j < 4; j++) {
        diceRolls.push(Math.floor(Math.random() * 6) + 1);
      }

      array.push(
        diceRolls
          .sort()
          .slice(1, 4)
          .reduce((total = 0, amount) => {
            return total + amount;
          })
      );
    }

    return array.sort((a, b) => {
      return a - b;
    });
  };

  useEffect(() => {
    switch (selectedScoreCalculationMethod) {
      case "standard":
        setAbilityScoreArray([8, 10, 12, 13, 14, 15]);
        break;

      case "random":
        setAbilityScoreArray(generateHighestRollsArray());
        break;

      case "pointBuy":
        setAbilityScoreArray([8, 8, 8, 8, 8, 8]);
        break;

      default:
        setAbilityScoreArray([]);
        break;
    }
  }, [selectedScoreCalculationMethod]);

  const refreshRandomArray = () => {
    setAbilityScoreArray(generateHighestRollsArray());
  };

  const ScoreSelectionMethodOption = props => {
    const { methodId, methodName } = props;

    return (
      <div
        className='flex justify-between items-center px-4 hover:bg-gray-200'
        onClick={() => setSelectedScoreCalculationMethod(methodId)}>
        <p className='px-2 py-4 font-semibold'>{methodName}</p>
        <span className={`text-xl font-bold ${selectedScoreCalculationMethod === methodId ? "inline" : "hidden"}`}>
          {"\u2713"}
        </span>
      </div>
    );
  };

  return (
    <section ref={sectionRef}>
      <div>
        <div className='flex flex-wrap justify-between py-6 px-4 font-semibold bg-gray-800 text-gray-400'>
          <h2 className='uppercase tracking-widest'>3. Ability Scores</h2>
          <button className='tracking-wide outline-none' onClick={() => toggleSectionHelp(!showSectionHelp)}>
            More Info
          </button>
        </div>
        <div className={`${showSectionHelp ? "block" : "hidden"} py-4 leading-relaxed text-gray-700 bg-white`}>
          <p className='px-4'>
            Much of what your character does in the game depends on their abilities: <strong>Strength</strong>,{" "}
            <strong>Dexterity</strong>, <strong>Constitution</strong>, <strong>Intelligence</strong>,{" "}
            <strong>Wisdom</strong>, and <strong>Charisma</strong>. The six abilities and their use in the game are
            described below.
          </p>
          <p className='py-4 px-4'>
            You can generate your character's six <strong>ability scores</strong> using a variety of methods. The
            standard process is through rolling a number of six-sided dice, but there are other, less random choices as
            well. These are described below.
          </p>
        </div>
      </div>
      <div className='bg-gray-200 pb-10'>
        <div>
          <h2 className='pt-6 mx-6 font-semibold uppercase tracking-wide text-sm'>
            A. Choose a method for determining your character's Ability Scores:
          </h2>
          <div className='bg-white w-3/4 mx-auto border-t-4 border-gray-800 mt-6 rounded shadow cursor-pointer'>
            <ScoreSelectionMethodOption methodId={"standard"} methodName='Standard Array' />
            <ScoreSelectionMethodOption methodId={"random"} methodName='Random Array' />
            <ScoreSelectionMethodOption methodId={"pointBuy"} methodName='Point Buy' />
          </div>
        </div>

        <div className={`${selectedScoreCalculationMethod ? "block" : "hidden"}`}>
          <h2 className='pt-6 mx-6 font-semibold uppercase tracking-wide text-sm'>B. Get your Ability Scores Array</h2>

          <div
            className={` mt-4 mx-auto w-3/4 bg-white rounded p-4 shadow border-t-4 border-gray-800 ${
              selectedScoreCalculationMethod === "standard" ? "block" : "hidden"
            }`}>
            <h3 className='font-semibold text-lg tracking-wide text-center'>{abilityScoreArray.join(", ")}</h3>
          </div>

          <div
            className={` mt-4 mx-auto w-3/4 bg-white rounded p-4 shadow border-t-4 border-gray-800 ${
              selectedScoreCalculationMethod === "random" ? "block" : "hidden"
            }`}>
            <h3 className='font-semibold text-lg tracking-wide text-center'>{abilityScoreArray.join(", ")}</h3>
            <button
              className='text-center rounded mt-6 outline-none w-full bg-gray-800 text-white font-semibold py-2'
              onClick={() => refreshRandomArray()}>
              Roll Again
            </button>
          </div>

          <div
            className={` mt-4 mx-auto w-3/4 bg-white rounded p-4 shadow border-t-4 border-gray-800 ${
              selectedScoreCalculationMethod === "pointBuy" ? "block" : "hidden"
            }`}>
            <h3 className='font-semibold text-lg tracking-wide text-center'>{abilityScoreArray.join(", ")}</h3>
          </div>
        </div>

        <div>
          <div>
            <p>Strength</p>
            <input
              type='number'
              min={0}
              value={chosenAbilityScores.strength || 0}
              onChange={e => setChosenAbilityScores({ ...chosenAbilityScores, strength: e.target.value })}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AbilityScoreSelection;
