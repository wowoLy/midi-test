<template>
  <div id="app">
    <button class="btnAbsolute" @click="link">test</button>
    <button class="btnAbsolute2" @click="linkPiano">piano</button>
    <router-view/>
<!--    <div class="wrap">-->
<!--      <el-button-group class="button-Group">-->
<!--        <el-button type="primary" size="mini" @click="addLine">增加一行</el-button>-->
<!--        <el-button type="primary" size="mini">复制</el-button>-->
<!--        <el-button type="primary" size="mini">粘贴</el-button>-->
<!--        <el-button type="primary" size="mini">保存</el-button>-->
<!--      </el-button-group>-->
<!--      <el-table-->
<!--        :data="tableData"-->
<!--        border-->
<!--        style="width: 100%">-->
<!--        <el-table-column-->
<!--          label="旋律">-->
<!--          <el-table-column-->
<!--            label="合并">-->

<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            label="段开始">-->
<!--            <template slot-scope="scope">-->
<!--              <el-input-number :controls="false" size="mini" v-model="scope.row.start"></el-input-number>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            label="类型">-->
<!--            <template slot-scope="scope">-->
<!--              <el-select size="mini" v-model="scope.row.middle" placeholder="请选择">-->
<!--                <el-option value="&#45;&#45;"></el-option>-->
<!--              </el-select>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            label="段结束">-->
<!--            <template slot-scope="scope">-->
<!--              <el-input-number :controls="false" size="mini" v-model="scope.row.end"></el-input-number>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            label="分节">-->
<!--            <template slot-scope="scope">-->
<!--              <el-input-number :controls="false" size="mini" v-model="scope.row.region"></el-input-number>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="item2"-->
<!--            align="center"-->
<!--            label="区域">-->
<!--            <template slot-scope="scope">-->
<!--              <el-input size="mini" v-model="scope.row.item2"></el-input>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="partEnd"-->
<!--            width="80px"-->
<!--            align="center"-->
<!--            label="段结束">-->
<!--            <template slot-scope="scope">-->
<!--              <el-checkbox v-model="scope.row.partEnd"></el-checkbox>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            align="center"-->
<!--            label="操作">-->
<!--            <template slot-scope="scope">-->
<!--              <el-button type="text" size="small">试听</el-button>-->
<!--              <el-button type="text" size="small" @click="logSc(scope)">删除</el-button>-->
<!--              <el-button type="text" size="small">复制</el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </div>-->
<!--    <div class="drag-prent">-->
<!--      <div style="width: 100%;height: 100%;position: absolute" class="show-grid"></div>-->
<!--      <vue-draggable-resizable :w="width" :x="x" :y="y" :h="height" @dragging="onDrag" @resizing="onResize" :grid = '[1,1]' :parent="true">-->
<!--&lt;!&ndash;        <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>&ndash;&gt;-->
<!--&lt;!&ndash;          X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>&ndash;&gt;-->
<!--      </vue-draggable-resizable>-->
<!--    </div>-->
<!--    <el-input-number :controls="false" size="mini" v-model="x"></el-input-number>-->
<!--    <el-input-number :controls="false" size="mini" v-model="y"></el-input-number>-->
<!--    <el-input-number :controls="false" size="mini" v-model="width"></el-input-number>-->
<!--    <el-input-number :controls="false" size="mini" v-model="height"></el-input-number>-->
  </div>
</template>

<script>
    import VueDraggableResizable from 'vue-draggable-resizable'
    export default {
        name: 'App',
        data() {
            return{
                tableData:[{
                    ok:1
                },{
                    ok:1
                },{
                    ok:2
                },{
                    ok:2
                },{
                    ok:5
                }],
                rowSpan:[2,0,2,0,1],
                width: 100,
                height: 100,
                x: 0,
                y: 0
            }
        },
        created(){
          window.tableData=this.tableData;
        },
        methods:{
            link:function(){
                this.$router.push({path:'/test'})
            },
            linkPiano(){
                this.$router.push({path:'/piano'})
            },
            onResize: function (x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            },
            onDrag: function (x, y) {
                this.x = x;
                this.y = y;
            },
            addLine(){
                this.tableData.push({})
            },
            logSc(scope){
                console.log(scope.row);
            }
        }
    }
</script>

<style>
  html,body,#app{
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .btnAbsolute,.btnAbsolute2{
    position: fixed;
    right: 10px;
    top: 10px;
  }
  .btnAbsolute2{
    top: 40px;
  }
  .el-input__inner{
    padding: 0 5px!important;
    text-align: center;
  }
  .drag-prent{
    float: left;
    height: 500px;
    width: 500px;
    border: 1px solid red;
    position: relative;
    background-color: orange;
  }
  .show-grid{
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 5px 5px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 5px 5px;
  }
  .wrap{
    position: relative;
    width: 50%;
  }
  .button-Group{
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
  }
</style>
