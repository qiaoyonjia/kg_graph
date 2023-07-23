<template>
  <div class="container">
    <HeaderContent>
      <template #icon>
        <el-icon><Search /></el-icon>
      </template>

      <template #text> 核安全案例分析 </template>
    </HeaderContent>
    <div class="content">
      <el-card class="input-box-card">
        <template #header>
          <div class="card-header">
            <span>请输入你的问题:</span>
          </div>
        </template>
        <div class="search-box">
          <el-input
            v-model="text"
            placeholder="提出你的想法"
            style="height: 50px"
            @keyup.enter="btnClick"
          />
          <el-button
            type="primary"
            :icon="Search"
            circle
            size="large"
            class="submit-button"
            @click="btnClick"
          />
        </div>
      </el-card>
      <el-card class="input-box-card2">
        <div
          v-for="(item, index) in answerLists"
          :key="index"
          style="margin-bottom: 20px"
        >
          <el-card>
            <div
              style="display: flex; align-items: center; margin-bottom: 20px"
            >
              <el-button type="primary" :icon="Avatar" circle />
              <span style="margin-left: 10px">{{ item.question }}</span>
            </div>
            {{ item.answer }}
          </el-card>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup name="entityRecognition">
import HeaderContent from "../components/headerContent.vue";
import { Search, Avatar } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import { getChatGLMRes } from "../api/chatGLM";

let text = ref("");
let answerLists = reactive([]);

const btnClick = async () => {
  const result = await getChatGLMRes(text.value);
  let pushData = {
    answer: result.data,
    question: text.value,
  };
  answerLists.unshift(pushData);
  text.value = "";
};
</script>

<style scoped lang="less">
.container {
  width: 80%;
  margin: auto;

  .content {
    margin-top: 20px;
    margin-left: -10px;

    .search-box {
      display: flex;
      justify-content: center;
      align-items: center;

      .submit-button {
        margin-left: 20px;
      }
    }

    .input-box-card2 {
      overflow-y: auto; /* 显示垂直滚动条 */

      padding-bottom: 20px;
      margin-top: 20px;
      height: 400px;
    }
  }
}
</style>
