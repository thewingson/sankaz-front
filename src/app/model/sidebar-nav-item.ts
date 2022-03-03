export class SidebarNavItem {
  private _nameRu:string;
  private _nameEn:string;
  private _iconName:string;
  private _routeLink:string;
  private _childItems:SidebarNavItem[];


  constructor(nameRu: string, nameEn: string, iconName: string, routeLink: string, childItems: SidebarNavItem[]) {
    this._nameRu = nameRu;
    this._nameEn = nameEn;
    this._iconName = iconName;
    this._routeLink = routeLink;
    this._childItems = childItems;
  }

  get nameRu(): string {
    return this._nameRu;
  }

  set nameRu(value: string) {
    this._nameRu = value;
  }

  get nameEn(): string {
    return this._nameEn;
  }

  set nameEn(value: string) {
    this._nameEn = value;
  }

  get iconName(): string {
    return this._iconName;
  }

  set iconName(value: string) {
    this._iconName = value;
  }

  get routeLink(): string {
    return this._routeLink;
  }

  set routeLink(value: string) {
    this._routeLink = value;
  }

  get childItems(): SidebarNavItem[] {
    return this._childItems;
  }

  set childItems(value: SidebarNavItem[]) {
    this._childItems = value;
  }
}
