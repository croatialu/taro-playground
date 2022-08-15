/**
 * 有 originArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
 *
 * 有 containerIndex 为输出数据核心数的索引（其他数据以此索引的位置为中心去分配索引位置）
 * 有 dataIndex 为 源数据 索引
 * 有 minLen 为 输出数组的 最小长度
 *
 *  已知
 *    0 <= containerIndex < output.len, 且 containerIndex <= dataIndex, 且 containerIndex % minLen === dataIndex % minLen;
 *  且 minLen 为奇数， 3 <= minLen < 10
 *  且 minLen <= output.len <= 2minLen - 1 （当最后一组数量不足 minLen 时，合并到上一组）
 *
 *
 *  containerIndex = 0 && dataIndex = 0 && minLen = 5 时
 * 输出：[1, 2, 3, 4, 5]
 * containerIndex = 1 && dataIndex = 1 && minLen = 5 时
 * 输出：[1, 2, 3, 4, 5]
 * containerIndex = 2 && dataIndex = 2 && minLen = 5 时
 * 输出：[1, 2, 3, 4, 5]
 * containerIndex = 3 && dataIndex = 3 && minLen = 5 时
 * 输出：[6, 2, 3, 4, 5]
 * containerIndex = 4 && dataIndex = 4 && minLen = 5 时
 * 输出：[6, 7, 3, 4, 5]
 * containerIndex = 0 && dataIndex = 5 && minLen = 5 时
 * 输出：[6, 7, 8, 4, 5]
 * containerIndex = 1 && dataIndex = 6 && minLen = 5 时
 * 输出：[6, 7, 8, 9, 5]
 * containerIndex = 2 && dataIndex = 7 && minLen = 5 时
 * 输出：[6, 7, 8, 9, 10]
 * containerIndex = 3 && dataIndex = 8 && minLen = 5 时
 * 输出：[6, 7, 8, 9, 10, 11]
 * containerIndex = 4 && dataIndex = 9 && minLen = 5 时
 * 输出：[6, 7, 8, 9, 10, 11, 12]
 * containerIndex = 5 && dataIndex = 10 && minLen = 5 时
 * 输出：[6, 7, 8, 9, 10, 11, 12, 13]
 * containerIndex = 6 && dataIndex = 11 && minLen = 5 时
 * 输出：[6, 7, 8, 9, 10, 11, 12, 13]
 * containerIndex = 7 && dataIndex = 12 && minLen = 5 时
 * 输出：[6, 7, 8, 9, 10, 11, 12, 13]
 */


interface SwiperSchedulerParams {
    /**
     * 最小输出数组长度
     *
     */
    minCount?: number

    dataSource: string[]
}

class SwiperScheduler {

    dataSource: string[]

    minCount: number;
    markIndex = 0;

    constructor(params: SwiperSchedulerParams) {
        const {minCount = 3, dataSource = []} = params

        this.minCount = minCount;
        this.dataSource = dataSource
    }

    public get swiperIndex() {
        const maxMarkIndex = this.dataSource.length - 1

        const localSwiperIndex = this.markIndex % this.minCount

        if (maxMarkIndex - this.markIndex <= Math.floor((this.minCount - 1) / 2)) {
            return this.minCount + localSwiperIndex
        }

        return localSwiperIndex
    }

    get source() {

    }

    setMarkIndex(index: number) {
        this.markIndex = Math.min(index, this.dataSource.length - 1)
    }

    computeSource() {

    }

    public getSafeIndex() {

    }

    public getTargetIndex() {

    }

}

const swiperScheduler = new SwiperScheduler({
    dataSource: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
    minCount: 5
})


const options = [
    {
        markIndex: 0,
        minCount: 5,
        containerIndex: 0,
        output: [1, 2, 3, 4, 5]
    },
    {
        markIndex: 1,
        minCount: 5,
        containerIndex: 1,
        output: [1, 2, 3, 4, 5]
    },
    {
        markIndex: 2,
        minCount: 5,
        containerIndex: 2,
        output: [1, 2, 3, 4, 5]
    },
    {
        markIndex: 3,
        minCount: 5,
        containerIndex: 3,
        output: [6, 2, 3, 4, 5]
    },
    {
        markIndex: 4,
        minCount: 5,
        containerIndex: 4,
        output: [6, 7, 3, 4, 5]
    },
    {
        markIndex: 5,
        minCount: 5,
        containerIndex: 0,
        output: [6, 7, 8, 4, 5]
    },
    {
        markIndex: 6,
        minCount: 5,
        containerIndex: 1,
        output: [6, 7, 8, 9, 5]
    },
    {
        markIndex: 7,
        minCount: 5,
        containerIndex: 2,
        output: [6, 7, 8, 9, 10]
    },
    {
        markIndex: 8,
        minCount: 5,
        containerIndex: 3,
        output: [6, 7, 8, 9, 10, 11]
    },
    {
        markIndex: 9,
        minCount: 5,
        containerIndex: 4,
        output: [6, 7, 8, 9, 10, 11, 12]
    },
    {
        markIndex: 10,
        minCount: 5,
        containerIndex: 5,
        output: [6, 7, 8, 9, 10, 11, 12, 13]
    },
    {
        markIndex: 11,
        minCount: 5,
        containerIndex: 6,
        output: [6, 7, 8, 9, 10, 11, 12, 13]
    },
    {
        markIndex: 12,
        minCount: 5,
        containerIndex: 7,
        output: [6, 7, 8, 9, 10, 11, 12, 13]
    },
].map(v => ({...v, output: v.output.map(String)}))


// const markIndex = 11
// swiperScheduler.setMarkIndex(markIndex)
//
// console.log(options.find(v => v.markIndex === markIndex)?.containerIndex === swiperScheduler.swiperIndex, '2333')

options.forEach(item => {
    swiperScheduler.setMarkIndex(item.markIndex)
    const swiperIndex = swiperScheduler.swiperIndex;
    console.log(item.containerIndex === swiperIndex, {
        containerIndex: item.containerIndex,
        swiperIndex: swiperIndex,
        markIndex: item.markIndex
    })
})

console.log(options.reduce((result, item) => {
    result[item.markIndex] = item.containerIndex
    return result
}, {} as any))

const markIndex = 12
swiperScheduler.setMarkIndex(markIndex)
swiperScheduler.swiperIndex
