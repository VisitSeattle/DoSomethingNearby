exports.ids = [2];
exports.modules = {

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(160);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("68798b24", content, true, context)
};

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_import_vue_vue_type_style_index_0_id_ce08f6cc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(104);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_import_vue_vue_type_style_index_0_id_ce08f6cc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_import_vue_vue_type_style_index_0_id_ce08f6cc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_import_vue_vue_type_style_index_0_id_ce08f6cc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_import_vue_vue_type_style_index_0_id_ce08f6cc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".error[data-v-ce08f6cc]{color:red}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/import.vue?vue&type=template&id=ce08f6cc&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[(!_vm.isPasswordValid && !_vm.loading)?_vm._ssrNode("<div class=\"mt-5\" data-v-ce08f6cc>","</div>",[_c('b-row',{staticClass:"mb-2",attrs:{"align-h":"center"}},[_c('b-col',{attrs:{"lg":"4"}},[_c('b-form-input',{staticClass:"import__password",attrs:{"placeholder":"Enter the password","type":"password","state":_vm.isPasswordValid,"aria-describedby":"input-live-feedback"},nativeOn:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.handlePasswordClick($event)}},model:{value:(_vm.password),callback:function ($$v) {_vm.password=$$v},expression:"password"}}),_vm._v(" "),_c('b-form-invalid-feedback',{attrs:{"id":"input-live-feedback"}},[_vm._v("\n          Please check your password and try again\n        ")])],1)],1),_vm._ssrNode(" "),_c('b-row',{attrs:{"align-h":"center"}},[_c('b-col',{attrs:{"lg":"4"}},[_c('b-button',{attrs:{"href":"#","block":"","variant":"primary"},on:{"click":_vm.handlePasswordClick}},[_vm._v("\n          Go\n        ")])],1)],1)],2):_vm._e(),_vm._ssrNode(" "),(_vm.isPasswordValid)?_vm._ssrNode("<div data-v-ce08f6cc>","</div>",[_c('b-row',{staticClass:"text-center"},[_c('b-col',{staticClass:"mt-5",attrs:{"lg":"12"}},[_c('h1',{staticClass:"import__title"},[_vm._v("\n          Visit Seattle\n        ")])])],1),_vm._ssrNode(" "),_c('b-row',{staticClass:"mt-3",attrs:{"align-h":"center"}},[_c('b-col',{attrs:{"lg":"4"}},[_c('b-form-file',{attrs:{"plain":"","accept":".csv"},model:{value:(_vm.placesFile),callback:function ($$v) {_vm.placesFile=$$v},expression:"placesFile"}})],1)],1),_vm._ssrNode(" "),_c('b-row',{staticClass:"mt-3",attrs:{"align-h":"start"}},[_c('b-col',{attrs:{"lg":"2"}},[(!_vm.loading && _vm.report)?_c('b-form-select',{staticClass:"mb-3",attrs:{"options":_vm.filterOptions,"value-field":"item","text-field":"name"},model:{value:(_vm.statusFilter),callback:function ($$v) {_vm.statusFilter=$$v},expression:"statusFilter"}}):_vm._e()],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"2"}},[(!_vm.loading && _vm.csvContent)?_c('b-button',{attrs:{"href":("data:attachment/csv," + (encodeURIComponent(_vm.csvContent))),"download":"places.csv","variant":"primary"}},[_vm._v("\n          Download and correct invalid businesses\n        ")]):_vm._e()],1)],1),_vm._ssrNode(" "),_c('b-row',{attrs:{"align-h":"center"}},[(_vm.loading)?_c('b-spinner',{staticStyle:{"width":"3rem","height":"3rem"},attrs:{"label":"Loading"}}):_vm._e()],1),_vm._ssrNode(" "),_c('b-row',{staticClass:"text-center"},[_c('b-col',{attrs:{"lg":"12"}},[(!_vm.loading && _vm.error)?_c('h6',{staticClass:"error"},[_vm._v("\n          "+_vm._s(_vm.error)+"\n        ")]):_vm._e()])],1),_vm._ssrNode(" "),_c('b-row',[_c('b-col',{attrs:{"lg":"12"}},[(!_vm.loading && _vm.report)?_c('b-table',{staticClass:"import__table",attrs:{"sticky-header":"500px","no-border-collapse":true,"responsive":"","items":_vm.report,"fields":_vm.tableFields,"head-variant":"light","filter-function":_vm.filterFunction,"filter":_vm.statusFilter,"tbody-tr-class":_vm.rowClass}}):_vm._e()],1)],1)],2):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/import.vue?vue&type=template&id=ce08f6cc&scoped=true&

// EXTERNAL MODULE: external "vuex"
var external_vuex_ = __webpack_require__(6);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(43);
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);

// EXTERNAL MODULE: ./models/Pledgee.js
var Pledgee = __webpack_require__(1);

// CONCATENATED MODULE: ./models/Report.js


const orderKeys = [{
  label: 'Status',
  value: 'status'
}, Pledgee["a" /* default */].model.businessName, Pledgee["a" /* default */].model.phoneNumber, Pledgee["a" /* default */].model.website, Pledgee["a" /* default */].model.region, Pledgee["a" /* default */].model.seattleNeighborhood];

const getPledgeeKeys = reportObj => {
  const reportKeys = [];

  for (const reportKey in reportObj) {
    if (orderKeys.filter(orderKey => orderKey.value === reportKey || orderKey === reportKey).length === 0) {
      reportKeys.push(reportKey);
    }
  }

  return reportKeys;
}; // Get the fields in the order we want them to be


const getOrderFields = reportObj => {
  const reportKeys = getPledgeeKeys(reportObj);
  return external_lodash_default.a.union(orderKeys, reportKeys);
};

/* harmony default export */ var Report = (getOrderFields);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(3);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/import.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





const csv = __webpack_require__(44);

const {
  Parser
} = __webpack_require__(45);

/* harmony default export */ var importvue_type_script_lang_js_ = ({
  data() {
    return {
      csvContent: null,
      loading: false,
      password: '',
      isPasswordValid: null,
      placesFile: null,
      statusFilter: 'all',
      filterOptions: [{
        item: 'all',
        name: 'All'
      }, {
        item: 'success',
        name: 'Success'
      }, {
        item: 'invalid_phone',
        name: 'Invalid Phone Number'
      }, {
        item: 'invalid_website',
        name: 'Invalid Website'
      }, {
        item: 'invalid_neighborhood',
        name: 'Invalid Neighborhood'
      }, {
        item: 'invalid_region',
        name: 'Invalid Region'
      }],
      tableFields: [{
        key: 'status',
        label: 'Status'
      }, {
        key: Pledgee["a" /* default */].model.businessName,
        label: 'Business name'
      }, {
        key: Pledgee["a" /* default */].model.region,
        label: 'Region'
      }, {
        key: Pledgee["a" /* default */].model.seattleNeighborhood,
        label: 'Seattle Neighborhood'
      }, {
        key: Pledgee["a" /* default */].model.phoneNumber,
        label: 'Phone Number'
      }, {
        key: Pledgee["a" /* default */].model.website,
        label: 'Website'
      }]
    };
  },

  computed: { ...Object(external_vuex_["mapGetters"])({
      report: 'places/report',
      error: 'places/error'
    })
  },
  watch: {
    report(report) {
      if (report && report.length) {
        try {
          const fields = Report(report[0]);
          const content = report.filter(item => item.status !== 'success');
          const jsonToCSVParser = new Parser({
            fields
          });

          if (content.length > 0) {
            this.csvContent = jsonToCSVParser.parse(content);
          }

          this.loading = false;
          this.placesFile = null;
        } catch (err) {
          this.setError('An error occurred while generating the csv, please check the logs and try again');
          this.placesFile = null;
          console.error(err);
        }
      }
    },

    placesFile(placesFile) {
      if (this.placesFile) {
        if (!placesFile.type) {
          this.setError('The File.type property does not appear to be supported on this browser.');
          return;
        }

        if (!placesFile.type.match('.csv') && !placesFile.type.match('application/vnd.ms-excel')) {
          this.setError('The selected file does not appear to be a csv.');
          return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', event => {
          this.loading = true;
          csv().fromString(event.target.result).then(pledgees => {
            this.getReport({
              pledgees
            });
          });
        });
        reader.readAsText(placesFile);
      }
    },

    error(error) {
      if (error) {
        this.loading = false;
      }
    }

  },
  methods: { ...Object(external_vuex_["mapActions"])({
      getReport: 'places/getReport',
      setError: 'places/setError'
    }),

    onScriptLoaded(event = null) {
      this.loading = false;
    },

    async verifyPassword() {
      const {
        data
      } = await external_axios_default.a.post('/api/verifyImportPass', {
        key: this.password
      });
      return data.auth;
    },

    async handlePasswordClick() {
      const isPasswordCorrect = await this.verifyPassword();

      if (isPasswordCorrect) {
        this.isPasswordValid = true;
        this.$cookies.set('import_pass', this.password, 60 * 60 * 24 * 30);
      } else {
        this.isPasswordValid = false;
      }
    },

    rowClass(item, type) {
      if (!item || type !== 'row') return;

      switch (item.status) {
        case 'success':
          return 'table-success';

        case 'invalid_phone':
        case 'invalid_website':
        case 'invalid_region':
        case 'invalid_neighborhood':
          return 'table-danger';
      }
    },

    filterFunction(record, value) {
      return value === 'all' ? true : record.status === value;
    }

  },

  mounted() {
    if (false) {}
  }

});
// CONCATENATED MODULE: ./pages/import.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_importvue_type_script_lang_js_ = (importvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./pages/import.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(159)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_importvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "ce08f6cc",
  "6a4941f4"
  
)

/* harmony default export */ var pages_import = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=import.js.map