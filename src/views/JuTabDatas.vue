<template>
  <div class>
    <filter-tab @inputSearch="inputSearch" />
    <table class="table table-bordered dataTable table-sm table-striped">
      <thead>
        <tr>
          <th
            class="th-sm sorting"
            v-for="(field, index) in fields"
            :key="index"
            @click="sort(field.name)"
          >
            {{ field.label }}
            <i class="fas fa-sort float-right"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in datas" :key="index">
          <td>{{ userName(data) }}</td>
          <td v-html="status(data)"></td>
          <td>{{ birthdate(data) | formatDate }}</td>
          <td>{{ phone(data) }}</td>
          <td>{{ contactChannel(data) }}</td>
          <td>{{ assignTo(data) }}</td>
          <td>
            <p class="comment-1" v-readMore:150="comment(data)"></p>
          </td>
          <td>{{ dateCreation(data) | formatDate2 }}</td>
          <td>{{ dueDate(data) | formatDate2 }}</td>
          <td v-html="attachments(data)"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ReadMore from "vue-read-more";
import Vue from "vue";
import _ from "lodash";
import "bootstrap-css-only/css/bootstrap.min.css";
import json from "../assets/MOCK_DATA.json";
import moment from "moment-timezone";
import FilterTab from "@/components/FilterTab";

Vue.use(ReadMore);

export default {
  name: "JuTabDatas",
  components: {
    FilterTab
  },
  data() {
    return {
      json,
      datas: json,
      fields: [
        {
          name: "first_name",
          label: "user"
        },
        {
          name: "status",
          label: "status"
        },
        {
          name: "birthday",
          label: "né le"
        },
        {
          name: "phone",
          label: "tel"
        },
        {
          name: "contact_channel",
          label: "contact channel"
        },
        {
          name: "assignedTO",
          label: "à"
        },
        {
          name: "last_comment",
          label: "commentaire"
        },
        {
          name: "interaction_creation_date",
          label: "date de création"
        },
        {
          name: "due_date",
          label: "date d'échéance"
        },
        {
          name: "attachments",
          label: "PJ"
        }
      ]
    };
  },
  computed: {
    birthdate() {
      return data => {
        return _.get(data, "customer.birthday", "null");
      };
    },
    phone() {
      return data => {
        return _.get(data, "customer.phone", "null");
      };
    },
    contactChannel() {
      return data => {
        return _.get(data, "contact_channel", "null");
      };
    },
    assignTo() {
      return data => {
        return _.get(data, "assignedTO", "null");
      };
    },
    comment() {
      return data => {
        return _.get(data, "last_comment", "null");
      };
    },
    dateCreation() {
      return data => {
        return _.get(data, "interaction_creation_date", "null");
      };
    },
    dueDate() {
      return data => {
        return _.get(data, "due_date", "null");
      };
    },
    attachments() {
      return data => {
        return `<a href="${_.get(
          data,
          "attachments",
          "null"
        )}" class="waves-effect mdb-icon-copy far fa-file"></a>`;
      };
    }
  },
  filters: {
    allcap(value) {
      return value.toUpperCase();
    },
    formatDate(value) {
      return value == null ? "" : moment(value).format("D MMM YYYY");
    },
    formatDate2(value) {
      return value == null ? "" : moment(value).format("d/MM/Y, H:MM");
    }
  },
  methods: {
    userName(data) {
      return (
        _.get(data, "customer.first_name", "null") +
        " " +
        _.get(data, "customer.last_name", "null")
      );
    },
    status(data) {
      let status = _.get(data, "status", "null");
      let statusClass;
      let iconStatus = "";

      switch (status) {
        case "waiting":
          statusClass = "waiting";
          iconStatus = "waves-effect mdb-icon-copy far fa-clock";
          break;
        case "reserved":
          statusClass = "reserved";
          break;
        case "inProgress":
          statusClass = "inProgress";
          break;
      }

      status =
        `<span class="status status--${statusClass} ${iconStatus}"> ` +
        status +
        `</span>`;

      return status;
    },
    sort(property) {
      this.json.sort(this.dynamicSort(property));
    },
    dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }

      let listUserKeys = ["first_name", "birthday", "phone", "email", "phone"];

      if (listUserKeys.includes(property)) {
        return function(a, b) {
          if (sortOrder == -1) {
            return b["customer"][property].localeCompare(
              a["customer"][property]
            );
          } else {
            return a["customer"][property].localeCompare(
              b["customer"][property]
            );
          }
        };
      } else {
        return function(a, b) {
          if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
          } else {
            return a[property].localeCompare(b[property]);
          }
        };
      }
    },
    inputSearch({ value }) {
      if (value === "") {
        this.datas = this.json;
        return;
      }

      var filterKey = value && value.toLowerCase();
      this.datas = this.datas.filter(function(row) {
        return Object.keys(row).some(function(key) {
          return (
            String(row[key])
              .toLowerCase()
              .indexOf(filterKey) > -1
          );
        });
      });
      //this.datas = _.filter(this.datas, ['customer.last_name', value] )
    }
  },
  beforeMount() {}
};
</script>

<style lang="scss">
.status {
  &--waiting {
    background-color: red;
    color: #fff;
    padding: 0.2rem;
  }
  &--reserved {
  }
  &--inProgress {
  }
}
.comment-1 {
  text-align: left;
  a {
    color: blue;
  }
}

table.table a {
  color: blue;
}
table.table thead th:hover {
  cursor: pointer;
}
</style>
