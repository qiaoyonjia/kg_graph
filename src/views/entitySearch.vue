<template>
  <div class="container">
    <HeaderContent>
      <template #icon>
        <el-icon><Search /></el-icon>
      </template>

      <template #text> 实体查询 </template>
    </HeaderContent>
    <div class="content">
      <el-card class="input-box-card">
        <template #header>
          <div class="card-header">
            <span>查询条件:</span>
          </div>
        </template>
        <div class="search-box">
          <el-input v-model="textarea" placeholder="请输入实体名称" />
          <el-button
            type="primary"
            class="search-btn"
            size="large"
            @click="genGraphBtn"
            >查询</el-button
          >
        </div>
        <div v-if="showGraph">
          <div id="graph" style="width: 90%; height: 600px"></div>
          <el-table :data="tableDataRes" style="width: 90%">
            <el-table-column prop="entity1" label="Entity1" width="180" />
            <el-table-column prop="relation" label="Relation" width="180" />
            <el-table-column prop="entity2" label="Entity2" />
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup name="entityRecognition">
import HeaderContent from "../components/headerContent.vue";
import { ref, reactive } from "vue";
import { getEntity } from "../api/entity";
import { processInitialData } from "../utils/processData";
import * as echarts from "echarts";

let textarea = ref("");
let showGraph = ref(false);
let tableDataRes = reactive([]);

const genGraphBtn = async () => {
  showGraph.value = true;

  const res = await getEntity(textarea.value);
  var myChart = echarts.init(document.getElementById("graph"));
  const { data, links, tableData } = processInitialData(
    res.data,
    textarea.value
  );
  Object.assign(tableDataRes, tableData);
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
        symbolSize: 55,
        focusNodeAdjacency: true,
        roam: true,
        edgeSymbol: ["none", "arrow"],
        categories: [
          {
            name: "查询实体",
            itemStyle: {
              normal: {
                color: "#009800",
              },
            },
          },
          {
            name: "HudongItem",
            itemStyle: {
              normal: {
                color: "#4592FF",
              },
            },
          },
          {
            name: "NewNode",
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
          repulsion: 1000,
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
  }
}
</style>
