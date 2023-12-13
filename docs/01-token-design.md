# Token Design Philosophy

Our token design philosophy is an essential aspect of the system that determines how we translate design inputs into rendered outputs. As we evolve our system and adapt to changes in the landscape of design and UI frameworks, we continually refine this philosophy.

## Guiding Principles

Our philosophy is underpinned by several guiding principles rooted in the field of computer science and software architecture:

- Separation of Concerns: Each token should have a specific purpose and responsibility, encapsulating a particular aspect of the design. This promotes maintainability and allows for easier understanding of the token's function.

- Encapsulation: Tokens should encapsulate both style and behavior. This ensures a comprehensive representation of UI elements and reduces complexity by providing a single point of definition for the element's look and function.

- Flexibility: The token design must be adaptable to accommodate changes in frameworks, design trends, and future growth. This agility allows the system to evolve without being overly constrained by its initial assumptions.

- Scalability: The token design should be scalable. As the system grows and accommodates more complex designs, the token structure should be capable of handling this increased complexity without a significant degradation in maintainability or performance.

## Tokenizing: Detection and Formation

Our tokenization process involves detection (recognizing UI elements) and formation (defining the structure and properties of tokens). This process converts raw input nodes into widget nodes, which are then represented as tokens. The ultimate goal is to create atomic tokens that are universally adaptable to merge and build by platforms or frameworks.

## Token Design: Property vs. Hierarchy

A key consideration when designing tokens is whether to view them as properties or as part of a hierarchy.

- Tokens as Properties: In this approach, every UI element attribute, such as color, position, or size, is seen as a separate token. This approach is quite accurate as it delineates clear boundaries between different aspects of a UI element. However, it can become noisy and complex, particularly with large UI designs.

- Tokens as Hierarchies: In this approach, tokens are seen as containers with several properties. This is an intuitive approach for developers familiar with CSS, where attributes like color, position, or opacity are properties of an element. This method can also make it easier to handle complex scenarios because related attributes are grouped together. However, this approach may also lead to over-engineering and confusion when things get more complex.

A balance between these two approaches might offer the best solution, offering a hybrid approach where some tokens are seen as properties while others are part of a hierarchy. This offers flexibility and maintainability while reducing the likelihood of overly complex structures.

## Practical Examples

To illustrate the token design philosophies, let's consider a few practical examples:

### Background Images

A background image might be represented by a single token under the "Tokens as Properties" approach, encompassing properties like image, position, scaling, and repeat. On the other hand, the "Tokens as Hierarchies" approach would represent the same as multiple tokens, each encapsulating a specific property. The hybrid approach might find a balance, potentially defining a specific token for the background image but allowing multiple properties within that token.

### Opacity

Flutter handles opacity as a widget, a unique way compared to traditional CSS-like systems. If we were to implement this in the "Tokens as Properties" approach, we might allow an 'opacity' property within our generic tokens, much like CSS. In the "Tokens as Hierarchies" approach, we would create a specific 'opacity' token, much like Flutter's widget approach. The hybrid approach might define 'opacity' as a property for most tokens but allow it to be a token on its own in more complex scenarios.

## Token Design Checklist

Before finalizing a token design, we go through the following checklist to ensure it aligns with our principles and will work with our system:

- **Representability**: Can it be represented without reverse conversion for all platforms?

- **Documentation**: Does the concept exist and have well-documented references?

- **Extensibility**: At the point when the architecture needs to be changed, is it possible to double tokenize instead of rewriting (with all related concepts)?

- **Compatibility**: Is it representable by pure CSS? Is it representable by pure Flutter? How much compatibility does it have with graphics libraries, e.g., Skia?

## Tokens

We classify tokens into several categories based on their purpose and properties, some of which include layouts, containers, and positioning/sizing.

- **Layouts**: Column, Row, Grid, Stack, Table, ListView.

- **Containers**: Container token can represent a UI element that houses other elements.

- **Positioning / Sizing**: Align, Center, SizedBox, Expanded, Transform.

Each of these categories has a unique role to play and contains tokens that reflect that role. The design of these tokens follows the guiding principles and considerations we have outlined above.

## Considerations for Adding New Framework Support

When adding support for a new framework, the token design philosophy should guide the approach:

1\. **Understand the Framework**: Analyse the framework to understand its principles, idioms, and quirks. This understanding will help identify how it aligns with or diverges from the token design philosophy.

2\. **Map Existing Tokens**: Identify how existing tokens can be represented in the new framework. Some tokens may directly map to concepts in the framework, while others may need a more nuanced approach.

3\. **Identify Gaps**: Identify any concepts or features in the new framework that cannot be represented with existing tokens. This will help in identifying new tokens that need to be created.

4\. **Create New Tokens**: Create new tokens as necessary to represent unique features or concepts in the new framework. These tokens should follow the token design philosophy.

5\. **Optimize**: Once the initial mapping is complete, optimize for performance and maintainability. Look for ways to simplify the representation or improve the efficiency of rendering.

## Wrapping Up

In conclusion, our token design philosophy aims to create a balance between accuracy, intuitiveness, flexibility, and scalability. We look for ways to encapsulate UI elements as tokens, following a hybrid approach of considering tokens as both properties and hierarchies. With these guiding principles, our tokens should be versatile enough to represent design inputs across various frameworks and adaptable enough to evolve with the changing landscape of UI design and development.

By sticking to this philosophy, we set ourselves up for success in developing a system that not only efficiently interprets design inputs into renderable outputs but also is maintainable, extensible, and scalable, allowing us to continually adapt and grow with the ever-evolving UI design and development industry.
