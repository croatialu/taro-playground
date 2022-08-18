import {Component, FC, useEffect, useState} from 'react'
import {Button, Input, View} from '@tarojs/components'
import './index.scss'
import {LazySwiper, useLazySwiper} from '../../components/LazySwiper';


const dataSource = [{
  className: 'box red-box',
  data: {no: 1, color: 'red'},
}, {
  className: 'box green-box',
  data: {no: 2, color: 'green'},
}, {
  className: 'box blue-box',
  data: {no: 3, color: 'blue'},
}, {
  className: 'box pink-box',
  data: {no: 4, color: 'pink'},
}, {
  className: 'box purple-box',
  data: {no: 5, color: 'purple'},
}, {
  className: 'box green-box',
  data: {no: 6, color: 'green'},
},
  {
    className: 'box purple-box',
    data: {no: 7, color: 'purple'},
  }, {
    className: 'box pink-box',
    data: {no: 8, color: 'pink'},
  }, {
    className: 'box blue-box',
    data: {no: 9, color: 'blue'},
  }, {
    className: 'box red-box',
    data: {no: 10, color: 'red'},
  }, {
    className: 'box yellow-box',
    data: {no: 11, color: 'yellow'},
  },
]

const ColorBox: FC<{ source: (typeof dataSource)[number]['data'] }> = ({source}) => {

  useEffect(() => {
    console.log(source.color, 'color - mount')
    return () => {
      console.log(source.color, 'color - unmount')
    }
  }, [source.color])

  return <View>
    {`no:${source.no}, color: ${source.color} 2333`}
  </View>
}

const App = () => {
  const [lazySwiper] = useLazySwiper()

  const [swiperIndex, setSwiperIndex] = useState(0)

  return (
    <View className='index'>
      123
      <LazySwiper
        dataSource={dataSource}
        maxCount={3}
        lazySwiper={lazySwiper}
        renderContent={(v, {isActive}) => {
          if (isActive) return <ColorBox source={v} />
          return 'default'
        }}
        duration={500}
        // loop
        keyExtractor={(v) => v.no.toString()}
      />

      <View className='fixed-bar'>
        <Button onClick={() => lazySwiper.prevSection()}>上一章</Button>
        <Button onClick={() => lazySwiper.nextSection()}>下一章</Button>

        <Input type='number'
          style={{width: 50, backgroundColor: 'skyblue'}}
          value={swiperIndex.toString()}
          onInput={e => setSwiperIndex(Number(e.detail.value))}
        />
        <Button onClick={() => lazySwiper.toSection(swiperIndex)}>跳转</Button>
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
    // <App />

    return (
      <View>
        <App />
      </View>
    )
  }
}
