import { watchCategories } from './sagas/categories';
import { watchForms } from './sagas/forms';
import { watchProfile } from './sagas/profile';
import { watchSubmissions } from './sagas/submissions';
import { watchSubmission } from './sagas/submission';

export default function* () {
  yield [
    watchCategories(),
    watchForms(),
    watchProfile(),
    watchSubmissions(),
    watchSubmission(),
  ];
}
