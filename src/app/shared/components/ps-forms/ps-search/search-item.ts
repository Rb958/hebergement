export class SearchItem{
  private _searchValue: string;
  private _filter: any;

  constructor(searchValue: string, filter: any) {
    this._searchValue = searchValue;
    this._filter = filter;
  }


  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    this._searchValue = value;
  }

  get filter(): any {
    return this._filter;
  }

  set filter(value: any) {
    this._filter = value;
  }
}
