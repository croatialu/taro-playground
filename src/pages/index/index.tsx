import {Component, FC, useEffect, useState} from 'react'
import {Button, Input, Video, View} from '@tarojs/components'
import LazySwiper, {useLazySwiper} from 'taro-lazy-swiper';

import './index.scss'


const dataSource = [
  {
    className: 'box red-box',
    data: {
      no: 1, color: 'red',
      videoUrl: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4'
    },
  },
  {
    className: 'box green-box',
    data: {
      no: 2,
      color: 'green',
      videoUrl: 'http://vfx.mtime.cn/Video/2019/03/21/mp4/190321153853126488.mp4'
    },
  },
  {
    className: 'box blue-box',
    data: {
      no: 3,
      color: 'blue',
      videoUrl: 'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319222227698228.mp4'
    },
  },
  {
    className: 'box pink-box',
    data: {
      no: 4,
      color: 'pink',
      videoUrl: 'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319212559089721.mp4'
    },
  },
  {
    className: 'box purple-box',
    data: {
      no: 5,
      color: 'purple',
      videoUrl: 'http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4'
    },
  },
  {
    className: 'box green-box',
    data: {
      no: 6,
      color: 'green',
      videoUrl: 'http://vfx.mtime.cn/Video/2019/03/18/mp4/190318214226685784.mp4'
    },
  },
  {
    className: 'box purple-box',
    data: {
      no: 7,
      color: 'purple',
      videoUrl: 'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319104618910544.mp4'
    },
  },
  {
    className: 'box pink-box',
    data: {
      no: 8,
      color: 'pink',
      videoUrl: 'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319125415785691.mp4'
    },
  },
  {
    className: 'box blue-box',
    data: {
      no: 9,
      color: 'blue',
      videoUrl: 'http://vfx.mtime.cn/Video/2019/03/17/mp4/190317150237409904.mp4'
    },
  },
  {
    className: 'box red-box',
    data: {
      no: 10,
      color: 'red',
      videoUrl: 'http://vfx.mtime.cn/Video/2019/03/14/mp4/190314223540373995.mp4'
    },
  },
  {
    className: 'box yellow-box',
    data: {
      no: 11,
      color: 'yellow',
      videoUrl: 'http://vfx.mtime.cn/Video/2019/03/14/mp4/190314102306987969.mp4'
    },
  },
]

const ColorBox: FC<{ source: (typeof dataSource)[number]['data'] }> = ({source}) => {

  useEffect(() => {
    console.log(source.color, 'color - mount')
    return () => {
      console.log(source.color, 'color - unmount')
    }
  }, [source.color])

  return <View
    style={{
      height: '100%',
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}
  >
    {`no:${source.no}, color: ${source.color} 2333`}
    <Video
      style={{width: '100%'}}
      id='video'
      src={source.videoUrl}
      poster='https://via.placeholder.com/350x150'
      initialTime={0}
      autoplay
      loop
      controls={false}
      muted={false}
    />

  </View>
}

const App = () => {
  const [lazySwiper] = useLazySwiper()

  const [swiperIndex, setSwiperIndex] = useState('10')

  return (
    <View className='index'>
      <LazySwiper
        dataSource={dataSource}
        maxCount={3}
        lazySwiper={lazySwiper}
        renderContent={(v, {isActive}) => {
          if (isActive) return <ColorBox source={v} />
          return 'default'
        }}
        duration={500}
        loop
        keyExtractor={(v) => v.no.toString()}
      />

      <View className='fixed-bar'>
        <Button onClick={() => lazySwiper.prevSection()}>上一章</Button>
        <Button onClick={() => lazySwiper.nextSection()}>下一章</Button>
        <Button onClick={() => lazySwiper.toSection(0)}>回到头</Button>
        <Input type='number'
          style={{width: 50, backgroundColor: 'skyblue'}}
          value={swiperIndex}
          onInput={e => setSwiperIndex(e.detail.value)}
        />
        <Button onClick={() => lazySwiper.toSection(Number(swiperIndex))}>跳转</Button>
      </View>
    </View>
  )
}

export default class Index extends Component {

  memo: any = {}

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  render() {
    return (
      <View>
        <App />
      </View>
    )
  }
}
