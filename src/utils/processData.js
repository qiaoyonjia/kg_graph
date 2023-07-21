// 导入 G6 库
import G6 from "@antv/g6";

// 处理后端返回的数据，并转换成 G6 能够识别的图数据格式
export const processInitialData = (entityRelation, word) => {
  let data = [];
  let links = [];
  var node = {};
  //实体１
  node["name"] = word;
  //alert(document.getElementById('user_text').value)
  node["draggable"] = true;
  var id = 0;
  node["id"] = id.toString();
  data.push(node);

  //获取实体２，存储在data中，如果实体2已经存在于data中，则不push
  var maxDisPlayNode = 10; // 最多显示10个

  for (var i = 0; i < Math.min(maxDisPlayNode, entityRelation.length); i++) {
    node = {};
    node["name"] = entityRelation[i].entity2.name.substring(0, 15);
    node["draggable"] = true;
    id = i + 1;
    node["id"] = id.toString();
    var flag = 1;
    let relationTarget = id.toString();
    for (var j = 0; j < data.length; j++) {
      if (data[j]["name"] === node["name"]) {
        flag = 0;
        relationTarget = data[j]["id"];
        break;
      }
    }
    let relation = {};
    relation["source"] = 0;
    relation["target"] = relationTarget;
    relation["category"] = 0;

    if (flag === 1) {
      data.push(node);
      relation["value"] = entityRelation[i].rel.type;
      relation["symbolSize"] = 10;
      links.push(relation);
    } else {
      maxDisPlayNode += 1;
      for (var j = 0; j < links.length; j++) {
        if (links[j]["target"] === relationTarget) {
          links[j]["value"] =
            links[j]["value"] + " | " + entityRelation[j].rel.type;
          break;
        }
      }
    }
  }

  //用表格列出所有的关系
  let tableData = [];
  for (var j = 0; j < entityRelation.length; j++) {
    let relationData = {};
    relationData["entity1"] = word;
    relationData["relation"] = entityRelation[j].rel.type;
    relationData["entity2"] = entityRelation[j].entity2.name;
    tableData.push(relationData);
  }

  return {
    data,
    links,
    tableData,
  };
};

export const processQuestionData = (list) => {
  var data = [];
  var links = [];

  //构造数据
  var id = 0;
  for (var i = 0; i < list.length; i++) {
    let node1 = {};

    let entity1 = list[i].entity1;
    node1["name"] = entity1;
    node1["draggable"] = true;
    if (list[i].entity1_type === "对象") {
      node1["category"] = 0;
    } else if (list[i].entity1_type === "内容") {
      node1["category"] = 1;
    }

    let nodeId = id.toString();
    var flag = 1;
    for (var j = 0; j < data.length; j++) {
      if (data[j].name === node1["name"]) {
        flag = 0;
        nodeId = data[j].id;
        break;
      }
    }

    node1["id"] = nodeId;
    if (flag === 1) {
      id++;
      data.push(node1);
    }

    let node2 = {};
    node2["name"] = list[i].entity2;
    node2["draggable"] = true;
    if (list[i].entity2_type === "对象") {
      node2["category"] = 0;
    } else if (list[i].entity2_type === "内容") {
      node2["category"] = 1;
    }

    nodeId = id.toString();

    var flag = 1;
    for (var j = 0; j < data.length; j++) {
      if (data[j].name === node2["name"]) {
        flag = 0;
        nodeId = data[j]["id"];
        break;
      }
    }

    node2["id"] = nodeId;
    if (flag === 1) {
      id++;
      data.push(node2);
    }

    //  relation
    let relation = {};
    relation["source"] = node1["id"];
    relation["target"] = node2["id"];
    relation["category"] = 0;

    var flag = 1;
    for (var j = 0; j < links.length; j++) {
      if (
        links[j]["source"] === relation["source"] &&
        links[j]["target"] === relation["target"]
      ) {
        flag = 0;
        break;
      }
    }
    if (flag === 1) {
      relation["value"] = list[i].rel;
      relation["symbolSize"] = 10;
      links.push(relation);
    }
  }

  return { data, links };
};
