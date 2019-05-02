import React, { Component, ComponentType } from 'react';
import { isObservable, Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dictionary, ObservableLike, Pair, Nilable } from './types';
import { entries, mapObj, merge, objOf, pickOf, snd, fst } from './utils';

type ObservableMap = Dictionary<Observable<any>>;

function unwrap<T>(prop: ObservableLike<T>) {
  return !isObservable(prop) ? prop : 'value' in prop ? prop.value : null;
}

function withPath<T>(entry: Pair<string, Observable<T>>) {
  return snd(entry).pipe(map(x => objOf(fst(entry), x)));
}

export function observe<P extends object = {}>(
  WrappedComponent: ComponentType<P>
) {
  return class ObserverComponent extends Component<P, P> {
    private observables: ObservableMap;
    private subscription: Nilable<Subscription> = null;

    componentDidMount() {
      this.subscription = combineLatest(
        entries(this.observables).map(withPath), merge
      ).subscribe(
        value => this.setState(state => merge(state, value))
      );
    }

    componentWillUnmount() {
      if (this.subscription) this.subscription.unsubscribe();
    }

    constructor(props: P) {
      super(props);
      this.observables = pickOf(this.props, Observable);
      this.state = merge(props, mapObj(this.observables, unwrap));
    }

    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
}
