import React from 'react';

const getDisplayName = (Component) =>
  Component.displayName || Component.name || 'Component';

/**
 * When used in conjunction with @track, will only re-calculate
 * derived props when the tracked props changed. If they didn't change,
 * will use previously calculated derived props.
 *
 * Obviously, when used as a sub-HoC of @elegant this is only necessary
 * when there are other props that might change that are not tracked.
 *
 * Note: when used in conjunction with @elegant, @derive should be
 *       below @elegant.
 */
function createDeriveDecorator(React, debug) {
  const {Component} = React;

  return (options={}) => {
    return DecoratedComponent => class DeriveDecorator extends Component {
      static displayName = `Derive(${getDisplayName(DecoratedComponent)})`;
      static DecoratedComponent = DecoratedComponent;

      componentWillMount() {
        this.derivedProps = {...this.props};

        Object.keys(options).forEach(key => {
          this.derivedProps[key] = options[key](this.props);
        });
      }

      componentWillReceiveProps(nextProps) {
        const derivedProps = {...nextProps};

        Object.keys(options).forEach(key => {
          const xf = options[key];
          const trackedProps = xf.trackedProps;

          // if @track was used then the mapper function (xf) will be annotated
          // with 'trackedPops' property, an array of string prop names.
          // So here we check if these props have changed and if they haven't,
          // we can skip recalculation.
          if (xf.trackedProps) {
            let changed = false;
            xf.trackedProps.forEach(p => {
              changed = changed || (this.props[p] !== nextProps[p]);
            });
            if (!changed) return derivedProps[key] = this.derivedProps[key];
          }

          if (debug) console.log(`${DeriveDecorator.displayName}: recalculating derived prop '${key}'`);
          derivedProps[key] = xf(nextProps);
        });

        this.derivedProps = derivedProps;
      }

      render() {
        return React.createElement(DecoratedComponent, this.derivedProps);
      }
    }
  }
}

/**
 * Object literal decorator that annotates a mapper function
 * to have a 'trackedProps' property
 */
export function track(...trackedProps) {
  return function(target, key, descriptor) {
    descriptor.value.trackedProps = trackedProps;
  }
}

export default createDeriveDecorator(React, true);
