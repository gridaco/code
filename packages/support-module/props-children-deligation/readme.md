# Children as props deligation

```
- Widget (module)
  - Container1 (module)
  - Container2 (module)
    - Button (module)
      - Image
      - Text
```

In above case, the `Widget` should contain available slots (optional props field) for Container1, 2 and Button override (with props handling logic aside).

Full example output with code below

```tsx
import React from "react";

function Widget() {
  return (
    <div>
      <Container1 />
      <Container2 />
    </div>
  );
}

function Container1(props) {
  return <div>container1 - i have no child</div>;
}

type Container2Props = ({} & ButtonProps) | {};

function Container2() {
  return (
    <div>
      <Button />
    </div>
  );
}

interface ButtonProps {
  image: string;
  /**
   * @default "click me"
   */
  text?: string;
}

function Button({ image, text = "click me" }: ButtonProps) {
  return (
    <button>
      <image src={image} />
      <div>{text}</div>
    </button>
  );
}
```
