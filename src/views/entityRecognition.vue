<template>
  <div class="container">
    <HeaderContent>
      <template #icon>
        <el-icon><Odometer /></el-icon>
      </template>

      <template #text> 实体识别 </template>
    </HeaderContent>
    <div class="content">
      <el-card class="input-box-card">
        <template #header>
          <div class="card-header">
            <span>输入文本:</span>
          </div>
        </template>
        <el-input
          v-model="textarea"
          :autosize="{ minRows: 8, maxRows: 20 }"
          type="textarea"
          class="card-input"
        />
        <div style="text-align: center">
          <el-button
            type="primary"
            size="large"
            class="card-button"
            @click="submitTextBtn"
            :loading="isLoading"
            >提交！</el-button
          >
          <el-button
            type="primary"
            size="large"
            class="card-button"
            @click="clearTextBtn"
            >清空文本</el-button
          >
        </div>
      </el-card>
      <el-button link type="primary" class="res-btn" @click="isShowRes"
        >[识别结果]</el-button
      >
      <el-card class="res-box-card" v-if="isShow">
        <div v-if="result.length === 0">
          <span style="font-size: 14px; color: #409eff">
            抱歉，输入的文本中无核安全相关实体
          </span>
        </div>
        <div v-else>
          <div v-for="(item, index) in result" :key="index">
            <el-link
              type="primary"
              style="margin-bottom: 10px"
              :href="item.url"
              target="_blank"
              title="点击跳转至百度百科查看详情"
              >{{ item.name }} : {{ item.explain }} ({{
                item.detailExplain
              }})</el-link
            >
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup name="entityRecognition">
import HeaderContent from "../components/headerContent.vue";
import { reactive, ref } from "vue";
import { getEntityData } from "../api/entity";

let textarea = ref("");
let result = ref([]);
let isShow = ref(false);
const isLoading = ref(false); // loading加载

// 控制是否显示答案
const isShowRes = () => {
  isShow.value = !isShow.value;
};

// 提交按钮
const submitTextBtn = async () => {
  isLoading.value = true;

  // 调用后端接口,对输入的文本进行分词,实体识别
  const res = await getEntityData(textarea.value);

  // 对返回的数据中相同name的数据进行过滤
  const filteredData = res.data.filter((item, index, arr) => {
    return arr.findIndex((otherItem) => otherItem.name === item.name) === index;
  });
  // console.log(filteredData);
  result.value = filteredData;

  isLoading.value = false;
  isShow.value = true; // 显示识别结果

  // textarea.value = ""; // 清空输入框，好像有些不合理，暂时先不清除
};

// 清空输入框文本
const clearTextBtn = () => {
  textarea.value = "";
  result.value = [];
  isShow.value = false;
};
</script>

<style scoped lang="less">
.container {
  width: 80%;
  margin: auto;

  .content {
    margin-top: 20px;
    margin-left: -10px;
    // text-align: center;

    .input-box-card {
      .card-input input {
        color: #8e8e93;
        font-size: 30px;
      }

      .card-button {
        margin-top: 20px;
        width: 300px;
        display: inline-block;
      }
    }

    .res-btn {
      margin-top: 40px;
      font-size: 16px;
    }

    .res-box-card {
      margin-top: 10px;
    }
  }
}
</style>
