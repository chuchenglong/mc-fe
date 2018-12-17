<template>
  <div>
    <el-container>
      <el-table :data="tableData.filter(data => !search || data.configCode.toLowerCase().includes(search.toLowerCase()))" >
        <el-table-column width="160px" label="code" prop="configCode"></el-table-column>
        <el-table-column width="160px" label="名称" prop="configName"></el-table-column>
        <el-table-column width="150px" label="值" prop="configValue"></el-table-column>
        <el-table-column width="100px" label="配置类型" prop="configType" :formatter="ftConfigType"></el-table-column>
        <el-table-column width="100px" label="业务类型" prop="bizType" :formatter="ftBizType"></el-table-column>
        <el-table-column width="100px" label="标签" prop="configMark" :formatter="ftConfigMark"></el-table-column>
        <el-table-column width="100px" label="状态" prop="configStatus" :formatter="ftConfigStatus"></el-table-column>
        <el-table-column min-width	="200px" label="描述" prop="configDes"></el-table-column>
        <el-table-column width	="400px" align="right">
          <template slot="header" slot-scope="scope">
            <div><el-button icon="el-icon-plus" size="small" @click="handleAdd" class="b-add">添加配置</el-button></div>
            <el-input v-model="search" size="small " placeholder="输入配置项code搜索" prefix-icon="el-icon-search"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" @click="handleStop(scope.$index, scope.row)" icon="el-icon-circle-close-outline" v-if="scope.row.configStatus == 'cs_100' ">停用</el-button>
            <el-button size="mini" @click="handleStart(scope.$index, scope.row)" icon="el-icon-circle-check-outline" v-else >启用</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <el-container>
      <el-dialog title="新增配置信息" :close-on-click-modal="false" :visible.sync="addVisible">
        <el-form>
          <el-form-item label="code">
            <el-input v-model="configCode"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="configName"></el-input>
          </el-form-item>
          <el-form-item label="值">
            <el-input v-model="configValue"></el-input>
          </el-form-item>
          <el-form-item label="配置类型">
            <el-radio-group v-model="configType">
              <el-radio v-for="ct in configTypes" :key="ct.key" :label="ct.key">{{ct.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="业务类型">
            <el-radio-group v-model="bizType">
              <el-radio v-for="bt in bizTypes" :key="bt.key" :label="bt.key">{{bt.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签">
            <el-radio-group v-model="configMark">
              <el-radio v-for="cm in configMarks" :key="cm.key" :label="cm.key">{{cm.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="configDes"></el-input>
          </el-form-item>
          <el-button @click="cancelAdd">取 消</el-button>
          <el-button type="primary" @click="addConfigList">确 定</el-button>
        </el-form>
      </el-dialog>

      <el-dialog title="修改配置信息" :close-on-click-modal="false" :visible.sync="updateVisible">
        <el-form>
          <el-form-item label="code">
            <label>{{configCodeUpdate}}</label>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="configNameUpdate"></el-input>
          </el-form-item>
          <el-form-item label="值">
            <el-input v-model="configValueUpdate"></el-input>
          </el-form-item>
          <el-form-item label="配置类型">
            <el-radio-group v-model="configTypeUpdate">
              <el-radio v-for="ct in configTypes" :key="ct.key" :label="ct.key">{{ct.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="业务类型">
            <el-radio-group v-model="bizTypeUpdate">
              <el-radio v-for="bt in bizTypes" :key="bt.key" :label="bt.key">{{bt.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签">
            <el-radio-group v-model="configMarkUpdate">
              <el-radio v-for="cm in configMarks" :key="cm.key" :label="cm.key">{{cm.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="configDesUpdate" class="i-big"></el-input>
          </el-form-item>
          <el-button @click="cancelUpdate">取 消</el-button>
          <el-button type="primary" @click="updateConfigList">确 定</el-button>
        </el-form>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
  import api from '@/service/api'

  export default {
    data() {
      return {
        tableData: [],
        search: '',
        addVisible: false,
        updateVisible: false,
        configCode: '',
        configName: '',
        configValue: '',
        configType: '',
        bizType: '',
        configMark: '',
        configDes: '',
        configTypes: [],
        bizTypes: [],
        configMarks: [],
        configId: '',
        configCodeUpdate: '',
        configNameUpdate: '',
        configValueUpdate: '',
        configTypeUpdate: '',
        bizTypeUpdate: '',
        configMarkUpdate: '',
        configDesUpdate: '',
        index: -1,
        configStatus: ''
      }
    },

    methods: {
      addConfigList() {
        var params = {};
        params.configCode = this.configCode
        params.configName = this.configName
        params.configValue = this.configValue
        params.configType = this.configType
        params.bizType = this.bizType
        params.configMark = this.configMark
        params.configDes = this.configDes
        api.addConfig(params).then((response) => {
          if (response.code == 'success') {
            params.id = response.data
            params.configStatus = 'cs_100'
            this.tableData.push(params)
            this.cancelAdd()
            this.$message({type: 'success', message: '添加成功!'});
          } else {
            this.$message.error(response.message)
          }
        })

      },
      updateConfigList() {
        var params = {};
        params.id = this.configId;
        params.configCode = this.configCodeUpdate
        params.configName = this.configNameUpdate
        params.configValue = this.configValueUpdate
        params.configType = this.configTypeUpdate
        params.bizType = this.bizTypeUpdate
        params.configMark = this.configMarkUpdate
        params.configDes = this.configDesUpdate
        api.updateConfig(params).then((response) => {
          if (response.code == 'success') {
            params.configStatus = this.configStatus
            this.tableData.splice(this.index, 1, params)
            this.cancelUpdate()
            this.$message({type: 'success', message: '修改成功!'});
          } else {
            this.$message.error(response.message)
          }
        })

      },
      handleAdd() {
        this.addVisible = true
        this.updateVisible = false
      },
      handleUpdate(index, row) {
        this.addVisible = false
        this.updateVisible = true
        this.configId = row.id
        this.index = index
        api.getConfigDetail({id: row.id}).then((response) => {
          if (response.code == 'success') {
            this.configCodeUpdate = response.data.configCode
            this.configNameUpdate = response.data.configName
            this.configValueUpdate = response.data.configValue
            this.configTypeUpdate = response.data.configType
            this.bizTypeUpdate = response.data.bizType
            this.configMarkUpdate = response.data.configMark
            this.configDesUpdate = response.data.configDes
            this.configStatus = response.data.configStatus
          } else {
            this.$message.error(response.message)
          }
        })
      },
      cancelAdd() {
        this.addVisible = false
        this.updateVisible = false
        this.configCode = ''
        this.configName = ''
        this.configValue = ''
        this.configType = ''
        this.bizType = ''
        this.configMark = ''
        this.configDes = ''
      },
      cancelUpdate() {
        this.addVisible = false
        this.updateVisible = false
        this.configCodeUpdate = ''
        this.configNameUpdate = ''
        this.configValueUpdate = ''
        this.configTypeUpdate = ''
        this.bizTypeUpdate = ''
        this.configMarkUpdate = ''
        this.configDesUpdate = ''
      },
      handleDelete(index, row) {
        this.$confirm('此操作将删除该配置, 是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          var params = {};
          params.id = row.id
          api.deleteConfig(params).then((response) => {
            if (response.code == 'success') {
              this.tableData.splice(index, 1)
              this.$message({type: 'success', message: '删除成功!'});
            } else {
              this.$message.error(response.message)
            }
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'})
        })

      },
      handleStop(index, row) {
        this.$confirm('此操作将停用该配置, 是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          var params = {};
          params.id = row.id
          params.configStatus = 'cs_101'
          api.updateConfigStatus(params).then((response) => {
            if (response.code == 'success') {
              row.configStatus = 'cs_101'
              this.tableData.splice(index, 1, row)
              this.$message({type: 'success', message: '停用成功!'});
            } else {
              this.$message.error(response.message)
            }
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消'})
        })

      },
      handleStart(index, row) {
        var params = {};
        params.id = row.id
        params.configStatus = 'cs_100'
        api.updateConfigStatus(params).then((response) => {
          if (response.code == 'success') {
            row.configStatus = 'cs_100'
            this.tableData.splice(index, 1, row)
            this.$message({type: 'success', message: '启用成功!'});
          } else {
            this.$message.error(response.message)
          }
        })

      },
      ftConfigStatus(row, column, cellValue, index) {
        if (cellValue == 'cs_100') {
          return '正常'
        } else if (cellValue == 'cs_101') {
          return '停用'
        } else {
          return ''
        }
      },
      ftConfigMark(row, column, cellValue, index) {
        if (cellValue == 'cm_100')
          return '--'
        else
          return ''
      },
      ftBizType(row, column, cellValue, index) {
        if (cellValue == 'bt_100')
          return 'mc'
        else
          return ''
      },
      ftConfigType(row, column, cellValue, index) {
        if (cellValue == 'ct_100')
          return '数据'
        else if (cellValue == 'ct_101')
          return '开关'
        else
          return ''
      }
    },
    mounted() {
      api.getConfigList().then((response) => {
        if (response.code == 'success')
          this.tableData = response.data
        else
          this.$message.error(response.message)
      })

      api.getConfigType().then((response) => {
        if (response.code == 'success')
          this.configTypes = response.data
        else
          this.$message.error(response.message)
      })

      api.getBizType().then((response) => {
        if (response.code == 'success')
          this.bizTypes = response.data
        else
          this.$message.error(response.message)
      })

      api.getConfigMark().then((response) => {
        if (response.code == 'success')
          this.configMarks = response.data
        else
          this.$message.error(response.message)
      })

    },
  }
</script>

<style scoped>
  .el-container {
    padding: 1% 10% 0 10% !important;
    width: 100%;
  }
  .el-input {
    width: 230px;
    padding: 0;
  }
  .b-add {
    width: 110px !important;
    border-radius: 6px;
  }
  .el-form-item__label {
    display: block !important;
    width: 150px !important;
  }
  .i-big {
    width: 420px;
  }

</style>
