import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const PointBuyAssignmentPanel = props => {
  const [pointsUsed, setPointsUsed] = useState(0);
  const { abilityScoreAssignments, setAbilityScoreAssignments, setCanContinue } = props;

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

  const reset = () => {
    setAbilityScoreAssignments({
      strength: 8,
      dexterity: 8,
      constitution: 8,
      intelligence: 8,
      wisdom: 8,
      charisma: 8
    });
    setPointsUsed(0);
    setCanContinue(false);
  };

  useEffect(() => {
    setCanContinue(pointsUsed === 27);
  }, [pointsUsed, setCanContinue]);

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
        <div className='mx-6 pb-6'>
          <button
            className='w-full h-full py-4 font-semibold uppercase tracking-widest text-center rounded block bg-gray-800 text-white shadow-md disabled:bg-gray-200 disabled:text-gray-500'
            onClick={() => reset()}
            disabled={pointsUsed === 0}>
            Reset
          </button>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PointBuyAssignmentPanel);
