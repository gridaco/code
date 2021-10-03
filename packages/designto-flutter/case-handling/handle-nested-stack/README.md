# Nested stack in flutter

Nested stack (stack under positioned under stack) requires width and height.
This,

```dart
Stack(
  children: [
    Positioned(
      left: 795,
      top: 163,
      child: Stack(
        children: [
          Positioned(
            left: 0,
            top: 83,
            child: Text(
              "BeoPlay S3 draws heavily on geometry as a design reference. But also, it is reminiscent from the lines of two shapes embracing each other.",
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w400,
                fontFamily: "Roboto",
              ),
            ),
          ),
          Positioned(
            left: 0,
            top: 23,
            child: Text(
              "B.play Homeaaaa Speaker ",
              style: TextStyle(
                fontSize: 36,
                fontWeight: FontWeight.w700,
                fontFamily: "Poppins",
              ),
            ),
          ),
          Positioned(
            left: 0,
            top: 0,
            child: Text(
              "SPEAKERS",
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w500,
                fontFamily: "Poppins",
              ),
            ),
          ),

          /// stack requires empty non positioned widget to work properly. refer: https://github.com/flutter/flutter/issues/49631#issuecomment-582090992
          Container(),
        ],
      ),
    ),

    /// stack requires empty non positioned widget to work properly. refer: https://github.com/flutter/flutter/issues/49631#issuecomment-582090992
    Container(),
  ],
);
```

Tobe

```dart
Stack(
  children: [
    Positioned(
      left: 795,
      top: 163,
      child: Container(
          width: MediaQuery.of(context).width,  /// <-----------
          height: MediaQuery.of(context).height, /// <-----------
          child: Stack(
            children: [
            Positioned(
                left: 0,
                top: 83,
                child: Text(
                "BeoPlay S3 draws heavily on geometry as a design reference. But also, it is reminiscent from the lines of two shapes embracing each other.",
                style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w400,
                    fontFamily: "Roboto",
                ),
                ),
            ),
            Positioned(
                left: 0,
                top: 23,
                child: Text(
                "B.play Homeaaaa Speaker ",
                style: TextStyle(
                    fontSize: 36,
                    fontWeight: FontWeight.w700,
                    fontFamily: "Poppins",
                ),
                ),
            ),
            Positioned(
                left: 0,
                top: 0,
                child: Text(
                "SPEAKERS",
                style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    fontFamily: "Poppins",
                ),
                ),
            ),

            /// stack requires empty non positioned widget to work properly. refer: https://github.com/flutter/flutter/issues/49631#issuecomment-582090992
            Container(),
            ],
        ),
      ),
    ),

    /// stack requires empty non positioned widget to work properly. refer: https://github.com/flutter/flutter/issues/49631#issuecomment-582090992
    Container(),
  ],
);
```

- https://stackoverflow.com/a/52936983/5463235
