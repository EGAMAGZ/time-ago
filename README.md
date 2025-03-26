# Time-ago

A minimal relative time string function

[![JSR](https://jsr.io/badges/@egamagz/time-ago)](https://jsr.io/@egamagz/time-ago)
[![JSR Score](https://jsr.io/badges/@egamagz/time-ago/score)](https://jsr.io/@egamagz/time-ago/score)
![GitHub License](https://img.shields.io/github/license/egamagz/time-ago)
![GitHub Release](https://img.shields.io/github/v/release/egamagz/time-ago)

Check the [Documentation](https://jsr.io/@egamagz/time-ago) in JSR

## Overview

The `timeAgo` function returns a human-readable string representing the time
elapsed since a given date. It supports producing strings like _"just now"_, _"5
minutes ago"_, and _"a year ago"_ for quick and simple time formatting.
Supported intervals are _"year"_, _"month"_, _"week"_, _"day"_, _"hour"_,
_"minute"_, and _"second"_.

## Usage

### `timeAgo`

```typescript
import { timeAgo } from "@egamagz/time-ago";

console.log(timeAgo(new Date())); // "just now"

console.log(timeAgo(new Date(Date.now() - 1000))); // "a second ago"

console.log(timeAgo(new Date(Date.now() - 1000 * 60 * 5))); // "5 minutes ago"

console.log(timeAgo(new Date(Date.now() - 1000 * 60 * 60 * 24 * 5))); // "5 days ago"
```

### `timeRemaining`

```typescript
import { timeRemaining } from "@egamagz/time-ago";

console.log(timeRemaining(Date.now() + 5000)); // "in 5 seconds"

console.log(timeRemaining(Date.now() + 5 * 60 * 1000)); // "in 5 minutes"

console.log(timeRemaining(Date.now() + 3 * 60 * 60 * 1000)); // "in 3 hours"

console.log(timeRemaining(Date.now() + 60 * 60 * 1000)); // "in an hour"

// Weeks
console.log(timeRemaining(Date.now() + 3 * 7 * 24 * 60 * 60 * 1000)); // "in 3 weeks"

// Month (exact month difference)
console.log(timeRemaining(Date.now() + 30 * 24 * 60 * 60 * 1000)); // "in a month"

// Four weeks vs month example
console.log(timeRemaining(Date.now() + 4 * 7 * 24 * 60 * 60 * 1000)); // "in 4 weeks"
```

## Installation

**With Deno**

```console
deno add jsr:@egamagz/time-ago
```

**With Bun**

```console
bunx jsr add @egamagz/time-ago
```

**With NPM**

```console
npx jsr add @egamagz/time-ago
```

## License

MIT License
