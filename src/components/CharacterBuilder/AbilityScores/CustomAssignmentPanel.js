import React, { useState } from "react";

const CustomAssignmentPanel = () => {
  const defaultAssignments = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  };

  const [abilityScoreAssignments, setAbilityScoreAssignments] = useState(defaultAssignments);

  const incrementAbilityScore = ability => {
    if (!canIncrementValue(ability)) return;

    setAbilityScoreAssignments({
      ...abilityScoreAssignments,
      [ability]: abilityScoreAssignments[ability] + 1
    });
  };

  const decrementAbilityScore = ability => {
    if (!canDecrementValue(ability)) return;

    setAbilityScoreAssignments({
      ...abilityScoreAssignments,
      [ability]: abilityScoreAssignments[ability] - 1
    });
  };

  const canIncrementValue = ability => {
    return abilityScoreAssignments[ability] < 20;
  };

  const canDecrementValue = ability => {
    return abilityScoreAssignments[ability] > 1;
  };
  return (
    <>
      <div className='panel mt-6 mx-6 border-gray-900'>
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
      <div className='mt-6 mx-6 p-4 text-center text-white rounded bg-gray-800 shadow-lg'>
        <button className='font-semibold uppercase tracking-widest'>Confirm Ability Scores</button>
      </div>
    </>
  );
};

export default CustomAssignmentPanel;
