import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const standardArray = [8, 10, 12, 13, 14, 15];

const StandardArrayAssignmentPanel = props => {
  const { abilityScoreAssignments, setAbilityScoreAssignments, setCanContinue } = props;
  const [abilityScores, setAbilityScores] = useState(standardArray);

  const assignedScores = Object.keys(abilityScoreAssignments).filter(
    ability => abilityScoreAssignments[ability] !== null
  );
  const unassignedScores = Object.keys(abilityScoreAssignments).filter(
    ability => abilityScoreAssignments[ability] === null
  );

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

  const reset = () => {
    setAbilityScoreAssignments({
      strength: null,
      dexterity: null,
      constitution: null,
      intelligence: null,
      wisdom: null,
      charisma: null
    });
    setAbilityScores(standardArray);
    setCanContinue(false);
  };

  useEffect(() => {
    setCanContinue(unassignedScores.length === 0);
  }, [setCanContinue, unassignedScores, abilityScoreAssignments]);

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
        <div className='panel mt-6 mx-5 border-gray-900'>
          {Object.keys(abilityScoreAssignments)
            .filter(ability => abilityScoreAssignments[ability] !== null)
            .map(ability => {
              return (
                <div key={ability} className='flex justify-between items-center p-4 border-b border-gray-100'>
                  <p className='w-1/2 font-semibold uppercase tracking-widest'>{ability}</p>
                  <p className='w-1/4 text-right font-bold'>{abilityScoreAssignments[ability]}</p>
                  <p className='w-1/4 text-right' onClick={() => unassignAbilityScore(ability)}>
                    X
                  </p>
                </div>
              );
            })}

          <div className='mx-6 pb-6'>
            <button
              className='w-full h-full py-4 font-semibold uppercase tracking-widest text-center rounded block bg-gray-800 text-white shadow-md disabled:bg-gray-200 disabled:text-gray-500'
              onClick={() => reset()}
              disabled={assignedScores.length === 0}>
              Reset
            </button>
          </div>
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
    setCanContinue: value => dispatch({ type: "SET_CAN_CONTINUE", payload: { value } }),
    setAbilityScoreAssignments: assignments =>
      dispatch({ type: "SET_ABILITY_SCORE_ASSIGNMENTS", payload: { assignments } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StandardArrayAssignmentPanel);
