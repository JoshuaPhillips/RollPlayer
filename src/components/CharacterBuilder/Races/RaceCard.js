import React from "react";
import { connect } from "react-redux";
import * as ACTION_TYPES from "../../../redux/ActionTypes";

const raceClassMap = {
  dwarf: "red-800",
  elf: "teal-600",
  halfling: "orange-600",
  human: "blue-700",
  dragonborn: "orange-700",
  gnome: "green-800",
  "half-elf": "gray-800",
  "half-orc": "yellow-700",
  tiefling: "purple-800"
};

const RaceCard = props => {
  const {
    race: { name, imageSrc, imageAlt, features },
    selectedRace,
    setSelectedRace,
    setCanContinue
  } = props;

  const selectRace = name => {
    setSelectedRace(name);
    setCanContinue(true);
  };

  const borderColorClass = `border-${raceClassMap[name.toLowerCase()]}`;
  const backgroundColorClass = `bg-${raceClassMap[name.toLowerCase()]}`;
  const textColorClass = `text-${raceClassMap[name.toLowerCase()]}`;

  return (
    <div className='py-4 w-5/6 max-w-xs flex-shrink-0 px-2' onClick={() => selectRace(name)}>
      <div className={`panel relative h-64 overflow-y-hidden ${borderColorClass}`}>
        <img className='mx-auto object-contain bg-white rounded-lg' src={`./images/${imageSrc}`} alt={imageAlt} />
        {selectedRace === name && (
          <span
            className={`absolute top-0 right-0 mr-6 text-4xl p-2 rounded rounded-t-none shadow-xl text-white ${backgroundColorClass}`}>
            {"\u2713"}
          </span>
        )}
      </div>

      <h3
        className={`panel relative uppercase font-bold tracking-widest
        shadow-lg text-xl mx-auto -mt-8 w-2/3 py-4 text-center ${textColorClass} ${borderColorClass}`}>
        {name}
      </h3>
      <div className={`panel max-h-screen overflow-y-auto p-8 pt-0 mt-4 ${borderColorClass}`}>
        {features.map((feature, index) => {
          return (
            <React.Fragment key={index}>
              <h4 className={`uppercase tracking-widest ${textColorClass} mt-8 font-semibold`}>{feature.name}</h4>
              <p className='mt-2 text-gray-900'>{feature.description}</p>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { selectedRace } = state.characterBuilder;

  return {
    selectedRace
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCanContinue: value => dispatch({ type: ACTION_TYPES.SET_CAN_CONTINUE, payload: { value } }),
    setSelectedRace: race => dispatch({ type: ACTION_TYPES.SET_SELECTED_RACE, payload: { race } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RaceCard);
