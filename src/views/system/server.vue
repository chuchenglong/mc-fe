<template>
  <div>
    <el-container>
      <el-table :data="tableData.filter(data => !search || data.serverUrl.toLowerCase().includes(search.toLowerCase()))" >
        <el-table-column width="220px" label="URI" prop="serverUrl"></el-table-column>
        <el-table-column width="160px" label="名称" prop="serverName"></el-table-column>
        <el-table-column width="150px" label="服务类型" prop="serverType" :formatter="ftServerType"></el-table-column>
        <el-table-column width="100px" label="业务类型" prop="bizType" :formatter="ftBizType"></el-table-column>
        <el-table-column width="100px" label="标签" prop="serverMark" :formatter="ftServerMark"></el-table-column>
        <el-table-column width="100px" label="状态" prop="serverStatus" :formatter="ftServerStatus"></el-table-column>
        <el-table-column min-width	="200px" label="描述" prop="serverDes"></el-table-column>
        <el-table-column width	="400px" align="right">
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
      <el-dialog title="新增服务信息" :close-on-click-modal="false" :visible.sync="addVisible">
        <el-form>
          <el-form-item label="URI">
            <el-input v-model="serverUrl"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="serverName"></el-input>
          </el-form-item>
          <el-form-item label="服务类型">
            <el-radio-group v-model="serverType">
              <el-radio v-for="st in serverTypes" :key="st.key" :label="st.key">{{st.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="业务类型">
            <el-radio-group v-model="bizType">
              <el-radio v-for="bt in bizTypes" :key="bt.key" :label="bt.key">{{bt.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签">
            <el-radio-group v-model="serverMark">
              <el-radio v-for="sm in serverMarks" :key="sm.key" :label="sm.key">{{sm.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="serverDes"></el-input>
          </el-form-item>
          <el-button @click="cancelAdd">取 消</el-button>
          <el-button type="primary" @click="addServerInfo">确 定</el-button>
        </el-form>
      </el-dialog>

      <el-dialog title="修改配置信息" :close-on-click-modal="false" :visible.sync="updateVisible">
        <el-form>
          <el-form-item label="URI">
            <label>{{serverUrlUpdate}}</label>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="serverNameUpdate"></el-input>
          </el-form-item>
          <el-form-item label="服务类型">
            <el-radio-group v-model="serverTypeUpdate">
              <el-radio v-for="st in serverTypes" :key="st.key" :label="st.key">{{st.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="业务类型">
            <el-radio-group v-model="bizTypeUpdate">
              <el-radio v-for="bt in bizTypes" :key="bt.key" :label="bt.key">{{bt.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签">
            <el-radio-group v-model="serverMarkUpdate">
              <el-radio v-for="sm in serverMarks" :key="sm.key" :label="sm.key">{{sm.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="serverDesUpdate" class="i-big"></el-input>
          </el-form-item>
          <el-button @click="cancelUpdate">取 消</el-button>
          <el-button type="primary" @click="updateServerInfo">确 定</el-button>
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
        serverUrlUpdate: '',
        serverNameUpdate: '',
        serverTypeUpdate: '',
        bizTypeUpdate: '',
        serverMarkUpdate: '',
        serverDesUpdate: '',
        index: -1,
        serverStatus: ''
      }
    },

    methods: {
      addServerInfo() {
        var params = {};
        params.serverUrl = this.serverUrl
        params.serverName = this.serverName
        params.serverType = this.serverType
        params.bizType = this.bizType
        params.serverMark = this.serverMark
        params.serverDes = this.serverDes
        api.addServer(params).then((response) => {
          if (response.code == 'success') {
            params.id = response.data
            params.serverStatus = 'ss_100'
            this.tableData.push(params)
            this.cancelAdd()
            this.$message({type: 'success', message: '添加成功!'});
          } else {
            this.$message.error(response.message)
          }
        })

      },
      updateServerInfo() {
        var params = {};
        params.id = this.serverId;
        params.serverUrl = this.serverUrlUpdate
        params.serverName = this.serverNameUpdate
        params.serverType = this.serverTypeUpdate
        params.bizType = this.bizTypeUpdate
        params.serverMark = this.serverMarkUpdate
        params.serverDes = this.serverDesUpdate
        api.updateServer(params).then((response) => {
          if (response.code == 'success') {
            params.serverStatus = this.serverStatus
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
        this.serverId = row.id
        this.index = index
        api.getServerDetail({id: row.id}).then((response) => {
          if (response.code == 'success') {
            this.serverUrlUpdate = response.data.serverUrl
            this.serverNameUpdate = response.data.serverName
            this.serverTypeUpdate = response.data.serverType
            this.bizTypeUpdate = response.data.bizType
            this.serverMarkUpdate = response.data.serverMark
            this.serverDesUpdate = response.data.serverDes
            this.serverStatus = response.data.serverStatus
          } else {
            this.$message.error(response.message)
          }
        })
      },
      cancelAdd() {
        this.addVisible = false
        this.updateVisible = false
        this.serverUrl = ''
        this.serverName = ''
        this.serverType = ''
        this.bizType = ''
        this.serverMark = ''
        this.serverDes = ''
      },
      cancelUpdate() {
        this.addVisible = false
        this.updateVisible = false
        this.serverUrlUpdate = ''
        this.serverNameUpdate = ''
        this.serverTypeUpdate = ''
        this.bizTypeUpdate = ''
        this.serverMarkUpdate = ''
        this.serverDesUpdate = ''
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
      ftServerStatus(row, column, cellValue, index) {
        if (cellValue == 'ss_100') {
          return '正常'
        } else if (cellValue == 'ss_101') {
          return '停用'
        } else {
          return ''
        }
      },
      ftServerMark(row, column, cellValue, index) {
        if (cellValue == 'sm_100')
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
      ftServerType(row, column, cellValue, index) {
        if (cellValue == 'st_100')
          return 'token类'
        else if (cellValue == 'st_101')
          return '无token类'
        else
          return ''
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
