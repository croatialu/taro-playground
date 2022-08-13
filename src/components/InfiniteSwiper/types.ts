import {SwiperItemProps} from "@tarojs/components/types/SwiperItem";

export interface InfiniteSwiperItem<T> extends SwiperItemProps{
  data: T,
}

export interface InfiniteSwiperItemConfig<T> extends InfiniteSwiperItem<T> {
  isActive: boolean
}

export interface InfiniteSwiperProps<T> {
  dataSource: InfiniteSwiperItem<T>[]
  keyExtractor?: (data: T) => string
  renderContent?: (data: T, options:{key: string, isActive: boolean}) => React.ReactNode

  /**
   * 同时渲染的swiper item最大数量
   * @default 3
   */
  maxRenderCount?: number

  /**
   * 是否循环
   * @default true
   */
  loop?: boolean
}
