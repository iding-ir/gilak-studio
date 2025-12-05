export function throttle<T extends unknown[]>(func: (...args: T) => void, limit: number) {
  let lastFunc: number
  let lastRan: number

  return function (this: unknown, ...args: T) {
    if (!lastRan) {
      func.apply(this, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = window.setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args)
            lastRan = Date.now()
          }
        },
        limit - (Date.now() - lastRan)
      )
    }
  }
}
