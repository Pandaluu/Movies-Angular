export class Movie {
  public idMovie: number;
  public title: string;
  public year: number;
  public synopsis: string;
  public like: number = 0;
  public animationState: string = 'initial';

  public deserialize(datas: any): Movie {
    Object.assign(this, datas);
    return this;
  }
}
