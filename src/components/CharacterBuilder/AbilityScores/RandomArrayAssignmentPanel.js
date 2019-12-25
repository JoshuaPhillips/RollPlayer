import React, { useState } from "react";

const generateRandomArray = () => {
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

const AbilityScoreAssignmentPanel = () => {
  const initialAbilityScoreAssignments = {
    strength: null,
    dexterity: null,
    constitution: null,
    intelligence: null,
    wisdom: null,
    charisma: null
  };

  const [abilityScores, setAbilityScores] = useState(generateRandomArray());
  const [abilityScoreAssignments, assignAbilityScores] = useState(initialAbilityScoreAssignments);

  const assignedScores = Object.keys(abilityScoreAssignments).filter(
    ability => abilityScoreAssignments[ability] !== null
  );
  const unassignedScores = Object.keys(abilityScoreAssignments).filter(
    ability => abilityScoreAssignments[ability] === null
  );

  const rollAgain = () => {
    assignAbilityScores(initialAbilityScoreAssignments);
    setAbilityScores(generateRandomArray());
  };

  const assignAbilityScore = (ability, score, index) => {
    assignAbilityScores({ ...abilityScoreAssignments, [ability]: score });
    setAbilityScores([...abilityScores.slice(0, index), ...abilityScores.slice(index + 1)]);
  };

  const unassignAbilityScore = ability => {
    const score = abilityScoreAssignments[ability];
    assignAbilityScores({ ...abilityScoreAssignments, [ability]: null });
    setAbilityScores(
      [score, ...abilityScores].sort((a, b) => {
        return a - b;
      })
    );
  };

  return (
    <>
      {unassignedScores.length !== 0 && (
        <div className='panel mt-6 mx-6 border-gray-900 flex overflow-x-hidden'>
          {unassignedScores.map(ability => {
            return (
              <div key={ability} className='w-full flex-shrink-0'>
                <p className='py-4 text-center font-semibold uppercase text-sm tracking-widest border-b border-gray-200'>
                  Select {ability.toUpperCase()} score
                </p>

                <div className='text-center'>
                  {abilityScores.map((score, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => assignAbilityScore(ability, score, index)}
                        className='w-1/6 font-semibold py-4 hover:bg-gray-200'>
                        {score}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {assignedScores.length !== 0 && (
        <div className='panel mt-6 mx-6 border-gray-900'>
          {Object.keys(abilityScoreAssignments)
            .filter(ability => abilityScoreAssignments[ability] !== null)
            .map(ability => {
              return (
                <div key={ability} className='flex justify-between items-center p-4'>
                  <p className='w-1/2 font-semibold uppercase tracking-widest'>{ability}</p>
                  <p className='w-1/4 text-right font-bold'>{abilityScoreAssignments[ability]}</p>
                  <p className='w-1/4 text-right' onClick={() => unassignAbilityScore(ability)}>
                    X
                  </p>
                </div>
              );
            })}
        </div>
      )}

      <div className='flex mx-6 mt-6'>
        <div className='flex-1 shadow-md'>
          <button
            className='w-full h-full py-4 font-semibold rounded uppercase tracking-widest text-center block bg-gray-800 text-white'
            onClick={() => rollAgain()}
            disabled={unassignedScores.length !== 0}>
            Roll Again
          </button>
        </div>
        <div className='flex-1 ml-2 shadow-md'>
          <button
            className='w-full h-full py-4 font-semibold rounded uppercase tracking-widest text-center block bg-gray-800 text-white disabled:bg-white disabled:text-gray-500'
            disabled={assignedScores.length !== 6}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default AbilityScoreAssignmentPanel;
