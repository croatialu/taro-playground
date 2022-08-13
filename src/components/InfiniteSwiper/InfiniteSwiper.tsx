import {BaseEventOrig, Swiper, SwiperItem, View} from "@tarojs/components"
import {PropsWithChildren, useCallback, useMemo, useRef, useState} from "react";
import {SwiperProps} from "@tarojs/components/types/Swiper";
import { InfiniteSwiperItemConfig, InfiniteSwiperProps} from "./types";

import './style.scss'
import {getStepValue, getTargetIndex} from "./utils";


function InfiniteSwiper<T>({ dataSource, renderContent, keyExtractor, maxRenderCount = 3, loop = true }: PropsWithChildren<InfiniteSwiperProps<T>>) {

  const [swiperIndex, setSwiperIndex] = useState(0)
  const [isAnimating, setAnimating] = useState(false)
  const [markIndex, setMarkIndex] = useState(0)

  const maxSwiperIndex = maxRenderCount - 1;
  const maxMarkIndex = dataSource.length - 1

  const computeSource = useCallback((index: number, innerSwiperIndex = swiperIndex) => {

    const arr: InfiniteSwiperItemConfig<T>[] = [];
    arr[innerSwiperIndex] = {
      ...dataSource[index],
      isActive: true
    };

    Array(Math.floor(maxRenderCount / 2)).fill(null).forEach((_, _index) => {
      const count = _index + 1;
      const prevMarkIndex = getTargetIndex(index - count, maxMarkIndex)
      const nextMarkIndex = getTargetIndex(index + count, maxMarkIndex)

      const prevSourceItem = dataSource[prevMarkIndex]
      const nextSourceItem = dataSource[nextMarkIndex]

      const prevSwiperIndex = getTargetIndex(swiperIndex - count, maxSwiperIndex)
      const nextSwiperIndex = getTargetIndex(swiperIndex + count, maxSwiperIndex)

      console.log({
        index, count,
        prevMarkIndex,
        nextMarkIndex,
        prevSwiperIndex,
        nextSwiperIndex,
      }, '23333333')
      arr[prevSwiperIndex] = { ...prevSourceItem, isActive: false }
      arr[nextSwiperIndex] = { ...nextSourceItem, isActive: false }
    })

    return arr
  }, [swiperIndex, dataSource, maxRenderCount, maxMarkIndex, maxSwiperIndex])

  const [ source, setSource ] = useState(() => computeSource(swiperIndex))

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
    setSwiperIndex(event.detail.current)
  }, [swiperIndex])


  const recomputeSource = useCallback((step: number) => {
    const toMarkIndex = getTargetIndex(markIndex + step, dataSource.length - 1, 0);
    setMarkIndex(toMarkIndex)
    updateSource(toMarkIndex)
  }, [dataSource.length, markIndex, updateSource])

  const handleAnimationEnd = useCallback((event: BaseEventOrig<SwiperProps.onChangeEventDetail>) => {
    setTimeout(() => {
      setAnimating(false)
    }, 100)
    console.log('animation end', swiperIndex, event.detail.current)
    if(stepValue.current === 0) return
    recomputeSource(
      stepValue.current
    )
    stepValue.current = 0;
    // if(1 !== event.detail.current) {
    //   resetIndex(event.detail.current)
    // }
  }, [swiperIndex, recomputeSource])

  const circular = useMemo(() => {
    if(loop) return true;
    return markIndex !== 0 && markIndex !== maxMarkIndex
  }, [loop, markIndex, maxMarkIndex])

  return (
    <View className='infinite-swiper'>
      {/*index: {currentIndex} markIndex: {markIndex}*/}
      <Swiper
        style={{
          height: '100vh'
        }}
        current={swiperIndex}
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
