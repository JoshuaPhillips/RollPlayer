import React, { useState, useRef, useEffect } from "react";
import RaceSelection from "./Races/RaceSelection";
import ClassSelection from "./Classes/ClassSelection";
import AbilityScoreSelection from "./AbilityScoreSelection";
import BackgroundSelection from "./BackgroundSelection";
export const CharacterBuilderContext = React.createContext();

const CharacterBuilder = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [canContinue, toggleCanContinue] = useState(false);

  const raceRef = useRef(null);
  const classRef = useRef(null);
  const abilityScoreRef = useRef(null);
  const backgroundRef = useRef(null);
  const stageRefs = [raceRef, classRef, abilityScoreRef, backgroundRef];

  useEffect(() => {
    window.scrollTo(0, stageRefs[currentStage].current.offsetTop);
  }, [stageRefs, currentStage]);

  const moveToNextStage = () => {
    setCurrentStage(currentStage + 1);
    toggleCanContinue(false);
  };

  return (
    <CharacterBuilderContext.Provider value={{ toggleCanContinue, currentStage }}>
      <main>
        <RaceSelection sectionRef={raceRef} />
        <ClassSelection sectionRef={classRef} />
        <AbilityScoreSelection sectionRef={abilityScoreRef} />
        <BackgroundSelection sectionRef={backgroundRef} />

        {canContinue && (
          <div className='fixed bottom-0 left-0 right-0 text-center text-lg bg-blue-900 text-white'>
            <button
              onClick={() => moveToNextStage()}
              className='w-full h-full py-4 outline-none uppercase tracking-widest font-bold'>
              Continue
            </button>
          </div>
        )}
      </main>
    </CharacterBuilderContext.Provider>
  );
};

export default CharacterBuilder;
