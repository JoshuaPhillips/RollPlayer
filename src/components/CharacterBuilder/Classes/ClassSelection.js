import React, { useState, useContext } from "react";
import { CharacterBuilderContext } from "../index";
import ClassCard from "../Classes/ClassCard";

import data from "../../../data.json";

const ClassSelection = props => {
  const [showSectionHelp, toggleSectionHelp] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const { toggleCanContinue, currentStage } = useContext(CharacterBuilderContext);

  const { sectionRef } = props;

  if (selectedClass) {
    toggleCanContinue(true);
  }

  return (
    <section className={`pb-10 bg-gray-100 ${currentStage >= 1 ? "block" : "hidden"}`} ref={sectionRef}>
      <div className='flex flex-wrap justify-between py-6 px-4 font-semibold bg-gray-800 text-gray-400'>
        <h2 className='uppercase tracking-widest'>2. Choose a class</h2>
        <button className='tracking-wide outline-none' onClick={() => toggleSectionHelp(!showSectionHelp)}>
          More Info
        </button>
      </div>
      <div className={`${showSectionHelp ? "block" : "hidden"} py-4 leading-relaxed text-gray-700 bg-white`}>
        <p className='mb-4 px-4'>
          Every adventurer is a member of a class. Class broadly describes a character's vocatoin, what special talents
          they posses, and the tactics they are most likely to employ when exploring a dungeon, fighting monsters, or
          engaging in a tense negotiation. The character classes are described below.
        </p>
        <p className='mb-4 px-4 '>
          Your character receives a number of benefits from your choice of class. Many of these benefits are{" "}
          <strong>class features</strong> - capabilities (including spellcasting) that set your character apart from
          members of other classes. You also gain a number of <strong>proficiencies</strong>: armor, weapons, skills,
          saving throws, and sometimes tools. Your proficiencies define many of the things your character can do
          particularly well, from using certain weapons to telling a convincing lie.
        </p>
        <p className='mb-4 px-4 '>
          Your classes features will be automatically added to your character summary at the end.
        </p>
      </div>

      <div className='overflow-x-auto px-4 py-4'>
        <div className='inline-flex'>
          {data.classes.map(currentClass => {
            return (
              <ClassCard
                key={`staticClass__${currentClass.name.toLowerCase()}`}
                class={currentClass}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClassSelection;
