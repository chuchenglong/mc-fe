<template>
  <div>
    <el-container>
      <el-table :data="tableData.filter(data => !search || data.configCode.toLowerCase().includes(search.toLowerCase()))" >
        <el-table-column width="160px" label="配置code" prop="configCode"></el-table-column>
        <el-table-column width="160px" label="配置名称" prop="configName"></el-table-column>
        <el-table-column width="100px" label="配置值" prop="configValue"></el-table-column>
        <el-table-column width="80px" label="配置类型" prop="configType" :formatter="ftCT"></el-table-column>
        <el-table-column width="80px" label="业务类型" prop="bizType" :formatter="ftBT"></el-table-column>
        <el-table-column width="50px" label="标签" prop="configMark" :formatter="ftCM"></el-table-column>
        <el-table-column width="50px" label="状态" prop="configStatus" :formatter="ftCS"></el-table-column>
        <el-table-column min-width	="150px" label="描述" prop="configDes"></el-table-column>
        <el-table-column width	="280px" align="right">
          <template slot="header" slot-scope="scope">
            <div><el-button icon="el-icon-plus" size="small" @click="handleAdd" class="b-add">添加配置</el-button></div>
            <el-input v-model="search" size="small " placeholder="输入code搜索" prefix-icon="el-icon-search"/>
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
      <el-dialog :title="dialogTitle" :close-on-click-modal="false" :visible.sync="dialogVisible" width="700px">
        <el-form>
          <el-form-item>
            <label class="el-label l">配置code：</label>
            <label class="el-label r"><el-input v-model="configCode"></el-input></label>
            <label class="el-label l">配置名称：</label>
            <label class="el-label r"><el-input v-model="configName"></el-input></label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">配置值：</label>
            <label class="el-label r"><el-input v-model="configValue"></el-input></label>
            <label class="el-label l">配置类型：</label>
            <label class="el-label r">
              <el-radio-group v-model="configType">
                <el-radio v-for="ct in configTypes" :key="ct.key" :label="ct.key">{{ct.value}}</el-radio>
              </el-radio-group>
            </label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">标签：</label>
            <label class="el-label r">
              <el-radio-group v-model="configMark">
                <el-radio v-for="cm in configMarks" :key="cm.key" :label="cm.key">{{cm.value}}</el-radio>
              </el-radio-group>
            </label>
            <label class="el-label l">业务类型：</label>
            <label class="el-label r">
              <el-radio-group v-model="bizType">
                <el-radio v-for="bt in bizTypes" :key="bt.key" :label="bt.key">{{bt.value}}</el-radio>
              </el-radio-group>
            </label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">配置描述：</label>
            <label class="el-label r"><el-input v-model="configDes" style="width: 470px"></el-input></label>
          </el-form-item>
          <div style="text-align: center">
            <el-button size="medium" @click="cancel" style="width: 100px">取 消</el-button>
            <el-button size="medium" type="primary" @click="submitConfig" style="width: 100px">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
  import api from '@/service/api'
  import {ftConfigStatus, ftConfigMark, ftBizType, ftConfigType} from '@/util/format'

  export default {
    data() {
      return {
        tableData: [],
        search: '',
        dialogVisible: false,
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
        index: -1,
        configStatus: '',
        dialogTitle: '',
        dialogFlag: 0
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
    methods: {
      handleAdd() {
        this.dialogVisible = true
        this.dialogTitle = "新增配置信息"
        this.dialogFlag = 0
      },

      handleUpdate(index, row) {
        this.dialogVisible = true
        this.configId = row.id
        this.index = index
        this.dialogTitle = "修改配置信息"
        this.dialogFlag = 1
        api.getConfigDetail({id: row.id}).then((response) => {
          if (response.code == 'success') {
            this.configCode = response.data.configCode
            this.configName = response.data.configName
            this.configValue = response.data.configValue
            this.configType = response.data.configType
            this.bizType = response.data.bizType
            this.configMark = response.data.configMark
            this.configDes = response.data.configDes
            this.configStatus = response.data.configStatus
          } else {
            this.$message.error(response.message)
          }
        })
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

      submitConfig() {
        var params = {};
        params.configCode = this.configCode
        params.configName = this.configName
        params.configValue = this.configValue
        params.configType = this.configType
        params.bizType = this.bizType
        params.configMark = this.configMark
        params.configDes = this.configDes
        if (this.dialogFlag === 0) {
          api.addConfig(params).then((response) => {
            if (response.code == 'success') {
              params.id = response.data
              params.configStatus = 'cs_100'
              this.tableData.push(params)
              this.cancel()
              this.$message({type: 'success', message: '添加成功!'});
            } else {
              this.$message.error(response.message)
            }
          })
        } else if (this.dialogFlag === 1) {
          params.id = this.configId;
          api.updateConfig(params).then((response) => {
            if (response.code == 'success') {
              params.configStatus = this.configStatus
              this.tableData.splice(this.index, 1, params)
              this.cancel()
              this.$message({type: 'success', message: '修改成功!'});
            } else {
              this.$message.error(response.message)
            }
          })
        } else {
          this.$message.error("遇见怪兽了，啥都乱了~")
        }
      },

      cancel() {
        this.dialogVisible = false
        this.configCode = ''
        this.configName = ''
        this.configValue = ''
        this.configType = ''
        this.bizType = ''
        this.configMark = ''
        this.configDes = ''
      },

      ftCS(row, column, cellValue, index) {
        return ftConfigStatus(cellValue)
      },

      ftCM(row, column, cellValue, index) {
        return ftConfigMark(cellValue)
      },

      ftBT(row, column, cellValue, index) {
        return ftBizType(cellValue)
      },

      ftCT(row, column, cellValue, index) {
        return ftConfigType(cellValue)
      }
    }

  }
</script>

<style scoped>
  .el-container {
    padding: 3px 3% 0 3% !important;
    width: 100%;
  }
  .el-input {
    width: 140px;
    padding: 0;
  }
  .b-add {
    width: 95px !important;
    border-radius: 6px;
  }
  .el-label {
    display: inline-block;
    line-height: 50px;
  }
  .l {
    font-weight: 600;
    width: 80px;
    margin-left: 5px;
  }
  .r {
    width: 235px;
  }

</style>
