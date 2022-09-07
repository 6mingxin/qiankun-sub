<template>
  <n-grid :x-gap="16" :y-gap="16" :item-responsive="true">
    <n-grid-item span="0:24 640:24 1024:16">
      <n-card :bordered="false" class="card">
        <div class="card-box">
          <div class="card-left">
            <h3 class="card-left__title">Dashboard</h3>
            <p class="card-left__subtitle">Overview Of Lasted Month</p>
            <h3 class="card-left__count-to">
              <count-to prefix="$" :start-value="0" :end-value="7754" />
            </h3>
            <p class="card-left__subtitle">Current Month Earnings</p>
            <h3 class="card-left__count-to">
              <count-to :start-value="0" :end-value="1234" />
            </h3>
            <p class="card-left__subtitle">Current Month Sales</p>
            <n-button class="card-left__button" type="primary">Last Month Summary</n-button>
          </div>
          <div class="card-right">
            <div ref="lineRef" class="card-right__line"></div>
          </div>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:8">
      <n-card :bordered="false" class="card">
        <div ref="pieRef" class="card-box"></div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { Line, Pie } from '@antv/g2plot'
import data from './data.json'

const lineRef = ref()
const line = ref()
const pieRef = ref()
const pie = ref()

function renderLineChart() {
  if (!lineRef.value) return
  line.value = new Line(lineRef.value, {
    data,
    autoFit: true,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    lineStyle: {
      lineWidth: 4,
    },
    area: {
      style: {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      },
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'wave-in',
        duration: 2000,
      },
    },
  })
  line.value.render()
}
function renderPieChart() {
  if (!pieRef.value) return
  const pieData = [
    { type: '学习', value: 20 },
    { type: '娱乐', value: 10 },
    { type: '工作', value: 30 },
    { type: '休息', value: 40 },
  ]
  pie.value = new Pie(pieRef.value, {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.65,
    meta: {
      value: {
        formatter: v => `${v}%`,
      },
    },
    label: {
      type: 'inner',
      autoRotate: false,
      formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    },
    statistic: undefined,
    pieStyle: {
      radius: [20],
    },
    color: ['#025DF4', '#DB6BCF', '#2498D1', '#FF745A', '#007E99', '#FFA8A8', '#2391FF'],
    legend: {
      position: 'bottom',
    },
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
      {
        type: 'pie-statistic-active',
        cfg: {
          start: [
            { trigger: 'element:mouseenter', action: 'pie-statistic:change' },
            { trigger: 'legend-item:mouseenter', action: 'pie-statistic:change' },
          ],
          end: [
            { trigger: 'element:mouseleave', action: 'pie-statistic:reset' },
            { trigger: 'legend-item:mouseleave', action: 'pie-statistic:reset' },
          ],
        },
      },
    ],
  })

  pie.value.render()
}

onMounted(() => {
  renderLineChart()
  renderPieChart()
})
</script>
<style scoped lang="scss">
.card {
  border-radius: 16px;
  box-shadow: var(--n-box-shadow);
}
.card-box {
  display: flex;
  width: 100%;
  height: 360px;
}
.card-left {
  width: 200px;
  height: 100%;
  padding: 12px 0;
  margin: 0;
  &__title {
    font-size: 16px;
    font-weight: 700;
    margin: 0;
  }
  &__subtitle {
    color: #aaa;
    margin: 0;
  }
  &__count-to {
    margin: 0;
    padding-top: 36px;
    font-size: 24px;
    font-weight: 700;
  }
  &__button {
    margin-top: 24px;
  }
}
.card-right {
  height: 100%;
  flex: 1;
  overflow: hidden;
  &__line {
    width: 100%;
    height: 100%;
  }
}
</style>
