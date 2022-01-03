---
title: As-H1 flag
id: "--as-h1"
locale: ko
stage:
  - production
  - staging
  - experimental
---

# `--as-h1` 헤딩1 명시 플래그

**지정 가능한 키**

- `--as-h1`
- `--as-heading1`
- `--as-headline1`
- `--h1`
- `--heading1`
- `--headline1`

## 문법

```ts
`--h1${"="typeof boolean}`
```

## 적용 예시

```
--h1

--h1=true
--h1=false

--h1=yes
--h1=no

----h1
```

## 동작

**엘레먼트 (Element)**
이 플래그가 적용된다면, 해당 노드의 html 생성 엘레먼트는 `<h1>` 로 렌더되어 표시됩니다. (이외의 로직에는 영향이 없으며, 태그가 변경되었기에 이에 따른 부작용은 사용자의 커스텀 css 또는 query 에 따라 변경될 수 있습니다.)

**텍스트 스타일 (Text style)**
`--h1` 을 적용함으로, 엘레먼트가 수정되더라도, 아직 Grida 는 이에 따른 추가적인 스타일링 지원을 하지 않습니다. 타 `span`, `p`, 와 동일하게 블록단위의 스타일이 지정됩니다. 공용 헤딩 스타일에 대한 Global css 를 지원하지 않습니다.

## 같이보기

- [`--as-h2`](../--as-h2)
- [`--as-h3`](../--as-h3)
- [`--as-h4`](../--as-h4)
- [`--as-h5`](../--as-h5)
- [`--as-h6`](../--as-h6)
- [`--as-p`](../--as-p)
- [`--as-br`](../--as-br)
