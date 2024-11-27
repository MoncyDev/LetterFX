class AnimateLBL {
    constructor(textElement, options = {}) {
      this.textElement = document.querySelectorAll(textElement);
      this.delay = options.delay || 100;
      this.clip = options.clip || false;
      this.transition = options.transition || 500;
      this.easing = options.easing || "cubic-bezier(0.09, 1.01, 0.68, 1.16)";
      this.pause = options.pause || false;
      this.reverse = options.reverse || false;
      this.loop = options.loop || false;
      this.enter = options.enter || "lbl-animate";
      this.exit = options.enter || "lbl-animate-down";
      this.init();
    }
  
    init() {
      if (!this.textElement) return;
      this.updateTexts();
    }
    updateTexts() {
      this.textElement.forEach((texts) => {
        texts.style.display = "flex";
        const text = texts.textContent || "";
        const letters = text.split("");
  
        texts.innerHTML = "";
  
        letters.forEach((letter, index) => {
          const div = document.createElement("div");
          const span = document.createElement("span");
          div.className = "lbl-div";
          div.style.display = "inline-block";
          span.className = `letter-lbl`;
          span.textContent = letter === " " ? "\u00A0" : letter;
          texts.appendChild(div);
          div.appendChild(span);
          if (this.clip) div.style.overflow = "hidden";
          if (this.transition) {
            span.style.transition = this.transition + "ms";
          }
          span.style.display = "inline-block";
          span.style.transitionTimingFunction = `${this.easing}`;
          span.style.transitionDelay = `${index * this.delay}ms`;
          if (!this.pause) {
            span.style.transform = "translateY(100%)";
            setTimeout(() => {
              span.style.transform = "translateY(0%)";
            }, 100);
            if (this.loop) {
              setTimeout(() => {
                span.style.transform = "translateY(-100%)";
                setInterval(() => {
                  span.style.transform = "translateY(0%)";
                  setTimeout(() => {
                    span.style.transform = "translateY(-100%)";
                  }, 2500);
                }, 5000);
              }, 2500);
            }
          }
        });
        // if (!this.pause) {
        //   setTimeout(() => {
        //     const spans = texts.querySelectorAll(`.letter-lbl`);
        //     spans.forEach((span) => {
        //       if (this.reverse) {
        //         this.exitOut(span);
        //       } else {
        //         const lblPlay = () => {
        //           this.enterIn(span);
        //           setTimeout(() => {
        //             this.exitOut(span);
        //           }, 2500);
        //         };
        //         lblPlay();
        //         if (this.loop) {
        //           setInterval(() => {
        //             lblPlay();
        //           }, 5000);
        //         }
        //       }
        //     });
        //   }, 100);
        // }
      });
    }
  
    enterIn(span) {
      span.classList.add("lbl-animate-down");
      setTimeout(() => {
        span.style.transitionTimingFunction = `${this.easing}`;
        span.classList.remove("lbl-animate-down");
        span.classList.add("lbl-animate");
      }, 100);
    }
  
    exitOut(span) {
      span.classList.add("lbl-animate-up");
      span.classList.remove("lbl-animate");
      span.style.transitionTimingFunction = "ease-out";
    }
  
    start() {
      this.pause = false;
      this.updateTexts();
    }
  }
  
  window.LetterByLetter = AnimateLBL;
  