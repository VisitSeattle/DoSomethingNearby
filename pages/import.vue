<template>
  <div class="container">
    <div
      class="mt-5"
      v-if="!isPasswordValid && !loading"
    >
      <b-row
        align-h="center"
        class="mb-2"
      >
        <b-col lg="4">
          <b-form-input
            v-model="password"
            placeholder="Enter the password"
            type="password"
            class="import__password"
            :state="isPasswordValid"
            aria-describedby="input-live-feedback"
            @keydown.enter.native="handlePasswordClick"
          />
          <b-form-invalid-feedback id="input-live-feedback">
            Please check your password and try again
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col lg="4">
          <b-button
            href="#"
            block
            @click="handlePasswordClick"
            variant="primary"
          >
            Go
          </b-button>
        </b-col>
      </b-row>
    </div>
    <div v-if="isPasswordValid">
      <b-row class="text-center">
        <b-col
          lg="12"
          class="mt-5"
        >
          <h1 class="import__title">
            Visit Seattle
          </h1>
        </b-col>
      </b-row>
      <b-row
        class="mt-3"
        align-h="center"
      >
        <b-col lg="4">
          <b-form-file
            v-model="placesFile"
            plain
            accept=".csv"
          />
        </b-col>
      </b-row>
      <b-row
        class="mt-3"
        align-h="start"
      >
        <b-col lg="2">
          <b-form-select
            v-if="!loading && report"
            v-model="statusFilter"
            :options="filterOptions"
            class="mb-3"
            value-field="item"
            text-field="name"
          />
        </b-col>
        <b-col lg="2">
          <b-button
            :href="`data:attachment/csv,${encodeURIComponent(csvContent)}`"
            v-if="!loading && csvContent"
            download="places.csv"
            variant="primary"
          >
            Download and correct invalid businesses
          </b-button>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-spinner
          label="Loading"
          style="width: 3rem; height: 3rem;"
          v-if="loading"
        />
      </b-row>
      <b-row class="text-center">
        <b-col lg="12">
          <h6
            class="error"
            v-if="!loading && error"
          >
            {{ error }}
          </h6>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <b-table
            class="import__table"
            v-if="!loading && report"
            sticky-header="500px"
            :no-border-collapse="true"
            responsive
            :items="report"
            :fields="tableFields"
            head-variant="light"
            :filter-function="filterFunction"
            :filter="statusFilter"
            :tbody-tr-class="rowClass"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import getOrderFields from '~/models/Report'
import Pledgee from '~/models/Pledgee'
import axios from 'axios'
const csv = require('csvtojson')
const { Parser } = require('json2csv')

export default {
  data () {
    return {
      csvContent: null,
      loading: false,
      password: '',
      isPasswordValid: null,
      placesFile: null,
      statusFilter: 'all',
      filterOptions: [
        { item: 'all', name: 'All' },
        { item: 'success', name: 'Success' },
        { item: 'invalid_phone', name: 'Invalid Phone Number' },
        { item: 'invalid_website', name: 'Invalid Website' },
        { item: 'invalid_neighborhood', name: 'Invalid Neighborhood' },
        { item: 'invalid_region', name: 'Invalid Region' }
      ],
      tableFields: [
        {
          key: 'status',
          label: 'Status'
        },
        {
          key: Pledgee.model.businessName,
          label: 'Business name'
        },
        {
          key: Pledgee.model.region,
          label: 'Region'
        },
        {
          key: Pledgee.model.seattleNeighborhood,
          label: 'Seattle Neighborhood'
        },
        {
          key: Pledgee.model.phoneNumber,
          label: 'Phone Number'
        },
        {
          key: Pledgee.model.website,
          label: 'Website'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      report: 'places/report',
      error: 'places/error'
    })
  },
  watch: {
    report (report) {
      if (report && report.length) {
        try {
          const fields = getOrderFields(report[0])
          const content = report.filter(item => item.status !== 'success')
          const jsonToCSVParser = new Parser({ fields })
          if (content.length > 0) {
            this.csvContent = jsonToCSVParser.parse(content)
          }
          this.loading = false
          this.placesFile = null
        } catch (err) {
          this.setError('An error occurred while generating the csv, please check the logs and try again')
          this.placesFile = null
          console.error(err)
        }
      }
    },
    placesFile (placesFile) {
      if (this.placesFile) {
        if (!placesFile.type) {
          this.setError('The File.type property does not appear to be supported on this browser.')
          return
        }
        if (!placesFile.type.match('.csv') && !placesFile.type.match('application/vnd.ms-excel')) {
          this.setError('The selected file does not appear to be a csv.')
          return
        }
        const reader = new FileReader()
        reader.addEventListener('load', event => {
          this.loading = true
          csv()
            .fromString(event.target.result)
            .then((pledgees) => {
              this.getReport({ pledgees })
            })
        })
        reader.readAsText(placesFile)
      }
    },
    error (error) {
      if (error) {
        this.loading = false
      }
    }
  },
  methods: {
    ...mapActions({
      getReport: 'places/getReport',
      setError: 'places/setError'
    }),
    onScriptLoaded (event = null) {
      this.loading = false
    },
    async verifyPassword () {
      const { data } = await axios.post('/api/verifyImportPass', { key: this.password })
      return data.auth
    },
    async handlePasswordClick () {
      const isPasswordCorrect = await this.verifyPassword()
      if (isPasswordCorrect) {
        this.isPasswordValid = true
        this.$cookies.set('import_pass', this.password, 60 * 60 * 24 * 30)
      } else {
        this.isPasswordValid = false
      }
    },
    rowClass (item, type) {
      if (!item || type !== 'row') return
      switch (item.status) {
        case 'success':
          return 'table-success'
        case 'invalid_phone':
        case 'invalid_website':
        case 'invalid_region':
        case 'invalid_neighborhood':
          return 'table-danger'
      }
    },
    filterFunction (record, value) {
      return value === 'all' ? true : record.status === value
    }
  },
  mounted () {
    if (process.client) {
      if (this.$cookies.get('import_pass')) {
        this.isPasswordValid = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: red
}
</style>
