import React, { Component, ComponentType } from 'react';
import { merge, Observable, Subscribable, Subscription, combineLatest } from 'rxjs';
import extract from './observable/extract';
import { Adjust, Nilable } from './types';

export function observe<P extends object, PA extends P = Adjust<Observable<any>, any, P>>(
  WrappedComponent: ComponentType<PA>
) {
  return class ObserverComponent extends Component<P, PA> {
    private subscribables = new Array<Subscribable<any>>();
    private subscription: Nilable<Subscription>;
      
    componentDidMount() {
      this.subscription = combineLatest(this.subscribables).subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
      if (this.subscription) this.subscription.unsubscribe();
    }

    constructor(props: P) {
      super(props);
      const [ adjustedProps, subscribables ] = extract<P, PA>(this.props);
      this.state = adjustedProps;
      this.subscribables = subscribables;
    }  

    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
}
