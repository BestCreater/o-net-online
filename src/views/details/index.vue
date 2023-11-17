<template>
  <div class="content">
    <div class="header">
      <div class="header-content" v-if="dataList.onetsocCode">
        <h1>
          <span>{{ dataList.title }}</span>
        </h1>
        <h2>
          <span>{{ dataList.onetsocCode }}</span>
        </h2>
      </div>
      <div class="no-data" v-if="noData">
        <h1>
          <span>Page Not Found</span>
        </h1>
        <span>We're sorry, the requested page could not be found.</span>
        <span>Please try the following:</span>
        <ul>
          <li style="list-style: disc">
            If you typed the page address in the Address or Location bar, make
            sure that it is spelled correctly.
          </li>
        </ul>
      </div>
      <div class="search">
        <el-select
          v-model="searchKeyword"
          :multiple="false"
          filterable
          remote
          @change="toRoute"
          reserve-keyword
          placeholder="Please enter a keyword"
          :remote-method="handleSearch"
        >
          <el-option
            v-for="item in options"
            :key="item.title"
            :label="item.title"
            :value="item.onetsocCode"
          />
        </el-select>
        <el-button type="primary">Search</el-button>
      </div>
    </div>

    <div class="main" v-if="dataList.onetsocCode">
      <div class="main-header">
        <el-menu
          default-active="details"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item
            index="summary"
            @click="router.push('/summary/' + dataList.onetsocCode)"
            >Summary</el-menu-item
          >
          <el-menu-item index="details">Details</el-menu-item>
        </el-menu>
      </div>
      <div class="content-pop">
        <el-popover
          placement="bottom"
          title="Title"
          :width="200"
          trigger="click"
        >
          <span>this is content, this is content, this is content</span>
          <template #reference>
            <el-button type="primary" color="#048" :icon="Reading"
              >Contents
              <el-icon class="el-icon--right"><ArrowDownBold /></el-icon>
            </el-button>
          </template>
        </el-popover>
      </div>

      <div class="group occupation-info">
        <h2 class="group-header occupation-info">
          Occupation-Specific Information
        </h2>

        <div class="group-content">
          <div class="tasks">
            <h1>Tasks</h1>
            <el-table
              v-if="dataList.taskList[0].dataValue"
              :data="dataList.taskList"
              :default-sort="{ prop: 'date', order: 'descending' }"
              style="width: 100%"
            >
              <el-table-column prop="importance" label="Importance" sortable>
                <template #default="scope">
                  <span
                    style="display: flex; color: #004488; font-weight: bold"
                  >
                    {{ scope.row.importance
                    }}<el-progress
                      :percentage="scope.row.importance"
                      :show-text="false"
                      :stroke-width="8"
                      :color="'#048'"
                  /></span>
                </template>
              </el-table-column>

              <el-table-column
                prop="taskType"
                label="Category"
                sortable
                width="180"
              />
              <el-table-column prop="task" label="Task" sortable />
            </el-table>
            <ul v-if="!dataList.taskList[0].dataValue">
              <li>
                <div
                  class="group-content-li"
                  v-for="item in dataList.taskList"
                  :key="item"
                >
                  <div>
                    <el-icon><CirclePlus /></el-icon>
                  </div>
                  <div class="group-content-text">
                    <span>{{ item.task }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="technology-skills">
            <h1>Technology Skills</h1>
            <ul>
              <li>
                <div
                  class="group-content-li"
                  v-for="item in dataList.technologySkillsList"
                  :key="item"
                >
                  <div>
                    <el-icon><CirclePlus /></el-icon>
                  </div>
                  <div class="group-content-text">
                    <b>{{ item.commodityTitle }}</b> —
                    <span v-for="(ex, idx) in item.exampleList" :key="ex"
                      >{{ ex
                      }}{{
                        idx === item.exampleList.length - 1 ? "" : "; "
                      }}</span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="tools-used">
            <h1>Tools Used</h1>
            <ul>
              <li>
                <div
                  class="group-content-li"
                  v-for="item in dataList.toolsUsedList"
                  :key="item"
                >
                  <div>
                    <el-icon><CirclePlus /></el-icon>
                  </div>
                  <div class="group-content-text">
                    <b>{{ item.commodityTitle }}</b>
                    <span v-if="item.example != item.commodityTitle">
                      — {{ item.example }}</span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class="group occupational-requirements"
        v-if="
          dataList.workActivitiesList.length > 0 ||
          dataList.detailedWorkActivitiesList.length > 0
        "
      >
        <h2 class="group-header occupational-requirements">
          Occupational Requirements
        </h2>

        <div class="group-content">
          <div
            class="work-activities"
            v-if="dataList.workActivitiesList.length > 0"
          >
            <h1>Work Activities</h1>
            <el-table
              :data="dataList.workActivitiesList"
              :default-sort="{ prop: 'date', order: 'descending' }"
              style="width: 100%"
            >
              <!-- <el-table-column
                prop="taskType"
                label="Category"
                sortable
                width="180"
              /> -->
              <el-table-column prop="importance" label="Importance" sortable>
                <template #default="scope">
                  <span
                    style="display: flex; color: #004488; font-weight: bold"
                  >
                    {{ scope.row.importance
                    }}<el-progress
                      :percentage="scope.row.importance"
                      :show-text="false"
                      :stroke-width="8"
                      :color="'#048'"
                  /></span>
                </template>
              </el-table-column>
              <el-table-column label="Work Activity" sortable>
                <template #default="scope">
                  <div style="align-items: center">
                    <b>{{ scope.row.elementName }}</b>
                    <span> — {{ scope.row.description }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div
            class="detailed-work-activities"
            v-if="dataList.detailedWorkActivitiesList.length > 0"
          >
            <h1>Detailed Work Activities</h1>
            <ul>
              <li>
                <div
                  class="group-content-li"
                  v-for="item in dataList.detailedWorkActivitiesList"
                  :key="item"
                >
                  <div>
                    <el-icon><CirclePlus /></el-icon>
                  </div>
                  <div class="group-content-text">
                    <span>{{ item.dwaTitle }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="group experience-requirements">
        <h2 class="group-header experience-requirements">
          Experience Requirements
        </h2>

        <div class="group-content">
          <div class="job-zone">
            <h1>Job Zone</h1>
            <el-descriptions :column="1">
              <el-descriptions-item label="Title" width="200">{{
                dataList.jobZones.name
              }}</el-descriptions-item>
              <el-descriptions-item label="Education">{{
                dataList.jobZones.education
              }}</el-descriptions-item>
              <el-descriptions-item label="Related Experience">{{
                dataList.jobZones.experience
              }}</el-descriptions-item>
              <el-descriptions-item label="Job Training">
                {{ dataList.jobZones.jobTraining }}
              </el-descriptions-item>
              <el-descriptions-item label="Job Zone Examples">
                {{ dataList.jobZones.examples }}</el-descriptions-item
              >
              <el-descriptions-item label="SVP Range">
                {{ dataList.jobZones.svpRange }}</el-descriptions-item
              >
            </el-descriptions>
          </div>
        </div>
      </div>

      <div class="group more-information">
        <h2 class="group-header more-information">More Information</h2>

        <div class="group-content">
          <div class="related-occupations">
            <h1>Related Occupations</h1>
            <div v-if="dataList.relatedOccupationsListGroupData.Primary">
              <ul>
                <li
                  v-for="item in dataList.relatedOccupationsListGroupData
                    .Primary"
                  :key="item"
                >
                  <div class="group-content-li">
                    <div class="group-content-text">
                      <span>{{ item.relatedOnetsocCode }}</span>
                      <span style="margin-left: 15px"
                        ><a :href="'/summary/' + item.relatedOnetsocCode">{{
                          item.title
                        }}</a></span
                      >
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-if="dataList.relatedOccupationsListGroupData.Supplemental"
              style="margin-top: 10px"
            >
              <h3>Supplemental related occupations</h3>
              <ul>
                <li
                  v-for="item in dataList.relatedOccupationsListGroupData
                    .Supplemental"
                  :key="item"
                >
                  <div class="group-content-li">
                    <div class="group-content-text">
                      <span>{{ item.relatedOnetsocCode }}</span>
                      <span
                        ><a :href="'/summary/' + item.relatedOnetsocCode">{{
                          item.title
                        }}</a></span
                      >
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

import { Search } from "@element-plus/icons-vue";
import { ArrowDownBold, Reading, CirclePlus } from "@element-plus/icons-vue";
import { ref } from "vue";
import { getDetailsInfo } from "@/api/details";
import { searchByName } from "@/api/summary";

const route = useRoute();
const router = useRouter();

const options = ref([]);
const searchKeyword = ref();
const dataList = ref({});
const noData = ref(false);
const onetsocCode = ref("15-1241.00");
if (route.params.onetsocCode) {
  onetsocCode.value = route.params.onetsocCode;
}
function getDetailsData() {
  const onetsocCodeParam = { onetsocCode: onetsocCode.value };
  getDetailsInfo(onetsocCodeParam)
    .then((response) => {
      console.log(response);
      dataList.value = response.data;
      if (!dataList.value.onetsocCode) noData.value = true;
    })
    .catch((err) => {});
}

function handleSearch(keyword) {
  if (!keyword || keyword.length < 3) {
    options.value = [];
    return;
  }
  const params = { keyword: keyword };
  searchByName(params)
    .then((res) => {
      console.log(res);
      options.value = res.data;
    })
    .catch((err) => {});
}

function toRoute() {
  console.log(searchKeyword.value);
  if (searchKeyword.value) {
    router.push("/summary/" + searchKeyword.value);
  }
}

getDetailsData();
</script>

<style lang='scss' scoped>
.el-progress {
  width: 4rem;
  margin-left: 10px;
}
.content {
  .no-data {
    span {
      display: block;
      margin-top: 20px;
    }
    ul {
      margin-top: 20px;
      margin-left: 20px;
    }
  }
  .header {
    display: flex;
    margin: 0 auto;
    padding: 2rem;
    max-width: 1100px;

    // text-align: center;

    .search {
      width: 30%;
      height: 100%;
      display: flex;
      text-align: center;
      margin-left: auto;
      padding: 2rem;
    }
  }
  .main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
    .main-header {
    }
    .content-pop {
      margin-top: 30px;
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 1020;
    }
    .group {
      border: solid 5px #d9d9d9;
      border-top: none;
      border-right: none;
      border-bottom: none;
      padding-left: 2em;
      margin-top: 50px;

      &.occupation-info {
        border-left: solid 5px #9ec1cc !important;
      }
      &.occupational-requirements {
        border-left: solid 5px #c5aacd !important;
      }
      &.experience-requirements {
        border-left: solid 5px #d0ceaf !important;
      }
      &.more-information {
        border-left: solid 5px #a4bfad !important;
      }
      .group-header {
        &.occupation-info {
          color: #116480;
        }
        &.occupational-requirements {
          color: #6f2c83;
        }
      }
      .group-content {
        h1 {
          margin-top: 40px;
          color: #004488;
        }
        ul {
          margin-top: 10px;
        }
        .group-content-li {
          display: flex;
          margin-top: 5px;
        }
        .group-content-text {
          margin-left: 10px;
        }
        .job-zone {
          :deep(.el-descriptions__label) {
            width: 25%;
            color: #000;
            font-weight: bold;
            text-align: end;
            display: inline-block;
          }
          :deep(.el-descriptions__content) {
            width: 70%;
            display: inline-block;

            // color: #000;
            // font-weight: bold;
            // display: inline-block;
            // text-align: end;
          }
        }
        .related-occupations {
          h1,
          h2,
          h3,
          h4 {
            color: #004488;
          }
          ul {
            align-items: center;
          }
          li {
            // list-style: disc;
            // list-style-position: inside;
            display: flex;
          }
          li::before {
            content: "";
            width: 6px;
            height: 6px;
            background-color: black;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>