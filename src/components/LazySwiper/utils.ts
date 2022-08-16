export const compose = (...fns: Function[]) => {
  return (value: any) => {
    return [...fns].reverse().reduce((result, fn) => {
      return fn(result)
    }, value)
  }
}

export const pipe = (...fns: Function[]) => {
  return (value: any) => {
    return [...fns].reduce((result, fn) => {
      return fn(result)
    }, value)
  }
}

export const getSafeIndex = (index: number, maxIndex: number, minIndex = 0) => {
  return pipe(
    (value) => Math.max(value, minIndex),
    (value) => Math.min(value, maxIndex)
  )(index)
}

export const getTargetIndex = (toIndex: number, maxIndex: number, minIndex = 0) => {
  if(toIndex > maxIndex) return (toIndex % maxIndex) - 1
  if(toIndex < minIndex) return maxIndex + (toIndex % maxIndex) + 1

  return toIndex
}

export const getStepValue = (fromIndex: number, toIndex: number) => {
  if(fromIndex === toIndex) return 0
  if((toIndex - fromIndex === 1) || (toIndex === 0 && fromIndex > 1)) {
    return 1;
  }

  return -1
}
