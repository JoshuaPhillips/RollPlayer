import React from "react";
import { connect } from "react-redux";
import * as ACTION_TYPES from "../../../redux/ActionTypes";

// listing the classes explicitly prevents purgecss from removing them.
// creating them programatically would mean they were missed in Purge's sweep.
const raceClassMap = {
  dwarf: {
    border: "border-red-800",
    background: "bg-red-800",
    text: "text-red-800"
  },
  elf: {
    border: "border-teal-600",
    background: "bg-teal-600",
    text: "text-teal-800"
  },
  halfling: {
    border: "border-orange-600",
    background: "bg-orange-600",
    text: "text-orange-800"
  },
  human: {
    border: "border-blue-700",
    background: "bg-blue-700",
    text: "text-blue-700"
  },
  dragonborn: {
    border: "border-orange-700",
    background: "bg-orange-700",
    text: "text-orange-700"
  },
  gnome: {
    border: "border-green-800",
    background: "bg-green-800",
    text: "text-green-800"
  },
  "half-elf": {
    border: "border-gray-800",
    background: "bg-gray-800",
    text: "text-gray-800"
  },
  "half-orc": {
    border: "border-yellow-700",
    background: "bg-yellow-700",
    text: "text-yellow-900"
  },
  tiefling: {
    border: "border-purple-800",
    background: "bg-purple-800",
    text: "text-purple-800"
  }
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

  return (
    <div className='py-4 w-5/6 max-w-xs flex-shrink-0 px-2' onClick={() => selectRace(name)}>
      <div className={`panel relative h-64 overflow-y-hidden ${raceClassMap[name.toLowerCase()].border}`}>
        <img className='mx-auto object-contain bg-white rounded-lg' src={`./images/${imageSrc}`} alt={imageAlt} />
        {selectedRace === name && (
          <span
            className={`absolute top-0 right-0 mr-6 text-4xl p-2 rounded rounded-t-none shadow-xl text-white ${
              raceClassMap[name.toLowerCase()].background
            } `}>
            {"\u2713"}
          </span>
        )}
      </div>

      <h3
        className={`panel relative uppercase font-bold tracking-widest
        shadow-lg text-xl mx-auto -mt-8 w-2/3 py-4 text-center 
        ${raceClassMap[name.toLowerCase()].text} ${raceClassMap[name.toLowerCase()].border}
        `}>
        {name}
      </h3>
      <div className={`panel max-h-screen overflow-y-auto p-8 pt-0 mt-4 ${raceClassMap[name.toLowerCase()].border}`}>
        {features.map((feature, index) => {
          return (
            <React.Fragment key={index}>
              <h4 className={`uppercase tracking-widest ${raceClassMap[name.toLowerCase()].text} mt-8 font-semibold`}>
                {feature.name}
              </h4>
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
