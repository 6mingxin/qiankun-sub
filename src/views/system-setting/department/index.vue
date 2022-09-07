<template>
  <v-container>
    <div class="search">
      <n-form-item class="search-item" size="small" label-placement="left" label="姓名">
        <n-input v-model:value="search.name" />
      </n-form-item>
      <n-form-item class="search-item" size="small" label-placement="left" label="电话号码">
        <n-input v-model:value="search.phone" />
      </n-form-item>
      <n-button type="primary" size="small" style="margin-right: 10px">
        <template #icon>
          <i class="iconfont icon-sousuo search-button__icon"></i>
        </template>
        搜 索
      </n-button>
      <n-button size="small">重 置</n-button>
    </div>
    <div>
      <n-button type="primary" size="small" style="margin-right: 10px; margin-bottom: 10px">
        <template #icon>
          <i class="iconfont icon-tianjia search-button__icon"></i>
        </template>
        添 加
      </n-button>
    </div>
    <n-data-table size="small" :columns="columns" :data="data" :pagination="pagination" />
  </v-container>
</template>
<script setup>
import { NTag, NButton } from 'naive-ui'

const pagination = ref({
  pageSize: 10, //每页多少条数据
  page: 1, //当前页
  itemCount: 20, //总数据条数
  pageSizes: [10, 20, 40, 60, 70, 80, 100], //每一页的条数
  showQuickJumper: true, //是否显示快速跳转
  showSizePicker: true, //是否显示每页条数的选择器
  //更改每页的显示数量
  onUpdatePageSize: e => {
    pagination.value.pageSize = e
  },
  // 切换换分页
  onUpdatePage: e => {
    pagination.value.page = e
  },
})
const search = ref({
  name: '',
  phone: '',
})
const createColumns = ({ sendMail }) => {
  return [
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '电话号码',
      key: 'phone',
    },
    {
      title: '部门',
      key: 'department',
    },
    {
      title: '角色',
      key: 'role',
    },
    {
      title: '地址',
      key: 'address',
    },
    {
      title: '创建时间',
      key: 'createDate',
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row),
          },
          { default: () => '查看' },
        )
      },
    },
  ]
}
const data = ref([
  {
    key: 0,
    name: 'John Brown',
    phone: '15123175391',
    address: 'New York No. 1 Lake Park',
    createDate: '2022-01-01 01:01:01',
    department: '研发部',
    role: '研发部角色',
  },
  {
    key: 1,
    name: 'Jim Green',
    phone: '15123175391',
    address: 'London No. 1 Lake Park',
    createDate: '2022-01-01 01:01:01',
    department: '研发部',
    role: '研发部角色',
  },
  {
    key: 2,
    name: 'Joe Black',
    phone: '15123175391',
    address: 'Sidney No. 1 Lake Park',
    createDate: '2022-01-01 01:01:01',
    department: '研发部',
    role: '研发部角色',
  },
])
const columns = ref(
  createColumns({
    sendMail(rowData) {
      console.log('send mail to ' + rowData.name)
    },
  }),
)
const searchIcon = h('i', { class: 'iconfont icon-sousuo' }, {})
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  // align-items: center;
  &-item {
    margin-right: 24px;
  }
  &-button__icon {
    font-size: 14px;
    line-height: 1;
    display: flex;
    align-items: center;
  }
}
</style>
