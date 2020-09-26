# WMS_DEMO

## *주요 dependencies*

- **akveo**
- **nebular**
- **devextreme**

## 공통 모듈

- **다국어**
- **메뉴**
- **비즈니스 CRUD 권한**
- **서치헬프**

## endpoint 설정

어플리케이션내 모든 endpoint는 environment.ts -> REGISTRY에 설정

```javascript
export const REGISTRY: any = {
  LOGIN: {
    INIT: `${environment.MD}/auth/login?language=${environment.defaultLang}`,
    LOGINUSER: `${environment.MD}/auth/login`
  },
  RCVMASTERGRID: {
    GET: `${environment.WM}/api/v1/rec/receive/listRcv?criteria=`,
    POST: `${environment.WM}/api/v1/rec/receive/saveRcv`,
    DELETE: `${environment.WM}/api/v1/rec/receive/deleteRcv`,
  },
    ...
}
```

PROPERTY값은 모듈,컴포넌트별로 자유롭게 설정가능하나 INIT은 권한에 자유로운 모듈/컴포넌트 로딩시 사용되는 GET url을 나타내는 PROPERTY이다.

**INIT** : ROUTE CHANGE로 인한 모듈/컴포넌트 로딩시 서버로부터 초기 데이터를 받는 endpoint url. *-routing.module.ts에서 사용.

```javascript
//auth-routing.module.ts
const routes: Routes = [{
  path: '',
  component: NgxAuthComponent,
  children: [
    {
      path: '',
      component: NgxLoginComponent,
      data: { callUponActive: REGISTRY.LOGIN.INIT },
      resolve: { programInit: ProgramInitResolver }
    },
    ...
}
```

INIT url REQUEST시 기대 RESPONSE :

```JSON
{
        "dictionary": {
            "RCVSTATUS":"입고예정",
            "RCVTYPE":"입고유형"
        },
        "RCVSTATUS": {
            200: "입고예정",
            300: "입고접수",
            400: "적치완료",
            600: "입고확정",
            900: "입고승인"
        },
        "RCVTYPE": {
            200: "입고예정",
            300: "입고접수",
            400: "적치완료",
            600: "입고확정",
            900: "입고승인"
        }
}
```

**NOTE** : 권한 별 모듈/컴포넌트는 MENU 로딩시 INIT url를 서버로 부터 받기 때문에 PRE설정 불가.

## 다국어

### 다국어 랜더링 디버깅 오더

1. dictionary 객체(GET request http:// [INIT url]).
2. ProgramInitResolver/AdminProgramInitResolver
3. program.dictionary.ts -> LOCALDICTIONARY 객체 업데이트
4. translate.pipe.ts
5. html 랜더링

### case 1 : REGISTRY에 INIT endpoint을 설정한 경우

INIT url를 설정했다면 유저 권한과 상관없이 이동/생성 가능한 모듈/컴포넌트 이며 초기 로딩시 필요한 dictionary 객체를 받을수있다.

ProgramInitResolver.ts

```javascript
@Injectable({
    providedIn: 'root'
})
export class ProgramInitResolver implements Resolve<any>{
    constructor(private http: HttpClient) {
    }

    resolve(snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url = snapshot.data.callUponActive;
        return this.fetchProgramScopeData(url);
    }

    fetchProgramScopeData(url: string): Observable<any> {
        return this.http.get(url).pipe(
            retry(2),
            map((res) => {
                const dictionary = res[COMMON_CONFIG.DICTIONARY];
                settDictionary(dictionary);
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                notify({ message: error.message, width: 500, position: 'top' }, 'error', 3000);
                new Error("ProgramInitResolver ERROR : " + error.status)
                return EMPTY;
            }));
    }
}
```

ProgramInitResolve는 설정된 INIT url을 호출해 받은 dictionrary를 LOCALDICTIONARY 객체에 세팅한다.
이렇게 세팅된 LOCALDICTIONARY는 translate pipe에서 바라보며 앵귤러 pipe룰에 따라 랜더링된다.

```javascript
@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {

  private book: any;
  constructor() {
    this.book = getDictionary();
  }
  transform(text: string, key: string): any {
    return (this.book && this.book[key]) ? this.book[key] : text;
  }
}

```

```html
...
<label class="label" for="input-tenant">{{'Tenant ID' | translate : 'TENANTID'}} </label>
...
```

{{'Tenant ID' | translate : 'TENANTID'}}에서 *'Tenant ID:'*는 디폴트 값(매핑실패시에 사용), *'TENANTID'*는 **translate**파이프의 매개변수 값이다. 이는  *dictionary*와 1:1 매핑된다.

### case 2 : REGISTRY에 INIT endpoint을 설정하지 않은 경우

전체공개 모듈/컴포넌트일 경우 PRE세팅이 가능한 반면 비지니스 페이지 랜딩은 각 유저별 이동 가능한 MENU 리스트를 로그인시 서버로부터 받아 실행하게 되며, 이때 각 모듈/컴포넌트 별 INIT URL을 받게 된다. 허나 다국어 랜더링 맥락에서는 resolver 클래스만 다를 뿐 LOCALDICTIONARY 세팅 -> translator 파이프 -> html랜더링 플로우는 변함없다.

```javascript
@Injectable({
    providedIn: 'root'
})
export class AdminProgramInitResolver implements Resolve<any>{
    constructor(private http: HttpClient) { }

    resolve(snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url = getInitUri(state.url);
        return this.fetchProgramScopeData(url);
    }

    fetchProgramScopeData(url: string): Observable<any> {
        return this.http.get(url, {
            observe: 'response',
        }).pipe(
            retry(2),
            map((res) => {
                try {
                    const dictionary = res.body["data"][COMMON_CONFIG.DICTIONARY];
                    settDictionary(dictionary);
                } catch (error) {
                    console.warn("Dictionary Setting FAILED");
                }
                if (res.headers.get(COMMON_CONFIG.ACCESS_TOKEN_HEADER)) {
                    localStorage.setItem(
                        COMMON_CONFIG.ACCESS_TOKEN,
                        res.headers.get(COMMON_CONFIG.ACCESS_TOKEN_HEADER));
                    console.warn("ACCESS TOKEN UPDATED")
                }
                if (res.headers.get(COMMON_CONFIG.REFRESH_TOKEN_HEADER)) {
                    localStorage.setItem(
                        COMMON_CONFIG.REFRESH_TOKEN,
                        res.headers.get(COMMON_CONFIG.REFRESH_TOKEN_HEADER));
                    console.warn("REFRESH TOKEN UPDATED")
                }
                return res.body;
            }),
            catchError((error: HttpErrorResponse, caught: Observable<HttpEvent<any>>) => {
                notify({ message: error.message, width: 500, position: 'top' }, 'error', 3000);
                new Error("AdminProgramInitResolver ERROR : " + error.status)
                return EMPTY;
            }));
    }
}
```

## 메뉴

### 메뉴 랜더링 디거깅 오더

1. admin.guard.ts
2. program.registry.ts
3. admin-pages.component.ts

### admin.guard.ts

앵굴러에서 지원하는 모듈 guard를 활용하여 canActivate 조건 충족시 route 랜딩을 허가한다.

```javascript
@Injectable()
export class AdminGuard extends CommonHttpService implements CanActivate {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    super(http);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<boolean> | boolean {
    if (!!localStorage.getItem("access") && !!localStorage.getItem("refresh")) {
      console.warn("admin guard")

      return this.http.get(REGISTRY.ADMINMENU.INIT).pipe(
        map(res => {
          let menu = [];
          parseProgramList(menu, res["list"]);
          setAdminLeft(menu);
          return true;
        })
      )
    } else {
      console.warn("BLOCKED : [ADMIN GUARD]");
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
```

#### *REGISTRY.ADMINMENU.INIT* url 호출시 기대 RESPONSE

```JSON
{
            "success": true,
            "code": 0,
            "msg": "성공하였습니다.",
            "transationTime": "2020-07-25T19:33:14.6371888",
            "list": [{
                    "uid": 10000,
                    "tenant": "1000",
                    "title": "MENU1",
                    "icon": "home-outline",
                    "menuPath": "10000",
                    "appUid": null,
                    "url": null,
                    "link": null,
                    "windowName": null,
                    "children": [{
                        "uid": 10002,
                        "tenant": "1000",
                        "title": "MENU3",
                        "icon": "home-outline",
                        "menuPath": "10000|10002",
                        "appUid": 90003,
                        "url": "http://www.jflab.co.kr:18001/api/v1/rec/receive",
                        "link": "/adminPages/CM/application3",
                        "windowName": "rcv",
                        "children": [],
                        "insFlg": "I3bf0faZOdYKsS5EhYGUStkWhWiBV8gBC5p1FG8xz5U=",
                        "updFlg": "LkhF1x2Eva7i9SYNof0fetkWhWiBV8gBC5p1FG8xz5U=",
                        "delFlg": ""
                    }],
                    "insFlg": null,
                    "updFlg": null,
                    "delFlg": null
                },
                {
                    "uid": 10001,
                    "tenant": "1000",
                    "title": "MENU2",
                    "icon": "home-outline",
                    "menuPath": "10001",
                    "appUid": 90001,
                    "url": "/CM/APP",
                    "link": "/CM/APP",
                    "windowName": null,
                    "children": [],
                    "insFlg": "02W4Lc/aYBMcIVioXkTauRnoFbEk1cqa4/mCe/vGkl8=",
                    "updFlg": "hmxY0gurkbZKWgPc6/F2T2S6MlbNlnG3Vit+rhh3swk=",
                    "delFlg": "POa4BMjxP1K9uqzyh5Sfbw40bL2g90IdSu66IniFxK4="
                }
            ],
        }
```

위와 같은 RESPONSE에는 각 권한 별 메뉴 랜딩시 호출되는 INIT URL(*"url"*)과 ~~CRUD권한 토큰~~, 앵귤러 routerlink (*"link"*)와 메뉴 랜더링에 필요한 메타정보(메뉴 타이틀, 아이콘명 등)가 포함되어 있다.

로그인 성공시 JSON WEB TOKEN을 받아 브라우져 로컬스토리지에 저장하여 권한을 설정하는 구조인 만큼, *access*와 *refresh* 값의 존재 여부를 확인해 모듈/컴포넌트 활성화를 컨트롤한다. 이때 조건이 참이라면, *parseProgramList*와 *setAdminLeft*를 각각 호출해 program.registry에  *ADMININITURI*와 *adminLeft* 상수값을 각각 업데이트 한다.

```javascript
const ADMININITURI = {};
let adminLeft = [];

...

export function setAdminLeft(menuArr: any[]) {
    adminLeft = menuArr;
}

export function getAdminLeft(): any[] {
    return adminLeft;
}
...

export function parseProgramList(returnedList: any[], insertedList: any[]): void {
    for (let menuObj of insertedList) {
        if (menuObj[COMMON_CONFIG.LINK]) {
            registerInitUri(menuObj[COMMON_CONFIG.LINK],
                {
                    url: menuObj[COMMON_CONFIG.URL],
                    windowName: menuObj[COMMON_CONFIG.WINDOWNAME],
                    insFlg: menuObj[COMMON_CONFIG.INSFLG],
                    updFlg: menuObj[COMMON_CONFIG.UPDFLG],
                    delFlg: menuObj[COMMON_CONFIG.DELFLG]
                })
        }

        const setting = {
            title: menuObj[COMMON_CONFIG.TITLE],
            icon: menuObj[COMMON_CONFIG.ICON],
            link: menuObj[COMMON_CONFIG.LINK],
        }

        if (Array.isArray(menuObj[COMMON_CONFIG.CHILDREN]) && menuObj[COMMON_CONFIG.CHILDREN].length) {
            if (menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.LINK]) {
                registerInitUri(menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.LINK],
                    {
                        url: menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.URL],
                        windowName: menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.WINDOWNAME],
                        insFlg: menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.INSFLG],
                        updFlg: menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.UPDFLG],
                        delFlg: menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.DELFLG]
                    })
            }
            setting[COMMON_CONFIG.CHILDREN] = [];
            parseProgramList(setting[COMMON_CONFIG.CHILDREN], menuObj[COMMON_CONFIG.CHILDREN]);
        }
        returnedList.push(setting);
    }
}
```

### 컴포넌트내 메뉴 사용 예시

```javascript
@Component({
  selector: 'ngx-admin-pages',
  styleUrls: ['admin-pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class AdminPagesComponent implements OnDestroy {

  menu: any[] = [];
  alive: boolean = true;

  constructor() {
    this.menu = getAdminLeft();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
```

## 비즈니스 CRUD 권한

### 유저별 CRUD 권한 설정 디거깅 오더

1. role.checker.ts

```javascript
@Injectable({ providedIn: 'root' })
export class RoleChecker {

    private pageRole: any;
    // {
    //     "updFlg": "TEakWBLbaGBK6svQPupZBg==",
    //     "delFlg": "/gXDdQxprXZcu9HgRIA+OA==",
    //     "infFlg": "c+ykL9OeM2NMlBaLwUGC+g=="
    //   },
    constructor() {
        const token = localStorage.getItem(COMMON_CONFIG.ACCESS_TOKEN);
        const decoded = jwt_decode(token);
        this.pageRole = decoded[COMMON_CONFIG.PAGEROLE];
    }
    public isGranted(abilities: any[]) {
        if (this.pageRole) {
            return abilities.filter((v, i, a) => {
                return !!this.pageRole[v];
            }).length == abilities.length;
        }
        return false
    }
}
```
각 메뉴별 비즈니스 프로그램내에서 유저가 가능한 CRUD를 설정 할 수 있다. 더 정확히 표현하면 CRUD액션을 트리거시키는 버튼을 앵귤러 \*ngIf 식으로 show/hide 토글하거나 특정 스크립트 내에서 *isGranted*함수를 호출해 권한(로컬스토리지에 JWT를 파싱해 체크가능)을 확인하는 것이다.

```html
...
<button onclick="delete()" *ngIf="roleChecker.isGranted(['delFlg'])" ></button>
...

```

## 서치헬프 - 공통코드 검색 컴포넌트

**서치헬프 디거깅 오더 :**

1. search-input-*.component.ts
2. search-helper.service.ts
3. search-helper.component.ts
4. wms-component.ts.

### 서치헬프 그리드 오픈 방법

- 스크립트 내에서 *SearchHelperService.openHelper*함수를 호출해 검색 그리드 오픈.

- html input 캐터고리 태그에 attribute로 설정함으로서 onchange 이벤트시 해당 input값을 조회하고
(매개변수로 특정 서치헬프 설정 객체를 초기값으로 받는다) 조회 실패시 검색 그리드 오픈.

#### look-up.directive.ts

```javascript
@Directive({
  selector: '[lookUp]',
})
export class LookUpDirective implements OnInit {

  @Input('lookUp') lookUp: any;

  constructor(
    private el: ElementRef,
    private shService: SearchHelperService
  ) { }

  doLookUp(value: string) {
    const searchKey: string = this.lookUp['key'];
    const queryStr = and(comparison(searchKey, eq(value)));
    this.shService.getMapWithoutView(searchKey, queryStr).subscribe(
      res => {
        this.lookUp['callback'](res,value);
      }
    )
  }

  @HostListener("change", ["$event.target.value"])
  onChange(value) {
    if (value) {
      this.doLookUp(value);
    }
  }

  ngOnInit() {
  }
}
```

#### html내 사용 예시

```html
...
<input type="text" [lookUp]="lookUp_PTNKEY" placeholder="파트너코드"/>
...
```

```javascript
//config객체 파라매터
lookUp_PTNKEY = {
    key: 'PTNKEY',
    callback: (res) => {
        if (res && res[0]) {
        this.dataObject.PTNKEY = res[0]['PTNKEY'];
        this.dataObject.PTNRNM = res[0]['PTNRNM'];
        } else {
        SearchHelperService.openHelper('PTNKEY', this.dataObject).subscribe(
            rowData => {
            for (let key of Object.keys(this.dataObject)) {
                this.dataObject[key] = rowData[key]
            }
            });
        }
    }
};
```

### *SearchHelperService.openHelper*함수 호출시 이벤트 플로우

서치헬프 컴포넌트는 전체 WMS모듈 공통이다. 즉, 단일 컴포넌트 SearchHelperComponent내에서 특정 서치헬프'키'에 따라 grid컬럼과 검색옵션들이 바뀐다.

#### 태크 위치

```javascript
@Component({
  selector: 'app-wms',
  template: `
  <router-outlet></router-outlet>
  <wms-search-helper></wms-search-helper>
`,
})

export class WmsComponent {
  constructor() { }
}
```

```HTML
...
    <!-- switch searchInput -->
        <ng-container [ngSwitch]="config.id">
          <ng-container *ngSwitchCase="'PTNKEY'">
            <wms-search-input-ptnkey [VO]="config.param"></wms-search-input-ptnkey>
          </ng-container>
          <ng-container *ngSwitchCase="'SKUKEY'">
            <wms-search-input-skukey [VO]="config.param"></wms-search-input-skukey>
          </ng-container>
        </ng-container>
      <!-- switch searchInput -->

      <!-- common grid -->
        <div style="clear:both">
          <dx-data-grid 
          #popGrid 
          [keyExpr]="config.pkCol"  
          height="400px"
          [dataSource]="dataSource" 
          [showBorders]="true"
          [focusedRowEnabled]="true" 
          (onRowDblClick)="onRowDblClick($event,'dbclick')"
          >
            <dxo-selection mode="single"></dxo-selection>

            <dxo-keyboard-navigation></dxo-keyboard-navigation>

            <dxi-column *ngFor="let col of config.gridConfig; i as index" 
            [caption]="col.caption" 
            [dataField]="col.dataField" 
            [width]="col.width" 
            [fixed]="col.fixed"
            alignment="center"
            >
            </dxi-column>

          </dx-data-grid>
        </div>
      <!-- common grid -->
...
```

서치헬프 모듈은 발행/구독 개념을 기반으로 한다. SearchHelperComponent는 생성 단계에서 부터 **RxJS Subject**객체 *SearchHelperService._control*을 '구독'하고 있다. *SearchHelperService*는 싱글톤 객체이며, **_control**의 값이 유져 이벤트나 스크립트로부터 '발행'될때 서치헬프 그리드 컴포넌트가 화면에 띄워진다.

```javascript
export class SearchHelperComponent extends CommonHttpService implements OnInit {
  ...
  public visibility: boolean;

  constructor(
    protected http: HttpClient,
    public thisService: SearchHelperService,
  ) {
    super(http);
    SearchHelperService._control.subscribe(
        ...
        this.visibility = true;
      });
  }

...


@Injectable({ providedIn: 'root' })
export class SearchHelperService extends CommonHttpService {

  static _control = new Subject<any>();

  static openHelper(helperKey: string, param?: any): Observable<any> {
    ...  
    this._control.next('PTNRKY');
    ...
  }
```

#### 샘플 WMS 거래처 코드 검색 search-helper : *SearchInputPtnkeyComponent*

- Grid설정

```javascript
export const HELPERCONFIG = {
    PTNKEY: {
        id: 'PTNKEY',
        title: '파트너 검색',
        gridConfig: PTNKEYGRIDCONFIG,
        pkCol: 'ID',
        url: REGISTRY.PTNKEYGRID.GET,
        param: new PTNKEYFORM(),
    },
  ...
}
//
export const PTNKEYGRIDCONFIG = [
    { caption: 'PTNKEY', dataField: "PTNKEY", width: 300, fixed: true, visible: true },
    { caption: 'PTNRNM', dataField: "PTNRNM", width: 300, fixed: true, visible: true },
    { caption: 'ACTFLG', dataField: "ACTFLG", width: 300, fixed: true, visible: true },
    { caption: 'BSNUMBER', dataField: "BSNUMBER", width: 300, fixed: true, visible: true },
    { caption: 'ptnname7', dataField: "CODEG", width: 300, fixed: true, visible: true },
    { caption: 'ptnname8', dataField: "CODEH", width: 300, fixed: true, visible: true },
    { caption: 'ptnname9', dataField: "CODEI", width: 300, fixed: true, visible: true },
]
```
