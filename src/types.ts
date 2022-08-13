export interface AnimateOptions {
  /**
   * Class prefix for matching animation rules.
   *
   * @default `animate-`
   */
  prefix?: string

  /**
   * Default animation speed / duration
   *
   * @default 1000
   */
  animatedSpeed?: number

  /**
   * Default heart beat animation speed / duration
   *
   * @default 1300
   */
  heartBeatSpeed?: number

  /**
   * Default hinge animation speed / duration
   *
   * @default 2000
   */
  hingeSpeed?: number

  /**
   * Default bounce in animation speed / duration
   *
   * @default 750
   */
  bounceInSpeed?: number

  /**
   * Default bounce out animation speed / duration
   *
   * @default 750
   */
  bounceOutSpeed?: number

  /**
   * Default animay delay for animate-delay utility
   *
   * @default 1000
   */
  animationDelaySpeed?: number
}
