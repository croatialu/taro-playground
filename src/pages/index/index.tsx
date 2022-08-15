import {Component, FC, useEffect} from 'react'
import {View} from '@tarojs/components'
import './index.scss'
import {InfiniteSwiper} from "../../components/InfiniteSwiper";


const dataSource = [{
  className: 'box red-box',
  data: {no: 1, color: 'red'},
},{
  className: 'box green-box',
  data: {no: 2, color: 'green'},
},{
  className: 'box blue-box',
  data: { no: 3, color: 'blue' },
},{
  className: 'box pink-box',
  data: { no: 4, color: 'pink' },
},{
  className: 'box purple-box',
  data: { no: 5, color: 'purple' },
},{
  className: 'box green-box',
  data: { no: 6, color: 'green' },
},
  {
    className: 'box purple-box',
    data: { no: 7, color: 'purple' },
  },{
    className: 'box pink-box',
    data: { no: 8, color: 'pink' },
  },{
    className: 'box blue-box',
    data: { no: 9, color: 'blue' },
  },{
    className: 'box red-box',
    data: { no: 10, color: 'red' },
  },{
    className: 'box yellow-box',
    data: { no: 11, color: 'yellow' },
  },
]

const ColorBox: FC<{ source: (typeof dataSource)[number]['data'] }> = ({ source }) => {

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

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  memo: any = {

  }

  render () {
    return (
      <View className='index'>
       <InfiniteSwiper
         dataSource={dataSource}
         maxRenderCount={5}
         renderContent={(v, { isActive }) => {
          if(isActive) return <ColorBox  source={v} />
           return 'default'
         }}
         loop={false}
         keyExtractor={(v) => v.no.toString()}
       />
      </View>
    )
  }
}
