import isarray from 'isarray';

/**
 * Given a model and an attribute name returns the value of that attribute.
 * Should return undefined if attributes are missing or there is no attribute
 * value for the given attrName. It supports both attribute structures (arrays
 * that are returned directly from the API and objects that are returned by the
 * helpers in react-kinetic-core).
 *
 * @param model: { attributes }
 * @param attrName
 * @param defaultValue
 */
export const getAttributeValue = ({ attributes }, attrName, defaultValue) =>
  (
    isarray(attributes)
      ? attributes.filter(a => a.name === attrName).map(a => a.values[0])[0]
      : attributes && attributes[attrName] && attributes[attrName][0]
  ) || defaultValue;


const getSpaceConfig = (space, name, val) => {
  if (!space) {
    throw new Error('getConfig did not receive space, it must be included on ' +
      'the kapp or manually passed.');
  }
  if (!space.attributes) {
    throw new Error('getConfig failed, space must include attributes.');
  }
  // If the space has a value for the desired attribute return it otherwise
  // return the default value.
  return getAttributeValue(space, name, val);
};

const getKappConfig = (kapp, space, name, val) => {
  if (!kapp) {
    throw new Error('getConfig did not receive kapp, it must be included on ' +
      'the form or manually passed.');
  } else if (!kapp.attributes) {
    throw new Error('getConfig failed, kapp must include attributes');
  }
  // If the kapp has a value for the desired attribute return it otherwise
  // check the space.
  return getAttributeValue(kapp, name) || getSpaceConfig(space || kapp.space, name, val);
};

const getFormConfig = (form, kapp, space, name, val) => {
  if (!form) {
    throw new Error('getConfig did not receive form, it must be included on ' +
      'the submission or manually passed.');
  } else if (!form.attributes) {
    throw new Error('getConfig failed, form must include attributes');
  }
  // If the form has a value for the desired attribute return it otherwise
  // the default value.
  return getAttributeValue(form, name) || getKappConfig(kapp || form.kapp, space, name, val);
};

const getSubmissionConfig = (submission, form, kapp, space, name, def) => {
  if (!submission.values) {
    throw new Error('Cannot perform getConfig when submission does not include values.');
  }
  return submission.values[name] || getFormConfig(form || submission.form, kapp, space, name, def);
};

/**
 * Given a model (via the submission / form / kapp / space options) will look
 * the given configuration value (values on a submission and attribute values on
 * the others). If not found on the present model it will propagate upwards
 * until it is found otherwise it will return an option default or undefined.
 *
 * @param name
 * @param defaultValue
 * @param submission
 * @param form
 * @param kapp
 * @param space
 */
export const getConfig = ({
  name,
  defaultValue,
  submission,
  form,
  kapp,
  space,
}) => {
  if (submission) {
    return getSubmissionConfig(submission, form, kapp, space, name, defaultValue);
  } else if (form) {
    return getFormConfig(form, kapp, space, name, defaultValue);
  } else if (kapp) {
    return getKappConfig(kapp, space, name, defaultValue);
  } else if (space) {
    return getSpaceConfig(space, name, defaultValue);
  } else {
    throw new Error('getConfig must be called with at least one of: ' +
      'submission, form, kapp, space.');
  }
};
