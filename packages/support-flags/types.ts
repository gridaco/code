import type { ArtworkFlag } from "./--artwork";
import type { AsHeading1Flag } from "./--as-h1";
import type { AsHeading2Flag } from "./--as-h2";
import type { AsHeading3Flag } from "./--as-h3";
import type { AsHeading4Flag } from "./--as-h4";
import type { AsHeading5Flag } from "./--as-h5";
import type { AsHeading6Flag } from "./--as-h6";
import type { AsParagraphFlag } from "./--as-p";
import type { AsTextSpanFlag } from "./--as-span";
import type { WidthFlag } from "./--width";
import type { MinWidthFlag } from "./--min-width";
import type { MaxWidthFlag } from "./--max-width";
import type { HeightFlag } from "./--height";
import type { MinHeightFlag } from "./--min-height";
import type { MaxHeightFlag } from "./--max-height";
import { FixWidthFlag } from "./--fix-width";
import { FixHeightFlag } from "./--fix-height";

export type Flag =
  //
  ArtworkFlag | TextElementPreferenceFlag | WHDeclarationFlag | FixWHFlag;

export interface SimpleBooleanValueFlag {
  flag: string;
  value: boolean;
  _raw?: string;
}

export type WHDeclarationFlag = WidthDeclarationFlag | HeightDeclarationFlag;

export type WidthDeclarationFlag = WidthFlag | MinWidthFlag | MaxWidthFlag;
export type HeightDeclarationFlag = HeightFlag | MinHeightFlag | MaxHeightFlag;

export type FixWHFlag = FixWidthFlag | FixHeightFlag;

/**
 * Type alias for a flag that can be used to set the element preference to render a text
 *
 * - `h1`
 * - `h2`
 * - `h3`
 * - `h4`
 * - `h5`
 * - `h6`
 * - `p`
 * - `span`
 */
export type TextElementPreferenceFlag =
  | HeadingFlag
  | AsParagraphFlag
  | AsTextSpanFlag;

/**
 * Type alias for a flag that can be used to set the heading level.
 * from 1 to 6.
 *
 * - `--as-h1`
 * - `--as-h2`
 * - `--as-h3`
 * - `--as-h4`
 * - `--as-h5`
 * - `--as-h6`
 */
export type HeadingFlag =
  | AsHeading1Flag
  | AsHeading2Flag
  | AsHeading3Flag
  | AsHeading4Flag
  | AsHeading5Flag
  | AsHeading6Flag;

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

export type { ArtworkFlag };

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

export type {
  AsHeading1Flag,
  AsHeading2Flag,
  AsHeading3Flag,
  AsHeading4Flag,
  AsHeading5Flag,
  AsHeading6Flag,
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

export type { AsParagraphFlag };
export type { AsTextSpanFlag };

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

export type { WidthFlag, MinWidthFlag, MaxWidthFlag };
export type { HeightFlag, MinHeightFlag, MaxHeightFlag };
export type { FixWidthFlag, FixHeightFlag };
