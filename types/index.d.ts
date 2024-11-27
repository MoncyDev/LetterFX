interface LetterFXOptions {
  delay?: number; // Delay between letter animations in milliseconds
  clip?: boolean; // Whether to clip the text within its container
  transition?: number; // Duration of the animation in milliseconds
  easing?: string; // CSS easing function for the animation
  pause?: boolean; // Whether the animation is initially paused
  loop?: boolean; // Whether the animation should loop indefinitely
  animateIn?: string; // CSS transform property for the starting animation state
  animateOut?: string; // CSS transform property for the ending animation state
  interval?: number; // Interval for looping animations in milliseconds
  opacity?: number; // Initial opacity for letters
  blur?: string; // Initial blur for letters (e.g., "5px")
}

declare class LetterFX {
  /**
   * Constructor for the LetterFX class.
   * @param textElement - A CSS selector string to select the target text elements.
   * @param options - Configuration options for the animation.
   * @param options - Available options: transition, delay, clip, transition,.
   */
  constructor(textElement: string, options?: LetterFXOptions);

  init(): void;

  updateTexts(): void;

  /**
   * @param span - The span element representing a letter.
   */
  setDefaultStyles(span: HTMLElement): void;

  /**
   * @param span - The span element representing a letter.
   */
  setAnimStyles(span: HTMLElement): void;

  /**
   * @param element - The text element.
   * @returns The word spacing in pixels.
   */
  getWordSpacing(element: HTMLElement): number;

  /**
   * Creates a looping animation for a given letter.
   * @param span - The span element representing a letter.
   * @param index - The index of the letter in the sequence.
   */
  animateLoop(span: HTMLElement, index: number): void;

  /**
   * @param span - The span element representing a letter.
   * @param index - The index of the letter in the sequence.
   * @param transition - The transition duration in milliseconds.
   */
  setTransition(span: HTMLElement, index: number, transition: number): void;

  handleVisibilityChange(): void;

  pauseAnimations(): void;

  resumeAnimations(): void;

  start(): void;
}

export default LetterFX;
