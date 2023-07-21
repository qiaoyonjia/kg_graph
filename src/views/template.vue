<template>
  <div class="container">
    <HeaderContent>
      <template #icon>
        <el-icon><Document /></el-icon>
      </template>

      <template #text> 问题模板 </template>
    </HeaderContent>
    <div class="content">
      <el-card class="input-box-card">
        <template #header>
          <div class="card-header">
            <span>问题模板列表:</span>
          </div>
        </template>
        <div>
          <el-collapse v-model="activeCollapse" accordion>
            <!-- 问题列表 -->
            <el-collapse-item
              v-for="(item, index) in questionsList"
              :key="index"
              :title="item.question"
            >
              <!-- 答案内容 -->
              <div class="answer" style="color: #409eff">{{ item.answer }}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup name="entityRecognition">
import HeaderContent from "../components/headerContent.vue";
import { ref } from "vue";
import { questionsList } from "../utils/questionsListTemplate";

const activeCollapse = ref(0); // 控制默认展开的折叠面板，默认展开第一个问题
</script>

<style scoped lang="less">
.container {
  width: 80%;
  margin: auto;

  .content {
    margin-top: 20px;
    margin-left: -10px;
  }
}
</style>
