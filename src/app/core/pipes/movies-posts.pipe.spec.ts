import { MoviesPostsPipe } from './movies-posts.pipe';

describe('MoviesPostsPipe', () => {
  it('create an instance', () => {
    const pipe = new MoviesPostsPipe();
    expect(pipe).toBeTruthy();
  });
});
