import React, { FC, Fragment } from 'react';
import { Observable } from 'rxjs';
import { observe } from './observe';

const ToBeWrapped: FC<{ o1: Observable<any>, o2: Observable<any>, nested: { o3: Observable<number> } }> = 
  ({ o1, o2, nested: { o3 } }) => {
    return (
      <Fragment>
        <span className="item">
          interval: {o1}
        </span>
        <span>
          delay: {o2}
        </span>
        <span>
          nested: {o3}
        </span>
      </Fragment>
    );
};

export const Observing = observe(ToBeWrapped);
