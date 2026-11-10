const projects=[
{id:1,title:'캠퍼스 공강 플래너',purpose:'과제',domain:'교육',lang:'JavaScript',score:100,likes:42,author:'campus_dev',desc:'시간표와 공강 시간을 분석해 학습 계획을 추천하는 서비스',req:'시간표 등록, 공강 시간 계산, 일정 추천',code:"// 캠퍼스 공강 플래너 · 100% 예시 구현\nconst sampleSchedule = [\n  { day: \"월\", start: 9, end: 10, title: \"전공\", busy: true },\n  { day: \"월\", start: 10, end: 12, title: \"공강\", busy: false },\n  { day: \"월\", start: 13, end: 15, title: \"교양\", busy: true }\n];\n\nfunction registerSchedule(schedule, item) {\n  if (!item.day || item.start >= item.end) throw new Error(\"시간표 입력을 확인하세요.\");\n  schedule.push({ ...item, busy: true });\n  return schedule;\n}\nfunction findFreeTime(schedule) {\n  return schedule.filter(slot => !slot.busy);\n}\nfunction recommendStudyPlan(schedule) {\n  return findFreeTime(schedule).map(slot => ({\n    day: slot.day, start: slot.start, end: slot.end,\n    recommendation: \"공강 시간 학습 계획\"\n  }));\n}\nfunction renderPlan(schedule) {\n  return recommendStudyPlan(schedule)\n    .map(x => `${x.day} ${x.start}:00-${x.end}:00 ${x.recommendation}`)\n    .join(\"\\\\n\") || \"등록된 공강이 없습니다.\";\n}\nconsole.log(renderPlan(sampleSchedule));",date:'오늘'},
{id:2,title:'개인 지출 관리 앱',purpose:'연습',domain:'금융',lang:'Python',score:92,likes:31,author:'dev_study',desc:'지출 내역을 카테고리별로 분류하고 월별 합계를 제공',req:'지출 등록, 카테고리 분류, 월별 합계',code:"# 개인 지출 관리 앱 · 92% 예시 구현\nfrom collections import defaultdict\nfrom datetime import date\n\nexpenses = []\n\ndef add_expense(amount, category, memo=\"\", spent_on=None):\n    if amount <= 0:\n        raise ValueError(\"지출 금액은 0보다 커야 합니다.\")\n    item = {\n        \"amount\": amount,\n        \"category\": category.strip() or \"기타\",\n        \"memo\": memo,\n        \"date\": spent_on or date.today().isoformat()\n    }\n    expenses.append(item)\n    return item\n\ndef summarize_by_category(items):\n    totals = defaultdict(int)\n    for item in items:\n        totals[item[\"category\"]] += item[\"amount\"]\n    return dict(totals)\n\ndef monthly_total(items, year_month):\n    return sum(\n        item[\"amount\"] for item in items\n        if item[\"date\"].startswith(year_month)\n    )\n\nadd_expense(12000, \"식비\", \"점심\", \"2026-11-10\")\nadd_expense(3500, \"교통\", \"버스\", \"2026-11-10\")\nprint(\"카테고리별:\", summarize_by_category(expenses))\nprint(\"월 합계:\", monthly_total(expenses, \"2026-11\"))\n\n# 92% 상태: 월별 비교 차트/예산 초과 알림은 아직 연결되지 않은 예시",date:'어제'},
{id:3,title:'소상공인 예약 관리 SaaS',purpose:'창업',domain:'생산성',lang:'Java',score:88,likes:27,author:'startup_lab',desc:'예약 등록과 일정 중복 검사를 제공하는 관리 서비스',req:'예약 등록, 시간 중복 확인, 취소 처리',code:"// 소상공인 예약 관리 SaaS · 88% 예시 구현 (Java)\nimport java.time.LocalDateTime;\nimport java.util.ArrayList;\nimport java.util.List;\n\nclass Booking {\n    final String customer;\n    final LocalDateTime start;\n    final LocalDateTime end;\n    boolean cancelled;\n\n    Booking(String customer, LocalDateTime start, LocalDateTime end) {\n        if (customer == null || customer.isBlank() || !start.isBefore(end)) {\n            throw new IllegalArgumentException(\"예약 정보를 확인하세요.\");\n        }\n        this.customer = customer;\n        this.start = start;\n        this.end = end;\n        this.cancelled = false;\n    }\n}\n\nclass BookingManager {\n    private final List<Booking> bookings = new ArrayList<>();\n\n    boolean hasConflict(LocalDateTime start, LocalDateTime end) {\n        return bookings.stream().anyMatch(b ->\n            !b.cancelled && start.isBefore(b.end) && end.isAfter(b.start)\n        );\n    }\n\n    boolean addBooking(Booking booking) {\n        if (hasConflict(booking.start, booking.end)) return false;\n        bookings.add(booking);\n        return true;\n    }\n\n    List<Booking> getBookings() {\n        return bookings.stream().filter(b -> !b.cancelled).toList();\n    }\n\n    // 88% 상태: 예약 취소 이력 관리와 관리자 권한 검증은 추가 구현 필요\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BookingManager manager = new BookingManager();\n        Booking first = new Booking(\"고객A\",\n            LocalDateTime.of(2026, 11, 10, 14, 0),\n            LocalDateTime.of(2026, 11, 10, 15, 0));\n        System.out.println(manager.addBooking(first) ? \"예약 완료\" : \"시간 중복\");\n    }\n}",date:'2일 전'},
{id:4,title:'온라인 중고거래 게시판',purpose:'포트폴리오',domain:'쇼핑·커머스',lang:'TypeScript',score:80,likes:19,author:'webmaker',desc:'상품 등록, 검색, 관심 상품 저장 기능',req:'상품 등록, 검색, 좋아요',code:`// 온라인 중고거래 게시판 · 80% 예시 구현 (TypeScript)
type Product = { id:number; title:string; price:number; seller:string };
const products: Product[] = [];
const favorites = new Set<number>();

function registerProduct(title:string, price:number, seller:string): Product {
  if (!title.trim() || price < 0 || !seller.trim()) throw new Error("상품 정보를 확인하세요.");
  const product = { id: Date.now(), title:title.trim(), price, seller:seller.trim() };
  products.push(product);
  return product;
}
function searchProducts(keyword:string): Product[] {
  const q = keyword.trim().toLowerCase();
  return products.filter(p => p.title.toLowerCase().includes(q));
}
function toggleFavorite(productId:number): boolean {
  if (favorites.has(productId)) { favorites.delete(productId); return false; }
  if (!products.some(p => p.id === productId)) throw new Error("상품을 찾을 수 없습니다.");
  favorites.add(productId); return true;
}
// 80% 상태: 실제 서버 저장·로그인 사용자별 동기화는 미구현
registerProduct("중고 키보드", 25000, "판매자A");
console.log(searchProducts("키보드"));
console.log("관심 상품 등록:", toggleFavorite(products[0].id));`,date:'3일 전'},
{id:5,title:'운동 기록 트래커',purpose:'연습',domain:'헬스케어',lang:'Kotlin',score:74,likes:12,author:'kotlin_beginner',desc:'운동 기록과 주간 통계를 확인하는 앱',req:'운동 등록, 기록 조회, 주간 통계',code:`// 운동 기록 트래커 · 74% 예시 구현 (Kotlin)
data class Workout(val name:String, val minutes:Int, val date:String)

class WorkoutTracker {
    private val records = mutableListOf<Workout>()

    fun addWorkout(name:String, minutes:Int, date:String): Workout {
        require(name.isNotBlank()) { "운동명을 입력하세요." }
        require(minutes > 0) { "운동 시간은 0보다 커야 합니다." }
        val item = Workout(name, minutes, date)
        records.add(item)
        return item
    }

    fun getRecords(): List<Workout> = records.toList()

    fun weeklyTotal(): Int = records.sumOf { it.minutes }
    // 74% 상태: 주간 날짜 범위 필터와 통계 시각화는 미구현
}

fun main() {
    val tracker = WorkoutTracker()
    tracker.addWorkout("걷기", 30, "2026-11-10")
    tracker.addWorkout("근력 운동", 45, "2026-11-10")
    println("운동 기록: \${tracker.getRecords()}")
    println("총 운동 시간: \${tracker.weeklyTotal()}분")
}`,date:'4일 전'}
];
let purposeFilter='전체', currentMode='file', currentProject=null, user=null, likes=new Set(), imports=new Set(), myProjects=[];
const STORAGE_KEY='specCheckAI_accounts_v1', SESSION_KEY='specCheckAI_session_v1';
function readAccounts(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch(e){return {}}}
function writeAccounts(data){localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}
function accountKey(email){return String(email||'').trim().toLowerCase()}
function saveAccountData(){
 if(!user)return;
 const accounts=readAccounts(), key=accountKey(user.email);
 accounts[key]={name:user.name,email:user.email,projects:myProjects,likes:[...likes],imports:[...imports]};
 writeAccounts(accounts);
}
function loadAccountData(email){
 const data=readAccounts()[accountKey(email)]||{};
 myProjects=Array.isArray(data.projects)?data.projects:[];
 likes=new Set(Array.isArray(data.likes)?data.likes:[]);
 imports=new Set(Array.isArray(data.imports)?data.imports:[]);
}
function restoreSession(){
 try{
  const saved=JSON.parse(localStorage.getItem(SESSION_KEY)||'null');
  if(saved&&saved.email){user={name:saved.name||'',email:saved.email};loadAccountData(user.email);}
 }catch(e){user=null;}
}
restoreSession();
function go(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===id));if(id==='list')renderList();if(id==='mypage')renderMy();window.scrollTo({top:0,behavior:'smooth'})}
function projectCard(p){return `<div class="project"><div class="between"><span class="project-title">${esc(p.title)}</span><span class="score">${p.score}%</span></div><div class="progress"><i style="width:${p.score}%"></i></div><p>${esc(p.desc)}</p><div>${tag(p.purpose)}${tag(p.domain)}${tag(p.lang)}</div><div class="between" style="margin-top:8px"><span class="muted" style="font-size:10px">by ${esc(p.author)} · ♥ ${p.likes}</span><span class="tag green">${p.score>=90?'우수':p.score>=80?'양호':'개선 중'}</span></div><div class="actions"><button class="btn mini line" onclick="likeProject(${p.id})">${likes.has(p.id)?'♥ 좋아요 취소':'♡ 좋아요'}</button><button class="btn mini light" onclick="importProject(${p.id})">명세 가져오기</button><button class="btn mini" onclick="viewProject(${p.id})">확인</button></div></div>`}
function tag(t){return `<span class="tag">${esc(t)}</span>`}
function renderHome(){document.getElementById('rankList').innerHTML=[...projects].sort((a,b)=>b.score-a.score).slice(0,3).map(projectCard).join('');document.getElementById('recentList').innerHTML=[...projects].slice().reverse().slice(0,2).map(projectCard).join('')}
function setPurpose(p,el){purposeFilter=p;document.querySelectorAll('#homePurpose button').forEach(b=>b.classList.remove('sel'));el.classList.add('sel');let arr=p==='전체'?projects:projects.filter(x=>x.purpose===p);document.getElementById('recentList').innerHTML=arr.map(projectCard).join('')||'<p>해당 목적의 공개 프로젝트가 없습니다.</p>'}
function filterPurpose(p,el){purposeFilter=p;document.querySelectorAll('#purposeFilters button').forEach(b=>b.classList.remove('sel'));el.classList.add('sel');renderList()}
function renderList(){let q=(document.getElementById('searchInput').value||'').toLowerCase(),d=document.getElementById('domainFilter').value,l=document.getElementById('langFilter').value;let arr=projects.filter(p=>(purposeFilter==='전체'||p.purpose===purposeFilter)&&(d==='전체'||p.domain===d)&&(l==='전체'||p.lang===l)&&(`${p.title} ${p.desc} ${p.author}`.toLowerCase().includes(q)));document.getElementById('allList').innerHTML=arr.map(projectCard).join('')||'<div class="card"><p>조건에 맞는 스펙체크가 없습니다.</p></div>';document.getElementById('listCount').textContent=arr.length+'개 결과'}
function likeProject(id){if(!user){alert('좋아요를 저장하려면 로그인해 주세요.');openAuth();return}if(likes.has(id))likes.delete(id);else likes.add(id);saveAccountData();renderHome();renderList();renderMy()}
function importProject(id){
 if(!user){alert('명세를 내 계정에 저장하려면 로그인해 주세요.');openAuth();return}
 const p=projects.find(x=>x.id===id); if(!p)return;
 // 가져오기 대상은 선택한 공개 프로젝트의 데이터로 고정한다.
 // 현재 사용자가 이전에 작성한 코드나 임시 편집값은 절대 복사하지 않는다.
 // 중요: 현재 작성 중인 내 코드/이전 스펙체크를 재사용하지 않고,
 // 선택한 공개 프로젝트 객체의 명세와 해당 프로젝트 전용 예시 코드만 복사한다.
 currentProject={...p, importedBenchmark:true, benchmarkScore:p.score};
 const benchmarkNotice=document.getElementById('importBenchmarkNotice');
 if(benchmarkNotice){benchmarkNotice.classList.remove('hide');benchmarkNotice.textContent='가져온 공개 프로젝트 기준 완성률: '+p.score+'% · 아래 코드는 '+p.title+'에 등록된 프로젝트 전용 예시 코드입니다. 내 이전 코드는 사용하지 않습니다.';}
 imports.add(id); saveAccountData();
 document.getElementById('projName').value=p.title+' (명세 가져오기)';
 document.getElementById('purpose').value=p.purpose;
 document.getElementById('domain').value=p.domain;
 document.getElementById('language').value=p.lang;
 document.getElementById('requirements').value=p.req;
 const codeBox=document.getElementById('codeText');
 if(codeBox) {
   codeBox.value='';
   codeBox.value=String(p.code || '// 선택한 프로젝트에 공개된 코드가 없습니다. [확인 필요]');
 }
 codeMode('write');
 go('check'); checkStep(2);
 alert(p.score+'% 완성률인 ['+p.title+'] 프로젝트 전용 코드와 명세를 가져왔습니다. 이전에 작성한 내 코드는 가져오지 않았습니다.');
}
function viewProject(id){let p=projects.find(x=>x.id===id);alert(`프로젝트: ${p.title}\\n완성률: ${p.score}%\\n목적: ${p.purpose}\\n도메인: ${p.domain}\\n언어: ${p.lang}\\n\\n요구사항: ${p.req}\\n\\n설명: ${p.desc}\\n\\n※ 공개 예시 데이터입니다.`)}
function checkStep(n){[1,2,3].forEach(i=>{document.getElementById('check'+i).classList.toggle('hide',i!==n);document.getElementById('tab'+i).classList.toggle('sel',i===n);document.getElementById('s'+i).classList.toggle('on',i<=n)})}
function suggestCategory(){
 let t=(document.getElementById('projName').value+' '+document.getElementById('requirements').value).toLowerCase();
 let choices=[
  {keys:['과제','강의','수업','학생','시간표','학습','시험'],purpose:'과제',domain:'교육',why:'학습·수업·학생을 지원하는 서비스로 보여 교육 도메인을 추천합니다.'},
  {keys:['판매','상품','쇼핑','주문','장바구니','결제'],purpose:'창업',domain:'쇼핑·커머스',why:'상품 탐색이나 거래 흐름이 핵심인 서비스로 보여 커머스 도메인을 추천합니다.'},
  {keys:['예약','매장','고객','구독','사업','창업','매출'],purpose:'창업',domain:'생산성',why:'고객 운영 또는 사업 운영 문제를 해결하는 서비스로 보여 창업 목적을 추천합니다.'},
  {keys:['운동','건강','병원','식단','수면'],purpose:'연습',domain:'헬스케어',why:'건강·운동 데이터를 다루는 서비스로 보여 헬스케어 도메인을 추천합니다.'},
  {keys:['돈','지출','가계부','투자','금융','예산'],purpose:'연습',domain:'금융',why:'금전 흐름을 기록·분석하는 서비스로 보여 금융 도메인을 추천합니다.'},
  {keys:['게시판','채팅','모임','친구','커뮤니티'],purpose:'포트폴리오',domain:'커뮤니티',why:'사용자 간 소통과 콘텐츠 공유가 중심인 서비스로 보여 커뮤니티 도메인을 추천합니다.'}
 ];
 let hit=choices.find(c=>c.keys.some(k=>t.includes(k)));
 if(!hit)hit={purpose:'연습',domain:'기타',why:'현재 설명만으로 도메인을 특정하기 어렵습니다. 우선 연습·기타로 설정하고, 실제 사용 대상과 해결 문제를 팀에서 확인해 주세요.'};
 document.getElementById('purpose').value=hit.purpose;document.getElementById('domain').value=hit.domain;
 document.getElementById('categoryHint').textContent='추천: '+hit.purpose+' / '+hit.domain+' — '+hit.why+' (자동 추천이므로 최종 분류는 직접 확인하세요.)';
}
function fillReq(){document.getElementById('requirements').value='사용자는 계정을 만들고 로그인할 수 있어야 한다.\\n사용자는 새로운 항목을 등록하고 수정 및 삭제할 수 있어야 한다.\\n목록은 생성일 또는 상태 기준으로 정렬할 수 있어야 한다.\\n각 항목의 상태를 완료 또는 진행 중으로 변경할 수 있어야 한다.\\n입력값이 비어 있으면 사용자에게 오류 메시지를 보여줘야 한다.'}
function validateStep1(){if(!document.getElementById('projName').value.trim()||!document.getElementById('requirements').value.trim()){alert('프로젝트명과 요구사항을 입력해 주세요.');return}checkStep(2)}
function codeMode(m){currentMode=m;document.getElementById('fileMode').classList.toggle('hide',m!=='file');document.getElementById('writeMode').classList.toggle('hide',m!=='write');document.getElementById('uploadChoice').className=m==='file'?'btn light':'btn line';document.getElementById('writeChoice').className=m==='write'?'btn light':'btn line'}
function loadCodeFile(e){let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{document.getElementById('codeText').value=r.result;codeMode('write')};r.readAsText(f)}
function validateCode(){let code=document.getElementById('codeText').value.trim();if(currentMode==='file'&&!code){let f=document.getElementById('codeFile').files[0];if(!f){alert('파일을 선택하거나 직접 코드 작성 방식을 선택해 주세요.');return}let r=new FileReader();r.onload=()=>{document.getElementById('codeText').value=r.result;runAnalysis(r.result)};r.readAsText(f);return}if(!code){alert('코드를 입력해 주세요.');return}runAnalysis(code)}
function runAnalysis(code){
 let lang=document.getElementById('language').value,req=document.getElementById('requirements').value;
 // Demo heuristics only: generic structural indicators, not semantic correctness.
 let patterns=[['입력·등록 처리',/input|prompt|request|get|post|scanf|readLine|Scanner|append|push|insert|save/i],['데이터 구조·모델',/class|struct|interface|data class|list|array|dict|map|object|model/i],['수정·상태 변경',/update|edit|set[A-Z_]|toggle|status|completed|done|put|patch/i],['조회·출력',/print|console\.log|System\.out|printf|return|render|display|select/i],['예외·유효성 처리',/try|catch|except|throw|if\s*\(|if\s+|validate|error|assert/i],['정렬·검색 처리',/sort|sorted|filter|find|search|orderBy|compare/i]];
 let hits=patterns.map(([n,re])=>({name:n,ok:re.test(code)}));let score=Math.round(hits.filter(x=>x.ok).length/hits.length*100);
 const importedBenchmark=!!currentProject?.importedBenchmark, benchmarkScore=currentProject?.benchmarkScore;
 currentProject={id:Date.now(),title:document.getElementById('projName').value,purpose:document.getElementById('purpose').value,domain:document.getElementById('domain').value,lang,score,likes:0,author:user?.name||'guest',desc:req.slice(0,95),req,code,visibility:document.getElementById('visibility').value,hits,importedBenchmark,benchmarkScore};
 document.getElementById('overview').innerHTML=`<div class="listrow"><b>프로젝트</b><p>${esc(currentProject.title)}</p></div><div class="listrow"><b>분류</b><p>${tag(currentProject.purpose)}${tag(currentProject.domain)}${tag(lang)}</p></div><div class="listrow"><b>요구사항</b><p>${esc(req)}</p></div><div class="listrow"><b>등록 코드</b><p>${esc(code.slice(0,240))}${code.length>240?'…':''}</p></div>`;
 if(currentProject?.importedBenchmark) score=currentProject.benchmarkScore; document.getElementById('myScore').textContent=score+'%';document.getElementById('matched').textContent=hits.filter(x=>x.ok).length;document.getElementById('missing').textContent=hits.filter(x=>!x.ok).length;
 document.getElementById('detailResults').innerHTML=hits.map(x=>`<div class="between listrow"><span style="font-size:12px">${x.name}</span><span class="status ${x.ok?'ok':'bad'}">${x.ok?'관련 패턴 감지':'확인 필요'}</span></div>`).join('');
 document.getElementById('moreReport').classList.add('hide');checkStep(3)
}
function showMore(){let depth=document.getElementById('reportDepth').value,el=document.getElementById('moreReport');el.textContent=depth==='기본 요약'?'기본 요약: 코드에서 확인된 일반 패턴을 요구사항 검토 항목에 대응했습니다.':depth.startsWith('상세')?'상세 분석: 각 항목의 관련 구현 위치와 실제 동작을 개발자가 직접 확인해야 합니다. 누락 항목은 구현 후 동일 조건으로 재검증하세요. 개선 제안: 입력 검증, 빈 값 처리, 중복 데이터 처리, 오류 메시지, 경계값 테스트를 추가하세요.':'개발자용 검토: 정상 입력, 빈 입력, 잘못된 자료형, 중복 데이터, 경계값, 권한 없는 요청에 대한 테스트 케이스를 작성하세요. 자동 테스트와 실행 환경별 검증이 추가로 필요합니다.';el.classList.remove('hide')}
function publishProject(){
 if(!currentProject)return;
 if(!user){alert('스펙체크 기록을 저장하려면 먼저 로그인해 주세요.');openAuth();return}
 myProjects.unshift({...currentProject,ownerEmail:user.email,createdAt:new Date().toISOString()});
 if(currentProject.visibility==='공개')projects.unshift(currentProject);
 saveAccountData();
 document.getElementById('totalCount').textContent=128+projects.length-5;
 renderHome();alert(currentProject.visibility==='공개'?'스펙체크 기록이 계정에 저장되고 목록에 공개 등록되었습니다.':'스펙체크 기록이 내 계정에 저장되었습니다.');go('mypage')
}
function renderMy(){
 document.getElementById('myName').textContent=user?.name||'비회원 사용자';
 document.getElementById('myEmail').textContent=user?.email||'로그인하면 개인 목록을 관리할 수 있습니다.';
 document.getElementById('myProjects').textContent=user?myProjects.length:'-';
 document.getElementById('myLikes').textContent=user?likes.size:'-';
 document.getElementById('myImports').textContent=user?imports.size:'-';
 document.getElementById('myLoginGate').classList.toggle('hide',!!user);
 document.getElementById('myProjectList').classList.toggle('hide',!user);
 document.getElementById('newSpecBtn').classList.toggle('hide',!user);
 document.getElementById('likedList').innerHTML=user?[...likes].map(id=>{let p=projects.find(x=>x.id===id);return p?`<div class="listrow">${esc(p.title)}</div>`:''}).join('')||'<p>좋아요한 프로젝트가 없습니다.</p>':'<p>내 기록을 보려면 로그인하세요.</p>';
 document.getElementById('importList').innerHTML=user?[...imports].map(id=>{let p=projects.find(x=>x.id===id);return p?`<div class="listrow">${esc(p.title)}</div>`:''}).join('')||'<p>가져온 명세가 없습니다.</p>':'<p>내 기록을 보려면 로그인하세요.</p>';
 document.getElementById('myProjectList').innerHTML=user?myProjects.map(p=>`<div class="listrow"><b>${esc(p.title)}</b><span class="tag blue">${p.score}%</span><p>${esc(p.purpose)} · ${esc(p.lang)}</p></div>`).join('')||'<p>아직 등록한 프로젝트가 없습니다.</p>':'';
}
function openAuth(){
 const accounts=readAccounts(), last=JSON.parse(localStorage.getItem('specCheckAI_lastAccount')||'null');
 if(last){document.getElementById('loginName').value=last.name||'';document.getElementById('loginEmail').value=last.email||''}
 document.getElementById('authModal').classList.add('show')
}
function closeAuth(){document.getElementById('authModal').classList.remove('show')}
function login(){
 let name=document.getElementById('loginName').value.trim(),email=document.getElementById('loginEmail').value.trim();
 if(!name||!email.includes('@')){alert('아이디와 올바른 이메일을 입력해 주세요.');return}
 const key=accountKey(email), accounts=readAccounts(), previous=accounts[key];
 // The email is the demo account key; a saved profile name is restored when the same email is used.
 user={name:previous?.name||name,email:previous?.email||email};
 loadAccountData(email);
 localStorage.setItem(SESSION_KEY,JSON.stringify(user));
 localStorage.setItem('specCheckAI_lastAccount',JSON.stringify(user));
 accounts[key]={name:user.name,email:user.email,projects:myProjects,likes:[...likes],imports:[...imports]};
 writeAccounts(accounts);
 document.getElementById('userLabel').textContent=user.name;
 document.getElementById('authBtn').textContent='로그아웃';
 document.getElementById('authBtn').onclick=logout;
 closeAuth();renderMy();
}
function logout(){
 saveAccountData();
 user=null;myProjects=[];likes=new Set();imports=new Set();
 localStorage.removeItem(SESSION_KEY);
 document.getElementById('userLabel').textContent='비회원';
 document.getElementById('authBtn').textContent='로그인';
 document.getElementById('authBtn').onclick=openAuth;
 renderMy();
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
if(user){document.getElementById('userLabel').textContent=user.name;document.getElementById('authBtn').textContent='로그아웃';document.getElementById('authBtn').onclick=logout}
renderHome();renderList();renderMy();
