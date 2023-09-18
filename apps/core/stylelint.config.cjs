// TODO: Change to ES module when stylelint is ready
const configStandard = require("stylelint-config-standard");
const vueStandard = require("stylelint-config-standard-vue");

/** @type {import("stylelint").Config} */
module.exports = {
  ...configStandard,
  ...vueStandard,
};
