import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as ACTION_TYPES from "../../../redux/ActionTypes";

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

const RandomArrayAssignmentPanel = props => {
  const { abilityScoreAssignments, setAbilityScoreAssignments, setCanContinue } = props;
  const [abilityScores, setAbilityScores] = useState(generateRandomArray());

  const assignedScores = Object.keys(abilityScoreAssignments).filter(
    ability => abilityScoreAssignments[ability] !== null
  );
  const unassignedScores = Object.keys(abilityScoreAssignments).filter(
    ability => abilityScoreAssignments[ability] === null
  );

  const rollAgain = () => {
    setAbilityScoreAssignments({
      strength: null,
      dexterity: null,
      constitution: null,
      intelligence: null,
      wisdom: null,
      charisma: null
    });
    setAbilityScores(generateRandomArray());
    setCanContinue(false);
  };

  const assignAbilityScore = (ability, score, index) => {
    setAbilityScoreAssignments({ ...abilityScoreAssignments, [ability]: score });
    setAbilityScores([...abilityScores.slice(0, index), ...abilityScores.slice(index + 1)]);
  };

  const unassignAbilityScore = ability => {
    const score = abilityScoreAssignments[ability];
    setAbilityScoreAssignments({ ...abilityScoreAssignments, [ability]: null });
    setAbilityScores(
      [score, ...abilityScores].sort((a, b) => {
        return a - b;
      })
    );
  };

  useEffect(() => {
    if (unassignedScores.length === 0) {
      setCanContinue(true);
    }
  }, [unassignedScores, setCanContinue]);

  return (
    <>
      {unassignedScores.length !== 0 && (
        <div className='panel mt-6 mx-6 border-gray-900'>
          <div key={unassignedScores[0]} className='w-full flex-shrink-0'>
            <p className='py-4 text-center font-semibold uppercase text-sm tracking-widest border-b border-gray-200'>
              Select {unassignedScores[0].toUpperCase()} score
            </p>

            <div className='text-center'>
              {abilityScores.map((score, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => assignAbilityScore(unassignedScores[0], score, index)}
                    className='w-1/6 font-semibold py-4 hover:bg-gray-200'>
                    {score}
                  </button>
                );
              })}
            </div>
          </div>
          <div className='pb-6 mx-6 shadow-md'>
            <button
              className='w-full h-full py-4 font-semibold rounded uppercase tracking-widest text-center block bg-gray-800 text-white disabled:bg-gray-200 disabled:text-gray-500'
              onClick={() => rollAgain()}>
              Roll Again
            </button>
          </div>
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
    </>
  );
};

const mapStateToProps = state => {
  const { abilityScoreAssignments } = state.characterBuilder;

  return {
    abilityScoreAssignments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAbilityScoreAssignments: assignments =>
      dispatch({ type: ACTION_TYPES.SET_ABILITY_SCORE_ASSIGNMENTS, payload: { assignments } }),
    setCanContinue: value => dispatch({ type: ACTION_TYPES.SET_CAN_CONTINUE, payload: { value } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RandomArrayAssignmentPanel);
