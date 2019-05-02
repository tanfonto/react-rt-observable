import React, { FC } from 'react';
import { Observable } from 'rxjs';
import { observe } from './observe';

const ToBeWrapped: FC<{ text: string; o: Observable<any> }> = ({ text, o }) => {
  return (
    <span>
      {text}:{o}
    </span>
  );
};

export const Observing = observe(ToBeWrapped);
