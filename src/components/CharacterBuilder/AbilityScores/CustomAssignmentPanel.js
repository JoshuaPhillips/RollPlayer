import React from "react";
import { connect } from "react-redux";

const CustomAssignmentPanel = props => {
  const { abilityScoreAssignments, setAbilityScoreAssignments } = props;

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
    </>
  );
};

const mapStateToProps = state => {
  const { canContinue, abilityScoreAssignments } = state.characterBuilder;

  return {
    canContinue,
    abilityScoreAssignments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAbilityScoreAssignments: assignments =>
      dispatch({ type: "SET_ABILITY_SCORE_ASSIGNMENTS", payload: { assignments } }),
    setCanContinue: value => dispatch({ type: "SET_CAN_CONTINUE", payload: { value } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomAssignmentPanel);
