import React, { useState } from "react";

const PointBuyAssignmentPanel = () => {
  const defaultArray = {
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8
  };

  const [pointsUsed, setPointsUsed] = useState(0);
  const [abilityScoreAssignments, setAbilityScoreAssignments] = useState(defaultArray);

  const incrementAbilityScore = ability => {
    if (!canIncrementValue(ability)) return;

    let pointChange = 0;

    if (abilityScoreAssignments[ability] === 13 || abilityScoreAssignments[ability] === 14) {
      pointChange += 1;
    }

    pointChange += 1;

    setPointsUsed(pointsUsed + pointChange);

    setAbilityScoreAssignments({
      ...abilityScoreAssignments,
      [ability]: abilityScoreAssignments[ability] + 1
    });
  };

  const decrementAbilityScore = ability => {
    if (!canDecrementValue(ability)) return;

    let pointChange = 0;

    if (abilityScoreAssignments[ability] === 15 || abilityScoreAssignments[ability] === 14) {
      pointChange += 1;
    }

    pointChange += 1;

    setPointsUsed(pointsUsed - pointChange);

    setAbilityScoreAssignments({
      ...abilityScoreAssignments,
      [ability]: abilityScoreAssignments[ability] - 1
    });
  };

  const canIncrementValue = ability => {
    return pointsUsed < 27 && abilityScoreAssignments[ability] !== 15;
  };

  const canDecrementValue = ability => {
    return pointsUsed > 0 && abilityScoreAssignments[ability] !== 8;
  };

  return (
    <>
      <div className='panel mt-6 mx-6 border-gray-900'>
        <div className='py-4 text-center font-semibold text-sm uppercase tracking-widest border-b border-gray-200'>
          <h3>Points Remaining</h3>
          <p className={`mt-2 text-xl font-bold ${pointsUsed === 27 && "text-red-500"}`}>{27 - pointsUsed}</p>
        </div>
        {abilityScoreAssignments.length !== 0 &&
          Object.keys(abilityScoreAssignments)
            .filter(ability => abilityScoreAssignments[ability] !== null)
            .map(ability => {
              return (
                <div key={ability} className='flex justify-between items-center p-4'>
                  <p className='w-1/2 font-semibold uppercase tracking-widest'>{ability}</p>
                  <div className='w-1/3 flex justify-between'>
                    <p
                      className={`w-1/3 text-left ${!canDecrementValue(ability) ? "opacity-0" : "opacity-100"}`}
                      onClick={() => decrementAbilityScore(ability)}
                      disabled={!canDecrementValue(ability)}>
                      -
                    </p>
                    <p className='w-1/3 text-center font-bold'>{abilityScoreAssignments[ability]}</p>
                    <p
                      className={`w-1/3 text-right ${!canIncrementValue(ability) ? "opacity-0" : "opacity-100"}`}
                      onClick={() => incrementAbilityScore(ability)}
                      disabled={!canIncrementValue(ability)}>
                      +
                    </p>
                  </div>
                </div>
              );
            })}
      </div>
      <div className='mt-6 mx-6 shadow-md rounded'>
        <button
          className='w-full h-full py-4 font-semibold uppercase tracking-widest text-center rounded block bg-gray-800 text-white disabled:bg-white disabled:text-gray-500'
          disabled={pointsUsed !== 27}>
          Confirm Scores
        </button>
      </div>
    </>
  );
};

export default PointBuyAssignmentPanel;
