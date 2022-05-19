import React from 'react'

export default function Cell({ id }) {
    console.log(id);
  return (
    <div className={id.isDefault ? "isDefault" : "isAction" }>
      {id.isIcon ? <span>⭕️</span> : ""}
    </div>
  )
}



