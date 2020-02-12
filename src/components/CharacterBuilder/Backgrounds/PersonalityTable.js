import React from "react";

const PersonalityTable = props => {
  const { title, options } = props;

  return (
    <table className='mt-4'>
      <thead>
        <tr>
          <th className='text-right px-2'>{`d${options.length}`}</th>
          <th className='px-2 text-left'>{title}</th>
        </tr>
      </thead>
      <tbody>
        {options.map((option, index) => {
          return (
            <tr>
              <td className='text-right align-top px-2 pt-2'>
                <p>{index + 1}</p>
              </td>
              <td className='px-2 pt-2'>
                {title === "Ideal" ? (
                  <p>
                    <span className='font-semibold'>{option.name}. </span>
                    {option.description} ({option.alignment})
                  </p>
                ) : (
                  <p>{option}</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PersonalityTable;
