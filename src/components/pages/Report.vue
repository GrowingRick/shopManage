<template>
  <div>
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumb-level="breadcrumbLevel" />
    <!-- 面包屑END -->

    <el-card>
      <div id="main" style="height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
// 导入echarts
import echarts from 'echarts'
// 处理对象合并
import _ from 'lodash'
import Breadcrumb from '../Breadcrumb'
export default {
  data () {
    return {
      breadcrumbLevel: {
        first: '数据统计',
        second: '数据列表'
      },
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  components: {
    Breadcrumb
  },
  created () {},
  async mounted () {
    // 初始化echarts
    var myChart = echarts.init(document.getElementById('main'))
    const { data: res } = await this.$axios.get('reports/type/1')
    if (res.meta.status !== 200) return this.$message.error('获取折线图失败')

    const result = _.merge(res.data, this.options)

    // 展示数据
    myChart.setOption(result)
  }
}
</script>

<style lang="less" scoped>

</style>
