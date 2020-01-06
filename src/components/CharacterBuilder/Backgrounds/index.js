import React from "react";
import SectionHeader from "../shared/SectionHeader";

const BackgroundSelection = () => {
  return (
    <section>
      <SectionHeader title='4. Background'>
        <p className='px-4'>
          Once you know the basic game aspects of your character, it's time to flesh them out as a person. Your
          character needs a name. Spend a few minutes thinking about what they look like and how they behave in general
          terms.
        </p>
        <p className='px-4 pt-4'>
          Using the information below, you can flesh out your character's appearance and personality. Choose your
          character's <strong>alignment</strong> (the moral compass that guides their decisiosn) and{" "}
          <strong>ideals</strong>. You can also identify the things that your character holds most dear, called{" "}
          <strong>bonds</strong>, and the <strong>flaws</strong> that could one day undermine them.
        </p>
        <p className='px-4 pt-4'>
          You character's <strong>background</strong> describes where they came from, their original occupation, and the
          character's place in the D&amp;D world. Your DM might offer additional backgrounds beyond the ones included
          below, and might be willing to work with you to craft a background that's a more precise fit for your
          character concept.
        </p>
        <p className='px-4 pt-4'>
          A background gives your character a background feature (a general benefit) and proficiency in two skills,
          proficiency with certain kinds of tools. Your characters background information and additional proficiencies
          will be automatically included in your character summary at the end.
        </p>
      </SectionHeader>
    </section>
  );
};

export default BackgroundSelection;
