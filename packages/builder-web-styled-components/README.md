# Styled components / Emotion pattern for React, Preact, Vue

> Web builder built-in support for styled components and emotion css

**Supported platforms**

- reactjs
- vuejs

## ReactJS

https://styled-components.com/

```jsx
//// declaration
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${(props) =>
    props.primary &&
    css`
      background: white;
      color: black;
    `}
`;

render(
  <div>
    <Button
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </Button>

    <Button as={Link} href="/docs">
      Documentation
    </Button>
  </div>
);
```

## VueJS

https://github.com/styled-components/vue-styled-components

```js
/// registration

new Vue({
    // ...
    components {
      'styled-title': StyledTitle
    },
    template: '<styled-title> Hello! </styled-title>'
}
////

import styled from "vue-styled-components";

// Create a <StyledTitle> Vue component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const StyledTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a <Wrapper> Vue component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

///// usage
// Use them like any other Vue component – except they're styled!
<wrapper>
  <styled-title>Hello World, this is my first styled component!</styled-title>
</wrapper>;
```
