export default class LetterFX {
  constructor(textElement, options = {}) {
    this.textElement = document.querySelectorAll(textElement);
    this.delay = options.delay || 40;
    this.clip = options.clip || false;
    this.transition = options.transition || 500;
    this.easing = options.easing || "cubic-bezier(0.09, 1.01, 0.68, 1.16)";
    this.pause = options.pause || false;
    this.loop = options.loop || false;
    this.animateIn = options.animateIn || "translateY(100%)";
    this.animateOut = options.animateOut || "translateY(-100%)";
    this.interval = options.interval || 4000;
    this.opacity = options.opacity || 0;
    this.blur = options.blur || "0px";
    this.timeouts = [];
    this.init();
  }

  init() {
    if (!this.textElement) return;
    this.updateTexts();
    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange.bind(this)
    );
  }

  updateTexts() {
    this.textElement.forEach((texts) => {
      texts.style.display = "flex";
      texts.style.flexWrap = "wrap";

      const wordSpacing = this.getWordSpacing(texts);

      texts.style.columnGap = `${wordSpacing}px`;

      const text = texts.textContent || "";
      const words = text.split(/\s+/);

      let letterIndex = 0;

      texts.innerHTML = "";

      words.forEach((word) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "lbl-word";
        wordDiv.style.display = "flex";

        const letters = word.split("");
        letters.forEach((letter) => {
          const div = document.createElement("div");
          const span = document.createElement("span");
          div.className = "lbl-div";
          div.style.display = "flex";
          span.className = `letter-lbl`;
          span.textContent = letter === " " ? "\u00A0" : letter;
          wordDiv.appendChild(div);
          div.appendChild(span);
          if (this.clip) div.style.overflow = "hidden";
          this.setTransition(span, letterIndex, this.transition);

          letterIndex++;
          if (!this.pause) {
            if (this.loop) {
              this.animateLoop(span, letterIndex);
            } else {
              span.style.transform = this.animateIn;
              this.setAnimStyles(span);
              setTimeout(() => {
                this.setDefaultStyles(span);
              }, 100);
            }
          }
        });
        texts.appendChild(wordDiv);
      });
    });
  }

  setDefaultStyles(span) {
    span.style.transform = "translate(0,0)";
    span.style.filter = "blur(0px)";
    span.style.opacity = 1;
  }

  setAnimStyles(span) {
    span.style.filter = `blur(${this.blur})`;
    span.style.opacity = this.opacity;
  }

  getWordSpacing(element) {
    const style = window.getComputedStyle(element);
    const wordSpacing = style.getPropertyValue("word-spacing");

    if (
      wordSpacing &&
      wordSpacing !== "normal" &&
      parseFloat(wordSpacing) !== 0
    ) {
      return parseFloat(wordSpacing);
    } else {
      const fontSize = parseFloat(style.getPropertyValue("font-size"));
      return fontSize * 0.3;
    }
  }

  animateLoop(span, index) {
    let timeout = this.interval;
    const loopAnimation = () => {
      span.style.transition = `${this.transition}ms ${this.easing}`;
      this.setDefaultStyles(span);

      const timeout1 = setTimeout(() => {
        span.style.transform = this.animateOut;
        this.setAnimStyles(span);
        const timeout2 = setTimeout(() => {
          span.style.transition = "none";
          span.style.transform = this.animateIn;
          this.setAnimStyles(span);
          const timeout3 = setTimeout(() => {
            span.style.transition = `${this.transition}ms ${this.easing}`;
            loopAnimation();
          }, this.delay);
          this.timeouts.push(timeout3);
        }, timeout / 2);
        this.timeouts.push(timeout2);
      }, timeout);
      this.timeouts.push(timeout1);
    };
    setTimeout(loopAnimation, index * this.delay);
  }

  setTransition(span, index, transition) {
    span.style.transition = transition + "ms";
    span.style.transitionTimingFunction = `${this.easing}`;
    span.style.transitionDelay = `${index * this.delay}ms`;
  }

  handleVisibilityChange() {
    if (this.loop) {
      if (document.visibilityState === "hidden") {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    }
  }

  pauseAnimations() {
    this.timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    this.timeouts = [];

    this.textElement.forEach((texts) => {
      const spans = texts.querySelectorAll(".letter-lbl");
      spans.forEach((span) => {
        span.style.transition = "none";
        this.setDefaultStyles(span);
      });
    });
  }

  resumeAnimations() {
    this.textElement.forEach((texts) => {
      const spans = texts.querySelectorAll(".letter-lbl");
      let letterIndex = 0;
      spans.forEach((span) => {
        this.setTransition(span, letterIndex, this.transition);
        this.animateLoop(span, letterIndex);
        letterIndex++;
      });
    });
  }

  start() {
    this.pause = false;
    this.updateTexts();
  }
}
