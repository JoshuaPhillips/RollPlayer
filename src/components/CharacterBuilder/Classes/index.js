import React, { useState } from "react";
import ClassCard from "./ClassCard";
import { connect } from "react-redux";
import * as ACTION_TYPES from "../../../redux/ActionTypes";

import { classes } from "../../../data/classes.json";
import SectionHeader from "../shared/SectionHeader";

const ClassSelection = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <section className='pb-10'>
      <SectionHeader title='2. Choose a Class'>
        <p className='px-4'>
          Every adventurer is a member of a class. Class broadly describes a character's vocation, what special talents
          they possess, and the tactics they are most likely to employ when exploring a dungeon, fighting monsters, or
          engaging in a tense negotiation. The character classes are described below.
        </p>
        <p className='pt-4 px-4'>
          Your character receives a number of benefits from your choice of class. Many of these benefits are{" "}
          <strong>class features</strong> - capabilities (including spellcasting) that set your character apart from
          members of other classes. You also gain a number of <strong>proficiencies</strong>: armor, weapons, skills,
          saving throws, and sometimes tools. Your proficiencies define many of the things your character can do
          particularly well, from using certain weapons to telling a convincing lie.
        </p>
        <p className='pt-4 px-4'>
          Your classes features will be automatically added to your character summary at the end.
        </p>
      </SectionHeader>

      <div className='overflow-x-auto px-4 py-4'>
        <div className='inline-flex'>
          {classes.map(currentClass => {
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

const mapStateToProps = state => {
  const { currentBuildStage } = state.characterBuilder;

  return {
    currentBuildStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCanContinue: value => dispatch({ type: ACTION_TYPES.SET_CAN_CONTINUE, payload: { value } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassSelection);
