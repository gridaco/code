# Stretched

## As a token

In designto-code and deisgn tokenization, this is used to represent if the item should be a stretching element under specific parent. Since css (web) and flutter uses different strategy while stretching specific item under multi-child flex container, we use this explicit token so that each platform can process it universally. [Learm more at xdesignto-code figma autolayout](https://github.com/gridaco/designto-code/blob/main/docs/figma-autolayout.md)

## As a ui utility

This can be used to wrap a element that will have `align-self: stretch` as a utility component

## The naming

The naming of the streched followed flutter's utility widget naming such as `Expanded`

## This is somewhat exceptional, yet required.

This token does not exist explicit on any major ui frameworks, yet this is required for above reasons and this is the one of the few exceptionally handled / added token.
