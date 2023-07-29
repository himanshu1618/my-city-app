import assetsTransformer from './assetsTransformer';

describe('assetsTransformer', () => {

  beforeEach(() => {
    global.path = {
      basename: jest.fn()
    };
  });

  it('should render Header component correctly with props', () => {
    expect(assetsTransformer.process(null, 'test')).toMatch('module.exports =');
  });

});
