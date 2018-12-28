<template>
  <div>
    <el-container>
      <el-table :data="tableData.filter(data => !search || data.serverUrl.toLowerCase().includes(search.toLowerCase()))" >
        <el-table-column width="160px" label="服务URI" prop="serverUrl"></el-table-column>
        <el-table-column width="160px" label="服务名称" prop="serverName"></el-table-column>
        <el-table-column width="100px" label="服务类型" prop="serverType" :formatter="ftST"></el-table-column>
        <el-table-column width="80px" label="业务类型" prop="bizType" :formatter="ftBT"></el-table-column>
        <el-table-column width="80px" label="标签" prop="serverMark" :formatter="ftSM"></el-table-column>
        <el-table-column width="50px" label="状态" prop="serverStatus" :formatter="ftSS"></el-table-column>
        <el-table-column width	="150px" label="描述" prop="serverDes"></el-table-column>
        <el-table-column min-width	="280px" align="right">
          <template slot="header" slot-scope="scope">
            <div><el-button icon="el-icon-plus" size="small" @click="handleAdd" class="b-add">添加服务</el-button></div>
            <el-input v-model="search" size="small " placeholder="输入URI搜索" prefix-icon="el-icon-search"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" @click="handleStop(scope.$index, scope.row)" icon="el-icon-circle-close-outline" v-if="scope.row.serverStatus == 'ss_100' ">停用</el-button>
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
            <label class="el-label l">服务URI：</label>
            <label class="el-label r"><el-input v-model="serverUrl" style="width: 200px"></el-input></label>
            <label class="el-label l">服务名称：</label>
            <label class="el-label r"><el-input v-model="serverName" style="width: 200px"></el-input></label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">服务类型：</label>
            <label class="el-label r">
              <el-radio-group v-model="serverType">
                <el-radio v-for="st in serverTypes" :key="st.key" :label="st.key">{{st.value}}</el-radio>
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
            <label class="el-label l">标签：</label>
            <label class="el-label r">
              <el-radio-group v-model="serverMark">
                <el-radio v-for="sm in serverMarks" :key="sm.key" :label="sm.key">{{sm.value}}</el-radio>
              </el-radio-group>
            </label>
            <label class="el-label l">描述：</label>
            <label class="el-label r"><el-input v-model="serverDes" style="width: 200px"></el-input></label>
          </el-form-item>
          <div style="text-align: center">
            <el-button size="medium" @click="cancel" style="width: 100px">取 消</el-button>
            <el-button size="medium" type="primary" @click="submitServer" style="width: 100px">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
  import api from '@/service/api'
  import {ftServerStatus, ftServerMark, ftBizType, ftServerType} from '@/util/format'

  export default {
    data() {
      return {
        tableData: [],
        search: '',
        dialogVisible: false,
        updateVisible: false,
        serverUrl: '',
        serverName: '',
        serverType: '',
        bizType: '',
        serverMark: '',
        serverDes: '',
        serverTypes: [],
        bizTypes: [],
        serverMarks: [],
        serverId: '',
        index: -1,
        serverStatus: '',
        dialogTitle: '',
        dialogFlag: 0
      }
    },
    mounted() {
      api.getServerList().then((response) => {
        if (response.code == 'success')
          this.tableData = response.data
        else
          this.$message.error(response.message)
      })

      api.getServerType().then((response) => {
        if (response.code == 'success')
          this.serverTypes = response.data
        else
          this.$message.error(response.message)
      })

      api.getBizType().then((response) => {
        if (response.code == 'success')
          this.bizTypes = response.data
        else
          this.$message.error(response.message)
      })

      api.getServerMark().then((response) => {
        if (response.code == 'success')
          this.serverMarks = response.data
        else
          this.$message.error(response.message)
      })

    },
    methods: {
      handleAdd() {
        this.dialogVisible = true
        this.dialogTitle = '新增服务信息'
        this.dialogFlag = 0
      },

      handleUpdate(index, row) {
        this.dialogVisible = true
        this.dialogTitle = '修改服务信息'
        this.dialogFlag = 1
        this.serverId = row.id
        this.index = index
        api.getServerDetail({id: row.id}).then((response) => {
          if (response.code == 'success') {
            this.serverUrl = response.data.serverUrl
            this.serverName = response.data.serverName
            this.serverType = response.data.serverType
            this.bizType = response.data.bizType
            this.serverMark = response.data.serverMark
            this.serverDes = response.data.serverDes
            this.serverStatus = response.data.serverStatus
          } else {
            this.$message.error(response.message)
          }
        })
      },

      handleDelete(index, row) {
        this.$confirm('此操作将删除该服务, 是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          var params = {};
          params.id = row.id
          api.deleteServer(params).then((response) => {
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
        this.$confirm('此操作将停用该服务, 是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          var params = {};
          params.id = row.id
          params.serverStatus = 'ss_101'
          api.updateServerStatus(params).then((response) => {
            if (response.code == 'success') {
              row.serverStatus = 'ss_101'
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
        params.serverStatus = 'ss_100'
        api.updateServerStatus(params).then((response) => {
          if (response.code == 'success') {
            row.serverStatus = 'ss_100'
            this.tableData.splice(index, 1, row)
            this.$message({type: 'success', message: '启用成功!'});
          } else {
            this.$message.error(response.message)
          }
        })
      },

      submitServer() {
        var params = {};
        params.serverUrl = this.serverUrl
        params.serverName = this.serverName
        params.serverType = this.serverType
        params.bizType = this.bizType
        params.serverMark = this.serverMark
        params.serverDes = this.serverDes
        if (this.dialogFlag === 0) {
          api.addServer(params).then((response) => {
            if (response.code == 'success') {
              params.id = response.data
              params.serverStatus = 'ss_100'
              this.tableData.push(params)
              this.cancel()
              this.$message({type: 'success', message: '添加成功!'});
            } else {
              this.$message.error(response.message)
            }
          })

        } else if (this.dialogFlag === 1) {
          params.id = this.serverId;
          api.updateServer(params).then((response) => {
            if (response.code == 'success') {
              params.serverStatus = this.serverStatus
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
        this.serverUrl = ''
        this.serverName = ''
        this.serverType = ''
        this.bizType = ''
        this.serverMark = ''
        this.serverDes = ''
      },

      ftSS(row, column, cellValue, index) {
        return ftServerStatus(cellValue)
      },

      ftSM(row, column, cellValue, index) {
        return ftServerMark(cellValue)
      },

      ftBT(row, column, cellValue, index) {
        return ftBizType(cellValue)
      },

      ftST(row, column, cellValue, index) {
        return ftServerType(cellValue)
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
