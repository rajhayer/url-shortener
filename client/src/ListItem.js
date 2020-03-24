import React from 'react';

function ListItem(props) {
  return (
    <div className='output-area'>
      <span>{props.output.origUrl}</span>
      <a href={props.output.shortUrl}>{props.output.shortUrl}</a>
    </div>
  );
}

export default ListItem; 