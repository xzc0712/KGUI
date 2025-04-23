<!--<template>-->
<!--  <el-dialog-->
<!--    title="Cypher"-->
<!--    :visible.sync="dialogVisible"-->
<!--    width="70%"-->
<!--    customClass="flowHelp"-->
<!--  >-->
<!--    <el-tabs tab-position="left">-->
<!--      <el-tab-pane label="请输入Cypher语句">-->
<!--        <el-input-->
<!--          type="textarea"-->
<!--          :autosize="{ minRows:1, maxRows: 4}"-->
<!--          placeholder="请输入内容"-->
<!--          v-model="textarea2"-->
<!--        style="width: 500px;margin-left: 50px">-->
<!--        </el-input>-->
<!--        <el-button type="primary" plain style="margin-left: 20px" @click="executeCypherQuery">查询</el-button>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="结果显示">-->

<!--      </el-tab-pane>-->

<!--    </el-tabs>-->
<!--  </el-dialog>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      dialogVisible: false,-->
<!--      textarea2: '',-->
<!--      queryResult: '' // 用于存储查询结果-->
<!--    };-->
<!--  },-->
<!--  components: {},-->
<!--  methods: {-->
<!--    async executeCypherQuery() {-->
<!--      const cypherQuery = this.textarea2;-->
<!--      try {-->
<!--        // 发送Cypher查询请求到后端-->
<!--        const response = await axios.post('/executeCypherQuery', { cypherQuery });-->
<!--        if (response.status === 200) {-->
<!--          this.queryResult = response.data.result; // 假设后端返回查询结果-->
<!--        } else {-->
<!--          this.queryResult = '<p>查询失败</p>';-->
<!--        }-->
<!--      } catch (error) {-->
<!--        console.error('查询失败:', error);-->
<!--        this.queryResult = '<p>查询失败</p>';-->
<!--      }-->
<!--    },-->
<!--    init() {-->
<!--      this.dialogVisible = true;-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--.flowHelp {-->
<!--  height: 80%;-->
<!--}-->
<!--</style>-->
<template>
  <el-dialog
    title="差异性分析"
    :visible.sync="dialogVisible"
    width="80%"
    customClass="flowHelp"

    style="text-align: center; margin: 0 auto;"
  >
    <div class="centered-content" >
      <div>
        <label for="file1" style="font-family: '微软雅黑';">处理文件地址：</label>
        <input type="text" id="file1" v-model="file1Path" style="width: 350px;height: 30px;" />
      </div>
      <div>
        <label for="file2">文件生成地址：</label>
        <input type="text" id="file2" v-model="file2Path" style="margin-top: 20px;width: 350px;height: 30px" />
      </div>
      <el-row style="margin-top: 20px;">
        <el-button type="primary" @click="processFiles">文件处理</el-button>
      </el-row>

    </div>
    <div id="outputContainer" class="output-container">
      <textarea v-model="outputData" class="output-textarea"></textarea>
    </div>
  </el-dialog>
</template>

<script>
import { kgBuilderApi } from "@/api";
import axios from 'axios';
export default {
  data() {
    return {
      file1Path: '',
      file2Path: '',
      outputData: '',
      dialogVisible: false,
      form:{
        name:"",
        type:"0",
        desc:"",
        email:""
      }
    };
  },
  created() {
    this.$axios = axios; // 设置 $axios
  },
  components: {},
  methods: {
    processFiles() {
      const requestData = {
        arg1: this.file1Path,
        arg2: this.file2Path
      };

      this.$axios.post('http://localhost:8080/handle-python', requestData)
        .then((response) => {
          this.outputData = response.data;
          //this.renderOutput(this.outputData);

        })
        .catch((error) => {
          console.error(error);
        });
    },
    init() {
      this.dialogVisible = true;
    },
    onSubmit(){
      let data = this.form;
      kgBuilderApi.feedBack(data).then(result => {
        if (result.code == 200) {
          this.dialogVisible=false;
          this.$message({
            message: "操作成功",
            type: "success"
          });
        }
      });
    }
    // ,
    // renderOutput(output) {
    //   const container = document.getElementById('outputContainer');
    //
    //   container.innerHTML = '';
    //
    //   const pre = document.createElement('pre');
    //   pre.textContent = output;
    //
    //   container.appendChild(pre);
    // }
  }
};
</script>

<style>
.flowHelp {
  height: 80%;
  background: #f7f9fc;
}
.centered-content {
  display: flex;
  flex-direction: column; /* 纵向排列 */
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  text-align: center; /* 文本内容居中 */
  height: 100%; /* 让内容占满整个容器高度 */

}

.output-container {
  text-align: center;
  margin-top: 20px; /* 调整上边距，根据实际情况调整 */

  width: 100%;
}

.output-textarea {
  width: 90%; /* 设置输出框宽度 */
  height: 380px; /* 设置输出框高度 */
  margin-bottom: 0;
}

</style>

<!--<template>-->
<!--  <div>-->
<!--    <input v-model="arg1" placeholder="Argument 1" />-->
<!--    <input v-model="arg2" placeholder="Argument 2" />-->
<!--    <button @click="executePython">Run Python</button>-->
<!--    <div v-if="output !== null">-->
<!--      <p>Python Script Output:</p>-->
<!--      <pre>{{ output }}</pre>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      arg1: '',-->
<!--      arg2: '',-->
<!--      output: null,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    async executePython() {-->
<!--      try {-->
<!--        const response = await fetch('http://localhost:8081/run-python', {-->
<!--          method: 'POST',-->
<!--          headers: {-->
<!--            'Content-Type': 'application/json',-->
<!--          },-->
<!--          body: JSON.stringify({-->
<!--            arg1: this.arg1,-->
<!--            arg2: this.arg2,-->
<!--          }),-->
<!--        });-->
<!--        const data = await response.text();-->
<!--        this.output = data;-->
<!--      } catch (error) {-->
<!--        console.error('Error:', error);-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--/* Add your CSS styles here */-->
<!--</style>-->




