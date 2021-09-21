# How item order works & sanitizing options

**The order in editor's hierarchy (on design tools)**

![](./assets/how-order-works.png)

**The actual array data via api**

And below is the short version of the above image.

```json
[
  {
    "type": "TEXT",
    "characters": "First created",
    "id": "501:6153",
    "name": "First created",
    "removed": false,
    "visible": true,
    "locked": false,
    "x": 13,
    "y": 28,
    "rotation": 0,
    "width": 55,
    "height": 9
  },
  {
    "type": "TEXT",
    "characters": "Second created",
    "id": "501:6154",
    "name": "Second created",
    "removed": false,
    "visible": true,
    "locked": false,
    "x": 13,
    "y": 45,
    "rotation": 0,
    "width": 68,
    "height": 9
  },
  {
    "type": "TEXT",
    "characters": "Lastly created.",
    "id": "501:6155",
    "name": "Lastly created.",
    "removed": false,
    "visible": true,
    "locked": false,
    "opacity": 1,
    "x": 13,
    "y": 62,
    "rotation": 0,
    "width": 64,
    "height": 9
  }
]
```

**Sorting strategy**

When sorting strategy not applied and code gen with raw input, below result may come.
![](./worng-sorting-example-when-not-sanitized.png)
