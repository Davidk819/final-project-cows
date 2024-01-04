import { useEffect, useState } from 'react';
import { trpc } from '../../trpcClient';
import Headers2 from '../Headers2/Headers2';
import { CowNumber } from '../typs';

type Prop = {
    cowProps: CowNumber
}

export default function CowCard({cowProps}: Prop) {



  return (
    <div className=" flex flex-col">
      <div >
          <div
            className="flex-col border border-solid border-black p-4 bg-slate-100 "
          >
            <h1>Number: {cowProps.caw_num}</h1>
            <h2>Status: {cowProps.status}</h2>
          </div>
      </div>
    </div>
  );
}
