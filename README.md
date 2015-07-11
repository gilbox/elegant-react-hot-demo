elegant-react-hot-demo
======================

[elegant-react](https://github.com/gilbox/elegant-react)-based
demo with FRP stream plugins (using [flyd](https://github.com/paldepind/flyd)),
time travel, and hot updates
using just webpack HMR (without react-hot-loader).

#### [Live Demo](http://gilbox.github.io/elegant-react-hot-demo/build/)

### What are stream plugins?

Similar to Flux stores, stream plugins manage application state.
And similar to Redux stores, stream plugins generally don't have
their own state, although for the sake of simplicity the time-travel
plugin keeps the history stored locally.

Unlike Flux stores, stream plugins are highly modular. They feature
a single point of connection to your application, ie the plugin function.
The arguments to the plugin function are any number of read-only and
write-only streams. So plugins are also highly encapsulated as well, they
only have access to read and write exactly what you give them access to.

### counter-plugin.js

This demo application uses a plugin called counter-plugin.
In a real life app this might be a poor use-case for a plugin.
Instead, you could just call a (sub)edit function from the App component.

Plugins should probably only be used when you really need some state-transform
logic encapsulated outside of your component tree.

### @derive and @track

`@derive` is an ES7 decorator that provides a nice declarative way to
create a HoC that creates new props for it's child (decorated) component,
which is data derived from it's props. `@derive`'s single argument is an
object with functions that transforms props.

When used in conjunction with `@track` to specify which props will cause
a derived method to require re-calculation, `@derive` will automatically
optimize to only recalculate as necessary.

    // because of @track, when only fontSize prop changes,
    // 'greeting' prop won't be recalculated
    @derive({
      @track('name')
      greeting({name}) {
        return `Hello ${name}!!`;
      }
    })
    class Hello extends Component {
      render() {
        const {greeting,fontSize} = this.props;
        return <h2 style={{fontSize}}>{greeting}</h2>;
      }
    }

The `Hello` component can be used like so:

    <Hello name="Benji" fontSize={Math.random() * 10 + 10} />

Note that a `@derive` transform function can be named the same
as any prop. For example, the function `greeting` could have been
called `name` although it doesn't really make sense in this context.


### Usage

```
npm install
npm start
open http://localhost:3000
```

### Dependencies

* React
* Webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* elegant-react
* flyd
