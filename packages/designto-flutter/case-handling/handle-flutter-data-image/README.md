# Image.memory handling

Unlike web, using base64 encoded image string requires extra steps on flutter

```dart
import 'dart:convert';
import 'package:flutter/widgets.dart';

Image.memory(base64Decode(base64String));
```

### References

- https://stackoverflow.com/questions/46145472/how-to-convert-base64-string-into-image-with-flutter
