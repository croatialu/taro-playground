import {BaseEventOrig, Swiper, SwiperItem, View} from "@tarojs/components"
import {PropsWithChildren, useCallback, useMemo, useRef, useState} from "react";
import {SwiperProps} from "@tarojs/components/types/Swiper";
import { InfiniteSwiperItemConfig, InfiniteSwiperProps} from "./types";

import './style.scss'
import {getSafeIndex, getStepValue, getTargetIndex} from "./utils";


function InfiniteSwiper<T>({ dataSource, renderContent, keyExtractor, maxRenderCount = 3, loop = true }: PropsWithChildren<InfiniteSwiperProps<T>>) {

  const [swiperIndex, setSwiperIndex] = useState(0)
  const [isAnimating, setAnimating] = useState(false)
  const [markIndex, setMarkIndex] = useState(0)

  console.log({
    swiperIndex, markIndex,
  }, 'index - value')

  const maxSwiperIndex = maxRenderCount - 1;
  const maxMarkIndex = dataSource.length - 1


  const getSwiperAndMarkIndex = useCallback((localSwiperIndex: number, localMarkIndex: number, count: number) => {

    const prevSwiperIndex = getTargetIndex(localSwiperIndex - count, maxSwiperIndex)
    const nextSwiperIndex = getTargetIndex(localSwiperIndex + count, maxSwiperIndex)


    const getMarkIndex = loop ? getTargetIndex : getSafeIndex;

    let prevMarkIndex = getMarkIndex(localMarkIndex - count, maxMarkIndex);
    let nextMarkIndex = getMarkIndex(localMarkIndex + count, maxMarkIndex);

    if(!loop && prevSwiperIndex >= localSwiperIndex && prevMarkIndex < localMarkIndex) {
      // 不循环的时候， 如果上N个swiper的索引大于了当前的swiper 索引， 则认定是在末尾追加的，此时需要重算 preMarkIndex 来应对这种情况
      prevMarkIndex = localMarkIndex + (prevSwiperIndex - localSwiperIndex);
    }

    // 1, 0, 1
    if(!loop && nextSwiperIndex <= localSwiperIndex && nextMarkIndex < localMarkIndex) {

      nextMarkIndex = -1
    }

    return {
      prevSwiperIndex, nextSwiperIndex, prevMarkIndex, nextMarkIndex
    }

  }, [loop, maxMarkIndex, maxSwiperIndex])

  const computeSource = useCallback((localMarkIndex: number, localSwiperIndex = swiperIndex) => {

    const arr: Array<InfiniteSwiperItemConfig<T> | null> = [];
    arr[localSwiperIndex] = {
      ...dataSource[localMarkIndex],
      isActive: true
    };

    Array(Math.floor(maxRenderCount / 2)).fill(null).forEach((_, _index) => {
      const count = _index + 1;
      const { prevMarkIndex, nextMarkIndex, prevSwiperIndex, nextSwiperIndex } = getSwiperAndMarkIndex(localSwiperIndex, localMarkIndex, count)

      const prevSourceItem = dataSource[prevMarkIndex]
      const nextSourceItem = dataSource[nextMarkIndex]

      console.log({
        localMarkIndex, count,
        prevMarkIndex,
        nextMarkIndex,
        prevSwiperIndex,
        nextSwiperIndex,
        localSwiperIndex,
        loop
      }, '23333333')

      arr[prevSwiperIndex] = prevSourceItem ? { ...prevSourceItem, isActive: false } : null
      arr[nextSwiperIndex] = nextSourceItem ? { ...nextSourceItem, isActive: false } : null

    })
    console.log(arr, 'recompute arr')
    return arr.filter(v => v)
  }, [swiperIndex, dataSource, maxRenderCount, getSwiperAndMarkIndex, loop])

  const [ source, setSource ] = useState(() => computeSource(swiperIndex))

  const currentSwiperMaxIndex = source.length - 1;

  console.log(source, 'source')

  const updateSource = useCallback((index: number) => {
    setSource(computeSource(index))
  }, [computeSource])

  const stepValue = useRef(0)

  const handleChange = useCallback((event: BaseEventOrig<SwiperProps.onChangeEventDetail>) => {
    console.log('change', swiperIndex, event.detail.current)
    const eventIndex = event.detail.current

    stepValue.current = getStepValue(swiperIndex, eventIndex)

    setAnimating(true)
    setSwiperIndex(getSafeIndex(event.detail.current, currentSwiperMaxIndex))
    // setSwiperIndex(0)
  }, [currentSwiperMaxIndex, swiperIndex])



  const resetTo = useCallback((localMarkIndex: number) => {
    const toMarkIndex = getTargetIndex(localMarkIndex, dataSource.length - 1, 0);
    console.log(toMarkIndex, 'resetTo - toMarkIndex')

    setMarkIndex(toMarkIndex)
    updateSource(toMarkIndex)
  }, [dataSource.length, updateSource])

  const recomputeSource = useCallback((step: number) => {
    resetTo(markIndex + step)
  }, [markIndex, resetTo])

  const handleAnimationEnd = useCallback(() => {
    setTimeout(() => {
      setAnimating(false)
    }, 100)
    if(stepValue.current === 0) return
    recomputeSource(
      stepValue.current
    )
    stepValue.current = 0;
  }, [recomputeSource])

  const circular = useMemo(() => {
    if(loop) return true;
    return markIndex !== 0 && markIndex !== maxMarkIndex
  }, [loop, markIndex, maxMarkIndex])

  const safeSwiperIndex = getSafeIndex(swiperIndex, currentSwiperMaxIndex)

  console.log({
    safeSwiperIndex, swiperIndex
  }, 'index - value')

  return (
    <View className='infinite-swiper'>
      {/*index: {currentIndex} markIndex: {markIndex}*/}
      <Swiper
        style={{
          height: '100vh'
        }}
        current={safeSwiperIndex}
        onChange={handleChange}
        onAnimationFinish={handleAnimationEnd}
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        indicatorDots
        vertical
        circular={circular}
        duration={300}
        disableTouch={isAnimating}
      >
        {
          source?.map((item, index) => {
            if(!item) return
            const { data, isActive, ...otherProps } = item
            const key = keyExtractor?.(data) || index.toString()
            return (
              <SwiperItem key={key} {...otherProps} >
                {renderContent?.(data, { key, isActive }) || null}
              </SwiperItem>
            )
          })
        }
      </Swiper>
      {
        isAnimating ? (
           <View className='mask' catchMove />
        ): null
      }
    </View>
  )
}

export default  InfiniteSwiper
