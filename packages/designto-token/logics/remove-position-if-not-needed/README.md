# Remove position if not needed

All Container has position property x and y, which will not be used if this is under certain managed layout.

So to avoid confution, this will make x and y undefined so that it cannot be referenced (and must not be referenced anyway)

Container's x and y will only be used if its parent is container or stack lauout.

> In this case x and y will be used for wrapping itself with other positioned or to have padding or margin on its parent container.
