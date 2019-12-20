import React, { useState, useContext, useEffect } from "react";
import RaceCard from "./RaceCard";
import { CharacterBuilderContext } from "../index";

import data from "../../../data.json";

const RaceSelection = props => {
  const [showSectionHelp, toggleSectionHelp] = useState(false);
  const [selectedRace, setSelectedRace] = useState(null);
  const { toggleCanContinue, currentStage } = useContext(CharacterBuilderContext);

  const { sectionRef } = props;

  useEffect(() => {
    if (selectedRace !== null) toggleCanContinue(true);
  }, [toggleCanContinue, selectedRace]);

  return (
    <section className={`pb-10 bg-gray-100 ${currentStage >= 0 ? "block" : "hidden"}`} ref={sectionRef}>
      <div className='flex flex-wrap justify-between py-6 px-4 font-semibold bg-gray-800 text-gray-400'>
        <h2 className='uppercase tracking-widest'>1. Choose a race</h2>
        <button className='tracking-wide outline-none' onClick={() => toggleSectionHelp(!showSectionHelp)}>
          More Info
        </button>
      </div>
      <div className={`${showSectionHelp ? "block" : "hidden"} py-4 leading-relaxed text-gray-700 bg-white`}>
        <p className='mb-4 px-4'>
          Every character belongs to a race, one of the many intelligent humanoid species in the D&amp;D world. The most
          common player character races are dwarves, elves, halflings, and humans. Some races also have{" "}
          <strong>subraces,</strong> such as mountain dwarf or wood elf. Below there is more information about these
          races, as well as the less widespread races of dragonborn, gnomes, half-elves, half-orcs, and tieflings.
        </p>
        <p className='mb-4 px-4'>
          The race you choose contributes to your character's identity in an important way, by establishing a general
          appearance and the natural talents gained from culture and ancestry. Your character's race grants particular
          racial traits, such as special senses, proficiency with certain weapons or tools, proficiency in one or more
          skills, or the ability to use minor spells. These traits sometimes dovetail with the capabilities of certain
          classes (see Step Two). For example, the racial traits of lightfoot halflings make them exceptional rogues,
          and high elves tend to be powerful wizards. Sometimes playing against type can be fun, too. Half-orc paladins
          and mountain dwarf wizards, for example, can be unusual but memorable characters.
        </p>

        <p className='mb-4 px-4'>
          Your race also increases one or more of your Ability Scores, which you determine in Step Three. These will be
          automatically applied to your character summary at the end.
        </p>
      </div>

      <div className='overflow-x-auto px-4 py-4'>
        <div className='inline-flex'>
          {data.races.map(race => {
            return <RaceCard key={race.id} race={race} selectedRace={selectedRace} setSelectedRace={setSelectedRace} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default RaceSelection;
