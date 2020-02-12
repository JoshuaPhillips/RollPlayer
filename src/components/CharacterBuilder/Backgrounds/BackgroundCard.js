import React from "react";
import { joinWithPreposition } from "../../../utils/joinWithPreposition.util";
import PersonalityTable from "./PersonalityTable";

const testBackground = {
  name: "",
  description: "",
  proficiencies: {
    skills: [],
    tools: [],
    languages: [],
    equipment: []
  },
  subBackground: {
    name: "",
    description: "",
    options: []
  },
  feature: {
    name: "",
    description: ""
  },
  suggestedCharacteristics: "",
  personality: {
    personalityTraits: [],
    ideals: [],
    bonds: [],
    flaws: []
  },
  variant: {
    name: "",
    description: "",
    variantFeature: {
      name: "",
      description: ""
    }
  }
};

const BackgroundCardSection = props => {
  const { title, children, borderColor = "border-gray-800", customClasses = "" } = props;

  return (
    <div className={["panel", borderColor, customClasses].join(" ")}>
      <div className={`panel relative p-2 shadow-lg -mt-6 mx-2 uppercase ${borderColor}`}>
        <h4 className='font-semibold tracking-wide'>{title}</h4>
      </div>

      {children}
    </div>
  );
};

const BackgroundCard = props => {
  const {
    name,
    description,
    proficiencies: { skills: skillProficiencies, tools: toolProficiencies, languages: languageProficiencies },
    equipment,
    subBackground,
    feature,
    suggestedCharacteristics,
    personality,
    variant
  } = props.background;
  return (
    <div className='w-1/2'>
      <div className='panel border-gray-800 text-center uppercase font-semibold tracking-widest py-4 w-1/2 mx-auto'>
        {name}
      </div>
      <div className='panel mt-6 border-gray-800'>
        <div className='px-4 pt-4 pb-10'>
          <p>{description}</p>
        </div>
        <BackgroundCardSection title='Proficiencies' customClasses='pb-8'>
          <ul className='p-4'>
            {skillProficiencies.length !== 0 && (
              <li>
                <p>
                  <span className='font-semibold'>Skill Proficiencies: </span>
                  {skillProficiencies.join(", ")}
                </p>
              </li>
            )}
            {toolProficiencies.length !== 0 && (
              <li>
                <p>
                  <span className='font-semibold'>Tool Proficiencies: </span>
                  {toolProficiencies.join(", ")}
                </p>
              </li>
            )}
            {languageProficiencies.length !== 0 && (
              <li>
                <p>
                  <span className='font-semibold'>Languages: </span>
                  {languageProficiencies.join(", ")}
                </p>
              </li>
            )}
            {equipment.length !== 0 && (
              <li>
                <p>
                  <span className='font-semibold'>Equipment: </span>
                  {joinWithPreposition(equipment)}
                </p>
              </li>
            )}
          </ul>
        </BackgroundCardSection>

        {subBackground && (
          <BackgroundCardSection title={subBackground.name} customClasses='pb-8'>
            <div className='p-4'>{subBackground.description}</div>
            <PersonalityTable options={subBackground.options} title={subBackground.name} />
          </BackgroundCardSection>
        )}

        <BackgroundCardSection title={`Feature: ${feature.name}`} customClasses='pb-8'>
          <div className='p-4'>
            <p className='mt-4'>{feature.description}</p>
          </div>
        </BackgroundCardSection>

        <BackgroundCardSection title='Suggested Characteristics' customClasses='pb-8'>
          <div className='p-4'>
            <p>{suggestedCharacteristics}</p>
          </div>
        </BackgroundCardSection>

        <BackgroundCardSection title='Personality' customClasses='pb-8'>
          <div className='p-4'>
            <PersonalityTable options={personality.personalityTraits} title='Personality Trait' />
            <PersonalityTable options={personality.ideals} title='Ideal' />
            <PersonalityTable options={personality.bonds} title='Bond' />
            <PersonalityTable options={personality.flaws} title='Flaw' />
          </div>
        </BackgroundCardSection>

        {variant && (
          <BackgroundCardSection title={`Variant ${name}: ${variant.name}`} customClasses='pb-8'>
            <div className='p-4'>
              <p className='mt-4'>{variant.description}</p>
              {variant.variantFeature && (
                <PersonalityTable options={variant.variantFeature.options} title={variant.variantFeature.name} />
              )}
            </div>
          </BackgroundCardSection>
        )}
      </div>
    </div>
  );
};

export default BackgroundCard;
