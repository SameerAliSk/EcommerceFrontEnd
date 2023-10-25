import React from 'react';
import './index.css';

function SomethingWentWrong() {
  const somethingWentWrongImageUrl = 'https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops_1x.png';
  return (
    <div className="something-went-wrong-container">
      <img className="someting-went-wrong-image" src={somethingWentWrongImageUrl} alt="something went wrong" />
    </div>
  );
}

export default SomethingWentWrong;
