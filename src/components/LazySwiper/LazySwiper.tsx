import {BaseEventOrig, Swiper, SwiperItem, View} from "@tarojs/components"
import {PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {SwiperProps} from "@tarojs/components/types/Swiper";

import SwiperScheduler from "./SwiperScheduler";
import {LazySwiperItem, LazySwiperProps} from "./types";

import {getStepValue} from "./utils";
import {minCount} from "./constant";

import './style.scss'

function LazySwiper<T>(props: PropsWithChildren<LazySwiperProps<T>>) {
  const {dataSource, maxCount = 3, renderContent, loop, keyExtractor} = props

  const swiperSchedulerRef = useRef<SwiperScheduler<LazySwiperItem<T>>>(
    useMemo(() => {
      return new SwiperScheduler({
        dataSource,
        defaultMarkIndex: 0,
        minCount: Math.max(minCount, maxCount),
        loop,
      })
    }, [dataSource, loop, maxCount])
  )


  const stepValue = useRef(0)
  const [isAnimating, setAnimating] = useState(false)
  const [swiperIndex, setSwiperIndex] = useState(0)
  const [source, setSource] = useState<LazySwiperItem<T>[]>([])


  useEffect(() => {
    setSource(
      swiperSchedulerRef.current.updateDataSource(dataSource)
    )
  }, [dataSource])

  const handleChange = useCallback((event: BaseEventOrig<SwiperProps.onChangeEventDetail>) => {
    console.log('change', swiperIndex, event.detail.current)
    const eventIndex = event.detail.current

    stepValue.current = getStepValue(swiperIndex, eventIndex)

    setAnimating(true)
    setSwiperIndex(eventIndex)
  }, [swiperIndex])

  const handleAnimationEnd = useCallback(() => {
    setTimeout(() => {
      setAnimating(false)
    }, 100)
    if (stepValue.current === 0) return
    const sourceCopy = swiperSchedulerRef.current.offsetSection(stepValue.current)
    setSource(sourceCopy)

    stepValue.current = 0;
  }, [])

  const getActiveStatusBySwiperIndex = useCallback((index: number) => {
    return swiperSchedulerRef.current.getActiveStatusBySwiperIndex(index)
  }, [])

  console.log(source, 'source')

  return (
    <View className='lazy-swiper'>
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
        circular={swiperSchedulerRef.current.circular}
        duration={300}
        disableTouch={isAnimating}
      >
        {
          source.map((item, index) => {
            if (!item) return
            const {data, ...otherProps} = item
            const isActive = getActiveStatusBySwiperIndex(index)
            const key = keyExtractor?.(data) || index.toString()
            return (
              <SwiperItem key={key} {...otherProps} >
                {renderContent?.(data, {key, isActive})}
              </SwiperItem>
            )
          })
        }
      </Swiper>
      {
        isAnimating ? (
          <View className='mask' catchMove />
        ) : null
      }
    </View>
  )

}

export default LazySwiper
