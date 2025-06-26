import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Copy,
  ExternalLink,
  MoreVertical,
} from "lucide-react";

// 실제 일본어 상용한자 데이터
const kanjiData = {
  elementary1: [
    // 초등학교 1학년 (80자)
    { kanji: "車", reading: "シャ、くるま", meaning: "수레 차" },
    { kanji: "犬", reading: "ケン、いぬ", meaning: "개 견" },
    { kanji: "見", reading: "ケン、み", meaning: "볼 견" },
    { kanji: "空", reading: "クウ、そら", meaning: "하늘 공" },
    { kanji: "校", reading: "コウ", meaning: "학교 교" },
    { kanji: "九", reading: "キュウ、ここの", meaning: "아홉 구" },
    { kanji: "口", reading: "コウ、くち", meaning: "입 구" },
    { kanji: "金", reading: "キン、かね", meaning: "쇠 금" },
    { kanji: "気", reading: "キ、け", meaning: "기운 기" },
    { kanji: "男", reading: "ダン、おとこ", meaning: "사내 남" },
    { kanji: "女", reading: "ジョ、おんな", meaning: "계집 여" },
    { kanji: "年", reading: "ネン、とし", meaning: "해 년" },
    { kanji: "大", reading: "ダイ、おお", meaning: "클 대" },
    { kanji: "力", reading: "リョク、ちから", meaning: "힘 력" },
    { kanji: "六", reading: "ロク、むっ", meaning: "여섯 육" },
    { kanji: "林", reading: "リン、はやし", meaning: "숲 림" },
    { kanji: "立", reading: "リツ、た", meaning: "설 립" },
    { kanji: "名", reading: "メイ、な", meaning: "이름 명" },
    { kanji: "木", reading: "ボク、き", meaning: "나무 목" },
    { kanji: "目", reading: "モク、め", meaning: "눈 목" },
    { kanji: "文", reading: "ブン、ふみ", meaning: "글 문" },
    { kanji: "白", reading: "ハク、しろ", meaning: "흰 백" },
    { kanji: "百", reading: "ヒャク、もも", meaning: "일백 백" },
    { kanji: "本", reading: "ホン、もと", meaning: "근본 본" },
    { kanji: "四", reading: "シ、よん", meaning: "넷 사" },
    { kanji: "糸", reading: "シ、いと", meaning: "실 사" },
    { kanji: "山", reading: "サン、やま", meaning: "메 산" },
    { kanji: "三", reading: "サン、みっ", meaning: "셋 삼" },
    { kanji: "森", reading: "シン、もり", meaning: "숲 삼" },
    { kanji: "上", reading: "ジョウ、うえ", meaning: "위 상" },
    { kanji: "生", reading: "セイ、い", meaning: "날 생" },
    { kanji: "夕", reading: "セキ、ゆう", meaning: "저녁 석" },
    { kanji: "石", reading: "セキ、いし", meaning: "돌 석" },
    { kanji: "先", reading: "セン、さき", meaning: "먼저 선" },
    { kanji: "小", reading: "ショウ、ちい", meaning: "작을 소" },
    { kanji: "水", reading: "スイ、みず", meaning: "물 수" },
    { kanji: "手", reading: "シュ、て", meaning: "손 수" },
    { kanji: "十", reading: "ジュウ、とお", meaning: "열 십" },
    { kanji: "五", reading: "ゴ、いつ", meaning: "다섯 오" },
    { kanji: "玉", reading: "ギョク、たま", meaning: "구슬 옥" },
    { kanji: "王", reading: "オウ", meaning: "임금 왕" },
    { kanji: "右", reading: "ウ、みぎ", meaning: "오른쪽 우" },
    { kanji: "雨", reading: "ウ、あめ", meaning: "비 우" },
    { kanji: "円", reading: "エン、まる", meaning: "둥글 원" },
    { kanji: "月", reading: "ゲツ、つき", meaning: "달 월" },
    { kanji: "音", reading: "オン、おと", meaning: "소리 음" },
    { kanji: "二", reading: "ニ、ふた", meaning: "둘 이" },
    { kanji: "耳", reading: "ジ、みみ", meaning: "귀 이" },
    { kanji: "人", reading: "ジン、ひと", meaning: "사람 인" },
    { kanji: "一", reading: "イチ、ひと", meaning: "하나 일" },
    { kanji: "日", reading: "ニチ、ひ", meaning: "날 일" },
    { kanji: "入", reading: "ニュウ、い", meaning: "들 입" },
    { kanji: "子", reading: "シ、こ", meaning: "아들 자" },
    { kanji: "字", reading: "ジ、あざ", meaning: "글자 자" },
    { kanji: "赤", reading: "セキ、あか", meaning: "붉을 적" },
    { kanji: "田", reading: "デン、た", meaning: "밭 전" },
    { kanji: "正", reading: "セイ、ただ", meaning: "바를 정" },
    { kanji: "町", reading: "チョウ、まち", meaning: "고을 정" },
    { kanji: "早", reading: "ソウ、はや", meaning: "일찍 조" },
    { kanji: "足", reading: "ソク、あし", meaning: "발 족" },
    { kanji: "左", reading: "サ、ひだり", meaning: "왼쪽 좌" },
    { kanji: "竹", reading: "チク、たけ", meaning: "대나무 죽" },
    { kanji: "中", reading: "チュウ、なか", meaning: "가운데 중" },
    { kanji: "千", reading: "セン、ち", meaning: "일천 천" },
    { kanji: "川", reading: "セン、かわ", meaning: "내 천" },
    { kanji: "天", reading: "テン、あめ", meaning: "하늘 천" },
    { kanji: "青", reading: "セイ、あお", meaning: "푸를 청" },
    { kanji: "草", reading: "ソウ、くさ", meaning: "풀 초" },
    { kanji: "村", reading: "ソン、むら", meaning: "마을 촌" },
    { kanji: "出", reading: "シュツ、で", meaning: "날 출" },
    { kanji: "虫", reading: "チュウ、むし", meaning: "벌레 충" },
    { kanji: "七", reading: "シチ、なな", meaning: "일곱 칠" },
    { kanji: "土", reading: "ド、つち", meaning: "흙 토" },
    { kanji: "八", reading: "ハチ、やっ", meaning: "여덟 팔" },
    { kanji: "貝", reading: "バイ、かい", meaning: "조개 패" },
    { kanji: "下", reading: "カ、した", meaning: "아래 하" },
    { kanji: "学", reading: "ガク、まな", meaning: "배울 학" },
    { kanji: "火", reading: "カ、ひ", meaning: "불 화" },
    { kanji: "花", reading: "カ、はな", meaning: "꽃 화" },
    { kanji: "休", reading: "キュウ、やす", meaning: "쉴 휴" },
  ],
  elementary2: [
    // 초등학교 2학년 (160자)
    { kanji: "家", reading: "カ、いえ", meaning: "집 가" },
    { kanji: "歌", reading: "カ、うた", meaning: "노래 가" },
    { kanji: "角", reading: "カク、つの", meaning: "뿔 각" },
    { kanji: "間", reading: "カン、あいだ", meaning: "사이 간" },
    { kanji: "強", reading: "キョウ、つよ", meaning: "강할 강" },
    { kanji: "京", reading: "キョウ", meaning: "서울 경" },
    { kanji: "計", reading: "ケイ、はか", meaning: "셀 계" },
    { kanji: "古", reading: "コ、ふる", meaning: "예 고" },
    { kanji: "考", reading: "コウ、かんが", meaning: "생각할 고" },
    { kanji: "高", reading: "コウ、たか", meaning: "높을 고" },
    { kanji: "谷", reading: "コク、たに", meaning: "골 곡" },
    { kanji: "工", reading: "コウ", meaning: "장인 공" },
    { kanji: "公", reading: "コウ", meaning: "공평할 공" },
    { kanji: "科", reading: "カ", meaning: "과목 과" },
    { kanji: "広", reading: "コウ、ひろ", meaning: "넓을 광" },
    { kanji: "光", reading: "コウ、ひかり", meaning: "빛 광" },
    { kanji: "交", reading: "コウ、まじ", meaning: "사귈 교" },
    { kanji: "教", reading: "キョウ、おし", meaning: "가르칠 교" },
    { kanji: "国", reading: "コク、くに", meaning: "나라 국" },
    { kanji: "弓", reading: "キュウ、ゆみ", meaning: "활 궁" },
    { kanji: "帰", reading: "キ、かえ", meaning: "돌아갈 귀" },
    { kanji: "近", reading: "キン、ちか", meaning: "가까울 근" },
    { kanji: "今", reading: "コン、いま", meaning: "이제 금" },
    { kanji: "汽", reading: "キ", meaning: "물끓는김 기" },
    { kanji: "記", reading: "キ", meaning: "기록할 기" },
    { kanji: "南", reading: "ナン、みなみ", meaning: "남녘 남" },
    { kanji: "内", reading: "ナイ、うち", meaning: "안 내" },
    { kanji: "多", reading: "タ、おお", meaning: "많을 다" },
    { kanji: "茶", reading: "チャ", meaning: "차 차" },
    { kanji: "答", reading: "トウ、こた", meaning: "대답 답" },
    { kanji: "当", reading: "トウ、あ", meaning: "마땅 당" },
    { kanji: "台", reading: "ダイ", meaning: "대 대" },
    { kanji: "刀", reading: "トウ、かたな", meaning: "칼 도" },
    { kanji: "図", reading: "ズ", meaning: "그림 도" },
    { kanji: "道", reading: "ドウ、みち", meaning: "길 도" },
    { kanji: "読", reading: "ドク、よ", meaning: "읽을 독" },
    { kanji: "冬", reading: "トウ、ふゆ", meaning: "겨울 동" },
    { kanji: "同", reading: "ドウ、おな", meaning: "한가지 동" },
    { kanji: "東", reading: "トウ、ひがし", meaning: "동녘 동" },
    { kanji: "頭", reading: "トウ、あたま", meaning: "머리 두" },
    { kanji: "楽", reading: "ガク、たの", meaning: "즐길 락" },
    { kanji: "来", reading: "ライ、く", meaning: "올 래" },
    { kanji: "里", reading: "リ、さと", meaning: "마을 리" },
    { kanji: "理", reading: "リ", meaning: "다스릴 리" },
    { kanji: "馬", reading: "バ、うま", meaning: "말 마" },
    { kanji: "万", reading: "マン", meaning: "일만 만" },
    { kanji: "毎", reading: "マイ", meaning: "매양 매" },
    { kanji: "売", reading: "バイ、う", meaning: "팔 매" },
    { kanji: "妹", reading: "マイ、いもうと", meaning: "누이 매" },
    { kanji: "買", reading: "バイ、か", meaning: "살 매" },
    { kanji: "麦", reading: "バク、むぎ", meaning: "보리 맥" },
    { kanji: "明", reading: "メイ、あか", meaning: "밝을 명" },
    { kanji: "鳴", reading: "メイ、な", meaning: "울 명" },
    { kanji: "毛", reading: "モウ、け", meaning: "터럭 모" },
    { kanji: "母", reading: "ボ、はは", meaning: "어미 모" },
    { kanji: "門", reading: "モン、かど", meaning: "문 문" },
    { kanji: "聞", reading: "ブン、き", meaning: "들을 문" },
    { kanji: "米", reading: "ベイ、こめ", meaning: "쌀 미" },
    { kanji: "半", reading: "ハン、なか", meaning: "반 반" },
    { kanji: "方", reading: "ホウ、かた", meaning: "모 방" },
    { kanji: "番", reading: "バン", meaning: "차례 번" },
    { kanji: "歩", reading: "ホ、ある", meaning: "걸음 보" },
    { kanji: "父", reading: "フ、ちち", meaning: "아비 부" },
    { kanji: "北", reading: "ホク、きた", meaning: "북녘 북" },
    { kanji: "分", reading: "ブン、わ", meaning: "나눌 분" },
    { kanji: "寺", reading: "ジ、てら", meaning: "절 사" },
    { kanji: "社", reading: "シャ", meaning: "모일 사" },
    { kanji: "思", reading: "シ、おも", meaning: "생각 사" },
    { kanji: "算", reading: "サン", meaning: "셈 산" },
    { kanji: "色", reading: "ショク、いろ", meaning: "빛 색" },
    { kanji: "西", reading: "セイ、にし", meaning: "서녘 서" },
    { kanji: "書", reading: "ショ、か", meaning: "글 서" },
    { kanji: "船", reading: "セン、ふね", meaning: "배 선" },
    { kanji: "線", reading: "セン", meaning: "줄 선" },
    { kanji: "雪", reading: "セツ、ゆき", meaning: "눈 설" },
    { kanji: "声", reading: "セイ、こえ", meaning: "소리 성" },
    { kanji: "星", reading: "セイ、ほし", meaning: "별 성" },
    { kanji: "細", reading: "サイ、ほそ", meaning: "가늘 세" },
    { kanji: "少", reading: "ショウ、すく", meaning: "적을 소" },
    { kanji: "首", reading: "シュ、くび", meaning: "머리 수" },
    { kanji: "数", reading: "スウ、かず", meaning: "셈 수" },
    { kanji: "市", reading: "シ、いち", meaning: "저자 시" },
    { kanji: "矢", reading: "シ、や", meaning: "화살 시" },
    { kanji: "時", reading: "ジ、とき", meaning: "때 시" },
    { kanji: "食", reading: "ショク、た", meaning: "밥 식" },
    { kanji: "新", reading: "シン、あたら", meaning: "새 신" },
    { kanji: "室", reading: "シツ、むろ", meaning: "집 실" },
    { kanji: "心", reading: "シン、こころ", meaning: "마음 심" },
    { kanji: "顔", reading: "ガン、かお", meaning: "낯 안" },
    { kanji: "岩", reading: "ガン、いわ", meaning: "바위 암" },
    { kanji: "夜", reading: "ヤ、よる", meaning: "밤 야" },
    { kanji: "野", reading: "ヤ、の", meaning: "들 야" },
    { kanji: "弱", reading: "ジャク、よわ", meaning: "약할 약" },
    { kanji: "魚", reading: "ギョ、さかな", meaning: "고기 어" },
    { kanji: "語", reading: "ゴ、かた", meaning: "말씀 어" },
    { kanji: "言", reading: "ゲン、い", meaning: "말씀 언" },
    { kanji: "午", reading: "ゴ", meaning: "낮 오" },
    { kanji: "外", reading: "ガイ、そと", meaning: "바깥 외" },
    { kanji: "曜", reading: "ヨウ", meaning: "빛날 요" },
    { kanji: "用", reading: "ヨウ、もち", meaning: "쓸 용" },
    { kanji: "友", reading: "ユウ、とも", meaning: "벗 우" },
    { kanji: "牛", reading: "ギュウ、うし", meaning: "소 우" },
    { kanji: "羽", reading: "ウ、はね", meaning: "깃 우" },
    { kanji: "雲", reading: "ウン、くも", meaning: "구름 운" },
    { kanji: "元", reading: "ゲン、もと", meaning: "으뜸 원" },
    { kanji: "原", reading: "ゲン、はら", meaning: "언덕 원" },
    { kanji: "園", reading: "エン、その", meaning: "동산 원" },
    { kanji: "遠", reading: "エン、とお", meaning: "멀 원" },
    { kanji: "肉", reading: "ニク", meaning: "고기 육" },
    { kanji: "引", reading: "イン、ひ", meaning: "끌 인" },
    { kanji: "自", reading: "ジ、みずか", meaning: "스스로 자" },
    { kanji: "姉", reading: "シ、あね", meaning: "손윗누이 자" },
    { kanji: "作", reading: "サク、つく", meaning: "지을 작" },
    { kanji: "長", reading: "チョウ、なが", meaning: "긴 장" },
    { kanji: "場", reading: "ジョウ、ば", meaning: "마당 장" },
    { kanji: "才", reading: "サイ", meaning: "재주 재" },
    { kanji: "前", reading: "ゼン、まえ", meaning: "앞 전" },
    { kanji: "電", reading: "デン", meaning: "번개 전" },
    { kanji: "切", reading: "セツ、き", meaning: "끊을 절" },
    { kanji: "店", reading: "テン、みせ", meaning: "가게 점" },
    { kanji: "点", reading: "テン", meaning: "점 점" },
    { kanji: "弟", reading: "テイ、おとうと", meaning: "아우 제" },
    { kanji: "鳥", reading: "チョウ、とり", meaning: "새 조" },
    { kanji: "組", reading: "ソ、く", meaning: "짤 조" },
    { kanji: "朝", reading: "チョウ、あさ", meaning: "아침 조" },
    { kanji: "走", reading: "ソウ、はし", meaning: "달릴 주" },
    { kanji: "昼", reading: "チュウ、ひる", meaning: "낮 주" },
    { kanji: "週", reading: "シュウ", meaning: "주일 주" },
    { kanji: "止", reading: "シ、と", meaning: "그칠 지" },
    { kanji: "地", reading: "チ", meaning: "따 지" },
    { kanji: "池", reading: "チ、いけ", meaning: "못 지" },
    { kanji: "知", reading: "チ、し", meaning: "알 지" },
    { kanji: "紙", reading: "シ、かみ", meaning: "종이 지" },
    { kanji: "直", reading: "チョク、なお", meaning: "곧을 직" },
    { kanji: "晴", reading: "セイ、は", meaning: "갤 청" },
    { kanji: "体", reading: "タイ、からだ", meaning: "몸 체" },
    { kanji: "秋", reading: "シュウ、あき", meaning: "가을 추" },
    { kanji: "春", reading: "シュン、はる", meaning: "봄 춘" },
    { kanji: "親", reading: "シン、おや", meaning: "친할 친" },
    { kanji: "太", reading: "タイ、ふと", meaning: "클 태" },
    { kanji: "通", reading: "ツウ、とお", meaning: "통할 통" },
    { kanji: "風", reading: "フウ、かぜ", meaning: "바람 풍" },
    { kanji: "何", reading: "カ、なに", meaning: "어찌 하" },
    { kanji: "夏", reading: "カ、なつ", meaning: "여름 하" },
    { kanji: "合", reading: "ゴウ、あ", meaning: "합할 합" },
    { kanji: "海", reading: "カイ、うみ", meaning: "바다 해" },
    { kanji: "行", reading: "コウ、い", meaning: "다닐 행" },
    { kanji: "兄", reading: "ケイ、あに", meaning: "형 형" },
    { kanji: "形", reading: "ケイ、かたち", meaning: "모양 형" },
    { kanji: "戸", reading: "コ、と", meaning: "집 호" },
    { kanji: "画", reading: "ガ", meaning: "그림 화" },
    { kanji: "話", reading: "ワ、はな", meaning: "말씀 화" },
    { kanji: "丸", reading: "ガン、まる", meaning: "둥글 환" },
    { kanji: "活", reading: "カツ", meaning: "살 활" },
    { kanji: "黄", reading: "オウ、き", meaning: "누를 황" },
    { kanji: "会", reading: "カイ、あ", meaning: "모일 회" },
    { kanji: "回", reading: "カイ、まわ", meaning: "돌아올 회" },
    { kanji: "絵", reading: "エ", meaning: "그림 회" },
    { kanji: "後", reading: "ゴ、あと", meaning: "뒤 후" },
    { kanji: "黒", reading: "コク、くろ", meaning: "검을 흑" },
  ],
  elementary3: [
    // 초등학교 3학년 (200자)
    { kanji: "感", reading: "カン、かん", meaning: "느낄 감" },
    { kanji: "開", reading: "カイ、ひら", meaning: "열 개" },
    { kanji: "客", reading: "キャク", meaning: "손 객" },
    { kanji: "去", reading: "キョ、さ", meaning: "갈 거" },
    { kanji: "決", reading: "ケツ、き", meaning: "결단할 결" },
    { kanji: "軽", reading: "ケイ、かる", meaning: "가벼울 경" },
    { kanji: "界", reading: "カイ", meaning: "지경 계" },
    { kanji: "係", reading: "ケイ、かか", meaning: "맬 계" },
    { kanji: "階", reading: "カイ", meaning: "섬돌 계" },
    { kanji: "苦", reading: "ク、くる", meaning: "쓸 고" },
    { kanji: "庫", reading: "コ", meaning: "곳집 고" },
    { kanji: "曲", reading: "キョク、ま", meaning: "굽을 곡" },
    { kanji: "館", reading: "カン", meaning: "집 관" },
    { kanji: "橋", reading: "キョウ、はし", meaning: "다리 교" },
    { kanji: "区", reading: "ク", meaning: "구분할 구" },
    { kanji: "究", reading: "キュウ", meaning: "연구할 구" },
    { kanji: "具", reading: "グ", meaning: "갖출 구" },
    { kanji: "球", reading: "キュウ、たま", meaning: "공 구" },
    { kanji: "局", reading: "キョク", meaning: "판 국" },
    { kanji: "君", reading: "クン、きみ", meaning: "임금 군" },
    { kanji: "宮", reading: "キュウ、みや", meaning: "집 궁" },
    { kanji: "根", reading: "コン、ね", meaning: "뿌리 근" },
    { kanji: "急", reading: "キュウ、いそ", meaning: "급할 급" },
    { kanji: "級", reading: "キュウ", meaning: "등급 급" },
    { kanji: "起", reading: "キ、お", meaning: "일어날 기" },
    { kanji: "期", reading: "キ", meaning: "기약할 기" },
    { kanji: "農", reading: "ノウ", meaning: "농사 농" },
    { kanji: "短", reading: "タン、みじか", meaning: "짧을 단" },
    { kanji: "談", reading: "ダン", meaning: "말씀 담" },
    { kanji: "代", reading: "ダイ、か", meaning: "대신할 대" },
    { kanji: "対", reading: "タイ", meaning: "대할 대" },
    { kanji: "待", reading: "タイ、ま", meaning: "기다릴 대" },
    { kanji: "度", reading: "ド、たび", meaning: "법도 도" },
    { kanji: "島", reading: "トウ、しま", meaning: "섬 도" },
    { kanji: "都", reading: "ト、みやこ", meaning: "도읍 도" },
    { kanji: "動", reading: "ドウ、うご", meaning: "움직일 동" },
    { kanji: "童", reading: "ドウ", meaning: "아이 동" },
    { kanji: "豆", reading: "トウ、まめ", meaning: "콩 두" },
    { kanji: "登", reading: "トウ、のぼ", meaning: "오를 등" },
    { kanji: "等", reading: "トウ", meaning: "무리 등" },
    { kanji: "落", reading: "ラク、お", meaning: "떨어질 락" },
    { kanji: "両", reading: "リョウ", meaning: "두 량" },
    { kanji: "旅", reading: "リョ、たび", meaning: "나그네 려" },
    { kanji: "練", reading: "レン、ね", meaning: "익힐 련" },
    { kanji: "列", reading: "レツ", meaning: "벌릴 렬" },
    { kanji: "礼", reading: "レイ", meaning: "예도 례" },
    { kanji: "路", reading: "ロ、みち", meaning: "길 로" },
    { kanji: "緑", reading: "リョク、みどり", meaning: "푸를 록" },
    { kanji: "流", reading: "リュウ、なが", meaning: "흐를 류" },
    { kanji: "面", reading: "メン、おも", meaning: "낯 면" },
    { kanji: "勉", reading: "ベン", meaning: "힘쓸 면" },
    { kanji: "皿", reading: "サラ", meaning: "그릇 명" },
    { kanji: "命", reading: "メイ、いのち", meaning: "목숨 명" },
    { kanji: "問", reading: "モン、と", meaning: "물을 문" },
    { kanji: "物", reading: "ブツ、もの", meaning: "물건 물" },
    { kanji: "味", reading: "ミ、あじ", meaning: "맛 미" },
    { kanji: "美", reading: "ビ、うつく", meaning: "아름다울 미" },
    { kanji: "反", reading: "ハン、そ", meaning: "돌이킬 반" },
    { kanji: "返", reading: "ヘン、かえ", meaning: "돌이킬 반" },
    { kanji: "発", reading: "ハツ", meaning: "필 발" },
    { kanji: "放", reading: "ホウ、はな", meaning: "놓을 방" },
    { kanji: "倍", reading: "バイ", meaning: "곱 배" },
    { kanji: "配", reading: "ハイ、くば", meaning: "나눌 배" },
    { kanji: "病", reading: "ビョウ、やまい", meaning: "병 병" },
    { kanji: "服", reading: "フク", meaning: "옷 복" },
    { kanji: "福", reading: "フク", meaning: "복 복" },
    { kanji: "負", reading: "フ、ま", meaning: "질 부" },
    { kanji: "部", reading: "ブ", meaning: "떼 부" },
    { kanji: "悲", reading: "ヒ、かな", meaning: "슬플 비" },
    { kanji: "鼻", reading: "ビ、はな", meaning: "코 비" },
    { kanji: "氷", reading: "ヒョウ、こおり", meaning: "얼음 빙" },
    { kanji: "写", reading: "シャ、うつ", meaning: "베낄 사" },
    { kanji: "仕", reading: "シ、つか", meaning: "섬길 사" },
    { kanji: "死", reading: "シ、し", meaning: "죽을 사" },
    { kanji: "事", reading: "ジ、こと", meaning: "일 사" },
    { kanji: "使", reading: "シ、つか", meaning: "하여금 사" },
    { kanji: "相", reading: "ソウ、あい", meaning: "서로 상" },
    { kanji: "商", reading: "ショウ", meaning: "장사 상" },
    { kanji: "想", reading: "ソウ", meaning: "생각 상" },
    { kanji: "箱", reading: "ハコ", meaning: "상자 상" },
    { kanji: "暑", reading: "ショ、あつ", meaning: "더울 서" },
    { kanji: "昔", reading: "セキ、むかし", meaning: "예 석" },
    { kanji: "世", reading: "セイ、よ", meaning: "인간 세" },
    { kanji: "所", reading: "ショ、ところ", meaning: "바 소" },
    { kanji: "昭", reading: "ショウ", meaning: "밝을 소" },
    { kanji: "消", reading: "ショウ、け", meaning: "사라질 소" },
    { kanji: "速", reading: "ソク、はや", meaning: "빠를 속" },
    { kanji: "送", reading: "ソウ、おく", meaning: "보낼 송" },
    { kanji: "守", reading: "シュ、まも", meaning: "지킬 수" },
    { kanji: "受", reading: "ジュ、う", meaning: "받을 수" },
    { kanji: "宿", reading: "シュク、やど", meaning: "잘 숙" },
    { kanji: "拾", reading: "シュウ、ひろ", meaning: "주울 습" },
    { kanji: "習", reading: "シュウ、なら", meaning: "익힐 습" },
    { kanji: "乗", reading: "ジョウ、の", meaning: "탈 승" },
    { kanji: "勝", reading: "ショウ、か", meaning: "이길 승" },
    { kanji: "始", reading: "シ、はじ", meaning: "비로소 시" },
    { kanji: "詩", reading: "シ", meaning: "시 시" },
    { kanji: "式", reading: "シキ", meaning: "법 식" },
    { kanji: "息", reading: "ソク、いき", meaning: "쉴 식" },
    { kanji: "植", reading: "ショク、う", meaning: "심을 식" },
    { kanji: "申", reading: "シン、もう", meaning: "납 신" },
    { kanji: "身", reading: "シン、み", meaning: "몸 신" },
    { kanji: "神", reading: "シン、かみ", meaning: "귀신 신" },
    { kanji: "実", reading: "ジツ、み", meaning: "열매 실" },
    { kanji: "深", reading: "シン、ふか", meaning: "깊을 심" },
    { kanji: "悪", reading: "アク、わる", meaning: "악할 악" },
    { kanji: "安", reading: "アン、やす", meaning: "편안 안" },
    { kanji: "岸", reading: "ガン、きし", meaning: "언덕 안" },
    { kanji: "暗", reading: "アン、くら", meaning: "어두울 암" },
    { kanji: "央", reading: "オウ", meaning: "가운데 앙" },
    { kanji: "薬", reading: "ヤク、くすり", meaning: "약 약" },
    { kanji: "羊", reading: "ヨウ、ひつじ", meaning: "양 양" },
    { kanji: "洋", reading: "ヨウ", meaning: "큰바다 양" },
    { kanji: "陽", reading: "ヨウ", meaning: "볕 양" },
    { kanji: "様", reading: "ヨウ、さま", meaning: "모양 양" },
    { kanji: "業", reading: "ギョウ", meaning: "업 업" },
    { kanji: "役", reading: "ヤク", meaning: "부릴 역" },
    { kanji: "駅", reading: "エキ", meaning: "역 역" },
    { kanji: "研", reading: "ケン", meaning: "갈 연" },
    { kanji: "葉", reading: "ヨウ、は", meaning: "잎 엽" },
    { kanji: "泳", reading: "エイ、およ", meaning: "헤엄칠 영" },
    { kanji: "予", reading: "ヨ", meaning: "미리 예" },
    { kanji: "屋", reading: "オク、や", meaning: "집 옥" },
    { kanji: "温", reading: "オン、あたた", meaning: "따뜻할 온" },
    { kanji: "運", reading: "ウン、はこ", meaning: "옮길 운" },
    { kanji: "院", reading: "イン", meaning: "집 원" },
    { kanji: "員", reading: "イン", meaning: "인원 원" },
    { kanji: "委", reading: "イ", meaning: "맡길 위" },
    { kanji: "由", reading: "ユ、よし", meaning: "말미암을 유" },
    { kanji: "有", reading: "ユウ、あ", meaning: "있을 유" },
    { kanji: "油", reading: "ユ、あぶら", meaning: "기름 유" },
    { kanji: "遊", reading: "ユウ、あそ", meaning: "놀 유" },
    { kanji: "育", reading: "イク、そだ", meaning: "기를 육" },
    { kanji: "銀", reading: "ギン", meaning: "은 은" },
    { kanji: "飲", reading: "イン、の", meaning: "마실 음" },
    { kanji: "医", reading: "イ", meaning: "의원 의" },
    { kanji: "意", reading: "イ", meaning: "뜻 의" },
    { kanji: "者", reading: "シャ、もの", meaning: "놈 자" },
    { kanji: "章", reading: "ショウ", meaning: "글 장" },
    { kanji: "帳", reading: "チョウ", meaning: "장막 장" },
    { kanji: "笛", reading: "テキ、ふえ", meaning: "피리 적" },
    { kanji: "全", reading: "ゼン、すべ", meaning: "온전 전" },
    { kanji: "畑", reading: "ハタ、はたけ", meaning: "화전 전" },
    { kanji: "転", reading: "テン、ころ", meaning: "구를 전" },
    { kanji: "丁", reading: "チョウ、テイ", meaning: "고무래 정" },
    { kanji: "定", reading: "テイ、さだ", meaning: "정할 정" },
    { kanji: "庭", reading: "テイ、にわ", meaning: "뜰 정" },
    { kanji: "整", reading: "セイ、ととの", meaning: "가지런할 정" },
    { kanji: "第", reading: "ダイ", meaning: "차례 제" },
    { kanji: "祭", reading: "サイ、まつ", meaning: "제사 제" },
    { kanji: "題", reading: "ダイ", meaning: "제목 제" },
    { kanji: "助", reading: "ジョ、たす", meaning: "도울 조" },
    { kanji: "調", reading: "チョウ、しら", meaning: "고를 조" },
    { kanji: "族", reading: "ゾク", meaning: "겨레 족" },
    { kanji: "終", reading: "シュウ、お", meaning: "마칠 종" },
    { kanji: "主", reading: "シュ、ぬし", meaning: "임금 주" },
    { kanji: "州", reading: "シュウ", meaning: "고을 주" },
    { kanji: "住", reading: "ジュウ、す", meaning: "살 주" },
    { kanji: "注", reading: "チュウ、そそ", meaning: "부을 주" },
    { kanji: "柱", reading: "チュウ、はしら", meaning: "기둥 주" },
    { kanji: "酒", reading: "シュ、さけ", meaning: "술 주" },
    { kanji: "重", reading: "ジュウ、おも", meaning: "무거울 중" },
    { kanji: "指", reading: "シ、ゆび", meaning: "가리킬 지" },
    { kanji: "持", reading: "ジ、も", meaning: "가질 지" },
    { kanji: "真", reading: "シン、ま", meaning: "참 진" },
    { kanji: "進", reading: "シン、すす", meaning: "나아갈 진" },
    { kanji: "集", reading: "シュウ、あつ", meaning: "모을 집" },
    { kanji: "次", reading: "ジ、つぎ", meaning: "버금 차" },
    { kanji: "着", reading: "チャク、つ", meaning: "붙을 착" },
    { kanji: "鉄", reading: "テツ", meaning: "쇠 철" },
    { kanji: "秒", reading: "ビョウ", meaning: "분초 초" },
    { kanji: "追", reading: "ツイ、お", meaning: "쫓을 추" },
    { kanji: "取", reading: "シュ、と", meaning: "가질 취" },
    { kanji: "歯", reading: "シ、は", meaning: "이 치" },
    { kanji: "他", reading: "タ、ほか", meaning: "다를 타" },
    { kanji: "打", reading: "ダ、う", meaning: "칠 타" },
    { kanji: "炭", reading: "タン、すみ", meaning: "숯 탄" },
    { kanji: "湯", reading: "トウ、ゆ", meaning: "끓을 탕" },
    { kanji: "投", reading: "トウ、な", meaning: "던질 투" },
    { kanji: "波", reading: "ハ、なみ", meaning: "물결 파" },
    { kanji: "坂", reading: "ハン、さか", meaning: "언덕 판" },
    { kanji: "板", reading: "バン、いた", meaning: "널 판" },
    { kanji: "平", reading: "ヘイ、たい", meaning: "평평할 평" },
    { kanji: "表", reading: "ヒョウ、おもて", meaning: "겉 표" },
    { kanji: "品", reading: "ヒン、しな", meaning: "물건 품" },
    { kanji: "皮", reading: "ヒ、かわ", meaning: "가죽 피" },
    { kanji: "筆", reading: "ヒツ、ふで", meaning: "붓 필" },
    { kanji: "荷", reading: "カ、に", meaning: "멜 하" },
    { kanji: "寒", reading: "カン、さむ", meaning: "찰 한" },
    { kanji: "漢", reading: "カン", meaning: "한수 한" },
    { kanji: "港", reading: "コウ、みなと", meaning: "항구 항" },
    { kanji: "幸", reading: "コウ、さいわ", meaning: "다행 행" },
    { kanji: "向", reading: "コウ、む", meaning: "향할 향" },
    { kanji: "県", reading: "ケン", meaning: "고을 현" },
    { kanji: "血", reading: "ケツ、ち", meaning: "피 혈" },
    { kanji: "号", reading: "ゴウ", meaning: "이름 호" },
    { kanji: "湖", reading: "コ、みずうみ", meaning: "호수 호" },
    { kanji: "化", reading: "カ、ば", meaning: "될 화" },
    { kanji: "和", reading: "ワ、やわ", meaning: "화할 화" },
    { kanji: "横", reading: "オウ、よこ", meaning: "가로 횡" },
  ],
  elementary4: [
    // 초등학교 4학년 (202자)
    { kanji: "加", reading: "カ、くわ", meaning: "더할 가" },
    { kanji: "街", reading: "ガイ、まち", meaning: "거리 가" },
    { kanji: "各", reading: "カク、おのおの", meaning: "각각 각" },
    { kanji: "覚", reading: "カク、おぼ", meaning: "깨달을 각" },
    { kanji: "康", reading: "コウ", meaning: "편안 강" },
    { kanji: "岡", reading: "オカ", meaning: "산등성이 강" },
    { kanji: "改", reading: "カイ、あらた", meaning: "고칠 개" },
    { kanji: "挙", reading: "キョ、あ", meaning: "들 거" },
    { kanji: "建", reading: "ケン、た", meaning: "세울 건" },
    { kanji: "健", reading: "ケン", meaning: "굳셀 건" },
    { kanji: "欠", reading: "ケツ、か", meaning: "이지러질 결" },
    { kanji: "結", reading: "ケツ、むす", meaning: "맺을 결" },
    { kanji: "径", reading: "ケイ", meaning: "지름길 경" },
    { kanji: "景", reading: "ケイ", meaning: "볕 경" },
    { kanji: "鏡", reading: "キョウ、かがみ", meaning: "거울 경" },
    { kanji: "競", reading: "キョウ、きそ", meaning: "다툴 경" },
    { kanji: "季", reading: "キ", meaning: "계절 계" },
    { kanji: "械", reading: "カイ", meaning: "기계 계" },
    { kanji: "固", reading: "コ、かた", meaning: "굳을 고" },
    { kanji: "功", reading: "コウ", meaning: "공 공" },
    { kanji: "共", reading: "キョウ、とも", meaning: "한가지 공" },
    { kanji: "果", reading: "カ、は", meaning: "실과 과" },
    { kanji: "課", reading: "カ", meaning: "공부할 과" },
    { kanji: "官", reading: "カン", meaning: "벼슬 관" },
    { kanji: "関", reading: "カン、せき", meaning: "관계할 관" },
    { kanji: "管", reading: "カン、くだ", meaning: "대롱 관" },
    { kanji: "観", reading: "カン", meaning: "볼 관" },
    { kanji: "求", reading: "キュウ、もと", meaning: "구할 구" },
    { kanji: "軍", reading: "グン", meaning: "군사 군" },
    { kanji: "郡", reading: "グン", meaning: "고을 군" },
    { kanji: "群", reading: "グン、む", meaning: "무리 군" },
    { kanji: "極", reading: "キョク、きわ", meaning: "다할 극" },
    { kanji: "給", reading: "キュウ", meaning: "줄 급" },
    { kanji: "旗", reading: "キ、はた", meaning: "기 기" },
    { kanji: "器", reading: "キ、うつわ", meaning: "그릇 기" },
    { kanji: "機", reading: "キ、はた", meaning: "틀 기" },
    { kanji: "岐", reading: "キ", meaning: "갈림길 기" },
    { kanji: "崎", reading: "サキ", meaning: "험할 기" },
    { kanji: "埼", reading: "サイ", meaning: "갑 기" },
    { kanji: "奈", reading: "ナ", meaning: "어찌 내" },
    { kanji: "念", reading: "ネン", meaning: "생각 념" },
    { kanji: "努", reading: "ド、つと", meaning: "힘쓸 노" },
    { kanji: "単", reading: "タン", meaning: "홑 단" },
    { kanji: "達", reading: "タツ", meaning: "통달할 달" },
    { kanji: "帯", reading: "タイ、お", meaning: "띠 대" },
    { kanji: "隊", reading: "タイ", meaning: "무리 대" },
    { kanji: "徳", reading: "トク", meaning: "큰 덕" },
    { kanji: "徒", reading: "ト", meaning: "무리 도" },
    { kanji: "働", reading: "ドウ、はたら", meaning: "일할 동" },
    { kanji: "灯", reading: "トウ、ひ", meaning: "등 등" },
    { kanji: "冷", reading: "レイ、つめ", meaning: "찰 랭" },
    { kanji: "良", reading: "リョウ、よ", meaning: "어질 량" },
    { kanji: "量", reading: "リョウ", meaning: "헤아릴 량" },
    { kanji: "連", reading: "レン、つら", meaning: "이을 련" },
    { kanji: "令", reading: "レイ", meaning: "하여금 령" },
    { kanji: "例", reading: "レイ", meaning: "법식 례" },
    { kanji: "老", reading: "ロウ、お", meaning: "늙을 로" },
    { kanji: "労", reading: "ロウ", meaning: "일할 로" },
    { kanji: "録", reading: "ロク", meaning: "기록할 록" },
    { kanji: "鹿", reading: "ロク、しか", meaning: "사슴 록" },
    { kanji: "料", reading: "リョウ", meaning: "헤아릴 료" },
    { kanji: "類", reading: "ルイ", meaning: "무리 류" },
    { kanji: "陸", reading: "リク", meaning: "뭍 륙" },
    { kanji: "輪", reading: "リン、わ", meaning: "바퀴 륜" },
    { kanji: "利", reading: "リ、き", meaning: "이할 리" },
    { kanji: "梨", reading: "リ、なし", meaning: "배 리" },
    { kanji: "満", reading: "マン、み", meaning: "찰 만" },
    { kanji: "末", reading: "マツ、すえ", meaning: "끝 말" },
    { kanji: "望", reading: "ボウ、のぞ", meaning: "바랄 망" },
    { kanji: "梅", reading: "バイ、うめ", meaning: "매화 매" },
    { kanji: "牧", reading: "ボク", meaning: "칠 목" },
    { kanji: "無", reading: "ム、な", meaning: "없을 무" },
    { kanji: "未", reading: "ミ", meaning: "아닐 미" },
    { kanji: "民", reading: "ミン", meaning: "백성 민" },
    { kanji: "博", reading: "ハク", meaning: "넓을 박" },
    { kanji: "飯", reading: "ハン、めし", meaning: "밥 반" },
    { kanji: "法", reading: "ホウ", meaning: "법 법" },
    { kanji: "辺", reading: "ヘン、あた", meaning: "가 변" },
    { kanji: "変", reading: "ヘン、か", meaning: "변할 변" },
    { kanji: "別", reading: "ベツ、わか", meaning: "다를 별" },
    { kanji: "兵", reading: "ヘイ", meaning: "병사 병" },
    { kanji: "夫", reading: "フ、おっと", meaning: "지아비 부" },
    { kanji: "付", reading: "フ、つ", meaning: "부칠 부" },
    { kanji: "府", reading: "フ", meaning: "마을 부" },
    { kanji: "副", reading: "フク", meaning: "버금 부" },
    { kanji: "富", reading: "フ、と", meaning: "부자 부" },
    { kanji: "阜", reading: "フ", meaning: "언덕 부" },
    { kanji: "不", reading: "フ", meaning: "아닐 불" },
    { kanji: "飛", reading: "ヒ、と", meaning: "날 비" },
    { kanji: "司", reading: "シ", meaning: "맡을 사" },
    { kanji: "辞", reading: "ジ、や", meaning: "말씀 사" },
    { kanji: "産", reading: "サン、う", meaning: "낳을 산" },
    { kanji: "散", reading: "サン、ち", meaning: "흩을 산" },
    { kanji: "席", reading: "セキ", meaning: "자리 석" },
    { kanji: "潟", reading: "ガタ", meaning: "개펄 석" },
    { kanji: "選", reading: "セン、えら", meaning: "가릴 선" },
    { kanji: "説", reading: "セツ", meaning: "말씀 설" },
    { kanji: "成", reading: "セイ、な", meaning: "이룰 성" },
    { kanji: "省", reading: "セイ、かえり", meaning: "살필 성" },
    { kanji: "城", reading: "ジョウ、しろ", meaning: "재 성" },
    { kanji: "笑", reading: "ショウ、わら", meaning: "웃음 소" },
    { kanji: "巣", reading: "ソウ、す", meaning: "새집 소" },
    { kanji: "焼", reading: "ショウ、や", meaning: "사를 소" },
    { kanji: "束", reading: "ソク、たば", meaning: "묶을 속" },
    { kanji: "続", reading: "ゾク、つづ", meaning: "이을 속" },
    { kanji: "孫", reading: "ソン、まご", meaning: "손자 손" },
    { kanji: "松", reading: "ショウ、まつ", meaning: "소나무 송" },
    { kanji: "刷", reading: "サツ、す", meaning: "인쇄할 쇄" },
    { kanji: "順", reading: "ジュン", meaning: "순할 순" },
    { kanji: "縄", reading: "ジョウ、なわ", meaning: "노끈 승" },
    { kanji: "試", reading: "シ、こころ", meaning: "시험 시" },
    { kanji: "臣", reading: "シン", meaning: "신하 신" },
    { kanji: "信", reading: "シン、しん", meaning: "믿을 신" },
    { kanji: "失", reading: "シツ、うしな", meaning: "잃을 실" },
    { kanji: "氏", reading: "シ", meaning: "각시 씨" },
    { kanji: "児", reading: "ジ", meaning: "아이 아" },
    { kanji: "芽", reading: "ガ、め", meaning: "싹 아" },
    { kanji: "案", reading: "アン", meaning: "책상 안" },
    { kanji: "愛", reading: "アイ", meaning: "사랑 애" },
    { kanji: "約", reading: "ヤク", meaning: "맺을 약" },
    { kanji: "養", reading: "ヨウ、やしな", meaning: "기를 양" },
    { kanji: "漁", reading: "ギョ", meaning: "고기잡을 어" },
    { kanji: "億", reading: "オク", meaning: "억 억" },
    { kanji: "然", reading: "ゼン", meaning: "그럴 연" },
    { kanji: "熱", reading: "ネツ、あつ", meaning: "더울 열" },
    { kanji: "塩", reading: "エン、しお", meaning: "소금 염" },
    { kanji: "英", reading: "エイ", meaning: "꽃부리 영" },
    { kanji: "栄", reading: "エイ、さか", meaning: "영화 영" },
    { kanji: "芸", reading: "ゲイ", meaning: "재주 예" },
    { kanji: "完", reading: "カン", meaning: "완전할 완" },
    { kanji: "要", reading: "ヨウ、い", meaning: "요긴할 요" },
    { kanji: "浴", reading: "ヨク", meaning: "목욕할 욕" },
    { kanji: "勇", reading: "ユウ、いさ", meaning: "날랠 용" },
    { kanji: "熊", reading: "ユウ、くま", meaning: "곰 웅" },
    { kanji: "願", reading: "ガン、ねが", meaning: "원할 원" },
    { kanji: "媛", reading: "エン", meaning: "계집 원" },
    { kanji: "位", reading: "イ、くらい", meaning: "자리 위" },
    { kanji: "泣", reading: "キュウ、な", meaning: "울 읍" },
    { kanji: "衣", reading: "イ、ころも", meaning: "옷 의" },
    { kanji: "議", reading: "ギ", meaning: "의논할 의" },
    { kanji: "以", reading: "イ", meaning: "써 이" },
    { kanji: "印", reading: "イン", meaning: "도장 인" },
    { kanji: "滋", reading: "ジ", meaning: "불을 자" },
    { kanji: "茨", reading: "バラ", meaning: "남가새 자" },
    { kanji: "昨", reading: "サク", meaning: "어제 작" },
    { kanji: "残", reading: "ザン、のこ", meaning: "남을 잔" },
    { kanji: "材", reading: "ザイ", meaning: "재목 재" },
    { kanji: "争", reading: "ソウ、あらそ", meaning: "다툴 쟁" },
    { kanji: "低", reading: "テイ、ひく", meaning: "낮을 저" },
    { kanji: "底", reading: "テイ、そこ", meaning: "밑 저" },
    { kanji: "的", reading: "テキ", meaning: "과녁 적" },
    { kanji: "積", reading: "セキ、つ", meaning: "쌓을 적" },
    { kanji: "伝", reading: "デン、つた", meaning: "전할 전" },
    { kanji: "典", reading: "テン", meaning: "법 전" },
    { kanji: "戦", reading: "セン、たたか", meaning: "싸움 전" },
    { kanji: "折", reading: "セツ、お", meaning: "꺾을 절" },
    { kanji: "節", reading: "セツ、ふし", meaning: "마디 절" },
    { kanji: "静", reading: "セイ、しず", meaning: "고요할 정" },
    { kanji: "井", reading: "セイ、い", meaning: "우물 정" },
    { kanji: "兆", reading: "チョウ", meaning: "억조 조" },
    { kanji: "照", reading: "ショウ、て", meaning: "비칠 조" },
    { kanji: "卒", reading: "ソツ", meaning: "마칠 졸" },
    { kanji: "種", reading: "シュ、たね", meaning: "씨 종" },
    { kanji: "佐", reading: "サ", meaning: "도울 좌" },
    { kanji: "周", reading: "シュウ、まわ", meaning: "두루 주" },
    { kanji: "仲", reading: "チュウ、なか", meaning: "버금 중" },
    { kanji: "差", reading: "サ、さ", meaning: "다를 차" },
    { kanji: "借", reading: "シャク、か", meaning: "빌 차" },
    { kanji: "札", reading: "サツ、ふだ", meaning: "편지 찰" },
    { kanji: "察", reading: "サツ", meaning: "살필 찰" },
    { kanji: "参", reading: "サン、まい", meaning: "참여할 참" },
    { kanji: "倉", reading: "ソウ、くら", meaning: "곳집 창" },
    { kanji: "唱", reading: "ショウ、とな", meaning: "부를 창" },
    { kanji: "菜", reading: "サイ、な", meaning: "나물 채" },
    { kanji: "浅", reading: "セン、あさ", meaning: "얕을 천" },
    { kanji: "清", reading: "セイ、きよ", meaning: "맑을 청" },
    { kanji: "初", reading: "ショ、はじ", meaning: "처음 초" },
    { kanji: "最", reading: "サイ、もっと", meaning: "가장 최" },
    { kanji: "祝", reading: "シュク、いわ", meaning: "빌 축" },
    { kanji: "沖", reading: "チュウ、おき", meaning: "화할 충" },
    { kanji: "側", reading: "ソク、がわ", meaning: "곁 측" },
    { kanji: "治", reading: "ジ、チ、おさ", meaning: "다스릴 치" },
    { kanji: "置", reading: "チ、お", meaning: "둘 치" },
    { kanji: "特", reading: "トク", meaning: "특별할 특" },
    { kanji: "阪", reading: "ハン", meaning: "언덕 판" },
    { kanji: "敗", reading: "ハイ、やぶ", meaning: "패할 패" },
    { kanji: "便", reading: "ベン、たよ", meaning: "편할 편" },
    { kanji: "包", reading: "ホウ、つつ", meaning: "쌀 포" },
    { kanji: "票", reading: "ヒョウ", meaning: "표 표" },
    { kanji: "標", reading: "ヒョウ", meaning: "표할 표" },
    { kanji: "必", reading: "ヒツ、かなら", meaning: "반드시 필" },
    { kanji: "賀", reading: "ガ", meaning: "하례할 하" },
    { kanji: "害", reading: "ガイ", meaning: "해할 해" },
    { kanji: "香", reading: "コウ、かお", meaning: "향기 향" },
    { kanji: "験", reading: "ケン", meaning: "시험 험" },
    { kanji: "協", reading: "キョウ", meaning: "화할 협" },
    { kanji: "好", reading: "コウ、この", meaning: "좋을 호" },
    { kanji: "貨", reading: "カ", meaning: "재물 화" },
    { kanji: "栃", reading: "トチ", meaning: "칠엽수 회" },
    { kanji: "候", reading: "コウ", meaning: "기후 후" },
    { kanji: "訓", reading: "クン", meaning: "가르칠 훈" },
    { kanji: "希", reading: "キ", meaning: "바랄 희" },
  ],
  elementary5: [
    // 초등학교 5학년 (193자)
    { kanji: "可", reading: "カ", meaning: "옳을 가" },
    { kanji: "仮", reading: "カ、かり", meaning: "거짓 가" },
    { kanji: "価", reading: "カ、あたい", meaning: "값 가" },
    { kanji: "刊", reading: "カン", meaning: "새길 간" },
    { kanji: "幹", reading: "カン、みき", meaning: "줄기 간" },
    { kanji: "減", reading: "ゲン、へ", meaning: "덜 감" },
    { kanji: "講", reading: "コウ", meaning: "욀 강" },
    { kanji: "個", reading: "コ", meaning: "낱 개" },
    { kanji: "居", reading: "キョ、い", meaning: "살 거" },
    { kanji: "件", reading: "ケン", meaning: "물건 건" },
    { kanji: "検", reading: "ケン、しら", meaning: "검사할 검" },
    { kanji: "格", reading: "カク", meaning: "격식 격" },
    { kanji: "潔", reading: "ケツ、いさぎよ", meaning: "깨끗할 결" },
    { kanji: "耕", reading: "コウ", meaning: "밭갈 경" },
    { kanji: "経", reading: "ケイ、へ", meaning: "지날 경" },
    { kanji: "境", reading: "キョウ、さかい", meaning: "지경 경" },
    { kanji: "告", reading: "コク、つ", meaning: "고할 고" },
    { kanji: "故", reading: "コ", meaning: "연고 고" },
    { kanji: "過", reading: "カ、す", meaning: "지날 과" },
    { kanji: "慣", reading: "カン、な", meaning: "익숙할 관" },
    { kanji: "鉱", reading: "コウ", meaning: "쇳돌 광" },
    { kanji: "救", reading: "キュウ、すく", meaning: "구원할 구" },
    { kanji: "久", reading: "キュウ、ひさ", meaning: "오랠 구" },
    { kanji: "旧", reading: "キュウ、ふる", meaning: "예 구" },
    { kanji: "句", reading: "ク", meaning: "글귀 구" },
    { kanji: "構", reading: "コウ、かま", meaning: "얽을 구" },
    { kanji: "規", reading: "キ", meaning: "법 규" },
    { kanji: "均", reading: "キン", meaning: "고를 균" },
    { kanji: "禁", reading: "キン", meaning: "금할 금" },
    { kanji: "紀", reading: "キ", meaning: "벼리 기" },
    { kanji: "技", reading: "ギ、わざ", meaning: "재주 기" },
    { kanji: "基", reading: "キ、もと", meaning: "터 기" },
    { kanji: "寄", reading: "キ、よ", meaning: "부칠 기" },
    { kanji: "能", reading: "ノウ", meaning: "능할 능" },
    { kanji: "団", reading: "ダン", meaning: "둥글 단" },
    { kanji: "断", reading: "ダン、た", meaning: "끊을 단" },
    { kanji: "堂", reading: "ドウ", meaning: "집 당" },
    { kanji: "貸", reading: "タイ、か", meaning: "빌릴 대" },
    { kanji: "導", reading: "ドウ、みちび", meaning: "인도할 도" },
    { kanji: "毒", reading: "ドク", meaning: "독 독" },
    { kanji: "独", reading: "ドク、ひと", meaning: "홀로 독" },
    { kanji: "銅", reading: "ドウ", meaning: "구리 동" },
    { kanji: "得", reading: "トク、え", meaning: "얻을 득" },
    { kanji: "略", reading: "リャク", meaning: "간략할 략" },
    { kanji: "歴", reading: "レキ", meaning: "지날 력" },
    { kanji: "領", reading: "リョウ", meaning: "거느릴 령" },
    { kanji: "留", reading: "リュウ、と", meaning: "머무를 류" },
    { kanji: "率", reading: "ソツ、リツ", meaning: "비율 률" },
    { kanji: "脈", reading: "ミャク", meaning: "줄기 맥" },
    { kanji: "綿", reading: "メン、わた", meaning: "솜 면" },
    { kanji: "夢", reading: "ム、ゆめ", meaning: "꿈 몽" },
    { kanji: "墓", reading: "ボ、はか", meaning: "무덤 묘" },
    { kanji: "武", reading: "ブ、たけ", meaning: "호반 무" },
    { kanji: "務", reading: "ム、つと", meaning: "힘쓸 무" },
    { kanji: "貿", reading: "ボウ", meaning: "무역할 무" },
    { kanji: "迷", reading: "メイ、まよ", meaning: "미혹할 미" },
    { kanji: "防", reading: "ボウ、ふせ", meaning: "막을 방" },
    { kanji: "犯", reading: "ハン、おか", meaning: "범할 범" },
    { kanji: "弁", reading: "ベン", meaning: "고깔 변" },
    { kanji: "保", reading: "ホ、たも", meaning: "지킬 보" },
    { kanji: "報", reading: "ホウ、むく", meaning: "갚을 보" },
    { kanji: "復", reading: "フク", meaning: "회복할 복" },
    { kanji: "複", reading: "フク", meaning: "겹칠 복" },
    { kanji: "婦", reading: "フ", meaning: "며느리 부" },
    { kanji: "粉", reading: "フン、こな", meaning: "가루 분" },
    { kanji: "仏", reading: "ブツ、ほとけ", meaning: "부처 불" },
    { kanji: "費", reading: "ヒ、つい", meaning: "쓸 비" },
    { kanji: "比", reading: "ヒ、くら", meaning: "견줄 비" },
    { kanji: "非", reading: "ヒ", meaning: "아닐 비" },
    { kanji: "肥", reading: "ヒ、こ", meaning: "살찔 비" },
    { kanji: "備", reading: "ビ、そな", meaning: "갖출 비" },
    { kanji: "貧", reading: "ヒン、まず", meaning: "가난할 빈" },
    { kanji: "士", reading: "シ", meaning: "선비 사" },
    { kanji: "史", reading: "シ", meaning: "사기 사" },
    { kanji: "似", reading: "ジ、に", meaning: "닮을 사" },
    { kanji: "舎", reading: "シャ", meaning: "집 사" },
    { kanji: "査", reading: "サ", meaning: "조사할 사" },
    { kanji: "師", reading: "シ", meaning: "스승 사" },
    { kanji: "飼", reading: "シ、か", meaning: "기를 사" },
    { kanji: "謝", reading: "シャ、あやま", meaning: "사례할 사" },
    { kanji: "酸", reading: "サン、す", meaning: "실 산" },
    { kanji: "殺", reading: "サツ、ころ", meaning: "죽일 살" },
    { kanji: "象", reading: "ゾウ", meaning: "코끼리 상" },
    { kanji: "賞", reading: "ショウ", meaning: "상줄 상" },
    { kanji: "状", reading: "ジョウ", meaning: "형상 상" },
    { kanji: "常", reading: "ジョウ、つね", meaning: "떳떳할 상" },
    { kanji: "像", reading: "ゾウ", meaning: "모양 상" },
    { kanji: "序", reading: "ジョ", meaning: "차례 서" },
    { kanji: "設", reading: "セツ、もう", meaning: "베풀 설" },
    { kanji: "性", reading: "セイ", meaning: "성품 성" },
    { kanji: "税", reading: "ゼイ", meaning: "세금 세" },
    { kanji: "勢", reading: "セイ、いきお", meaning: "형세 세" },
    { kanji: "素", reading: "ソ、もと", meaning: "본디 소" },
    { kanji: "属", reading: "ゾク", meaning: "붙일 속" },
    { kanji: "損", reading: "ソン", meaning: "덜 손" },
    { kanji: "修", reading: "シュウ、おさ", meaning: "닦을 수" },
    { kanji: "授", reading: "ジュ、さず", meaning: "줄 수" },
    { kanji: "輸", reading: "ユ", meaning: "보낼 수" },
    { kanji: "述", reading: "ジュツ、の", meaning: "펼 술" },
    { kanji: "術", reading: "ジュツ", meaning: "재주 술" },
    { kanji: "示", reading: "シ、しめ", meaning: "보일 시" },
    { kanji: "識", reading: "シキ", meaning: "알 식" },
    { kanji: "眼", reading: "ガン、め", meaning: "눈 안" },
    { kanji: "圧", reading: "アツ", meaning: "누를 압" },
    { kanji: "液", reading: "エキ", meaning: "진 액" },
    { kanji: "額", reading: "ガク、ひたい", meaning: "이마 액" },
    { kanji: "桜", reading: "オウ、さくら", meaning: "앵두 앵" },
    { kanji: "余", reading: "ヨ、あま", meaning: "나 여" },
    { kanji: "易", reading: "エキ、やさ", meaning: "바꿀 역" },
    { kanji: "逆", reading: "ギャク、さか", meaning: "거스릴 역" },
    { kanji: "演", reading: "エン", meaning: "펼 연" },
    { kanji: "燃", reading: "ネン、も", meaning: "탈 연" },
    { kanji: "永", reading: "エイ、なが", meaning: "길 영" },
    { kanji: "営", reading: "エイ、いとな", meaning: "경영할 영" },
    { kanji: "往", reading: "オウ、い", meaning: "갈 왕" },
    { kanji: "容", reading: "ヨウ", meaning: "얼굴 용" },
    { kanji: "囲", reading: "イ、かこ", meaning: "에워쌀 위" },
    { kanji: "衛", reading: "エイ、まも", meaning: "지킬 위" },
    { kanji: "応", reading: "オウ", meaning: "응할 응" },
    { kanji: "義", reading: "ギ", meaning: "옳을 의" },
    { kanji: "移", reading: "イ、うつ", meaning: "옮길 이" },
    { kanji: "益", reading: "エキ、ま", meaning: "더할 익" },
    { kanji: "因", reading: "イン", meaning: "인할 인" },
    { kanji: "任", reading: "ニン、まか", meaning: "맡길 임" },
    { kanji: "資", reading: "シ", meaning: "재물 자" },
    { kanji: "雑", reading: "ザツ", meaning: "섞일 잡" },
    { kanji: "張", reading: "チョウ、は", meaning: "베풀 장" },
    { kanji: "在", reading: "ザイ、あ", meaning: "있을 재" },
    { kanji: "再", reading: "サイ、ふたた", meaning: "두 재" },
    { kanji: "災", reading: "サイ、わざわ", meaning: "재앙 재" },
    { kanji: "財", reading: "ザイ", meaning: "재물 재" },
    { kanji: "貯", reading: "チョ", meaning: "쌓을 저" },
    { kanji: "適", reading: "テキ", meaning: "맞을 적" },
    { kanji: "績", reading: "セキ", meaning: "길쌈 적" },
    { kanji: "絶", reading: "ゼツ、た", meaning: "끊을 절" },
    { kanji: "接", reading: "セツ、つ", meaning: "이을 접" },
    { kanji: "停", reading: "テイ、と", meaning: "머무를 정" },
    { kanji: "政", reading: "セイ、まつりごと", meaning: "정사 정" },
    { kanji: "情", reading: "ジョウ、なさ", meaning: "뜻 정" },
    { kanji: "程", reading: "テイ、ほど", meaning: "한도 정" },
    { kanji: "精", reading: "セイ", meaning: "정할 정" },
    { kanji: "制", reading: "セイ", meaning: "절제할 제" },
    { kanji: "提", reading: "テイ、さ", meaning: "끌 제" },
    { kanji: "製", reading: "セイ", meaning: "지을 제" },
    { kanji: "際", reading: "サイ、きわ", meaning: "즈음 제" },
    { kanji: "条", reading: "ジョウ", meaning: "가지 조" },
    { kanji: "祖", reading: "ソ", meaning: "할아비 조" },
    { kanji: "造", reading: "ゾウ、つく", meaning: "지을 조" },
    { kanji: "罪", reading: "ザイ、つみ", meaning: "허물 죄" },
    { kanji: "準", reading: "ジュン", meaning: "준할 준" },
    { kanji: "証", reading: "ショウ", meaning: "증거 증" },
    { kanji: "増", reading: "ゾウ、ま", meaning: "더할 증" },
    { kanji: "支", reading: "シ、ささ", meaning: "지탱할 지" },
    { kanji: "志", reading: "シ、こころざ", meaning: "뜻 지" },
    { kanji: "枝", reading: "シ、えだ", meaning: "가지 지" },
    { kanji: "職", reading: "ショク", meaning: "직분 직" },
    { kanji: "織", reading: "ショク、お", meaning: "짤 직" },
    { kanji: "質", reading: "シツ", meaning: "바탕 질" },
    { kanji: "賛", reading: "サン", meaning: "도울 찬" },
    { kanji: "採", reading: "サイ、と", meaning: "캘 채" },
    { kanji: "責", reading: "セキ、せ", meaning: "꾸짖을 책" },
    { kanji: "妻", reading: "サイ、つま", meaning: "아내 처" },
    { kanji: "招", reading: "ショウ、まね", meaning: "부를 초" },
    { kanji: "総", reading: "ソウ", meaning: "다 총" },
    { kanji: "築", reading: "チク、きず", meaning: "쌓을 축" },
    { kanji: "測", reading: "ソク、はか", meaning: "헤아릴 측" },
    { kanji: "則", reading: "ソク", meaning: "법칙 칙" },
    { kanji: "快", reading: "カイ、こころよ", meaning: "쾌할 쾌" },
    { kanji: "態", reading: "タイ", meaning: "모습 태" },
    { kanji: "統", reading: "トウ、す", meaning: "거느릴 통" },
    { kanji: "破", reading: "ハ、やぶ", meaning: "깨뜨릴 파" },
    { kanji: "判", reading: "ハン、バン", meaning: "판단할 판" },
    { kanji: "版", reading: "ハン", meaning: "판목 판" },
    { kanji: "編", reading: "ヘン、あ", meaning: "엮을 편" },
    { kanji: "評", reading: "ヒョウ", meaning: "평할 평" },
    { kanji: "布", reading: "フ、ぬの", meaning: "베 포" },
    { kanji: "暴", reading: "ボウ、あば", meaning: "사나울 폭" },
    { kanji: "豊", reading: "ホウ、ゆた", meaning: "풍년 풍" },
    { kanji: "河", reading: "カ、かわ", meaning: "물 하" },
    { kanji: "限", reading: "ゲン、かぎ", meaning: "한할 한" },
    { kanji: "航", reading: "コウ", meaning: "배 항" },
    { kanji: "解", reading: "カイ、と", meaning: "풀 해" },
    { kanji: "許", reading: "キョ、ゆる", meaning: "허락할 허" },
    { kanji: "険", reading: "ケン、けわ", meaning: "험할 험" },
    { kanji: "現", reading: "ゲン、あらわ", meaning: "나타날 현" },
    { kanji: "型", reading: "ケイ、かた", meaning: "모형 형" },
    { kanji: "護", reading: "ゴ、まも", meaning: "도울 호" },
    { kanji: "混", reading: "コン、ま", meaning: "섞을 혼" },
    { kanji: "確", reading: "カク、たし", meaning: "굳을 확" },
    { kanji: "効", reading: "コウ、き", meaning: "본받을 효" },
    { kanji: "厚", reading: "コウ、あつ", meaning: "두터울 후" },
    { kanji: "興", reading: "コウ、おこ", meaning: "일 흥" },
    { kanji: "喜", reading: "キ、よろこ", meaning: "기쁠 희" },
  ],
  elementary6: [
    // 초등학교 6학년 (191자)
    { kanji: "刻", reading: "コク、きざ", meaning: "새길 각" },
    { kanji: "閣", reading: "カク", meaning: "집 각" },
    { kanji: "干", reading: "カン、ほ", meaning: "방패 간" },
    { kanji: "看", reading: "カン", meaning: "볼 간" },
    { kanji: "簡", reading: "カン、かん", meaning: "간략할 간" },
    { kanji: "降", reading: "コウ、お", meaning: "내릴 강" },
    { kanji: "鋼", reading: "コウ、はがね", meaning: "강철 강" },
    { kanji: "激", reading: "ゲキ、はげ", meaning: "격할 격" },
    { kanji: "絹", reading: "ケン、きぬ", meaning: "비단 견" },
    { kanji: "敬", reading: "ケイ、うやま", meaning: "공경 경" },
    { kanji: "警", reading: "ケイ", meaning: "깨우칠 경" },
    { kanji: "系", reading: "ケイ", meaning: "이어맬 계" },
    { kanji: "届", reading: "とど", meaning: "이를 계" },
    { kanji: "穀", reading: "コク", meaning: "곡식 곡" },
    { kanji: "困", reading: "コン、こま", meaning: "곤할 곤" },
    { kanji: "骨", reading: "コツ、ほね", meaning: "뼈 골" },
    { kanji: "供", reading: "キョウ、そな", meaning: "이바지할 공" },
    { kanji: "券", reading: "ケン", meaning: "문서 권" },
    { kanji: "巻", reading: "カン、ま", meaning: "책 권" },
    { kanji: "権", reading: "ケン", meaning: "권세 권" },
    { kanji: "机", reading: "キ、つくえ", meaning: "책상 궤" },
    { kanji: "貴", reading: "キ、たっと", meaning: "귀할 귀" },
    { kanji: "劇", reading: "ゲキ", meaning: "심할 극" },
    { kanji: "勤", reading: "キン、つと", meaning: "부지런할 근" },
    { kanji: "筋", reading: "キン、すじ", meaning: "힘줄 근" },
    { kanji: "己", reading: "コ、おのれ", meaning: "몸 기" },
    { kanji: "暖", reading: "ダン、あたた", meaning: "따뜻할 난" },
    { kanji: "難", reading: "ナン、むずか", meaning: "어려울 난" },
    { kanji: "納", reading: "ノウ、おさ", meaning: "들일 납" },
    { kanji: "脳", reading: "ノウ", meaning: "뇌수 뇌" },
    { kanji: "段", reading: "ダン", meaning: "층계 단" },
    { kanji: "担", reading: "タン、かつ", meaning: "멜 담" },
    { kanji: "党", reading: "トウ", meaning: "무리 당" },
    { kanji: "糖", reading: "トウ", meaning: "엿 당" },
    { kanji: "乱", reading: "ラン、みだ", meaning: "어지러울 란" },
    { kanji: "卵", reading: "ラン、たまご", meaning: "알 란" },
    { kanji: "覧", reading: "ラン", meaning: "볼 람" },
    { kanji: "朗", reading: "ロウ、ほが", meaning: "밝을 랑" },
    { kanji: "論", reading: "ロン", meaning: "논할 론" },
    { kanji: "律", reading: "リツ、リチ", meaning: "법칙 률" },
    { kanji: "裏", reading: "リ、うら", meaning: "속 리" },
    { kanji: "臨", reading: "リン、のぞ", meaning: "임할 림" },
    { kanji: "幕", reading: "マク、バク", meaning: "장막 막" },
    { kanji: "晩", reading: "バン", meaning: "늦을 만" },
    { kanji: "亡", reading: "ボウ、な", meaning: "망할 망" },
    { kanji: "忘", reading: "ボウ、わす", meaning: "잊을 망" },
    { kanji: "枚", reading: "マイ", meaning: "낱 매" },
    { kanji: "盟", reading: "メイ", meaning: "맹세 맹" },
    { kanji: "暮", reading: "ボ、く", meaning: "저물 모" },
    { kanji: "模", reading: "モ", meaning: "본뜰 모" },
    { kanji: "密", reading: "ミツ、ひそ", meaning: "빽빽할 밀" },
    { kanji: "班", reading: "ハン", meaning: "나눌 반" },
    { kanji: "訪", reading: "ホウ、たず", meaning: "찾을 방" },
    { kanji: "拝", reading: "ハイ、おが", meaning: "절 배" },
    { kanji: "背", reading: "ハイ、せ", meaning: "등 배" },
    { kanji: "俳", reading: "ハイ", meaning: "배우 배" },
    { kanji: "並", reading: "ヘイ、なら", meaning: "나란히 병" },
    { kanji: "宝", reading: "ホウ、たから", meaning: "보배 보" },
    { kanji: "補", reading: "ホ、おぎな", meaning: "기울 보" },
    { kanji: "腹", reading: "フク、はら", meaning: "배 복" },
    { kanji: "棒", reading: "ボウ", meaning: "막대 봉" },
    { kanji: "否", reading: "ヒ、いな", meaning: "아닐 부" },
    { kanji: "奮", reading: "フン、ふる", meaning: "떨칠 분" },
    { kanji: "批", reading: "ヒ", meaning: "비평할 비" },
    { kanji: "秘", reading: "ヒ、ひ", meaning: "숨길 비" },
    { kanji: "私", reading: "シ、わたくし", meaning: "사사 사" },
    { kanji: "砂", reading: "サ、すな", meaning: "모래 사" },
    { kanji: "射", reading: "シャ、い", meaning: "쏠 사" },
    { kanji: "捨", reading: "シャ、す", meaning: "버릴 사" },
    { kanji: "詞", reading: "シ", meaning: "말 사" },
    { kanji: "傷", reading: "ショウ、きず", meaning: "다칠 상" },
    { kanji: "署", reading: "ショ", meaning: "마을 서" },
    { kanji: "宣", reading: "セン", meaning: "베풀 선" },
    { kanji: "善", reading: "ゼン、よ", meaning: "착할 선" },
    { kanji: "舌", reading: "ゼツ、した", meaning: "혀 설" },
    { kanji: "盛", reading: "セイ、も", meaning: "성할 성" },
    { kanji: "聖", reading: "セイ", meaning: "성인 성" },
    { kanji: "誠", reading: "セイ、まこと", meaning: "정성 성" },
    { kanji: "洗", reading: "セン、あら", meaning: "씻을 세" },
    { kanji: "収", reading: "シュウ、おさ", meaning: "거둘 수" },
    { kanji: "垂", reading: "スイ、た", meaning: "드리울 수" },
    { kanji: "樹", reading: "ジュ", meaning: "나무 수" },
    { kanji: "熟", reading: "ジュク、う", meaning: "익을 숙" },
    { kanji: "純", reading: "ジュン", meaning: "순수할 순" },
    { kanji: "承", reading: "ショウ、うけたまわ", meaning: "이을 승" },
    { kanji: "視", reading: "シ", meaning: "볼 시" },
    { kanji: "我", reading: "ガ、われ", meaning: "나 아" },
    { kanji: "若", reading: "ジャク、わか", meaning: "같을 약" },
    { kanji: "厳", reading: "ゲン、きび", meaning: "엄할 엄" },
    { kanji: "訳", reading: "ヤク、わけ", meaning: "번역할 역" },
    { kanji: "域", reading: "イキ", meaning: "지경 역" },
    { kanji: "沿", reading: "エン、そ", meaning: "물따라갈 연" },
    { kanji: "延", reading: "エン、の", meaning: "늘일 연" },
    { kanji: "染", reading: "セン、そ", meaning: "물들 염" },
    { kanji: "映", reading: "エイ、うつ", meaning: "비칠 영" },
    { kanji: "預", reading: "ヨ、あず", meaning: "맡길 예" },
    { kanji: "誤", reading: "ゴ、あやま", meaning: "그르칠 오" },
    { kanji: "欲", reading: "ヨク、ほっ", meaning: "하고자할 욕" },
    { kanji: "宇", reading: "ウ", meaning: "집 우" },
    { kanji: "郵", reading: "ユウ", meaning: "우편 우" },
    { kanji: "優", reading: "ユウ、やさ", meaning: "넉넉할 우" },
    { kanji: "源", reading: "ゲン、みなもと", meaning: "근원 원" },
    { kanji: "胃", reading: "イ", meaning: "밥통 위" },
    { kanji: "危", reading: "キ、あぶ", meaning: "위태할 위" },
    { kanji: "幼", reading: "ヨウ、おさな", meaning: "어릴 유" },
    { kanji: "乳", reading: "ニュウ、ちち", meaning: "젖 유" },
    { kanji: "遺", reading: "イ", meaning: "남길 유" },
    { kanji: "恩", reading: "オン", meaning: "은혜 은" },
    { kanji: "疑", reading: "ギ、うたが", meaning: "의심할 의" },
    { kanji: "異", reading: "イ、こと", meaning: "다를 이" },
    { kanji: "翌", reading: "ヨク", meaning: "다음날 익" },
    { kanji: "仁", reading: "ジン", meaning: "어질 인" },
    { kanji: "認", reading: "ニン、みと", meaning: "알 인" },
    { kanji: "賃", reading: "チン", meaning: "품삯 임" },
    { kanji: "姿", reading: "シ、すがた", meaning: "모양 자" },
    { kanji: "磁", reading: "ジ", meaning: "자석 자" },
    { kanji: "蚕", reading: "サン、かいこ", meaning: "누에 잠" },
    { kanji: "腸", reading: "チョウ", meaning: "창자 장" },
    { kanji: "将", reading: "ショウ", meaning: "장수 장" },
    { kanji: "装", reading: "ソウ、よそお", meaning: "꾸밀 장" },
    { kanji: "障", reading: "ショウ、さわ", meaning: "막을 장" },
    { kanji: "蔵", reading: "ゾウ、くら", meaning: "감출 장" },
    { kanji: "臓", reading: "ゾウ", meaning: "오장 장" },
    { kanji: "裁", reading: "サイ、た", meaning: "옷마를 재" },
    { kanji: "著", reading: "チョ、あらわ", meaning: "나타날 저" },
    { kanji: "敵", reading: "テキ", meaning: "대적할 적" },
    { kanji: "銭", reading: "セン、ぜに", meaning: "돈 전" },
    { kanji: "専", reading: "セン、もっぱ", meaning: "오로지 전" },
    { kanji: "展", reading: "テン", meaning: "펼 전" },
    { kanji: "頂", reading: "チョウ、いただ", meaning: "정수리 정" },
    { kanji: "除", reading: "ジョ、のぞ", meaning: "덜 제" },
    { kanji: "済", reading: "サイ、す", meaning: "건널 제" },
    { kanji: "諸", reading: "ショ", meaning: "모두 제" },
    { kanji: "潮", reading: "チョウ、しお", meaning: "밀물 조" },
    { kanji: "操", reading: "ソウ、あやつ", meaning: "잡을 조" },
    { kanji: "存", reading: "ソン、そん", meaning: "있을 존" },
    { kanji: "尊", reading: "ソン、とうと", meaning: "높을 존" },
    { kanji: "宗", reading: "シュウ", meaning: "마루 종" },
    { kanji: "従", reading: "ジュウ、したが", meaning: "좇을 종" },
    { kanji: "縦", reading: "ジュウ、たて", meaning: "세로 종" },
    { kanji: "座", reading: "ザ、すわ", meaning: "자리 좌" },
    { kanji: "宙", reading: "チュウ", meaning: "집 주" },
    { kanji: "奏", reading: "ソウ、かな", meaning: "아뢸 주" },
    { kanji: "株", reading: "かぶ", meaning: "그루 주" },
    { kanji: "衆", reading: "シュウ", meaning: "무리 중" },
    { kanji: "蒸", reading: "ジョウ、む", meaning: "찔 증" },
    { kanji: "至", reading: "シ、いた", meaning: "이를 지" },
    { kanji: "誌", reading: "シ", meaning: "기록할 지" },
    { kanji: "窓", reading: "ソウ、まど", meaning: "창 창" },
    { kanji: "創", reading: "ソウ、つく", meaning: "비롯할 창" },
    { kanji: "冊", reading: "サツ", meaning: "책 책" },
    { kanji: "策", reading: "サク", meaning: "꾀 책" },
    { kanji: "処", reading: "ショ、ところ", meaning: "곳 처" },
    { kanji: "尺", reading: "シャク", meaning: "자 척" },
    { kanji: "泉", reading: "セン、いずみ", meaning: "샘 천" },
    { kanji: "庁", reading: "チョウ", meaning: "관청 청" },
    { kanji: "寸", reading: "スン", meaning: "마디 촌" },
    { kanji: "推", reading: "スイ、お", meaning: "밀 추" },
    { kanji: "縮", reading: "シュク、ちぢ", meaning: "줄일 축" },
    { kanji: "忠", reading: "チュウ", meaning: "충성 충" },
    { kanji: "就", reading: "シュウ、つ", meaning: "나아갈 취" },
    { kanji: "層", reading: "ソウ", meaning: "층 층" },
    { kanji: "値", reading: "チ、ね", meaning: "값 치" },
    { kanji: "針", reading: "シン、はり", meaning: "바늘 침" },
    { kanji: "誕", reading: "タン", meaning: "낳을 탄" },
    { kanji: "探", reading: "タン、さが", meaning: "찾을 탐" },
    { kanji: "宅", reading: "タク", meaning: "집 택" },
    { kanji: "討", reading: "トウ、う", meaning: "칠 토" },
    { kanji: "痛", reading: "ツウ、いた", meaning: "아플 통" },
    { kanji: "退", reading: "タイ、しりぞ", meaning: "물러날 퇴" },
    { kanji: "派", reading: "ハ", meaning: "갈래 파" },
    { kanji: "片", reading: "ヘン、かた", meaning: "조각 편" },
    { kanji: "肺", reading: "ハイ", meaning: "허파 폐" },
    { kanji: "陛", reading: "ヘイ", meaning: "대궐섬돌 폐" },
    { kanji: "閉", reading: "ヘイ、と", meaning: "닫을 폐" },
    { kanji: "俵", reading: "ヒョウ、たわら", meaning: "나누어줄 표" },
    { kanji: "割", reading: "カツ、わ", meaning: "벨 할" },
    { kanji: "郷", reading: "キョウ、ゴウ", meaning: "시골 향" },
    { kanji: "憲", reading: "ケン", meaning: "법 헌" },
    { kanji: "革", reading: "カク、かわ", meaning: "가죽 혁" },
    { kanji: "穴", reading: "ケツ、あな", meaning: "굴 혈" },
    { kanji: "呼", reading: "コ、よ", meaning: "부를 호" },
    { kanji: "紅", reading: "コウ、べに", meaning: "붉을 홍" },
    { kanji: "拡", reading: "カク、ひろ", meaning: "넓힐 확" },
    { kanji: "皇", reading: "コウ", meaning: "임금 황" },
    { kanji: "灰", reading: "カイ、はい", meaning: "재 회" },
    { kanji: "孝", reading: "コウ", meaning: "효도 효" },
    { kanji: "后", reading: "コウ", meaning: "임금 후" },
    { kanji: "揮", reading: "キ、ふる", meaning: "휘두를 휘" },
    { kanji: "胸", reading: "キョウ、むね", meaning: "가슴 흉" },
    { kanji: "吸", reading: "キュウ、す", meaning: "마실 흡" },
  ],
  middle1: [
    { kanji: "暇", reading: "カ、ひま", meaning: "틈 가" },
{ kanji: "却", reading: "キャク", meaning: "물리칠 각" },
{ kanji: "脚", reading: "キャク、あし", meaning: "다리 각" },
{ kanji: "甘", reading: "カン、あま", meaning: "달 감" },
{ kanji: "監", reading: "カン", meaning: "볼 감" },
{ kanji: "鑑", reading: "カン", meaning: "거울 감" },
{ kanji: "介", reading: "カイ", meaning: "낄 개" },
{ kanji: "皆", reading: "カイ、みな", meaning: "다 개" },
{ kanji: "箇", reading: "カ", meaning: "낱 개" },
{ kanji: "巨", reading: "キョ", meaning: "클 거" },
{ kanji: "拠", reading: "キョ", meaning: "근거 거" },
{ kanji: "距", reading: "キョ", meaning: "상거할 거" },
{ kanji: "乾", reading: "カン、かわ", meaning: "하늘 건" },
{ kanji: "剣", reading: "ケン、つるぎ", meaning: "칼 검" },
{ kanji: "撃", reading: "ゲキ、う", meaning: "칠 격" },
{ kanji: "肩", reading: "ケン、かた", meaning: "어깨 견" },
{ kanji: "堅", reading: "ケン、かた", meaning: "굳을 견" },
{ kanji: "遣", reading: "ケン、つか", meaning: "보낼 견" },
{ kanji: "兼", reading: "ケン、か", meaning: "겸할 겸" },
{ kanji: "更", reading: "コウ、さら", meaning: "고칠 경" },
{ kanji: "傾", reading: "ケイ、かたむ", meaning: "기울 경" },
{ kanji: "驚", reading: "キョウ、おどろ", meaning: "놀랄 경" },
{ kanji: "戒", reading: "カイ、いまし", meaning: "경계할 계" },
{ kanji: "継", reading: "ケイ、つ", meaning: "이을 계" },
{ kanji: "枯", reading: "コ、か", meaning: "마를 고" },
{ kanji: "鼓", reading: "コ、つづみ", meaning: "북 고" },
{ kanji: "稿", reading: "コウ", meaning: "원고 고" },
{ kanji: "攻", reading: "コウ、せ", meaning: "칠 공" },
{ kanji: "恐", reading: "キョウ、おそ", meaning: "두려울 공" },
{ kanji: "菓", reading: "カ", meaning: "과자 과" },
{ kanji: "誇", reading: "コ、ほこ", meaning: "자랑할 과" },
{ kanji: "狂", reading: "キョウ、くる", meaning: "미칠 광" },
{ kanji: "壊", reading: "カイ、こわ", meaning: "무너질 괴" },
{ kanji: "較", reading: "カク", meaning: "견줄 교" },
{ kanji: "丘", reading: "キュウ、おか", meaning: "언덕 구" },
{ kanji: "駆", reading: "ク、か", meaning: "몰 구" },
{ kanji: "屈", reading: "クツ、かが", meaning: "굽힐 굴" },
{ kanji: "掘", reading: "クツ、ほ", meaning: "팔 굴" },
{ kanji: "圏", reading: "ケン", meaning: "우리 권" },
{ kanji: "勧", reading: "カン、すす", meaning: "권할 권" },
{ kanji: "鬼", reading: "キ、おに", meaning: "귀신 귀" },
{ kanji: "叫", reading: "キョウ、さけ", meaning: "부르짖을 규" },
{ kanji: "及", reading: "キュウ、およ", meaning: "미칠 급" },
{ kanji: "扱", reading: "ソウ、あつか", meaning: "거둘 급" },
{ kanji: "祈", reading: "キ、いの", meaning: "빌 기" },
{ kanji: "奇", reading: "キ", meaning: "기특할 기" },
{ kanji: "幾", reading: "キ、いく", meaning: "몇 기" },
{ kanji: "娘", reading: "ジョウ、むすめ", meaning: "계집 낭" },
{ kanji: "耐", reading: "タイ、た", meaning: "견딜 내" },
{ kanji: "奴", reading: "ド、やつ", meaning: "종 노" },
{ kanji: "怒", reading: "ド、いか", meaning: "성낼 노" },
{ kanji: "濃", reading: "ノウ、こ", meaning: "짙을 농" },
{ kanji: "悩", reading: "ノウ、なや", meaning: "번뇌할 뇌" },
{ kanji: "丹", reading: "タン", meaning: "붉을 단" },
{ kanji: "端", reading: "タン、はし", meaning: "끝 단" },
{ kanji: "淡", reading: "タン、あわ", meaning: "맑을 담" },
{ kanji: "曇", reading: "ドン、くも", meaning: "흐릴 담" },
{ kanji: "踏", reading: "トウ、ふ", meaning: "밟을 답" },
{ kanji: "唐", reading: "トウ", meaning: "당나라 당" },
{ kanji: "到", reading: "トウ、いた", meaning: "이를 도" },
{ kanji: "逃", reading: "トウ、に", meaning: "도망할 도" },
{ kanji: "倒", reading: "トウ、たお", meaning: "넘어질 도" },
{ kanji: "桃", reading: "トウ、もも", meaning: "복숭아 도" },
{ kanji: "途", reading: "ト", meaning: "길 도" },
{ kanji: "盗", reading: "トウ、ぬす", meaning: "도둑 도" },
{ kanji: "渡", reading: "ト、わた", meaning: "건널 도" },
{ kanji: "跳", reading: "チョウ、と", meaning: "뛸 도" },
{ kanji: "稲", reading: "トウ、いね", meaning: "벼 도" },
{ kanji: "突", reading: "トツ、つ", meaning: "갑자기 돌" },
{ kanji: "胴", reading: "ドウ", meaning: "큰창자 동" },
{ kanji: "鈍", reading: "ドン、にぶ", meaning: "둔할 둔" },
{ kanji: "絡", reading: "ラク、から", meaning: "이을 락" },
{ kanji: "欄", reading: "ラン", meaning: "난간 란" },
{ kanji: "郎", reading: "ロウ", meaning: "사내 랑" },
{ kanji: "慮", reading: "リョ", meaning: "생각할 려" },
{ kanji: "麗", reading: "レイ、うるわ", meaning: "고울 려" },
{ kanji: "暦", reading: "レキ、こよみ", meaning: "책력 력" },
{ kanji: "恋", reading: "レン、こ", meaning: "그리워할 련" },
{ kanji: "劣", reading: "レツ、おと", meaning: "못할 렬" },
{ kanji: "烈", reading: "レツ", meaning: "매울 렬" },
{ kanji: "齢", reading: "レイ", meaning: "나이 령" },
{ kanji: "隷", reading: "レイ", meaning: "종 례" },
{ kanji: "露", reading: "ロ、つゆ", meaning: "이슬 로" },
{ kanji: "雷", reading: "ライ、かみなり", meaning: "우레 뢰" },
{ kanji: "頼", reading: "ライ、たの", meaning: "의뢰할 뢰" },
{ kanji: "療", reading: "リョウ", meaning: "병고칠 료" },
{ kanji: "涙", reading: "ルイ、なみだ", meaning: "눈물 루" },
{ kanji: "離", reading: "リ、はな", meaning: "떠날 리" },
{ kanji: "隣", reading: "リン、となり", meaning: "이웃 린" },
{ kanji: "粒", reading: "リュウ、つぶ", meaning: "낟알 립" },
{ kanji: "慢", reading: "マン", meaning: "거만할 만" },
{ kanji: "漫", reading: "マン", meaning: "흩어질 만" },
{ kanji: "忙", reading: "ボウ、いそが", meaning: "바쁠 망" },
{ kanji: "網", reading: "モウ、あみ", meaning: "그물 망" },
{ kanji: "猛", reading: "モウ", meaning: "사나울 맹" },
{ kanji: "眠", reading: "ミン、ねむ", meaning: "잘 면" },
{ kanji: "矛", reading: "ム、ほこ", meaning: "창 모" },
{ kanji: "冒", reading: "ボウ、おか", meaning: "무릅쓸 모" },
{ kanji: "帽", reading: "ボウ", meaning: "모자 모" },
{ kanji: "妙", reading: "ミョウ", meaning: "묘할 묘" },
{ kanji: "描", reading: "ビョウ、えが", meaning: "그릴 묘" },
{ kanji: "茂", reading: "モ、しげ", meaning: "무성할 무" },
{ kanji: "舞", reading: "ブ、ま", meaning: "춤출 무" },
{ kanji: "霧", reading: "ム、きり", meaning: "안개 무" },
{ kanji: "黙", reading: "モク、だま", meaning: "잠잠할 묵" },
{ kanji: "紋", reading: "モン", meaning: "무늬 문" },
{ kanji: "尾", reading: "ビ、お", meaning: "꼬리 미" },
{ kanji: "微", reading: "ビ", meaning: "작을 미" },
{ kanji: "敏", reading: "ビン", meaning: "민첩할 민" },
{ kanji: "拍", reading: "ハク", meaning: "칠 박" },
{ kanji: "迫", reading: "ハク、せま", meaning: "핍박할 박" },
{ kanji: "泊", reading: "ハク、と", meaning: "머무를 박" },
{ kanji: "薄", reading: "ハク、うす", meaning: "엷을 박" },
{ kanji: "般", reading: "ハン", meaning: "가지 반" },
{ kanji: "搬", reading: "ハン", meaning: "옮길 반" },
{ kanji: "盤", reading: "バン", meaning: "소반 반" },
{ kanji: "抜", reading: "バツ、ぬ", meaning: "뽑을 발" },
{ kanji: "髪", reading: "ハツ、かみ", meaning: "터럭 발" },
{ kanji: "坊", reading: "ボウ", meaning: "동네 방" },
{ kanji: "肪", reading: "ボウ", meaning: "기름 방" },
{ kanji: "傍", reading: "ボウ、そば", meaning: "곁 방" },
{ kanji: "杯", reading: "ハイ、さかずき", meaning: "잔 배" },
{ kanji: "輩", reading: "ハイ", meaning: "무리 배" },
{ kanji: "繁", reading: "ハン", meaning: "번성할 번" },
{ kanji: "罰", reading: "バツ、ばち", meaning: "벌할 벌" },
{ kanji: "凡", reading: "ボン、およ", meaning: "무릇 범" },
{ kanji: "範", reading: "ハン", meaning: "법 범" },
{ kanji: "壁", reading: "ヘキ、かべ", meaning: "벽 벽" },
{ kanji: "柄", reading: "ヘイ、がら", meaning: "자루 병" },
{ kanji: "普", reading: "フ", meaning: "넓을 보" },
{ kanji: "峰", reading: "ホウ、みね", meaning: "멧부리 봉" },
{ kanji: "浮", reading: "フ、う", meaning: "뜰 부" },
{ kanji: "腐", reading: "フ、くさ", meaning: "썩을 부" },
{ kanji: "賦", reading: "フ", meaning: "부세 부" },
{ kanji: "敷", reading: "フ、し", meaning: "펼 부" },
{ kanji: "膚", reading: "フ", meaning: "살갗 부" },
{ kanji: "盆", reading: "ボン", meaning: "동이 분" },
{ kanji: "噴", reading: "フン、ふ", meaning: "뿜을 분" },
{ kanji: "払", reading: "フツ、はら", meaning: "떨칠 불" },
{ kanji: "浜", reading: "ヒン、はま", meaning: "물가 빈" },
{ kanji: "伺", reading: "シ、うかが", meaning: "엿볼 사" },
{ kanji: "斜", reading: "シャ、なな", meaning: "비낄 사" },
{ kanji: "床", reading: "ショウ、とこ", meaning: "상 상" },
{ kanji: "峠", reading: "とうげ", meaning: "고개 상" },
{ kanji: "詳", reading: "ショウ、くわ", meaning: "자세할 상" },
{ kanji: "釈", reading: "シャク", meaning: "풀 석" },
{ kanji: "扇", reading: "セン、おうぎ", meaning: "부채 선" },
{ kanji: "鮮", reading: "セン、あざ", meaning: "고울 선" },
{ kanji: "姓", reading: "セイ", meaning: "성 성" },
{ kanji: "歳", reading: "サイ", meaning: "해 세" },
{ kanji: "召", reading: "ショウ、め", meaning: "부를 소" },
{ kanji: "沼", reading: "ショウ、ぬま", meaning: "못 소" },
{ kanji: "咲", reading: "ショウ、さ", meaning: "웃을 소" },
{ kanji: "紹", reading: "ショウ", meaning: "이을 소" },
{ kanji: "訴", reading: "ソ、うった", meaning: "호소할 소" },
{ kanji: "騒", reading: "ソウ、さわ", meaning: "떠들 소" },
{ kanji: "俗", reading: "ゾク", meaning: "풍속 속" },
{ kanji: "鎖", reading: "サ、くさり", meaning: "쇠사슬 쇄" },
{ kanji: "秀", reading: "シュウ、ひい", meaning: "빼어날 수" },
{ kanji: "狩", reading: "シュ、か", meaning: "사냥할 수" },
{ kanji: "需", reading: "ジュ", meaning: "쓰일 수" },
{ kanji: "獣", reading: "ジュウ、けもの", meaning: "짐승 수" },
{ kanji: "旬", reading: "ジュン", meaning: "열흘 순" },
{ kanji: "巡", reading: "ジュン、めぐ", meaning: "돌 순" },
{ kanji: "盾", reading: "ジュン、たて", meaning: "방패 순" },
{ kanji: "瞬", reading: "シュン、またた", meaning: "눈깜짝일 순" },
{ kanji: "襲", reading: "シュウ、おそ", meaning: "엄습할 습" },
{ kanji: "僧", reading: "ソウ", meaning: "중 승" },
{ kanji: "是", reading: "ゼ、これ", meaning: "이 시" },
{ kanji: "殖", reading: "ショク、ふ", meaning: "불릴 식" },
{ kanji: "飾", reading: "ショク、かざ", meaning: "꾸밀 식" },
{ kanji: "慎", reading: "シン、つつし", meaning: "삼갈 신" },
{ kanji: "薪", reading: "シン、まき", meaning: "섶 신" },
{ kanji: "尋", reading: "ジン、たず", meaning: "찾을 심" },
{ kanji: "雅", reading: "ガ、みやび", meaning: "맑을 아" },
{ kanji: "握", reading: "アク、にぎ", meaning: "쥘 악" },
{ kanji: "押", reading: "オウ、お", meaning: "누를 압" },
{ kanji: "仰", reading: "ギョウ、あお", meaning: "우러를 앙" },
{ kanji: "躍", reading: "ヤク、おど", meaning: "뛸 약" },
{ kanji: "御", reading: "ギョ、お", meaning: "거느릴 어" },
{ kanji: "憶", reading: "オク", meaning: "생각할 억" },
{ kanji: "与", reading: "ヨ、あた", meaning: "더불 여" },
{ kanji: "鉛", reading: "エン、なまり", meaning: "납 연" },
{ kanji: "煙", reading: "エン、けむり", meaning: "연기 연" },
{ kanji: "縁", reading: "エン、ふち", meaning: "인연 연" },
{ kanji: "迎", reading: "ゲイ、むか", meaning: "맞을 영" },
{ kanji: "影", reading: "エイ、かげ", meaning: "그림자 영" },
{ kanji: "刈", reading: "ガイ、か", meaning: "벨 예" },
{ kanji: "誉", reading: "ヨ、ほま", meaning: "기릴 예" },
{ kanji: "鋭", reading: "エイ、するど", meaning: "날카로울 예" },
{ kanji: "汚", reading: "オ、けが", meaning: "더러울 오" },
{ kanji: "奥", reading: "オウ、おく", meaning: "깊을 오" },
{ kanji: "腕", reading: "ワン、うで", meaning: "팔뚝 완" },
{ kanji: "腰", reading: "ヨウ、こし", meaning: "허리 요" },
{ kanji: "謡", reading: "ヨウ、うた", meaning: "노래 요" },
{ kanji: "溶", reading: "ヨウ、と", meaning: "녹을 용" },
{ kanji: "踊", reading: "ヨウ、おど", meaning: "뛸 용" },
{ kanji: "芋", reading: "ウ、いも", meaning: "토란 우" },
{ kanji: "雄", reading: "ユウ、お", meaning: "수컷 웅" },
{ kanji: "援", reading: "エン", meaning: "도울 원" },
{ kanji: "越", reading: "エツ、こ", meaning: "넘을 월" },
{ kanji: "為", reading: "イ、な", meaning: "하 위" },
{ kanji: "威", reading: "イ", meaning: "위엄 위" },
{ kanji: "偉", reading: "イ、えら", meaning: "클 위" },
{ kanji: "違", reading: "イ、ちが", meaning: "어긋날 위" },
{ kanji: "緯", reading: "イ", meaning: "씨 위" },
{ kanji: "柔", reading: "ジュウ、やわ", meaning: "부드러울 유" },
{ kanji: "維", reading: "イ", meaning: "벼리 유" },
{ kanji: "隠", reading: "イン、かく", meaning: "숨을 은" },
{ kanji: "陰", reading: "イン、かげ", meaning: "그늘 음" },
{ kanji: "依", reading: "イ、よ", meaning: "의지할 의" },
{ kanji: "儀", reading: "ギ", meaning: "거동 의" },
{ kanji: "弐", reading: "ニ", meaning: "두 이" },
{ kanji: "翼", reading: "ヨク、つばさ", meaning: "날개 익" },
{ kanji: "壱", reading: "イチ", meaning: "한 일" },
{ kanji: "込", reading: "こ", meaning: "담을 입" },
{ kanji: "刺", reading: "シ、さ", meaning: "찌를 자" },
{ kanji: "煮", reading: "シャ、に", meaning: "삶을 자" },
{ kanji: "紫", reading: "シ、むらさき", meaning: "자줏빛 자" },
{ kanji: "雌", reading: "シ、め", meaning: "암컷 자" },
{ kanji: "丈", reading: "ジョウ、たけ", meaning: "어른 장" },
{ kanji: "載", reading: "サイ、の", meaning: "실을 재" },
{ kanji: "抵", reading: "テイ", meaning: "막을 저" },
{ kanji: "寂", reading: "ジャク、さび", meaning: "고요할 적" },
{ kanji: "跡", reading: "セキ、あと", meaning: "발자취 적" },
{ kanji: "摘", reading: "テキ、つ", meaning: "딸 적" },
{ kanji: "滴", reading: "テキ、しずく", meaning: "물방울 적" },
{ kanji: "殿", reading: "デン、との", meaning: "전각 전" },
{ kanji: "占", reading: "セン、し", meaning: "점령할 점" },
{ kanji: "征", reading: "セイ", meaning: "칠 정" },
{ kanji: "剤", reading: "ザイ", meaning: "약제 제" },
{ kanji: "堤", reading: "テイ、つつみ", meaning: "둑 제" },
{ kanji: "燥", reading: "ソウ、かわ", meaning: "마를 조" },
{ kanji: "繰", reading: "ソウ、く", meaning: "고치켤 조" },
{ kanji: "朱", reading: "シュ", meaning: "붉을 주" },
{ kanji: "舟", reading: "シュウ、ふね", meaning: "배 주" },
{ kanji: "即", reading: "ソク、すなわ", meaning: "곧 즉" },
{ kanji: "贈", reading: "ゾウ、おく", meaning: "줄 증" },
{ kanji: "芝", reading: "シ、しば", meaning: "지초 지" },
{ kanji: "旨", reading: "シ、むね", meaning: "뜻 지" },
{ kanji: "脂", reading: "シ、あぶら", meaning: "기름 지" },
{ kanji: "遅", reading: "チ、おく", meaning: "더딜 지" },
{ kanji: "尽", reading: "ジン、つ", meaning: "다할 진" },
{ kanji: "珍", reading: "チン、めずら", meaning: "보배 진" },
{ kanji: "陣", reading: "ジン", meaning: "진칠 진" },
{ kanji: "振", reading: "シン、ふ", meaning: "떨칠 진" },
{ kanji: "震", reading: "シン、ふる", meaning: "우레 진" },
{ kanji: "執", reading: "シツ、と", meaning: "잡을 집" },
{ kanji: "徴", reading: "チョウ", meaning: "부를 징" },
{ kanji: "澄", reading: "チョウ、す", meaning: "맑을 징" },
{ kanji: "惨", reading: "サン、みじ", meaning: "참혹할 참" },
{ kanji: "彩", reading: "サイ、いろど", meaning: "채색 채" },
{ kanji: "拓", reading: "タク", meaning: "넓힐 척" },
{ kanji: "添", reading: "テン、そ", meaning: "더할 첨" },
{ kanji: "畳", reading: "ジョウ、たた", meaning: "거듭 첩" },
{ kanji: "替", reading: "タイ、か", meaning: "바꿀 체" },
{ kanji: "触", reading: "ショク、さわ", meaning: "닿을 촉" },
{ kanji: "蓄", reading: "チク、たくわ", meaning: "모을 축" },
{ kanji: "吹", reading: "スイ、ふ", meaning: "불 취" },
{ kanji: "趣", reading: "シュ、おもむき", meaning: "뜻 취" },
{ kanji: "致", reading: "チ、いた", meaning: "이를 치" },
{ kanji: "恥", reading: "チ、は", meaning: "부끄러울 치" },
{ kanji: "沈", reading: "チン、しず", meaning: "잠길 침" },
{ kanji: "侵", reading: "シン、おか", meaning: "침노할 침" },
{ kanji: "浸", reading: "シン、ひた", meaning: "잠길 침" },
{ kanji: "寝", reading: "シン、ね", meaning: "잘 침" },
{ kanji: "称", reading: "ショウ、とな", meaning: "일컬을 칭" },
{ kanji: "濁", reading: "ダク、にご", meaning: "흐릴 탁" },
{ kanji: "弾", reading: "ダン、たま", meaning: "탄알 탄" },
{ kanji: "嘆", reading: "タン、なげ", meaning: "탄식할 탄" },
{ kanji: "脱", reading: "ダツ、ぬ", meaning: "벗을 탈" },
{ kanji: "塔", reading: "トウ", meaning: "탑 탑" },
{ kanji: "沢", reading: "タク、さわ", meaning: "못 택" },
{ kanji: "吐", reading: "ト、は", meaning: "토할 토" },
{ kanji: "透", reading: "トウ、す", meaning: "사무칠 투" },
{ kanji: "闘", reading: "トウ、たたか", meaning: "싸움 투" },
{ kanji: "販", reading: "ハン", meaning: "팔 판" },
{ kanji: "抱", reading: "ホウ、だ", meaning: "안을 포" },
{ kanji: "怖", reading: "フ、こわ", meaning: "두려워할 포" },
{ kanji: "砲", reading: "ホウ", meaning: "대포 포" },
{ kanji: "捕", reading: "ホ、つか", meaning: "잡을 포" },
{ kanji: "舗", reading: "ホ", meaning: "펼 포" },
{ kanji: "幅", reading: "フク、はば", meaning: "폭 폭" },
{ kanji: "爆", reading: "バク", meaning: "불터질 폭" },
{ kanji: "彼", reading: "ヒ、かれ", meaning: "저 피" },
{ kanji: "疲", reading: "ヒ、つか", meaning: "피곤할 피" },
{ kanji: "被", reading: "ヒ、こうむ", meaning: "입을 피" },
{ kanji: "避", reading: "ヒ、さ", meaning: "피할 피" },
{ kanji: "匹", reading: "ヒツ、ひき", meaning: "짝 필" },
{ kanji: "汗", reading: "カン、あせ", meaning: "땀 한" },
{ kanji: "含", reading: "ガン、ふく", meaning: "머금을 함" },
{ kanji: "抗", reading: "コウ、あらが", meaning: "겨룰 항" },
{ kanji: "恒", reading: "コウ", meaning: "항상 항" },
{ kanji: "項", reading: "コウ", meaning: "항목 항" },
{ kanji: "響", reading: "キョウ、ひび", meaning: "울릴 향" },
{ kanji: "軒", reading: "ケン、のき", meaning: "집 헌" },
{ kanji: "玄", reading: "ゲン", meaning: "검을 현" },
{ kanji: "狭", reading: "キョウ、せま", meaning: "좁을 협" },
{ kanji: "恵", reading: "ケイ、めぐ", meaning: "은혜 혜" },
{ kanji: "互", reading: "ゴ、たが", meaning: "서로 호" },
{ kanji: "豪", reading: "ゴウ", meaning: "호걸 호" },
{ kanji: "惑", reading: "ワク、まど", meaning: "미혹할 혹" },
{ kanji: "婚", reading: "コン", meaning: "혼인할 혼" },
{ kanji: "歓", reading: "カン", meaning: "기쁠 환" },
{ kanji: "環", reading: "カン、わ", meaning: "고리 환" },
{ kanji: "況", reading: "キョウ", meaning: "상황 황" },
{ kanji: "荒", reading: "コウ、あ", meaning: "거칠 황" },
{ kanji: "獲", reading: "カク、え", meaning: "얻을 획" },
{ kanji: "朽", reading: "キュウ、く", meaning: "썩을 후" },
{ kanji: "輝", reading: "キ、かがや", meaning: "빛날 휘" },
{ kanji: "凶", reading: "キョウ", meaning: "흉할 흉" },
{ kanji: "戯", reading: "ギ、たわむ", meaning: "놀이 희" },
{ kanji: "詰", reading: "キツ、つ", meaning: "꾸짖을 힐" }
  ],
  middle2: [ 
  { kanji: "佳", reading: "カ", meaning: "아름다울 가" },
  { kanji: "架", reading: "カ、か(ける)、か(かる)", meaning: "시렁 가" },
  { kanji: "嫁", reading: "カ、とつ(ぐ)、よめ", meaning: "시집갈 가" },
  { kanji: "肝", reading: "カン、きも", meaning: "간 간" },
  { kanji: "墾", reading: "コン", meaning: "개간할 간" },
  { kanji: "勘", reading: "カン", meaning: "헤아릴 감" },
  { kanji: "紺", reading: "コン", meaning: "감색/연보라 감" },
  { kanji: "敢", reading: "カン、あ(えて)", meaning: "감히/구태여 감" },
  { kanji: "甲", reading: "コウ、カン", meaning: "갑옷 갑" },
  { kanji: "綱", reading: "コウ、つな", meaning: "벼리 강" },
  { kanji: "慨", reading: "ガイ", meaning: "슬퍼할 개" },
  { kanji: "概", reading: "ガイ", meaning: "대개 개" },
  { kanji: "坑", reading: "コウ", meaning: "구덩이 갱" },
  { kanji: "倹", reading: "ケン", meaning: "검소할 검" },
  { kanji: "掲", reading: "ケイ、かか(げる)", meaning: "높이들[擧]/걸[掛] 게" },
  { kanji: "憩", reading: "ケイ、いこ(い)、いこ(う)", meaning: "쉴 게" },
  { kanji: "隔", reading: "カク、へだ(てる)、へだ(たる)", meaning: "사이뜰 격" },
  { kanji: "硬", reading: "コウ、かた(い)", meaning: "굳을 경" },
  { kanji: "鯨", reading: "ゲイ、くじら", meaning: "고래 경" },
  { kanji: "契", reading: "ケイ、ちぎ(り)", meaning: "맺을 계" },
  { kanji: "啓", reading: "ケイ、ひら(く)、もう(す)", meaning: "열 계" },
  { kanji: "鶏", reading: "ケイ、にわとり", meaning: "닭 계" },
  { kanji: "孤", reading: "コ", meaning: "외로울 고" },
  { kanji: "雇", reading: "コ、やと(う)", meaning: "품팔 고" },
  { kanji: "顧", reading: "コ、かえり(みる)", meaning: "돌아볼 고" },
  { kanji: "孔", reading: "コウ", meaning: "구멍 공" },
  { kanji: "控", reading: "コウ、ひか(える)", meaning: "당길 공" },
  { kanji: "郭", reading: "カク", meaning: "둘레/외성 곽" },
  { kanji: "冠", reading: "カン、かんむり", meaning: "갓 관" },
  { kanji: "貫", reading: "カン、つらぬ(く)", meaning: "꿸 관" },
  { kanji: "掛", reading: "カイ、か(ける)、か(かる)", meaning: "걸[懸] 괘" },
  { kanji: "怪", reading: "カイ、あや(しい)、あや(しむ)", meaning: "괴이할 괴" },
  { kanji: "塊", reading: "カイ、かたまり", meaning: "흙덩이 괴" },
  { kanji: "巧", reading: "コウ、たく(み)", meaning: "공교할 교" },
  { kanji: "郊", reading: "コウ", meaning: "들[野] 교" },
  { kanji: "絞", reading: "コウ、しぼ(る)、し(める)", meaning: "목맬 교" },
  { kanji: "殴", reading: "オウ、なぐ(る)", meaning: "때릴 구" },
  { kanji: "欧", reading: "オウ", meaning: "구라파/칠 구" },
  { kanji: "拘", reading: "コウ", meaning: "잡을 구" },
  { kanji: "菊", reading: "キク", meaning: "국화 국" },
  { kanji: "軌", reading: "キ", meaning: "바퀴자국 궤" },
  { kanji: "克", reading: "コク、か(つ)", meaning: "이길 극" },
  { kanji: "斤", reading: "キン", meaning: "근[무게단위]/날[刃] 근" },
  { kanji: "企", reading: "キ、くわだ(てる)", meaning: "꾀할 기" },
  { kanji: "忌", reading: "キ、い(む)、い(まわしい)", meaning: "꺼릴 기" },
  { kanji: "既", reading: "キ、すで(に)", meaning: "이미 기" },
  { kanji: "欺", reading: "ギ、あざむ(く)", meaning: "속일 기" },
  { kanji: "棋", reading: "キ", meaning: "바둑 기" },
  { kanji: "棄", reading: "キ、す(てる)", meaning: "버릴 기" },
  { kanji: "騎", reading: "キ", meaning: "말탈 기" },
  { kanji: "緊", reading: "キン", meaning: "긴할 긴" },
  { kanji: "吉", reading: "キツ、よし", meaning: "길할 길" },
  { kanji: "喫", reading: "キツ", meaning: "먹을 끽" },
  { kanji: "諾", reading: "ダク", meaning: "허락할 낙" },
  { kanji: "尿", reading: "ニョウ", meaning: "오줌 뇨" },
  { kanji: "匿", reading: "トク", meaning: "숨길 닉" },
  { kanji: "壇", reading: "ダン、タン", meaning: "단 단" },
  { kanji: "鍛", reading: "タン、きた(える)", meaning: "쇠불릴 단" },
  { kanji: "胆", reading: "タン", meaning: "쓸개 담" },
  { kanji: "袋", reading: "タイ、ふくろ", meaning: "자루 대" },
  { kanji: "陶", reading: "トウ", meaning: "질그릇 도" },
  { kanji: "塗", reading: "ト、ぬ(る)", meaning: "칠할 도" },
  { kanji: "篤", reading: "トク", meaning: "도타울 독" },
  { kanji: "豚", reading: "トン、ぶた", meaning: "돼지 돈" },
  { kanji: "凍", reading: "トウ、こお(る)、こご(える)", meaning: "얼 동" },
  { kanji: "斗", reading: "ト、トウ", meaning: "말 두" },
  { kanji: "痘", reading: "トウ", meaning: "역질 두" },
  { kanji: "裸", reading: "ラ、はだか", meaning: "벗을 라" },
  { kanji: "濫", reading: "ラン", meaning: "넘칠 람" },
  { kanji: "浪", reading: "ロウ、なみ", meaning: "물결 랑" },
  { kanji: "廊", reading: "ロウ", meaning: "사랑채/행랑 랑" },
  { kanji: "糧", reading: "リョウ、かて", meaning: "양식 량" },
  { kanji: "励", reading: "レイ、はげ(む)、はげ(ます)", meaning: "힘쓸 려" },
  { kanji: "錬", reading: "レン、ね(る)", meaning: "쇠불릴/단련할 련" },
  { kanji: "裂", reading: "レツ、さ(く)、さ(ける)", meaning: "찢어질 렬" },
  { kanji: "廉", reading: "レン", meaning: "청렴할 렴" },
  { kanji: "猟", reading: "リョウ", meaning: "사냥 렵" },
  { kanji: "零", reading: "レイ、ゼロ", meaning: "떨어질/영[數字] 령" },
  { kanji: "霊", reading: "レイ、リョウ、たま", meaning: "신령 령" },
  { kanji: "炉", reading: "ロ", meaning: "화로 로" },
  { kanji: "滝", reading: "ロウ、たき", meaning: "젖을 롱" },
  { kanji: "瀬", reading: "ライ、せ", meaning: "여울 뢰" },
  { kanji: "了", reading: "リョウ", meaning: "마칠 료" },
  { kanji: "楼", reading: "ロウ", meaning: "다락 루" },
  { kanji: "漏", reading: "ロウ、も(る)、も(れる)", meaning: "샐 루" },
  { kanji: "隆", reading: "リュウ", meaning: "높을 륭" },
  { kanji: "陵", reading: "リョウ、みささぎ", meaning: "언덕 릉" },
  { kanji: "吏", reading: "リ", meaning: "벼슬아치/관리 리" },
  { kanji: "厘", reading: "リン", meaning: "다스릴 리" },
  { kanji: "魔", reading: "マ", meaning: "마귀 마" },
  { kanji: "膜", reading: "マク", meaning: "꺼풀/막 막" },
  { kanji: "湾", reading: "ワン", meaning: "물굽이 만" },
  { kanji: "蛮", reading: "バン", meaning: "오랑캐 만" },
  { kanji: "埋", reading: "マイ、う(める)、う(まる)", meaning: "묻을 매" },
  { kanji: "魅", reading: "ミ", meaning: "매혹할 매" },
  { kanji: "免", reading: "メン、まぬが(れる)", meaning: "면할 면" },
  { kanji: "滅", reading: "メツ、ほろ(びる)、ほろ(ぼす)", meaning: "꺼질/멸할 멸" },
  { kanji: "某", reading: "ボウ", meaning: "아무 모" },
  { kanji: "募", reading: "ボ、つの(る)", meaning: "모을/뽑을 모" },
  { kanji: "慕", reading: "ボ、した(う)", meaning: "그릴 모" },
  { kanji: "謀", reading: "ボウ、はか(る)", meaning: "꾀 모" },
  { kanji: "没", reading: "ボツ", meaning: "빠질 몰" },
  { kanji: "苗", reading: "ビョウ、なえ", meaning: "모 묘" },
  { kanji: "墨", reading: "ボク、すみ", meaning: "먹 묵" },
  { kanji: "縛", reading: "バク、しば(る)", meaning: "얽을 박" },
  { kanji: "伴", reading: "バン、ハン、ともな(う)", meaning: "짝 반" },
  { kanji: "畔", reading: "ハン", meaning: "밭두둑 반" },
  { kanji: "芳", reading: "ホウ、かんば(しい)", meaning: "꽃다울 방" },
  { kanji: "妨", reading: "ボウ、さまた(げる)", meaning: "방해할 방" },
  { kanji: "邦", reading: "ホウ", meaning: "나라 방" },
  { kanji: "房", reading: "ボウ、ふさ", meaning: "방 방" },
  { kanji: "倣", reading: "ホウ、なら(う)", meaning: "본뜰 방" },
  { kanji: "排", reading: "ハイ", meaning: "밀칠 배" },
  { kanji: "陪", reading: "バイ", meaning: "모실 배" },
  { kanji: "藩", reading: "ハン", meaning: "울타리 번" },
  { kanji: "翻", reading: "ホン、ひるがえ(る)、ひるがえ(す)", meaning: "번역할 번" },
  { kanji: "伐", reading: "バツ", meaning: "칠[討] 벌" },
  { kanji: "帆", reading: "ハン、ほ", meaning: "돛 범" },
  { kanji: "癖", reading: "ヘキ", meaning: "버릇 벽" },
  { kanji: "伏", reading: "フク、ふ(せる)、ふ(す)", meaning: "엎드릴 복" },
  { kanji: "覆", reading: "フク、おお(う)、くつがえ(る)", meaning: "덮을 부 | 다시 복" },
  { kanji: "奉", reading: "ホウ、たてまつ(る)", meaning: "받들 봉" },
  { kanji: "封", reading: "フウ、ホウ", meaning: "봉할 봉" },
  { kanji: "縫", reading: "ホウ、ぬ(う)", meaning: "꿰맬 봉" },
  { kanji: "赴", reading: "フ、おもむ(く)", meaning: "다다를[趨而至]/갈[趨] 부" },
  { kanji: "符", reading: "フ", meaning: "부호 부" },
  { kanji: "簿", reading: "ボ", meaning: "문서 부" },
  { kanji: "紛", reading: "フン、まぎ(れる)、まぎ(らわしい)", meaning: "어지러울 분" },
  { kanji: "墳", reading: "フン", meaning: "무덤 분" },
  { kanji: "崩", reading: "ホウ、くず(れる)、くず(す)", meaning: "무너질 붕" },
  { kanji: "泌", reading: "ヒツ", meaning: "분비할 비 | 스며흐를 필" },
  { kanji: "卑", reading: "ヒ、いや(しい)", meaning: "낮을 비" },
  { kanji: "碑", reading: "ヒ", meaning: "비석 비" },
  { kanji: "邪", reading: "ジャ、よこし(ま)", meaning: "간사할 사" },
  { kanji: "卸", reading: "シャ、おろ(す)", meaning: "풀/도매할 사" },
  { kanji: "赦", reading: "シャ", meaning: "용서할 사" },
  { kanji: "削", reading: "サク、けず(る)", meaning: "깎을 삭" },
  { kanji: "桑", reading: "ソウ、くわ", meaning: "뽕나무 상" },
  { kanji: "牲", reading: "セイ", meaning: "희생 생" },
  { kanji: "徐", reading: "ジョ", meaning: "천천할 서" },
  { kanji: "婿", reading: "セイ、むこ", meaning: "사위 서" },
  { kanji: "惜", reading: "セキ、お(しい)、お(しむ)", meaning: "아낄 석" },
  { kanji: "繕", reading: "ゼン、つくろ(う)", meaning: "기울 선" },
  { kanji: "摂", reading: "セツ", meaning: "다스릴/잡을 섭" },
  { kanji: "掃", reading: "ソウ、は(く)", meaning: "쓸[掃除] 소" },
  { kanji: "衰", reading: "スイ、おとろ(える)", meaning: "쇠할 쇠" },
  { kanji: "寿", reading: "ジュ、ことぶき", meaning: "목숨 수" },
  { kanji: "粋", reading: "スイ、いき", meaning: "순수할 수" },
  { kanji: "殊", reading: "シュ、こと", meaning: "다를 수" },
  { kanji: "遂", reading: "スイ、と(げる)", meaning: "드디어 수" },
  { kanji: "随", reading: "ズイ", meaning: "따를 수" },
  { kanji: "穂", reading: "スイ、ほ", meaning: "이삭 수" },
  { kanji: "髄", reading: "ズイ", meaning: "뼛골 수" },
  { kanji: "湿", reading: "シツ、しめ(る)、しめ(す)", meaning: "젖을 습" },
  { kanji: "昇", reading: "ショウ、のぼ(る)", meaning: "오를 승" },
  { kanji: "侍", reading: "ジ、さむらい", meaning: "모실 시" },
  { kanji: "施", reading: "シ、ほどこ(す)", meaning: "베풀 시" },
  { kanji: "伸", reading: "シン、の(びる)、の(ばす)", meaning: "펼 신" },
  { kanji: "辛", reading: "シン、から(い)", meaning: "매울 신" },
  { kanji: "審", reading: "シン", meaning: "살필 심" },
  { kanji: "双", reading: "ソウ、ふた", meaning: "두/쌍 쌍" },
  { kanji: "餓", reading: "ガ", meaning: "주릴 아" },
  { kanji: "岳", reading: "ガク、たけ", meaning: "큰산 악" },
  { kanji: "哀", reading: "アイ、あわ(れ)", meaning: "슬플 애" },
  { kanji: "揚", reading: "ヨウ、あ(げる)、あ(がる)", meaning: "날릴 양" },
  { kanji: "嬢", reading: "ジョウ", meaning: "아가씨 양" },
  { kanji: "譲", reading: "ジョウ、ゆず(る)", meaning: "사양할 양" },
  { kanji: "抑", reading: "ヨク、おさ(える)", meaning: "누를 억" },
  { kanji: "如", reading: "ジョ、ニョ", meaning: "같을 여" },
  { kanji: "宴", reading: "エン", meaning: "잔치 연" },
  { kanji: "悦", reading: "エツ", meaning: "기쁠 열" },
  { kanji: "閲", reading: "エツ", meaning: "볼[覽] 열" },
  { kanji: "炎", reading: "エン、ほのお", meaning: "불꽃 염" },
  { kanji: "詠", reading: "エイ、よ(む)", meaning: "읊을 영" },
  { kanji: "娯", reading: "ゴ", meaning: "즐길 오" },
  { kanji: "悟", reading: "ゴ、さと(る)", meaning: "깨달을 오" },
  { kanji: "獄", reading: "ゴク", meaning: "옥[囚舍] 옥" },
  { kanji: "穏", reading: "オン、おだ(やか)", meaning: "편안할 온" },
  { kanji: "擁", reading: "ヨウ", meaning: "낄 옹" },
  { kanji: "緩", reading: "カン、ゆる(い)、ゆる(む)", meaning: "느릴 완" },
  { kanji: "揺", reading: "ヨウ、ゆ(れる)、ゆ(る)", meaning: "흔들 요" },
  { kanji: "辱", reading: "ジョク、はずかし(める)", meaning: "욕될 욕" },
  { kanji: "冗", reading: "ジョウ", meaning: "한산할/번잡할[宂] 용" },
  { kanji: "又", reading: "ユウ、また", meaning: "또 우" },
  { kanji: "偶", reading: "グウ", meaning: "짝 우" },
  { kanji: "遇", reading: "グウ", meaning: "만날 우" },
  { kanji: "愚", reading: "グ、おろ(か)", meaning: "어리석을 우" },
  { kanji: "憂", reading: "ユウ、うれ(い)、うれ(える)", meaning: "근심 우" },
  { kanji: "慰", reading: "イ、なぐさ(める)、なぐさ(む)", meaning: "위로할 위" },
  { kanji: "幽", reading: "ユウ", meaning: "그윽할 유" },
  { kanji: "誘", reading: "ユウ、さそ(う)", meaning: "꾈 유" },
  { kanji: "潤", reading: "ジュン、うるお(う)、うるお(す)", meaning: "불을 윤" },
  { kanji: "乙", reading: "オツ", meaning: "새 을" },
  { kanji: "凝", reading: "ギョウ、こ(る)、こ(らす)", meaning: "엉길 응" },
  { kanji: "慈", reading: "ジ", meaning: "사랑 자" },
  { kanji: "諮", reading: "シ", meaning: "물을 자" },
  { kanji: "潜", reading: "セン、ひそ(む)、もぐ(る)", meaning: "잠길 잠" },
  { kanji: "暫", reading: "ザン、しばら(く)", meaning: "잠깐 잠" },
  { kanji: "匠", reading: "ショウ、たくみ", meaning: "장인 장" },
  { kanji: "葬", reading: "ソウ、ほうむ(る)", meaning: "장사지낼 장" },
  { kanji: "掌", reading: "ショウ、てのひら", meaning: "손바닥 장" },
  { kanji: "賊", reading: "ゾク", meaning: "도둑 적" },
  { kanji: "籍", reading: "セキ", meaning: "문서 적" },
  { kanji: "粘", reading: "ネン、ねば(る)", meaning: "붙을 점" },
  { kanji: "訂", reading: "テイ", meaning: "바로잡을 정" },
  { kanji: "晶", reading: "ショウ", meaning: "맑을 정" },
  { kanji: "錠", reading: "ジョウ", meaning: "덩이 정" },
  { kanji: "帝", reading: "テイ、みかど", meaning: "임금 제" },
  { kanji: "阻", reading: "ソ、はば(む)", meaning: "막힐 조" },
  { kanji: "彫", reading: "チョウ、ほ(る)", meaning: "새길 조" },
  { kanji: "措", reading: "ソ", meaning: "둘[置] 조" },
  { kanji: "粗", reading: "ソ、あら(い)", meaning: "거칠 조" },
  { kanji: "遭", reading: "ソウ、あ(う)", meaning: "만날 조" },
  { kanji: "鐘", reading: "ショウ、かね", meaning: "쇠북 종" },
  { kanji: "鋳", reading: "チュウ、い(る)", meaning: "쇠불릴 주" },
  { kanji: "駐", reading: "チュウ", meaning: "머무를 주" },
  { kanji: "遵", reading: "ジュン", meaning: "좇을 준" },
  { kanji: "憎", reading: "ゾウ、にく(む)", meaning: "미울 증" },
  { kanji: "祉", reading: "シ", meaning: "복(福) 지" },
  { kanji: "陳", reading: "チン", meaning: "베풀 진/묵을 진" },
  { kanji: "鎮", reading: "チン、しず(める)、しず(まる)", meaning: "진압할 진" },
  { kanji: "疾", reading: "シツ", meaning: "병 질" },
  { kanji: "窒", reading: "チツ", meaning: "막힐 질" },
  { kanji: "搾", reading: "サク、しぼ(る)", meaning: "짤 착" },
  { kanji: "錯", reading: "サク", meaning: "어긋날 착" },
  { kanji: "擦", reading: "サツ、す(る)", meaning: "문지를 찰" },
  { kanji: "債", reading: "サイ", meaning: "빚 채" },
  { kanji: "斥", reading: "セキ", meaning: "물리칠 척" },
  { kanji: "隻", reading: "セキ", meaning: "외짝 척" },
  { kanji: "哲", reading: "テツ", meaning: "밝을 철" },
  { kanji: "請", reading: "セイ、こ(う)", meaning: "청할 청" },
  { kanji: "聴", reading: "チョウ、き(く)", meaning: "들을 청" },
  { kanji: "逮", reading: "タイ", meaning: "잡을 체" },
  { kanji: "滞", reading: "タイ、とどこお(る)", meaning: "막힐 체" },
  { kanji: "締", reading: "テイ、し(める)、し(まる)", meaning: "맺을 체" },
  { kanji: "超", reading: "チョウ、こ(える)、こ(す)", meaning: "뛰어넘을 초" },
  { kanji: "焦", reading: "ショウ、こ(げる)、こ(がす)、あせ(る)", meaning: "탈[燥] 초" },
  { kanji: "礎", reading: "ソ", meaning: "주춧돌 초" },
  { kanji: "促", reading: "ソク、うなが(す)", meaning: "재촉할 촉" },
  { kanji: "嘱", reading: "ショク", meaning: "부탁할 촉" },
  { kanji: "撮", reading: "サツ、と(る)", meaning: "모을/사진찍을 촬" },
  { kanji: "催", reading: "サイ、もよお(す)", meaning: "재촉할 최" },
  { kanji: "抽", reading: "チュウ", meaning: "뽑을 추" },
  { kanji: "墜", reading: "ツイ", meaning: "떨어질 추" },
  { kanji: "畜", reading: "チク", meaning: "짐승 축" },
  { kanji: "軸", reading: "ジク", meaning: "굴대 축" },
  { kanji: "衝", reading: "ショウ、つ(く)", meaning: "찌를 충" },
  { kanji: "炊", reading: "スイ、た(く)", meaning: "불땔 취" },
  { kanji: "酔", reading: "スイ、よ(う)", meaning: "취할 취" },
  { kanji: "稚", reading: "チ、おさな(い)", meaning: "어릴 치" },
  { kanji: "卓", reading: "タク", meaning: "높을 탁" },
  { kanji: "託", reading: "タク", meaning: "부탁할 탁" },
  { kanji: "奪", reading: "ダツ、うば(う)", meaning: "빼앗을 탈" },
  { kanji: "怠", reading: "タイ、おこた(る)、なま(ける)", meaning: "게으를 태" },
  { kanji: "胎", reading: "タイ", meaning: "아이밸 태" },
  { kanji: "択", reading: "タク、えら(ぶ)", meaning: "가릴 택" },
  { kanji: "婆", reading: "バ", meaning: "할미 파" },
  { kanji: "膨", reading: "ボウ、ふく(らむ)、ふく(れる)", meaning: "불을 팽" },
  { kanji: "胞", reading: "ホウ", meaning: "세포 포" },
  { kanji: "飽", reading: "ホウ、あ(きる)、あ(かす)", meaning: "배부를 포" },
  { kanji: "漂", reading: "ヒョウ、ただよ(う)", meaning: "떠다닐 표" },
  { kanji: "乏", reading: "ボウ、とぼ(しい)", meaning: "모자랄 핍" },
  { kanji: "虐", reading: "ギャク", meaning: "모질 학" },
  { kanji: "恨", reading: "コン、うら(む)", meaning: "한[怨] 한" },
  { kanji: "該", reading: "ガイ", meaning: "갖출[備]/마땅[當] 해" },
  { kanji: "虚", reading: "キョ、コ、むな(しい)", meaning: "빌 허" },
  { kanji: "賢", reading: "ケン、かしこ(い)", meaning: "어질 현" },
  { kanji: "峡", reading: "キョウ", meaning: "골짜기 협" },
  { kanji: "脅", reading: "キョウ、おど(す)、おびや(かす)", meaning: "위협할 협" },
  { kanji: "刑", reading: "ケイ", meaning: "형벌 형" },
  { kanji: "弧", reading: "コ", meaning: "활 호" },
  { kanji: "魂", reading: "コン、たましい", meaning: "넋 혼" },
  { kanji: "華", reading: "カ、ケ、はな", meaning: "빛날 화" },
  { kanji: "穫", reading: "カク", meaning: "거둘 확" },
  { kanji: "幻", reading: "ゲン、まぼろし", meaning: "헛보일 환" },
  { kanji: "換", reading: "カン、か(える)、か(わる)", meaning: "바꿀 환" },
  { kanji: "喚", reading: "カン", meaning: "부를 환" },
  { kanji: "滑", reading: "カツ、すべ(る)、なめ(らか)", meaning: "미끄러울 활 | 익살스러울 골" },
  { kanji: "慌", reading: "コウ、あわ(てる)", meaning: "어리둥절할 황" },
  { kanji: "悔", reading: "カイ、く(いる)、く(やむ)", meaning: "뉘우칠 회" },
  { kanji: "酵", reading: "コウ", meaning: "삭힐 효" },
  { kanji: "携", reading: "ケイ、たずさ(える)、たずさ(わる)", meaning: "이끌 휴" },
  { kanji: "姫", reading: "キ、ひめ", meaning: "계집 희" },
  { kanji: "犠", reading: "ギ、いけにえ", meaning: "희생 희" }
],
  middle3: [
  { kanji: "稼", reading: "か, かせぐ", meaning: "심을 가" },
  { kanji: "殻", reading: "かく, から", meaning: "껍질 각" },
  { kanji: "懇", reading: "こん, ねんごろ", meaning: "간절할 간:" },
  { kanji: "喝", reading: "かつ", meaning: "꾸짖을 갈" },
  { kanji: "渇", reading: "かつ, かわく", meaning: "목마를 갈" },
  { kanji: "褐", reading: "かつ", meaning: "갈색/굵은베 갈" },
  { kanji: "堪", reading: "かん, たえる", meaning: "견딜 감" },
  { kanji: "憾", reading: "かん", meaning: "섭섭할 감:" },
  { kanji: "岬", reading: "みさき", meaning: "곶(串) 갑" },
  { kanji: "江", reading: "こう, え", meaning: "강 강" },
  { kanji: "剛", reading: "ごう", meaning: "굳셀 강" },
  { kanji: "拒", reading: "きょ, こばむ", meaning: "막을 거:" },
  { kanji: "据", reading: "すえる、すわる", meaning: "일할/의거할 거" },
  { kanji: "傑", reading: "けつ", meaning: "뛰어날 걸" },
  { kanji: "繭", reading: "けん, まゆ", meaning: "고치 견:" },
  { kanji: "謙", reading: "けん", meaning: "겸손할 겸" },
  { kanji: "茎", reading: "けい, くき", meaning: "줄기 경" },
  { kanji: "慶", reading: "けい", meaning: "경사 경:" },
  { kanji: "渓", reading: "けい", meaning: "시내 계" },
  { kanji: "拷", reading: "ごう", meaning: "칠 고" },
  { kanji: "昆", reading: "こん", meaning: "맏 곤" },
  { kanji: "恭", reading: "きょう, うやうやしい", meaning: "공손할 공" },
  { kanji: "貢", reading: "こう、く, みつぐ", meaning: "바칠 공:" },
  { kanji: "寡", reading: "か", meaning: "적을 과:" },
  { kanji: "款", reading: "かん", meaning: "항목 관:" },
  { kanji: "棺", reading: "かん", meaning: "널 관" },
  { kanji: "寛", reading: "かん", meaning: "너그러울 관" },
  { kanji: "括", reading: "かつ", meaning: "묶을 괄" },
  { kanji: "拐", reading: "かい", meaning: "후릴 괴" },
  { kanji: "矯", reading: "きょう, ためる", meaning: "바로잡을 교:" },
  { kanji: "溝", reading: "こう, みぞ", meaning: "도랑 구" },
  { kanji: "購", reading: "こう", meaning: "살 구" },
  { kanji: "堀", reading: "ほり", meaning: "팔 굴" },
  { kanji: "窮", reading: "きゅう, きわめる、きわまる", meaning: "다할/궁할 궁" },
  { kanji: "糾", reading: "きゅう", meaning: "얽힐 규" },
  { kanji: "菌", reading: "きん", meaning: "버섯 균" },
  { kanji: "謹", reading: "きん, つつしむ", meaning: "삼갈 근:" },
  { kanji: "琴", reading: "きん, こと", meaning: "거문고 금" },
  { kanji: "襟", reading: "きん, えり", meaning: "옷깃 금:" },
  { kanji: "肯", reading: "こう", meaning: "즐길 긍:" },
  { kanji: "肌", reading: "はだ", meaning: "살[膚肉] 기" },
  { kanji: "飢", reading: "き, うえる", meaning: "주릴 기" },
  { kanji: "碁", reading: "ご", meaning: "바둑 기" },
  { kanji: "寧", reading: "ねい", meaning: "편안 녕" },
  { kanji: "尼", reading: "に, あま", meaning: "여승 니" },
  { kanji: "泥", reading: "でい, どろ", meaning: "진흙 니" },
  { kanji: "但", reading: "ただし", meaning: "다만 단:" },
  { kanji: "挑", reading: "ちょう, いどむ", meaning: "돋울 도" },
  { kanji: "悼", reading: "とう, いたむ", meaning: "슬퍼할 도" },
  { kanji: "督", reading: "とく", meaning: "감독할 독" },
  { kanji: "洞", reading: "どう, ほら", meaning: "골 동: | 밝을 통:" },
  { kanji: "棟", reading: "とう, むね、むな", meaning: "마룻대 동" },
  { kanji: "屯", reading: "とん", meaning: "진칠 둔" },
  { kanji: "謄", reading: "とう", meaning: "베낄 등" },
  { kanji: "騰", reading: "とう", meaning: "오를 등" },
  { kanji: "羅", reading: "ら", meaning: "벌릴 라" },
  { kanji: "酪", reading: "らく", meaning: "쇠젖 락" },
  { kanji: "涼", reading: "りょう, すずしい、すずむ", meaning: "서늘할 량" },
  { kanji: "戻", reading: "れい, もどる、もどす", meaning: "어그러질 려:" },
  { kanji: "鈴", reading: "れい、りん, すず", meaning: "방울 령" },
  { kanji: "虜", reading: "りょ", meaning: "사로잡을 로" },
  { kanji: "僚", reading: "りょう", meaning: "동료 료" },
  { kanji: "寮", reading: "りょう", meaning: "동관(同官) 료" },
  { kanji: "竜", reading: "りゅう, たつ", meaning: "용 룡" },
  { kanji: "累", reading: "るい", meaning: "여러/자주 루:" },
  { kanji: "塁", reading: "るい", meaning: "보루 루" },
  { kanji: "柳", reading: "りゅう, やなぎ", meaning: "버들 류(:)" },
  { kanji: "硫", reading: "りゅう", meaning: "유황 류" },
  { kanji: "倫", reading: "りん", meaning: "인륜 륜" },
  { kanji: "痢", reading: "り", meaning: "이질 리:" },
  { kanji: "履", reading: "り, はく", meaning: "밟을 리:" },
  { kanji: "麻", reading: "ま, あさ", meaning: "삼 마(:)" },
  { kanji: "摩", reading: "ま", meaning: "문지를 마" },
  { kanji: "磨", reading: "ま, みがく", meaning: "갈 마" },
  { kanji: "漠", reading: "ばく", meaning: "넓을 막" },
  { kanji: "抹", reading: "まつ", meaning: "지울 말" },
  { kanji: "妄", reading: "もう、ぼう", meaning: "망령될 망:" },
  { kanji: "媒", reading: "ばい", meaning: "중매 매" },
  { kanji: "盲", reading: "もう", meaning: "소경/눈멀 맹" },
  { kanji: "銘", reading: "めい", meaning: "새길 명" },
  { kanji: "侮", reading: "ぶ, あなどる", meaning: "업신여길 모(:)" },
  { kanji: "耗", reading: "もう、こう", meaning: "소모할 모" },
  { kanji: "猫", reading: "びょう, ねこ", meaning: "고양이 묘:" },
  { kanji: "畝", reading: "うね", meaning: "이랑 무: | 이랑 묘:" },
  { kanji: "蚊", reading: "か", meaning: "모기 문" },
  { kanji: "朴", reading: "ぼく", meaning: "성(姓) 박" },
  { kanji: "舶", reading: "はく", meaning: "배 박" },
  { kanji: "撲", reading: "ぼく", meaning: "칠[擊] 박" },
  { kanji: "頒", reading: "はん", meaning: "나눌 반" },
  { kanji: "鉢", reading: "はち、はつ", meaning: "바리때 발" },
  { kanji: "紡", reading: "ぼう, つむぐ", meaning: "길쌈 방" },
  { kanji: "培", reading: "ばい, つちかう", meaning: "북돋울 배:" },
  { kanji: "賠", reading: "ばい", meaning: "물어줄 배:" },
  { kanji: "伯", reading: "はく", meaning: "맏 백" },
  { kanji: "煩", reading: "はん、ぼん, わずらう、わずらわす", meaning: "번거로울 번" },
  { kanji: "閥", reading: "ばつ", meaning: "문벌 벌" },
  { kanji: "丙", reading: "へい", meaning: "남녘 병:" },
  { kanji: "併", reading: "へい, あわせる", meaning: "아우를 병:" },
  { kanji: "瓶", reading: "びん", meaning: "병 병" },
  { kanji: "塀", reading: "へい", meaning: "담 병" },
  { kanji: "譜", reading: "ふ", meaning: "족보 보:" },
  { kanji: "僕", reading: "ぼく", meaning: "종 복" },
  { kanji: "俸", reading: "ほう", meaning: "녹(祿) 봉:" },
  { kanji: "缶", reading: "かん", meaning: "장군 부" },
  { kanji: "扶", reading: "ふ", meaning: "도울 부" },
  { kanji: "附", reading: "ふ", meaning: "붙을 부(:)" },
  { kanji: "剖", reading: "ぼう", meaning: "쪼갤 부:" },
  { kanji: "奔", reading: "ほん", meaning: "달릴 분" },
  { kanji: "雰", reading: "ふん", meaning: "눈날릴 분" },
  { kanji: "憤", reading: "ふん, いきどおる", meaning: "분할 분:" },
  { kanji: "棚", reading: "たな", meaning: "사다리 붕" },
  { kanji: "妃", reading: "ひ", meaning: "왕비 비" },
  { kanji: "沸", reading: "ふつ, わく、わかす", meaning: "끓을 비: | 용솟음할 불" },
  { kanji: "扉", reading: "ひ, とびら", meaning: "사립문 비" },
  { kanji: "賓", reading: "ひん", meaning: "손 빈" },
  { kanji: "頻", reading: "ひん", meaning: "자주 빈" },
  { kanji: "唆", reading: "さ, そそのかす", meaning: "부추길 사" },
  { kanji: "蛇", reading: "じゃ、だ, へび", meaning: "긴뱀 사" },
  { kanji: "詐", reading: "さ", meaning: "속일 사" },
  { kanji: "嗣", reading: "し", meaning: "이을 사:" },
  { kanji: "賜", reading: "し, たまわる", meaning: "줄 사:" },
  { kanji: "傘", reading: "さん, かさ", meaning: "우산 산" },
  { kanji: "杉", reading: "すぎ", meaning: "삼나무 삼" },
  { kanji: "挿", reading: "そう, さす", meaning: "꽂을 삽" },
  { kanji: "渋", reading: "じゅう, しぶ、しぶい、しぶる", meaning: "떫을 삽" },
  { kanji: "尚", reading: "しょう", meaning: "오히려 상(:)" },
  { kanji: "祥", reading: "しょう", meaning: "상서 상" },
  { kanji: "喪", reading: "そう, も", meaning: "잃을 상(:)" },
  { kanji: "償", reading: "しょう, つぐなう", meaning: "갚을 상" },
  { kanji: "霜", reading: "そう, しも", meaning: "서리 상" },
  { kanji: "璽", reading: "じ", meaning: "옥새(玉璽) 새" },
  { kanji: "索", reading: "さく", meaning: "찾을 색 | 노[새끼줄] 삭" },
  { kanji: "叙", reading: "じょ", meaning: "펼 서:" },
  { kanji: "逝", reading: "せい, ゆく、いく", meaning: "갈[往] 서:" },
  { kanji: "庶", reading: "しょ", meaning: "여러 서:" },
  { kanji: "緒", reading: "しょ、ちょ, お", meaning: "실마리 서:" },
  { kanji: "誓", reading: "せい, ちかう", meaning: "맹세할 서:" },
  { kanji: "析", reading: "せき", meaning: "쪼갤 석" },
  { kanji: "仙", reading: "せん", meaning: "신선 선" },
  { kanji: "旋", reading: "せん", meaning: "돌[廻] 선" },
  { kanji: "禅", reading: "ぜん", meaning: "선 선" },
  { kanji: "繊", reading: "せん", meaning: "가늘 섬" },
  { kanji: "渉", reading: "しょう", meaning: "건널 섭" },
  { kanji: "宵", reading: "しょう, よい", meaning: "밤[夜] 소" },
  { kanji: "疎", reading: "そ, うとい、おとむ", meaning: "성길 소" },
  { kanji: "塑", reading: "そ", meaning: "흙빚을 소" },
  { kanji: "訟", reading: "しょう", meaning: "송사할 송:" },
  { kanji: "砕", reading: "さい, くだく、くだける", meaning: "부술 쇄:" },
  { kanji: "囚", reading: "しゅう", meaning: "가둘 수" },
  { kanji: "帥", reading: "すい", meaning: "장수 수" },
  { kanji: "捜", reading: "そう, さがす", meaning: "찾을 수" },
  { kanji: "愁", reading: "しゅう, うれえる、うれい", meaning: "근심 수" },
  { kanji: "睡", reading: "すい", meaning: "졸음 수" },
  { kanji: "酬", reading: "しゅう", meaning: "갚을 수" },
  { kanji: "叔", reading: "しゅく", meaning: "아재비 숙" },
  { kanji: "粛", reading: "しゅく", meaning: "엄숙할 숙" },
  { kanji: "淑", reading: "しゅく", meaning: "맑을 숙" },
  { kanji: "塾", reading: "じゅく", meaning: "글방 숙" },
  { kanji: "唇", reading: "しん, くちびる", meaning: "입술 순" },
  { kanji: "殉", reading: "じゅん", meaning: "따라죽을 순" },
  { kanji: "循", reading: "じゅん", meaning: "돌[環] 순" },
  { kanji: "崇", reading: "すう", meaning: "높을 숭" },
  { kanji: "升", reading: "しょう, ます", meaning: "되 승" },
  { kanji: "迅", reading: "じん", meaning: "빠를 신" },
  { kanji: "娠", reading: "しん", meaning: "아이밸 신" },
  { kanji: "紳", reading: "しん", meaning: "띠[帶] 신:" },
  { kanji: "甚", reading: "じん, はなはだ、はなはだしい", meaning: "심할 심:" },
  { kanji: "亜", reading: "あ", meaning: "버금 아(:)" },
  { kanji: "謁", reading: "えつ", meaning: "뵐 알" },
  { kanji: "涯", reading: "がい", meaning: "물가 애" },
  { kanji: "厄", reading: "やく", meaning: "액 액" },
  { kanji: "壌", reading: "じょう", meaning: "흙덩이 양:" },
  { kanji: "醸", reading: "じょう, かもす", meaning: "술빚을 양" },
  { kanji: "疫", reading: "えき、やく", meaning: "전염병 역" },
  { kanji: "軟", reading: "なん, やわらか、やわらかい", meaning: "연할 연:" },
  { kanji: "呉", reading: "ご", meaning: "성(姓) 오" },
  { kanji: "翁", reading: "おう", meaning: "늙은이 옹" },
  { kanji: "渦", reading: "か, うず", meaning: "소용돌이 와" },
  { kanji: "頑", reading: "がん", meaning: "완고할 완" },
  { kanji: "凹", reading: "おう", meaning: "오목할 요" },
  { kanji: "窯", reading: "よう, かま", meaning: "기와가마 요" },
  { kanji: "庸", reading: "よう", meaning: "떳떳할 용" },
  { kanji: "隅", reading: "ぐう, すみ", meaning: "모퉁이 우" },
  { kanji: "虞", reading: "おそれ", meaning: "염려할/나라이름 우" },
  { kanji: "韻", reading: "いん", meaning: "운 운:" },
  { kanji: "垣", reading: "かき", meaning: "담 원" },
  { kanji: "猿", reading: "えん, さる", meaning: "원숭이 원" },
  { kanji: "偽", reading: "ぎ, にせ、いつわる", meaning: "거짓 위" },
  { kanji: "尉", reading: "い", meaning: "벼슬 위" },
  { kanji: "悠", reading: "ゆう", meaning: "멀 유" },
  { kanji: "唯", reading: "ゆい、い", meaning: "오직 유" },
  { kanji: "愉", reading: "ゆ", meaning: "즐거울 유" },
  { kanji: "猶", reading: "ゆう", meaning: "오히려 유" },
  { kanji: "裕", reading: "ゆう", meaning: "넉넉할 유:" },
  { kanji: "諭", reading: "ゆ, さとす", meaning: "타이를 유" },
  { kanji: "儒", reading: "じゅ", meaning: "선비 유" },
  { kanji: "癒", reading: "ゆ, いえる、いやす", meaning: "병나을 유" },
  { kanji: "融", reading: "ゆう", meaning: "녹을 융" },
  { kanji: "吟", reading: "ぎん", meaning: "읊을 음" },
  { kanji: "宜", reading: "ぎ", meaning: "마땅 의" },
  { kanji: "擬", reading: "ぎ", meaning: "비길 의:" },
  { kanji: "刃", reading: "じん, は", meaning: "칼날 인:" },
  { kanji: "忍", reading: "にん, しのぶ、しのばせる", meaning: "참을 인" },
  { kanji: "姻", reading: "いん", meaning: "혼인 인" },
  { kanji: "逸", reading: "いつ", meaning: "편안할 일" },
  { kanji: "妊", reading: "にん", meaning: "아이밸 임:" },
  { kanji: "剰", reading: "じょう", meaning: "남을 잉:" },
  { kanji: "酌", reading: "しゃく, くむ", meaning: "술부을/잔질할 작" },
  { kanji: "爵", reading: "しゃく", meaning: "벼슬 작" },
  { kanji: "桟", reading: "さん", meaning: "사다리 잔" },
  { kanji: "壮", reading: "そう", meaning: "장할 장:" },
  { kanji: "荘", reading: "そう", meaning: "씩씩할 장" },
  { kanji: "粧", reading: "しょう", meaning: "단장할 장" },
  { kanji: "奨", reading: "しょう", meaning: "장려할 장(:)" },
  { kanji: "栽", reading: "さい", meaning: "심을 재:" },
  { kanji: "宰", reading: "さい", meaning: "재상 재:" },
  { kanji: "斎", reading: "さい", meaning: "재계할/집 재" },
  { kanji: "邸", reading: "てい", meaning: "집 저:" },
  { kanji: "嫡", reading: "ちゃく", meaning: "정실 적" },
  { kanji: "栓", reading: "せん", meaning: "마개 전" },
  { kanji: "窃", reading: "せつ", meaning: "훔칠 절" },
  { kanji: "漸", reading: "ぜん", meaning: "점점 점:" },
  { kanji: "呈", reading: "てい", meaning: "드릴 정" },
  { kanji: "廷", reading: "てい", meaning: "조정 정" },
  { kanji: "浄", reading: "じょう", meaning: "깨끗할 정" },
  { kanji: "亭", reading: "てい", meaning: "정자 정" },
  { kanji: "貞", reading: "てい", meaning: "곧을 정" },
  { kanji: "偵", reading: "てい", meaning: "염탐할 정" },
  { kanji: "艇", reading: "てい", meaning: "배 정" },
  { kanji: "斉", reading: "せい", meaning: "가지런할 제" },
  { kanji: "弔", reading: "ちょう, とむらう", meaning: "조상할 조:" },
  { kanji: "租", reading: "そ", meaning: "조세 조" },
  { kanji: "釣", reading: "ちょう, つる", meaning: "낚을/낚시 조:" },
  { kanji: "曹", reading: "そう", meaning: "무리 조" },
  { kanji: "眺", reading: "ちょう, ながめる", meaning: "볼 조:" },
  { kanji: "詔", reading: "しょう, みことのり", meaning: "조서 조:" },
  { kanji: "槽", reading: "そう", meaning: "구유 조" },
  { kanji: "藻", reading: "そう, も", meaning: "마름 조:" },
  { kanji: "拙", reading: "せつ, つたない", meaning: "졸할 졸" },
  { kanji: "珠", reading: "しゅ", meaning: "구슬 주" },
  { kanji: "俊", reading: "しゅん", meaning: "준걸 준:" },
  { kanji: "准", reading: "じゅん", meaning: "비준 준:" },
  { kanji: "汁", reading: "じゅう, しる", meaning: "즙 즙" },
  { kanji: "症", reading: "しょう", meaning: "증세 증(:)" },
  { kanji: "肢", reading: "し", meaning: "팔다리 지" },
  { kanji: "漬", reading: "つける、つかる", meaning: "적실 지" },
  { kanji: "津", reading: "しん, つ", meaning: "나루 진(:)" },
  { kanji: "診", reading: "しん, みる", meaning: "진찰할 진" },
  { kanji: "迭", reading: "てつ", meaning: "갈마들 질" },
  { kanji: "秩", reading: "ちつ", meaning: "차례 질" },
  { kanji: "朕", reading: "ちん", meaning: "나 짐:" },
  { kanji: "懲", reading: "ちょう, こりる、こらす、こらしめる", meaning: "징계할 징" },
  { kanji: "且", reading: "かつ", meaning: "또 차:" },
  { kanji: "遮", reading: "しゃ, さえぎる", meaning: "가릴 차(:)" },
  { kanji: "彰", reading: "しょう", meaning: "드러날 창" },
  { kanji: "践", reading: "せん", meaning: "밟을 천:" },
  { kanji: "遷", reading: "せん", meaning: "옮길 천:" },
  { kanji: "薦", reading: "せん, すすめる", meaning: "천거할 천:" },
  { kanji: "凸", reading: "とつ", meaning: "볼록할 철" },
  { kanji: "徹", reading: "てつ", meaning: "통할 철" },
  { kanji: "撤", reading: "てつ", meaning: "거둘 철" },
  { kanji: "逓", reading: "てい", meaning: "갈릴 체" },
  { kanji: "肖", reading: "しょう", meaning: "닮을/같을 초" },
  { kanji: "抄", reading: "しょう", meaning: "뽑을 초" },
  { kanji: "硝", reading: "しょう", meaning: "화약 초" },
  { kanji: "酢", reading: "さく, す", meaning: "초 초 | 술권할 작" },
  { kanji: "礁", reading: "しょう", meaning: "암초 초" },
  { kanji: "塚", reading: "つか", meaning: "무덤 총" },
  { kanji: "銃", reading: "じゅう", meaning: "총 총" },
  { kanji: "枢", reading: "すう", meaning: "지도리 추" },
  { kanji: "醜", reading: "しゅう, みにくい", meaning: "추할 추" },
  { kanji: "逐", reading: "ちく", meaning: "쫓을 축" },
  { kanji: "充", reading: "じゅう, あてる", meaning: "채울 충" },
  { kanji: "衷", reading: "ちゅう", meaning: "속마음 충" },
  { kanji: "臭", reading: "しゅう, くさい、におう", meaning: "냄새 취:" },
  { kanji: "痴", reading: "ち", meaning: "어리석을 치" },
  { kanji: "勅", reading: "ちょく", meaning: "칙서 칙" },
  { kanji: "漆", reading: "しつ, うるし", meaning: "옻 칠" },
  { kanji: "妥", reading: "だ", meaning: "온당할 타:" },
  { kanji: "堕", reading: "だ", meaning: "떨어질 타:" },
  { kanji: "惰", reading: "だ", meaning: "게으를 타:" },
  { kanji: "駄", reading: "だ", meaning: "짐실을 타" },
  { kanji: "濯", reading: "たく", meaning: "씻을 탁" },
  { kanji: "搭", reading: "とう", meaning: "탈[乘] 탑" },
  { kanji: "泰", reading: "たい", meaning: "클 태" },
  { kanji: "筒", reading: "とう, つつ", meaning: "통(筒) 통" },
  { kanji: "把", reading: "は", meaning: "잡을 파:" },
  { kanji: "罷", reading: "ひ", meaning: "마칠 파:" },
  { kanji: "覇", reading: "は", meaning: "으뜸 패:" },
  { kanji: "偏", reading: "へん, かたよる", meaning: "치우칠 편" },
  { kanji: "遍", reading: "へん", meaning: "두루 편" },
  { kanji: "坪", reading: "つぼ", meaning: "들[野] 평" },
  { kanji: "廃", reading: "はい, すたれる、すたる", meaning: "폐할/버릴 폐:" },
  { kanji: "幣", reading: "へい", meaning: "화폐 폐:" },
  { kanji: "弊", reading: "へい", meaning: "폐단/해질 폐:" },
  { kanji: "泡", reading: "ほう, あわ", meaning: "거품 포" },
  { kanji: "浦", reading: "うら", meaning: "개[水邊] 포" },
  { kanji: "褒", reading: "ほう, ほめる", meaning: "기릴 포" },
  { kanji: "披", reading: "ひ", meaning: "헤칠 피" },
  { kanji: "閑", reading: "かん", meaning: "한가할 한" },
  { kanji: "轄", reading: "かつ", meaning: "다스릴 할" },
  { kanji: "陥", reading: "かん, おちいる、おとしいれる", meaning: "빠질 함:" },
  { kanji: "艦", reading: "かん", meaning: "큰 배 함:" },
  { kanji: "劾", reading: "がい", meaning: "꾸짖을 핵" },
  { kanji: "核", reading: "かく", meaning: "씨 핵" },
  { kanji: "享", reading: "きょう", meaning: "누릴 향:" },
  { kanji: "献", reading: "けん、こん", meaning: "드릴 헌:" },
  { kanji: "嚇", reading: "かく", meaning: "성낼 혁" },
  { kanji: "弦", reading: "げん, つる", meaning: "시위 현" },
  { kanji: "顕", reading: "けん", meaning: "나타날 현:" },
  { kanji: "懸", reading: "けん、け, かける、かかる", meaning: "달[繫] 현:" },
  { kanji: "嫌", reading: "けん、げん, いや、きらう", meaning: "싫어할 혐" },
  { kanji: "挟", reading: "きょう, はさむ、はさまる", meaning: "낄 협" },
  { kanji: "蛍", reading: "けい, ほたる", meaning: "반딧불 형" },
  { kanji: "衡", reading: "こう", meaning: "저울대 형" },
  { kanji: "酷", reading: "こく", meaning: "심할 혹" },
  { kanji: "洪", reading: "こう", meaning: "넓을 홍" },
  { kanji: "枠", reading: "わく", meaning: "테/테두리/틀 화" },
  { kanji: "禍", reading: "か", meaning: "재앙 화:" },
  { kanji: "靴", reading: "か, くつ", meaning: "신[履, 鞋] 화" },
  { kanji: "患", reading: "かん, わずらう", meaning: "근심 환:" },
  { kanji: "還", reading: "かん", meaning: "돌아올 환" },
  { kanji: "賄", reading: "わい, まかなう", meaning: "재물/뇌물 회:" },
  { kanji: "懐", reading: "かい, ふところ、なつかしい", meaning: "품을 회" },
  { kanji: "暁", reading: "ぎょう, あかつき", meaning: "새벽 효:" },
  { kanji: "侯", reading: "こう", meaning: "제후 후" },
  { kanji: "勲", reading: "くん", meaning: "공(功) 훈" },
  { kanji: "薫", reading: "くん, かおる", meaning: "향풀 훈" }
  ],
  middle4: [
    { kanji: "苛", reading: "カ、いじめる", meaning: "가혹할 가" },
  { kanji: "葛", reading: "カツ、くず", meaning: "칡 갈" },
  { kanji: "蓋", reading: "ガイ、ふた", meaning: "덮을 개" },
  { kanji: "裾", reading: "すそ", meaning: "옷자락 거" },
  { kanji: "巾", reading: "キン", meaning: "수건 건" },
  { kanji: "鍵", reading: "ケン、かぎ", meaning: "자물쇠/열쇠 건" },
  { kanji: "乞", reading: "コツ、こう", meaning: "빌 걸" },
  { kanji: "鎌", reading: "レン、かま", meaning: "낫 겸" },
  { kanji: "頃", reading: "ケイ、ころ", meaning: "이랑/잠깐 경" },
  { kanji: "梗", reading: "コウ、ふさがる", meaning: "줄기/막힐 경" },
  { kanji: "憬", reading: "ケイ、あこがれる", meaning: "깨달을/동경할 경" },
  { kanji: "稽", reading: "ケイ、とどまる", meaning: "머무를 계" },
  { kanji: "尻", reading: "しり", meaning: "꽁무니 고" },
  { kanji: "股", reading: "コ、また", meaning: "넓적다리 고" },
  { kanji: "錮", reading: "コ、ふさぐ", meaning: "막을 고" },
  { kanji: "鍋", reading: "カ、なべ", meaning: "노구솥 과" },
  { kanji: "串", reading: "カン、くし", meaning: "꿸 관" },
  { kanji: "勾", reading: "コウ、かぎ", meaning: "굽을 구" },
  { kanji: "臼", reading: "キュウ、うす", meaning: "절구 구" },
  { kanji: "惧", reading: "ク、おそれる", meaning: "두려워할 구" },
  { kanji: "亀", reading: "キ、かめ", meaning: "거북 구" },
  { kanji: "駒", reading: "ク、こま", meaning: "망아지 구" },
  { kanji: "窟", reading: "クツ、いわや", meaning: "굴 굴" },
  { kanji: "拳", reading: "ケン、こぶし", meaning: "주먹 권" },
  { kanji: "潰", reading: "カイ、つぶれる", meaning: "무너질 궤" },
  { kanji: "隙", reading: "ゲキ、すき", meaning: "틈 극" },
  { kanji: "僅", reading: "キン、わずか", meaning: "겨우 근" },
  { kanji: "錦", reading: "キン、にしき", meaning: "비단 금" },
  { kanji: "伎", reading: "ギ、わざ", meaning: "재간 기" },
  { kanji: "畿", reading: "キ", meaning: "경기(京畿) 기" },
  { kanji: "那", reading: "ナ", meaning: "어찌 나" },
  { kanji: "匂", reading: "におい", meaning: "향기 내" },
  { kanji: "捻", reading: "ネン、ひねる", meaning: "비틀 념" },
  { kanji: "溺", reading: "デキ、おぼれる", meaning: "빠질 닉" },
  { kanji: "旦", reading: "タン、あさ", meaning: "아침 단" },
  { kanji: "戴", reading: "タイ、いただく", meaning: "일[首荷] 대" },
  { kanji: "賭", reading: "ト、かける", meaning: "내기 도" },
  { kanji: "頓", reading: "トン、ぬかずく", meaning: "조아릴 돈" },
  { kanji: "憧", reading: "ショウ、あこがれる", meaning: "동경할 동" },
  { kanji: "瞳", reading: "ドウ、ひとみ", meaning: "눈동자 동" },
  { kanji: "藤", reading: "トウ、ふじ", meaning: "등나무 등" },
  { kanji: "辣", reading: "ラツ、からい", meaning: "매울 랄" },
  { kanji: "嵐", reading: "ラン、あらし", meaning: "아지랑이 람" },
  { kanji: "藍", reading: "ラン、あい", meaning: "쪽 람" },
  { kanji: "拉", reading: "ラツ、ひく", meaning: "끌 랍" },
  { kanji: "呂", reading: "ロ、リョ", meaning: "성(姓)/법칙 려" },
  { kanji: "侶", reading: "リョ、とも", meaning: "짝 려" },
  { kanji: "麓", reading: "ロク、ふもと", meaning: "산기슭 록" },
  { kanji: "弄", reading: "ロウ、もてあそぶ", meaning: "희롱할 롱" },
  { kanji: "籠", reading: "ロウ、かご", meaning: "대바구니 롱" },
  { kanji: "賂", reading: "ロ", meaning: "뇌물 뢰" },
  { kanji: "瞭", reading: "リョウ、あきらか", meaning: "밝을 료" },
  { kanji: "瑠", reading: "ル", meaning: "유리 류" },
  { kanji: "慄", reading: "リツ、ふるえる", meaning: "떨릴 률" },
  { kanji: "璃", reading: "リ", meaning: "유리 리" },
  { kanji: "昧", reading: "マイ、くらい", meaning: "어두울 매" },
  { kanji: "罵", reading: "バ、ののしる", meaning: "꾸짖을 매" },
  { kanji: "麺", reading: "メン", meaning: "국수 면" },
  { kanji: "蔑", reading: "ベツ、さげすむ", meaning: "업신여길 멸" },
  { kanji: "冥", reading: "メイ、くらい", meaning: "어두울 명" },
  { kanji: "貌", reading: "ボウ、かたち", meaning: "모양 모" },
  { kanji: "睦", reading: "ボク、むつまじい", meaning: "화목할 목" },
  { kanji: "弥", reading: "ミ、いよいよ", meaning: "미륵/오랠 미" },
  { kanji: "眉", reading: "ビ、まゆ", meaning: "눈썹 미" },
  { kanji: "謎", reading: "なぞ", meaning: "수수께끼 미" },
  { kanji: "蜜", reading: "ミツ", meaning: "꿀 밀" },
  { kanji: "剝", reading: "ハク、はぐ", meaning: "벗길 박" },
  { kanji: "斑", reading: "ハン、まだら", meaning: "아롱질 반" },
  { kanji: "勃", reading: "ボツ、おこる", meaning: "노할 발" },
  { kanji: "氾", reading: "ハン、あふれる", meaning: "넘칠 범" },
  { kanji: "汎", reading: "ハン、ひろい", meaning: "넓을 범" },
  { kanji: "璧", reading: "ヘキ、たま", meaning: "구슬 벽" },
  { kanji: "餅", reading: "ヘイ、もち", meaning: "떡 병" },
  { kanji: "蜂", reading: "ホウ、はち", meaning: "벌 봉" },
  { kanji: "訃", reading: "フ", meaning: "부고 부" },
  { kanji: "釜", reading: "フ、かま", meaning: "가마[鬴] 부" },
  { kanji: "沙", reading: "サ、すな", meaning: "모래 사" },
  { kanji: "爽", reading: "ソウ、さわやか", meaning: "시원할 상" },
  { kanji: "塞", reading: "ソク、ふさぐ", meaning: "막힐 색" },
  { kanji: "羨", reading: "セン、うらやむ", meaning: "부러워할 선" },
  { kanji: "腺", reading: "セン", meaning: "샘 선" },
  { kanji: "膳", reading: "ゼン", meaning: "선물/반찬 선" },
  { kanji: "醒", reading: "セイ、さめる", meaning: "깰 성" },
  { kanji: "遡", reading: "ソ、さかのぼる", meaning: "거스를 소" },
  { kanji: "遜", reading: "ソン、へりくだる", meaning: "겸손할 손" },
  { kanji: "袖", reading: "シュウ、そで", meaning: "소매 수" },
  { kanji: "羞", reading: "シュウ、はじる", meaning: "부끄러울 수" },
  { kanji: "痩", reading: "ソウ、やせる", meaning: "여윌 수" },
  { kanji: "須", reading: "ス、すべからく", meaning: "모름지기 수" },
  { kanji: "誰", reading: "スイ、だれ", meaning: "누구 수" },
  { kanji: "膝", reading: "シツ、ひざ", meaning: "무릎 슬" },
  { kanji: "柿", reading: "シ、かき", meaning: "감 시" },
  { kanji: "拭", reading: "ショク、ふく", meaning: "씻을 식" },
  { kanji: "腎", reading: "ジン", meaning: "콩팥 신" },
  { kanji: "芯", reading: "シン", meaning: "골풀 심" },
  { kanji: "牙", reading: "ガ、きば", meaning: "어금니 아" },
  { kanji: "顎", reading: "ガク、あご", meaning: "턱 악" },
  { kanji: "闇", reading: "アン、やみ", meaning: "숨을 암" },
  { kanji: "挨", reading: "アイ", meaning: "인사할 애" },
  { kanji: "崖", reading: "ガイ、がけ", meaning: "언덕 애" },
  { kanji: "曖", reading: "アイ", meaning: "희미할 애" },
  { kanji: "冶", reading: "ヤ、いる", meaning: "풀무 야" },
  { kanji: "瘍", reading: "ヨウ", meaning: "헐 양" },
  { kanji: "臆", reading: "オク、おくする", meaning: "가슴 억" },
  { kanji: "俺", reading: "おれ", meaning: "나 엄" },
  { kanji: "艶", reading: "エン、つや", meaning: "고울 염" },
  { kanji: "詣", reading: "ケイ、もうでる", meaning: "이를[至] 예" },
  { kanji: "傲", reading: "ゴウ、おごる", meaning: "거만할 오" },
  { kanji: "沃", reading: "ヨク、そそぐ", meaning: "기름질 옥" },
  { kanji: "瓦", reading: "ガ、かわら", meaning: "기와 와" },
  { kanji: "宛", reading: "エン、あて", meaning: "완연할 완" },
  { kanji: "玩", reading: "ガン、もてあそぶ", meaning: "즐길 완" },
  { kanji: "旺", reading: "オウ", meaning: "왕성할 왕" },
  { kanji: "畏", reading: "イ、おそれる", meaning: "두려워할 외" },
  { kanji: "妖", reading: "ヨウ、あやしい", meaning: "요사할 요" },
  { kanji: "湧", reading: "ユウ、わく", meaning: "물 솟을 용" },
  { kanji: "鬱", reading: "ウツ", meaning: "답답할 울" },
  { kanji: "怨", reading: "エン、オン、うらむ", meaning: "원망할 원" },
  { kanji: "萎", reading: "イ、しおれる", meaning: "시들 위" },
  { kanji: "喩", reading: "ユ、たとえる", meaning: "깨우칠 유" },
  { kanji: "淫", reading: "イン、みだら", meaning: "음란할 음" },
  { kanji: "椅", reading: "イ", meaning: "의자 의" },
  { kanji: "餌", reading: "ジ、えさ", meaning: "미끼 이" },
  { kanji: "咽", reading: "イン、のど", meaning: "목구멍 인" },
  { kanji: "恣", reading: "シ、ほしいまま", meaning: "마음대로/방자할 자" },
  { kanji: "狙", reading: "ソ、ねらう", meaning: "원숭이/엿볼 저" },
  { kanji: "箸", reading: "チョ、はし", meaning: "젓가락 저" },
  { kanji: "詮", reading: "セン", meaning: "갖출 전" },
  { kanji: "煎", reading: "セン、いる", meaning: "달일 전" },
  { kanji: "塡", reading: "テン、うめる", meaning: "메울 전" },
  { kanji: "箋", reading: "セン", meaning: "기록할 전" },
  { kanji: "丼", reading: "どん", meaning: "덮밥 정" },
  { kanji: "爪", reading: "ソウ、つめ", meaning: "손톱 조" },
  { kanji: "嘲", reading: "チョウ、あざける", meaning: "비웃을 조" },
  { kanji: "腫", reading: "シュ、はれる", meaning: "종기 종" },
  { kanji: "踪", reading: "ソウ、あしあと", meaning: "자취 종" },
  { kanji: "挫", reading: "ザ、くじく", meaning: "꺾을 좌" },
  { kanji: "肘", reading: "チュウ、ひじ", meaning: "팔꿈치 주" },
  { kanji: "呪", reading: "ジュ、のろう", meaning: "빌 주" },
  { kanji: "酎", reading: "チュウ", meaning: "진한술 주" },
  { kanji: "曽", reading: "ソウ、かつて", meaning: "일찍 증" },
  { kanji: "摯", reading: "シ", meaning: "잡을 지" },
  { kanji: "叱", reading: "シツ、しかる", meaning: "꾸짖을 질" },
  { kanji: "嫉", reading: "シツ、ねたむ", meaning: "미워할 질" },
  { kanji: "捉", reading: "ソク、とらえる", meaning: "잡을 착" },
  { kanji: "刹", reading: "サツ", meaning: "절 찰" },
  { kanji: "拶", reading: "サツ", meaning: "인사할 찰" },
  { kanji: "斬", reading: "ザン、きる", meaning: "벨 참" },
  { kanji: "采", reading: "サイ", meaning: "풍채 채" },
  { kanji: "柵", reading: "サク", meaning: "울타리 책" },
  { kanji: "凄", reading: "セイ、すごい", meaning: "쓸쓸할 처" },
  { kanji: "捗", reading: "チョク、はかどる", meaning: "진척될 척" },
  { kanji: "脊", reading: "セキ、せ", meaning: "등마루 척" },
  { kanji: "戚", reading: "セキ", meaning: "친척 척" },
  { kanji: "貼", reading: "チョウ、はる", meaning: "붙일 첩" },
  { kanji: "諦", reading: "テイ、あきらめる", meaning: "살필 체" },
  { kanji: "椎", reading: "ツイ", meaning: "쇠몽치/등골 추" },
  { kanji: "蹴", reading: "シュウ、ける", meaning: "찰 축" },
  { kanji: "緻", reading: "チ、こまかい", meaning: "빽빽할 치" },
  { kanji: "枕", reading: "チン、まくら", meaning: "베개 침" },
  { kanji: "唾", reading: "ダ、つば", meaning: "침[涎] 타" },
  { kanji: "綻", reading: "タン、ほころびる", meaning: "터질 탄" },
  { kanji: "貪", reading: "タン、むさぼる", meaning: "탐낼 탐" },
  { kanji: "汰", reading: "タ", meaning: "일[淘] 태" },
  { kanji: "堆", reading: "タイ、うずたかい", meaning: "쌓을 퇴" },
  { kanji: "妬", reading: "ト、ねたむ", meaning: "샘낼 투" },
  { kanji: "唄", reading: "バイ、うた", meaning: "염불소리 패" },
  { kanji: "蔽", reading: "ヘイ、おおう", meaning: "덮을 폐" },
  { kanji: "哺", reading: "ホ、ふくむ", meaning: "먹일 포" },
  { kanji: "鶴", reading: "カク、つる", meaning: "학 학" },
  { kanji: "韓", reading: "カン", meaning: "한국/나라 한" },
  { kanji: "桁", reading: "ケタ", meaning: "차꼬 항" },
  { kanji: "楷", reading: "カイ", meaning: "본보기 해" },
  { kanji: "諧", reading: "カイ", meaning: "화할 해" },
  { kanji: "骸", reading: "ガイ", meaning: "뼈 해" },
  { kanji: "舷", reading: "ゲン", meaning: "뱃전 현" },
  { kanji: "脇", reading: "キョウ、わき", meaning: "갈비[脅] 협" },
  { kanji: "頰", reading: "キョウ、ほお", meaning: "뺨 협" },
  { kanji: "虎", reading: "コ、とら", meaning: "범 호" },
  { kanji: "虹", reading: "コウ、にじ", meaning: "무지개 홍" },
  { kanji: "喉", reading: "コウ、のど", meaning: "목구멍 후" },
  { kanji: "嗅", reading: "キュウ、かぐ", meaning: "맡을 후" },
  { kanji: "毀", reading: "キ、こわす", meaning: "헐 훼" },
  { kanji: "彙", reading: "イ", meaning: "무리 휘" },
  { kanji: "痕", reading: "コン、あと", meaning: "흔적 흔" }
  ],
};

const levels = [
  {
    name: "초등1학년(한검10급)",
    key: "elementary1",
    count: 80,
    color: "bg-blue-500",
    shortName: "초1",
  },
  {
    name: "초등2학년(한검9급)",
    key: "elementary2",
    count: 160,
    color: "bg-blue-600",
    shortName: "초2",
  },
  {
    name: "초등3학년(한검8급,N3)",
    key: "elementary3",
    count: 200,
    color: "bg-blue-700",
    shortName: "초3",
  },
  {
    name: "초등4학년(한검7급)",
    key: "elementary4",
    count: 202,
    color: "bg-blue-800",
    shortName: "초4",
  },
  {
    name: "초등5학년(한검6급)",
    key: "elementary5",
    count: 193,
    color: "bg-blue-900",
    shortName: "초5",
  },
  {
    name: "초등6학년(한검5급,N2)",
    key: "elementary6",
    count: 191,
    color: "bg-indigo-500",
    shortName: "초6",
  },
  {
    name: "중학교-①(한검4급)",
    key: "middle1",
    count: 313,
    color: "bg-green-500",
    shortName: "중1",
  },
  {
    name: "중학교-②(한검3급)",
    key: "middle2",
    count: 284,
    color: "bg-green-500",
    shortName: "중2",
  },
    {
    name: "중학교-③(한검준2급)",
    key: "middle3",
    count: 328,
    color: "bg-green-500",
    shortName: "중3",
  },
    {
    name: "중학교-④(한검2급,N1)",
    key: "middle4",
    count: 185,
    color: "bg-green-500",
    shortName: "중4",
  },
  {
    name: "전체",
    key: "all",
    count: 2136,
    color: "bg-red-500",
    shortName: "전체",
  },
];

const KanjiLearningApp = () => {
  const [currentScreen, setCurrentScreen] = useState("main");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sortBy, setSortBy] = useState("difficulty");
  const [savedKanji, setSavedKanji] = useState(() => {
  try {
    const savedItem = localStorage.getItem("savedKanjiData"); // 저장할 때 사용할 키
    return savedItem ? JSON.parse(savedItem) : [];
  } catch (error) {
    console.error("저장된 한자 데이터를 불러오는 중 오류 발생:", error);
    return [];
  }
  });
  const [contextMenu, setContextMenu] = useState({
    show: false,
    kanji: null,
    x: 0,
    y: 0,
  });
  const [studyMode, setStudyMode] = useState("study"); // 'study' or 'reading'

  const getCurrentKanjiList = () => {
    if (selectedLevel === "all") {
      return [
        ...kanjiData.elementary1,
        ...kanjiData.elementary2,
        ...kanjiData.elementary3,
        ...kanjiData.elementary4,
        ...kanjiData.elementary5,
        ...kanjiData.elementary6,
        ...kanjiData.middle1,
        ...kanjiData.middle2,
        ...kanjiData.middle3,
        ...kanjiData.middle4,
      ];
    }
    return kanjiData[selectedLevel] || [];
  };

  const currentKanji = getCurrentKanjiList()[currentKanjiIndex];

  const handleKanjiClick = () => {
    setShowAnswer(true);
  };

  const nextKanji = () => {
    const kanjiList = getCurrentKanjiList();
    if (currentKanjiIndex < kanjiList.length - 1) {
      setCurrentKanjiIndex(currentKanjiIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevKanji = () => {
    if (currentKanjiIndex > 0) {
      setCurrentKanjiIndex(currentKanjiIndex - 1);
      setShowAnswer(false);
    }
  };

  const addToSaved = (kanji) => {
    const isAlreadySaved = savedKanji.find((k) => k.kanji === kanji.kanji);

    if (isAlreadySaved) {
      // 이미 저장된 경우 제거 (토글)
      setSavedKanji(savedKanji.filter((k) => k.kanji !== kanji.kanji));
    } else {
      // 저장되지 않은 경우 추가
      setSavedKanji([...savedKanji, { ...kanji, savedAt: new Date() }]);
    }
  };

  const removeFromSaved = (kanjiChar) => {
    setSavedKanji(savedKanji.filter((k) => k.kanji !== kanjiChar));
  };

  const handleSliderChange = (e) => {
    const newIndex = parseInt(e.target.value);
    setCurrentKanjiIndex(newIndex);
    setShowAnswer(false);
  };

  const startStudy = (level, mode = "study") => {
    setSelectedLevel(level);
    setCurrentKanjiIndex(0);
    setShowAnswer(false);
    setStudyMode(mode);
    setCurrentScreen("study");
  };

  const handleContextMenu = (e, kanji) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      kanji,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const copyKanji = (kanji) => {
    navigator.clipboard.writeText(kanji);
    setContextMenu({ show: false, kanji: null, x: 0, y: 0 });
  };

  const searchKanji = (kanji) => {
    window.open(`https://nihongokanji.com/search/${kanji}`, "_blank");
    setContextMenu({ show: false, kanji: null, x: 0, y: 0 });
  };

  const getKanjiLevel = (kanjiChar) => {
    if (kanjiData.elementary1.find((k) => k.kanji === kanjiChar)) return "초1";
    if (kanjiData.elementary2.find((k) => k.kanji === kanjiChar)) return "초2";
    if (kanjiData.elementary3.find((k) => k.kanji === kanjiChar)) return "초3";
    if (kanjiData.elementary4.find((k) => k.kanji === kanjiChar)) return "초4";
    if (kanjiData.elementary5.find((k) => k.kanji === kanjiChar)) return "초5";
    if (kanjiData.elementary6.find((k) => k.kanji === kanjiChar)) return "초6";
    if (kanjiData.middle1.find((k) => k.kanji === kanjiChar)) return "중학-1";
    if (kanjiData.middle2.find((k) => k.kanji === kanjiChar)) return "중학-2";
    if (kanjiData.middle3.find((k) => k.kanji === kanjiChar)) return "중학-3";
    if (kanjiData.middle4.find((k) => k.kanji === kanjiChar)) return "중학-4";
    return "기타";
  };

    const getKanjiDiff = (kanjiChar) => {
    if (kanjiData.elementary1.find((k) => k.kanji === kanjiChar)) return 1;
    if (kanjiData.elementary2.find((k) => k.kanji === kanjiChar)) return 2;
    if (kanjiData.elementary3.find((k) => k.kanji === kanjiChar)) return 3;
    if (kanjiData.elementary4.find((k) => k.kanji === kanjiChar)) return 4;
    if (kanjiData.elementary5.find((k) => k.kanji === kanjiChar)) return 5;
    if (kanjiData.elementary6.find((k) => k.kanji === kanjiChar)) return 6;
    if (kanjiData.middle1.find((k) => k.kanji === kanjiChar)) return 7;
    if (kanjiData.middle2.find((k) => k.kanji === kanjiChar)) return 8;
    if (kanjiData.middle3.find((k) => k.kanji === kanjiChar)) return 9;
    if (kanjiData.middle4.find((k) => k.kanji === kanjiChar)) return 10;
  };

const getSortedSavedKanji = () => {

  if (sortBy === "difficulty") {
    return [...savedKanji].sort(
      (a, b) => {
      const aLevel = getKanjiDiff?.(a.kanji);
      const bLevel = getKanjiDiff?.(b.kanji);
      return aLevel - bLevel;
    });
  }

  if (sortBy === "registration") {
    return [...savedKanji].sort(
      (a, b) => new Date(b.savedAt) - new Date(a.savedAt)
    );
  }

  if (sortBy === "random") {
    return [...savedKanji].sort(
      () => Math.random() - 0.5);
  }
};

  useEffect(() => {
    try {
      // savedKanji 상태가 변경될 때마다 localStorage에 저장합니다.
      // 배열을 문자열로 변환하기 위해 JSON.stringify를 사용합니다.
      localStorage.setItem("savedKanjiData", JSON.stringify(savedKanji));
    } catch (error) {
      console.error("한자 데이터를 저장하는 중 오류 발생:", error);
    }
  }, [savedKanji]); // savedKanji 배열이 변경될 때마다 이 effect가 실행됩니다.

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu({ show: false, kanji: null, x: 0, y: 0 });
    };

    if (contextMenu.show) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [contextMenu.show]);

  // 메인화면
  if (currentScreen === "main") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-blue-400 text-white p-4 text-center">
          <h1 className="text-lg font-bold">♨일본어 상용한자 외우기♨</h1>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-white m-4 p-4 rounded border border-gray-200 text-sm text-gray-600">
          한자를 길게 누르면 메뉴가 표시됩니다. 한자 복사, 한자사전 검색을 하실
          수 있습니다.
        </div>

        {/* 레벨 선택 */}
        <div className="p-4 space-y-4">
          {levels.map((level) => (
            <div
              key={level.key}
              className={`rounded border p-4 ${
                level.count > 0
                  ? "bg-white border-gray-200"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`font-medium ${
                    level.count === 0 ? "text-gray-400" : ""
                  }`}
                >
                  {level.name} {level.count}자
                  {level.count === 0 && (
                    <span className="text-xs text-gray-500 ml-2">(준비중)</span>
                  )}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      level.count > 0
                        ? startStudy(level.key, "reading")
                        : alert("아직 데이터가 준비되지 않았습니다.")
                    }
                    disabled={level.count === 0}
                    className={`px-4 py-2 rounded text-sm ${
                      level.count > 0
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    읽기
                  </button>
                  <button
                    onClick={() =>
                      level.count > 0
                        ? startStudy(level.key, "study")
                        : alert("아직 데이터가 준비되지 않았습니다.")
                    }
                    disabled={level.count === 0}
                    className={`px-4 py-2 rounded text-sm ${
                      level.count > 0
                        ? "bg-gray-500 text-white hover:bg-gray-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    학습
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 네비게이션 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex h-7">
          <button
            onClick={() => setCurrentScreen("main")}
            className="flex-1 p-3 text-center text-gray-600"
          >
            <div className="text-xs">시작</div>
          </button>
          <button
            onClick={() => setCurrentScreen("study")}
            className="flex-1 p-3 text-center text-blue-500"
          >
            <div className="text-xs">학습</div>
          </button>
          <button className="flex-1 p-3 text-center text-gray-600">
            <div className="text-xs">검색</div>
          </button>
          <button
            onClick={() => setCurrentScreen("saved")}
            className="flex-1 p-3 text-center text-gray-600"
          >
            <div className="text-xs">내 한자</div>
          </button>
        </div>
      </div>
    );
  }

  // 학습화면
  if (currentScreen === "study") {
    const kanjiList = getCurrentKanjiList();

    return (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-blue-400 text-white p-4 flex items-center justify-between">
          <button onClick={() => setCurrentScreen("main")}>
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <div className="text-sm">
              {studyMode === "reading" ? "읽기" : "학습"}
            </div>
            <div className="text-xs">일본어 상용한자 외우기 🌲</div>
          </div>
          <div></div>
        </div>

        {/* 진행상황 */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600">
              {selectedLevel === "elementary1"
                ? "초등1학년"
                : selectedLevel === "elementary2"
                ? "초등2학년"
                : selectedLevel === "elementary3"
                ? "초등3학년"
                : selectedLevel === "elementary4"
                ? "초등4학년"
                : selectedLevel === "elementary5"
                ? "초등5학년"
                : selectedLevel === "elementary6"
                ? "초등6학년"
                : selectedLevel === "middle1"
                ? "중학교-①"
                : selectedLevel === "middle2"
                ? "중학교-②"
                : selectedLevel === "middle3"
                ? "중학교-③"
                : selectedLevel === "middle4"
                ? "중학교-④"
                : "전체"}
              {kanjiList.length}자 {studyMode === "reading" ? "읽기" : "학습"}
            </span>
            <span className="text-blue-500">
              {currentKanjiIndex + 1} / {kanjiList.length}
            </span>
          </div>
        </div>

        {/* 한자 카드 */}
        <div className="pt-24 pb-8 px-8 flex justify-center">
          <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-[350px] w-full max-w-md">
            {currentKanji ? (
              <div className="text-center space-y-6">
                <div
                  className={`text-8xl font-bold text-blue-600 p-4 rounded ${
                    studyMode === "study"
                      ? "cursor-pointer hover:bg-gray-50"
                      : ""
                  }`}
                  onClick={studyMode === "study" ? handleKanjiClick : undefined}
                >
                  {currentKanji.kanji}
                </div>

                {studyMode === "reading" || showAnswer ? (
                  <div className="space-y-4">
                    <div className="text-lg">{currentKanji.reading}</div>
                    <div className="text-gray-600">{currentKanji.meaning}</div>
                    <button
                      onClick={() => addToSaved(currentKanji)}
                      className={`flex items-center justify-center space-x-2 mx-auto px-4 py-2 rounded text-sm transition-all duration-200 ${
                        savedKanji.find((k) => k.kanji === currentKanji.kanji)
                          ? "bg-yellow-400 text-white border-yellow-400 hover:bg-yellow-500"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Star
                        size={16}
                        className={
                          savedKanji.find((k) => k.kanji === currentKanji.kanji)
                            ? "text-white"
                            : "text-gray-500"
                        }
                        fill={
                          savedKanji.find((k) => k.kanji === currentKanji.kanji)
                            ? "currentColor"
                            : "none"
                        }
                      />
                      <span>
                        {savedKanji.find((k) => k.kanji === currentKanji.kanji)
                          ? "즐겨찾기 해제"
                          : "즐겨찾기 추가"}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">한자를 터치하세요</div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="text-2xl text-gray-400">😔</div>
                <div className="text-gray-500">
                  이 레벨의 한자 데이터가 아직 준비되지 않았습니다.
                </div>
                <button
                  onClick={() => setCurrentScreen("main")}
                  className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
                >
                  메인으로 돌아가기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        {kanjiList.length > 0 && (
          <div className="fixed bottom-20 left-0 right-0 flex justify-center space-x-4 px-4">
            <button
              onClick={prevKanji}
              disabled={currentKanjiIndex === 0}
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <button className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded">
              <MoreVertical size={20} />
            </button>
            <button
              onClick={nextKanji}
              disabled={currentKanjiIndex === kanjiList.length - 1}
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* 진도 슬라이더 */}
        {kanjiList.length > 0 && (
          <div className="fixed top-32 left-4 right-4">
            <div className="bg-white rounded-lg border border-gray-200 px-4 py-2 shadow-sm">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>1</span>
                <span className="font-medium text-blue-600">
                  {currentKanjiIndex + 1} / {kanjiList.length}
                </span>
                <span>{kanjiList.length}</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max={kanjiList.length - 1}
                  value={currentKanjiIndex}
                  onChange={handleSliderChange}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      kanjiList.length > 1
                        ? (currentKanjiIndex / (kanjiList.length - 1)) * 100
                        : 0
                    }%, #e5e7eb ${
                      kanjiList.length > 1
                        ? (currentKanjiIndex / (kanjiList.length - 1)) * 100
                        : 0
                    }%, #e5e7eb 100%)`,
                  }}
                />
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                    input[type="range"]::-webkit-slider-thumb {
                      appearance: none;
                      height: 16px;
                      width: 16px;
                      border-radius: 50%;
                      background: #3b82f6;
                      cursor: pointer;
                      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                    }
                    input[type="range"]::-moz-range-thumb {
                      height: 16px;
                      width: 16px;
                      border-radius: 50%;
                      background: #3b82f6;
                      cursor: pointer;
                      border: none;
                      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                    }
                  `,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 하단 네비게이션 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex h-7">
          <button
            onClick={() => setCurrentScreen("main")}
            className="flex-1 p-3 text-center text-gray-600"
          >
            <div className="text-xs">시작</div>
          </button>
          <button className="flex-1 p-3 text-center text-blue-500">
            <div className="text-xs">학습</div>
          </button>
          <button className="flex-1 p-3 text-center text-gray-600">
            <div className="text-xs">검색</div>
          </button>
          <button
            onClick={() => setCurrentScreen("saved")}
            className="flex-1 p-3 text-center text-gray-600"
          >
            <div className="text-xs">내 한자</div>
          </button>
        </div>
      </div>
    );
  }

  // 내 한자 화면
  if (currentScreen === "saved") {
    const sortedKanji = getSortedSavedKanji();

    return (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-orange-400 text-white p-4 text-center">
          <h1 className="text-lg font-bold">내 한자</h1>
          <div className="text-xs">♨일본어 상용한자 외우기♨</div>
        </div>

        {/* 정렬 옵션 */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm">
              총 {savedKanji.length}자
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setSortBy("difficulty")}
                className={`px-3 py-1 rounded text-xs ${
                  sortBy === "difficulty"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                난이도순
              </button>
              <button
                onClick={() => setSortBy("registration")}
                className={`px-3 py-1 rounded text-xs ${
                  sortBy === "registration"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                등록순
              </button>
              <button
                onClick={() => setSortBy("random")}
                className={`px-3 py-1 rounded text-xs ${
                  sortBy === "random"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                랜덤
              </button>
            </div>
          </div>
        </div>

        {/* 한자 목록 */}
        <div className="p-4 space-y-2">
          {sortedKanji.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              저장된 한자가 없습니다.
            </div>
          ) : (
            sortedKanji.map((kanji, index) => (
              <div
                key={`${kanji.kanji}-${index}`}
                className="bg-white p-3 rounded border border-gray-200 flex items-center justify-between"
                onContextMenu={(e) => handleContextMenu(e, kanji.kanji)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {kanji.kanji}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{kanji.meaning}</div>
                    <div className="text-xs text-gray-500">
                      ({getKanjiLevel(kanji.kanji)})
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromSaved(kanji.kanji)}
                  className="text-yellow-500 hover:text-red-500 transition-colors duration-200"
                  title="즐겨찾기에서 제거"
                >
                  <Star
                    className="text-yellow-500 hover:text-red-500"
                    size={16}
                    fill="currentColor"
                  />
                </button>
              </div>
            ))
          )}
        </div>

        {/* 컨텍스트 메뉴 */}
        {contextMenu.show && (
          <div
            className="fixed bg-white border border-gray-300 rounded shadow-lg z-50 py-2"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button
              onClick={() => copyKanji(contextMenu.kanji)}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 w-full text-left"
            >
              <Copy size={16} />
              <span>복사</span>
            </button>
            <button
              onClick={() => searchKanji(contextMenu.kanji)}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 w-full text-left"
            >
              <ExternalLink size={16} />
              <span>한자사전 검색</span>
            </button>
            <button
              onClick={() => {
                removeFromSaved(contextMenu.kanji);
                setContextMenu({ show: false, kanji: null, x: 0, y: 0 });
              }}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-red-50 w-full text-left text-red-600"
            >
              <Star size={16} />
              <span>즐겨찾기에서 제거</span>
            </button>
          </div>
        )}

        {/* 하단 네비게이션 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex h-7">
          <button
            onClick={() => setCurrentScreen("main")}
            className="flex-1 p-3 text-center text-gray-600"
          >
            <div className="text-xs">시작</div>
          </button>
          <button
            onClick={() => setCurrentScreen("study")}
            className="flex-1 p-3 text-center text-gray-600"
          >
            <div className="text-xs">학습</div>
          </button>
          <button className="flex-1 p-3 text-center text-gray-600">
            <div className="text-xs">검색</div>
          </button>
          <button className="flex-1 p-3 text-center text-orange-500">
            <div className="text-xs">내 한자</div>
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default KanjiLearningApp;
