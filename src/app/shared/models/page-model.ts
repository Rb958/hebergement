export class PageModel<T> {
  public totalPages: number;
  public totalElements: number;
  public size: number;
  public content: Array<T>;
  public pageable:Pageable;


  constructor(totalPages: number, totalElements: number, size: number, content: Array<T>, pageable: Pageable) {
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.size = size;
    this.content = content;
    this.pageable = pageable;
  }
}

export class Pageable{
  public pageNumber: number;
  public pageSize: number;


  constructor(pageNumber: number, pageSize: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
