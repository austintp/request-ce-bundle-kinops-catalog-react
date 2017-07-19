import categoriesReducer from './modules/categories';
import formsReducer from './modules/forms';
import profileReducer from './modules/profile';
import searchReducer from './modules/search';
import submissionsReducer from './modules/submissions';
import submissionReducer from './modules/submission';
import systemErrorReducer from './modules/systemError';

export default {
  categories: categoriesReducer,
  forms: formsReducer,
  profile: profileReducer,
  search: searchReducer,
  submissions: submissionsReducer,
  submission: submissionReducer,
  systemError: systemErrorReducer,
};
