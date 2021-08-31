import {
  Identifier,
  InterfaceDeclaration,
  LiteralType,
  PropertySignature,
  StringLiteral,
  UnionType,
} from "coli";

// TODO: make with real data.
export function makeVariantInterfaceForMasterBaseComponent(): InterfaceDeclaration {
  const _idec = new InterfaceDeclaration({
    name: "Props",
    members: [
      new PropertySignature({
        name: new Identifier("field_1"),
        type: new UnionType({
          types: [
            new LiteralType(new StringLiteral("a")),
            new LiteralType(new StringLiteral("b")),
            new LiteralType(new StringLiteral("c")),
          ],
        }),
      }),
      //
    ],
  });
  //

  return _idec;
}
