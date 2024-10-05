import { ExtractPostBodyPipe } from './extract-post-body.pipe';

describe('ExtractPostBodyPipe', () => {
  it('create an instance', () => {
    const pipe = new ExtractPostBodyPipe();
    expect(pipe).toBeTruthy();
  });
});
