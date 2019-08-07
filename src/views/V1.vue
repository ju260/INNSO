<template>
  <div class>
    <mdb-container fluid>
      <mdb-datatable :data="datas" striped bordered arrows :display="10" />
    </mdb-container>
  </div>
</template>

<script>
import _ from "lodash";
import { mdbDatatable, mdbContainer } from "mdbvue";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbvue/build/css/mdb.css";
import json from "../assets/MOCK_DATA.json";
import moment from "moment-timezone";

export default {
  name: "TabDats",
  components: {
    mdbDatatable,
    mdbContainer
  },
  data() {
    return {
      json,
      columns: [],
      rows: []
    };
  },
  computed: {
    datas() {
      return {
        columns: this.columns,
        rows: this.rows
      };
    }
  },
  beforeMount() {
    let fieldsLabel = [
      ["status", "status"],
      ["name", "user"],
      ["email", "mail"],
      ["phone", "tel"],
      ["birthday", "né le"],
      ["contact_channel", "contact"],
      ["assignedTO", "assigné à"],
      ["last_comment", "dernier commentaire"],
      ["interaction_creation_date", "date de crétion"],
      ["due_date", "date d'échéance"],
      ["attachments", "PJ"]
    ];

    //columns
    this.columns = fieldsLabel.map(key => {
      return {
        label: key[1].toUpperCase(),
        field: key[0],
        sort: `asc`
      };
    });

    //rows
    for (var i = 0; i < this.json.length; i++) {
      let status = _.get(this.json[i], "status", "null");
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

      this.rows.push({
        status: status,
        name:
          _.get(this.json[i], "customer.first_name", "null") +
          " " +
          _.get(this.json[i], "customer.last_name", "null"),
        email: _.get(this.json[i], "customer.email", "null"),
        phone: _.get(this.json[i], "customer.phone", "null"),
        birthday: moment(
          _.get(this.json[i], "customer.birthday", "null")
        ).format("d/MM/Y"),
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
    }
  }
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
.comment {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 500px;
}
</style>
