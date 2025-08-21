# Services

- Services are created to hold state for longer than the life of components.
- Share state across components.

- They have a "lifetime"
  - When are they created
  - When are they removed from memory?

- You can provide them in three places:
  - a component can add it to the `providers` metadata for that component.
    - this means a NEW INSTANCE of this service will be created for this component.
    - it's life is tied to those component.
    - EVEN IF YOU HAVE Another instance of this provided (even with {providedIn: root}), a new instance will be creted.
    - providers on a "parent" component will set up the provider for each of it's "children"
      -
