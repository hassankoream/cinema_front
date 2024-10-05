import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moviesPosts',
  standalone: true
})
export class MoviesPostsPipe implements PipeTransform {

  transform(posts: any[], searchTerm: string = 'ms'): any[] {
    if (!posts || !searchTerm) {
      return posts;
    }

    // Filter the posts array where the body starts with "ms,"
    return posts.filter(post => post.body.startsWith(`${searchTerm},`));
  }

}
