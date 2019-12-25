import React from "react";
import { connect } from "react-redux";

// listing the classes explicitly prevents purgecss from removing them.
// creating them programatically would mean they were missed in Purge's sweep.
const classThemeMap = {
  barbarian: {
    borderColor: "border-gray-700",
    backgroundColor: "bg-gray-700",
    textColor: "text-gray-700"
  },
  bard: {
    borderColor: "border-teal-700",
    backgroundColor: "bg-teal-700",
    textColor: "text-teal-700"
  },
  cleric: {
    borderColor: "border-orange-600",
    backgroundColor: "bg-orange-600",
    textColor: "text-orange-600"
  },
  druid: {
    borderColor: "border-blue-700",
    backgroundColor: "bg-blue-700",
    textColor: "text-blue-700"
  },
  fighter: {
    borderColor: "border-blue-400",
    backgroundColor: "bg-blue-400",
    textColor: "text-blue-400"
  },
  monk: {
    borderColor: "border-yellow-600",
    backgroundColor: "bg-yellow-600",
    textColor: "text-yellow-600"
  },
  paladin: {
    borderColor: "border-gray-800",
    backgroundColor: "bg-gray-800",
    textColor: "text-gray-800"
  },
  ranger: {
    borderColor: "border-teal-700",
    backgroundColor: "bg-teal-700",
    textColor: "text-teal-700"
  },
  rogue: {
    borderColor: "border-red-800",
    backgroundColor: "bg-red-800",
    textColor: "text-red-800"
  },
  sorcerer: {
    borderColor: "border-orange-500",
    backgroundColor: "bg-orange-500",
    textColor: "text-orange-500"
  },
  warlock: {
    borderColor: "border-purple-800",
    backgroundColor: "bg-purple-800",
    textColor: "text-purple-800"
  },
  wizard: {
    borderColor: "border-blue-600",
    backgroundColor: "bg-blue-600",
    textColor: "text-blue-600"
  }
};

const StatEntry = props => {
  const { title, children } = props;
  return (
    <div className='px-4 pt-4'>
      <h5 className='uppercase text-xs font-bold tracking-wide'>{title}</h5>
      {children}
    </div>
  );
};

const ClassCardSection = props => {
  const { title, children, borderColor, customClasses } = props;

  return (
    <div className={`panel ${borderColor} ${customClasses}`}>
      <div className={`panel relative py-2 text-center shadow-lg ml-2 -mt-6 w-1/2 uppercase ${borderColor}`}>
        <h4 className='font-semibold tracking-wide'>{title}</h4>
      </div>

      {children}
    </div>
  );
};

const ClassCard = props => {
  const {
    class: { name, imageSrc, imageAlt, hitDice, proficiencies, equipment, equipmentChoices, subClass, features },
    selectedClass,
    setSelectedClass,
    setCanContinue
  } = props;

  const { borderColor, backgroundColor, textColor } = classThemeMap[name.toLowerCase()];

  const selectClass = name => {
    setSelectedClass(name);
    setCanContinue(true);
  };

  return (
    <div className={`py-4 w-screen max-w-xs flex-shrink-0 px-2 ${textColor}`}>
      <div
        className={`panel relative h-64 overflow-y-hidden cursor-pointer ${borderColor}`}
        onClick={() => selectClass(name)}>
        <img className='mx-auto object-contain bg-white rounded-lg' src={`./images/${imageSrc}`} alt={imageAlt} />
        {selectedClass === name && (
          <span
            className={`absolute top-0 right-0 mr-6 text-4xl p-2 rounded rounded-t-none shadow-xl text-white ${backgroundColor}`}>
            {"\u2713"}
          </span>
        )}
      </div>

      <h3
        className={`panel relative uppercase font-bold tracking-widest 
        shadow-lg text-xl mx-auto -mt-8 w-2/3 py-4 text-center ${borderColor}`}>
        {name}
      </h3>

      <div
        className={`my-6 w-3/4 p-2 mx-auto text-center rounded-full text-white font-semibold shadow-md ${backgroundColor} ${borderColor}`}>
        <h4>Subclass: {subClass}</h4>
      </div>

      <div className='max-h-screen overflow-y-auto pt-6 pb-2 rounded'>
        <div>
          <ClassCardSection title='Hit Dice' borderColor={borderColor} customClasses='pb-8'>
            <div className='py-6'>
              <StatEntry title='Hit Dice'>
                <p>d{hitDice}</p>
              </StatEntry>

              <StatEntry title='Hit Points at 1st Level'>
                <p>{hitDice} + your Constitution modifier</p>
              </StatEntry>

              <StatEntry title='Hit Points at Higher Levels'>
                <p>
                  1d{hitDice} (or {Math.ceil((hitDice + 1) / 2)}) + your Constitution modifier per {name.toLowerCase()}{" "}
                  level after 1st
                </p>
              </StatEntry>
            </div>
          </ClassCardSection>

          <ClassCardSection title='Proficiencies' borderColor={borderColor} customClasses='pb-8'>
            <div className='py-6'>
              {proficiencies.map(({ name, proficiencies }, index) => {
                return proficiencies.length === 0 ? null : name === "Skill Choices" ? (
                  proficiencies.choices.length === 0 ? null : (
                    <StatEntry key={index} title='Additional Skills'>
                      <p>
                        Choose {proficiencies.numChoices} from{" "}
                        {[...proficiencies.choices.slice(0, proficiencies.choices.length - 1)].join(", ")} or{" "}
                        {proficiencies.choices[proficiencies.choices.length - 1]}
                      </p>
                    </StatEntry>
                  )
                ) : (
                  <StatEntry key={index} title={name}>
                    <p>{proficiencies.join(", ")}</p>
                  </StatEntry>
                );
              })}
            </div>
          </ClassCardSection>

          <ClassCardSection title='Equipment' borderColor={borderColor} customClasses='pb-8'>
            <div className='py-6'>
              <ul className='list-disc ml-8'>
                <li>{equipment.join(", ")}</li>
                {equipmentChoices.length !== 0 &&
                  equipmentChoices.map(({ choices }, index) => {
                    return (
                      <li key={index}>
                        {[...choices.slice(0, choices.length - 1)].join(", ")}, or {choices[choices.length - 1]}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </ClassCardSection>

          <ClassCardSection title='Features' borderColor={borderColor}>
            <div className='pt-4'>
              {features.map((feature, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`p-4 flex justify-between cursor-pointer border-t border-gray-100 hover:bg-gray-200`}>
                      <h4 className={`text-lg font-semibold `}>{feature}</h4>
                      <span className='mr-2 font-semibold'>></span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </ClassCardSection>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { selectedClass } = state.characterBuilder;

  return {
    selectedClass
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCanContinue: value => dispatch({ type: "SET_CAN_CONTINUE", payload: { value } }),
    setSelectedClass: selectedClass => dispatch({ type: "SET_SELECTED_CLASS", payload: { selectedClass } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassCard);
