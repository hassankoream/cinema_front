import { ExtractImageUrlPipe } from './extract-image-url.pipe';

describe('ExtractImageUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new ExtractImageUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
