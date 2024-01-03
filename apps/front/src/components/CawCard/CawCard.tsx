import { useEffect, useState } from 'react';
import { trpc } from '../../trpcClient';
import Headers2 from '../Headers2/Headers2';
import { CowNumber } from '../typs';

type Prop = {
    cowProps: CowNumber
}

export default function CowCard({cowProps}: Prop) {



  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center">
          <div
            className="flex-col border border-solid border-black p-4 bg-slate-100 m-8"
          >
            <h1>Number: {cowProps.cow_num}</h1>
            <h2>Status: {cowProps.status}</h2>
          </div>
      </div>
    </div>
  );
}
