/**
 * 
 * @param {*} component 
 * @param {*} inputs
 * @param {string} inputs.name
 * @returns {string}
 */
const setTableName = (component, inputs) => {
  const { name, lastDeployHadNameDefined = true } = component.state;
  const generatedName = inputs.name || component.context.resourceId();

  // Name considered not changed if previous deploy did not define a name
  // and neither did this deploy
  return !lastDeployHadNameDefined && !inputs.name ? name : generatedName;
};

module.exports = {
  setTableName
};
