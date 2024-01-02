import React, { useEffect, useRef, useState, useContext } from 'react';
import reaImage from './rea.png';
import { useNavigate } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import { mooID, photoURL } from '../../mainAtom';
import ImageBoard from '../ImageBoard/ImageBoard';
import Headers2 from '../Headers2/Headers2';

export default function Stage1() {
  return (
    <div>
      <Headers2></Headers2>

      <ImageBoard></ImageBoard>
    </div>
  );
}
