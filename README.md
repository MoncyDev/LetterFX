# LetterFX

![npm version](https://img.shields.io/npm/v/letterfx.svg)
![license](https://img.shields.io/github/license/MoncyDev/LetterFX)
![downloads](https://img.shields.io/npm/dm/letterfx.svg)

**LetterFX** is a lightweight JavaScript/TypeScript library for creating dynamic, letter by letter animations. With customizable effects, you can animate text with ease, making your content more engaging and interactive. Using **LetterFX** you can add dynamic text effects to web pages with minimal effort.

---

## Features

- Animate text letter by letter.
- Loop animations with custom timings.
- Customizable transition effects, easing, and delays.
- Easy integration with JavaScript or TypeScript.

---

## Installation

### Install from NPM

We can install LetterFX using npm:

```bash
npm install letterfx
```

```javascript
import LetterFX from "letterfx";
```

### Using CDN

You can directly use LetterFX in your ptoject using a CDN link

```html
<script src="https://cdn.jsdelivr.net/npm/letterfx/dist/letterfx.min.js"></script>
```

Git Repository: https://github.com/MoncyDev/LetterFX/

## Basic Usage

```javascript
const TextAnimation = new LetterFX(container, options); // All LetterFX options are optional
```

Here’s a basic example of how to use LetterFX:

```javascript
const letter = new LetterFX(".text", {
  transition: 500,
  delay: 30,
  clip: true,
  blur: "20px",
  opacity: 0.5,
  loop: true,
  interval: 2000,
  animateIn: "translateY(100%) rotate(40deg) scale(0)",
  animateOut: "translateX(-100%) scale(0)",
});
```

#### HTML :

```html
<div class="text">LetterFX Animations</div>
```

## Options

| Option       | Type    | Default                                  | Description                                             |
| ------------ | ------- | ---------------------------------------- | ------------------------------------------------------- |
| `transition` | Number  | `500`                                    | Duration of each animation (in ms).                     |
| `delay`      | Number  | `40`                                     | Delay between animating each letter (in ms).            |
| `clip`       | Boolean | `false`                                  | Adds an overflow clip for each letter during animation. |
| `easing`     | String  | `"cubic-bezier(0.09, 1.01, 0.68, 1.16)"` | CSS easing function for transitions.                    |
| `animateIn`  | String  | `"translateY(100%)"`                     | Transform properties for initial animation.             |
| `animateOut` | String  | `"translateY(-100%)"`                    | Transform properties for exit animation.                |
| `loop`       | Boolean | `false`                                  | Enables continuous looping of the animation.            |
| `interval`   | Number  | `4000`                                   | Time interval between loop cycles (in ms).              |
| `opacity`    | Number  | `0`                                      | Initial opacity of letters during animation.            |
| `blur`       | String  | `"0px"`                                  | Initial blur of letters during animation.               |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
