import React from 'react'

export default function Cell({ id }) {
    console.log('id:', id);

  return (
    <div className={id.isEmpty ? "isEmpty" : "isAction" }>
      {id.isIcon ? <span></span> : ""}
    </div>
  )
}



