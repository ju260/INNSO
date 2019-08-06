<template>
  <div>
    <vuetable
      ref="vuetable"
      :api-mode="false"
      :fields="fields"
      :per-page="perPage"
      pagination-path="pagination"
      :data-manager="dataManager"
     @vuetable:pagination-data="onPaginationData"
    >   <template slot="actions" scope="props">
      <div class="table-button-container">
          <button class="btn btn-warning btn-sm" @click="editRow(props.rowData)">
            <span class="glyphicon glyphicon-pencil"></span> Edit</button>&nbsp;&nbsp;
          <button class="btn btn-danger btn-sm" @click="deleteRow(props.rowData)">
            <span class="glyphicon glyphicon-trash"></span> Delete</button>&nbsp;&nbsp;
      </div>
      </template></vuetable>
    <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
  </div>
</template>

<script>
import _ from "lodash";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
import json from "../assets/MOCK_DATA.json";
import moment from "moment-timezone";

export default {
  components: {
    Vuetable,
    VuetablePagination
  },
  data() {
    return {
      json,
      fields: [
        {
          name: "name",
          titleClass: "center aligned",
          dataClass: "center aligned"
        },
        {
          name: "status",
          titleClass: "center aligned",
          dataClass: "center aligned",
          callback: "genderLabel"
        },
        {
          name: "birthday",
          titleClass: "center aligned",
          dataClass: "center aligned",
          callback: "formatDate|DD-MM-YYYY"
        },

        {
          name: "phone",
          titleClass: "center aligned",
          dataClass: "right aligned"
        },
        {
          name: "contact_channel",
          titleClass: "center aligned",
          dataClass: "right aligned"
        },
        {
          name: "assignedTO",
          titleClass: "center aligned",
          dataClass: "right aligned"
        },
        {
          name: "last_comment",
          titleClass: "center aligned",
          dataClass: "right aligned"
        },
        {
          name: "interaction_creation_date",
          titleClass: "center aligned",
          dataClass: "right aligned"
        },
        {
          name: "due_date",
          titleClass: "center aligned",
          dataClass: "right aligned"
        },
        {
          name: "attachments",
          titleClass: "center aligned",
          dataClass: "right aligned"
        }
      ],
      perPage: 15,
      data: []
    };
  },
  watch: {
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    }
  },
  mounted() {
   this.transform(json);

  },
  methods: {
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder, pagination) {
      if (this.data.length < 1) return;

      let local = this.data;

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        );
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      );
      console.log("pagination:", pagination);
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      };
    },
    onActionClicked(action, data) {
      console.log("slot actions: on-click", data.name);
    },
    transform: function(data) {
      var transformed = {};

      transformed.pagination = {
        total: data.total,
        per_page: data.per_page,
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        from: data.from,
        to: data.to
      };

       transformed.mydata = [];

      for (var i = 0; i < data.length; i++) {
        transformed.mydata.push({
          status: status,
          name:
            _.get(this.json[i], "customer.first_name", "null") +
            " " +
            _.get(this.json[i], "customer.last_name", "null"),
          email: _.get(this.json[i], "customer.email", "null"),
          phone: _.get(this.json[i], "customer.phone", "null"),
          birthday: _.get(this.json[i], "customer.birthday", "null"),
          contact_channel: _.get(this.json[i], "contact_channel", "null"),
          last_comment: `<div class="comment">${_.get(
            this.json[i],
            "last_comment",
            "null"
          )}</div> <button class="waves-effect mdb-icon-copy fas fa-eye"></button>`,
          assignedTO: _.get(this.json[i], "assignedTO", "null"),
          interaction_creation_date: moment(
            _.get(this.json[i], "interaction_creation_date", "null")
          ).format("d/MM/Y, H:MM"),
          due_date: moment(_.get(this.json[i], "due_date", "null")).format(
            "d/MM/Y, H:MM"
          ),
          attachments: `<a href="${_.get(
            this.json[i],
            "attachments",
            "null"
          )}" class="waves-effect mdb-icon-copy far fa-file"></a>`
        });
        this.data=transformed.mydata;
      }
      return transformed;
    },
    allcap(value) {
      return value.toUpperCase();
    },
    genderLabel(value) {
      return value === "M"
        ? '<span class="ui teal label"><i class="large man icon"></i>Male</span>'
        : '<span class="ui pink label"><i class="large woman icon"></i>Female</span>';
    },
    formatNumber(value) {
      return accounting.formatNumber(value, 2);
    },
    formatDate(value, fmt = "D MMM YYYY") {
      console.log('t')
      return value == null ? "" : moment(value, "YYYY-MM-DD").format(fmt);
    }
  }
};
</script>
