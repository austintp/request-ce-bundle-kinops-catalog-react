import moment from 'moment';
import * as helpers from './index';

const spaceWithArray = {
  name: 'Acme',
  attributes: [
    { name: 'Icon', values: ['fa-space'] },
    { name: 'Color', values: ['red'] },
    { name: 'Shape', values: ['square'] },
  ],
};

const spaceWithObject = {
  name: 'Acme',
  attributes: {
    Icon: ['fa-space'],
    Color: ['red'],
    Shape: ['square'],
  },
};

const kappWithArray = {
  space: spaceWithArray,
  name: 'Catalog',
  attributes: [
    { name: 'Icon', values: ['fa-kapp'] },
    { name: 'Color', values: ['red'] },
  ],
};

const kappWithObject = {
  space: spaceWithObject,
  name: 'Catalog',
  attributes: {
    Icon: ['fa-kapp'],
    Color: ['red'],
  },
};

const formWithArray = {
  kapp: kappWithArray,
  name: 'iPad Request',
  attributes: [
    { name: 'Icon', values: ['fa-form'] },
  ],
};

const formWithObject = {
  kapp: kappWithObject,
  name: 'iPad Request',
  attributes: {
    Icon: ['fa-form'],
  },
};

const submissionWithArray = {
  form: formWithArray,
  values: {
    Owner: 'Bob',
  },
};

const submissionWithObject = {
  form: formWithObject,
  values: {
    Owner: 'Bob',
  },
};

const modelWithArray = {
  attributes: [
    { name: 'Icon', values: ['fa-bug'] },
    { name: 'Empty', values: [] },
  ],
};
const modelWithObject = {
  attributes: {
    Icon: ['fa-bug'],
    Empty: [],
  },
};

describe('getAttributeValue', () => {
  describe('attributes as array', () => {
    test('returns value', () => {
      expect(helpers.getAttributeValue(modelWithArray, 'Icon')).toBe('fa-bug');
    });

    test('returns undefined when name does not match', () => {
      expect(helpers.getAttributeValue(modelWithArray, 'foo')).toBeUndefined();
    });

    test('returns default when name does not match', () => {
      expect(helpers.getAttributeValue(modelWithArray, 'foo', 'def')).toBe('def');
    });

    test('returns undefined when attribute values is empty', () => {
      expect(helpers.getAttributeValue(modelWithArray, 'Empty')).toBeUndefined();
    });

    test('returns default when attribute values is empty', () => {
      expect(helpers.getAttributeValue(modelWithArray, 'Empty', 'def')).toBe('def');
    });
  });

  describe('attributes as object', () => {
    test('returns a value', () => {
      expect(helpers.getAttributeValue(modelWithObject, 'Icon')).toBe('fa-bug');
    });

    test('returns undefined when name does not match', () => {
      expect(helpers.getAttributeValue(modelWithObject, 'foo')).toBeUndefined();
    });

    test('returns default when name does not match', () => {
      expect(helpers.getAttributeValue(modelWithObject, 'foo', 'DEF')).toBe('DEF');
    });

    test('returns undefined when attribute values is empty', () => {
      expect(helpers.getAttributeValue(modelWithObject, 'Empty')).toBeUndefined();
    });

    test('returns default when attribute values is empty', () => {
      expect(helpers.getAttributeValue(modelWithObject, 'Empty', 'DEF')).toBe('DEF');
    });
  });

  describe('attributes undefined', () => {
    test('returns undefined', () => {
      expect(helpers.getAttributeValue({}, 'name')).toBeUndefined();
    });
  });
});

describe('getConfig', () => {
  // In most of the tests below we only test that the helper propagates to its
  // immediate parent to reduce the number of tests. These test that they
  // propagate properly starting wth the submission going all the way to the
  // space.
  describe('end-to-end', () => {
    describe('array style attributes', () => {
      test('returns the space attribute value', () => {
        expect(helpers.getConfig({
          submission: submissionWithArray,
          name: 'Shape',
        })).toBe('square');
      });

      test('returns the kapp attribute value respecting the overrides', () => {
        expect(helpers.getConfig({
          submission: { values: {} },
          form: { attributes: [] },
          kapp: { attributes: [{ name: 'Shape', values: ['Other'] }] },
          name: 'Shape',
        })).toBe('Other');
      });

      test('returns the space attribute value respecting the overrides', () => {
        expect(helpers.getConfig({
          submission: { values: {} },
          form: { attributes: [] },
          kapp: { attributes: [] },
          space: { attributes: [{ name: 'Shape', values: ['Other'] }] },
          name: 'Shape',
        })).toBe('Other');
      });

      test('returns the default value', () => {
        expect(helpers.getConfig({
          submission: submissionWithArray,
          name: 'Other',
          defaultValue: 'foo',
        })).toBe('foo');
      });
    });

    describe('object style attributes', () => {
      test('returns the space attribute value', () => {
        expect(helpers.getConfig({
          submission: submissionWithObject,
          name: 'Shape',
        })).toBe('square');
      });

      test('returns the space attribute value respecting the overrides', () => {
        expect(helpers.getConfig({
          submission: { values: {} },
          form: { attributes: [] },
          kapp: { attributes: [] },
          space: { attributes: { Shape: ['Other'] } },
          name: 'Shape',
        })).toBe('Other');
      });

      test('returns the default value', () => {
        expect(helpers.getConfig({
          submission: submissionWithObject,
          name: 'Other',
          defaultValue: 'foo',
        })).toBe('foo');
      });
    });
  });

  describe('with submission', () => {
    test('throws when values are not included', () => {
      expect(() => {
        helpers.getConfig({ submission: {}, name: 'Foo' });
      }).toThrow();
    });

    describe('array style attributes', () => {
      test('returns the value from the submission', () => {
        expect(helpers.getConfig({
          submission: submissionWithArray,
          name: 'Owner',
        })).toBe('Bob');
      });

      test('delegates to the form included in the submission', () => {
        expect(helpers.getConfig({
          submission: submissionWithArray,
          name: 'Icon',
        })).toBe('fa-form');
      });

      test('delegates to the form passed to the function call', () => {
        expect(helpers.getConfig({
          submission: submissionWithArray,
          form: { attributes: [{ name: 'Icon', values: ['override'] }] },
          name: 'Icon',
        })).toBe('override');
      });
    });

    describe('object style attributes', () => {
      test('returns the value from the submission', () => {
        expect(helpers.getConfig({
          submission: submissionWithObject,
          name: 'Owner',
        })).toBe('Bob');
      });

      test('delegates to the form included in the submission', () => {
        expect(helpers.getConfig({
          submission: submissionWithObject,
          name: 'Icon',
        })).toBe('fa-form');
      });

      test('delegates to the form passed to the function call', () => {
        expect(helpers.getConfig({
          submission: submissionWithObject,
          form: { attributes: { Icon: ['override'] } },
          name: 'Icon',
        })).toBe('override');
      });
    });
  });

  describe('with form', () => {
    test('throws when attributes are not included', () => {
      expect(() => {
        helpers.getConfig({ form: {}, name: 'foo' });
      }).toThrow();
    });

    describe('array style attributes', () => {
      test('returns the attribute value from the form', () => {
        expect(helpers.getConfig({
          form: formWithArray,
          name: 'Icon',
        })).toBe('fa-form');
      });

      test('delegates to the kapp included in the form', () => {
        expect(helpers.getConfig({
          form: formWithArray,
          name: 'Color',
        })).toBe('red');
      });

      test('delegates to the kapp passed to the function call', () => {
        expect(helpers.getConfig({
          form: formWithArray,
          kapp: { attributes: [{ name: 'Color', values: ['override'] }] },
          name: 'Color',
        })).toBe('override');
      });
    });

    describe('object style attributes', () => {
      test('returns the attribute value from the form', () => {
        expect(helpers.getConfig({
          form: formWithObject,
          name: 'Icon',
        })).toBe('fa-form');
      });

      test('delegates to the kapp included in the form', () => {
        expect(helpers.getConfig({
          form: formWithObject,
          name: 'Color',
        })).toBe('red');
      });

      test('delegates to the kapp passed to the function call', () => {
        expect(helpers.getConfig({
          form: formWithObject,
          kapp: { attributes: [{ name: 'Color', values: ['override'] }] },
          name: 'Color',
        })).toBe('override');
      });
    });
  });

  describe('with kapp', () => {
    test('throws when attributes are not included', () => {
      expect(() => {
        helpers.getConfig({ kapp: {}, name: 'foo' });
      }).toThrow();
    });

    describe('array style attributes', () => {
      test('returns the attribute value from the kapp', () => {
        expect(helpers.getConfig({
          kapp: kappWithArray,
          name: 'Color',
        })).toBe('red');
      });

      test('delegates to the space included in the kapp', () => {
        expect(helpers.getConfig({
          kapp: kappWithArray,
          name: 'Shape',
        })).toBe('square');
      });

      test('delegates to the space passed to the function call', () => {
        expect(helpers.getConfig({
          kapp: kappWithArray,
          space: { attributes: [{ name: 'Shape', values: ['override'] }] },
          name: 'Shape',
        })).toBe('override');
      });
    });

    describe('object style attributes', () => {
      test('returns the attribute value from the kapp', () => {
        expect(helpers.getConfig({
          kapp: kappWithObject,
          name: 'Color',
        })).toBe('red');
      });

      test('delegates to the space included in the kapp', () => {
        expect(helpers.getConfig({
          kapp: kappWithObject,
          name: 'Shape',
        })).toBe('square');
      });

      test('delegates to the space passed to the function call', () => {
        expect(helpers.getConfig({
          kapp: formWithObject,
          space: { attributes: [{ name: 'Shape', values: ['override'] }] },
          name: 'Shape',
        })).toBe('override');
      });
    });
  });

  describe('with space', () => {
    test('throws when attributes are not included', () => {
      expect(() => {
        helpers.getConfig({ space: {}, name: 'foo' });
      }).toThrow();
    });

    describe('array style attributes', () => {
      test('returns the attribute value from the space', () => {
        expect(helpers.getConfig({
          space: spaceWithArray,
          name: 'Shape',
        })).toBe('square');
      });

      test('returns the default value', () => {
        expect(helpers.getConfig({
          space: spaceWithArray,
          name: 'Other',
          defaultValue: 'DEF',
        })).toBe('DEF');
      });
    });

    describe('object style attributes', () => {
      test('returns the attribute value from the space', () => {
        expect(helpers.getConfig({
          space: spaceWithObject,
          name: 'Shape',
        })).toBe('square');
      });

      test('returns the default value', () => {
        expect(helpers.getConfig({
          space: spaceWithObject,
          name: 'Other',
          defaultValue: 'DEF',
        })).toBe('DEF');
      });
    });
  });
});

describe('getDueDate', () => {
  const submittedAt = '2017-05-28T20:59:44.929Z';
  const submittedAtEpoch = moment(submittedAt).unix();

  test('adds days due (from submission) to submitted at', () => {
    expect(helpers.getDueDate({
      submittedAt,
      values: {
        'Days Due': '4',
      },
    }, 'Days Due').unix()).toBe(submittedAtEpoch + (4 * 24 * 60 * 60));
  });

  test('adds days due (from form) to submitted at', () => {
    expect(helpers.getDueDate({
      submittedAt,
      values: {},
      form: {
        attributes: {
          'Days Due': ['4'],
        },
      },
    }, 'Days Due').unix()).toBe(submittedAtEpoch + (4 * 24 * 60 * 60));
  });

  test('adds days due (from kapp) to submitted at', () => {
    expect(helpers.getDueDate({
      submittedAt,
      values: {},
      form: {
        attributes: {},
        kapp: {
          attributes: {
            'Days Due': ['4'],
          },
        },
      },
    }, 'Days Due').unix()).toBe(submittedAtEpoch + (4 * 24 * 60 * 60));
  });

  test('returns null when submitted at is null', () => {
    expect(helpers.getDueDate({
      submittedAt: null,
      values: {
        'Days Due': '4',
      },
    }, 'Days Due')).toBeNull();
  });

  test('throws when days due attr is not defined', () => {
    expect(() => {
      helpers.getDueDate({
        submittedAt,
        values: {},
        form: {
          attributes: {},
          kapp: {
            attributes: {},
            space: {
              attributes: {},
            },
          },
        },
      }, 'Days Due');
    }).toThrow();
  });

  test('throws when days due attr is not a number', () => {
    expect(() => {
      helpers.getDueDate({
        submittedAt,
        values: {
          'Days Due': 'NaN',
        },
      }, 'Days Due');
    }).toThrow();
  });
});
