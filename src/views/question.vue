<template>
  <div class="container">
    <HeaderContent>
      <template #icon>
        <el-icon><ChatRound /></el-icon>
      </template>

      <template #text> 核安全问答 </template>
    </HeaderContent>
    <div class="content">
      <el-card class="input-box-card">
        <template #header>
          <div class="card-header">
            <span>输入问题:</span>
          </div>
        </template>
        <div class="search-box">
          <el-input v-model="inputValue" placeholder="请输入问题" />
          <el-button
            type="primary"
            class="search-btn"
            size="large"
            @click="genGraphBtn"
            >提交</el-button
          >
        </div>
        <div style="margin-top: 10px">
          你可能想搜索：
          <el-button
            v-for="button in buttons"
            :key="button.text"
            :type="button.type"
            text
            @click="textBtn(button.text)"
            >{{ button.text }}</el-button
          >
          <router-link to="/template">
            <el-button
              style="float: right; margin-right: 20px"
              text
              @click="navToTemplate"
            >
              <el-icon><Link /></el-icon>
              模板
            </el-button></router-link
          >
        </div>
      </el-card>
      <div class="result-box" v-if="showGraph">
        <el-card class="res-box-card">
          <div class="card-header">
            <span>答案:</span>
            <el-divider />
            <el-row>
              <el-col v-for="(item, index) in dataList" :key="index" :span="24">
                <div class="data-item">
                  {{ item }}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="graph-box-card">
          <template #header>
            <div class="card-header">
              <span>图谱演示:</span>
              <el-divider />
              <div id="graph" style="height: 600px"></div>
            </div>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup name="entityRecognition">
import HeaderContent from "../components/headerContent.vue";
import { ref, reactive } from "vue";
import { processQuestionData } from "../utils/processData";
import * as echarts from "echarts";
import { getQuestionResult } from "../api/question";

let inputValue = ref("");
let dataList = reactive([]);
let showGraph = ref(false);

const buttons = [
  { type: "primary", text: "对于申领《放射工作人员证》的人员有什么要求？" },
  { type: "primary", text: "核壳层模型有什么应用？" },
  { type: "primary", text: "粒子加速器分类为" },
];

const textBtn = (text) => {
  inputValue.value = text;
};

const genGraphBtn = async () => {
  showGraph.value = true;
  const res = await getQuestionResult(inputValue.value);
  const { answer, list } = res.data;

  const { data, links } = processQuestionData(list);

  var myChart = echarts.init(document.getElementById("graph"));

  Object.assign(dataList, answer);
  let option = {
    title: {
      text: "",
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: "quinticInOut",
    label: {
      normal: {
        show: true,
        textStyle: {
          fontSize: 10,
        },
      },
    },
    legend: {
      x: "center",
      show: false,
    },
    series: [
      {
        type: "graph",
        layout: "force",
        symbolSize: 60, // 节点的大小
        focusNodeAdjacency: true,
        roam: true,
        edgeSymbol: ["none", "arrow"],
        categories: [
          {
            name: "对象",
            itemStyle: {
              normal: {
                color: "#4592FF",
              },
            },
          },
          {
            name: "内容",
            itemStyle: {
              normal: {
                color: "#C71585",
              },
            },
          },
        ],
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 10,
            },
          },
        },
        force: {
          repulsion: 2000, // 值越大节点之间的间距越大
        },
        edgeSymbolSize: [4, 50],
        edgeLabel: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 10,
            },
            formatter: "{c}",
          },
        },
        data: data,
        links: links,
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 1.3,
            curveness: 0,
            color: "#262626",
          },
        },
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
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
    }

    .search-btn {
      width: 100px;
      margin-left: 10px;
    }

    .result-box {
      display: flex;
      margin-top: 30px;

      .res-box-card {
        width: 30%;
        margin-right: 30px;

        .data-item {
          display: flex;
          align-items: center;
          font-size: 16px;
          color: #797979;
          margin-top: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #dddddd;
        }
      }

      .graph-box-card {
        flex: 1;
      }
    }
  }
}
</style>
