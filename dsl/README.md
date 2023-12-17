# `(Alpha)` Code Component DSL - A UI Meta Language for building ui components with code

```ts
interface ProductCard {
  thumbnail: MediaSrc;
  title: string;
  price: (price: number, locale: Locale) => Text;
  likes: number;
  review: (reviews: Review[]) => ReviewView;
}

View ReviewView {
  reviews_avg: number;
  reviews_count: (count: number) => Text;
}


list products_list {

}
```
