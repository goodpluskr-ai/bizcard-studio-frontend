import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Award, Camera, Check, CreditCard, Crown, FileText, Gem, Gift, Globe, Home as HomeIcon, Landmark, Mail, MapPin, Package, PackageSearch, Phone, Printer, Search, Settings, Star, Truck, Upload, User, UserCircle2, Wand2, X, Zap } from "lucide-react";

// ==================== constants/texts ====================
const TEXTS = {
  // 홈 화면
  appName: "AI 명함스튜디오",
  appTagline: "AI가 디자인하는 쉽고 빠른 명함",
  adminButton: "관리자",
  homeBannerLabel: "AI로 디자인하는 명함",
  homeBannerTitle: "빠른명함 바로주문",
  homeBannerCta: "빠른명함",
  // 2026-08-07: 홈 배너의 카운트다운 타이머를 없애고 무료 혜택 안내로 교체.
  homePerkLogoFree: "로고만들기 무료",
  homePerkBackgroundFree: "배경디자인 무료",
  lookupCardTitle: "진행상황 조회",
  lookupCardDesc: "주문번호 또는\n휴대폰번호로 조회",
  memberWelcome: (name) => `${name}님 환영합니다`,
  memberCardTitleGuest: "회원이시면 더 많은 혜택을",
  memberTypeSpecial: "특별회원(기업)",
  memberTypeGeneral: "일반회원",
  guestSignupHint: "휴대폰 간편가입",
  loginBadge: "로그인",
  categorySectionTitle: "카테고리",

  // 하단 내비게이션
  navHome: "홈",
  // (2026-08-07: navOrder — "주문" 메뉴 삭제되면서 같이 정리됨)
  navHistory: "주문내역",
  navMy: "마이",
  navLogin: "로그인",

  // 진행상황 조회 화면
  lookupTitle: "진행상황 조회",
  lookupFieldLabel: "휴대폰번호 또는 주문번호",
  phonePlaceholder: "010-0000-0000",
  lookupNotFound: "조회된 주문이 없어요. 번호를 다시 확인해주세요.",
  lookupRecentOrder: "최근 주문",
  lookupOrderItem: "명함 주문건",
  lookupPrintingBadge: "인쇄중",
  reorderNowBtn: "이 명함 그대로 재주문하기",

  // 용지 선택 화면
  paperScreenTitleSuffix: "용지선택",
  sheetsBasisSuffix: "매 기준",
  // 2026-08-02: "선택옵션이라는 제목을 진하게 넣어달라"는 요청 반영.
  paperChoiceLabel: "선택옵션",
  nextOptions: "다음: 옵션선택",

  // 옵션 선택 화면
  optionScreenTitle: "옵션선택",
  categoryNotePrefix: "이 카테고리는",
  categoryNoteSuffix: "입니다.",
  // 2026-08-02: 빠른스노우250g 옵션 제한 안내.
  restrictedOptionsNotice: "⚡ 빠른스노우250g는 익일출고를 위해 인쇄방식(단면·양면)만 고르실 수 있어요. 귀도리·타공·오시·미싱·넘버링 같은 추가 옵션은 시간이 걸려서 빠른 인쇄 일정을 맞추기 어려우니, 이 용지에서는 선택하실 수 없어요. 추가 옵션이 필요하시면 스노우지250g(빠른 아닌 것)를 선택해주세요.",
  noOptionsAvailable: "이 용지에는 선택 가능한 옵션이 없어요.",
  noExtraFee: "추가금 없음",
  multiChoiceHintPrefix: "중복 선택 가능 (택1~",
  multiChoiceHintSuffix: ")",
  setQuantityLabel: (sheets) => sheets ? `세트 수량 (1세트 = ${sheets}매)` : "세트 수량 (1세트 = 최소단위)",
  setQuantityTotalSheets: (sets, totalSheets) => `총 ${sets}세트 = ${totalSheets.toLocaleString("ko-KR")}매`,
  freeShipReached: "동일 배송지 3세트 이상 · 택배비 무료",
  freeShipRemaining: (remaining) => `${remaining}세트 더 담으면 택배비 무료`,
  paperLineLabel: (sets, unitWon) => `용지 ${sets}세트 × ${unitWon}`,
  optionLineLabel: (sets, optWon) => `옵션 ${sets}세트 × ${optWon}`,
  goodsTotalLabel: "상품 합계",
  nextDesign: "디자인",
  nextSignupLogin: "회원가입 · 로그인",
  // 2026-08-01: "기본값이 단면이라 그냥 지나치는 사람이 많다"는 요청으로 추가 — 디자인
  // 화면으로 넘어가기 직전 한 번 더 확인시킵니다.
  printSideConfirmTitle: "인쇄 방식을 확인해주세요",
  printSideConfirmMessage: (label) => `고객님은 단면명함과 양면명함 중에서 ${label}을(를) 선택하셨습니다. 맞으신가요?`,
  printSideConfirmCancel: "다시 확인할게요",
  printSideConfirmProceed: "네, 맞아요",
  nextPrefix: "다음: ",

  // 회원가입 · 로그인 화면
  authTitle: "회원가입 · 로그인",
  tabSignup: "회원가입",
  tabLogin: "로그인",
  memberKindLabel: "회원 종류",
  memberKindGeneralLabel: "일반회원",
  memberKindGeneralDesc: "이름 + 휴대폰 인증",
  memberKindSpecialLabel: "특별회원(기업)",
  memberKindSpecialDesc: "+상호 · 사업자등록증 승인",
  specialMemberNotice: "특별회원은 명함제작을 전문으로 하시는 디자이너를 위한 것으로, 특별회원으로 로그인하시면 AI디자인이 안 되고 인쇄파일 업로드만 가능합니다.",
  nameLabel: "이름",
  namePlaceholder: "홍길동",
  phoneLabel: "휴대폰번호",
  verifyRequestBtn: "인증요청",
  verifyRequestSending: "발송 중...",
  verifyCheckBtn: "확인",
  verifyChecking: "확인 중...",
  loggingInLabel: "로그인 중...",
  previewSkipVerifyBtn: "⚠️ 미리보기 테스트용: 인증 건너뛰고 계속 (실 배포 시 삭제 필요)",
  verifyCodeLabel: "인증번호",
  verifyCodePlaceholder: "4자리 입력",
  smsSentNotice: "SMS 발송됨",
  verifiedStamp: "인증 완료",
  companyLabel: "상호",
  companyPlaceholder: "회사명 입력",
  bizDocLabel: "사업자등록증",
  bizDocUploaded: "업로드 완료 · 승인 대기",
  bizDocUploadPrompt: "사업자등록증 파일 업로드",
  bizDocUploadHint: "사업 등록 여부와 디자이너 확인을 위한 용도예요. 로고나 디자인 저작권과는 관련이 없습니다 — 완성된 디자인의 인쇄만 진행하시니까요.",
  signupSubmitSpecial: "가입 신청 (승인 후 이용)",
  signupSubmitGeneral: "회원가입 완료",
  loginCodePlaceholder: "문자로 받은 인증번호",
  loginSubmit: "로그인",
  passwordLabel: "비밀번호",
  passwordPlaceholder: "4자리 이상 비밀번호를 만들어주세요",
  passwordHint: "다음 로그인부터는 문자인증 없이 이 비밀번호로 로그인해요 (문자 보낼 때마다 비용이 들어서요).",
  passwordLoginPlaceholder: "비밀번호 입력",
  loginPasswordError: "전화번호 또는 비밀번호가 올바르지 않아요.",
  defaultMemberName: "회원",
  missingFieldsHint: "아직 확인이 필요해요: ",

  // 가입 승인 대기 화면
  pendingTitle: "가입 승인 대기",
  pendingHeadline: "사업자등록증 승인 대기중이에요",
  pendingBody:
    "관리자가 업로드하신 사업자등록증을 확인한 뒤 특별회원(기업) 승인이 완료되면\n디자인 진행 및 주문이 가능해요. 보통 영업일 기준 1일 이내에 처리됩니다.",
  pendingPreviewNote: "아래 버튼은 실제 서비스에서는 관리자 페이지에만 있는 기능입니다. (프로토타입 미리보기용)",
  pendingApproveBtn: "(미리보기) 관리자 승인 처리",
  pendingContinueBtn: "승인 완료 · 디자인 진행하기",

  // 디자인 화면 (공통)
  designTitle: "디자인",
  backDesignTitle: "뒷면디자인",
  // 2026-08-02: "디자인 구간 전부 제목이 '디자인'뿐이라 화면 구분이 어렵다"는
  // 피드백 반영 — 각 단계에서 실제로 하는 일이 그대로 제목이 되도록 했습니다.
  subStepTitle: {
    template: "디자인 유형 선택",
    photoTemplate: "사진배치",
    photoUpload: "사진 업로드",
    logoDecision: "로고 사용 여부",
    logoMethod: "로고 방식 선택",
    logoUpload: "로고 업로드",
    logoType: "로고 유형 선택",
    logoAi: "AI 로고 생성",
    companyName: "회사명 입력",
    companyVerify: "회사 인증",
    fields: "정보 입력",
    layout: "위치조정",
    backLayout: "뒷면디자인",
  },
  designSub: "로그인 완료 · 디자인 방식을 선택하세요",
  designIntro:
    "명함에 기재하고 싶은 항목을 선택해서 그 안에만 입력하시면됩니다. 너무 많이 입력하시면 명함이 복잡해서 촌스러워지는점에 유의바랍니다.",
  specialMemberDesignNote: "특별회원(디자이너)은 완성된 디자인파일 업로드로 인쇄만 맡기실 수 있어요.",

  // 디자인 방법 카드
  designMethodLogoAi: "로고만들기",
  designMethodLogoAiDesc: "원하는 로고 느낌을 설명하면 AI가 만들어요",
  designMethodLogoUpload: "이미 로고가 있어요",
  designMethodLogoUploadDesc: "가지고 계신 로고 파일을 업로드해서 그대로 사용해요",
  logoSkipTitle: "로고 없이 진행",
  logoSkipDesc: "로고 파일이 없거나 지금 준비하기 어려우면, 로고 없이 텍스트 중심으로 완성해요",
  designMethodPhoto: "기존명함 사진찍기",
  designMethodPhotoDesc: "사진 업로드 → AI 인쇄파일 변환 → 오류 확인",
  designMethodFile: "디자인파일 업로드",
  designMethodFileDesc: "완성된 인쇄파일을 그대로 업로드해요",
  designMethodAi: "AI로 디자인하기",
  designMethodAiDesc: "템플릿 선택 후 정보 입력만으로 완성",
  designMethodReorder: "기존 재주문",
  designMethodReorderDesc: "예전에 제작한 디자인 그대로 다시 주문해요",
  designMethodDesigner: "디자이너 의뢰",
  designMethodDesignerDesc: "원하는 내용을 전달하면 디자이너가 직접 제작해요 (별도 안내)",

  // 사진으로 만들기 플로우
  photoUploadLabel: "명함 사진 촬영 · 업로드",
  photoUploadHint: "누르면 카메라 또는 사진 보관함이 열려요.",
  photoConvertBtn: "AI 인쇄파일로 변환하기",
  photoConvertingBtn: "AI 인쇄파일로 변환 중…",
  photoConvertedTitle: "변환 완료 · 오류 없음",
  photoConvertedDesc: "수정이 필요하면 텍스트를 다시 입력할 수 있어요.",
  photoDoneBtn: "인쇄파일로 완료 및 업로드",

  // 파일 업로드 플로우
  fileUploadLabel: "디자인파일 업로드",
  fileUploadHint: "PDF · AI · PSD · 이미지 파일을 선택할 수 있어요.",
  fileDoneBtn: "인쇄파일로 변환 및 업로드",

  // 재주문 플로우
  reorderPickPrompt: "재주문할 이전 디자인을 선택하세요",
  reorderOrderNoLabel: "주문번호",
  reorderSubmitBtn: "이 디자인 그대로 재주문",

  // 디자이너 의뢰 플로우
  designerRequestLabel: "디자이너에게 전달할 요청 내용",
  designerRequestPlaceholder: "원하는 분위기, 참고 이미지, 필수 문구 등을 자유롭게 적어주세요",
  designerRefUploadLabel: "참고 이미지 업로드(선택)",
  designerRequestHint: "디자이너 의뢰는 AI 자동 디자인과 달리 담당자가 직접 확인 후 별도로 시안을 보내드려요. 완성까지 1~2일 정도 걸릴 수 있어요.",
  backCustomNoteLabel: "뒷면에 넣고 싶은 내용",
  backCustomNotePlaceholder: "예) 경력 나열, 메뉴판+사진, 캐릭터 일러스트, 오시는 길 약도 등 자유롭게 적어주세요",
  // 2026-08-01: "문구형" 뒷면 옵션(여러 줄 문구 + 정렬 + 서체)용 텍스트.
  backTextLabel: "뒷면 문구",
  backTextPlaceholder: "예) 10년 경력 전문 시공\n무료 견적 상담 010-0000-0000\nInstagram @yourbrand",
  backTextHint: "줄바꿈으로 여러 줄을 넣을 수 있어요. 앞면과 완전히 별개라, 언어(예: 영어)나 내용을 다르게 써도 괜찮아요.",
  backTextAlignLabel: "정렬",
  backTextAlignLeft: "왼쪽맞춤",
  backTextAlignCenter: "가운데맞춤",
  backTextAlignRight: "오른쪽맞춤",
  backTextFontLabel: "서체",
  backCustomHint: "뒷면은 정해진 틀로 자동 생성하지 않고, 앞면 파일과 함께 이 설명·참고이미지를 담당자에게 전달해서 직접 디자인해드려요.",
  backContentTagsTitle: "어떤 내용을 넣고 싶으신가요? (해당하는 것 모두 선택)",
  backContentTagOptions: ["회사 소개", "경력", "메뉴", "제품 사진", "시공 사례", "지도", "QR", "기타"],
  designerSubmitBtn: "요청 접수하고 다음 단계로",

  // AI 디자인 플로우
  aiTemplatePickTitle: "1단계: 기본 디자인유형을 선택해주세요",
  aiTemplatePickDesc: "어떤 느낌의 명함을 원하시나요? 실제 크기 비율 그대로 보여드려요",
  aiLogoConceptsLabel: "원하는 컨셉을 골라보세요 (복수 선택 가능)",
  aiLogoTypeTitle: "어떤 느낌의 로고를 원하세요?",
  aiLogoTypeNextBtn: "다음: 스타일 정하기",
  logoUploadLabel: "로고 파일 업로드",
  logoUploadHint: "PNG · JPG · AI · PDF 파일을 선택할 수 있어요. 배경이 투명한 PNG를 권장해요. (인터넷에서 찾아 저장한 이미지라면 보통 '다운로드' 폴더에 있어요)",
  personalEmailTip: "회사 도메인 메일을 쓰시면 브랜드 신뢰도가 더 높아 보일 수 있어요. (개인 메일이어도 명함 제작에는 문제없어요)",
  logoUploadNextBtn: "다음: 템플릿 선택",
  logoColorExtracting: "로고에서 색상을 분석하고 있어요…",
  logoColorExtracted: "로고에서 이 색상을 추출했어요 — 명함 색상에 반영돼요",
  aiLogoColorLabel: "색상",
  aiLogoAdvancedToggleOpen: "더 세밀하게 설정하기 (선택)",
  aiLogoAdvancedToggleClose: "세부 설정 접기",
  aiLogoCustomLabel: "추가로 설명하고 싶은 내용 (선택)",
  aiLogoCustomPlaceholder: "예) 파란색 계열, 원 모양을 활용하고 싶어요",
  aiLogoSubmitBtn: "로고 제작하기",
  aiTemplateNextBtn: "다음",
  // logoDecision 화면(로고를 쓸지/안 쓸지 고르는 단계) 전용 버튼 문구.
  // 예전엔 aiTemplateNextBtn("다음: 로고 준비")을 그대로 재사용해서, "로고 없이
  // 진행할게요"를 선택한 직후에도 "다음: 로고 준비"라는 모순된 문구가 떴습니다.
  logoDecisionNextBtn: "다음",
  cardSizeLabel: "명함 크기",
  // 2026-08-01: "가로형/세로형은 사진 유무와 상관없는 개인 취향"이라는 피드백으로 추가.
  cardOrientationLabel: "카드 모양",
  cardOrientationLandscape: "가로형",
  cardOrientationPortrait: "세로형",
  // 2026-08-02: "업종특성 맞춘 디자인 캐릭터"·"자유형" 게시판용 텍스트.
  characterBriefLabel: "명함에 첨가하고 싶은 캐릭터가 있다면 설명을 적어주세요",
  characterBriefPlaceholder: "예) 안경 쓴 여우 캐릭터가 서류가방을 들고 있는 모습, 파란색 계열로",
  freeformBriefLabel: "원하시는 디자인이 그려질 수 있도록 AI가 이해할 수 있게 자세한 설명을 적어주세요.",
  freeformBriefPlaceholder: "예) 미니멀한 느낌으로 가운데 정렬, 짙은 남색 배경에 얇은 금색 선 하나만 포인트로",
  cardSizeFixedNote: "카드명함·투명명함은 86×54 규격으로 고정돼요 (재질 특성상 다른 크기를 선택할 수 없어요).",
  aiRecommendExtra: (tplLabel, colorLabel, fontLabel, photoStyleLabel) => {
    const parts = [];
    if (tplLabel) parts.push(`프레임 ${tplLabel}`);
    if (colorLabel) parts.push(`색상 ${colorLabel}`);
    if (fontLabel) parts.push(`글꼴 ${fontLabel}`);
    if (photoStyleLabel) parts.push(`사진 배치 ${photoStyleLabel}`);
    return `AI 추천: ${parts.join(" · ")}`;
  },
  aiApplyRecommendationBtn: "추천 반영하기",
  purposeToggleOpen: "더 정확하게 추천받기 (선택)",
  purposeToggleClose: "간단히 접기",
  purposeHint: "명함을 쓰는 목적을 알려주시면 같은 업종이라도 더 세분화해서 추천해드려요.",
  purposeRefineBtn: "이 목적으로 다시 추천받기",
  cardFinishTitle: "마무리 옵션 (모두 선택사항)",
  nameEnglishToggle: "영문 이름 병기",
  nameEnglishPlaceholder: "예) Hong Gildong",
  contactIconToggle: "연락처에 아이콘 표시",
  backgroundStyleLabel: "배경 스타일",
  qrToggleLabel: "QR 코드 추가",
  qrUrlPlaceholder: "연결할 링크 (홈페이지, SNS, 예약 페이지 등)",
  backLayoutTitle: "뒷면은 어떻게 할까요?",
  backLayoutNextBtn: "완료",
  photoTemplateTitle: "어떤 스타일로 사진을 배치할까요?",
  photoTemplateNextBtn: "다음: 사진 업로드",
  photoUploadStepLabel: "사진찍기(업로드)",
  photoUploadStepHint: "누르면 카메라 또는 사진 보관함이 열려요. 인물 사진을 선택해주세요. 배경이 깔끔한 사진일수록 결과물이 좋아요. 사진이 선명하게 잘 찍혀야 좋은 디자인이 나와요.",
  photoUploadNextBtn: "다음: 로고 여부",
  logoDecisionTitle: "로고도 함께 넣을까요?",
  logoDecisionYes: "네, 로고도 넣을게요",
  logoDecisionYesDesc: "로고를 새로 만들거나 갖고 계신 파일을 업로드해요",
  logoDecisionNo: "로고 없이 진행할게요",
  logoDecisionNoDesc: "사진과 텍스트만으로 명함을 완성해요",

  // Company Resolution Engine — 상호명으로 공식 로고를 먼저 확보하는 단계
  // (디자인엔진이 시작되기 전에 처리: 정확성은 여기서, 표현은 Design Engine이 담당)
  companyNameTitle: "상호 · 회사 · 단체명을 입력하세요",
  companyNameOptional: "(선택)",
  // 2026-08-01: 디자인 화면 첫 화면에 뜨는 단면/양면 안내 배너.
  designModeNoticeSingle: "지금은 단면명함을 디자인하고 있습니다. 양면명함을 원하신다면, 이전으로 이동하셔서 상단에서 양면명함을 선택하시기 바랍니다.",
  designModeNoticeDouble: "지금은 양면명함을 디자인하고 있습니다. 이 화면에서는 먼저 앞면을 디자인하고, 다음 단계에서 뒷면을 이어서 디자인합니다.",
  companyNamePlaceholder: "예: 삼성화재, 봄날커피, 미래수학학원",
  companyNameOptionalHint: "소속이 없으면 비워두셔도 됩니다.",
  companyNameNextBtn: "다음",
  companyMatchFoundTitle: (name) => `${name} 공식 로고 사용을 위한 인증 안내`,
  companyMatchFoundDesc: "기업의 상표권과 저작권을 보호하고 정확한 명함 제작을 위해, 최초 1회 회사 소속 인증이 필요해요.",
  companyVerifyEmailLabel: "회사 이메일",
  companyVerifyEmailPlaceholder: "예: name@company.com",
  companyVerifyBtn: "인증코드 받기",
  companyVerifySending: "인증코드 발송 중…",
  companyVerifyOnceNotice: "인증이 완료되면 이후 같은 회사로 다시 제작할 때는 추가 인증 없이 자동으로 로고가 적용돼요.",
  companyVerifyPurposeNotice: "지금은 회사 이메일 인증만 가능해요. 회사 이메일이 없으신 경우(사원증·재직증명서 인증)는 준비 중입니다.",
  companyPendingNotice: (name) => `${name}의 로고는 등록 검토 중이에요. 검토가 끝날 때까지는 아래에서 직접 로고를 준비해주세요.`,
  designMethodLogoSearch: "로고 찾기",
  designMethodLogoSearchDesc: "검색해서 마음에 드는 로고를 찾아 저장한 뒤 업로드해요",
  logoSaveForReuseLabel: (name) => `이 로고를 ${name}(으)로 저장해서 다음에도 자동으로 사용할까요?`,
  logoSaving: "저장 중…",
  logoExtractBtn: "사진에서 로고만 잘라내기",
  logoExtractDesc: "명함·안내문·간판 사진처럼 로고가 일부만 있는 사진이어도 괜찮아요",
  logoExtracting: "로고 위치를 찾는 중…",
  logoExtractNotFound: "사진에서 로고를 찾지 못했어요. 로고 부분만 직접 잘라서 다시 올려주세요.",
  logoExtractFailed: "로고 추출에 실패했어요. 잠시 후 다시 시도하거나 로고 파일을 직접 올려주세요.",
  logoLowQualityWarning: "추출된 로고의 해상도가 낮아요. 더 선명한 사진으로 다시 시도하시면 좋아요 (그래도 이대로 진행은 가능해요).",
  logoNoPreviewNotice: "이 파일 형식은 미리보기가 지원되지 않아요. 업로드는 정상적으로 됐고, 인쇄 시에는 원본 파일이 그대로 사용됩니다.",
  adminLoginTitle: "관리자 로그인",
  adminPasswordPlaceholder: "관리자 비밀번호",
  adminPasswordWrong: "비밀번호가 올바르지 않아요",
  adminLoginBtn: "로그인",
  adminReviewTitle: "회사 로고 검토",
  adminPendingSectionTitle: "검토 대기 중",
  // 2026-08-02: 관리자 주문 관리(입금확인) 섹션용 텍스트.
  adminOrdersSectionTitle: "입금확인 대기 주문",
  adminNoOrders: "아직 접수된 주문이 없어요.",
  adminOrderDepositorLine: (depositor, categoryName) => `입금자명: ${depositor || "-"} · ${categoryName || "-"}`,
  adminOrderAmountLine: (amount) => `결제금액: ${amount != null ? amount.toLocaleString("ko-KR") + "원" : "-"}`,
  adminConfirmDepositBtn: "입금확인",
  // 2026-08-07: 진행상황 6단계 관련 텍스트.
  adminProgressLabel: "진행상황",
  adminExpectedDatePlaceholder: "인쇄완료 예정일 (예: 08/15)",
  adminNextStageBtn: (nextLabel) => `다음 단계로: ${nextLabel}`,
  adminOthersSectionTitle: "그 외 등록된 회사",
  adminLoading: "불러오는 중…",
  adminEmailTestTitle: "이메일 발송 테스트",
  adminEmailTestDesc: "회사 인증 절차를 거치지 않고, EmailJS 발송 자체가 되는지만 확인합니다. 실제로 받아볼 수 있는 이메일 주소를 입력하세요.",
  adminEmailTestPlaceholder: "테스트로 받을 이메일 주소",
  adminEmailTestBtn: "테스트 코드 발송",
  adminEmailTestSending: "발송 중...",
  adminEmailTestSuccess: "발송 요청 성공 — 받은편지함(스팸함도) 확인해보세요.",
  adminEmailTestFail: "발송 실패",
  adminNoPending: "검토 대기 중인 항목이 없어요.",
  adminSourceLabel: (source) => `등록 경로: ${source === "contract_upload" ? "계약회원 업로드" : source === "user_uploaded" ? "일반회원 업로드" : source === "ai_extracted" ? "AI 사진 추출" : source === "admin_registered" ? "관리자 등록" : source}`,
  adminApproveBtn: "승인",
  adminApprovalRecord: (approvedBy, approvedAt) =>
    `${approvedBy || "admin"} 승인 · ${approvedAt ? new Date(approvedAt).toLocaleDateString("ko-KR") : "-"}`,
  adminRejectBtn: "반려",
  companyVerifyFailTitle: "입력하신 이메일이 회사 도메인과 일치하지 않아요",
  companyVerifyFailDesc: "이메일 인증이 어려우시면, 아래에서 다른 방법으로 로고를 준비할 수 있어요.",
  companyVerifySkipBtn: "다른 방법으로 로고 준비하기",
  companyVerifyCodeTitle: (email) => `${email}로 인증코드를 보냈어요`,
  companyVerifyCodeDesc: "메일함(스팸함도 확인해주세요)에서 6자리 코드를 확인해 입력해주세요.",
  companyVerifyCodeLabel: "인증코드",
  companyVerifyCodePlaceholder: "6자리 숫자",
  companyVerifyCodeBtn: "확인",
  companyVerifyResendBtn: "코드 다시 받기",
  companyVerifyChangeEmailBtn: "이메일 다시 입력",
  companyVerifySendFailTitle: "인증코드 발송에 실패했어요",
  companyVerifyCodeMismatch: "코드가 일치하지 않아요",
  companyVerifyCodeExpired: "코드가 만료됐어요 — 다시 받아주세요",
  companyAlreadyVerifiedNotice: (name) => `이전에 인증하신 ${name} 공식 로고가 자동으로 적용됐어요.`,
  aiFieldsNextBtn: "다음: 위치 조정",
  aiLayoutTitle: "로고 · 텍스트 위치 확인",
  aiLayoutHint: "선택하신 템플릿의 좌표 기준으로 자동 배치했어요. 모든 요소는 안전영역 안에서만 배치되어 인쇄 시 잘리지 않아요.",
  // 패턴 선택 UI (위치조정) — 드래그 대신 미리 검증된 위치 중에서 고르는 방식.
  // 자유 드래그가 아니라 이 방식을 쓰는 이유: 여기 나오는 선택지는 전부 이미
  // validateGrammar()를 통과한 안전한 조합이라, 사용자가 뭘 골라도 겹치거나
  // 재단선을 벗어나는 결과가 나오지 않습니다.
  patternPickerTitle: "하나씩 순서대로 안내해드릴게요 — 미리보기에서 직접 눌러서 움직여보세요",
  // 2026-08-01: "번호·색 없이도 한눈에 알 수 있게, 한 번에 하나씩만 안내하자"는
  // 요청으로 추가했습니다. 위치는 미리보기 화면에서 직접 드래그하고(손가락/마우스),
  // 크기만 아래 버튼이 담당합니다.
  guidedStepProgress: (current, total) => `${current} / ${total}`,
  guidedDragInstruction: (label) => `${label} 위치를 손가락이나 마우스로 눌러서 움직여 정해주세요.`,
  guidedSizeHint: "크기를 조절하고 싶으면 아래 버튼을 사용해주세요.",
  guidedFreeSelectHint: "다른 곳을 옮기고 싶으면, 순서와 상관없이 미리보기에서 그 글자를 바로 눌러서 옮기셔도 돼요.",
  guidedPhotoRangeHint: "사진은 원래 구도(좌우·상하 절반 등)가 무너지지 않도록 약 1.5cm 안에서만 옮길 수 있어요. 크기는 아래 버튼으로 85%~130% 사이에서 조절돼요.",
  guidedPrevButton: "◀ 이전",
  guidedNextButton: "다음",
  guidedNextPreview: (label) => `다음: ${label}`,
  guidedAllDoneMessage: "🎉 모든 항목의 위치를 정하셨어요! 마음에 들면 아래 확인 버튼을 눌러 마무리해주세요.",
  patternKindLabel: {
    company: "회사명의 크기와 위치 조절하기",
    position: "직위의 크기와 위치 조절하기",
    personName: "이름의 크기와 위치 조절하기",
    mobile: "휴대폰번호의 크기와 위치 조절하기",
    telephoneFax: "전화 · 팩스번호의 크기와 위치 조절하기",
    address: "주소의 크기와 위치 조절하기",
    email: "이메일의 크기와 위치 조절하기",
    website: "홈페이지의 크기와 위치 조절하기",
    etc: "기타 문구의 크기와 위치 조절하기",
    logo: "로고의 크기와 위치 조절하기",
  },
  fineOffsetLabelY: "위로 · 아래로",
  fineOffsetLabelX: "왼쪽 · 오른쪽",
  sizeStepLabel: "크기조절",
  sizeTierLabel: { sm: "작게", md: "보통", lg: "크게" },
  fontPickerTitle: "서체를 골라보세요",
  fontPickerDefaultLabel: "전체 기본 서체",
  fontPickerKindLabel: { company: "회사명 서체 (선택)", personName: "이름 서체 (선택, 직위도 함께 적용)" },
  fontPickerUseDefault: "기본값 사용",
  legendBleed: "작업사이즈(도련 포함)",
  legendTrim: "재단사이즈",
  legendSafeArea: "안전영역",
  cpCheckWarning: (failures) => {
    const labels = { person: "이름", company: "회사명", contact: "연락처" };
    const missing = failures.map((f) => labels[f]).join(", ");
    return `⚠ ${missing}이(가) 비어있어요. 받는 사람이 "누구인지·무엇을 하는지·어떻게 연락할지"를 바로 알 수 없을 수 있어요. (CP-001: 명함은 의사소통 도구입니다)`;
  },
  patternKindShortLabel: { photo: "사진", logo: "로고", company: "회사명", position: "직위", personName: "이름", mobile: "휴대폰", telephoneFax: "전화·팩스", address: "주소", email: "이메일", website: "홈페이지", etc: "기타" },
  // "사진형"은 내부적으로는 그대로 쓰지만(코드 곳곳에서 이 문자열로 사진 흐름인지
  // 판별하고 있어서 전부 바꾸면 위험), 화면에는 "사진첨가형"으로 보여줍니다.
  templateDisplayLabel: { "사진형": "사진첨가형", "이름크게형": "글자위주(텍스트형)", "회사이름강조형": "업종특성 맞춘 디자인 캐릭터" },
  comingSoonBadge: "준비중",
  overlapCheckWarning: (pairs) => `⚠ ${pairs.join(", ")}이(가) 너무 가까이 있어서 겹쳐 보일 수 있어요. mm 이동이나 크기 조절로 간격을 띄워보세요.`,
  aiLayoutConfirmBtn: "업종에 맞는 배경 AI로 디자인하기",
  // 2026-08-02: 확정 후 위치·크기를 다시 조정할 수 있는 버튼.
  reopenLayoutBtn: "✏️ 위치·크기 다시 조정하기",
  aiLayoutSubmitBtn: "인쇄파일로 변환 및 업로드",
  designRatingPrompt: "이 디자인이 마음에 드세요? (선택, 다음 추천을 더 좋게 만드는 데 쓰여요)",
  fallbackCompanyName: "회사명",
  fallbackPersonName: "성명",
  fallbackPosition: "직위",
  fallbackPhone: "010-0000-0000",

  // AI 디자인 "기재내용 입력" 화면의 필드 라벨 (데이터 저장 키는 FIELD_DEFINITIONS의 영문 key를 씁니다)
  fieldCompanyLabel: "회사명",
  fieldPositionLabel: "직위",
  fieldPersonNameLabel: "성명",
  fieldMobileLabel: "휴대폰",
  fieldTelephoneLabel: "전화번호",
  fieldAddressLabel: "주소",
  fieldFaxLabel: "팩스",
  fieldEmailLabel: "이메일",
  fieldWebsiteLabel: "홈페이지",
  fieldEtcLabel: "기타",

  // 회사명 → 스타일 추천
  styleIntro: "회사명을 입력하면 AI가 업종을 추측해서 어울리는 스타일을 추천해드려요.",
  styleIntroPrivacyNote: "회사명 등 개인정보는 저장하지 않고, 업종명과 스타일 태그만 저장해요.",
  styleRequestBtn: "AI 스타일 추천받기",
  styleLoadingText: "업종을 분석하고 있어요…",
  styleErrorText: "스타일 추천을 가져오지 못했어요. 다시 시도해주세요.",
  styleIndustryPrefix: "AI가 예상한 업종:",
  styleSourceCache: "이전에 저장된 추천 결과예요",
  styleSourceAi: "AI가 새로 추천했어요",
  styleCheckHint: "· 마음에 드는 느낌만 체크하세요",

  // 업로드 공통
  uploadRetryHint: "다시 선택하려면 여기를 눌러주세요",
  uploadedSuffix: "업로드 완료",
  uploadUnsupportedType: (accept) => `지원하지 않는 파일 형식이에요. (${accept})`,
  uploadTooLarge: (maxMb) => `파일이 너무 커요. ${maxMb}MB 이하로 올려주세요.`,
  uploadGenericFile: "파일",

  // 배송지 입력 화면
  shippingTitle: "배송지 입력",
  shippingNameLabel: "받는 분 이름",
  shippingAddrLabel: "주소",
  shippingAddrPlaceholder: "도로명 주소 입력",
  shippingPhoneLabel: "휴대폰번호",
  shippingNote: "일반회원이 동일 배송지로 3세트 이상 주문하면 택배비 무료.",
  shipFreeApplied: "이번 주문 택배비 무료",
  shipFeeApplied: "택배비 3,000원 적용",
  nextPayment: "다음: 결제",
  backResetWarnTitle: "뒤로 가시겠어요?",
  backResetWarnMessage: "뒤로 가시면 지금까지 입력한 디자인 내용(사진, 로고, 회사명, 스타일 선택 등)이 모두 초기화돼요.",
  backResetAiFeeWarnTitle: "한 번 더 확인할게요",
  backResetAiFeeWarnMessage: "초기화 후 AI 디자인을 다시 사용하시면 AI 사용요금이 발생할 수 있어요.\n지금 '예'를 누르면 바로 초기화되고 처음(기본 디자인 선택)부터 다시 시작해요.",
  backResetCancel: "아니오",
  backResetConfirm: "예",

  // 결제 화면
  paymentTitle: "결제",
  orderSummaryTitle: "주문 요약",
  summaryCategoryLabel: "카테고리",
  summaryPaperLabel: "용지",
  summaryPaperOptionLabel: "용지 옵션",
  summaryOptionLabel: "옵션",
  summaryNone: "없음",
  summarySetLabel: "세트 수량",
  summarySetSuffix: "세트",
  summaryMemberTypeLabel: "회원 구분",
  paymentAmountTitle: "결제 금액",
  unitPriceLabel: (sets) => `용지 단가 × ${sets}세트`,
  optionPriceLabel: (sets) => `옵션 × ${sets}세트`,
  shippingFeeLabel: "택배비",
  shippingFeeFree: "무료",
  grandTotalLabel: "총 결제금액",
  bankInfoTitle: "계좌이체 안내",
  bankAccount: "우리은행 1002-130-481160",
  bankHolder: "예금주 강용철",
  depositorLabel: "입금자명",
  depositorPlaceholder: "입금하실 분 성함",
  termsLogoLiabilityLabel: "상표권 및 저작권이 있는 로고·디자인을 무단으로 사용하여 발생하는 모든 법적 책임은 주문자 본인에게 있음을 확인합니다. (필수)",
  termsAgreementBoxTitle: "⚠️ 주문 전 꼭 확인해주세요 (체크해야 접수됩니다)",
  // 2026-08-07: 결제 버튼을 눌렀는데 조건이 안 맞을 때 보여줄 안내.
  paymentMissingDepositor: "입금자명을 먼저 입력해주세요.",
  paymentMissingAgreement: "아래 노란 박스를 눌러서 확인 체크를 해주셔야 접수됩니다.",
  cmykColorNotice: "화면(RGB)과 실제 인쇄색(CMYK)은 미세하게 다를 수 있어요. 인쇄소에서 인쇄용 색상으로 변환하는 과정에서 생기는 자연스러운 차이입니다.",
  orderFileTooLargeNotice: "지금 올려주신 파일은 용량이 커서 저장이 안 됩니다. 재주문을 쉽게 하기 위해 저장을 원하시면 이메일로 보내주시거나, 그렇지 않다면 저장이 안 되므로 재주문 시에 파일을 다시 접수해주시길 바랍니다.",
  orderFileSaveFailedNotice: "파일 저장 중 문제가 있었어요. 재주문 시에는 파일을 다시 접수해주시면 됩니다.",
  paymentSubmitBtn: "주문 접수하기 · 입금대기",

  // 완료 화면
  completeTitle: "주문 완료",
  completeHeadline: "주문이 접수됐어요",
  orderNoLabel: "주문번호",
  orderStatusTitle: "주문 상태",
  // 2026-08-07: 예전엔 여기 있던 "(미리보기) 다음 상태로" 가짜 버튼을 실제 서버
  // 조회 새로고침 버튼으로 교체.
  orderStatusRefreshBtn: "진행상황 새로고침",
  orderStatusRefreshing: "확인 중…",
  orderDetailsTitle: "주문내역",
  goHomeBtn: "홈으로",
  backBtnLabel: "뒤로가기",

  // 주문별 1:1 문의(수정요청)
  inquiryBtn: "수정·문의하기",
  inquiryTitle: "수정·문의하기",
  inquiryOrderNoPrefix: "주문번호",
  inquiryEmpty: "아직 남긴 요청이 없어요. 수정하고 싶은 내용을 편하게 적어주세요.",
  inquiryPlaceholder: "예) 이름 철자가 틀렸어요, '홍길동'으로 바꿔주세요",
  inquirySendBtn: "보내기",
  inquiryAdminLabel: "관리자",
  inquiryCustomerLabel: "나",
  inquiryPreviewNote: "아래 버튼은 실제 서비스에서는 관리자만 쓰는 기능입니다. (프로토타입 미리보기용)",
  inquiryPreviewReplyBtn: "(미리보기) 관리자 답변 받기",
  inquiryPrivacyNote: "이 요청 내용은 본인 기기에만 저장돼요. 실제 서비스에서는 관리자가 볼 수 있는 서버로 옮겨야 해요.",
  inquiryDemoAdminReply: "확인했습니다. 반영해서 다시 안내드릴게요. (관리자 미리보기 답변)",
};

// ==================== utils/format ====================
const won = (n) => `${Math.round(n).toLocaleString("ko-KR")}원`;

// ==================== components/ui ====================
const STEPS = ["카테고리", "용지", "옵션", "회원", "디자인", "배송", "결제", "완료"];

function StampTrail({ step }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "10px 18px 14px" }}>
      {STEPS.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 0 }}>
            <div
              style={{
                width: 9, height: 9, borderRadius: "50%",
                background: i <= step ? "var(--stamp)" : "transparent",
                border: `1.5px solid ${i <= step ? "var(--stamp)" : "var(--line)"}`,
                transform: i === step ? "scale(1.3)" : "none",
                transition: "all .2s",
              }}
            />
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 1, height: 1.5, background: i < step ? "var(--stamp)" : "var(--line)" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function TopBar({ title, sub, onBack, step, go }) {
  return (
    <div style={{ position: "sticky", top: 0, background: "var(--paper)", zIndex: 5 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px 4px" }}>
        {onBack ? (
          <button onClick={onBack} aria-label="뒤로" style={{ background: "none", border: "none", padding: 4, cursor: "pointer", color: "var(--ink)" }}>
            <ArrowLeft size={22} />
          </button>
        ) : (
          <div style={{ width: 22 }} />
        )}
        <div style={{ flex: 1 }}>
          <div className="serif" style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{title}</div>
          {sub && <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 1 }}>{sub}</div>}
        </div>
        {go && (
          <button onClick={() => go("home")} aria-label="홈으로" style={{
            display: "flex", alignItems: "center", gap: 4, background: "var(--paper-deep)", border: "none",
            borderRadius: 999, padding: "6px 11px", cursor: "pointer", color: "var(--stamp)", fontFamily: "inherit",
          }}>
            <HomeIcon size={13} />
            <span style={{ fontSize: 11.5, fontWeight: 700 }}>{TEXTS.navHome}</span>
          </button>
        )}
      </div>
      {step !== undefined && <StampTrail step={step} />}
    </div>
  );
}

function Stamp({ children, active, tone = "stamp" }) {
  const color = tone === "gold" ? "var(--gold)" : "var(--stamp)";
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        fontSize: 11.5, fontWeight: 700, padding: "4px 10px",
        borderRadius: 999, border: active ? "none" : `1.4px solid ${color}`,
        color: active ? "#fff" : color,
        background: active ? color : "transparent",
        letterSpacing: 0.1,
      }}
    >
      {children}
    </span>
  );
}

function Badge({ label, tone = "gray" }) {
  const styles = tone === "red"
    ? { bg: "#FDE7EC", fg: "#E23E62" }
    : tone === "purple"
    ? { bg: "#EDEAFD", fg: "#6C4CF0" }
    : { bg: "#F1F1F4", fg: "#6B6B76" };
  return (
    <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: styles.bg, color: styles.fg, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function PrimaryButton({ children, onClick, disabled, looksDisabled, icon: Icon }) {
  // 2026-08-07: looksDisabled 추가 — disabled와 다르게, 겉모습은 "비활성화된 것처럼"
  // 회색으로 보이지만 실제로는 눌립니다. 진짜 disabled(브라우저 기본 동작)는 눌러도
  // onClick 자체가 절대 안 불려서, "왜 안 눌리지?"에 대한 안내를 코드가 줄 방법이
  // 없습니다. 조건이 안 맞을 때 그냥 무시하지 않고 "뭐가 문제인지" 알려줘야 하는
  // 버튼(예: 결제 화면의 주문 접수 버튼)에는 disabled 대신 이걸 씁니다.
  const visuallyOff = disabled || looksDisabled;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: visuallyOff ? "var(--line)" : "linear-gradient(135deg, var(--stamp), var(--stamp-2))",
        color: visuallyOff ? "var(--ink-soft)" : "#fff",
        border: "none", borderRadius: 14, padding: "14px 16px",
        fontSize: 15, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit", transition: "transform .12s",
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(.98)"; }}
      onMouseUp={(e) => (e.currentTarget.style.transform = "none")}
    >
      {Icon && <Icon size={17} />}
      {children}
    </button>
  );
}

function Card({ children, style, onClick, selected }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--paper-white)",
        border: `1.5px solid ${selected ? "var(--stamp)" : "var(--line)"}`,
        borderRadius: 16, padding: "14px 16px",
        cursor: onClick ? "pointer" : "default",
        boxShadow: selected ? "0 0 0 3px rgba(108,76,240,0.10)" : "0 1px 3px rgba(20,20,50,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6 }}>{label}</div>
      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box", padding: "11px 12px",
  border: "1.5px solid var(--line)", borderRadius: 10,
  fontSize: 14.5, fontFamily: "inherit", background: "var(--paper-white)", color: "var(--ink)",
};

// 수량 +/− 같은 작은 스텝퍼 버튼 스타일. Home/Product/Auth/Complete 여러 화면에서 공용으로 씁니다.
const stepperBtn = { width: 34, height: 34, borderRadius: 10, border: "1.5px solid var(--line)", background: "var(--paper-white)", fontSize: 17, cursor: "pointer", color: "var(--ink)" };


function SummaryRow({ k, v }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "var(--ink-soft)", padding: "3px 0" }}>
      <span>{k}</span><span style={{ color: "var(--ink)", fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>{v}</span>
    </div>
  );
}

// 파일 업로드 여러 화면(Design/Admin)에서 공용으로 씁니다.
const MAX_UPLOAD_MB = 30;

function UploadBox({ label, icon: Icon, done, fileName, onFile, accept, capture }) {
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setError("");

    // 브라우저 단에서 확장자·용량만 1차로 확인합니다.
    // 실제 파일 내용(해상도, CMYK 여부, 악성코드 등) 검사는 반드시 서버에서 다시 해야 합니다.
    if (accept) {
      const exts = accept.split(",").map((a) => a.trim().toLowerCase());
      const name = f.name.toLowerCase();
      const okExt = exts.some((a) => (a.startsWith(".") ? name.endsWith(a) : (f.type && f.type.startsWith(a.replace("/*", "")))));
      if (!okExt) { setError(TEXTS.uploadUnsupportedType(accept)); return; }
    }
    if (f.size > MAX_UPLOAD_MB * 1024 * 1024) { setError(TEXTS.uploadTooLarge(MAX_UPLOAD_MB)); return; }

    onFile(f);
    // 같은 파일을 다시 선택해도 onChange가 또 발생하도록 값을 비웁니다(재시도 시 필요).
    e.target.value = "";
  };

  return (
    <div>
      {/* 2026-08-04: "박스를 눌러도 카메라·갤러리가 전혀 안 열린다"는 신고 반영 —
          예전엔 input을 화면 밖에 숨겨두고 바깥 div의 onClick에서 input.click()을
          간접 호출했는데, 이 방식이 일부 모바일 브라우저/웹뷰(특히 iframe 안에서
          돌아가는 Claude 아티팩트 환경)에서 "진짜 사용자가 직접 누른 조작"으로
          인정이 안 돼서 파일 선택창 자체가 안 열리는 경우가 있습니다. 그래서 이제
          input을 안 숨기고, 투명하게(opacity:0) 박스 전체를 덮도록 바꿨습니다 —
          사용자가 누르는 지점이 이제 진짜로 input 그 자체라서 훨씬 안정적으로
          동작합니다(파일 입력을 만드는 표준적인 방식이기도 합니다). */}
      <div style={{ position: "relative" }}>
        <input
          type="file"
          accept={accept || "image/*"}
          capture={capture}
          onChange={handleChange}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            opacity: 0, cursor: "pointer", zIndex: 1,
          }}
        />
        <div
          style={{
            border: `1.5px dashed ${done ? "var(--stamp)" : "var(--line)"}`, borderRadius: 12, padding: "22px",
            textAlign: "center", cursor: "pointer", color: done ? "var(--stamp)" : "var(--ink-soft)",
            pointerEvents: "none", // 클릭은 위 투명 input이 전부 받고, 이 div는 보여주기만 함
          }}
        >
          {done ? <Check size={20} style={{ marginBottom: 6 }} /> : <Icon size={20} style={{ marginBottom: 6 }} />}
          <div style={{ fontSize: 12.5, fontWeight: 600 }}>{done ? `${fileName || TEXTS.uploadGenericFile} ${TEXTS.uploadedSuffix}` : label}</div>
          {done && <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 4 }}>{TEXTS.uploadRetryHint}</div>}
        </div>
      </div>
      {error && <div style={{ fontSize: 11, color: "#E23E62", marginTop: 6 }}>{error}</div>}
    </div>
  );
}

// ==================== domain/company/orderNotification ====================
// ====================================================================
// Domain : Company / Order Notification
// Responsibility : 새 주문이 들어오면 관리자(goodplus.kr@gmail.com)에게 이메일로
//                  알려줍니다. emailVerification.js(회사 이메일 소유 확인)와는
//                  완전히 다른 기능입니다 — 저건 사용자가 입력한 이메일 주소가
//                  진짜 자기 것인지 확인하는 용도이고, 이건 사장님 본인에게
//                  "주문이 들어왔다"를 알리는 용도입니다. 서로 다른 EmailJS 템플릿을
//                  씁니다(변수가 다름: 이쪽은 {{name}}/{{message}}/{{order_id}}).
//
// 여기 SERVICE_ID/TEMPLATE_ID는 자리표시자가 아니라, 예전 세션에서 실제로 테스트
// 발송까지 확인된 값입니다(2026-07-29, service_c48f848 / template_fgijlbe,
// Gmail 수신 확인됨). 다만 "To Email"은 코드가 아니라 EmailJS 템플릿 자체 설정에
// 고정되어 있어서(goodplus.kr@gmail.com), 여기서 template_params로 보내지 않습니다.
// ====================================================================
const ORDER_EMAILJS_SERVICE_ID = "service_c48f848";
const EMAILJS_ORDER_TEMPLATE_ID = "template_fgijlbe";
// PUBLIC_KEY도 emailVerification.js와 같은 EmailJS 계정 값으로 확인됐습니다.
const ORDER_EMAILJS_PUBLIC_KEY = "Z2ZomPLGBnjrB9_2x";

// order 객체에서 사람이 읽기 좋은 주문 요약 텍스트를 만듭니다. 어떤 필드가 정확히
// 있는지는 App.jsx의 order 상태 모양을 따릅니다 — 없는 필드는 조용히 건너뜁니다.
function buildOrderSummary(order, extra = {}) {
  const lines = [
    extra.categoryName && `카테고리: ${extra.categoryName}`,
    extra.paperName && `용지: ${extra.paperName}`,
    order.sets && `수량: ${order.sets}세트`,
    extra.optionsSummary && `옵션: ${extra.optionsSummary}`,
    extra.totalPrice != null && `결제금액: ${extra.totalPrice.toLocaleString()}원`,
    order.depositor && `입금자명: ${order.depositor}`,
    order.ship?.name && `받는분: ${order.ship.name}`,
    order.ship?.phone && `연락처: ${order.ship.phone}`,
    order.ship?.addr && `주소: ${order.ship.addr}`,
    // 뒷면을 "직접 설명하기"로 고른 경우, 정해진 템플릿 없이 담당자가 직접 만들어야
    // 하므로 그 설명을 반드시 여기 남깁니다 — 첨부는 앞면 파일 하나만 가는 구조라서
    // (아래 한계 참고), 참고 이미지를 올렸다면 그 사실도 같이 알려줍니다.
    order.backCustomNote && `\n[뒷면 직접 요청]\n${order.backCustomTags?.length ? `희망 내용: ${order.backCustomTags.join(", ")}\n` : ""}${order.backCustomNote}`,
    order.backCustomFile && `(뒷면 참고 이미지 첨부됨 — 파일명: ${order.backCustomFile.name}. 첨부 슬롯은 앞면 파일과 공유라 안 붙었을 수 있어요, 확인 필요)`,
  ].filter(Boolean);
  return lines.join("\n");
}

// 파일을 base64로 바꿉니다 — 이메일 첨부와 window.storage 저장 둘 다 이 형태가 필요해서
// 이름을 용도 하나에 묶지 않고 범용으로 둡니다.
function fileToBase64DataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// window.storage는 텍스트 전용, 한 값당 5MB 제한입니다. base64로 바꾸면 원본보다
// 커지므로(약 1.33배), 원본 기준 이 크기까지만 저장을 "시도"합니다. 저장은 의무가
// 아니라 재주문 편의를 위한 정책일 뿐이라, 안 되면 강제로 방법을 찾지 않고 그냥
// "용량이 커서 저장이 안 된다"고 안내하고 넘어갑니다.
const MAX_STORABLE_FILE_BYTES = 3 * 1024 * 1024;

// ⚠️ 설정 필요: EmailJS에서 첨부파일 발송은 유료 플랜에서만 됩니다(2026-07-30 기준
// 공식 문서 확인). 그리고 템플릿의 Attachments 탭에 "Variable Attachment" 타입으로
// 파라미터 이름(예: attachment)을 등록해둬야, 여기서 보내는 값이 실제로 첨부됩니다 —
// 코드만으로는 안 되고 EmailJS 대시보드에서 템플릿 설정을 한 번 해주셔야 합니다.
//
// attachment는 File 객체(특별회원이 올린 파일)이거나, { dataUrl } 형태로 이미 계산된
// base64(AI가 만든 인쇄용 SVG — 이미 텍스트라 File로 감쌀 필요 없이 바로 씀)일 수 있습니다.
async function sendOrderNotificationEmail(order, orderNo, extra = {}, attachment = null) {
  const message = buildOrderSummary(order, extra);
  const templateParams = {
    name: order.ship?.name || order.depositor || "고객",
    message,
    order_id: orderNo,
  };
  if (attachment) {
    try {
      templateParams.attachment = attachment.dataUrl ? attachment.dataUrl : await fileToBase64DataUrl(attachment);
    } catch {
      // 첨부 변환에 실패해도 주문 알림 이메일 자체는 보내야 하므로 무시하고 진행
    }
  }
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: ORDER_EMAILJS_SERVICE_ID,
      template_id: EMAILJS_ORDER_TEMPLATE_ID,
      user_id: ORDER_EMAILJS_PUBLIC_KEY,
      template_params: templateParams,
    }),
  });
  if (!res.ok) {
    throw new Error(`주문 알림 이메일 발송 실패 (${res.status})`);
  }
}

// ==================== domain/kernel/designRules ====================
// ── 명함 좌표 시스템 (Card Coordinate System) ──────────────────
// ====================================================================
// Domain : Kernel
// Version : 1.0
// Responsibility : Coordinate system (mm/%), Element position model,
//                  Safe area / bleed / trim, Rendering spec (CardLayoutPreview)
// Note : 이 도메인은 시스템의 "원자" 역할입니다. AI 모델이나 렌더러가
//        바뀌어도 이 좌표계·Element 모델·정렬 규칙은 변하지 않아야 합니다.
// Internal Engine (지금은 함수 2개뿐, 충돌감지·Auto Layout·Priority Engine이
//   생기면 아래처럼 내부적으로 더 나뉠 수 있습니다 — 지금 이렇게 나뉘어 있다는
//   뜻이 아니라 확장 여지를 남겨두는 메모입니다):
//   Coordinate Engine(mmToPercent) / Size Engine(getCardSpec) /
//   Zone Resolver(GRID_ZONES) / Position Resolver(resolveElementPosition)
// ====================================================================
// 모든 객체가 공통으로 따르는 위치 규칙. "템플릿"보다 먼저 정의합니다.
// 위치는 3단계로 저장합니다.
//  1단계 zone   : 3x3 기준선 그리드 중 하나 (빠른 선택용, 기본 좌표를 줍니다)
//  2단계 x, y   : 안전영역 기준 정밀 좌표(%). zone 선택 시 자동 채워지고 필요하면 덮어씀
//  3단계 offsetMm: mm 단위 미세조정. 인쇄 실무자에게 익숙한 단위로 마지막 보정
// 실물 규격(mm). 재단사이즈=최종적으로 잘리는 크기, 도련=인쇄 시 여유분(작업사이즈=재단사이즈+도련×2),
// 안전영역 여백=재단선에서 안쪽으로 얼마나 비워야 재단 오차에도 글자가 안 잘리는지.
// 실제 발주서로 검증된 값입니다.
//   - 일반 용지(카드명함·투명명함 제외 전 카테고리): 90×50 / 91×55 / 85×55 중 선택 가능, 도련 1mm
//   - 카드명함·투명명함(cat04, PVC/PET): 86×54 고정, 선택지 없음, 도련 2mm
//     (재단 86×54 → 작업 90×58, (90-86)/2=2mm — 발주서로 확인)
const CARD_SIZE_PRESETS = [
  { id: "standard", label: "90×50", trimWidth: 90, trimHeight: 50, bleed: 1 },
  { id: "wide", label: "91×55", trimWidth: 91, trimHeight: 55, bleed: 1 },
  { id: "compact", label: "85×55", trimWidth: 85, trimHeight: 55, bleed: 1 },
  { id: "creditCard", label: "86×54 (카드명함·투명명함 고정)", trimWidth: 86, trimHeight: 54, bleed: 2 },
];
const CARD_SIZE_DEFAULT = "standard";
const FIXED_SIZE_CATEGORY = "cat04"; // 카드명함·투명명함 — 이 카테고리는 크기 선택지를 아예 안 보여주고 creditCard로 고정

// 2026-08-01: "사진이 위/아래에 있는 명함은 보통 세로형이다"는 피드백으로 orientation
// 파라미터를 추가했습니다. "portrait"를 넘기면 가로/세로(trimWidth/trimHeight)를
// 서로 바꿔서 돌려줍니다 — 카드 자체 크기(예: 90×50)는 그대로 유지하면서 방향만
// 세로로 바꾸는 것입니다(90×50 landscape ↔ 50×90 portrait). CardLayoutPreview와
// cardFileExporter 둘 다 이 함수가 돌려준 trimWidth/trimHeight를 그대로 쓰기 때문에,
// 이 한 곳만 바꾸면 화면 미리보기와 실제 인쇄파일이 자동으로 같이 세로형이 됩니다.
function getCardSpec(sizeId, orientation = "landscape") {
  const preset = CARD_SIZE_PRESETS.find((p) => p.id === sizeId) || CARD_SIZE_PRESETS[0];
  const isPortrait = orientation === "portrait";
  return {
    trimWidth: isPortrait ? preset.trimHeight : preset.trimWidth,
    trimHeight: isPortrait ? preset.trimWidth : preset.trimHeight,
    bleed: preset.bleed, safeMargin: 3,
  };
}

// 1단계: 3x3 기준선 그리드. x/y는 안전영역 기준 % 좌표(0~100).
// 모서리/변 zone은 0%·100%가 아니라 살짝 안쪽(inset)에서 시작합니다 — 안전영역
// 경계선에 딱 붙이면 (a) CardLayoutPreview가 세로 중심 정렬을 쓰는 요소는 절반이
// 경계 밖으로 나가 재단 시 잘릴 위험이 있고, (b) 실물 명함에는 존재하지 않는
// "여백 없이 가장자리에 딱 붙은" 부자연스러운 인상을 줍니다. inset 값은 안전영역
// 안에서 한 번 더 여유를 두는 정도로, 이미 3mm인 safeMargin과는 별개입니다.
const EDGE_INSET_X = 4; // %
const EDGE_INSET_Y = 6; // %
const GRID_ZONES = {
  topLeft: { label: "좌상단", x: EDGE_INSET_X, y: EDGE_INSET_Y },
  top: { label: "상단", x: 50, y: EDGE_INSET_Y },
  topRight: { label: "우상단", x: 100 - EDGE_INSET_X, y: EDGE_INSET_Y },
  midLeft: { label: "좌중앙", x: EDGE_INSET_X, y: 50 },
  center: { label: "중앙", x: 50, y: 50 },
  midRight: { label: "우중앙", x: 100 - EDGE_INSET_X, y: 50 },
  bottomLeft: { label: "좌하단", x: EDGE_INSET_X, y: 100 - EDGE_INSET_Y },
  bottom: { label: "하단", x: 50, y: 100 - EDGE_INSET_Y },
  bottomRight: { label: "우하단", x: 100 - EDGE_INSET_X, y: 100 - EDGE_INSET_Y },
};

// 요소 종류별 "허용 영역" — 이 범위를 벗어나서는 배치할 수 없습니다.
// (예: 로고가 안전영역 맨 아래까지 내려가서 연락처와 겹치는 걸 방지)
// qr은 지금 화면엔 없지만, 나중에 QR 객체를 추가할 때 바로 쓸 수 있도록 미리 정의해뒀습니다.
const ELEMENT_ALLOWED_REGIONS = {
  // logo.yMax는 원래 55였는데, 이건 "로고가 항상 위쪽 절반에만 온다"는 가정이었습니다.
  // 그런데 "프로필 원형"·"사진 상단형"처럼 로고를 우하단(L006)에 두는 템플릿을 나중에
  // 추가하면서 이 가정이 깨졌습니다 — L006(y=94)가 yMax:55를 넘어서 validateGrammar가
  // 로고를 통째로 걸러내고 있었습니다(화면에 로고가 아예 안 보이는 버그). company와
  // 같은 이유로, contact류와 같은 수준(96)까지 완화합니다.
  logo: { xMin: 0, xMax: 100, yMin: 0, yMax: 96 },
  // company.yMax도 마찬가지 문제였습니다 — 원래 85였는데, "사진 상단형"에서 회사명을
  // 하단중앙(P006, y=94)에 두면서 yMax:85를 넘어 똑같이 걸러지고 있었습니다
  // ("상호가 안 보인다"는 실제 버그의 원인). yMin을 완화했던 것과 같은 이유로 yMax도 완화합니다.
  company: { xMin: 0, xMax: 100, yMin: 3, yMax: 96 },
  // "person"(직위·이름 묶음)을 position(직위)/personName(이름)으로 나눕니다 — 크기를
  // 따로 조절할 수 없어서 "직위가 이름보다 작아야 하는데 같이 커진다"는 문제가
  // 있었습니다. 허용 범위는 기존 person과 동일하게 둡니다.
  // yMin은 원래 35였는데, "사진 하단형"처럼 사진이 카드 아래쪽을 차지해서 텍스트가
  // 훨씬 위쪽(y=20~32)으로 몰려야 하는 배치에서 이 제약이 그대로 막아버려서, 위치가
  // 전부 y=35로 눌려서 겹치는 문제가 있었습니다 — company/logo/contact에서 이미
  // 겪었던 것과 똑같은 종류의 버그입니다. 크게 완화합니다.
  position: { xMin: 0, xMax: 100, yMin: 8, yMax: 95 },
  personName: { xMin: 0, xMax: 100, yMin: 8, yMax: 95 },
  // "contact" 하나로 뭉쳐서 mobile/telephone/fax/address/email/website/etc를 전부
  // 한 블록에 몰아 그리던 걸 그만두고, 각 필드를 독립적으로 위치·크기 조절할 수 있게
  // 나눴습니다 — "핸드폰번호도 개별적으로 위치·크기를 바꿀 수 있으면 좋겠다"는 요청
  // 반영. 허용 범위는 기존 contact와 동일하게(전부 하단 영역) 둡니다.
  // yMin은 원래 50이었는데("연락처는 항상 하단"이라는 가정), "사진 하단형"처럼
  // 사진이 아래쪽을 차지하고 텍스트가 위쪽에 몰리는 배치에서는 연락처도 위쪽에
  // 와야 해서 이 가정이 깨졌습니다 — company의 yMin을 완화했던 것과 같은 이유입니다.
  mobile: { xMin: 0, xMax: 100, yMin: 15, yMax: 96 },
  telephoneFax: { xMin: 0, xMax: 100, yMin: 15, yMax: 96 },
  address: { xMin: 0, xMax: 100, yMin: 15, yMax: 96 },
  email: { xMin: 0, xMax: 100, yMin: 15, yMax: 96 },
  website: { xMin: 0, xMax: 100, yMin: 15, yMax: 96 },
  etc: { xMin: 0, xMax: 100, yMin: 15, yMax: 96 },
  qr: { xMin: 55, xMax: 100, yMin: 55, yMax: 100 },
};

function clampToAllowedRegion(kind, x, y) {
  const r = ELEMENT_ALLOWED_REGIONS[kind];
  if (!r) return { x, y };
  return { x: Math.min(Math.max(x, r.xMin), r.xMax), y: Math.min(Math.max(y, r.yMin), r.yMax) };
}

function mmToPercent(mm, axisLengthMm) {
  return (mm / axisLengthMm) * 100;
}

// 요소 하나의 저장된 위치({ zone, x?, y?, offsetMm? })를 실제 렌더링용 %좌표로 변환합니다.
// spec은 getCardSpec()이 반환하는 { trimWidth, trimHeight, bleed, safeMargin } — 크기 프리셋에 따라 달라집니다.
function resolveElementPosition(kind, pos, spec) {
  const zone = GRID_ZONES[pos.zone] || GRID_ZONES.center;
  const baseX = pos.x ?? zone.x;
  const baseY = pos.y ?? zone.y;
  const safeWidthMm = spec.trimWidth - spec.safeMargin * 2;
  const safeHeightMm = spec.trimHeight - spec.safeMargin * 2;
  const offsetXPercent = mmToPercent(pos.offsetMm?.x || 0, safeWidthMm);
  const offsetYPercent = mmToPercent(pos.offsetMm?.y || 0, safeHeightMm);
  return clampToAllowedRegion(kind, baseX + offsetXPercent, baseY + offsetYPercent);
}

// 요소별 강조 크기(emphasis)와 로고 크기(size)를 실제 % 폰트/로고 크기로 변환하는 표.
// compact = 템플릿 카드 안 작은 썸네일용, full = 위치확인 화면의 큰 미리보기용.
// 2026-08-01: "글자가 전부 작아서 잘 안 보인다"는 피드백으로 상향했습니다. 다만 이
// 템플릿들은 최근(v1.3) 세 템플릿이 같은 세로 앵커(y=13/36/50/64)를 공유하도록
// 촘촘하게 재설계되어 gap이 타이트합니다 — 그래서 예전 세션에서 했던 만큼 크게
// (회사명 15→19 등) 올리지 않고, 겹칠 위험이 적은 선에서 보수적으로만 올렸습니다
// (회사명 15→17, 이름 12.5→14, 직위 9→10, 연락처 9.5→10.5). 이 정도로도 부족하면
// 위치조정 화면의 +크게 버튼으로 필드별로 추가 조절 가능하도록 POINT_SIZE_RANGE
// 상한도 20→23으로 살짝 늘렸습니다. 실제 겹침 여부는 반드시 화면에서 눈으로 확인할 것.
const TEXT_EMPHASIS_SIZE = {
  compact: { lg: 6, md: 4.5, sm: 3.5 },
  full: { lg: 17, md: 14, sm: 10.5 },
};
const LOGO_SIZE_PERCENT = {
  compact: { sm: 12, md: 16, lg: 22 },
  full: { sm: 17, md: 21, lg: 29 },
};

// 글자 크기를 3단계(작게/보통/크게) 대신 실제 숫자(pt처럼 다루는 값)로 8~20 사이
// 자유롭게 조절할 수 있게 하는 확장입니다. TEXT_EMPHASIS_SIZE의 full 단계 값을
// 그대로 기본값으로 삼아서(회사명=13, 이름·직위=10, 연락처=8.5) 기존 화면과
// 시각적으로 동일하게 시작하고, 여기서부터 숫자로 미세 조절합니다.
// 주의: 이 값은 "화면에 보이는 상대적 크기"를 pt처럼 다루는 것이지, 실제 인쇄
// 결과물의 물리적 pt(1pt=0.3528mm)와 정확히 1:1로 검증된 건 아닙니다 — 그렇게
// 만들려면 렌더링 컨테이너의 실제 픽셀 크기를 실시간으로 측정해야 하는데, 지금
// 구조(고정 px 폰트크기)에서는 그 부분까지는 아직 손대지 않았습니다.
const POINT_SIZE_RANGE = { min: 8, max: 23 };
const POINT_SIZE_DEFAULT = {
  company: 17, position: 10, personName: 14,
  mobile: 10.5, telephoneFax: 10.5, address: 10.5, email: 10.5, website: 10.5, etc: 10.5,
};
const COMPACT_SIZE_SCALE = 0.45; // compact(썸네일)는 full의 약 45% 크기로 — 기존 6/13, 4.5/10, 3.5/8.5 비율과 동일

// ====================================================================
// Domain : Design Rule System (DRS)
// Version : 1.0
// Responsibility : Layout Rules / Typography (min font size) / Safe Margin /
//                  Alignment / QR minimum size / Information Priority
// ====================================================================
// 새 엔진이 아닙니다. 이미 여러 곳에 흩어져 있던 규칙들(여백, 정렬, 글자크기, QR 위치)을
// 하나의 이름 아래 모으고, 실제로 부족했던 규칙 3가지(최소 글자크기, QR 최소크기,
// 정보 우선순위)를 추가한 것입니다. DB(Object System)가 "무엇을 저장할지"를 정의한다면,
// DRS는 "그 무엇이 항상 지켜야 하는 제약"을 정의합니다. 프레임이 몇 개로 늘어나도
// 이 규칙들은 공통으로 적용됩니다.
const DESIGN_RULES = {
  version: "1.0",

  // 여백 규칙 — 실제 값은 getCardSpec().safeMargin을 그대로 참조합니다 (여기서 값을 새로 정의하지 않음, 중복 방지)
  margin: {
    description: "재단선 안쪽 안전영역 여백. 모든 요소는 이 안에서만 배치됩니다.",
  },

  // 정렬 규칙 — CardLayoutPreview의 align 계산 로직(x<=15 좌, x>=85 우, 나머지 중앙)을 규칙으로 명시
  alignment: {
    description: "요소의 x좌표에 따라 좌/중앙/우 정렬을 자동으로 판단합니다.",
    leftThreshold: 15,
    rightThreshold: 85,
  },

  // 글자 크기 규칙 — 기존 TEXT_EMPHASIS_SIZE를 그대로 참조 + 신규: 최소 가독성 기준
  textSize: {
    description: "요소별 강조 크기 단계 (lg/md/sm). 이보다 작은 단계는 만들지 않는 것이 최소 가독성 기준입니다.",
    tiers: TEXT_EMPHASIS_SIZE,
    minTier: "sm",
  },

  // QR 위치 규칙 — 기존 ELEMENT_ALLOWED_REGIONS.qr을 참조 + 신규: 스캔 가능한 최소 크기
  qrPosition: {
    description: "QR 코드는 허용 영역 안에서만 배치되고, 스캔이 가능한 최소 크기 이상으로만 렌더링됩니다.",
    region: ELEMENT_ALLOWED_REGIONS.qr,
    minSizePercent: { compact: 14, full: 18 },
  },

  // 정보 우선순위 규칙 (신규) — 숫자가 낮을수록(앞에 있을수록) 더 우선적으로 지켜야 하는 요소
  infoPriority: {
    description: "공간이 부족해질 경우 무엇을 먼저 줄이거나 생략할지의 우선순위입니다.",
    order: ["company", "person", "contact", "logo", "qr"],
    // TODO: 지금은 순서만 정의되어 있고, 요소끼리 실제로 겹치는지 감지해서 자동으로
    // 줄이거나 생략하는 충돌 해결 로직은 아직 없습니다. 다음 버전에서 이 순서를
    // 참조해 구현할 수 있습니다 (예: person이 너무 길어서 안전영역을 벗어나면
    // order상 person보다 우선순위가 낮은 qr/logo부터 축소).
  },
};

// QR 최소 크기 규칙을 실제로 적용하는 헬퍼 — CardLayoutPreview에서 사용
function getQrSizePercent(mode) {
  return Math.max(LOGO_SIZE_PERCENT[mode].sm, DESIGN_RULES.qrPosition.minSizePercent[mode]);
}

// CP-001 판정(구조적 체크)은 /domain/validation/cpValidator.js(validateCP)로 이전됨 —
// Kernel은 규칙을 "정의"하는 곳이고, 판정은 Validation의 역할입니다.

// ==================== domain/pattern/patternLibrary ====================
// ====================================================================
// Domain : Pattern Library ("Business Card Grammar"의 실제 구현)
// Version : 1.0 (신규 설계)
// Responsibility : "회사명은 어디에 놓을 수 있는가?"에 대한 답을, 좌표가 아니라
//                  이름 붙은 선택지(Pattern)로 미리 정의해둡니다.
//
// "문법(Grammar)"이라는 이름에 대해: DRS(kernel/designRules.js)가 "물리적으로
// 무엇이 가능한가"(예: 연락처는 안전영역 96% 아래로 못 감)를 정의하는 제약이고,
// 이 파일이 "그 제약 안에서 실제로 고를 수 있는 이름 붙은 어휘"(P001, N001...)를
// 정의합니다. 이 둘을 합친 것 — DRS(제약) + Pattern Library(어휘) — 이 곧
// "Business Card Grammar"입니다. 별도의 새 레이어나 새 파일로 다시 만들지 않은
// 이유는, DRS와 Pattern Library 자체가 이미 "문법"의 역할을 하고 있기 때문입니다
// (여기서 또 감싸는 레이어를 만들면 같은 규칙을 두 곳에서 관리하게 됩니다 —
// "실제 책임이 생길 때 분리한다" 원칙과 반대 방향). 대신 아래 validateGrammar()
// 하나로 "이 패턴 선택이 문법에 맞는가?"를 한 번에 확인할 수 있게 했습니다 —
// AI 추천이든 사용자 수동 선택이든, 최종 출력 전에 이 검사를 통과해야 합니다.
//   (Pattern Library[=Grammar 어휘] → Frame → DRS 검사 → CP 검사 → AI 출력)
//
// 왜 이 파일이 필요한가:
//   Recorder(domain/learning/recorder.js)가 "사용자가 무엇을 선택했는지"를 기록하려면,
//   그 "무엇"이 먼저 이름 붙은 형태로 존재해야 합니다. x=61.3, y=22.8 같은 원값을
//   그대로 기록하면 나중에 "회사명을 상단중앙에 놓는 사람이 몇 %인가?"를 절대 물을 수
//   없습니다(같은 의도라도 offsetMm 계산 방식이 조금만 바뀌어도 값이 달라지기 때문).
//   그래서 UI·AI 추천·Recorder·(나중의) 통계가 전부 같은 patternId(P002, N001...)
//   기준으로 이야기하도록, 이 파일을 Frame보다 먼저 만듭니다.
//
// frameCodes.js와의 관계: frameCodes.js는 "업종-템플릿타입"(예: CAF-N)을 코드화한
// 것이고, 그 주석에 이미 "나중에 업종별로 실제 다른 배치를 만들 때 이 매핑만 바꾸면
// 되도록" 설계해뒀다고 적혀 있습니다. Pattern Library가 바로 그 "실제 다른 배치"의
// 재료입니다 — 지금 TEMPLATE_LAYOUTS(templates.js)의 고정 좌표들도, 사실은 아래
// 패턴 중 하나를 골라 쓴 것으로 다시 표현할 수 있습니다(파일 끝의 매핑 예시 참고).
//
// 정직하게 밝히는 한계 (frameCodes.js와 같은 태도로):
//   - 여기 있는 패턴 목록은 "명함 디자인 관례상 실제로 자주 쓰이는 배치"를 근거로
//     사람이 정의한 것입니다. "P002가 68%다" 같은 숫자는 없고, 지금은 만들지도
//     않습니다 — 그 숫자는 Learning Domain이 실사용 데이터를 충분히 모은 뒤에만
//     의미가 있습니다(ADR-007/008: 외부 명함 이미지를 수집해 통계를 만드는 방식은
//     저작권 리스크로 이미 기각되었고, 1st-party Standard Memory로 대체하기로
//     결정되어 있음). 이 파일은 그 통계가 붙을 "자리"만 만듭니다.
//   - "로고 오른쪽" 같은 상대 배치(다른 요소를 기준으로 한 위치)는 아직 지원하지
//     않습니다. 지금은 전부 안전영역 기준 절대 좌표(zone)입니다. 상대 배치는 실제
//     필요가 확인되면 v1.1에서 추가합니다.
// ====================================================================


const PATTERN_LIBRARY_VERSION = "1.0";


// 회사명 위치 패턴
// P005/P006은 처음엔 상단 4개만 만들었다가, 기존 회사형/로고형 템플릿을 패턴
// 조합으로 옮기려 해보니 "회사명이 하단에 작게" 오는 실제 배치가 있어서 추가했습니다
// (미리 만들어둔 게 아니라, templates.js 리팩터링 중 실제로 필요해서 추가한 것).
const COMPANY_PATTERNS = [
  { id: "P001", label: "좌상단", pos: { zone: "topLeft" }, emphasis: "md" },
  { id: "P002", label: "상단중앙", pos: { zone: "top" }, emphasis: "md" },
  { id: "P003", label: "우상단", pos: { zone: "topRight" }, emphasis: "md" },
  { id: "P004", label: "중앙", pos: { zone: "center" }, emphasis: "lg" },
  { id: "P005", label: "좌하단", pos: { zone: "bottomLeft" }, emphasis: "sm" },
  { id: "P006", label: "하단중앙", pos: { zone: "bottom" }, emphasis: "md" },
  // P007/P008도 P005/P006과 같은 이유로 추가 — 사진형(사진 분할형/배경형)을 Pattern
  // Library로 옮기는 중에 "우측/좌측 중앙"에 오는 실제 배치가 있어서 필요해졌습니다.
  { id: "P007", label: "우측중앙", pos: { zone: "midRight" }, emphasis: "sm" },
  { id: "P008", label: "좌측중앙", pos: { zone: "midLeft" }, emphasis: "sm" },
];

// 성명(이름·직위) 크기/위치 패턴 — emphasis가 곧 "크게/보통/작게"입니다.
const NAME_PATTERNS = [
  { id: "N001", label: "중앙 크게", pos: { zone: "center" }, emphasis: "lg" },
  { id: "N002", label: "좌측 크게", pos: { zone: "midLeft" }, emphasis: "lg" },
  { id: "N003", label: "우측 크게", pos: { zone: "midRight" }, emphasis: "lg" },
  // N004 "회사명 아래"는 회사명 패턴의 zone을 그대로 받아 y만 아래로 내리는 상대
  // 패턴입니다 — resolveCompanyRelative()로 실제 좌표를 계산합니다.
  { id: "N004", label: "회사명 아래", pos: null, emphasis: "md", relativeTo: "company" },
  // N005도 P005/P006처럼 templates.js 리팩터링 중 실제로 필요해서 추가했습니다 —
  // 로고가 크게 들어가는 템플릿에서 이름·직위가 보조 정보로 하단에 작게 오는 경우.
  { id: "N005", label: "하단중앙 작게", pos: { zone: "bottom", offsetMm: { y: -8 } }, emphasis: "sm" },
];

// 연락처(전화번호) 위치 패턴
const CONTACT_PATTERNS = [
  { id: "T001", label: "하단좌측", pos: { zone: "bottomLeft" }, emphasis: "sm" },
  { id: "T002", label: "하단중앙", pos: { zone: "bottom" }, emphasis: "sm" },
  { id: "T003", label: "하단우측", pos: { zone: "bottomRight" }, emphasis: "sm" },
];

// 로고 위치 패턴 (크기는 기존 size:sm/md/lg를 그대로 사용)
const LOGO_PATTERNS = [
  { id: "L001", label: "좌상단", pos: { zone: "topLeft" } },
  { id: "L002", label: "우상단", pos: { zone: "topRight" } },
  { id: "L003", label: "상단중앙", pos: { zone: "top" } },
  { id: "L004", label: "좌측중앙", pos: { zone: "midLeft" } },
  { id: "L005", label: "중앙", pos: { zone: "center" } },
  { id: "L006", label: "우하단", pos: { zone: "bottomRight" } },
];

const PATTERN_CATALOG = {
  company: COMPANY_PATTERNS,
  // "이름·직위"를 person 하나로 묶어뒀더니, 이름과 직위 크기를 따로 조절할 수 없어서
  // "직위가 이름보다 작아야 하는데 같이 커진다"는 문제가 생겼습니다 — 연락처를
  // mobile/telephoneFax/... 로 나눴던 것과 똑같은 이유로, position(직위)과
  // personName(이름)을 독립된 요소로 나눕니다. 둘 다 같은 위치 어휘(NAME_PATTERNS)를
  // 씁니다.
  position: NAME_PATTERNS,
  personName: NAME_PATTERNS,
  // mobile/telephoneFax/address/email/website/etc는 전부 CONTACT_PATTERNS(T001~003)를
  // 같이 씁니다 — 위치 어휘는 같지만(전부 하단 계열), 각자 독립적으로 하나를 고르고
  // mm/pt로 따로 조절할 수 있습니다. "핸드폰번호도 개별적으로 위치·크기를 바꿀 수
  // 있으면 좋겠다"는 요청으로, 예전의 단일 "contact" 묶음 블록을 여섯 개로 나눴습니다.
  mobile: CONTACT_PATTERNS,
  telephoneFax: CONTACT_PATTERNS, // 전화번호+팩스번호를 한 줄에 같이 표시(요청 반영)
  address: CONTACT_PATTERNS,
  email: CONTACT_PATTERNS,
  website: CONTACT_PATTERNS,
  etc: CONTACT_PATTERNS,
  logo: LOGO_PATTERNS,
};

function findPattern(kind, patternId) {
  return PATTERN_CATALOG[kind]?.find((p) => p.id === patternId) || null;
}

// "이 patternId가 Grammar(=DRS 제약 + Pattern Library 어휘)에 맞는가?"를 한 번에
// 확인합니다. 두 가지를 확인합니다:
//   1. 어휘 검사 — 애초에 Pattern Library에 등록된 patternId인가 (없으면 즉시 위반)
//   2. 제약 검사 — zone + offsetMm을 적용한 실제 좌표가 DRS의
//      ELEMENT_ALLOWED_REGIONS 안에 들어오는가. resolveElementPosition을 그대로
//      재사용합니다(같은 계산을 여기서 다시 하지 않기 위해) — clampToAllowedRegion이
//      실제로 값을 깎아냈다면(=클램프 전후가 다르면) 문법 위반으로 판정합니다.
// AI 추천이든 사용자의 수동 선택이든, 화면에 그리기 전에 이 함수를 통과해야 합니다 —
// "회사명을 재단선 밖에 놓는다" 같은 선택은 UI에 애초에 나타나지 않아야 하지만,
// 혹시라도 잘못된 patternId가 들어오면 여기서 한 번 더 걸러냅니다.
function validateGrammar(kind, patternId, spec = getCardSpec(CARD_SIZE_DEFAULT)) {
  const pattern = findPattern(kind, patternId);
  if (!pattern) return { valid: false, reason: `${kind} 도메인에 "${patternId}" 패턴이 존재하지 않습니다.` };
  if (!pattern.pos) return { valid: true, reason: null }; // 상대 패턴(N004 등)은 계산 시점에 별도 검사
  const zone = GRID_ZONES[pattern.pos.zone];
  if (!zone) return { valid: false, reason: `"${pattern.pos.zone}" zone이 GRID_ZONES에 없습니다.` };
  const safeWidthMm = spec.trimWidth - spec.safeMargin * 2;
  const safeHeightMm = spec.trimHeight - spec.safeMargin * 2;
  const offsetXPercent = mmToPercent(pattern.pos.offsetMm?.x || 0, safeWidthMm);
  const offsetYPercent = mmToPercent(pattern.pos.offsetMm?.y || 0, safeHeightMm);
  const rawX = zone.x + offsetXPercent;
  const rawY = zone.y + offsetYPercent;
  const clamped = clampToAllowedRegion(kind, rawX, rawY);
  const withinRegion = clamped.x === rawX && clamped.y === rawY;
  if (!withinRegion) {
    return { valid: false, reason: `${pattern.id}(${pattern.label})는 ${kind}의 허용 영역을 벗어납니다.` };
  }
  return { valid: true, reason: null };
}

// N004("회사명 아래") 같은 상대 패턴을, 실제 회사명 위치를 기준으로 절대 zone 기반
// pos 객체로 변환합니다. resolveElementPosition(kernel/designRules.js)에 그대로
// 넘길 수 있는 형태를 돌려줍니다.
function resolvePatternPosition(kind, patternId, selections) {
  const pattern = findPattern(kind, patternId);
  if (!pattern) return null;
  if (pattern.pos) return { pos: pattern.pos, emphasis: pattern.emphasis };
  if (pattern.relativeTo === "company") {
    const companyPattern = findPattern("company", selections?.company);
    const baseZone = companyPattern?.pos?.zone || "top";
    // 회사명과 같은 x축에, y만 한 칸 아래(offsetMm)로 — 겹치지 않도록 오늘 고친
    // 세로 정렬(threshold) 규칙 위에서 안전하게 동작합니다.
    return { pos: { zone: baseZone, offsetMm: { y: 12 } }, emphasis: pattern.emphasis };
  }
  return null;
}

// 패턴 조합(예: { logo:"L001", logoSize:"sm", company:"P001", person:"N002", contact:"T001" })을
// CardLayoutPreview가 바로 그릴 수 있는 layout 객체(TEMPLATE_LAYOUTS[name]과 같은 모양)로
// 변환합니다. templates.js는 이제 좌표를 직접 들고 있지 않고, 이 함수에 패턴 ID 조합만
// 넘깁니다. emphasis는 kind별로 `${kind}Emphasis` 키로 덮어쓸 수 있습니다(패턴 기본값이
// 템플릿마다 다르게 쓰여야 하는 경우가 있어서 — 예: 같은 P002여도 템플릿에 따라 강조를
// 다르게 주고 싶을 수 있음).
// options.overlay: true면 모든 텍스트 요소에 overlay:true를 붙입니다 — 사진이 카드
// 전체를 덮는 "사진 배경형"처럼, 텍스트가 사진 위에 흰색+그림자로 얹히는 경우에
// 씁니다. 요소 하나하나의 선택이 아니라 템플릿 전체의 성격이라 patternId가 아니라
// 호출 시 옵션으로 받습니다.
const ALL_PATTERN_KINDS = ["logo", "company", "position", "personName", "mobile", "telephoneFax", "address", "email", "website", "etc"];

// 2026-08-01(개정): 처음엔 kind마다 다른 색을 써서 미리보기·조절 패널을 색으로 짝지었는데,
// "아무 요소나 눌러서 바로 옮기기"가 생기면서 번호·색 짝짓기 자체가 필요 없어졌습니다.
// 대신 "지금 선택된 것 = 파란 테두리 + 부드러운 강조 애니메이션" 하나의 규칙으로
// 단순화했습니다 — 색을 10개 외울 필요 없이 "파란 게 지금 움직이는 것"만 알면 됩니다.
// 미리보기(CardLayoutPreview)와 조절 패널(Design.jsx)이 이 상수 하나를 같이 씁니다.
const SELECTED_ACCENT_COLOR = "#3B82F6";

// 템플릿들이 "연락처 여섯 항목(mobile/telephoneFax/address/email/website/etc)을 같은
// 기본 자리에서 시작해 세로로 쌓기"를 매번 손으로 쓰지 않도록 돕는 헬퍼입니다. 전부
// 같은 patternId(예: T002)에서 시작해 6mm씩 간격을 두고 쌓아두면, 처음엔 안 겹치게
// 시작하고 사용자가 실제로 채운 항목만 mm/pt 버튼으로 이후 조정하면 됩니다.
// mobile을 가장 눈에 띄는 위치(연락처 그룹의 맨 위)에, 나머지(전화·팩스/주소/이메일 등)를
// 그 아래로 작게 모아둡니다 — "핸드폰번호가 제일 밑에 있으면 안 된다"는 지적을 반영해
// 기본값 자체를 뒤집었습니다(이전엔 반대 순서였습니다: mobile이 제일 아래).
function contactStack(basePatternId, startOffsetMm = -13, stepMm = -4) {
  const kinds = ["mobile", "telephoneFax", "address", "email", "website", "etc"];
  const result = {};
  kinds.forEach((kind, i) => {
    result[kind] = basePatternId;
    result[`${kind}FineOffsetMm`] = { y: startOffsetMm - i * stepMm };
  });
  return result;
}

function buildLayoutFromPatterns(selections, options = {}) {
  const layout = {};
  for (const kind of ALL_PATTERN_KINDS) {
    const patternId = selections[kind];
    if (!patternId) continue;
    const check = validateGrammar(kind, patternId);
    if (!check.valid) {
      // eslint-disable-next-line no-console
      console.warn(`[patternLibrary] 템플릿에 문법 위반 조합이 있습니다: ${kind}=${patternId} — ${check.reason}`);
      continue; // 어긴 요소는 조용히 잘못된 위치로 그리지 않고 아예 빼버립니다.
    }
    const resolved = resolvePatternPosition(kind, patternId, selections);
    if (!resolved) continue;
    // 사용자가 "위/아래로 몇 mm만 더" 같은 미세조정을 하면 selections[`${kind}FineOffsetMm`]에
    // { y } (지금은 세로만) 형태로 들어옵니다. 패턴 자체의 offsetMm에 더하기만 하고, 그
    // 결과는 resolveElementPosition(kernel/designRules.js)이 항상 다시 안전영역으로
    // clamp합니다 — 그래서 아무리 세게 밀어도 재단선을 넘어가는 값이 나올 수 없습니다.
    // "자유 드래그 대신 검증된 선택지"라는 원칙을 유지하면서, 그 선택지 하나하나를
    // mm 단위로 미세조정할 수 있게 되는 것입니다.
    const fine = selections[`${kind}FineOffsetMm`] || {};
    const baseOffset = resolved.pos.offsetMm || {};
    const mergedOffsetMm = { x: (baseOffset.x || 0) + (fine.x || 0), y: (baseOffset.y || 0) + (fine.y || 0) };
    layout[kind] = {
      kind,
      zone: resolved.pos.zone,
      offsetMm: mergedOffsetMm,
      emphasis: selections[`${kind}Emphasis`] || resolved.emphasis,
      ...(kind === "logo"
        ? { size: selections.logoSize || "md" }
        : { pointSize: selections[`${kind}PointSize`] || POINT_SIZE_DEFAULT[kind], ...(options.overlay ? { overlay: true } : {}) }),
    };
  }
  return layout;
}

// ==================== domain/frame/index ====================
// Frame Domain — Recommendation이 고른 값을 실제 배치표로 바꿉니다.
// (Recommendation → Frame → Asset → Kernel(DRS) → 최종 디자인)
//
// Frame Domain Roadmap
//   Phase 1 [x] templates.js / photoTemplates.js / backLayouts.js / frameResolver.js
//   Phase 2 [x] frameCodes.js — 업종-타입 코드 체계(v1, 신규 설계). "INS-F001" 스펙은
//     실재를 확인할 수 없어(다른 세션의 Core_Principles.md/Issue_Registry_v1.0.md에도
//     없음) 그대로 쓰지 않고, 실제 존재하는 업종(INDUSTRY_KEYWORDS)·템플릿(TEMPLATES/
//     PHOTO_TEMPLATES)만 근거로 새로 설계했습니다. 업종별로 실제 다른 레이아웃을 만드는
//     기능은 아직 없습니다(전 업종이 같은 TEMPLATE_LAYOUTS를 공유) — frameCode의 업종
//     부분은 지금은 추천 이유 설명용이고, 실제 레이아웃 분기는 나중에 필요해지면 추가.

// ==================== domain/frame/photoTemplates ====================
// ====================================================================
// Domain : Frame / Photo Templates
// Version : 1.2 — 연락처도 독립 필드(mobile/telephoneFax/address/email/website/etc)로 분리
// Responsibility : 사진이 들어간 템플릿(사진 분할형/배경형/프로필 원형)의 배치표.
//                  사진은 zone(점) 기반이 아니라 rect(사각형: left/top/width/height, %)
//                  기반이라 Pattern Library의 어휘가 없습니다(patternLibrary.js 상단 주석의
//                  "정직하게 밝히는 한계" 참고) — 그래서 photo만 예전처럼 rect로 남기고,
//                  company/person/logo/연락처 항목들은 templates.js와 같은 방식으로
//                  patternId 조합으로 바꿨습니다. 이제 사진형도 다른 템플릿과 똑같이
//                  mm 미세조정·pt 크기조절이 됩니다.
// ====================================================================

const PHOTO_OBJECT_VERSION = "1.3";
// 2026-08-02: "사진 배경형·프로필 원형·사진 분할형·사진 우측형"이라는 이름이 AI가
// 정한 낯선 분류였다는 피드백으로 전면 재정리했습니다. 실제 가로형 명함 샘플들
// (전문가가 만든 것들 포함)을 참고해보니, 인물·캐릭터 사진은 결국 "왼쪽/오른쪽" 중
// 하나에, 그리고 "꽉 찬 사각형"이거나 "동그라미" 둘 중 하나로만 나뉘어서 — 가로형은
// 이 2×2 조합(왼쪽/오른쪽 × 사각형/동그라미) 4가지로 정리했습니다:
//   왼쪽사진배치형 / 오른쪽사진배치형 / 왼쪽동그라미사진형 / 오른쪽동그라미사진형
// "사진 배경형"(사진이 카드 전체를 덮는 것)은 가로형에서는 인물 사진을 전체 배경에
// 깔면 부자연스럽다는 지적으로 없앴습니다. 세로형 전용인 "사진 상단형"/"사진 하단형"은
// (세로형 자체가 아직 보류 상태라) 그대로 남겨뒀고, 목록만 방향별로 분리했습니다.
const PHOTO_TEMPLATES_LANDSCAPE = ["왼쪽사진배치형", "오른쪽사진배치형", "왼쪽동그라미사진형", "오른쪽동그라미사진형"];
const PHOTO_TEMPLATES_PORTRAIT = ["사진 상단형", "사진 하단형"];
const PHOTO_TEMPLATES = [...PHOTO_TEMPLATES_LANDSCAPE, ...PHOTO_TEMPLATES_PORTRAIT];

// 2026-08-02: "사진형도 크기·위치를 옮길 수 있으면 한다. AI가 못 옮기면 사람이
// 손가락/마우스로 조정하게 해달라"는 요청 반영. 업종별로 사진 위치를 스스로
// 재배치하는 진짜 AI 레이아웃 엔진은 아직 없어서(추천 엔진이 사진을 다루지 않음),
// 로고·텍스트와 똑같은 드래그 방식으로 사람이 직접 옮기게 했습니다. 이동 범위를
// ±15mm(약 1.5cm)로 제한한 건 "1~2cm 정도"라는 요청 범위 안에서 잡은 값입니다 —
// 이 범위를 넘어가면 사진형 타입 자체가 의도한 구도(예: 좌우 절반, 상하 절반)를
// 벗어나 버려서 오히려 어색해지기 때문에, 미세조정 수준으로만 열어뒀습니다.
const PHOTO_MOVE_LIMIT_MM = 15;
const PHOTO_SCALE_RANGE = { min: 0.85, max: 1.3 };

// 미리보기(CardLayoutPreview)와 인쇄파일(cardFileExporter) 둘 다 이 함수 하나로
// "기본 rect(%) + 사용자가 옮긴 만큼(mm) + 사용자가 조절한 배율"을 합쳐서 최종
// rect(%)를 계산합니다 — 두 곳에서 각자 계산하다 결과가 어긋나는 일을 막기 위해
// 단일 소스로 뒀습니다(이 프로젝트에서 반복됐던 실수 패턴이라 특히 주의).
function computeEffectivePhotoRect(rect, offsetMm, scale, trimWidth, trimHeight) {
  const s = scale || 1;
  const ox = offsetMm?.x || 0;
  const oy = offsetMm?.y || 0;
  const baseCenterXMm = ((rect.left + rect.width / 2) / 100) * trimWidth;
  const baseCenterYMm = ((rect.top + rect.height / 2) / 100) * trimHeight;
  const baseWMm = (rect.width / 100) * trimWidth;
  const baseHMm = (rect.height / 100) * trimHeight;
  const scaledWMm = baseWMm * s;
  const scaledHMm = baseHMm * s;
  const centerXMm = baseCenterXMm + ox;
  const centerYMm = baseCenterYMm + oy;
  let leftMm = centerXMm - scaledWMm / 2;
  let topMm = centerYMm - scaledHMm / 2;
  let left = (leftMm / trimWidth) * 100;
  let top = (topMm / trimHeight) * 100;
  let width = (scaledWMm / trimWidth) * 100;
  let height = (scaledHMm / trimHeight) * 100;

  // 2026-08-07: "동그라미 사진을 키우니 카드 밖으로 벗어난다"는 신고 반영. 사진
  // 배경형·상단형처럼 "원래부터 카드 가장자리에 닿게 디자인된" 종류는 그대로
  // 도련까지 나가는 게 맞지만(의도된 디자인), 프로필 원형처럼 "원래 여백을 두고
  // 카드 안에 떠 있던" 사진은 크기를 키우거나 옮겨도 카드 테두리 밖으로 나가면
  // 안 됩니다. 판단 기준은 "원래(rect) 그 가장자리에 이미 닿아있었는가"입니다 —
  // 이미 닿아있던 쪽(edge bleed가 의도된 쪽)은 그대로 두고, 원래 여백이 있던
  // 쪽만 화면 안으로 붙잡아 둡니다.
  const EDGE_EPS = 0.01;
  const touchedLeft = rect.left <= EDGE_EPS;
  const touchedRight = rect.left + rect.width >= 100 - EDGE_EPS;
  const touchedTop = rect.top <= EDGE_EPS;
  const touchedBottom = rect.top + rect.height >= 100 - EDGE_EPS;
  if (!touchedLeft && left < 0) left = 0;
  if (!touchedRight && left + width > 100) left = 100 - width;
  if (!touchedTop && top < 0) top = 0;
  if (!touchedBottom && top + height > 100) top = 100 - height;
  // 카드보다 사진이 더 커지는 극단적인 경우, 그래도 최소한 카드 안쪽에서
  // 시작하도록 한 번 더 안전장치를 둡니다.
  if (!touchedLeft && !touchedRight) left = Math.max(0, Math.min(left, 100 - width));
  if (!touchedTop && !touchedBottom) top = Math.max(0, Math.min(top, 100 - height));

  return { left, top, width, height };
}

// 사진 자리(rect)만 따로 — Pattern Library가 다루지 않는 유일한 부분
const PHOTO_RECT_BY_VARIANT = {
  // 사진(사각형)이 왼쪽 절반 — 옛 "사진 분할형"과 같은 rect
  "왼쪽사진배치형": { photo: { kind: "photo", rect: { left: 0, top: 0, width: 46, height: 100 } } },
  // 사진(사각형)이 오른쪽 절반 — 옛 "사진 우측형"과 같은 rect(사진 분할형의 좌우반전)
  "오른쪽사진배치형": { photo: { kind: "photo", rect: { left: 54, top: 0, width: 46, height: 100 } } },
  // 동그라미 사진이 왼쪽 — 옛 "프로필 원형"(오른쪽 동그라미) rect를 좌우로 그대로 반전
  "왼쪽동그라미사진형": { photo: { kind: "photo", rect: { left: 6, top: 10, width: 28, height: 50 }, shape: "circle" } },
  // 동그라미 사진이 오른쪽 — 옛 "프로필 원형"과 같은 rect
  "오른쪽동그라미사진형": { photo: { kind: "photo", rect: { left: 66, top: 10, width: 28, height: 50 }, shape: "circle" } },
  // 위/아래 조합 — 세로형 전용(아직 보류 상태라 그대로 둠)
  "사진 상단형": { photo: { kind: "photo", rect: { left: 0, top: 0, width: 100, height: 52 } } },
  "사진 하단형": { photo: { kind: "photo", rect: { left: 0, top: 48, width: 100, height: 52 } } },
};

// 텍스트/로고 패턴 조합 + overlay 여부(현재 4가지 모두 사진이 카드 전체를 덮지
// 않아서 overlay 없음 — "사진 배경형" 삭제로 overlay가 필요한 변형이 지금은 없음)
// v1.3: person을 position(직위)/personName(이름)으로 분리 — templates.js와 같은 이유.
const PHOTO_TEMPLATE_PATTERN_SELECTIONS = {
  // 사진이 좌측 절반, 텍스트는 우측에 세로로 — 로고 우상단 → 회사명 우측중앙 →
  // 직위(작게, 이름 위) → 이름(크게, 살짝 아래) → 연락처(항목별로 독립) 우하단
  "왼쪽사진배치형": {
    overlay: false,
    patterns: {
      logo: "L002", logoSize: "sm",
      company: "P003", companyFineOffsetMm: { y: 3 },
      position: "N003", positionFineOffsetMm: { y: -6 },
      personName: "N003", personNameFineOffsetMm: { y: 0 },
      ...contactStack("T003"),
    },
  },
  // 사진이 우측 절반, 텍스트는 좌측 — "왼쪽사진배치형"의 좌우 반전 버전
  "오른쪽사진배치형": {
    overlay: false,
    patterns: {
      logo: "L001", logoSize: "sm",
      company: "P001", companyFineOffsetMm: { y: 3 },
      position: "N002", positionFineOffsetMm: { y: -6 },
      personName: "N002", personNameFineOffsetMm: { y: 0 },
      ...contactStack("T001"),
    },
  },
  // 동그라미 사진이 왼쪽, 텍스트는 오른쪽 — "왼쪽사진배치형"과 같은 텍스트 배치를
  // 재사용(둘 다 "사진은 왼쪽, 글자는 오른쪽" 구조라서 같은 패턴이 맞음)
  "왼쪽동그라미사진형": {
    overlay: false,
    patterns: {
      // 2026-08-07: "로고가 회사명 바로 위에 겹쳐 보인다"는 신고 반영 — 로고와
      // 회사명이 둘 다 같은 자리(우상단)를 기준으로 삼고 있어서, 로고가 회사명
      // 바로 위에 쌓이는 모양이었습니다. 로고를 왼쪽으로 옮겨서 회사명 앞(왼쪽)에
      // 나란히 놓이도록 고쳤습니다.
      logo: "L002", logoSize: "sm", logoFineOffsetMm: { x: -20, y: 3 },
      company: "P003", companyFineOffsetMm: { y: 3 },
      position: "N003", positionFineOffsetMm: { y: -6 },
      personName: "N003", personNameFineOffsetMm: { y: 0 },
      ...contactStack("T003"),
    },
  },
  // 동그라미 사진이 오른쪽, 텍스트는 왼쪽 — 옛 "프로필 원형"과 같은 텍스트 배치
  "오른쪽동그라미사진형": {
    overlay: false,
    patterns: {
      company: "P001", companyFineOffsetMm: { y: 3 },
      position: "N002", positionFineOffsetMm: { y: -6 },
      personName: "N002", personNameFineOffsetMm: { y: 0 },
      ...contactStack("T001"), logo: "L006", logoSize: "sm",
    },
  },
  // 사진이 위쪽, 텍스트는 아래쪽에 몰아서 — 세로형 전용(보류 상태, 그대로 둠)
  "사진 상단형": {
    overlay: false,
    patterns: {
      logo: "L006", logoSize: "sm",
      company: "P006", companyFineOffsetMm: { y: -16 },
      position: "N005", positionFineOffsetMm: { y: -3 },
      personName: "N005", personNameFineOffsetMm: { y: 2 },
      ...contactStack("T002", -3, -2),
    },
  },
  // 사진이 아래쪽, 텍스트는 위쪽에 — 세로형 전용(보류 상태, 그대로 둠)
  "사진 하단형": {
    overlay: false,
    patterns: {
      logo: "L001", logoSize: "sm",
      company: "P002", companyFineOffsetMm: { y: 1 },
      position: "N001", positionFineOffsetMm: { y: -13 },
      personName: "N001", personNameFineOffsetMm: { y: -8 },
      ...contactStack("T002", -24, -2),
    },
  },
};

// 2026-08-01: "사진이 위/아래에 있는 명함은 보통 가로형이 아니라 세로형"이라는
// 피드백 반영. "사진 상단형"/"사진 하단형" 두 변형만 세로 방향(portrait)으로 카드를
// 그립니다 — 이 판단 기준을 여기 한 곳에만 두고, CardLayoutPreview·cardFileExporter가
// 똑같이 이 함수를 불러써서 "화면에서만 세로고 인쇄파일은 가로로 나가는" 것 같은
// 불일치가 생기지 않게 했습니다.
function isPortraitPhotoVariant(templateName, photoVariant) {
  return templateName === "사진형" && PHOTO_TEMPLATES_PORTRAIT.includes(photoVariant);
}

function getPhotoLayoutFor(photoVariant) {
  const variant = PHOTO_TEMPLATE_PATTERN_SELECTIONS[photoVariant] ? photoVariant : PHOTO_TEMPLATES[0];
  const preset = PHOTO_TEMPLATE_PATTERN_SELECTIONS[variant];
  return {
    ...PHOTO_RECT_BY_VARIANT[variant],
    ...buildLayoutFromPatterns(preset.patterns, { overlay: preset.overlay }),
  };
}

// ==================== domain/asset/index ====================
// Asset Domain — 디자인 엔진의 "재료 창고". AI가 무엇을 고를 수 있는지 정의하는 카탈로그.
//
// Asset Domain Roadmap ("실제 책임이 생길 때 분리한다" 원칙)
//   catalog(지금) — 정적 카탈로그: 사람이 미리 정의해둔 선택지
//   learning(미래) — STEP 7 Learning이 완성되면 learnedStyles.js/learnedColors.js가 생기고,
//                    AI는 catalog + learning 둘을 함께 참고하게 됨. 아직 실사용 데이터가
//                    없어 지금은 만들지 않음 (Company Domain의 companyLearning.js와 동일한 이유).

// ==================== domain/export/cardFileExporter ====================
// ====================================================================
// Domain : Export / Card File Exporter
// Version : 1.0 (신규 — 가장 중요한 공백을 메우는 파일)
// Responsibility : 화면에 그려지는 미리보기(CardLayoutPreview)를 실제 인쇄에 쓸 수 있는
//                  파일로 변환합니다. 지금까지 이 앱은 결제까지는 완벽했지만, "AI가
//                  디자인한 명함을 실제 파일로 뽑아내는" 마지막 단계가 없었습니다 —
//                  그게 없으면 인쇄소에 넘길 게 아무것도 없다는 지적이 정확했습니다.
//
// 왜 PNG나 PDF가 아니라 SVG인가:
//   이 환경(브라우저)에서 실제로 만들 수 있는 도구 중, 별도 라이브러리 설치 없이
//   벡터(글자가 확대해도 안 깨지는) 파일을 만들 수 있는 유일한 방법이 SVG입니다.
//   SVG는 width/height를 "mm" 단위로 직접 지정할 수 있어서, 실물 명함 크기(예:
//   90mm x 50mm)를 그대로 표현하는 진짜 물리적 치수의 파일이 됩니다 — 화면 픽셀을
//   흉내 낸 이미지가 아니라, 인쇄소가 실제로 열어서 쓸 수 있는 벡터 원고입니다.
//   대부분의 인쇄소·에디터(일러스트레이터, Inkscape 등)가 SVG를 직접 엽니다.
//
// 정직하게 밝히는 한계:
//   - CMYK 색공간 변환은 안 합니다(SVG는 RGB로 정의됩니다) — 실제 인쇄 시 색상이
//     미세하게 다르게 나올 수 있고, 이건 결제 화면에 안내 문구로 남겨야 합니다.
//   - 재단선·눈금(크롭 마크)은 이 버전에 없습니다 — 안전영역·재단선 좌표 자체는
//     정확하지만, 인쇄소가 요구하는 크롭마크 표시는 필요해지면 추가해야 합니다.
//   - pt(포인트) 크기는 여기서는 실제 물리 단위(1pt = 0.3527778mm)로 정확히
//     환산합니다 — 화면 미리보기(CardLayoutPreview)의 pt는 "표시상의 상대 크기"였지만,
//     이 파일은 실제로 인쇄될 원고라 정확한 환산이 필요하고, 여기서 처음 제대로 합니다.
// ====================================================================





const PT_TO_MM = 0.3527778;
// 기존 emphasis(lg/md/sm) 기반 레이아웃(예: 사진형이 아직 patternSelections 없이 쓰일 때)은
// pointSize가 없으므로, kernel/designRules.js의 TEXT_EMPHASIS_SIZE.full 값을 그대로
// pt로 간주합니다. 2026-08-01: 예전엔 이 파일에 { lg: 13, md: 10, sm: 8.5 }를 따로
// 하드코딩해 놨었는데, 그러다 보니 미리보기(designRules.js)에서 글자 크기를 키워도
// 실제 인쇄파일(이 파일)에는 반영이 안 되는 문제가 있었습니다. 이제 designRules.js를
// 그대로 import해서 쓰므로 두 곳이 항상 같은 값을 씁니다.
const EMPHASIS_PT_FALLBACK = TEXT_EMPHASIS_SIZE.full;

function escapeXml(str) {
  return String(str).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));
}

function textFor(key, fields, nameEnglish) {
  if (key === "company") return fields?.["companyName"] || "회사명";
  if (key === "position") return fields?.["position"] || "직위";
  if (key === "personName") {
    const base = fields?.["personName"] || "성명";
    return nameEnglish?.trim() ? `${base} (${nameEnglish.trim()})` : base;
  }
  if (key === "mobile") return fields?.mobile?.trim() || null;
  if (key === "telephoneFax") {
    const tel = fields?.telephone?.trim();
    const fax = fields?.fax?.trim();
    if (tel && fax) return `${tel} · Fax ${fax}`;
    if (tel) return tel;
    if (fax) return `Fax ${fax}`;
    return null;
  }
  if (key === "address") return fields?.address?.trim() || null;
  if (key === "email") return fields?.email?.trim() || null;
  if (key === "website") return fields?.website?.trim() || null;
  if (key === "etc") return fields?.etc?.trim() || null;
  return "";
}

// CardLayoutPreview.jsx와 정확히 같은 규칙(임계값 기반 정렬)을 씁니다 — 미리보기와
// 실제 파일이 서로 다른 위치로 나오면 "본 것과 다르게 인쇄됐다"는 신뢰 문제가 생기므로,
// 여기 계산은 renderer/CardLayoutPreview.jsx의 로직과 반드시 같게 유지해야 합니다.
function alignFor(x) {
  return x <= DESIGN_RULES.alignment.leftThreshold ? "left" : x >= DESIGN_RULES.alignment.rightThreshold ? "right" : "center";
}
function valignFor(y) {
  return y <= DESIGN_RULES.alignment.leftThreshold ? "top" : y >= DESIGN_RULES.alignment.rightThreshold ? "bottom" : "middle";
}

function buildCardSVG({
  templateName, photoVariant, showLogo = true, fields, cardSize, patternSelections = null,
  fontFamilyId = null, backgroundStyle = "white", logoColor = null, logoDataUrl = null,
  nameEnglish = "", showContactIcon = true, qrEnabled = false, orientation = null,
}) {
  // 2026-08-01: 미리보기와 마찬가지로, 명시적으로 고른 orientation이 있으면 그걸
  // 그대로 쓰고(가로형/세로형을 직접 고를 수 있게 됐으므로), 없을 때만 예전처럼
  // 사진 상단형/하단형 여부로 자동 추정합니다.
  const spec = getCardSpec(cardSize, orientation || (isPortraitPhotoVariant(templateName, photoVariant) ? "portrait" : "landscape"));
  const workingW = spec.trimWidth + spec.bleed * 2;
  const workingH = spec.trimHeight + spec.bleed * 2;
  const safeWidthMm = spec.trimWidth - spec.safeMargin * 2;
  const safeHeightMm = spec.trimHeight - spec.safeMargin * 2;
  const safeOriginXMm = spec.bleed + spec.safeMargin;
  const safeOriginYMm = spec.bleed + spec.safeMargin;

  const photoRect = templateName === "사진형" ? (PHOTO_RECT_BY_VARIANT[photoVariant] || PHOTO_RECT_BY_VARIANT[PHOTO_TEMPLATES[0]]) : {};
  const layout = patternSelections
    ? { ...photoRect, ...buildLayoutFromPatterns(patternSelections, { overlay: templateName === "사진형" && !!PHOTO_TEMPLATE_PATTERN_SELECTIONS[photoVariant]?.overlay }) }
    : getLayoutFor(templateName, photoVariant);

  const bgOption = BACKGROUND_STYLE_OPTIONS.find((b) => b.id === backgroundStyle);
  const needsLightText = bgOption?.dark === true;
  const fontForKind = (kind) => {
    const id = typeof fontFamilyId === "string" ? fontFamilyId : (fontFamilyId?.[kind] || fontFamilyId?.default);
    return resolveFontFamily(id);
  };
  const CONTACT_SUB_KINDS = ["mobile", "telephoneFax", "address", "email", "website", "etc"];
  const anyContactFilled = CONTACT_SUB_KINDS.some((k) => layout[k] && textFor(k, fields, nameEnglish));

  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${workingW}mm" height="${workingH}mm" viewBox="0 0 ${workingW} ${workingH}">`);
  // 배경(도련 전체 — 실제 인쇄에서는 도련까지 배경색이 깔려야 흰 테두리가 안 남습니다)
  const bgFill = bgOption?.id === "gradient" ? "url(#bgGradient)" : (bgOption?.id === "soft" ? "#F4F1FB" : "#FFFFFF");
  if (bgOption?.id === "gradient") {
    parts.push(`<defs><linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6C4CF0"/><stop offset="100%" stop-color="#4C6FFF"/></linearGradient></defs>`);
  }
  parts.push(`<rect x="0" y="0" width="${workingW}" height="${workingH}" fill="${bgFill}"/>`);

  // 2026-08-02: "안전영역 재정의" 반영 — 텍스트·로고는 안전영역(safeMargin) 안에
  // 머물러야 하지만(기존 그대로, resolveElementPosition의 clampToAllowedRegion이
  // 담당), 배경색·그림(사진)처럼 "디자인의 배경이 되는 요소"는 재단선(trim)이 아니라
  // 도련까지 포함한 작업선까지 꽉 채워야 합니다 — 재단 시 아주 약간의 오차가 있어도
  // 흰 테두리가 남지 않게 하기 위해서입니다. 배경색은 이미 도련 전체를 채우고
  // 있었는데(위 rect), 사진(photo) rect는 trim 기준으로만 계산되어 있어서 카드
  // 가장자리에 닿는 사진(사진 배경형·상단형·하단형·분할형·우측형)에서 도련만큼
  // 얇게 흰 여백이 남는 진짜 버그가 있었습니다. 아래에서, 사진 영역이 원래 카드의
  // 어느 가장자리(0% 또는 100%)에 닿아있었는지 보고, 닿아있던 쪽으로만 도련만큼
  // 밀어서 확장합니다(중앙에 떠 있는 프로필 원형 같은 사진은 어느 쪽도 안 닿아있으니
  // 그대로 둡니다).
  if (layout.photo) {
    // 2026-08-02: "사진형도 위치·크기를 옮길 수 있게 해달라"는 요청 반영 — 미리보기와
    // 똑같은 함수(computeEffectivePhotoRect)로 사용자가 옮긴 만큼을 먼저 반영한
    // "실제" rect를 구하고, 도련 확장 여부(아래)는 원래 정의가 아니라 이 조정된
    // rect가 지금 가장자리에 닿아있는지를 기준으로 다시 판단합니다 — 그래야 사진을
    // 조금 옮긴 뒤에도 도련 처리가 계속 정확합니다.
    const photoOffsetMm = patternSelections?.photoFineOffsetMm || { x: 0, y: 0 };
    const photoScale = patternSelections?.photoScale || 1;
    const rect = computeEffectivePhotoRect(layout.photo.rect, photoOffsetMm, photoScale, spec.trimWidth, spec.trimHeight);
    let px = spec.bleed + (rect.left / 100) * spec.trimWidth;
    let py = spec.bleed + (rect.top / 100) * spec.trimHeight;
    let pw = (rect.width / 100) * spec.trimWidth;
    let ph = (rect.height / 100) * spec.trimHeight;
    const EDGE_EPS = 0.01; // % 단위 반올림 오차 허용
    if (rect.left <= EDGE_EPS) { px -= spec.bleed; pw += spec.bleed; }
    if (rect.left + rect.width >= 100 - EDGE_EPS) { pw += spec.bleed; }
    if (rect.top <= EDGE_EPS) { py -= spec.bleed; ph += spec.bleed; }
    if (rect.top + rect.height >= 100 - EDGE_EPS) { ph += spec.bleed; }
    if (layout.photo.shape === "circle") {
      parts.push(`<clipPath id="photoClip"><ellipse cx="${px + pw / 2}" cy="${py + ph / 2}" rx="${pw / 2}" ry="${ph / 2}"/></clipPath>`);
    }
    parts.push(`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="#E9E7F5" ${layout.photo.shape === "circle" ? 'clip-path="url(#photoClip)"' : ""}/>`);
    // 실제 고객 사진 파일은 이 자리에 <image>로 들어가야 하지만, 여기서는 사진 자체를
    // 다루지 않습니다(사진형 주문은 아직 사진 업로드가 이 파이프라인과 안 이어져 있음 —
    // 별도로 확인이 필요합니다).
  }

  // 각 요소(로고/회사명/이름·직위/연락처 세부항목)
  for (const [key, pos] of Object.entries(layout)) {
    if (pos.kind === "photo") continue;
    if (pos.kind === "logo" && !showLogo) continue;
    const text = textFor(key, fields, nameEnglish);
    const isMobileFallback = key === "mobile" && text === null && !anyContactFilled;
    if (text === null && !isMobileFallback) continue;
    const displayText = isMobileFallback ? "010-0000-0000" : text;

    const { x, y } = resolveElementPosition(pos.kind, pos, spec);
    const xMm = safeOriginXMm + (x / 100) * safeWidthMm;
    const yMm = safeOriginYMm + (y / 100) * safeHeightMm;
    const align = alignFor(x);
    const valign = valignFor(y);
    const isLogo = pos.kind === "logo";

    if (isLogo) {
      // LOGO_SIZE_PERCENT의 full 모드 값(%, 안전영역 너비 기준)을 그대로 mm로 환산
      const sizePercent = LOGO_SIZE_PERCENT.full[pos.size || "md"];
      const sizeMm = (sizePercent / 100) * safeWidthMm;
      const boxX = align === "left" ? xMm : align === "right" ? xMm - sizeMm : xMm - sizeMm / 2;
      const boxY = valign === "top" ? yMm : valign === "bottom" ? yMm - sizeMm : yMm - sizeMm / 2;
      if (logoDataUrl) {
        parts.push(`<image x="${boxX}" y="${boxY}" width="${sizeMm}" height="${sizeMm}" href="${logoDataUrl}" preserveAspectRatio="xMidYMid meet"/>`);
      } else {
        parts.push(`<rect x="${boxX}" y="${boxY}" width="${sizeMm}" height="${sizeMm}" fill="${resolveLogoColor(logoColor)}" stroke="rgba(0,0,0,0.18)" stroke-width="0.2"/>`);
      }
      continue;
    }

    const pointSizePt = pos.pointSize != null ? pos.pointSize : EMPHASIS_PT_FALLBACK[pos.emphasis || "md"];
    const fontSizeMm = pointSizePt * PT_TO_MM;
    const fontDef = fontForKind(key);
    const fill = (pos.overlay || needsLightText) ? "#FFFFFF" : "#1A1A22";
    const anchor = align === "left" ? "start" : align === "right" ? "end" : "middle";
    // SVG의 dominant-baseline만으로 valign(top/middle/bottom)을 정확히 맞추기 어려워서,
    // y좌표 자체를 폰트 크기 기준으로 보정합니다 — 화면(CSS translate)과 같은 결과를 냅니다.
    const yAdjusted = valign === "top" ? yMm + fontSizeMm * 0.8 : valign === "bottom" ? yMm - fontSizeMm * 0.2 : yMm + fontSizeMm * 0.3;
    parts.push(
      `<text x="${xMm}" y="${yAdjusted}" font-size="${fontSizeMm}" font-family="${escapeXml(fontDef.family.replace(/'/g, ""))}" font-weight="${fontDef.weight}" fill="${fill}" text-anchor="${anchor}">${escapeXml(displayText)}</text>`
    );
  }

  parts.push(`</svg>`);
  return parts.join("\n");
}

function svgToDataUrl(svgString) {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
}

// 뒷면 패널 하나만 그립니다 — BACK_LAYOUTS(domain/frame/backLayouts.js)의 logo/qr/blank/
// text 중 하나("custom"은 사람이 직접 디자인하므로 여기서 다루지 않습니다).
// 2026-08-01: "text"(문구형) 추가 — 여러 줄 문구를 정렬(왼쪽/가운데/오른쪽)·서체
// 선택해서 넣을 수 있습니다. backContent = { lines: string[], align: "left"|"center"|"right", fontFamilyId }.
function buildBackPanelSVG(choice, spec, offsetX, logoDataUrl, logoColor, backContent = null) {
  const workingW = spec.trimWidth + spec.bleed * 2;
  const workingH = spec.trimHeight + spec.bleed * 2;
  const cx = offsetX + workingW / 2;
  const cy = workingH / 2;
  const parts = [`<rect x="${offsetX}" y="0" width="${workingW}" height="${workingH}" fill="#FFFFFF"/>`];
  if (choice === "logo") {
    const size = Math.min(workingW, workingH) * 0.35;
    if (logoDataUrl) {
      parts.push(`<image x="${cx - size / 2}" y="${cy - size / 2}" width="${size}" height="${size}" href="${logoDataUrl}" preserveAspectRatio="xMidYMid meet"/>`);
    } else {
      parts.push(`<rect x="${cx - size / 2}" y="${cy - size / 2}" width="${size}" height="${size}" fill="${resolveLogoColor(logoColor)}"/>`);
    }
  } else if (choice === "qr") {
    const size = Math.min(workingW, workingH) * 0.4;
    parts.push(`<rect x="${cx - size / 2}" y="${cy - size / 2}" width="${size}" height="${size}" fill="#1A1A22"/>`);
    parts.push(`<text x="${cx}" y="${cy}" font-size="4" fill="#fff" text-anchor="middle" dominant-baseline="middle">QR</text>`);
  } else if (choice === "text" && backContent) {
    const lines = (backContent.lines || []).filter((l) => l.trim());
    const fontDef = resolveFontFamily(backContent.fontFamilyId);
    const align = backContent.align || "left";
    const marginMm = spec.safeMargin + spec.bleed;
    const textAnchor = align === "left" ? "start" : align === "right" ? "end" : "middle";
    const xPos = align === "left" ? offsetX + marginMm : align === "right" ? offsetX + workingW - marginMm : cx;
    // 폰트 크기는 줄 수에 따라 살짝 줄여서(너무 많이 넣으면 겹치는 대신 작아지게)
    // 최소한의 안전장치를 둡니다 — 앞면처럼 정교한 겹침 방지는 아니지만, 아예 안전선을
    // 벗어나 잘리는 것보다는 낫습니다.
    const fontSize = lines.length <= 3 ? 5.5 : lines.length <= 6 ? 4.2 : 3.4;
    const lineHeight = fontSize * 1.5;
    const totalHeight = lines.length * lineHeight;
    const startY = cy - totalHeight / 2 + fontSize;
    lines.forEach((line, i) => {
      const y = startY + i * lineHeight;
      const safeLine = String(line).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      parts.push(`<text x="${xPos}" y="${y}" font-size="${fontSize}" font-family="${fontDef.family}" font-weight="${fontDef.weight}" fill="#1A1A22" text-anchor="${textAnchor}">${safeLine}</text>`);
    });
  }
  // "blank"은 배경만 있는 빈 뒷면입니다.
  return parts.join("\n");
}

// 앞면 SVG 문자열(buildCardSVG의 결과)과 뒷면 선택지를 받아, 인쇄소가 한 파일에서
// 양면을 바로 알아볼 수 있도록 나란히 배치한 하나의 SVG로 합칩니다. 각 패널 위에
// "앞면"/"뒷면" 표시는 실제 인쇄 영역(도련) 바깥의 여유 공간에만 넣어서, 인쇄되는
// 카드 내용 자체에는 전혀 영향이 없습니다.
// 2026-08-01: "가로형/세로형을 앞뒤 독립적으로 고를 수 있어야 한다"는 요청으로
// frontSpec/backSpec을 따로 받습니다(카드 바깥 모양은 물리적으로 앞뒤가 같아야
// 하지만 — 한 장의 카드니까 — 그 안 내용 배치는 완전히 독립적입니다. 앞뒤를 다른
// 모양으로 고르면 그 상태 그대로 반영됩니다. 자동으로 서로 맞춰 돌리는 기능은
// "흔치 않은 경우라 필요 없다"고 확인받아 만들지 않았습니다). 높이가 서로 다르면
// 짧은 쪽을 세로 가운데로 맞춰서 나란히 놓습니다.
function buildDoubleSidedSVG(frontSvgInner, backLayoutChoice, frontSpec, logoDataUrl, logoColor, backContent = null, backSpec = frontSpec) {
  const frontW = frontSpec.trimWidth + frontSpec.bleed * 2;
  const frontH = frontSpec.trimHeight + frontSpec.bleed * 2;
  const backW = backSpec.trimWidth + backSpec.bleed * 2;
  const backH = backSpec.trimHeight + backSpec.bleed * 2;
  const gap = 10; // mm, 앞/뒤 사이 여백
  const labelHeight = 6; // mm, 라벨용 여유
  const totalW = frontW + gap + backW;
  const maxPanelH = Math.max(frontH, backH);
  const totalH = maxPanelH + labelHeight;
  const frontOffsetY = (maxPanelH - frontH) / 2;
  const backOffsetY = (maxPanelH - backH) / 2;
  const backOffsetX = frontW + gap;
  const frontInnerMatch = frontSvgInner.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  const frontInner = frontInnerMatch ? frontInnerMatch[1] : frontSvgInner;

  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}mm" height="${totalH}mm" viewBox="0 0 ${totalW} ${totalH}">`);
  parts.push(`<text x="0" y="4" font-size="3" fill="#999">앞면 (Front)</text>`);
  parts.push(`<text x="${backOffsetX}" y="4" font-size="3" fill="#999">뒷면 (Back)</text>`);
  parts.push(`<g transform="translate(0, ${labelHeight + frontOffsetY})">${frontInner}</g>`);
  parts.push(`<g transform="translate(0, ${labelHeight + backOffsetY})">${buildBackPanelSVG(backLayoutChoice, backSpec, backOffsetX, logoDataUrl, logoColor, backContent)}</g>`);
  parts.push(`</svg>`);
  return parts.join("\n");
}

// ==================== domain/config/serverConfig ====================
// 2026-08-04: 실제 백엔드 서버(Render)가 배포되면서 추가 — 이 주소 하나가 프론트엔드가
// 부르는 모든 API 호출의 기준입니다. 서버를 다른 곳으로 옮기거나 도메인을 바꾸게 되면
// 여기 한 곳만 고치면 됩니다.
const RENDER_API_BASE = "https://bizcard-studio-server.onrender.com";

// ==================== domain/company/orderAdmin ====================
// Order Admin — 관리자가 "입금확인"을 실제로 할 수 있게 해주는 기능.
// 2026-08-04 갱신: 실제 백엔드 서버(Render + Supabase)가 배포되면서, 이 파일이
// window.storage(이 미리보기 환경 전용 임시 저장소) 대신 진짜 서버 API를 부르도록
// 바뀌었습니다. 데이터는 이제 Supabase Postgres에 실제로 저장되고, 여러 사용자
// 사이의 격리 문제(이전까지의 한계)도 해결됩니다.
//
// ⚠️ 아직 안 옮겨진 부분: 인쇄파일(SVG)은 여전히 서버로 전송되지 않습니다 —
// Supabase Storage 연동은 다음 단계입니다. 지금은 주문 데이터(연락처·금액·설계도 등)만
// 실제로 저장되고, 인쇄파일 자체는 예전처럼 이메일 첨부로만 전달됩니다.
//
// ⚠️ Complete.jsx(고객이 보는 주문완료 화면)는 여전히 이 실제 상태를 안 읽고 예전
// 방식(로컬 "미리보기" 버튼)을 그대로 씁니다 — 이 부분은 다음 단계로 남아있습니다.


const ORDER_STATUS = {
  WAITING: "입금대기",
  CONFIRMED: "입금확인",
};

// 결제 화면에서 주문 접수 시 호출 — 서버(그리고 그 뒤의 Supabase)에 실제로 저장됩니다.
// 클라이언트가 미리 만들어둔 orderNo(화면 표시·이메일 등에 이미 쓰이고 있음)를 그대로
// 서버에 넘겨서, 고객이 보는 주문번호와 데이터베이스에 저장된 주문번호가 항상 같도록
// 맞췄습니다. 실패해도 결제 자체를 막지 않도록 항상 try/catch(또는 .catch)로 감싸서 쓰세요.
async function recordNewOrder(orderNo, record) {
  const res = await fetch(`${RENDER_API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderNo,
      customerPhone: record.customerPhone,
      customerName: record.customerName,
      categoryCode: record.categoryCode,
      paperCode: record.paperCode,
      paperChoice: record.paperChoice,
      options: record.options,
      sets: record.sets,
      memberType: record.memberType,
      amountTotal: record.amountTotal,
      depositorName: record.depositorName,
      shipping: record.shipping,
      designRecipe: record.designRecipe,
    }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `주문 저장 요청이 실패했습니다 (${res.status}).`);
  }
  return res.json();
}

// 고객이 "내 주문 조회"(재주문) 화면에서 호출 — 전화번호로 최근 주문을 찾습니다.
// ⚠️ 지금은 categoryCode/customerName/memberType/orderNo/designRecipe까지만 서버에
// 있고, 실제 인쇄파일(printFileSvg)이나 특별회원 업로드 파일은 아직 서버에 저장되지
// 않습니다(Storage 연동 전) — 그래서 재주문 시 "저장된 파일 그대로"는 아직 안 되고,
// design_recipe가 있는 경우에 한해 그 설계도로 다시 만드는 것만 가능합니다.
async function lookupOrdersByPhone(phone) {
  const res = await fetch(`${RENDER_API_BASE}/api/orders?phone=${encodeURIComponent(phone)}`);
  if (!res.ok) throw new Error("주문 조회에 실패했습니다.");
  const body = await res.json();
  const orders = (body.orders || []).map((o) => ({
    orderNo: o.order_no,
    name: o.customer_name,
    memberType: o.member_type,
    categoryName: o.category_code,
    designRecipe: o.design_recipe,
    // 아래 두 개는 서버에 아직 없음(known gap) — undefined로 두면 화면의
    // "재주문하기" 버튼 조건(printFileSvg || specialOrderFile || designRecipe)이
    // designRecipe만으로도 그대로 동작합니다.
    printFileSvg: undefined,
    specialOrderFile: undefined,
  }));
  return orders[0] || null; // 가장 최근 것 하나만 씀(서버가 최신순으로 내려줌)
}
async function adminLogin(password) {
  const res = await fetch(`${RENDER_API_BASE}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "로그인에 실패했습니다.");
  return body.token;
}

// 관리자 화면에서 호출 — 서버(Supabase)에 저장된 전체 주문 목록을 가져옵니다.
async function listOrders(token) {
  const res = await fetch(`${RENDER_API_BASE}/api/orders/admin/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("주문 목록을 불러오지 못했습니다.");
  const body = await res.json();
  // 프론트엔드 화면 코드가 기대하는 필드 이름(camelCase, orderNo/depositor 등)에
  // 맞춰서 서버 응답(snake_case)을 변환합니다.
  return (body.orders || []).map((o) => ({
    orderNo: o.order_no,
    depositor: o.depositor_name,
    categoryName: o.category_code,
    grandTotal: o.amount_total,
    status: o.status,
    confirmedBy: o.confirmed_by,
    confirmedAt: o.confirmed_at ? new Date(o.confirmed_at).getTime() : null,
    progressStage: o.progress_stage ?? 0,
    expectedPrintDate: o.expected_print_date || null,
  }));
}

// 관리자가 "입금확인" 버튼을 눌렀을 때 호출 — 실제로 서버가 상태를 바꾸고 기록합니다.
async function confirmDeposit(orderNo, token) {
  const res = await fetch(`${RENDER_API_BASE}/api/orders/admin/${orderNo}/confirm-deposit`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "입금확인 처리에 실패했습니다.");
  }
  return res.json();
}

// 2026-08-07: 결제 이후 "진행상황" 6단계 — 서버(routes/orders.js)와 정확히 같은
// 순서로 맞춰야 합니다. "디자인완료"는 주문 생성 시 자동으로 참이 되므로(결제
// 화면까지 온 것 자체가 디자인 확정을 의미), 관리자는 index 1부터만 다음 단계로
// 넘기면 됩니다.
const ORDER_PROGRESS_STAGES = ["디자인완료", "인쇄화일변환완료", "인쇄주문접수", "인쇄완료", "택배접수완료", "배송완료"];
const PRINT_DONE_STAGE_INDEX = 3; // "인쇄완료" — 이 단계로 넘길 때만 예정일을 같이 받음

// 관리자용 — 진행상황을 특정 단계로 넘깁니다. "인쇄완료" 단계로 넘길 땐
// expectedPrintDate("mm/dd" 형식 문자열)를 같이 넘겨주세요.
async function advanceProgress(orderNo, stage, token, expectedPrintDate) {
  const res = await fetch(`${RENDER_API_BASE}/api/orders/admin/${orderNo}/progress`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ stage, expectedPrintDate }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "진행상황 변경에 실패했습니다.");
  }
  return res.json();
}

// 고객이 주문완료 화면에서 호출 — 로그인 없이 주문번호만으로 실제 진행상황을 조회합니다.
async function getOrderProgress(orderNo) {
  const res = await fetch(`${RENDER_API_BASE}/api/orders/by-number/${encodeURIComponent(orderNo)}`);
  if (!res.ok) throw new Error("진행상황을 불러오지 못했습니다.");
  const body = await res.json();
  return {
    status: body.order.status,
    progressStage: body.order.progress_stage ?? 0,
    expectedPrintDate: body.order.expected_print_date || null,
  };
}

// ==================== data/options ====================
// choice 항목은 { label, value } 형태입니다. 화면에는 label을 보여주고,
// 저장·비교(가격 계산 등)에는 value(코드)를 사용해서 나중에 라벨 문구가 바뀌어도 로직이 깨지지 않게 했습니다.
const OPTIONS = [
  { code: "OPT001", name: "인쇄 방식", fee: 0, feeLabel: "추가금 없음", required: true, choice: [
    { label: "단면명함", value: "single" }, { label: "양면명함", value: "double" },
  ] },
  { code: "OPT002", name: "귀도리(4mm)", fee: 2420, feeLabel: "+2,420원", multi: true, choice: [
    { label: "좌상", value: "topLeft" }, { label: "좌하", value: "bottomLeft" }, { label: "우상", value: "topRight" }, { label: "우하", value: "bottomRight" },
  ] },
  { code: "OPT003", name: "타공(3mm)", fee: 3267, feeLabel: "+3,267원", choice: [
    { label: "좌상", value: "topLeft" }, { label: "좌중", value: "midLeft" }, { label: "좌하", value: "bottomLeft" },
    { label: "우상", value: "topRight" }, { label: "우중", value: "midRight" }, { label: "우하", value: "bottomRight" },
  ] },
  { code: "OPT004", name: "오시(1줄중앙)", fee: 6050, feeLabel: "+6,050원", choice: [
    { label: "세로 짧게", value: "vertical" }, { label: "가로 길게", value: "horizontal" },
  ] },
  { code: "OPT005", name: "미싱(1줄 위치설정)", fee: 6050, feeLabel: "+6,050원", choice: [
    { label: "세로 짧게", value: "vertical" }, { label: "가로 길게", value: "horizontal" },
  ] },
  { code: "OPT006", name: "넘버링", fee: 45980, feeLabel: "+45,980원", choice: null },
];

function availableOptions(category, paper) {
  if (!category) return [];
  let opts = OPTIONS;
  if (category.onlyOptions) opts = opts.filter((o) => category.onlyOptions.includes(o.code));
  if (category.printSides === false) opts = opts.filter((o) => o.code !== "OPT001");
  if (category.numbering === false) opts = opts.filter((o) => o.code !== "OPT006");
  if (paper && paper.numbering === false) opts = opts.filter((o) => o.code !== "OPT006");
  // 2026-08-02: "빠른스노우250g는 익일출고를 위해 옵션을 못 받게 해달라. 다만
  // 단면/양면(OPT001)은 그대로 고를 수 있어야 한다"는 요청 반영 — 이 용지만 인쇄
  // 방식 외의 나머지 옵션(귀도리·타공·오시·미싱·넘버링)을 전부 제외합니다.
  if (paper && paper.restrictedOptions) opts = opts.filter((o) => o.code === "OPT001");
  return opts;
}

// 오시(OPT004)·미싱(OPT005)은 세로/가로 방향에 따라 기준가가 달라짐: 기준가 × 1.1 × 1.1
// 세로 짧게: 5,000원 기준가 → 6,050원 / 가로 길게: 7,000원 기준가 → 8,470원
function optionFee(o, selOptions) {
  if (o.code === "OPT004" || o.code === "OPT005") {
    const value = selOptions?.[o.code]?.choice;
    const base = value === "horizontal" ? 7000 : 5000;
    return Math.round(base * 1.1 * 1.1);
  }
  return o.fee;
}

// 용지 선택 시 기본으로 세팅할 옵션값 (인쇄 방식은 필수이므로 단면명함을 기본값으로 지정)
function defaultSelOptions(category, paper) {
  const opts = availableOptions(category, paper);
  const hasPrintSide = opts.some((o) => o.code === "OPT001");
  return hasPrintSide ? { OPT001: { choice: "single" } } : {};
}

// 옵션 + 선택값을 사람이 읽을 수 있는 문구로 변환 (예: "인쇄 방식(양면명함)", "귀도리(4mm)(좌상/우상)")
function describeSelectedOption(o, sel) {
  if (!o) return null;
  if (!o.choice) return o.name;
  const raw = sel?.choice;
  const values = Array.isArray(raw) ? raw : (raw ? [raw] : []);
  const labels = values.map((v) => o.choice.find((c) => c.value === v)?.label).filter(Boolean);
  return labels.length ? `${o.name}(${labels.join("/")})` : o.name;
}

// ==================== screens/Payment ====================
function Payment({ order, patch, go, back, paper, category, unit, optTotal, shipFee, goodsTotal, grandTotal }) {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");
  const [highlightTerms, setHighlightTerms] = useState(false);
  const depositorRef = React.useRef(null);
  const termsBoxRef = React.useRef(null);
  const optLines = Object.entries(order.selOptions)
    .map(([code, sel]) => describeSelectedOption(OPTIONS.find((o) => o.code === code), sel))
    .filter(Boolean);
  return (
    <div className="app-body">
      <TopBar title={TEXTS.paymentTitle} onBack={back} step={6} go={go} />
      <div style={{ padding: "6px 18px 16px" }}>
        <Card style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>{TEXTS.orderSummaryTitle}</div>
          <SummaryRow k={TEXTS.summaryCategoryLabel} v={category?.name} />
          <SummaryRow k={TEXTS.summaryPaperLabel} v={paper?.name} />
          {order.paperChoice && <SummaryRow k={TEXTS.summaryPaperOptionLabel} v={order.paperChoice} />}
          <SummaryRow k={TEXTS.summaryOptionLabel} v={optLines.length ? optLines.join(", ") : TEXTS.summaryNone} />
          <SummaryRow k={TEXTS.summarySetLabel} v={`${order.sets}${TEXTS.summarySetSuffix}`} />
          <SummaryRow k={TEXTS.summaryMemberTypeLabel} v={order.memberType === "special" ? TEXTS.memberTypeSpecial : TEXTS.memberTypeGeneral} />
        </Card>

        <Card style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>{TEXTS.paymentAmountTitle}</div>
          <SummaryRow k={TEXTS.unitPriceLabel(order.sets)} v={won(unit * order.sets)} />
          {optTotal > 0 && <SummaryRow k={TEXTS.optionPriceLabel(order.sets)} v={won(optTotal * order.sets)} />}
          <SummaryRow k={TEXTS.shippingFeeLabel} v={shipFee === 0 ? TEXTS.shippingFeeFree : won(shipFee)} />
          <div style={{ borderTop: "1px solid var(--line)", marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontWeight: 900 }}>{TEXTS.grandTotalLabel}</span>
            <span style={{ fontSize: 17, fontWeight: 900, color: "var(--stamp)" }}>{won(grandTotal)}</span>
          </div>
        </Card>

        <Card style={{ background: "var(--paper-deep)", border: "none", marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <Landmark size={16} color="var(--ink-soft)" style={{ marginTop: 1, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700 }}>{TEXTS.bankInfoTitle}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 2 }}>{TEXTS.bankAccount}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{TEXTS.bankHolder}</div>
            </div>
          </div>
        </Card>

        <Field label={TEXTS.depositorLabel}><input ref={depositorRef} style={inputStyle} value={order.depositor} onChange={(e) => patch({ depositor: e.target.value })} placeholder={TEXTS.depositorPlaceholder} /></Field>

        <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 10, lineHeight: 1.5 }}>{TEXTS.cmykColorNotice}</div>

        {/* 2026-08-04: "체크를 해야 버튼이 눌리는데, 그걸 몰랐다"는 신고 반영 —
            기존엔 옅은 회색 글씨 + 작은 체크박스뿐이라 눈에 잘 안 띄었습니다.
            제목이 있는 박스로 감싸서 "여기 뭔가 확인할 게 있다"는 게 먼저
            눈에 들어오게 했습니다. */}
        <div
          ref={termsBoxRef}
          onClick={() => { setAgreedTerms((v) => !v); setValidationMsg(""); }}
          style={{
            marginTop: 14, padding: "12px 14px", borderRadius: 12, cursor: "pointer",
            border: `${highlightTerms ? 2.5 : 1.5}px solid ${agreedTerms ? "var(--stamp)" : "#F0B429"}`,
            background: agreedTerms ? "rgba(108,76,240,0.05)" : "#FFFBEB",
            boxShadow: highlightTerms ? "0 0 0 4px rgba(240,180,41,0.35)" : "none",
            transition: "box-shadow 0.3s, border-width 0.2s",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: agreedTerms ? "var(--stamp)" : "#B45309", marginBottom: 6 }}>
            {TEXTS.termsAgreementBoxTitle}
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{
              width: 18, height: 18, borderRadius: 5, marginTop: 1, flexShrink: 0,
              border: `1.5px solid ${agreedTerms ? "var(--stamp)" : "var(--line)"}`,
              background: agreedTerms ? "var(--stamp)" : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {agreedTerms && <Check size={12} color="#fff" />}
            </div>
            <span style={{ fontSize: 11.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>{TEXTS.termsLogoLiabilityLabel}</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "8px 18px 18px" }}>
        {validationMsg && (
          <div style={{
            fontSize: 12, color: "#B45309", background: "#FEF3C7", border: "1px solid #FDE68A",
            borderRadius: 10, padding: "9px 12px", marginBottom: 10, fontWeight: 700, textAlign: "center",
          }}>
            {validationMsg}
          </div>
        )}
        <PrimaryButton
          looksDisabled={!order.depositor || !agreedTerms}
          icon={CreditCard}
          onClick={async () => {
            // 2026-08-07: "체크박스를 못 찾아서 버튼이 안 눌린다"는 신고 반영 —
            // 예전엔 조건이 안 맞으면 버튼 자체가 브라우저 disabled 상태라 눌러도
            // 아무 반응이 없었습니다(React onClick조차 안 불림). 이제 버튼은 항상
            // 눌리고, 조건이 안 맞으면 뭐가 문제인지 알려주고 그 위치로 화면을
            // 이동시켜서 스스로 원인을 못 찾는 일이 없게 했습니다.
            if (!order.depositor) {
              setValidationMsg(TEXTS.paymentMissingDepositor);
              depositorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              depositorRef.current?.focus();
              return;
            }
            if (!agreedTerms) {
              setValidationMsg(TEXTS.paymentMissingAgreement);
              termsBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              setHighlightTerms(true);
              setTimeout(() => setHighlightTerms(false), 1500);
              return;
            }
            setValidationMsg("");
            // 실제 서비스에서는 이 주문번호를 서버가 발급해야 합니다.
            // 지금은 프론트엔드 프로토타입이라 임시로 생성하고, 새로고침 전까지는 값이 바뀌지 않도록 order 상태에 저장해둡니다.
            const orderNo = `BC${Date.now().toString().slice(-8)}`;
            patch({ orderNo });
            // 2026-08-04: 예전에 여기 있던 window.storage 기록(orderByPhone)을 지웠습니다 —
            // Home.jsx의 "내 주문 조회"가 이제 실제 서버를 조회하므로, 이 기록을 읽는
            // 코드가 더 이상 없어서 그대로 두면 아무 효과 없이 개인정보만 남기는
            // 죽은 코드였습니다. ⚠️ 다만 이 기록에만 있던 printFileSvg(인쇄파일)·
            // specialOrderFile(특별회원 업로드 파일)은 서버 쪽에 아직 저장할 곳이
            // 없어서, 지금은 재주문 시 "저장된 파일 그대로" 가져오는 기능 자체가
            // 없습니다 — design_recipe가 있는 주문만 그 설계도로 다시 만들 수 있습니다
            // (Supabase Storage 연동 전까지의 알려진 한계).
            // 2026-08-04: 실제 서버(Render+Supabase)가 배포되면서 recordNewOrder가
            // 진짜 데이터베이스에 저장합니다. 이 저장은 실패해도 결제 접수 자체를
            // 막으면 안 되므로(서버가 잠깐 응답 없거나 일시적 오류가 나도 고객은
            // 정상적으로 다음 화면으로 넘어가야 함), await 없이 그대로 흘려보냅니다.
            recordNewOrder(orderNo, {
              customerPhone: order.ship?.phone?.trim(), customerName: order.ship?.name || order.name,
              categoryCode: category?.code, paperCode: order.paperCode, paperChoice: order.paperChoice,
              options: order.selOptions, sets: order.sets, memberType: order.memberType,
              amountTotal: grandTotal, depositorName: order.depositor, shipping: order.ship,
              designRecipe: order.designRecipe || null,
            }).catch((err) => console.error("관리자 주문 기록 저장 실패:", err));
            // 이메일 발송 실패가 주문 접수 자체를 막으면 안 되므로, 실패해도 무시하고
            // 화면은 그대로 진행합니다 — 관리자 알림이 안 갔다고 고객의 주문을 막는 건
            // 우선순위가 거꾸로입니다.
            // 첨부는 둘 중 하나입니다: AI로 디자인했으면 방금 만든 인쇄용 SVG,
            // 특별회원이면 직접 올린 파일. 이제 결제만 되면 실제 인쇄 파일이 관리자
            // 이메일로 갑니다 — 지금까지 없던, 가장 중요한 마지막 단계입니다.
            const attachment = order.printFileSvg
              ? { dataUrl: svgToDataUrl(order.printFileSvg) }
              : (order.specialOrderFile || null);
            sendOrderNotificationEmail(order, orderNo, {
              categoryName: category?.name, paperName: paper?.name,
              optionsSummary: optLines.length ? optLines.join(", ") : null,
              totalPrice: grandTotal,
            }, attachment).catch((err) => console.error("주문 알림 이메일 발송 실패:", err));
            go("complete");
          }}
        >
          {TEXTS.paymentSubmitBtn}
        </PrimaryButton>
      </div>
    </div>
  );
}

// ==================== data/categories ====================
// printSides: 양면인쇄 옵션 제공 여부 / numbering: 넘버링 옵션 제공 여부 / onlyOptions: 이 코드만 사용 가능한 옵션 목록(제한이 없으면 생략)
const CATEGORIES = [
  { code: "cat01", name: "빠른명함", tagline: "당일 제작", icon: Zap, iconBg: "#EDEAFD", iconFg: "#6C4CF0", note: null, printSides: true, numbering: true },
  // 2026-08-07: "복권명함"·"멤버십카드" 신규 추가 요청 반영. ⚠️ 실제 인쇄 방식(특히
  // 복권명함은 긁는 은박 코팅이 들어가는 특수 인쇄라 일반 인쇄소 공정과 다를 수
  // 있음)과 정확한 단가·용지는 아직 확정된 값이 없어서, 다른 카테고리 값을 참고해
  // 임시로 채워뒀습니다 — 실제 원가·거래처 확인 후 papers.js의 해당 항목을
  // 꼭 다시 확인해주세요.
  { code: "cat07", name: "복권명함", tagline: "꽝 없는 긁는 명함", icon: Gift, iconBg: "#FCEADD", iconFg: "#E8834A", note: "긁는 코팅 특수 인쇄 — 단가 확인 필요", printSides: false, numbering: false },
  { code: "cat03", name: "스페셜명함", tagline: "유포 · 벨벳 · 펄", icon: Gem, iconBg: "#E5F7EC", iconFg: "#22B573", note: null, printSides: true, numbering: true },
  { code: "cat02", name: "프리미엄명함", tagline: "고급 수입지", icon: Crown, iconBg: "#FDF0DC", iconFg: "#DB9E1E", note: null, printSides: true, numbering: true },
  { code: "cat04", name: "카드명함", tagline: "PVC · 투명", icon: CreditCard, iconBg: "#E8F1FE", iconFg: "#3B82F6", note: "귀도리 옵션만 가능", printSides: true, numbering: true, onlyOptions: ["OPT002"] },
  { code: "cat08", name: "멤버십카드", tagline: "VIP회원카드", icon: UserCircle2, iconBg: "#EEEBFB", iconFg: "#7C5CDB", note: "단가 확인 필요", printSides: true, numbering: true, onlyOptions: ["OPT002"] },
  { code: "cat05", name: "에폭시명함", tagline: "에폭시 코팅", icon: Star, iconBg: "#E8F1FE", iconFg: "#3B82F6", note: "넘버링·양면 불가", printSides: false, numbering: false },
  { code: "cat06", name: "금박·은박명함", tagline: "금박 · 은박으로 빛나는 품격", icon: Award, iconBg: "#FCE8EE", iconFg: "#E63A6B", note: "넘버링·양면 불가", printSides: false, numbering: false },
];

// ==================== screens/Home ====================
function Home({ order, patch, go }) {
  // (2026-08-07: 여기 있던 catRef는 "주문" 메뉴가 없어지면서 같이 정리됨)

  const openCategory = (code) => {
    const changed = order.catCode !== code; // 실제로 카테고리가 바뀌었을 때만 하위 선택값 초기화
    patch(changed
      ? { catCode: code, paperCode: null, paperChoice: null, selOptions: {}, sets: 1 }
      : { catCode: code });
    go("paper");
  };

  return (
    <div className="app-body">
      <div style={{ padding: "20px 18px 4px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12, flexShrink: 0,
            background: "linear-gradient(135deg, var(--stamp), var(--stamp-2))",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13,
          }}>AI</div>
          <div>
            <div className="serif" style={{ fontSize: 18, lineHeight: 1.2 }}>{TEXTS.appName}</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2 }}>{TEXTS.appTagline}</div>
          </div>
        </div>
        <button onClick={() => go("admin")} style={{
          display: "flex", alignItems: "center", gap: 5, background: "var(--paper-white)",
          border: "1px solid var(--line)", borderRadius: 999, padding: "7px 12px", fontSize: 11.5,
          fontWeight: 600, color: "var(--ink-soft)", cursor: "pointer", fontFamily: "inherit",
        }}>
          <Settings size={13} /> {TEXTS.adminButton}
        </button>
      </div>

      <div style={{ padding: "16px 18px 0" }}>
        <div
          onClick={() => openCategory("cat01")}
          style={{
            background: "linear-gradient(135deg, #6C4CF0, #4C6FFF)", borderRadius: 20, padding: "20px 20px 22px",
            position: "relative", overflow: "hidden", cursor: "pointer",
          }}
        >
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{TEXTS.homeBannerLabel}</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: "#fff", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
            {TEXTS.homeBannerTitle} <Zap size={17} color="#FFD65C" fill="#FFD65C" />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            {[TEXTS.homePerkLogoFree, TEXTS.homePerkBackgroundFree].map((label) => (
              <div key={label} style={{
                background: "rgba(15,15,40,0.35)", borderRadius: 10, padding: "9px 14px",
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <Gift size={14} color="#FFD65C" />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{label}</span>
              </div>
            ))}
          </div>
          <button style={{
            marginTop: 16, background: "#fff", color: "var(--stamp)", border: "none", borderRadius: 999,
            padding: "9px 16px", fontSize: 12.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, cursor: "pointer", fontFamily: "inherit",
          }}>
            {TEXTS.homeBannerCta} <ArrowLeft size={13} style={{ transform: "rotate(180deg)" }} />
          </button>
          <div style={{ position: "absolute", right: -6, top: 18, width: 96, height: 72 }}>
            <div style={{ position: "absolute", right: 4, top: 16, width: 84, height: 52, borderRadius: 10, background: "#22346B", transform: "rotate(-8deg)" }} />
            <div style={{
              position: "absolute", right: 12, top: 0, width: 84, height: 52, borderRadius: 10, background: "#fff",
              transform: "rotate(-8deg)", boxShadow: "0 8px 16px rgba(20,15,60,0.28)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#3B2FBF" }}>AI STUDIO</div>
              <div style={{ fontSize: 6, color: "#9C99B5", marginTop: 1 }}>Business Card Design</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "14px 18px 0" }}>
        <Card onClick={() => go("lookup")} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "#EDEAFD", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <PackageSearch size={16} color="#6C4CF0" />
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 700 }}>{TEXTS.lookupCardTitle}</div>
          <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 2, lineHeight: 1.4, whiteSpace: "pre-line" }}>{TEXTS.lookupCardDesc}</div>
        </Card>
        <Card
          onClick={() => go(order.authed ? "lookup" : "auth")}
          style={{ background: order.authed ? "var(--paper-white)" : "#FEF6E0", border: "none", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <div style={{ width: 32, height: 32, borderRadius: 10, background: order.authed ? "#EDEAFD" : "#FDECC0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            {order.authed ? <UserCircle2 size={16} color="#6C4CF0" /> : <Gift size={16} color="#DB9E1E" />}
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 700 }}>{order.authed ? TEXTS.memberWelcome(order.name) : TEXTS.memberCardTitleGuest}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
            <div style={{ fontSize: 10.5, color: "var(--ink-soft)" }}>{order.authed ? (order.memberType === "special" ? TEXTS.memberTypeSpecial : TEXTS.memberTypeGeneral) : TEXTS.guestSignupHint}</div>
            {!order.authed && (
              <span style={{ background: "#FFCE3D", color: "#5C3E00", fontSize: 10.5, fontWeight: 700, padding: "4px 9px", borderRadius: 999 }}>{TEXTS.loginBadge}</span>
            )}
          </div>
        </Card>
      </div>

      <div style={{ padding: "22px 18px 6px" }}>
        <div style={{ fontSize: 15, fontWeight: 800 }}>{TEXTS.categorySectionTitle}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "8px 18px 20px" }}>
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.code} onClick={() => openCategory(c.code)}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <Icon size={16} color={c.iconFg} />
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4 }}>{c.tagline}</div>
            </Card>
          );
        })}
      </div>

      <BottomNav active="home" order={order} go={go} />
    </div>
  );
}

function BottomNav({ active, order, go }) {
  const items = [
    { k: "home", label: TEXTS.navHome, icon: HomeIcon, onClick: () => go("home") },
    { k: "lookup", label: TEXTS.navHistory, icon: Package, onClick: () => go("lookup") },
    { k: "auth", label: order.authed ? TEXTS.navMy : TEXTS.navLogin, icon: User, onClick: () => go(order.authed ? "lookup" : "auth") },
  ];
  return (
    <div style={{
      position: "sticky", bottom: 0, background: "var(--paper-white)", borderTop: "1px solid var(--line)",
      display: "flex", padding: "10px 6px 12px",
    }}>
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = it.k === active;
        return (
          <button key={it.k} onClick={it.onClick} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
            color: isActive ? "var(--stamp)" : "var(--ink-soft)",
          }}>
            <Icon size={19} />
            <span style={{ fontSize: 10.5, fontWeight: 600 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function OrderLookup({ order, patch, go }) {
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState(null); // 조회된 실제 주문 기록 (없으면 null)
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!phone.trim()) return;
    setSearching(true);
    setSearched(false);
    try {
      // 2026-08-04: 실제 서버(Render+Supabase)로 옮겼습니다 — 이전엔 window.storage라
      // 이 계정으로 테스트하는 동안만 보이던 것이, 이제 실제 데이터베이스 조회입니다.
      // ⚠️ 아직 남은 한계: 인쇄파일(SVG)·특별회원 업로드 파일은 서버에 저장되지
      // 않아서(다음 단계), design_recipe가 있는 주문만 "재주문"이 가능합니다.
      setFound(await lookupOrdersByPhone(phone.trim()));
    } catch {
      setFound(null);
    } finally {
      setSearching(false);
      setSearched(true);
    }
  };

  return (
    <div className="app-body">
      <TopBar title={TEXTS.lookupTitle} onBack={() => go("home")} />
      <div style={{ padding: "6px 18px 16px" }}>
        <Field label={TEXTS.lookupFieldLabel}>
          <div style={{ display: "flex", gap: 8 }}>
            <input style={{ ...inputStyle, flex: 1 }} placeholder={TEXTS.phonePlaceholder} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button onClick={handleSearch} disabled={searching} style={{ ...stepperBtn, width: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Search size={16} />
            </button>
          </div>
        </Field>

        {searched && !found && (
          <Card><div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{TEXTS.lookupNotFound}</div></Card>
        )}
        {searched && found && (
          <Card>
            <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>{TEXTS.lookupRecentOrder}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{found.categoryName || TEXTS.lookupOrderItem}</div>
                <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>{found.name}님 · {found.memberType === "special" ? TEXTS.memberTypeSpecial : TEXTS.memberTypeGeneral}</div>
                <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 2 }}>{TEXTS.orderNoLabel}: {found.orderNo}</div>
              </div>
              <Badge label={TEXTS.lookupPrintingBadge} tone="purple" />
            </div>
            {(found.printFileSvg || found.specialOrderFile || found.designRecipe) && (
              <button
                onClick={() => {
                  // 재주문 = 다시 디자인하는 게 아니라, 저장해둔 그 인쇄파일을 그대로
                  // 다시 결제로 넘기는 것입니다 — 디자인 화면을 아예 건너뜁니다.
                  patch({
                    printFileSvg: found.printFileSvg || null,
                    printFileName: `reorder-${found.orderNo}.svg`,
                    specialOrderFile: found.specialOrderFile || null,
                    designRecipe: found.designRecipe || null,
                    memberType: found.memberType,
                  });
                  go("shipping");
                }}
                style={{
                  width: "100%", marginTop: 12, background: "var(--stamp)", border: "none", color: "#fff",
                  borderRadius: 10, fontSize: 13, fontWeight: 700, padding: "11px 0", cursor: "pointer", fontFamily: "inherit",
                }}
              >
                {TEXTS.reorderNowBtn}
              </button>
            )}
            <button
              onClick={() => go("inquiry")}
              style={{
                width: "100%", marginTop: 8, background: "var(--paper-deep)", border: "none", color: "var(--stamp)",
                borderRadius: 10, fontSize: 12.5, fontWeight: 700, padding: "10px 0", cursor: "pointer", fontFamily: "inherit",
              }}
            >
              {TEXTS.inquiryBtn}
            </button>
          </Card>
        )}
      </div>
      <div style={{ marginTop: "auto" }}>
        <BottomNav active="lookup" order={order} go={go} />
      </div>
    </div>
  );
}

// ==================== screens/Shipping ====================
function ConfirmDialog({ title, message, cancelLabel, confirmLabel, onCancel, onConfirm }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(15,15,30,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20,
    }}>
      <div style={{
        background: "var(--paper-white)", borderRadius: 16, padding: "22px 20px", maxWidth: 320, width: "100%",
        boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
      }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 18, whiteSpace: "pre-line" }}>{message}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: "11px 0", borderRadius: 10, border: "1.5px solid var(--line)",
            background: "var(--paper-white)", color: "var(--ink)", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>{cancelLabel}</button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
            background: "var(--stamp)", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function Shipping({ order, patch, go, back, freeShip }) {
  const s = order.ship;
  const setShip = (p) => patch({ ship: { ...s, ...p } });
  const canNext = s.name && s.addr && s.phone;
  const [confirmStep, setConfirmStep] = useState(0); // 0=없음, 1=1차 경고, 2=2차(AI 요금) 경고
  return (
    <div className="app-body">
      <TopBar title={TEXTS.shippingTitle} onBack={() => setConfirmStep(1)} step={5} go={go} />
      <div style={{ padding: "6px 18px 16px" }}>
        <Field label={TEXTS.shippingNameLabel}><input style={inputStyle} value={s.name} onChange={(e) => setShip({ name: e.target.value })} placeholder={TEXTS.namePlaceholder} /></Field>
        <Field label={TEXTS.shippingAddrLabel}><input style={inputStyle} value={s.addr} onChange={(e) => setShip({ addr: e.target.value })} placeholder={TEXTS.shippingAddrPlaceholder} /></Field>
        <Field label={TEXTS.shippingPhoneLabel}><input style={inputStyle} value={s.phone} onChange={(e) => setShip({ phone: e.target.value })} placeholder={TEXTS.phonePlaceholder} /></Field>
        <Card style={{ background: "var(--paper-deep)", border: "none" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <Truck size={16} color="var(--ink-soft)" style={{ marginTop: 1, flexShrink: 0 }} />
            <div style={{ fontSize: 11.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              {TEXTS.shippingNote}
              {order.memberType === "general" && (
                <div style={{ marginTop: 6 }}><Stamp active={freeShip} tone={freeShip ? "gold" : "stamp"}>{freeShip ? TEXTS.shipFreeApplied : TEXTS.shipFeeApplied}</Stamp></div>
              )}
            </div>
          </div>
        </Card>
      </div>
      <div style={{ padding: "8px 18px 18px" }}>
        <PrimaryButton disabled={!canNext} onClick={() => go("payment")}>{TEXTS.nextPayment}</PrimaryButton>
        {!canNext && (
          <div style={{ fontSize: 11, color: "var(--ink-soft)", textAlign: "center", marginTop: 8 }}>
            {TEXTS.missingFieldsHint}
            {[!s.name && TEXTS.shippingNameLabel, !s.addr && TEXTS.shippingAddrLabel, !s.phone && TEXTS.shippingPhoneLabel].filter(Boolean).join(", ")}
          </div>
        )}
      </div>

      {confirmStep === 1 && (
        <ConfirmDialog
          title={TEXTS.backResetWarnTitle}
          message={TEXTS.backResetWarnMessage}
          cancelLabel={TEXTS.backResetCancel}
          confirmLabel={TEXTS.backResetConfirm}
          onCancel={() => setConfirmStep(0)}
          onConfirm={() => setConfirmStep(2)}
        />
      )}
      {confirmStep === 2 && (
        <ConfirmDialog
          title={TEXTS.backResetAiFeeWarnTitle}
          message={TEXTS.backResetAiFeeWarnMessage}
          cancelLabel={TEXTS.backResetCancel}
          confirmLabel={TEXTS.backResetConfirm}
          onCancel={() => setConfirmStep(0)}
          onConfirm={() => { setConfirmStep(0); back(); }}
        />
      )}
    </div>
  );
}

// ==================== domain/company/logoExtraction ====================
// ====================================================================
// Domain : Company / Logo Extraction
// Responsibility : 명함·안내문·간판 사진 등 "로고가 일부만 포함된 사진"에서
//                  로고 영역만 잘라내기.
//
// 설계 방향(중요): 배경까지 완전히 투명하게 지우는 이미지 분할(segmentation)이
// 아니라, "이 사진에서 로고가 대략 어디 있는지" 위치만 비전 모델에게 물어보고,
// 그 사각형 영역만 Canvas로 자릅니다. 전용 컴퓨터 비전 엔진을 직접 만드는 것보다
// 훨씬 간단하고, 이미 있는 비전 API(여기서는 Claude API의 이미지 입력)로 충분합니다.
// 배경이 완전히 투명하지 않고 사각형으로만 잘리는 것은 의도된 한계입니다 —
// 필요성이 실제로 확인되면 그때 배경 제거를 별도로 추가합니다.
// ====================================================================

// 프롬프트를 한 곳에 모아둔 객체 — recommendationEngine.js와 같은 패턴입니다.
// 아직 이거 하나뿐이라 별도 폴더(prompt/)로는 나누지 않았습니다.
const LOGO_EXTRACTION_PROMPTS = {
  extractLogo: `이 사진 안에 회사 로고가 보이면, 그 로고를 감싸는 사각형 영역을
이미지 전체 크기에 대한 백분율(0~100)로 알려줘. 다른 설명 없이 아래 JSON 형식으로만 답변해:
{"found": true, "x": 왼쪽 끝 %, "y": 위쪽 끝 %, "width": 너비 %, "height": 높이 %}
로고를 찾지 못하면 {"found": false} 로만 답변해.`,
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]); // "data:...;base64," 접두어 제거
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 사진 안에서 로고가 있는 대략의 위치를 비전 모델에게 물어봅니다.
// 반환값은 이미지 크기에 대한 상대 좌표(0~100, %)입니다 — 픽셀 좌표를 바로 받으면
// 모델이 실제 표시 크기를 몰라 부정확해지기 쉬워서, 항상 %로 답하게 합니다.
async function detectLogoRegion(file) {
  const base64 = await fileToBase64(file);
  const prompt = LOGO_EXTRACTION_PROMPTS.extractLogo;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: file.type || "image/jpeg", data: base64 } },
          { type: "text", text: prompt },
        ],
      }],
    }),
  });
  if (!response.ok) throw new Error(`로고 위치 감지 실패 (${response.status})`);
  const data = await response.json();
  const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
  const cleaned = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);
  if (!parsed.found) return null;

  // 값 방어: 모델이 범위를 벗어난 값을 줄 수 있으니 0~100 사이로 잘라줍니다.
  const clamp = (v) => Math.max(0, Math.min(100, Number(v) || 0));
  return { x: clamp(parsed.x), y: clamp(parsed.y), width: clamp(parsed.width), height: clamp(parsed.height) };
}

// 원본 이미지에서 region(%) 영역만 Canvas로 잘라 새 이미지(Blob)를 만듭니다.
function cropImageToRegion(file, region) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      try {
        const sx = (region.x / 100) * img.naturalWidth;
        const sy = (region.y / 100) * img.naturalHeight;
        const sw = (region.width / 100) * img.naturalWidth;
        const sh = (region.height / 100) * img.naturalHeight;
        const canvas = document.createElement("canvas");
        canvas.width = sw;
        canvas.height = sh;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("자르기 실패"))), "image/png");
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(err);
      }
    };
    img.onerror = () => reject(new Error("이미지 로드 실패"));
    img.src = url;
  });
}

// 잘라낸 로고가 너무 작으면(사진을 멀리서 찍은 경우 등) 명함에 쓰기엔 화질이
// 부족할 수 있습니다. 정교한 블러 감지 대신, 가장 흔한 문제(해상도 부족)만 우선 확인합니다.
const MIN_LOGO_DIMENSION = 200; // px — 이보다 작으면 명함 인쇄에 부적합할 가능성이 큼

function checkImageQuality(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const ok = img.naturalWidth >= MIN_LOGO_DIMENSION && img.naturalHeight >= MIN_LOGO_DIMENSION;
      resolve({ ok, width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ ok: false, width: 0, height: 0 });
    };
    img.src = url;
  });
}

// 전체 과정을 하나로 묶은 진입점. 로고를 못 찾으면 null을 반환합니다 —
// 이 경우 호출한 쪽에서 "직접 잘라서 다시 올려주세요" 같은 안내로 이어가면 됩니다.
async function extractLogoFromPhoto(file) {
  const region = await detectLogoRegion(file);
  if (!region) return null;
  const blob = await cropImageToRegion(file, region);
  return new File([blob], `logo_${Date.now()}.png`, { type: "image/png" });
}

// ==================== domain/recommendation/index ====================
// Recommendation Domain — "AI가 어떻게 생각하는가". 재료(Asset)와 규칙(Kernel)을
// 조합해서 실제로 무엇을 추천할지 계산합니다. CP-002(제안): AI는 추천할 뿐 결정하지
// 않는다 — 이 도메인의 결과는 항상 사용자가 수정할 수 있는 "제안"입니다.
//
// Recommendation Domain Roadmap ("실제 책임이 생길 때 분리한다" 원칙)
//   Phase 1 [x] industryDetector.js      — 회사명 → 업종 추정 (지금 여기)
//   Phase 1 [x] recommendationCatalog.js — 추천 후보 목록
//   Phase 1 [x] recommendationEngine.js  — 실제 추천 계산(AI 호출 + 캐시)
//   Phase 2 [ ] recommendationRules.js   — "업종 X면 색상 Y" 같은 명시적 규칙표가 필요해지면
//   Phase 3 [ ] recommendationScore.js   — 여러 후보를 동시에 점수 매겨 비교해야 할 때,
//                                          또는 STEP 7 Learning이 붙어 통계 기반 점수가 생길 때

// ==================== domain/validation/index ====================
// Validation Domain — Kernel이 "정의"한 규칙을 실제로 "판정"하는 곳.
// (AI → Recommendation → Frame → Asset → Validation → Renderer)
//
// cpValidator / marginValidator / qrValidator는 기존에 Kernel에 있던 판정
// 로직을 역할에 맞게 옮겨온 것이고, overlapValidator만 이번에 새로 만들었습니다
// — "실제 책임이 생길 때 분리한다" 원칙대로, 없던 검사를 미리 만들지 않았습니다.

// ==================== domain/asset/moodIntensity ====================
// [Asset Domain: Catalog] ── Mood Intensity Table v1.0 ─────
// "업종별로 배경의 존재감(강도)을 다르게 준다"는 원칙을 담은 표입니다.
//
// 정직하게 밝히는 것: 이 숫자들(10, 30, 35...)은 실제 명함 데이터를 분석해서 나온
// 통계가 아닙니다 — 사장님이 업종별로 판단한 디자인 기준값입니다. DRS의 안전마진
// (3mm)이나 최소 폰트 크기와 같은 종류입니다: 사람이 정한 설계값이지 측정값이
// 아닙니다. 나중에 Learning Domain이 실사용 데이터를 충분히 모으면, 이 값들을
// 실제 데이터 기반 값으로 검증하거나 대체할 수 있습니다 — 그 전까지는 이게
// "합리적인 기본값" 역할을 합니다.
//
// intensity는 0~100 사이 값으로, "배경 이미지가 카드에서 얼마나 존재감 있게
// 보여야 하는가"를 뜻합니다. 낮을수록 거의 흰 배경에 가깝고(신뢰감 우선),
// 높을수록 배경이 분위기를 적극적으로 표현합니다(개성·정서 우선).
//
// industryDetector.js가 실제로 인식하는 9개 업종(INDUSTRY_KEYWORDS)에 맞춰
// 만들었습니다 — "음식점", "꽃집"처럼 아직 인식 목록에 없는 업종은 넣지 않았습니다
// (실제로 감지도 안 되는 업종에 값만 미리 만들어두는 건 "없는 걸 있는 것처럼"
// 다루는 것과 비슷한 문제라서요). industryDetector.js에 새 업종이 추가되면 이
// 표에도 같이 추가해야 합니다 — frameCodes.js의 INDUSTRY_PREFIXES와 같은 원칙.
const MOOD_INTENSITY_BY_INDUSTRY = {
  "보험": 10,
  "의료": 10,
  "법률": 8,
  "부동산": 15,
  "교육": 15,
  "카페": 30,
  "베이커리": 25,
  "미용업": 35,
  "스튜디오": 30,
};
const MOOD_INTENSITY_DEFAULT = 15; // 업종 미감지 시 — 부동산/교육과 같은 중간값으로 보수적으로 시작

function getMoodIntensity(industry) {
  return MOOD_INTENSITY_BY_INDUSTRY[industry] ?? MOOD_INTENSITY_DEFAULT;
}

// ==================== domain/generative/backgroundEngine ====================
// ====================================================================
// Domain : Generative / Background Engine
// Version : 0.1 (뼈대만 — 실제 이미지 생성 API 없이는 완성될 수 없음)
// Responsibility : 업종·스타일 태그·색상·분위기 강도를 받아 배경 이미지 생성
//                  프롬프트를 조립하고, 결과를 업종 단위로 캐싱합니다.
// 2026-08-04: 캐시 저장을 shared:true → shared:false로 바꿨습니다 — 이 캐시는 다른
// 사용자와 공유될 이유가 딱히 없었고(업종별 캐시라 공유되면 오히려 다른 회사
// 결과가 섞여 보일 수 있었음), Claude 아티팩트의 "공유 데이터 접근" 권한 팝업이
// 뜨는 원인 중 하나였습니다. 개인 저장(shared:false)으로도 캐싱 목적은 그대로
// 달성되고, 팝업도 안 뜹니다.
//
// 정직하게 밝히는 한계: callImageGenerationApi()는 실제로 이미지를 생성하지
// 않습니다. 이 프로젝트에는 텍스트 완성(getStyleSuggestion)과 비전 분석
// (extractLogoFromPhoto) API 호출은 있지만, 이미지를 생성하는 API 호출은
// 아직 하나도 없습니다 — Claude API 자체가 이미지를 생성하지 않고, DALL-E나
// Stable Diffusion, Imagen 같은 별도 서비스와 API 키가 필요합니다. 그 키는
// 사장님이 해당 서비스에 가입해서 직접 발급받아야 하는 값이라 여기서 대신
// 채워둘 수 없습니다. 아래 함수는 그 키가 준비됐을 때 내부 구현만 바꾸면
// 나머지(프롬프트 조립·캐싱·호출 시점)는 전부 그대로 쓸 수 있도록 만든
// 자리입니다 — 지금 호출하면 항상 { available: false }를 반환합니다.
// ====================================================================

// 업종+태그+색상 → 실제 이미지 생성 서비스에 보낼 프롬프트 문자열.
// intensity(강도)는 숫자를 그대로 프롬프트에 노출하기보다("15% 존재감을 그려줘"는
// 이미지 생성 모델이 이해하기 어려운 지시라서), "은은하게/적당히/뚜렷하게" 같은
// 정성적 표현으로 변환해서 넣습니다.
function intensityToDescriptor(intensity) {
  if (intensity <= 12) return "매우 은은하고 거의 안 보일 정도로 절제된";
  if (intensity <= 22) return "은은한";
  if (intensity <= 32) return "적당히 느껴지는";
  return "뚜렷하고 분위기가 살아있는";
}

function buildBackgroundPrompt(industry, styleTags = [], colorLabel = null) {
  const intensity = getMoodIntensity(industry);
  const descriptor = intensityToDescriptor(intensity);
  const tagsPart = styleTags.length ? styleTags.join(", ") : "전문적이고 신뢰감 있는";
  const colorPart = colorLabel ? `주요 색상은 ${colorLabel} 계열로,` : "";
  return `명함 배경 이미지를 만들어줘. 업종은 "${industry || "일반"}"이고, ${colorPart} ${descriptor} 정도의 텍스처/일러스트를 써줘.
분위기 키워드: ${tagsPart}.
중요: 텍스트를 얹을 자리이므로 중앙과 하단 영역은 비교적 단순하게 비워두고, 명함 규격(90x50mm, 가로형)에 맞는 여백 있는 구성으로 만들어줘.
장식이 과하지 않게, "특이하다"보다 "깔끔하고 전문적이다"는 인상을 우선해줘.`;
}

// 실제 이미지 생성 API 호출 자리. 지금은 항상 이용 불가로 답합니다 — 가짜 이미지나
// 플레이스홀더 URL을 만들어 반환하지 않습니다(그렇게 하면 "작동하는 것처럼" 보이는
// 화면을 만들게 되어, 오늘 계속 경계해온 "없는 걸 있는 것처럼" 문제가 됩니다).
async function callImageGenerationApi(/* prompt, count */) {
  return { available: false, images: [] };
}

// 업종+스타일 태그+색상 조합 단위로 캐싱합니다 — getStyleSuggestion과 같은 패턴
// (같은 조합이면 여러 사용자가 재사용, API 호출·비용을 아낌). 캐시 키에 회사명이나
// 개인정보는 포함하지 않습니다.
async function generateBackgroundOptions(industry, styleTags = [], colorId = null) {
  const cacheKey = `bg:${industry || "GEN"}:${[...styleTags].sort().join(",")}:${colorId || "any"}`;
  try {
    const cached = await window.storage.get(cacheKey, false);
    if (cached?.value) return JSON.parse(cached.value);
  } catch {
    // 캐시에 없으면 아래에서 생성 시도로 이어짐
  }

  const prompt = buildBackgroundPrompt(industry, styleTags, colorId);
  const result = await callImageGenerationApi(prompt, 4);
  const response = { ...result, prompt, industry };

  if (result.available) {
    try {
      await window.storage.set(cacheKey, JSON.stringify(response), false);
    } catch {
      // 저장 실패해도 이번 결과는 그대로 반환
    }
  }
  return response;
}

// ==================== renderer/CardLayoutPreview ====================
// 2026-08-01: "포토샵처럼 줄이 맞는지 비교해달라"는 요청으로 추가한 정렬 가이드용
// 상수. 드래그 중인 요소가 다른 요소와 같은 정렬 방식(왼쪽-왼쪽/오른쪽-오른쪽/
// 가운데-가운데, 위-위/아래-아래/중앙-중앙)으로 이 값(%) 이내로 가까워지면 빨간
// 점선 가이드가 뜨고, 그 좌표로 살짝 자석처럼 붙습니다(스냅).
const GUIDE_SNAP_THRESHOLD_PCT = 1.4;
const GUIDE_LINE_COLOR = "#F5365C";

function CardLayoutPreview({ templateName, photoVariant, photoFile, showLogo = true, fields, compact, cardSize = CARD_SIZE_DEFAULT, qrEnabled = false, qrUrl = "", nameEnglish = "", showContactIcon = true, backgroundStyle = "white", logoColor = null, logoFile = null, patternSelections = null, fontFamilyId = null, interactiveKind = null, onDragKindMove = null, onSelectKind = null, orientation = null }) {
  // patternSelections가 있으면(=사용자가 위치조정 화면에서 패턴을 직접 골랐으면) 그
  // 조합으로 실시간 계산하고, 없으면 템플릿의 기본 배치(getLayoutFor)를 그대로 씁니다.
  // 사진형도 이제 company/person/logo/연락처 항목들은 Pattern Library를 씁니다 — 다만
  // 사진 자리(rect)는 patternLibrary가 다루지 않는 유일한 부분이라 따로 병합합니다.
  const photoRect = templateName === "사진형" ? (PHOTO_RECT_BY_VARIANT[photoVariant] || PHOTO_RECT_BY_VARIANT[PHOTO_TEMPLATES[0]]) : {};
  const layout = patternSelections
    ? { ...photoRect, ...buildLayoutFromPatterns(patternSelections, { overlay: templateName === "사진형" && !!PHOTO_TEMPLATE_PATTERN_SELECTIONS[photoVariant]?.overlay }) }
    : getLayoutFor(templateName, photoVariant);
  // 2026-08-02: "사진형도 위치·크기를 옮길 수 있게 해달라"는 요청 반영 — 로고/텍스트와
  // 같은 방식(mm 오프셋 누적 + 배율)으로 patternSelections에 저장해두고, 실제 그리는
  // rect(%)는 매 렌더마다 기본값 + 이 값을 합쳐서 계산합니다.
  const photoOffsetMm = patternSelections?.photoFineOffsetMm || { x: 0, y: 0 };
  const photoScale = patternSelections?.photoScale || 1;
  const mode = compact ? "compact" : "full";
  // 2026-08-01: 이제 가로형/세로형을 사용자가 직접 고를 수 있어서(카드 모양 토글),
  // 그 값(orientation prop)이 있으면 그대로 쓰고, 없을 때만(옛 호출부·아직 안 옮긴
  // 곳) 사진 상단형/하단형 여부로 자동 추정하던 기존 방식으로 대체합니다.
  const spec = getCardSpec(cardSize, orientation || (isPortraitPhotoVariant(templateName, photoVariant) ? "portrait" : "landscape"));
  const effectivePhotoRect = layout.photo ? computeEffectivePhotoRect(layout.photo.rect, photoOffsetMm, photoScale, spec.trimWidth, spec.trimHeight) : null;
  const safeXPct = (spec.safeMargin / spec.trimWidth) * 100;
  const safeYPct = (spec.safeMargin / spec.trimHeight) * 100;
  const bgOption = BACKGROUND_STYLE_OPTIONS.find((b) => b.id === backgroundStyle);
  const bgCss = bgOption?.css || "var(--paper-white)";
  // 사진이 카드를 덮는 경우(overlay, 사진 배경형)뿐 아니라 짙은 배경색(gradient 등)을
  // 골랐을 때도 흰 텍스트가 필요합니다 — 예전엔 overlay만 봐서, 짙은 배경을 고르면
  // 어두운 글자가 거의 안 보이는 문제가 있었습니다.
  const needsLightText = bgOption?.dark === true;
  // fontFamilyId는 문자열(전체 공통 서체) 또는 { company, person, default } 객체(요소별
  // 서체) 둘 다 받습니다 — "상호 서체를 따로", "이름·직위 서체도 따로" 요청 반영.
  // 문자열로 넘어오면(예전 호출 방식) 전부 같은 서체를 씁니다.
  const fontForKind = (kind) => {
    const lookupKind = kind === "position" ? "personName" : kind; // 직위는 이름 서체 선택을 같이 씁니다(선택 UI가 하나뿐이라서)
    const id = typeof fontFamilyId === "string" ? fontFamilyId : (fontFamilyId?.[lookupKind] || fontFamilyId?.default);
    return resolveFontFamily(id);
  };

  const photoUrl = React.useMemo(() => (photoFile ? URL.createObjectURL(photoFile) : null), [photoFile]);
  React.useEffect(() => () => { if (photoUrl) URL.revokeObjectURL(photoUrl); }, [photoUrl]);

  // CP-003: 업로드한 로고는 AI가 재창작하지 않고 그대로(원본 비율 유지) 보여줍니다 — 색상 박스로 대체하지 않음.
  const logoUrl = React.useMemo(() => (logoFile?.type?.startsWith("image/") ? URL.createObjectURL(logoFile) : null), [logoFile]);
  React.useEffect(() => () => { if (logoUrl) URL.revokeObjectURL(logoUrl); }, [logoUrl]);

  // 연락처 관련 필드를 "contact"라는 한 덩어리로 뭉쳐 그리던 걸 그만두고, 각각을
  // 독립된 요소로 다룹니다 — "핸드폰번호도 개별적으로 위치·크기를 바꿀 수 있으면
  // 좋겠다"는 요청 반영. telephoneFax는 전화번호+팩스번호를 한 줄에 같이 보여달라는
  // 요청을 반영한 합성 필드입니다. 값이 없는 항목은 null을 돌려주고, 그 요소는
  // 아예 그리지 않습니다(렌더 루프에서 스킵).
  const textFor = (key) => {
    if (key === "company") return fields?.["companyName"] || TEXTS.fallbackCompanyName;
    // "person"(직위·이름 묶음)을 독립 요소 두 개로 나눴습니다 — 크기를 따로
    // 조절 못 해서 "직위가 이름보다 작아야 하는데 같이 커진다"는 문제가 있었습니다.
    if (key === "position") return fields?.["position"] || TEXTS.fallbackPosition;
    if (key === "personName") {
      const base = fields?.["personName"] || TEXTS.fallbackPersonName;
      return nameEnglish?.trim() ? `${base} (${nameEnglish.trim()})` : base;
    }
    if (key === "mobile") return fields?.mobile?.trim() || null;
    if (key === "telephoneFax") {
      const tel = fields?.telephone?.trim();
      const fax = fields?.fax?.trim();
      if (tel && fax) return `${tel} · Fax ${fax}`;
      if (tel) return tel;
      if (fax) return `Fax ${fax}`;
      return null;
    }
    if (key === "address") return fields?.address?.trim() || null;
    if (key === "email") return fields?.email?.trim() || null;
    if (key === "website") return fields?.website?.trim() || null;
    if (key === "etc") return fields?.etc?.trim() || null;
    return "";
  };
  const CONTACT_SUB_KINDS = ["mobile", "telephoneFax", "address", "email", "website", "etc"];
  const anyContactFilled = CONTACT_SUB_KINDS.some((k) => layout[k] && textFor(k));
  const FIELD_ICON = { mobile: Phone, telephoneFax: Phone, address: MapPin, email: Mail, website: Globe };
  const defaultEmphasis = { company: "lg", position: "sm", personName: "md" };

  // 2026-08-01: "위치조정은 버튼 대신 미리보기에서 손가락/마우스로 직접 옮기게 해달라"는
  // 요청으로 드래그 기능을 추가했습니다. safeAreaRef는 안전영역 박스(children의 left/top
  // %가 이 박스 기준)를 가리키고, dragRef는 드래그 중인 요소와 마지막 포인터 좌표를
  // 들고 있습니다(리렌더와 무관하게 유지해야 해서 state가 아니라 ref). 이동량은 매
  // pointermove마다 "직전 위치 대비 델타"를 mm로 환산해 onDragKindMove로 부모에
  // 넘기고, 부모가 patternSelections의 FineOffsetMm에 누적합니다 — 그 값은 항상
  // Kernel(designRules.js)의 clampToAllowedRegion을 다시 거치므로, 아무리 세게
  // 끌어도 안전영역·재단선을 벗어난 값이 될 수 없습니다.
  // 2026-08-01(추가): "순서대로 안내하는 것도 좋지만, 중간에 마음이 바뀌면 아무
  // 요소나 눌러서 바로 옮길 수 있어야 한다"는 요청 반영. 이제 onPointerDown이 눌린
  // 요소를 즉시 선택(onSelectKind)하고 같은 제스처로 바로 드래그를 시작합니다 —
  // "이전"을 여러 번 눌러야 원하는 항목으로 돌아갈 수 있던 불편을 없앴습니다.
  // interactiveKind는 여전히 "지금 안내 문구가 가리키는 항목"이자 강조 표시 대상이고,
  // 안내 순서(이전/다음)는 그대로 같이 쓸 수 있습니다.
  const safeAreaRef = React.useRef(null);
  // 2026-08-07: 사진(photo)의 좌표는 텍스트/로고와 달리 안전영역이 아니라 "재단선
  // 전체 캔버스" 기준입니다(사진은 카드 가장자리까지 닿을 수 있어야 하니까요) —
  // 아래 드래그 계산에서 이 ref를 따로 씁니다.
  const canvasRef = React.useRef(null);
  const dragRef = React.useRef(null);
  // 2026-08-01: 정렬 가이드/스냅 계산용 — 매 렌더마다 모든 요소의 최신 좌표를
  // 여기 캐시해둡니다(아래 렌더 부분 참고). pointermove 핸들러에서 "직전 렌더의
  // 다른 요소 좌표"와 비교해 자석처럼 붙일지 판단합니다. ref라서 리렌더를
  // 일으키지 않고, 이벤트 핸들러 안에서 최신 값을 즉시 읽을 수 있습니다.
  const elementGeomsRef = React.useRef([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const handleDragPointerDown = (e, key) => {
    if (!onDragKindMove) return;
    e.preventDefault();
    onSelectKind?.(key);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    // 2026-08-07(버그 수정): "사진을 손가락으로 옮기려 해도 안 움직인다"는 신고 반영.
    // 사진은 elementGeomsRef(텍스트/로고 전용 캐시)에 없어서, 시작 좌표가 항상
    // 하드코딩된 50(카드 중앙)으로 잘못 잡히고 있었습니다 — 실제 사진 위치와
    // 다르면 드래그 계산 전체가 어긋납니다. 사진일 땐 effectivePhotoRect(지금 실제
    // 위치)에서 시작 좌표를 가져오도록 고쳤습니다.
    let rawX = 50, rawY = 50;
    if (key === "photo" && effectivePhotoRect) {
      rawX = effectivePhotoRect.left;
      rawY = effectivePhotoRect.top;
    } else {
      const geom = elementGeomsRef.current.find((g) => g.key === key);
      if (geom) { rawX = geom.x; rawY = geom.y; }
    }
    dragRef.current = { key, x: e.clientX, y: e.clientY, rawX, rawY };
    setIsDragging(true);
  };
  const handleDragPointerMove = (e, key) => {
    const st = dragRef.current;
    if (!st || st.key !== key) return;
    // 2026-08-07(버그 수정): 사진은 텍스트/로고와 다른 좌표계(안전영역이 아니라
    // 재단선 전체 캔버스)를 쓰므로, 픽셀↔퍼센트 변환 기준(rect)과 mm 환산 기준
    // (가로세로 mm)도 사진일 땐 따로 써야 합니다. 예전엔 항상 안전영역 기준으로만
    // 계산해서, 사진을 끌어도 실제 손가락 이동량과 계산이 어긋나 "안 움직이는
    // 것처럼" 보였습니다.
    const isPhoto = key === "photo";
    const refEl = isPhoto ? canvasRef.current : safeAreaRef.current;
    const rect = refEl?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return;
    const dxPercent = ((e.clientX - st.x) / rect.width) * 100;
    const dyPercent = ((e.clientY - st.y) / rect.height) * 100;
    st.x = e.clientX; st.y = e.clientY;
    // 스냅과 무관하게, 마우스가 실제로 움직인 만큼 그대로 누적합니다.
    st.rawX += dxPercent;
    st.rawY += dyPercent;

    const widthMm = isPhoto ? spec.trimWidth : (spec.trimWidth - spec.safeMargin * 2);
    const heightMm = isPhoto ? spec.trimHeight : (spec.trimHeight - spec.safeMargin * 2);

    let targetX = st.rawX;
    let targetY = st.rawY;
    let displayedX = st.rawX;
    let displayedY = st.rawY;

    if (isPhoto) {
      // 사진은 다른 사진이 없어서 정렬 스냅 대상이 아닙니다 — 마우스가 움직인 만큼
      // 그대로, 지금 실제 위치(effectivePhotoRect)를 기준으로 이동합니다.
      if (effectivePhotoRect) {
        displayedX = effectivePhotoRect.left;
        displayedY = effectivePhotoRect.top;
      }
    } else {
      // 2026-08-01: "포토샵처럼 줄이 맞는지 비교해달라"는 요청으로 추가한 정렬 스냅.
      // 직전 렌더에서 캐시해둔 다른 요소들의 좌표(elementGeomsRef)와 비교해서, 같은
      // 정렬 방식(예: 오른쪽 정렬끼리)끼리 "진짜 좌표(rawX/rawY)"가 GUIDE_SNAP_THRESHOLD_PCT
      // 이내로 가까우면 그 좌표에 정확히 붙습니다. 비교 기준이 화면에 보이는 좌표가
      // 아니라 rawX/rawY라서, 마우스가 계속 멀어지면 반드시 풀립니다(더 이상 "덫"에
      // 걸리지 않음).
      const prevGeoms = elementGeomsRef.current;
      const activePrev = prevGeoms.find((g) => g.key === key);
      if (activePrev) {
        const others = prevGeoms.filter((g) => g.key !== key);
        const matchX = others.find((g) => g.align === activePrev.align && Math.abs(g.x - st.rawX) < GUIDE_SNAP_THRESHOLD_PCT);
        if (matchX) targetX = matchX.x;
        const matchY = others.find((g) => g.valign === activePrev.valign && Math.abs(g.y - st.rawY) < GUIDE_SNAP_THRESHOLD_PCT);
        if (matchY) targetY = matchY.y;
        displayedX = activePrev.x;
        displayedY = activePrev.y;
      }
    }

    // 화면에 실제로 적용할 델타 = (스냅 적용된 목표 좌표) − (지금 화면에 보이는 좌표)
    const dxMm = ((targetX - displayedX) / 100) * widthMm;
    const dyMm = ((targetY - displayedY) / 100) * heightMm;

    if (dxMm || dyMm) onDragKindMove(key, dxMm, dyMm);
  };
  const handleDragPointerUp = (e, key) => {
    if (dragRef.current?.key === key) dragRef.current = null;
    setIsDragging(false);
  };

  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: `${spec.trimWidth} / ${spec.trimHeight}`,
      background: bgCss, border: "none", borderRadius: 4, overflow: "hidden",
    }}>
      {/* 2026-08-01: 요소를 선택할 때 0.5초 정도 부드럽게 "반짝"하는 강조 효과용
          keyframes. isActive가 mount될 때마다(요소를 새로 선택할 때마다) 재생됩니다. */}
      {!compact && onDragKindMove && (
        <style>{`
          @keyframes cardstudioSelectPulse {
            0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.55); }
            60% { box-shadow: 0 0 0 7px rgba(59,130,246,0); }
            100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
          }
        `}</style>
      )}
      <div ref={canvasRef} style={{
        position: "absolute",
        left: 0, top: 0, right: 0, bottom: 0,
      }}>
        {/* 사진(Photo)은 zone 기반이 아니라 재단선 기준 사각형(rect, %)으로 바로 배치합니다 — 로고와 달리 넓은 영역을 차지하기 때문.
            2026-08-02: 이제 로고·텍스트와 같은 방식으로 눌러서 옮기고(드래그), 아래 크기조절 버튼으로 배율도 바꿀 수 있습니다. */}
        {layout.photo && effectivePhotoRect && (() => {
          const isSelectable = !!onDragKindMove;
          const isActive = isSelectable && interactiveKind === "photo";
          return (
            <div
              onPointerDown={isSelectable ? (e) => handleDragPointerDown(e, "photo") : undefined}
              onPointerMove={isSelectable ? (e) => handleDragPointerMove(e, "photo") : undefined}
              onPointerUp={isSelectable ? (e) => handleDragPointerUp(e, "photo") : undefined}
              onPointerCancel={isSelectable ? (e) => handleDragPointerUp(e, "photo") : undefined}
              style={{
                position: "absolute",
                left: `${effectivePhotoRect.left}%`, top: `${effectivePhotoRect.top}%`,
                width: `${effectivePhotoRect.width}%`, height: `${effectivePhotoRect.height}%`,
                borderRadius: layout.photo.shape === "circle" ? "50%" : 0,
                overflow: "hidden",
                background: photoUrl ? `center / cover no-repeat url(${photoUrl})` : "var(--paper-deep)",
                display: "flex", alignItems: "center", justifyContent: "center",
                ...(isSelectable
                  ? {
                      cursor: "grab", touchAction: "none", userSelect: "none",
                      outline: isActive ? `2px solid ${SELECTED_ACCENT_COLOR}` : "1px dashed rgba(0,0,0,0.18)",
                      outlineOffset: 4,
                    }
                  : {}),
              }}
            >
              {!photoUrl && !compact && <Camera size={18} color="var(--ink-soft)" />}
              {isActive && (
                <>
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute", top: -4, left: -4, right: -4, bottom: -4,
                      borderRadius: layout.photo.shape === "circle" ? "50%" : 8,
                      animation: "cardstudioSelectPulse 0.6s ease-out",
                      pointerEvents: "none",
                    }}
                  />
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute", top: -10, right: -10,
                      width: 20, height: 20, borderRadius: "50%",
                      background: SELECTED_ACCENT_COLOR, color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, boxShadow: "0 0 0 1.5px #fff", zIndex: 2, pointerEvents: "none",
                    }}
                  >
                    ✥
                  </span>
                </>
              )}
            </div>
          );
        })()}

        <div
          ref={safeAreaRef}
          style={{
            position: "absolute",
            left: `${safeXPct}%`, top: `${safeYPct}%`, right: `${safeXPct}%`, bottom: `${safeYPct}%`,
            border: compact ? "none" : "1px dashed rgba(108,76,240,0.35)",
            // 2026-08-07(버그 수정): "사진을 눌러도 선택조차 잘 안 된다"는 신고 반영.
            // 이 안전영역 박스는 점선 테두리만 그리는 용도인데(내용물은 없음), 실제
            // DOM에서는 사진 요소보다 나중에(= 위에) 그려져서, 화면엔 안 보여도
            // 이 사각형 범위 안의 터치를 전부 가로채고 있었습니다 — 그 안에 있는
            // 사진(원형 프로필 등)을 누르면 이 투명한 박스가 먼저 이벤트를 가져가
            // 버린 것입니다. pointerEvents:"none"으로 이 박스 자체는 클릭을
            // 통과시키게 하고, 안의 텍스트·로고 요소들은 각자 pointerEvents:"auto"로
            // 다시 켜서(아래) 원래대로 눌리게 했습니다.
            pointerEvents: "none",
          }}
        >
          {/* 2026-08-01: Object.entries(layout) 대신 ALL_PATTERN_KINDS 고정 순서로 돕니다 —
              layout 객체의 키 순서가 아래 조절 패널의 순서와 어긋나 있던 게 "미리보기랑
              조절 버튼이 따로 논다"는 혼란의 원인이었습니다. 이제 이 배열 하나가 미리보기
              그리는 순서와 조절 패널 항목 순서 둘 다의 기준입니다(patternLibrary.js에서 export). */}
          {(() => {
            // 2026-08-01: 예전엔 이 자리에서 바로 JSX를 반환하는 한 번짜리 .map이었는데,
            // 정렬 가이드 선을 그리려면 "다른 모든 요소들의 좌표"가 먼저 다 계산돼
            // 있어야 해서 데이터 계산(elements)과 JSX 렌더를 두 단계로 나눴습니다.
            // 로직 자체는 그대로 옮긴 것뿐이라 계산 결과는 이전과 동일합니다.
            const elements = ALL_PATTERN_KINDS.map((key) => {
              const pos = layout[key];
              if (!pos) return null;
              if (pos.kind === "photo") return null; // 위에서 이미 그림
              if (pos.kind === "logo" && !showLogo) return null;
              // 값이 없는 연락처 하위 항목은 그리지 않습니다 — 다만 전부 비어있으면
              // (한 항목도 안 채웠으면) mobile 자리에 안내용 예시를 하나만 보여줍니다.
              const text = textFor(key);
              const isMobileFallback = key === "mobile" && text === null && !anyContactFilled;
              if (text === null && !isMobileFallback) return null;
              const displayText = isMobileFallback ? TEXTS.fallbackPhone : text;

              const { x, y } = resolveElementPosition(pos.kind, pos, spec);
              const isLogo = pos.kind === "logo";
              const align = x <= DESIGN_RULES.alignment.leftThreshold ? "left" : x >= DESIGN_RULES.alignment.rightThreshold ? "right" : "center";
              const translateX = align === "left" ? "0%" : align === "right" ? "-100%" : "-50%";
              // 세로 방향도 가로와 동일한 임계값 규칙을 적용합니다 — 이게 없으면 y가 0(맨 위)이나
              // 100(맨 아래)인 요소가 항상 세로 중앙 정렬(-50%)되어 버려서, 박스의 절반이 안전영역
              // 경계 밖(도련·재단선 쪽)으로 삐져나가는 문제가 있었습니다(특히 연락처가 맨 아래에
              // 걸쳐서 인쇄 시 잘릴 수 있는 문제). 위/아래 가장자리 근처에서는 박스를 안쪽으로만
              // 펼치고, 중간 영역에서만 중앙 정렬합니다.
              const valign = y <= DESIGN_RULES.alignment.leftThreshold ? "top" : y >= DESIGN_RULES.alignment.rightThreshold ? "bottom" : "middle";
              const translateY = valign === "top" ? "0%" : valign === "bottom" ? "-100%" : "-50%";
              const emphasis = pos.emphasis || defaultEmphasis[key] || "md";
              const logoSize = pos.size || "md";
              const fontDef = fontForKind(key);
              // pointSize가 있으면(=Pattern Library 경로) 그 값을 쓰고, 없으면(=아직
              // Pattern Library로 안 옮긴 레이아웃) 기존 emphasis 3단계를 씁니다.
              const baseFontSize = pos.pointSize != null ? pos.pointSize : TEXT_EMPHASIS_SIZE[mode][emphasis];
              const fontSizePx = compact ? baseFontSize * COMPACT_SIZE_SCALE : baseFontSize;
              const Icon = showContactIcon ? FIELD_ICON[key] : null;
              // 2026-08-01: 이제 "지금 안내 중인 항목"만이 아니라 실제 내용이 있는
              // 요소는 전부 눌러서 바로 선택+이동할 수 있습니다(isSelectable). 그중에서도
              // interactiveKind와 같은 것만 "지금 안내 문구가 가리키는 항목"으로 진하게
              // 강조합니다(isActive) — 나머지도 흐리게 죽이지 않고 옅은 점선으로만 "이것도
              // 누르면 움직일 수 있다"는 힌트만 줍니다.
              const isSelectable = !!onDragKindMove && !isMobileFallback;
              const isActive = isSelectable && key === interactiveKind;
              return {
                key, pos, displayText, x, y, isLogo, align, translateX, valign, translateY,
                logoSize, fontDef, fontSizePx, Icon, isSelectable, isActive,
              };
            }).filter(Boolean);

            // 다음 pointermove 이벤트(handleDragPointerMove)에서 정렬 스냅을 계산할 때
            // 쓸 수 있도록, 이번 렌더의 모든 요소 좌표를 캐시해둡니다.
            elementGeomsRef.current = elements.map((el) => ({ key: el.key, x: el.x, y: el.y, align: el.align, valign: el.valign }));

            // 2026-08-01: 지금 드래그 중인 요소가 다른 요소와 "같은 정렬 방식 + 좌표가
            // 아주 가까움"이면 빨간 점선 가이드를 보여줍니다(포토샵 스마트 가이드 방식).
            const activeEl = isDragging ? elements.find((el) => el.isActive) : null;
            const guideX = activeEl && elements.some((el) => el.key !== activeEl.key && el.align === activeEl.align && Math.abs(el.x - activeEl.x) < GUIDE_SNAP_THRESHOLD_PCT) ? activeEl.x : null;
            const guideY = activeEl && elements.some((el) => el.key !== activeEl.key && el.valign === activeEl.valign && Math.abs(el.y - activeEl.y) < GUIDE_SNAP_THRESHOLD_PCT) ? activeEl.y : null;

            return (
              <>
                {elements.map((el) => {
                  const { key, pos, displayText, x, y, isLogo, align, translateX, valign, translateY, logoSize, fontDef, fontSizePx, Icon, isSelectable, isActive } = el;
                  return (
                    <div
                      key={key}
                      onPointerDown={isSelectable ? (e) => handleDragPointerDown(e, key) : undefined}
                      onPointerMove={isSelectable ? (e) => handleDragPointerMove(e, key) : undefined}
                      onPointerUp={isSelectable ? (e) => handleDragPointerUp(e, key) : undefined}
                      onPointerCancel={isSelectable ? (e) => handleDragPointerUp(e, key) : undefined}
                      style={{
                        position: "absolute", left: `${x}%`, top: `${y}%`,
                        transform: `translate(${translateX}, ${translateY})`,
                        display: "flex",
                        flexDirection: align === "right" ? "row-reverse" : "row",
                        alignItems: "center",
                        justifyContent: isLogo ? "center" : "flex-start",
                        gap: 4,
                        transition: "outline-color 0.15s",
                        // 2026-08-07: 부모(safeAreaRef)가 pointerEvents:"none"이라
                        // 여기서 다시 "auto"로 켜야 이 요소 자체는 예전처럼 눌립니다.
                        pointerEvents: "auto",
                        ...(isSelectable
                          ? {
                              cursor: "grab", touchAction: "none", userSelect: "none",
                              // 2026-08-01(개정): kind마다 다른 색 대신, "선택된 것 = 파란 테두리"
                              // 하나로 통일했습니다. 선택 안 된 나머지는 옅은 회색 점선으로
                              // "이것도 눌러서 옮길 수 있다"는 힌트만 줍니다.
                              outline: isActive
                                ? `2px solid ${SELECTED_ACCENT_COLOR}`
                                : "1px dashed rgba(0,0,0,0.18)",
                              outlineOffset: 4,
                              borderRadius: isLogo ? (compact ? 2 : 5) : 6,
                            }
                          : {}),
                        ...(isLogo
                          ? {
                              width: `${LOGO_SIZE_PERCENT[mode][logoSize]}%`, aspectRatio: "1 / 1",
                              background: logoUrl ? "transparent" : resolveLogoColor(logoColor),
                              // 로고가 배경색과 비슷한 톤일 때 완전히 안 보이는 걸 막는 최소한의
                              // 안전장치 — 옅은 테두리를 항상 둡니다(업로드 이미지가 있을 땐 필요 없음).
                              border: logoUrl ? "none" : "1px solid rgba(0,0,0,0.18)",
                              borderRadius: compact ? 2 : 5, overflow: "hidden",
                            }
                          : {
                              fontSize: fontSizePx, fontWeight: fontDef.weight, fontFamily: fontDef.family,
                              color: (pos.overlay || needsLightText) ? "#fff" : "var(--ink)",
                              textShadow: (pos.overlay || needsLightText) ? "0 1px 4px rgba(0,0,0,0.55)" : "none",
                              whiteSpace: "nowrap", lineHeight: 1.2,
                              textAlign: align === "left" ? "left" : align === "right" ? "right" : "center",
                            }),
                      }}
                    >
                      {isLogo ? (
                        // CP-003: 업로드한 로고는 원본 그대로(object-fit: contain, 비율 유지) 표시 — AI가 재창작하거나 늘리지 않음
                        logoUrl && <img src={logoUrl} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", pointerEvents: "none" }} />
                      ) : (
                        <>
                          {Icon && !compact && <Icon size={fontSizePx * 0.8} color={(pos.overlay || needsLightText) ? "#fff" : "var(--ink-soft)"} />}
                          <span style={{ pointerEvents: "none" }}>{displayText}</span>
                        </>
                      )}
                      {isActive && (
                        <>
                          {/* 2026-08-01: "선택하면 0.5초 정도 부드럽게 빛나면 좋겠다"는 요청으로
                              추가. isActive가 false→true로 바뀔 때마다 이 span이 새로
                              mount되면서(조건부 렌더링) 아래 @keyframes 애니메이션이 매번
                              처음부터 다시 재생됩니다 — 다른 요소를 눌러 선택을 옮길 때마다
                              "지금 이걸 고르셨어요"가 눈에 보이는 파동으로 한 번 반짝입니다. */}
                          <span
                            aria-hidden="true"
                            style={{
                              position: "absolute", top: -4, left: -4, right: -4, bottom: -4,
                              borderRadius: isLogo ? (compact ? 4 : 7) : 8,
                              animation: "cardstudioSelectPulse 0.6s ease-out",
                              pointerEvents: "none",
                            }}
                          />
                          <span
                            aria-hidden="true"
                            style={{
                              position: "absolute", top: -10, right: -10,
                              width: 20, height: 20, borderRadius: "50%",
                              background: SELECTED_ACCENT_COLOR, color: "#fff",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 11, boxShadow: "0 0 0 1.5px #fff", zIndex: 2, pointerEvents: "none",
                            }}
                          >
                            ✥
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
                {/* 2026-08-01: 정렬 가이드 — 포토샵/일러스트레이터에서 다른 요소와 줄이
                    맞을 때 뜨는 빨간 점선과 같은 방식입니다. 세로선은 "같은 정렬(왼쪽/
                    오른쪽/가운데)끼리 x좌표가 거의 같음"을, 가로선은 "같은 정렬(위/아래/
                    중앙)끼리 y좌표가 거의 같음"을 의미합니다. 안전영역 박스 전체에 걸쳐
                    그려서 "이 줄에 맞춰졌다"는 걸 명확히 보여줍니다. */}
                {guideX != null && (
                  <div aria-hidden="true" style={{ position: "absolute", left: `${guideX}%`, top: 0, bottom: 0, width: 0, borderLeft: `1.5px dashed ${GUIDE_LINE_COLOR}`, pointerEvents: "none", zIndex: 6 }} />
                )}
                {guideY != null && (
                  <div aria-hidden="true" style={{ position: "absolute", top: `${guideY}%`, left: 0, right: 0, height: 0, borderTop: `1.5px dashed ${GUIDE_LINE_COLOR}`, pointerEvents: "none", zIndex: 6 }} />
                )}
              </>
            );
          })()}

          {/* QR Object v1.0: 화면에서 실제로 켜졌을 때만 렌더링. 크기는 DRS의 qrPosition.minSizePercent(스캔 가능 최소 크기) 규칙을 따릅니다. */}
          {qrEnabled && (() => {
            const { x, y } = resolveElementPosition("qr", { zone: "bottomRight" }, spec);
            const size = getQrSizePercent(mode);
            return (
              <div style={{
                position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-100%, -100%)",
                width: `${size}%`, aspectRatio: "1 / 1", background: "var(--ink)", borderRadius: compact ? 2 : 4,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {!compact && <span style={{ color: "#fff", fontSize: 6, fontWeight: 800 }}>QR</span>}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

// ==================== domain/learning/index ====================
// Learning Domain — "기록만 남겨두는 배관(plumbing)". STEP 7 전체(통계, 승격/강등
// 판단, changeReason 수집 UI)는 아직 만들지 않습니다 — 실사용 데이터가 없는 상태에서
// 만들면 검증 안 된 걸 마치 학습된 것처럼 보여주는 셈이기 때문입니다(예전에 뺀 가짜
// "★★★★★ 인기순위"와 같은 문제).
//
// Learning Domain Roadmap ("실제 책임이 생길 때 분리한다" 원칙)
//   Phase 1 [x] classifier.js  — Standard/Creative Exception/Invalid Exception 분류
//   Phase 1 [x] recorder.js    — 기록 저장(KPR 초기 status만 부여, 승격·강등 로직 없음)
//   Phase 2 [ ] statistics.js  — 업종별 %분포 등 실제 통계 계산 (실사용 데이터 쌓인 뒤)
//   Phase 3 [ ] memory.js      — standardMemory/creativeExceptionMemory/invalidExceptionMemory
//                                조회 API (지금은 recorder.js 안에서 저장 키만 씀, 별도 조회 기능 없음)

// ==================== domain/company/companyResolver ====================
// ====================================================================
// Domain : Company
// Version : Phase 1
// Responsibility : 상호명 문자열 → 회사 식별(별칭 보정 포함) → 회사 정보 반환.
//                  지금은 이 책임 하나뿐이라 파일도 하나(companyResolver.js)입니다.
//
// Company Domain Roadmap ("실제 책임이 생길 때 분리한다" 원칙)
//   Phase 1 [x] companyResolver.js   — 상호명 → 회사 식별 + 등록 정책(registerCompany, dedup)
//   Phase 2 [ ] companyAsset.js      — 로고 파일이 실제 Storage(Firebase Storage 등)로 옮겨가면: getLogo(), getBrandColor(), getGuideline()
//   Phase 3 [ ] companySearch.js     — 등록 회사가 수천~수만 개로 늘어나면: searchCompany(), fuzzySearch()
//   Phase 4 [ ] companyAlias.js      — "삼성/삼성전자/삼성전자판매/삼성전자서비스"처럼 별칭이 복잡해지면 별도 분리
//   Phase 5 [ ] companyProfile.js    — companyName/industry/size/preferredFrame·Color·Typography
//   Phase 6 [ ] companyGuideline.js  — minimumLogoSize/clearSpace/logoPosition/backgroundRule
//   Phase 7 [ ] companyLearning.js   — "이 회사 사람들이 실제로 어떤 디자인을 많이 선택했는가"
//                                       (Learning Domain의 STEP 7과 연결. 단, 실명 회사 디자인을
//                                       복제하는 방향이 아니라 계약된 회사의 공식 가이드 또는 우리
//                                       서비스 안에서 축적된 실제 선택 데이터 기반으로만 발전시킨다.)
//
// 아직 만들지 않은 것 (둘 다 별도 UI/승인 흐름이 필요해 범위가 큼 — registerCompany()라는
// "창구"만 먼저 만들고, 그 창구를 실제로 호출하는 화면은 다음 단계):
//   - 계약회원이 디자인 완료 시 "이 로고를 등록할까요?" 묻는 훅
//   - 사원증·재직증명서 업로드 인증 경로 (관리자 검토 대기열 포함) — emailDomains를
//     모르는 회사(위 한계 참고)의 재직 확인은 이 경로가 있어야 가능해짐
// 지금 Phase 2~7을 미리 빈 파일로 만들지 않는 이유: 실제 책임이 없는 상태에서
// 파일부터 나누면 대부분 빈 껍데기가 되고, 오히려 어디에 뭘 넣을지 헷갈리게 됩니다.
// ====================================================================
// Company Resolution Engine (STEP 0 — Design Engine보다 앞단)
// ----------------------------------------------------------------------
// 배경: 일반회원이 회사 로고 파일 없이 첫 명함을 만들 때, AI가 "비슷한"
// 패턴을 대신 만들어주면 실제 회사 로고와 달라 신뢰 문제가 생김
// (95% 일치는 "틀렸다"고 인식됨 — 100%가 필요). 그래서 로고는 디자인
// 엔진의 "표현(Expression)" 영역이 아니라 "정확성(Accuracy)" 영역으로
// 분리해서, Design Engine이 시작되기 전에 여기서 먼저 확보한다.
//
// 상표권 주의: 재직 중인 직원 본인이 자기 명함에 소속 회사 로고를
// 쓰는 것은 정당한 사용이지만, 소속이 아닌 사람이 임의로 쓰면 문제가
// 될 수 있음. 그래서 라이브러리 매칭 + 회사 이메일 도메인 인증을
// 통과해야만 공식 로고를 자동 적용한다. (Issue Registry BC-014/BC-018, ADR-007/008)
// ====================================================================
// 회사명 비교용 정규화. 공백/기호 제거에 더해, "주식회사"/"(주)"/"㈜"/Inc./Corp. 같은
// 법인격 표기도 지워서 "삼성전자㈜"와 "삼성전자 주식회사"가 같은 회사로 매칭되게 합니다.
// 법인격 표기 사전 — 정규식을 계속 늘리는 대신 배열로 관리해서, 새 표기를
// 발견할 때마다 정규식을 다시 안 짜고 항목만 추가하면 되게 했습니다.
// 2026-08-04: 실제 서버(Render+Supabase)가 배포되면서, 아래 persistCompany/
// loadCompanyLibrary/removeCompany가 window.storage 대신 이 서버를 부르도록
// 바뀌었습니다. resolveCompany·registerCompany의 매칭/중복확인 로직 자체는
// 전혀 안 바뀌었습니다 — "저장을 어디에 하는가"만 바뀐 것입니다.

const CORPORATE_SUFFIXES = [
  "주식회사", "(주)", "㈜",
  "Co., Ltd.", "Co. Ltd.", "Co Ltd", "Co.,Ltd", "Co.",
  "Corporation", "Corp.", "Corp",
  "Inc.", "Inc",
  "Ltd.", "Ltd",
  "Company",
];

// 회사명 비교용 정규화. 위 법인격 표기를 전부 지우고(어느 위치에 있든), 공백/기호를
// 없애서 "삼성전자㈜"와 "삼성전자 주식회사", "Samsung Electronics Co., Ltd."가
// 전부 같은 회사로 매칭되게 합니다.
function normalizeCompanyName(str) {
  let result = str || "";
  for (const suffix of CORPORATE_SUFFIXES) {
    result = result.replace(new RegExp(suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "");
  }
  return result.replace(/[\s\-_.,()]/g, "").toLowerCase();
}

// ====================================================================
// Company Logo Library — 등록 경로는 여러 개, 저장소는 하나.
// ----------------------------------------------------------------------
// 등록 경로(source)는 4가지가 있을 수 있습니다:
//   "official"          — 잘 알려진 대기업, 관리자가 미리 등록 (지금 여기 있는 삼성화재/현대해상)
//   "contract_upload"   — 계약회원이 디자인하다가 등록한 회사(잘 안 알려진 회사 위주)
//   "admin_registered"  — 관리자가 직접 추가
//   "user_uploaded"     — 일반회원이 올린 로고를 관리자 승인 후 라이브러리에 편입
// 등록 경로와 무관하게, 한 번 라이브러리에 들어오면 resolveCompany()로 똑같이 조회되고,
// 로고 사용 전 인증도 (verifyCompanyEmail 등으로) 똑같이 거칩니다 — source가 다르다고
// 검증 없이 통과되는 경로는 없습니다.
//
// 등록 정책: "저장목록에 없을 경우에만 저장한다" — registerCompany()가 이 규칙을 강제합니다.
// 이미 있는 회사(대기업 등)를 계약회원이 또 올려도 중복 저장되지 않습니다.
//
// 한계(정직하게): emailDomains를 모르는 회사(계약회원이 올린 소규모 업체 등)는 지금
// verifyCompanyEmail()로 인증할 방법이 없습니다 — 회사 이메일 도메인을 모르기 때문입니다.
// 이런 경우의 인증(사원증/재직증명서 업로드 등)은 아직 별도로 구현되지 않았습니다.
// ====================================================================
// TODO: 실제 서비스에서는 이 배열이 아니라 진짜 DB(Firestore 등)를 써야 합니다.
// 지금은 프로토타입이라 모듈 로드 시점의 메모리 배열이라, 새로고침하면 registerCompany()로
// 추가한 항목은 사라집니다 — 그래도 "등록 정책(dedup 로직)"은 이미 실제로 동작합니다.
// logoType: 이 로고를 쓰는 조직의 성격. 회사(corporate)뿐 아니라 학교·병원·관공서·
// 협회·군부대·종교단체도 언젠가 지원할 걸 감안해 처음부터 넣어둡니다.
const COMPANY_LOGO_TYPES = {
  CORPORATE: "corporate",
  GOVERNMENT: "government",
  SCHOOL: "school",
  HOSPITAL: "hospital",
  ASSOCIATION: "association",
  MILITARY: "military",
  RELIGION: "religion",
  ETC: "etc",
};

const COMPANY_DOMAIN = [
  {
    id: "samsung_fire", name: "삼성화재",
    aliases: ["삼성화재", "삼성화재해상보험", "삼성 화재"],
    logo: "/logos/insurance/samsung_fire.svg", brandColor: "#0f2b6c", industry: "보험",
    logoType: COMPANY_LOGO_TYPES.CORPORATE, homepage: "samsungfire.com", officialLogoUrl: null, logoVersion: "1.0", imageHash: null,
    emailDomains: ["samsungfire.com"],
    source: "official", status: "official", qualityGrade: "A", lastUpdated: null,
  },
  {
    id: "hyundai_marine", name: "현대해상",
    aliases: ["현대해상", "현대해상화재보험"],
    logo: "/logos/insurance/hyundai_marine.svg", brandColor: "#004b93", industry: "보험",
    logoType: COMPANY_LOGO_TYPES.CORPORATE, homepage: "hi.co.kr", officialLogoUrl: null, logoVersion: "1.0", imageHash: null,
    emailDomains: ["hi.co.kr"],
    source: "official", status: "official", qualityGrade: "A", lastUpdated: null,
  },
];

// 정확 일치 → alias 정확 일치 → 정규화 후 부분 일치(오타·띄어쓰기 흡수) 순.
function resolveCompany(inputName) {
  const trimmed = (inputName || "").trim();
  if (!trimmed) return null;
  const n = normalizeCompanyName(trimmed);
  return (
    COMPANY_DOMAIN.find((c) => c.name === trimmed) ||
    COMPANY_DOMAIN.find((c) => c.aliases.some((a) => normalizeCompanyName(a) === n)) ||
    COMPANY_DOMAIN.find((c) =>
      c.aliases.some((a) => {
        const na = normalizeCompanyName(a);
        return na.includes(n) || n.includes(na);
      })
    ) ||
    null
  );
}

// source별 기본 status. "official"/"admin_registered"는 이미 관리자가 확인한 셈이라
// 바로 신뢰하고, "contract_upload"/"user_uploaded"는 아직 아무도 확인 전이라 검토 대기.
// naver.com/gmail.com 같은 무료 개인 이메일 도메인은 "특정 회사가 소유한 도메인"이
// 아니라 누구나 계정을 만들 수 있는 공개 서비스입니다. 이런 도메인을 emailDomains에
// 등록해두면 "그 메일 서비스에 계정만 있으면 이 회사로 인증된다"는 뜻이 되어버려서,
// 회사 도메인 검증이라는 목적 자체가 무너집니다(실제로 명함 사진을 보고 발견한 문제 —
// 도메인 메일이 없는 중소기업·1인기업이 실제로 아주 많습니다). 그래서 이런 도메인은
// 절대 emailDomains에 등록되지 않도록 여기서 걸러냅니다.
const FREE_EMAIL_DOMAINS = [
  "gmail.com", "naver.com", "daum.net", "hanmail.net", "kakao.com",
  "outlook.com", "hotmail.com", "yahoo.com", "nate.com", "icloud.com", "live.com",
];
function isPersonalEmailDomain(domain) {
  return FREE_EMAIL_DOMAINS.includes((domain || "").toLowerCase().trim());
}

const DEFAULT_STATUS_BY_SOURCE = {
  official: "official",
  admin_registered: "verified",
  contract_upload: "pending",
  ai_extracted: "pending",
  user_uploaded: "pending",
};

// 로고 품질 등급 — status(신뢰 검증 여부)와는 다른 축입니다. status는 "관리자가
// 확인했는가", qualityGrade는 "출처를 감안했을 때 이미지 자체의 품질을 얼마나
// 믿을 수 있는가"입니다. 회사 검색 시 A부터 순서대로 우선 사용합니다.
//   A: 공식 파일(회사가 직접 제공/관리자 등록) — 항상 우선 사용
//   B: 홈페이지 등에서 확보한 것으로 추정(계약회원이 전문적으로 확보) — A 없을 때 사용
//   C: AI가 사진에서 추출 — 임시 사용, 관리자 검토 대상
//   D: 사용자가 그대로 업로드(추출·가공 없음) — 검증 전까지 개인 명함에만 사용
const DEFAULT_GRADE_BY_SOURCE = {
  official: "A",
  admin_registered: "B",
  contract_upload: "B",
  ai_extracted: "C",
  user_uploaded: "D",
};

// ====================================================================
// 영속 저장 — 2026-08-04부터 실제 서버(Render) → Supabase에 저장됩니다.
// COMPANY_DOMAIN 배열 자체는 여전히 메모리에만 있어서, 앱이 켜질 때마다
// loadCompanyLibrary()로 서버에서 다시 불러와야 이전에 등록된 회사들이 보입니다.
// ====================================================================
async function persistCompany(company) {
  try {
    const res = await fetch(`${RENDER_API_BASE}/api/companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company }),
    });
    if (!res.ok) throw new Error(`저장 요청 실패 (${res.status})`);
  } catch (err) {
    console.error("회사 라이브러리 저장 실패:", err);
    // 저장에 실패해도 이번 세션 안에서는 COMPANY_DOMAIN에 이미 들어가 있어 계속 쓸 수 있음
  }
}

// 앱 시작 시 한 번 호출 — 서버에 저장된 회사들을 COMPANY_DOMAIN에 합칩니다.
async function loadCompanyLibrary() {
  try {
    const res = await fetch(`${RENDER_API_BASE}/api/companies`);
    if (!res.ok) throw new Error(`목록 조회 실패 (${res.status})`);
    const body = await res.json();
    for (const company of body.companies || []) {
      if (!company?.id) continue;
      if (COMPANY_DOMAIN.some((c) => c.id === company.id)) continue; // 이미 있으면 건너뜀(official 시드 데이터 등)
      COMPANY_DOMAIN.push(company);
    }
  } catch (err) {
    console.error("회사 라이브러리 불러오기 실패:", err);
  }
}

// "저장목록에 없을 경우에만 저장한다" 정책을 강제하는 단일 등록 창구.
// 이미 같은 회사가 있으면(별칭·부분일치 포함) 새로 추가하지 않고 기존 항목을 그대로 반환합니다.
// entry: { name, aliases?, logo, brandColor?, emailDomains?, source, status? }
// data URL(base64) 로고 이미지의 SHA-256 해시. 이름이 "삼성전자"/"Samsung Electronics"/
// "삼성전자(주)"처럼 제각각이어도, 같은 이미지 파일이면 해시가 같아서 같은 로고임을
// 알 수 있습니다. 경로 문자열(공식 시드 데이터의 /logos/...)은 실제 이미지 바이트가
// 없어 해시할 수 없으므로 null을 반환합니다.
async function computeImageHash(logo) {
  if (!logo || !logo.startsWith("data:")) return null;
  try {
    const base64 = logo.split(",")[1];
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return null; // 해시 실패해도 등록 자체는 막지 않음 — 이름 기반 중복 체크는 계속 동작
  }
}

async function registerCompany(entry) {
  const existing = resolveCompany(entry.name);
  if (existing) return { registered: false, company: existing };

  const imageHash = await computeImageHash(entry.logo);
  if (imageHash) {
    // 이름은 다르지만 이미지가 완전히 같은 로고가 이미 있으면, 새 항목을 또 만들지 않고
    // 그 항목에 이번 이름을 별칭으로 추가합니다 (예: "삼성전자"로 이미 등록된 로고를
    // 다른 사용자가 "Samsung Electronics"로 다시 올린 경우).
    const sameImage = COMPANY_DOMAIN.find((c) => c.imageHash === imageHash);
    if (sameImage) {
      if (!sameImage.aliases.includes(entry.name)) {
        sameImage.aliases.push(entry.name);
        await persistCompany(sameImage);
      }
      return { registered: false, company: sameImage, mergedAlias: true };
    }
  }

  const id = normalizeCompanyName(entry.name) || `company_${COMPANY_DOMAIN.length + 1}`;
  const safeEmailDomains = (entry.emailDomains || []).filter((d) => {
    if (isPersonalEmailDomain(d)) {
      // eslint-disable-next-line no-console
      console.warn(`[companyResolver] "${d}"는 개인 이메일 도메인이라 ${entry.name}의 emailDomains에 등록하지 않습니다.`);
      return false;
    }
    return true;
  });
  const company = {
    id,
    name: entry.name,
    aliases: entry.aliases?.length ? entry.aliases : [entry.name],
    logo: entry.logo,
    // brandColor가 이미 "이 로고의 대표 색상"(dominantColor) 역할을 하고 있어서
    // 별도 필드로 중복 만들지 않았습니다 — 이름만 다를 뿐 같은 개념입니다.
    brandColor: entry.brandColor || null,
    industry: entry.industry || null, // industryDetector가 이미 추정한 값이 있으면 넘겨받아 저장 — 다음부터는 재추정 불필요
    logoType: entry.logoType || COMPANY_LOGO_TYPES.CORPORATE,
    homepage: entry.homepage || null, // AI가 로고를 "다시 확인하러" 갈 참고용 링크
    officialLogoUrl: entry.officialLogoUrl || null, // 관리자가 실제로 확인한 로고 원본 위치(재검증용) — homepage와 다른 개념
    logoVersion: entry.logoVersion || "1.0",
    imageHash,
    emailDomains: safeEmailDomains, // 모르면(또는 전부 개인 도메인이라 걸러지면) 빈 배열 — 이 경우 이메일 인증은 통과할 수 없음(위 한계 참고)
    source: entry.source,
    status: entry.status || DEFAULT_STATUS_BY_SOURCE[entry.source] || "pending",
    qualityGrade: entry.qualityGrade || DEFAULT_GRADE_BY_SOURCE[entry.source] || "D",
    lastUpdated: Date.now(),
    // vector(로고 벡터화)는 아직 없습니다 — 실제로 인쇄 확대 시 화질 문제가
    // 확인되면 그때 벡터화 파이프라인을 별도로 추가합니다 (지금은 PNG만 다룸).
  };
  COMPANY_DOMAIN.push(company); // 이번 세션에서는 즉시 사용 가능
  await persistCompany(company); // 다음 세션에서도 쓰려면 저장까지 기다려야 함
  return { registered: true, company };
}

// 관리자가 검토를 마쳤을 때 status를 바꾸는 용도 (예: "pending" → "verified"/"rejected").
// 실제 서비스에서는 관리자 전용 화면·권한 확인이 앞단에 있어야 합니다 — 여기는 상태 변경
// 자체만 담당합니다.
// approvedBy/approvedAt: 승인한 사람과 시점만 남깁니다. 처음엔 "어떤 서류로 확인했는지"까지
// 체크리스트로 받으려고 했었는데, 실제 위험 수준(검색으로 확인한 결과 중소기업 로고 사칭의
// 실제 사례는 못 찾음, 확인된 것도 전부 도메인 인증이 이미 되는 큰 조직 사칭)에 비해 관리자
// 승인 과정에 매번 서류 종류를 고르게 하는 건 불필요한 마찰이라고 판단해 뺐습니다 — 승인
// 여부와 시점만 남아도 "누가 언제 확인했다"는 최소한의 기록으로는 충분합니다.
async function updateCompanyStatus(companyId, newStatus, approval = null) {
  const company = COMPANY_DOMAIN.find((c) => c.id === companyId);
  if (!company) return null;
  company.status = newStatus;
  company.lastUpdated = Date.now();
  if (newStatus === "verified" && approval) {
    company.approvedBy = approval.approvedBy || "admin";
    company.approvedAt = Date.now();
  }
  if (company.source !== "official") {
    // 2026-08-04: 승인은 관리자만 할 수 있는 동작이라 서버가 로그인 토큰을 확인합니다 —
    // Admin.jsx가 로그인 시 받아둔 토큰을 approval.token으로 같이 넘겨줘야 합니다.
    try {
      const res = await fetch(`${RENDER_API_BASE}/api/companies/admin/${companyId}/approve`, {
        method: "POST",
        headers: { Authorization: `Bearer ${approval?.token || ""}` },
      });
      if (!res.ok) throw new Error(`승인 요청 실패 (${res.status})`);
    } catch (err) {
      console.error("회사 승인 저장 실패:", err);
    }
  }
  return company;
}

// 관리자가 pending 항목을 반려할 때 사용 — 완전히 삭제합니다(반려된 로고를 다시
// 못 쓰게 하려면 상태만 바꾸는 것보다 아예 없애는 게 안전합니다 — resolveCompany()가
// status를 보지 않고 이름만으로 찾기 때문에, 목록에 남아있으면 다시 쓰일 수 있습니다).
async function removeCompany(companyId, token) {
  const idx = COMPANY_DOMAIN.findIndex((c) => c.id === companyId);
  if (idx === -1) return false;
  COMPANY_DOMAIN.splice(idx, 1);
  try {
    const res = await fetch(`${RENDER_API_BASE}/api/companies/admin/${companyId}/reject`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token || ""}` },
    });
    if (!res.ok) throw new Error(`반려 요청 실패 (${res.status})`);
  } catch (err) {
    console.error("회사 라이브러리 삭제 실패:", err);
  }
  return true;
}

// 회사 이메일 도메인 일치 여부만 확인하는 경량 검증 (서류 대조 아님).
function verifyCompanyEmail(email, company) {
  if (!company || !email || !email.includes("@")) return false;
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain || isPersonalEmailDomain(domain)) return false; // 개인 이메일 도메인은 여기서도 한 번 더 막습니다(시드 데이터 실수 대비 이중 방어)
  return company.emailDomains.includes(domain);
}

// ==================== domain/company/emailVerification ====================
// ====================================================================
// Domain : Company / Email Verification
// Responsibility : 회사 이메일 소유 여부를 실제로 증명하는 절차 (도메인 문자열
//                  일치만으로는 증명이 안 됨 — 누구나 타이핑만으로 남의 회사
//                  이메일을 입력할 수 있기 때문에, 그 메일함에 실제로 접근
//                  권한이 있는지 인증코드로 확인합니다).
//
// 아래 세 값은 전부 실제로 확인된 값입니다(2026-07-29): SERVICE_ID는 orderNotification.js
// 와 같은 계정, TEMPLATE_ID는 "One-Time Password" 템플릿(변수: to_email/verification_code
// 확인됨), PUBLIC_KEY도 EmailJS 대시보드에서 직접 확인. 이제 자리표시자가 아닙니다.
// ====================================================================
const EMAILJS_SERVICE_ID = "service_c48f848";
const EMAILJS_VERIFY_TEMPLATE_ID = "template_zbv0idi";
const EMAILJS_PUBLIC_KEY = "Z2ZomPLGBnjrB9_2x";

const CODE_LENGTH = 6;
const CODE_VALID_MS = 5 * 60 * 1000; // 5분

function generateVerificationCode() {
  const min = 10 ** (CODE_LENGTH - 1);
  const max = 10 ** CODE_LENGTH - 1;
  return String(Math.floor(min + Math.random() * (max - min + 1)));
}

// EmailJS REST API로 직접 POST — SDK를 새로 설치하지 않아도 되도록 fetch만 사용합니다.
// (getStyleSuggestion이 Anthropic API를 fetch로 직접 호출하는 것과 같은 방식)
async function sendVerificationEmail(email, code) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_VERIFY_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: { to_email: email, verification_code: code },
    }),
  });
  if (!res.ok) {
    throw new Error(`이메일 발송 실패 (${res.status})`);
  }
}

// 사용자가 입력한 코드가 실제로 보낸 코드와 일치하고, 유효시간 안인지 확인.
function checkVerificationCode(inputCode, sentCode, sentAt) {
  if (!sentCode || !sentAt) return { ok: false, reason: "not_sent" };
  if (Date.now() - sentAt > CODE_VALID_MS) return { ok: false, reason: "expired" };
  if (inputCode !== sentCode) return { ok: false, reason: "mismatch" };
  return { ok: true };
}

// ==================== screens/Design ====================
// Asset Domain(로고/색상/배경/스타일 태그 카탈로그)은 /domain/asset 로 분리됨 — "AI가 무엇을 고를 수 있는가"
// Kernel Domain(좌표계·크기·안전영역·DRS)은 /domain/kernel/designRules.js 로 분리됨 — "AI의 헌법" 역할

// ═════════════════════════════════════════════════════════════
// 객체 시스템 1.0 (Object System v1.0)
//
// 좌표 시스템(아래)이 "어디에 놓을지"를 정의한다면, 여기 이 섹션은
// "무엇을 놓을지"를 정의합니다. 이 둘이 합쳐져야 AI가 사람 손 없이
// 다양한 명함을 안정적으로 조합해낼 수 있습니다.
//
// 원칙(중요, 계속 지킬 것): 새 객체·속성을 추가하는 기준은
//   "이 기능이 실제 화면에서 지금 쓰이는가?"
//     예  → 객체(또는 속성)로 추가한다.
//     아니오 → 코드에 추가하지 않고, 주석으로 메모만 남기고 보류한다.
// 이 기준을 지켜야 설계가 검증 없이 부풀어 오르는 걸 막을 수 있습니다.
//
// 지금 버전(1.0)에서 다루는 객체는 4개뿐입니다: Logo, Style, Color, Template.
// Company/Contact/Background/Decoration/QR/SNS 객체는 아직 화면에서
// 실제로 쓰이지 않으므로 의도적으로 만들지 않았습니다 — 필요해지는 시점에
// 버전을 올려(v1.1, v2.0 ...) 추가하면 됩니다.
//
// Business Card Design OS 도메인과의 대응:
//   좌표 시스템(아래)               → Kernel Domain
//   Template Object                → Frame Domain
//   Logo / Style / Color Object    → Asset Domain (아래 정의 참고)
//
// ── Asset Domain 정의 ──
// Asset Domain = "파일 저장소"가 아니라, 디자인에 쓰이는 모든 자산의
// "카탈로그(메타데이터)를 관리하는 도메인"입니다.
//
// Responsibility
//   - 디자인 자산의 메타데이터 관리 (예: 로고 종류·색상·스타일이 각각 어떤 속성인지)
//   - 디자인 자산 카탈로그 관리 (Logo/Style/Color/Font/Background Object 등)
//   - 디자인 자산 식별(ID) 관리 (아래 "지금 상태" 참고)
//   - Binary Asset과의 매핑 정보 관리 (Binary Assets가 생기는 시점부터)
//
// 두 하위 구조로 나뉩니다.
//   Asset Domain
//   ├── Catalog (지금 존재하는 부분)
//   │     └── Logo Object, Style Object, Color Object — 즉 "객체 시스템 1.0" 전체
//   │         예: { shape: "shield", style: "modern", weight: "bold" } 같은 메타데이터.
//   │         실제 이미지·폰트 파일이 아니라 "어떤 속성인지"를 기술하는 데이터입니다.
//   └── Binary Assets (아직 없음, 향후 확장)
//         실제 PNG/SVG/TTF/WEBP 파일. 서버·CDN이 생기는 시점에 별도로 구축.
//
// 즉 "객체 시스템 1.0"은 Asset Domain과 별개의 것이 아니라, Asset Domain 안의
// Catalog 그 자체입니다. Font Object·Background Object 같은 향후 카탈로그 항목도
// 모두 이 Catalog 하위에 추가되고, 실제 파일이 필요해지면 Binary Assets가 옆에 생깁니다.
//
// ID 관리 — 지금 상태:
// 사실 지금도 각 항목마다 id가 있습니다 (예: LOGO_TYPES의 id:"text", LOGO_COLORS의
// id:"blue"). 다만 "LOGO-012" 같은 카탈로그 번호 체계가 아니라 사람이 읽기 쉬운
// 의미형 문자열(semantic string id)입니다. 지금 규모(카탈로그 항목 수십 개, AI가
// 텍스트로 직접 id를 주고받음)에서는 이 방식이 오히려 더 명확하고 유지보수하기
// 쉽습니다. "LOGO-012" 같은 번호형 레지스트리는 카탈로그가 수백~수천 개로 늘어나거나,
// Binary Asset과의 매핑 테이블이 실제로 필요해지는 시점에 도입하는 것이 맞습니다
// (지금 미리 번호를 매기면, 정작 그 번호를 참조할 대상(Binary Asset)이 없어서
// 검증 없이 구조만 부풀리는 셈이 됩니다 — Object System 원칙과 동일한 이유).
// ═════════════════════════════════════════════════════════════



// Frame Domain(TEMPLATES/TEMPLATE_LAYOUTS/PHOTO_TEMPLATES/PHOTO_TEMPLATE_LAYOUTS/
// getLayoutFor/BACK_LAYOUTS)은 /domain/frame 으로 분리됨.
// Learning Domain(classifyDesignRecord/recordDesignChoice/KPR_INITIAL_STATUS)은
// /domain/learning 으로 분리됨.




// ── Photo Object v1.0 ────────────────────────────────────────
// 실제 사용자 요청(사진이 크게 들어간 명함 참고 이미지)으로 필요성이 확인되어 추가합니다.
// 사진은 로고와 달리 넓은 영역을 차지하는 "배경/분할 요소"라서, zone(점) 기반이 아니라
// rect(사각형: left/top/width/height, % 단위) 기반으로 배치합니다. 나머지 텍스트 요소는
// 기존 좌표 시스템(zone/offsetMm/emphasis)을 그대로 씁니다.

// template이 "사진형"이면 photoVariant 기준으로, 아니면 일반 TEMPLATE_LAYOUTS 기준으로 배치를 가져옵니다.

// [Schema Domain] 데이터 형태(shape) 정의 — 폴더는 안 만들고 문서(Domain_Interfaces_v1.0.md)에서만
// 개념으로 다룹니다. 표시용 라벨(TEXTS[labelKey])과 데이터 저장 키(key, 영문 고정)를 분리했습니다.
// 예전엔 "회사명" 같은 한글 문자열이 라벨이자 동시에 fields["회사명"]의 저장 키였는데,
// 그러면 다국어 버전을 만들 때 라벨을 바꾸는 순간 저장 키까지 깨지는 문제가 있었습니다.
// 이제 저장 키는 언어와 무관하게 항상 companyName/position/... 로 고정됩니다.
const FIELD_DEFINITIONS = [
  { key: "companyName", labelKey: "fieldCompanyLabel" },
  { key: "position", labelKey: "fieldPositionLabel" },
  { key: "personName", labelKey: "fieldPersonNameLabel" },
  { key: "mobile", labelKey: "fieldMobileLabel" },
  { key: "telephone", labelKey: "fieldTelephoneLabel" },
  { key: "fax", labelKey: "fieldFaxLabel" },
  { key: "email", labelKey: "fieldEmailLabel" },
  { key: "address", labelKey: "fieldAddressLabel" },
  { key: "website", labelKey: "fieldWebsiteLabel" },
  { key: "etc", labelKey: "fieldEtcLabel" },
];

// CardLayoutPreview(좌표 시스템을 실제로 눈에 보이게 그려주는 렌더러)는
// /renderer/CardLayoutPreview.jsx 로 분리됨 (Kernel/Frame/Asset Domain을 조합해 렌더링).



// Recommendation Domain은 /domain/recommendation 으로 분리됨 (industryDetector.js,
// recommendationCatalog.js — 이제 RECOMMENDABLE_TEMPLATES도 여기 포함, recommendationEngine.js
// — CP-002 제안 포함).

// Step 5(고급 옵션, 보류 결정에 따라 필수 아님): 목적을 함께 넣으면 같은 업종이라도 더 세분화된 추천을 받을 수 있습니다.
const PURPOSE_OPTIONS = ["신규 고객 확보", "VIP 고객 관리", "기업 제휴", "브랜드 홍보"];


// loadInquiryThread / saveInquiryThread: 실제로는 Inquiry 화면에서만 쓰여서 screens/Inquiry.jsx 로 옮김

// ====================================================================
// Domain : Design Engine
// Version : 1.0
// Responsibility : Orchestrates Industry + Frame + Rule + Object(Logo/Style/
//                  Color) into the actual design flow the user walks through.
//                  Design (this component) + AiFlow (below) together are the
//                  orchestrator — they don't own any domain data themselves,
//                  they combine the domains above into a single session.
// ====================================================================
function Design({ order, patch, go, back }) {
  const method = order.designMethod;

  // 이전 세션에서 registerCompany()로 저장해둔 회사들을 불러옵니다. COMPANY_DOMAIN은
  // 메모리 배열이라 앱을 새로 열면 비어있으므로, 화면을 그리기 전에 한 번 채워야 합니다.
  useEffect(() => { loadCompanyLibrary(); }, []);

  // AI 디자인 하위 단계는 여기(Design)에서 관리해서, 뒤로가기를
  // 누르면 이전 화면(로그인 완료 화면)이 아니라 AI 디자인의 이전 단계 ->
  // 디자인 방식 선택 화면 순으로 정확히 되돌아가도록 합니다.
  // 순서: 템플릿(기본 디자인) 선택 → 로고 준비 방법 → (로고 종류·스타일 또는 업로드) → 기재내용 → 위치확인
  // 2026-08-01: "배송지 화면에서 뒤로가기를 누르면 디자인 화면으로 가긴 하는데
  // 전혀 이전 화면이 아니다"라는 신고 반영. 원인은 aiSub이 이 컴포넌트 안의 로컬
  // state라서, Design 화면을 벗어났다가(배송지로 이동) 다시 돌아오면 컴포넌트가
  // 새로 마운트되며 항상 "template"(맨 처음)으로 리셋되던 것 — order(부모 상태)에는
  // 아무것도 안 남기고 있었습니다. 이제 aiSub이 바뀔 때마다 order.designResumeSub에
  // 같이 적어두고, 처음 마운트될 때 그 값이 있으면 거기서부터 다시 시작합니다.
  const [aiSub, setAiSub] = useState(() => order.designResumeSub || "template");
  useEffect(() => {
    if (method === "ai") patch({ designResumeSub: aiSub });
  }, [aiSub, method]);
  const [aiTemplate, setAiTemplate] = useState(null);
  // "사진첨가형"과 "사진찍으면캐릭터변환형" 둘 다 내부적으로는 같은 값("사진형")을 써서
  // 같은 사진 업로드 흐름으로 갑니다 — 다만 그러다 보니 화면에서 둘 다 동시에
  // 선택된 것처럼 보이는 문제가 있었습니다. 이건 오직 "어느 카드를 진하게 표시할지"만
  // 구분하는 용도입니다.
  const [characterCardSelected, setCharacterCardSelected] = useState(false);
  // 2026-08-02: "업종특성 맞춘 디자인 캐릭터"(옛 회사이름강조형)와 "자유형"에 각각
  // "이런 걸 넣어달라"는 자유 서술을 받는 게시판(textarea) 추가 — 실제 AI가 카드
  // 전체를 생성하는 기능은 아직 없어서(로드맵의 "배경 AI 자동 생성" 항목 참고),
  // 지금은 이 내용을 주문에 같이 기록해서 나중에 그 기능이 생겼을 때 프롬프트로
  // 쓰거나, 그 전까지는 관리자·디자이너가 참고자료로 볼 수 있게 합니다. 두 템플릿이
  // 동시에 선택될 수 없어서 하나의 state로 충분합니다.
  const [designBriefNote, setDesignBriefNote] = useState("");
  const [aiFields, setAiFields] = useState({});
  const [aiPlaced, setAiPlaced] = useState(false);
  const [aiLogoPath, setAiLogoPath] = useState(null); // "ai" | "upload"
  const [logoFile, setLogoFile] = useState(null); // 업로드한 실제 로고 파일 — CP-003: AI가 재창작하지 않고 그대로 렌더링
  const [photoVariant, setPhotoVariant] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [wantsLogo, setWantsLogo] = useState(null); // null(미정) | true | false — 사진형 경로에서만 사용
  const [styleSuggestion, setStyleSuggestion] = useState(null); // { industry, tags, source }
  const [selectedStyleTags, setSelectedStyleTags] = useState([]);
  const [styleLoading, setStyleLoading] = useState(false);
  const [styleError, setStyleError] = useState("");
  const [logoConceptIds, setLogoConceptIds] = useState([]);
  const [logoCustomText, setLogoCustomText] = useState("");
  const [logoType, setLogoType] = useState(null);
  const [logoColor, setLogoColor] = useState("aiPick");
  const [logoAdvanced, setLogoAdvanced] = useState(LOGO_ADVANCED_DEFAULT);
  const [logoAdvancedOpen, setLogoAdvancedOpen] = useState(false);
  const [companyMatch, setCompanyMatch] = useState(null); // resolveCompany() 결과 — Company Resolution Engine
  const [companyVerifyInput, setCompanyVerifyInput] = useState("");
  const [companyVerifyError, setCompanyVerifyError] = useState("");
  const [verifyStage, setVerifyStage] = useState("email"); // "email" | "code" — 이메일 입력 단계 / 인증코드 입력 단계
  const [sentCode, setSentCode] = useState(null);
  const [sentAt, setSentAt] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [codeSending, setCodeSending] = useState(false);
  const isFixedSizeCategory = order.catCode === FIXED_SIZE_CATEGORY; // 카드명함·투명명함: 크기 선택지 없음
  const defaultCardSizeForCategory = isFixedSizeCategory ? "creditCard" : CARD_SIZE_DEFAULT;
  const [cardSize, setCardSize] = useState(defaultCardSizeForCategory);
  // 2026-08-01: "가로형/세로형은 사진 유무와 상관없는 개인 취향이다. 앞면과 뒷면도
  // 서로 독립적으로 고를 수 있어야 한다"는 요청 반영. 카드의 바깥 모양(가로/세로)은
  // 물리적으로 한 장의 카드이므로 앞뒤가 항상 같아야 하지만("뒤집으면 테두리가
  // 안 맞는" 문제), 그 안의 내용 배치는 앞뒤가 완전히 독립적이라 — 앞면 화면과
  // 뒷면 화면 각각에 "가로형/세로형" 토글을 따로 두고, 각자 원하는 대로 고르게
  // 합니다(보통은 같게 고르시겠지만 강제하지 않음). 앞뒤가 서로 다르게 골라도
  // 자동으로 맞춰 돌리는 기능은 만들지 않기로 했습니다(드문 경우라 필요 없다고 확인받음).
  const [frontOrientation, setFrontOrientation] = useState("landscape");
  // null이면 "아직 직접 안 골랐다"는 뜻 — 이 경우 프론트와 같은 값을 기본으로 보여주되,
  // 사용자가 뒷면 화면에서 직접 누르면 그 값으로 고정됩니다(프론트를 따라가지 않게 됨).
  const [backOrientation, setBackOrientation] = useState(null);
  // 사진 상단형/하단형을 고르면 세로형이 어울리는 경우가 많아 기본값만 살짝
  // 제안해줍니다 — 그래도 사용자가 위 토글로 언제든 가로형으로 바꿀 수 있습니다.
  useEffect(() => {
    if (photoVariant === "사진 상단형" || photoVariant === "사진 하단형") setFrontOrientation("portrait");
  }, [photoVariant]);
  const [qrEnabled, setQrEnabled] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [nameEnglish, setNameEnglish] = useState("");
  const [showContactIcon, setShowContactIcon] = useState(true);
  const [backgroundStyle, setBackgroundStyle] = useState("white");
  const [backLayoutChoice, setBackLayoutChoice] = useState(null);
  const [purposeOpen, setPurposeOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [designRating, setDesignRating] = useState(null);
  const [designRecorded, setDesignRecorded] = useState(false);
  // 위치조정 화면에서 사용자가 고른 패턴 조합. null이면 아직 템플릿 기본값을 그대로
  // 쓰는 상태 — template이 정해지면 그 템플릿의 기본 조합(TEMPLATE_PATTERN_SELECTIONS)
  // 으로 채워두고, 사용자가 칩을 누르면 그 kind만 덮어씁니다.
  const [patternSelections, setPatternSelections] = useState(null);
  const [fontFamilyId, setFontFamilyId] = useState({ default: FONT_FAMILY_DEFAULT });
  const isDoubleSided = order.selOptions?.OPT001?.choice === "double";

  // 템플릿이 바뀌면(또는 처음 정해지면) 그 템플릿의 기본 패턴 조합으로 초기화합니다.
  // 사진형은 photoVariant(사진 분할형/배경형/프로필원형)가 정해져야 어떤 조합을 쓸지
  // 알 수 있어서 photoVariant도 같이 감시합니다.
  useEffect(() => {
    if (aiTemplate === "사진형") {
      if (photoVariant && PHOTO_TEMPLATE_PATTERN_SELECTIONS[photoVariant]) {
        setPatternSelections({ ...PHOTO_TEMPLATE_PATTERN_SELECTIONS[photoVariant].patterns });
      } else {
        setPatternSelections(null);
      }
    } else if (aiTemplate && TEMPLATE_PATTERN_SELECTIONS[aiTemplate]) {
      setPatternSelections({ ...TEMPLATE_PATTERN_SELECTIONS[aiTemplate] });
    } else {
      setPatternSelections(null);
    }
  }, [aiTemplate, photoVariant]);

  const resetAi = () => {
    setAiSub("template"); setAiTemplate(null); setAiFields({}); setAiPlaced(false); setAiLogoPath(null);
    setLogoFile(null); setPhotoVariant(null); setPhotoFile(null); setWantsLogo(null);
    setStyleSuggestion(null); setSelectedStyleTags([]); setStyleLoading(false); setStyleError("");
    setLogoConceptIds([]); setLogoCustomText("");
    setLogoType(null); setLogoColor("aiPick"); setLogoAdvanced(LOGO_ADVANCED_DEFAULT); setLogoAdvancedOpen(false);
    setCompanyMatch(null); setCompanyVerifyInput(""); setCompanyVerifyError("");
    setVerifyStage("email"); setSentCode(null); setSentAt(null); setCodeInput(""); setCodeSending(false);
    setCardSize(defaultCardSizeForCategory); setQrEnabled(false); setQrUrl(""); setNameEnglish("");
    setFrontOrientation("landscape"); setBackOrientation(null);
    setDesignBriefNote("");
    setShowContactIcon(true); setBackgroundStyle("white"); setBackLayoutChoice(null);
    setPurposeOpen(false); setSelectedPurpose(null); setDesignRating(null); setDesignRecorded(false);
    setPatternSelections(null);
    setFontFamilyId({ default: FONT_FAMILY_DEFAULT });
    patch({ designResumeSub: null });
  };

  const handleBack = () => {
    if (method === "ai" && aiSub !== "template") {
      const cameFromPhoto = aiTemplate === "사진형";
      if (aiSub === "backLayout") setAiSub("layout");
      // placed(확정)된 상태에서 뒤로가기를 누르면, 먼저 확정을 풀어서 위치·크기
      // 조절 화면을 다시 보여줍니다. 예전엔 placed 여부와 상관없이 바로 fields로
      // 가버려서, "위치조정 화면을 건너뛴다"는 문제가 있었습니다 — 한 번 확정한
      // 뒤엔 그 화면으로 다시 돌아올 방법이 없었기 때문입니다.
      else if (aiSub === "layout") { if (aiPlaced) setAiPlaced(false); else setAiSub("fields"); }
      else if (aiSub === "fields") setAiSub(wantsLogo === false ? "logoDecision" : aiLogoPath === "official" ? "companyVerify" : aiLogoPath === "upload" ? "logoUpload" : aiLogoPath === "none" ? "logoMethod" : "logoAi");
      else if (aiSub === "logoAi") setAiSub("logoType");
      else if (aiSub === "logoType") setAiSub("logoMethod");
      else if (aiSub === "logoUpload") setAiSub("logoMethod");
      else if (aiSub === "logoMethod") setAiSub("companyName");
      else if (aiSub === "companyVerify") {
        if (verifyStage === "code") { setVerifyStage("email"); setSentCode(null); setSentAt(null); setCompanyVerifyError(""); }
        else setAiSub("companyName");
      }
      else if (aiSub === "companyName") setAiSub(cameFromPhoto ? "logoDecision" : "template");
      else if (aiSub === "logoDecision") setAiSub("photoUpload");
      else if (aiSub === "photoUpload") setAiSub("photoTemplate");
      else if (aiSub === "photoTemplate") setAiSub("template");
      return;
    }
    if (method) {
      patch({ designMethod: null });
      resetAi();
      return;
    }
    back();
  };

  return (
    <div className="app-body">
      {/* 2026-08-01: "뒷면 디자인 중인데 맨 위에 그냥 '디자인'이라고만 뜬다"는
          피드백 반영 — 지금 앞면/뒷면 중 어느 쪽을 디자인 중인지 제목에서 바로
          보이게 했습니다. */}
      {/* 2026-08-02: "디자인 구간 전부 '디자인'이라는 제목뿐이라 화면 구분이 어렵다"는
          피드백 반영 — 지금 하고 있는 일이 그대로 제목이 되도록 단계별 제목을 붙였습니다
          (TEXTS.subStepTitle). 없는 단계는 예전처럼 그냥 "디자인"으로 남습니다. */}
      <TopBar title={TEXTS.subStepTitle[aiSub] || TEXTS.designTitle} sub={TEXTS.designSub} onBack={handleBack} step={4} go={go} />
      <div style={{ padding: "6px 18px 16px" }}>
        <Card style={{ background: "var(--paper-deep)", border: "none", marginBottom: 14 }}>
          <div style={{ fontSize: 11.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>
            {TEXTS.designIntro}
          </div>
        </Card>

        {order.memberType === "special" && !method && (
          <div style={{ fontSize: 11.5, color: "var(--stamp)", fontWeight: 600, marginBottom: 10 }}>{TEXTS.specialMemberDesignNote}</div>
        )}

        {!method && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {order.authed && (
              <Card onClick={() => patch({ designMethod: "reorder" })}>
                <MethodRow icon={PackageSearch} title={TEXTS.designMethodReorder} desc={TEXTS.designMethodReorderDesc} />
              </Card>
            )}
            {order.memberType !== "special" && (
              <Card onClick={() => patch({ designMethod: "photo" })}>
                <MethodRow icon={Camera} title={TEXTS.designMethodPhoto} desc={TEXTS.designMethodPhotoDesc} />
              </Card>
            )}
            <Card onClick={() => patch({ designMethod: "file" })}>
              <MethodRow icon={FileText} title={TEXTS.designMethodFile} desc={TEXTS.designMethodFileDesc} />
            </Card>
            {order.memberType !== "special" && (
              <Card onClick={() => patch({ designMethod: "ai" })}>
                <MethodRow icon={Wand2} title={TEXTS.designMethodAi} desc={TEXTS.designMethodAiDesc} />
              </Card>
            )}
            {order.memberType !== "special" && (
              <Card onClick={() => patch({ designMethod: "designer" })}>
                <MethodRow icon={UserCircle2} title={TEXTS.designMethodDesigner} desc={TEXTS.designMethodDesignerDesc} />
              </Card>
            )}
          </div>
        )}

        {method === "photo" && <PhotoFlow go={go} patch={patch} />}
        {method === "file" && <FileFlow go={go} patch={patch} />}
        {method === "reorder" && <ReorderFlow go={go} />}
        {method === "designer" && <DesignerRequestFlow go={go} />}
        {method === "ai" && (
          <AiFlow
            go={go} patch={patch} order={order}
            sub={aiSub} setSub={setAiSub}
            template={aiTemplate} setTemplate={setAiTemplate}
            characterCardSelected={characterCardSelected} setCharacterCardSelected={setCharacterCardSelected}
            designBriefNote={designBriefNote} setDesignBriefNote={setDesignBriefNote}
            fields={aiFields} setFields={setAiFields}
            placed={aiPlaced} setPlaced={setAiPlaced}
            logoPath={aiLogoPath} setLogoPath={setAiLogoPath}
            logoFile={logoFile} setLogoFile={setLogoFile}
            photoVariant={photoVariant} setPhotoVariant={setPhotoVariant}
            photoFile={photoFile} setPhotoFile={setPhotoFile}
            wantsLogo={wantsLogo} setWantsLogo={setWantsLogo}
            logoConceptIds={logoConceptIds} setLogoConceptIds={setLogoConceptIds}
            logoCustomText={logoCustomText} setLogoCustomText={setLogoCustomText}
            logoType={logoType} setLogoType={setLogoType}
            logoColor={logoColor} setLogoColor={setLogoColor}
            logoAdvanced={logoAdvanced} setLogoAdvanced={setLogoAdvanced}
            logoAdvancedOpen={logoAdvancedOpen} setLogoAdvancedOpen={setLogoAdvancedOpen}
            cardSize={cardSize} setCardSize={setCardSize} isFixedSizeCategory={isFixedSizeCategory}
            frontOrientation={frontOrientation} setFrontOrientation={setFrontOrientation}
            backOrientation={backOrientation} setBackOrientation={setBackOrientation}
            qrEnabled={qrEnabled} setQrEnabled={setQrEnabled}
            qrUrl={qrUrl} setQrUrl={setQrUrl}
            nameEnglish={nameEnglish} setNameEnglish={setNameEnglish}
            showContactIcon={showContactIcon} setShowContactIcon={setShowContactIcon}
            backgroundStyle={backgroundStyle} setBackgroundStyle={setBackgroundStyle}
            backLayoutChoice={backLayoutChoice} setBackLayoutChoice={setBackLayoutChoice}
            purposeOpen={purposeOpen} setPurposeOpen={setPurposeOpen}
            selectedPurpose={selectedPurpose} setSelectedPurpose={setSelectedPurpose}
            designRating={designRating} setDesignRating={setDesignRating}
            designRecorded={designRecorded} setDesignRecorded={setDesignRecorded}
            patternSelections={patternSelections} setPatternSelections={setPatternSelections}
            fontFamilyId={fontFamilyId} setFontFamilyId={setFontFamilyId}
            onStepBack={handleBack}
            isDoubleSided={isDoubleSided}
            styleSuggestion={styleSuggestion}
            selectedStyleTags={selectedStyleTags}
            setSelectedStyleTags={setSelectedStyleTags}
            styleLoading={styleLoading}
            styleError={styleError}
            companyMatch={companyMatch} setCompanyMatch={setCompanyMatch}
            companyVerifyInput={companyVerifyInput} setCompanyVerifyInput={setCompanyVerifyInput}
            companyVerifyError={companyVerifyError} setCompanyVerifyError={setCompanyVerifyError}
            verifyStage={verifyStage} setVerifyStage={setVerifyStage}
            sentCode={sentCode} setSentCode={setSentCode}
            sentAt={sentAt} setSentAt={setSentAt}
            codeInput={codeInput} setCodeInput={setCodeInput}
            codeSending={codeSending} setCodeSending={setCodeSending}
            verifiedCompanies={order.verifiedCompanies || {}}
            onVerifyCompany={(companyId) => patch({ verifiedCompanies: { ...(order.verifiedCompanies || {}), [companyId]: true } })}
            onRequestStyle={async (companyName, purpose = null) => {
              setStyleLoading(true);
              setStyleError("");
              try {
                const result = await getStyleSuggestion(companyName, purpose);
                setStyleSuggestion(result);
                setSelectedStyleTags(result.tags);
              } catch (err) {
                console.error("getStyleSuggestion 실패:", err);
                setStyleError(TEXTS.styleErrorText);
              } finally {
                setStyleLoading(false);
              }
            }}
            onApplyRecommendation={() => {
              // frameCode가 있으면 그걸 단일 진실 공급원으로 사용 — template/photoStyle을 각각
              // 따로 읽지 않고, Frame Domain의 resolveFrameCode()로 한 번에 해석합니다.
              // frameCode가 없거나(예: 이전 캐시 데이터) 해석에 실패하면 기존 개별 필드로 폴백합니다.
              const resolved = styleSuggestion?.frameCode ? resolveFrameCode(styleSuggestion.frameCode) : null;
              const template = resolved?.template || styleSuggestion?.template;
              const photoVariant = resolved?.photoVariant || styleSuggestion?.photoStyle;
              if (template) setAiTemplate(template);
              if (styleSuggestion?.color) setLogoColor(styleSuggestion.color);
              if (styleSuggestion?.font) setLogoAdvanced((prev) => ({ ...prev, font: styleSuggestion.font }));
              if (photoVariant && aiTemplate === "사진형") setPhotoVariant(photoVariant);
            }}
          />
        )}
      </div>
    </div>
  );
}

// allowUseDefault면 맨 앞에 "기본값 사용" 칩이 붙습니다 — company/person처럼
// 전체 기본 서체를 그대로 따를지, 이 요소만 다른 서체로 따로 바꿀지 고르는 용도.
// "다음" 버튼만 있던 화면 하단을 뒤로가기/다음 반반으로 나눕니다 — 화면이 길어서
// 맨 위 뒤로가기 화살표까지 스크롤하지 않아도 되도록. onBack은 상위(TopBar)와
// 같은 로직(handleBack)을 그대로 재사용합니다 — 뒤로가기 동작이 두 곳에서
// 서로 다르게 동작하는 걸 막기 위해서입니다.
function BackNextBar({ onBack, onNext, nextLabel, nextDisabled, nextIcon }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        onClick={onBack}
        style={{
          flex: 1, background: "var(--paper-white)", border: "1.5px solid var(--line)", color: "var(--ink)",
          borderRadius: 14, fontSize: 14, fontWeight: 700, padding: "12px 0", cursor: "pointer", fontFamily: "inherit",
        }}
      >
        {TEXTS.backBtnLabel}
      </button>
      <div style={{ flex: 1.4 }}>
        <PrimaryButton onClick={onNext} disabled={nextDisabled} icon={nextIcon}>{nextLabel}</PrimaryButton>
      </div>
    </div>
  );
}

function FontPickerRow({ label, selectedId, onSelect, allowUseDefault = false }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 5 }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {allowUseDefault && (
          <button
            onClick={() => onSelect(null)}
            style={{
              fontSize: 12, padding: "6px 12px", borderRadius: 999, cursor: "pointer",
              border: `1.4px solid ${!selectedId ? "var(--stamp)" : "var(--line)"}`,
              background: !selectedId ? "var(--stamp)" : "var(--paper-white)",
              color: !selectedId ? "#fff" : "var(--ink)", fontFamily: "inherit", fontWeight: 600,
            }}
          >
            {TEXTS.fontPickerUseDefault}
          </button>
        )}
        {FONT_FAMILIES.map((f) => {
          const sel = selectedId === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onSelect(f.id)}
              style={{
                fontSize: 12, padding: "6px 12px", borderRadius: 999, cursor: "pointer",
                border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                background: sel ? "var(--stamp)" : "var(--paper-white)",
                color: sel ? "#fff" : "var(--ink)",
                fontFamily: f.family, fontWeight: f.weight,
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MethodRow({ icon: Icon, title, desc }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--paper-deep)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={16} color="var(--stamp)" />
      </div>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2, lineHeight: 1.45 }}>{desc}</div>
      </div>
    </div>
  );
}

function PhotoFlow({ go, patch }) {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);

  const handleFile = (f) => { setFile(f); setConverted(false); };
  const runConvert = () => {
    setConverting(true);
    setTimeout(() => { setConverting(false); setConverted(true); }, 900);
  };

  return (
    <div>
      <UploadBox label={TEXTS.photoUploadLabel} icon={Camera} done={!!file} fileName={file?.name} onFile={handleFile} accept="image/*" />
      <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 6 }}>{TEXTS.photoUploadHint}</div>

      {file && !converted && (
        <div style={{ marginTop: 12 }}>
          <PrimaryButton icon={Wand2} disabled={converting} onClick={runConvert}>
            {converting ? TEXTS.photoConvertingBtn : TEXTS.photoConvertBtn}
          </PrimaryButton>
        </div>
      )}

      {converted && (
        <Card style={{ marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Check size={15} color="var(--stamp)" />
            <div style={{ fontSize: 12.5, fontWeight: 700 }}>{TEXTS.photoConvertedTitle}</div>
          </div>
          <div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{TEXTS.photoConvertedDesc}</div>
        </Card>
      )}

      <div style={{ marginTop: 14 }}>
        <PrimaryButton disabled={!converted} onClick={() => { patch({ specialOrderFile: file }); go("shipping"); }}>{TEXTS.photoDoneBtn}</PrimaryButton>
      </div>
    </div>
  );
}

function FileFlow({ go, patch }) {
  const [file, setFile] = useState(null);
  return (
    <div>
      <UploadBox label={TEXTS.fileUploadLabel} icon={FileText} done={!!file} fileName={file?.name} onFile={setFile} accept=".pdf,.ai,.psd,.png,.jpg,.jpeg" />
      <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 6 }}>{TEXTS.fileUploadHint}</div>
      <div style={{ marginTop: 14 }}>
        <PrimaryButton disabled={!file} onClick={() => { patch({ specialOrderFile: file }); go("shipping"); }}>{TEXTS.fileDoneBtn}</PrimaryButton>
      </div>
    </div>
  );
}

// 이미 로고를 갖고 있는 고객용 — AI 로고 생성 없이 파일만 업로드하고 바로 명함 템플릿 선택으로 넘어갑니다.
// 업로드된 로고 이미지에서 주요 색상을 클라이언트에서 직접 추출합니다 (외부 회사 카탈로그 불필요 —
// 이 사용자가 올린 파일 안에서만 계산하므로 상표권 문제가 생기지 않습니다).
function extractDominantColor(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const size = 40; // 작게 리사이즈해서 계산 비용 절감
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha < 100) continue; // 투명 픽셀 제외
          const lightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (lightness > 240 || lightness < 15) continue; // 거의 흰색/검정 배경 제외
          r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
        }
        URL.revokeObjectURL(url);
        if (count === 0) { resolve(null); return; }
        const hex = `#${[r, g, b].map((v) => Math.round(v / count).toString(16).padStart(2, "0")).join("")}`;
        resolve(hex);
      } catch {
        URL.revokeObjectURL(url);
        resolve(null); // 캔버스 접근 실패(CORS 등) 시 조용히 실패 — 필수 기능이 아니므로 흐름을 막지 않음
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function LogoUploadStep({ onBack, onNext, onExtractedColor, onFileSelected, companyName, onSaveForReuse }) {
  const [file, setFile] = useState(null);
  const [extractedColor, setExtractedColor] = useState(null);
  const [extracting, setExtracting] = useState(false);
  const [saveForReuse, setSaveForReuse] = useState(true);
  const [saving, setSaving] = useState(false);
  const [extractingLogo, setExtractingLogo] = useState(false);
  const [extractLogoError, setExtractLogoError] = useState("");
  const [wasAiExtracted, setWasAiExtracted] = useState(false);
  const [lowQualityWarning, setLowQualityWarning] = useState("");

  const applyFile = async (f, aiExtracted = false) => {
    setFile(f);
    setWasAiExtracted(aiExtracted);
    onFileSelected?.(f);
    setExtractedColor(null);
    if (f.type?.startsWith("image/")) {
      setExtracting(true);
      const color = await extractDominantColor(f);
      setExtracting(false);
      setExtractedColor(color);
      if (color) onExtractedColor?.(color);
    }
  };

  const handleFile = async (f) => {
    setExtractLogoError("");
    setLowQualityWarning("");
    await applyFile(f, false);
    // 지금까지는 "사진에서 로고 오려내기" 경로에서만 화질(해상도) 검사를 했고,
    // 파일을 직접 올리는 이 경로에는 안 붙어있었습니다 — 작은 캡처 이미지를 올려도
    // 아무 경고 없이 그대로 진행됐다는 뜻이라, 여기서도 같은 검사를 돌립니다.
    if (f.type?.startsWith("image/")) {
      const quality = await checkImageQuality(f);
      if (!quality.ok) setLowQualityWarning(TEXTS.logoLowQualityWarning);
    }
  };

  // "로고만 있는 파일"이 아니라 "로고가 일부만 포함된 사진"(명함, 안내문, 간판 사진 등)을
  // 올린 경우를 위한 보조 기능. 비전 모델에게 로고 위치만 물어보고 그 영역만 잘라냅니다.
  const handleExtractLogo = async () => {
    if (!file) return;
    setExtractingLogo(true);
    setExtractLogoError("");
    setLowQualityWarning("");
    try {
      const cropped = await extractLogoFromPhoto(file);
      if (!cropped) {
        setExtractLogoError(TEXTS.logoExtractNotFound);
      } else {
        await applyFile(cropped, true);
        // 해상도가 너무 낮으면(사진을 멀리서 찍은 경우 등) 화질 경고를 보여줍니다 —
        // 그래도 이번 명함 제작 자체는 이 파일로 계속 진행할 수 있게 막지는 않습니다.
        const quality = await checkImageQuality(cropped);
        if (!quality.ok) setLowQualityWarning(TEXTS.logoLowQualityWarning);
      }
    } catch (err) {
      console.error("로고 자동 추출 실패:", err);
      setExtractLogoError(TEXTS.logoExtractFailed);
    } finally {
      setExtractingLogo(false);
    }
  };

  const handleNext = async () => {
    if (companyName && saveForReuse && file && onSaveForReuse) {
      setSaving(true);
      try {
        await onSaveForReuse(file, wasAiExtracted);
      } catch (err) {
        console.error("회사 로고 저장 실패:", err); // 저장 실패해도 이번 명함 제작은 계속 진행
      } finally {
        setSaving(false);
      }
    }
    onNext();
  };

  return (
    <div>
      <UploadBox label={TEXTS.logoUploadLabel} icon={Upload} done={!!file} fileName={file?.name} onFile={handleFile} accept=".png,.jpg,.jpeg,.svg,.ai,.pdf" />
      <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 6 }}>{TEXTS.logoUploadHint}</div>
      {file?.type?.startsWith("image/") && (
        <div style={{ marginTop: 10 }}>
          <Card onClick={handleExtractLogo}>
            <div style={{ fontSize: 12.5, fontWeight: 600 }}>{extractingLogo ? TEXTS.logoExtracting : TEXTS.logoExtractBtn}</div>
            <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 2 }}>{TEXTS.logoExtractDesc}</div>
          </Card>
          {extractLogoError && <div style={{ fontSize: 11, color: "#d64545", marginTop: 6 }}>{extractLogoError}</div>}
          {lowQualityWarning && <div style={{ fontSize: 11, color: "#c9821a", marginTop: 6 }}>{lowQualityWarning}</div>}
        </div>
      )}
      {file && !file.type?.startsWith("image/") && (
        <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 8, background: "var(--paper-deep)", borderRadius: 8, padding: "8px 10px" }}>
          {TEXTS.logoNoPreviewNotice}
        </div>
      )}
      {extracting && <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 10 }}>{TEXTS.logoColorExtracting}</div>}
      {extractedColor && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, background: "var(--paper-deep)", borderRadius: 10, padding: "8px 10px" }}>
          <div style={{ width: 20, height: 20, borderRadius: 5, background: extractedColor, border: "1px solid var(--line)", flexShrink: 0 }} />
          <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>{TEXTS.logoColorExtracted}</div>
        </div>
      )}
      {companyName && file && (
        <label onClick={() => setSaveForReuse((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, cursor: "pointer" }}>
          <div style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${saveForReuse ? "var(--stamp)" : "var(--line)"}`, background: saveForReuse ? "var(--stamp)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {saveForReuse && <Check size={12} color="#fff" />}
          </div>
          <span style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{TEXTS.logoSaveForReuseLabel(companyName)}</span>
        </label>
      )}
      <div style={{ marginTop: 14 }}>
        <BackNextBar onBack={onBack} onNext={handleNext} nextLabel={saving ? TEXTS.logoSaving : TEXTS.logoUploadNextBtn} nextDisabled={!file || saving} />
      </div>
    </div>
  );
}

// 데모용 더미 주문 목록입니다. 실제 서비스에서는 서버에서 이 회원의 과거 주문 내역을 받아와야 합니다.
const DEMO_PAST_ORDERS = [
  { id: "BC24110032", label: "행복나라주식회사 · 프리미엄명함", date: "2025-11-03" },
  { id: "BC25030118", label: "행복나라주식회사 · 스페셜명함", date: "2025-03-18" },
];

function ReorderFlow({ go }) {
  const [picked, setPicked] = useState(null);
  return (
    <div>
      <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>{TEXTS.reorderPickPrompt}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {DEMO_PAST_ORDERS.map((o) => (
          <Card key={o.id} selected={picked === o.id} onClick={() => setPicked(o.id)}>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>{o.label}</div>
            <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 3 }}>{TEXTS.reorderOrderNoLabel} {o.id} · {o.date}</div>
          </Card>
        ))}
      </div>
      <div style={{ marginTop: 14 }}>
        <PrimaryButton disabled={!picked} onClick={() => { go("shipping"); }}>{TEXTS.reorderSubmitBtn}</PrimaryButton>
      </div>
    </div>
  );
}

function DesignerRequestFlow({ go }) {
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  return (
    <div>
      <Field label={TEXTS.designerRequestLabel}>
        <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} placeholder={TEXTS.designerRequestPlaceholder} value={note} onChange={(e) => setNote(e.target.value)} />
      </Field>
      <div style={{ marginBottom: 12 }}>
        <UploadBox label={TEXTS.designerRefUploadLabel} icon={Upload} done={!!file} fileName={file?.name} onFile={setFile} accept="image/*" />
      </div>
      <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 12, lineHeight: 1.5 }}>
        {TEXTS.designerRequestHint}
      </div>
      <PrimaryButton disabled={!note} onClick={() => { go("shipping"); }}>{TEXTS.designerSubmitBtn}</PrimaryButton>
    </div>
  );
}

// Company Resolution Engine (COMPANY_DOMAIN, resolveCompany, verifyCompanyEmail): /domain/company/companyResolver.js 로 분리됨

function BackLayoutStep({ backLayoutChoice, setBackLayoutChoice, onStepBack, order, patch, cardSize, template, photoVariant, frontOrientation, backOrientation, setBackOrientation, logoColor, go }) {
  // 뒷면 화면에서 아직 직접 고르지 않았으면 앞면과 같은 모양을 기본으로 보여주되,
  // 아래 토글을 누르면 그 값으로 독립적으로 바뀝니다(앞면을 따라가지 않게 됨).
  const effectiveBackOrientation = backOrientation || frontOrientation || "landscape";
  const [customNote, setCustomNote] = useState("");
  const [customFile, setCustomFile] = useState(null);
  const [customTags, setCustomTags] = useState([]);
  // 2026-08-01: "뒷면에 경력·홍보문구를 여러 줄로 넣고, 정렬·서체도 고르고 싶다"는
  // 요청으로 추가한 "문구형" 옵션의 상태입니다. 앞면 필드와는 완전히 독립적이라
  // 앞은 한글, 뒤는 영어처럼 다르게 써도 자연스럽게 됩니다.
  const [backText, setBackText] = useState("");
  const [backTextAlign, setBackTextAlign] = useState("center");
  const [backFontFamilyId, setBackFontFamilyId] = useState(FONT_FAMILY_DEFAULT);
  const isCustom = backLayoutChoice === "custom";
  const isText = backLayoutChoice === "text";

  const toggleTag = (tag) => setCustomTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const handleNext = () => {
    if (isCustom) {
      // "직접 설명하기"는 정해진 템플릿이 없어서 AI가 자동으로 뒷면을 만들지 않습니다 —
      // 앞면 인쇄파일은 그대로 완성해서 보내고, 뒷면 설명·참고이미지는 주문 메일의
      // 본문·첨부로 같이 보내서 사람이 직접 뒷면을 디자인하도록 합니다.
      patch({
        printFileSvg: order.frontSvgDraft, printFileName: `card-front-${Date.now()}.svg`,
        frontSvgDraft: null, logoDataUrlDraft: null,
        backCustomNote: customNote, backCustomFile: customFile, backCustomTags: customTags,
        designRecipe: { ...(order.designRecipe || {}), backLayoutChoice, backOrientation: effectiveBackOrientation, backCustomNote: customNote, backCustomTags: customTags },
      });
      // 힌트로 고른 태그를 기록합니다 — 지금은 이걸 읽어서 통계를 내는 화면이 없지만,
      // 나중에 "사진형이 41%였다" 같은 실제 데이터를 볼 수 있으려면 지금부터 쌓아둬야
      // 합니다. 업종 정보가 있으면 같이 남기고, 없어도(회사명 아직 안 정함) 태그만 기록합니다.
      recordBackContentChoice(customTags, null);
    } else {
      // 2026-08-01: 뒷면은 앞면과 물리적으로 같은 카드(그냥 뒤집은 면)이므로, 방향도
      // 반드시 같아야 합니다 — 사진 상단형/하단형처럼 앞면이 세로형이면 뒷면도 세로형.
      // 2026-08-01: 앞면과 뒷면의 카드 바깥 모양(가로/세로)은 물리적으로 같아야 하지만
      // (한 장의 카드), 안의 내용 배치 방향은 화면마다 독립적으로 고를 수 있게
      // 됐습니다 — 다만 이번 요청에서 "보통 앞뒤를 같은 모양으로 만드니 자동 회전
      // 맞춤 기능까지는 필요 없다"고 확인받아서, frontOrientation/backOrientation을
      // 각자 그대로 씁니다(서로 다르게 고르면 그 상태 그대로 인쇄파일에 반영됨).
      const frontSpec = getCardSpec(cardSize, frontOrientation || "landscape");
      const backSpec = getCardSpec(cardSize, effectiveBackOrientation);
      const backContent = isText ? { lines: backText.split("\n"), align: backTextAlign, fontFamilyId: backFontFamilyId } : null;
      const combined = buildDoubleSidedSVG(order.frontSvgDraft, backLayoutChoice, frontSpec, order.logoDataUrlDraft, logoColor, backContent, backSpec);
      patch({
        printFileSvg: combined, printFileName: `card-${Date.now()}.svg`, frontSvgDraft: null, logoDataUrlDraft: null,
        designRecipe: { ...(order.designRecipe || {}), backLayoutChoice, backOrientation: effectiveBackOrientation, ...(isText ? { backText, backTextAlign, backFontFamilyId } : {}) },
      });
    }
    go("shipping");
  };

  return (
    <div>
      <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>{TEXTS.backLayoutTitle}</div>
      {/* 2026-08-01: 뒷면 화면에도 독립적인 가로형/세로형 토글을 추가했습니다. 앞면과
          보통 같은 모양으로 하시지만(그래서 기본값은 앞면과 같게 보여줌), 원하시면
          뒷면만 다르게 고를 수 있습니다. */}
      <div style={{ fontSize: 11.5, fontWeight: 700, marginBottom: 8, color: "var(--ink-soft)" }}>{TEXTS.cardOrientationLabel}</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[["landscape", TEXTS.cardOrientationLandscape], ["portrait", TEXTS.cardOrientationPortrait]].map(([val, label]) => {
          const sel = effectiveBackOrientation === val;
          return (
            <button
              key={val}
              onClick={() => setBackOrientation(val)}
              style={{
                flex: 1, fontSize: 12.5, padding: "10px 8px", borderRadius: 10, cursor: "pointer",
                border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                background: sel ? "var(--stamp)" : "var(--paper-white)",
                color: sel ? "#fff" : "var(--ink)", fontFamily: "inherit", fontWeight: 700,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {BACK_LAYOUTS.map((b) => {
          const sel = backLayoutChoice === b.id;
          return (
            <Card key={b.id} selected={sel} onClick={() => setBackLayoutChoice(b.id)}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 54, flexShrink: 0 }}>
                  <div style={{
                    position: "relative", width: "100%", aspectRatio: "1.8 / 1",
                    border: "1.3px solid var(--ink-soft)", borderRadius: 3, background: "var(--paper-white)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {b.id === "logo" && <div style={{ width: "22%", aspectRatio: "1/1", background: "var(--gold)", borderRadius: 2 }} />}
                    {b.id === "qr" && <div style={{ width: "22%", aspectRatio: "1/1", background: "var(--ink)", borderRadius: 2 }} />}
                    {b.id === "custom" && <Upload size={16} color="var(--ink-soft)" />}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{b.label}</div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 2 }}>{b.desc}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {isText && (
        <div style={{ marginBottom: 16 }}>
          <Field label={TEXTS.backTextLabel}>
            <textarea
              style={{ ...inputStyle, minHeight: 110, resize: "vertical", lineHeight: 1.6 }}
              placeholder={TEXTS.backTextPlaceholder}
              value={backText}
              onChange={(e) => setBackText(e.target.value)}
            />
          </Field>
          <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 10, lineHeight: 1.5 }}>{TEXTS.backTextHint}</div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 5 }}>{TEXTS.backTextAlignLabel}</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[["left", TEXTS.backTextAlignLeft], ["center", TEXTS.backTextAlignCenter], ["right", TEXTS.backTextAlignRight]].map(([val, label]) => {
                const sel = backTextAlign === val;
                return (
                  <button
                    key={val}
                    onClick={() => setBackTextAlign(val)}
                    style={{
                      flex: 1, fontSize: 12, padding: "8px 0", borderRadius: 10, cursor: "pointer",
                      border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                      background: sel ? "var(--stamp)" : "var(--paper-white)",
                      color: sel ? "#fff" : "var(--ink)", fontFamily: "inherit", fontWeight: 700,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
          <FontPickerRow label={TEXTS.backTextFontLabel} selectedId={backFontFamilyId} onSelect={(id) => setBackFontFamilyId(id || FONT_FAMILY_DEFAULT)} />
        </div>
      )}
      {isCustom && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, marginBottom: 8 }}>{TEXTS.backContentTagsTitle}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {TEXTS.backContentTagOptions.map((tag) => {
              const sel = customTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    fontSize: 12, padding: "6px 12px", borderRadius: 999, cursor: "pointer",
                    border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                    background: sel ? "var(--stamp)" : "var(--paper-white)",
                    color: sel ? "#fff" : "var(--ink)", fontFamily: "inherit", fontWeight: 600,
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <Field label={TEXTS.backCustomNoteLabel}>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} placeholder={TEXTS.backCustomNotePlaceholder} value={customNote} onChange={(e) => setCustomNote(e.target.value)} />
          </Field>
          <UploadBox label={TEXTS.designerRefUploadLabel} icon={Upload} done={!!customFile} fileName={customFile?.name} onFile={setCustomFile} accept="image/*" />
          <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.5 }}>{TEXTS.backCustomHint}</div>
        </div>
      )}
      <BackNextBar onBack={onStepBack} onNext={handleNext} nextLabel={TEXTS.backLayoutNextBtn} nextDisabled={!backLayoutChoice || (isCustom && !customNote) || (isText && !backText.trim())} />
    </div>
  );
}

function AiFlow({ go, patch, order, sub, setSub, template, setTemplate, fields, setFields, placed, setPlaced, logoPath, setLogoPath, logoFile, setLogoFile, photoVariant, setPhotoVariant, photoFile, setPhotoFile, wantsLogo, setWantsLogo, logoConceptIds, setLogoConceptIds, logoCustomText, setLogoCustomText, logoType, setLogoType, logoColor, setLogoColor, logoAdvanced, setLogoAdvanced, logoAdvancedOpen, setLogoAdvancedOpen, cardSize, setCardSize, isFixedSizeCategory, frontOrientation, setFrontOrientation, backOrientation, setBackOrientation, qrEnabled, setQrEnabled, qrUrl, setQrUrl, nameEnglish, setNameEnglish, showContactIcon, setShowContactIcon, backgroundStyle, setBackgroundStyle, backLayoutChoice, setBackLayoutChoice, purposeOpen, setPurposeOpen, selectedPurpose, setSelectedPurpose, designRating, setDesignRating, designRecorded, setDesignRecorded, patternSelections, setPatternSelections, fontFamilyId, setFontFamilyId, isDoubleSided, styleSuggestion, selectedStyleTags, setSelectedStyleTags, styleLoading, styleError, onRequestStyle, onApplyRecommendation, companyMatch, setCompanyMatch, companyVerifyInput, setCompanyVerifyInput, companyVerifyError, setCompanyVerifyError, verifyStage, setVerifyStage, sentCode, setSentCode, sentAt, setSentAt, codeInput, setCodeInput, codeSending, setCodeSending, verifiedCompanies, onVerifyCompany, onStepBack, characterCardSelected, setCharacterCardSelected, designBriefNote, setDesignBriefNote }) {
  // 2026-08-01: "복잡하면 숨은그림찾기처럼 느껴진다"는 피드백으로, 위치조정을
  // "한 번에 다 보여주기"에서 "한 항목씩 안내하며 미리보기에서 직접 드래그"로
  // 바꿨습니다. adjustStepIndex가 지금 안내 중인 항목의 순서(visibleKinds 기준)이고,
  // 훅은 조건문(if sub === ...) 안이 아니라 반드시 함수 맨 위에서 무조건 호출해야
  // 합니다(Hooks 규칙) — 그래서 이 함수의 여러 분기 return들보다 위, 맨 앞에 둡니다.
  const [adjustStepIndex, setAdjustStepIndex] = useState(0);
  useEffect(() => { setAdjustStepIndex(0); }, [template]);
  if (sub === "companyName") {
    const goNext = () => {
      const typed = fields["companyName"] || "";
      const match = resolveCompany(typed);
      if (!match) {
        // 라이브러리에 없는 회사 → 기존 로고 준비 방법(AI 생성/업로드/없이 진행)으로 폴백
        setSub("logoMethod");
        return;
      }
      setCompanyMatch(match);
      if (match.status === "pending") {
        // 관리자 검토 전 로고 — 아직 신뢰할 수 없으니 공식 로고로 바로 쓰지 않고, 검토 중임을
        // 안내하며 기존 로고 준비 방법(AI 생성/업로드/없이 진행)으로 폴백합니다.
        setCompanyVerifyError(TEXTS.companyPendingNotice(match.name));
        setSub("logoMethod");
        return;
      }
      if (verifiedCompanies?.[match.id]) {
        // 이미 인증된 회사 → 다시 묻지 않고 바로 공식 로고 적용 (1회 인증 원칙)
        setLogoPath("official");
        setFields((f) => ({ ...f, companyName: match.name }));
        setSub("fields");
      } else {
        setSub("companyVerify");
      }
    };
    return (
      <div>
        {/* 2026-08-01: "기본값이 단면이라 그냥 지나치는 사람이 많다"는 요청으로 추가.
            옵션 화면에서 확인창을 한 번 띄웠지만, 여기 디자인 화면 첫 화면에서도
            한 번 더 상기시켜서, 혹시 잘못 골랐으면 여기서라도 알아채고 되돌아갈 수
            있게 합니다. */}
        <div style={{
          fontSize: 11, color: "var(--ink-soft)", background: "var(--paper-deep)",
          borderRadius: 10, padding: "9px 12px", marginBottom: 14, lineHeight: 1.6,
        }}>
          ℹ️ {isDoubleSided ? TEXTS.designModeNoticeDouble : TEXTS.designModeNoticeSingle}
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>
          {TEXTS.companyNameTitle} <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>{TEXTS.companyNameOptional}</span>
        </div>
        <input
          style={{ ...inputStyle, marginBottom: 6 }}
          placeholder={TEXTS.companyNamePlaceholder}
          value={fields["companyName"] || ""}
          onChange={(e) => setFields((f) => ({ ...f, companyName: e.target.value }))}
        />
        <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 16 }}>{TEXTS.companyNameOptionalHint}</div>
        <BackNextBar onBack={onStepBack} onNext={goNext} nextLabel={TEXTS.companyNameNextBtn} />
      </div>
    );
  }
  if (sub === "companyVerify") {
    const match = companyMatch;

    const handleSendCode = async () => {
      if (!verifyCompanyEmail(companyVerifyInput, match)) {
        setCompanyVerifyError(TEXTS.companyVerifyFailTitle);
        return;
      }
      setCompanyVerifyError("");
      setCodeSending(true);
      try {
        const code = generateVerificationCode();
        await sendVerificationEmail(companyVerifyInput, code);
        setSentCode(code);
        setSentAt(Date.now());
        setCodeInput("");
        setVerifyStage("code");
      } catch (err) {
        console.error("인증코드 발송 실패:", err);
        setCompanyVerifyError(TEXTS.companyVerifySendFailTitle);
      } finally {
        setCodeSending(false);
      }
    };

    const handleConfirmCode = () => {
      const result = checkVerificationCode(codeInput, sentCode, sentAt);
      if (result.ok) {
        onVerifyCompany?.(match.id);
        setLogoPath("official");
        setFields((f) => ({ ...f, companyName: match.name }));
        setCompanyVerifyError("");
        setSub("fields");
      } else {
        setCompanyVerifyError(result.reason === "expired" ? TEXTS.companyVerifyCodeExpired : TEXTS.companyVerifyCodeMismatch);
      }
    };

    if (verifyStage === "code") {
      return (
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 4 }}>{TEXTS.companyVerifyCodeTitle(companyVerifyInput)}</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginBottom: 16, lineHeight: 1.5 }}>{TEXTS.companyVerifyCodeDesc}</div>
          <Field label={TEXTS.companyVerifyCodeLabel}>
            <input
              style={inputStyle}
              inputMode="numeric"
              maxLength={6}
              placeholder={TEXTS.companyVerifyCodePlaceholder}
              value={codeInput}
              onChange={(e) => { setCodeInput(e.target.value.replace(/\D/g, "")); setCompanyVerifyError(""); }}
            />
          </Field>
          <div style={{ fontSize: 10.5, color: "var(--stamp)", fontWeight: 600, marginBottom: 16 }}>{TEXTS.companyVerifyOnceNotice}</div>
          {companyVerifyError && <div style={{ fontSize: 11, color: "#d64545", marginBottom: 10 }}>{companyVerifyError}</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <BackNextBar onBack={onStepBack} onNext={handleConfirmCode} nextLabel={TEXTS.companyVerifyCodeBtn} nextDisabled={codeInput.length !== 6} />
            <Card onClick={handleSendCode}>
              <div style={{ fontSize: 12.5, fontWeight: 600, textAlign: "center", color: "var(--ink-soft)" }}>{TEXTS.companyVerifyResendBtn}</div>
            </Card>
            <Card onClick={() => { setVerifyStage("email"); setSentCode(null); setSentAt(null); setCompanyVerifyError(""); }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, textAlign: "center", color: "var(--ink-soft)" }}>{TEXTS.companyVerifyChangeEmailBtn}</div>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 4 }}>{TEXTS.companyMatchFoundTitle(match?.name)}</div>
        <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginBottom: 8, lineHeight: 1.5 }}>{TEXTS.companyMatchFoundDesc}</div>
        <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 16, lineHeight: 1.5 }}>{TEXTS.companyVerifyPurposeNotice}</div>
        <Field label={TEXTS.companyVerifyEmailLabel}>
          <input
            style={inputStyle}
            type="email"
            placeholder={TEXTS.companyVerifyEmailPlaceholder}
            value={companyVerifyInput}
            onChange={(e) => { setCompanyVerifyInput(e.target.value); setCompanyVerifyError(""); }}
          />
        </Field>
        <div style={{ fontSize: 10.5, color: "var(--stamp)", fontWeight: 600, marginBottom: 16 }}>{TEXTS.companyVerifyOnceNotice}</div>
        {companyVerifyError && (
          <div style={{ fontSize: 11, color: "#d64545", marginBottom: 10 }}>
            {companyVerifyError} — {TEXTS.companyVerifyFailDesc}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <BackNextBar
            onBack={onStepBack}
            onNext={handleSendCode}
            nextLabel={codeSending ? TEXTS.companyVerifySending : TEXTS.companyVerifyBtn}
            nextDisabled={!companyVerifyInput || codeSending}
          />
          <Card onClick={() => setSub("logoMethod")}>
            <div style={{ fontSize: 12.5, fontWeight: 600, textAlign: "center", color: "var(--ink-soft)" }}>{TEXTS.companyVerifySkipBtn}</div>
          </Card>
        </div>
      </div>
    );
  }
  if (sub === "logoMethod") {
    const openLogoSearch = () => {
      const q = encodeURIComponent(`${fields["companyName"] || ""} 로고`.trim());
      window.open(`https://www.google.com/search?tbm=isch&q=${q}`, "_blank", "noopener,noreferrer");
      setLogoPath("upload"); // 검색 후 결국 파일로 저장해서 올리는 것이므로 기존 업로드 흐름 재사용
      setSub("logoUpload");
    };
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {companyVerifyError && companyMatch?.status === "pending" && (
          <div style={{ fontSize: 11.5, color: "var(--ink-soft)", background: "rgba(108,76,240,0.06)", borderRadius: 10, padding: "10px 12px", marginBottom: 4 }}>
            {companyVerifyError}
          </div>
        )}
        <Card onClick={openLogoSearch}><MethodRow icon={Search} title={TEXTS.designMethodLogoSearch} desc={TEXTS.designMethodLogoSearchDesc} /></Card>
        <Card onClick={() => { setLogoPath("ai"); setSub("logoType"); }}><MethodRow icon={Wand2} title={TEXTS.designMethodLogoAi} desc={TEXTS.designMethodLogoAiDesc} /></Card>
        <Card onClick={() => { setLogoPath("upload"); setSub("logoUpload"); }}><MethodRow icon={Upload} title={TEXTS.designMethodLogoUpload} desc={TEXTS.designMethodLogoUploadDesc} /></Card>
        <Card onClick={() => { setLogoPath("none"); setSub("fields"); }}><MethodRow icon={FileText} title={TEXTS.logoSkipTitle} desc={TEXTS.logoSkipDesc} /></Card>
      </div>
    );
  }
  if (sub === "logoUpload") {
    return (
      <LogoUploadStep
        onBack={onStepBack}
        onNext={() => setSub("fields")}
        onExtractedColor={(hex) => setLogoColor(hex)}
        onFileSelected={setLogoFile}
        companyName={!companyMatch ? fields["companyName"] : null}
        onSaveForReuse={async (file, wasAiExtracted) => {
          const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          await registerCompany({ name: fields["companyName"], logo: dataUrl, source: wasAiExtracted ? "ai_extracted" : "user_uploaded" });
        }}
      />
    );
  }
  if (sub === "logoType") {
    return (
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>{TEXTS.aiLogoTypeTitle}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {LOGO_TYPES.map((t) => {
            const sel = logoType === t.id;
            return (
              <div key={t.id} onClick={() => setLogoType(t.id)} style={{
                border: `1.5px solid ${sel ? "var(--stamp)" : "var(--line)"}`, borderRadius: 12,
                padding: "12px 10px", cursor: "pointer",
                background: sel ? "rgba(108,76,240,0.06)" : "var(--paper-white)",
              }}>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>{t.label}</div>
                <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 3 }}>{t.desc}</div>
              </div>
            );
          })}
        </div>
        <BackNextBar onBack={onStepBack} onNext={() => setSub("logoAi")} nextLabel={TEXTS.aiLogoTypeNextBtn} nextDisabled={!logoType} />
      </div>
    );
  }
  if (sub === "logoAi") {
    const toggleConcept = (id) => {
      setLogoConceptIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    };
    const setAdvanced = (key, value) => setLogoAdvanced((prev) => ({ ...prev, [key]: value }));
    const canSubmitLogo = logoConceptIds.length > 0 || logoCustomText.trim().length > 0;
    return (
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>{TEXTS.aiLogoConceptsLabel}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {LOGO_CONCEPTS.map((c) => {
            const sel = logoConceptIds.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleConcept(c.id)}
                style={{
                  fontSize: 12.5, padding: "8px 13px", borderRadius: 999, cursor: "pointer",
                  border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                  background: sel ? "var(--stamp)" : "var(--paper-white)",
                  color: sel ? "#fff" : "var(--ink)",
                  fontFamily: "inherit", fontWeight: 600,
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>{TEXTS.aiLogoColorLabel}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {LOGO_COLORS.map((c) => {
            const sel = logoColor === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setLogoColor(c.id)}
                style={{
                  fontSize: 12.5, padding: "8px 13px", borderRadius: 999, cursor: "pointer",
                  border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                  background: sel ? "var(--stamp)" : "var(--paper-white)",
                  color: sel ? "#fff" : "var(--ink)",
                  fontFamily: "inherit", fontWeight: 600,
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <Field label={TEXTS.aiLogoCustomLabel}>
          <textarea
            style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
            placeholder={TEXTS.aiLogoCustomPlaceholder}
            value={logoCustomText}
            onChange={(e) => setLogoCustomText(e.target.value)}
          />
        </Field>

        <button
          onClick={() => setLogoAdvancedOpen((v) => !v)}
          style={{
            display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer",
            fontFamily: "inherit", fontSize: 12, fontWeight: 700, color: "var(--stamp)", padding: "4px 0", marginBottom: 10,
          }}
        >
          {logoAdvancedOpen ? TEXTS.aiLogoAdvancedToggleClose : TEXTS.aiLogoAdvancedToggleOpen}
        </button>

        {logoAdvancedOpen && (
          <Card style={{ background: "var(--paper-deep)", border: "none", marginBottom: 16 }}>
            {LOGO_ADVANCED_GROUPS.map((group) => (
              <div key={group.key} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6 }}>{group.label}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {group.options.map((opt) => {
                    const sel = logoAdvanced[group.key] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setAdvanced(group.key, opt)}
                        style={{
                          fontSize: 11, padding: "6px 10px", borderRadius: 999, cursor: "pointer",
                          border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                          background: sel ? "var(--stamp)" : "var(--paper-white)",
                          color: sel ? "#fff" : "var(--ink)",
                          fontFamily: "inherit", fontWeight: 600,
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </Card>
        )}

        <BackNextBar onBack={onStepBack} onNext={() => setSub("fields")} nextLabel={TEXTS.aiLogoSubmitBtn} nextDisabled={!canSubmitLogo} nextIcon={Wand2} />
      </div>
    );
  }
  if (sub === "template") {
    const allTemplateCards = [...TEMPLATES, "사진형"];
    return (
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>{TEXTS.aiTemplatePickTitle}</div>
        <div style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 12 }}>{TEXTS.aiTemplatePickDesc}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {allTemplateCards.map((t) => {
            const isSelected = template === t && (t !== "사진형" || !characterCardSelected);
            return (
            <div key={t} onClick={() => { setTemplate(t); setCharacterCardSelected(false); }} style={{
              border: `1.5px solid ${isSelected ? "var(--stamp)" : "var(--line)"}`, borderRadius: 12,
              padding: "10px 10px 12px", cursor: "pointer", textAlign: "center",
              background: isSelected ? "rgba(108,76,240,0.06)" : "var(--paper-white)",
            }}>
              <div style={{ marginBottom: 8 }}>
                {/* 2026-08-02: 실제 샘플 사진(TEMPLATE_SAMPLE_IMAGES)을 그대로 씁니다 —
                    "학원·병원·정치인 등 실제 예시가 들어있어도, AI가 그 텍스트를
                    참조하지만 않으면 된다. 샘플은 레이아웃 참고용이고, 디자인
                    작업의 핵심 참고 내용은 고객이 입력한 정보뿐이다"라고 확인
                    받았습니다. 실제로 이 이미지는 <img>로 화면에 보여주기만 할 뿐,
                    OCR이나 텍스트 추출을 거쳐 프롬프트나 디자인 로직에 값으로
                    들어가는 경로 자체가 없어서 이 원칙은 구조적으로 지켜집니다. */}
                {TEMPLATE_SAMPLE_IMAGES[t] ? (
                  <img src={TEMPLATE_SAMPLE_IMAGES[t]} alt={t} style={{ width: "100%", aspectRatio: "1.8 / 1", objectFit: "cover", borderRadius: 6, border: "1px solid var(--line)", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }} />
                ) : (
                  <CardLayoutPreview templateName={t} photoVariant={PHOTO_TEMPLATES[0]} fields={fields} cardSize={cardSize} logoColor={logoColor} orientation={frontOrientation} compact />
                )}
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 700 }}>{TEXTS.templateDisplayLabel[t] || t}</div>
            </div>
            );
          })}
          {/* "사진찍으면 캐릭터로 변환"은 아직 실제 변환 AI가 없어서, 지금은 기존
              "사진형"과 똑같은 흐름(사진 업로드)으로 연결됩니다. 실제로 캐릭터 변환이
              되는 것처럼 보이면 안 되니 "준비중" 표시를 남겨둡니다. */}
          <div key="캐릭터변환형" onClick={() => { setTemplate("사진형"); setCharacterCardSelected(true); }} style={{
            border: `1.5px solid ${template === "사진형" && characterCardSelected ? "var(--stamp)" : "var(--line)"}`, borderRadius: 12,
            padding: "10px 10px 12px", cursor: "pointer", textAlign: "center", position: "relative",
            background: template === "사진형" && characterCardSelected ? "rgba(108,76,240,0.06)" : "var(--paper-white)",
          }}>
            <div style={{
              position: "absolute", top: 6, right: 6, fontSize: 9, fontWeight: 700, color: "#fff",
              background: "var(--ink-soft)", borderRadius: 999, padding: "2px 7px",
            }}>
              {TEXTS.comingSoonBadge}
            </div>
            <div style={{ marginBottom: 8 }}>
              <img src={TEMPLATE_SAMPLE_IMAGES["캐릭터변환형"]} alt="캐릭터변환형" style={{ width: "100%", aspectRatio: "1.8 / 1", objectFit: "cover", borderRadius: 6, border: "1px solid var(--line)", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }} />
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 700 }}>사진찍으면캐릭터변환형</div>
          </div>
        </div>
        {/* 2026-08-02: 템플릿별 자유 서술 게시판 — "업종특성 맞춘 디자인 캐릭터"는
            원하는 캐릭터를, "자유형"은 원하는 디자인 전체를 설명하도록 안내 문구가
            다릅니다. 다른 템플릿을 고르면 이 블록 자체가 안 보입니다. */}
        {(template === "회사이름강조형" || template === "자유형") && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
              {template === "회사이름강조형" ? TEXTS.characterBriefLabel : TEXTS.freeformBriefLabel}
            </div>
            <textarea
              style={{ ...inputStyle, minHeight: 90, resize: "vertical", lineHeight: 1.6 }}
              placeholder={template === "회사이름강조형" ? TEXTS.characterBriefPlaceholder : TEXTS.freeformBriefPlaceholder}
              value={designBriefNote}
              onChange={(e) => setDesignBriefNote(e.target.value)}
            />
          </div>
        )}
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{TEXTS.cardSizeLabel}</div>
        {isFixedSizeCategory ? (
          <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginBottom: 16, background: "var(--paper-deep)", borderRadius: 10, padding: "10px 12px" }}>
            {TEXTS.cardSizeFixedNote}
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {CARD_SIZE_PRESETS.filter((p) => p.id !== "creditCard").map((p) => {
              const sel = cardSize === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setCardSize(p.id)}
                  style={{
                    fontSize: 12, padding: "8px 12px", borderRadius: 999, cursor: "pointer",
                    border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                    background: sel ? "var(--stamp)" : "var(--paper-white)",
                    color: sel ? "#fff" : "var(--ink)",
                    fontFamily: "inherit", fontWeight: 600,
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        )}
        {/* 2026-08-01: "가로형/세로형은 사진 유무와 상관없는 개인 취향"이라는 피드백으로
            추가 — 어떤 템플릿을 고르든 상관없이 카드 모양을 직접 정할 수 있습니다.
            사진 상단형/하단형을 고르면 세로형이 기본으로 제안되지만(위 useEffect),
            여기서 언제든 가로형으로 바꿀 수 있습니다. */}
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{TEXTS.cardOrientationLabel}</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[["landscape", TEXTS.cardOrientationLandscape], ["portrait", TEXTS.cardOrientationPortrait]].map(([val, label]) => {
            const sel = frontOrientation === val;
            return (
              <button
                key={val}
                onClick={() => setFrontOrientation(val)}
                style={{
                  flex: 1, fontSize: 12.5, padding: "10px 8px", borderRadius: 10, cursor: "pointer",
                  border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                  background: sel ? "var(--stamp)" : "var(--paper-white)",
                  color: sel ? "#fff" : "var(--ink)", fontFamily: "inherit", fontWeight: 700,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <BackNextBar onBack={onStepBack} onNext={() => setSub(template === "사진형" ? "photoTemplate" : "companyName")} nextLabel={TEXTS.aiTemplateNextBtn} nextDisabled={!template} />
      </div>
    );
  }
  if (sub === "photoTemplate") {
    // 2026-08-02: "지금 가로형을 골랐으면 가로형 샘플만 보여야 한다"는 요청 반영 —
    // frontOrientation에 따라 보여줄 목록 자체를 바꿉니다(세로형은 여전히 보류
    // 상태라 상단형/하단형 2개만 그대로 둠).
    const variantsForOrientation = frontOrientation === "portrait" ? PHOTO_TEMPLATES_PORTRAIT : PHOTO_TEMPLATES_LANDSCAPE;
    return (
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>{TEXTS.photoTemplateTitle}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {variantsForOrientation.map((t) => (
            <div key={t} onClick={() => setPhotoVariant(t)} style={{
              border: `1.5px solid ${photoVariant === t ? "var(--stamp)" : "var(--line)"}`, borderRadius: 12,
              padding: "10px 10px 12px", cursor: "pointer", textAlign: "center",
              background: photoVariant === t ? "rgba(108,76,240,0.06)" : "var(--paper-white)",
            }}>
              <div style={{ marginBottom: 8 }}>
                {/* 2026-08-02: 위 템플릿 픽커와 같은 원칙 — 샘플 텍스트는 참조 대상이
                    아니라 레이아웃 참고용이므로 실제 사진을 그대로 씁니다. */}
                {PHOTO_VARIANT_SAMPLE_IMAGES[t] ? (
                  <img src={PHOTO_VARIANT_SAMPLE_IMAGES[t]} alt={t} style={{ width: "100%", aspectRatio: "1.8 / 1", objectFit: "cover", borderRadius: 6, border: "1px solid var(--line)", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }} />
                ) : (
                  <CardLayoutPreview templateName="사진형" photoVariant={t} fields={fields} cardSize={cardSize} logoColor={logoColor} orientation={frontOrientation} compact />
                )}
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 700 }}>{t}</div>
            </div>
          ))}
        </div>
        <BackNextBar onBack={onStepBack} onNext={() => setSub("photoUpload")} nextLabel={TEXTS.photoTemplateNextBtn} nextDisabled={!photoVariant} />
      </div>
    );
  }
  if (sub === "photoUpload") {
    return (
      <div>
        <UploadBox label={TEXTS.photoUploadStepLabel} icon={Camera} done={!!photoFile} fileName={photoFile?.name} onFile={setPhotoFile} accept="image/*" />
        <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 6, marginBottom: 14 }}>{TEXTS.photoUploadStepHint}</div>
        <BackNextBar onBack={onStepBack} onNext={() => setSub("logoDecision")} nextLabel={TEXTS.photoUploadNextBtn} nextDisabled={!photoFile} />
      </div>
    );
  }
  if (sub === "logoDecision") {
    return (
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>{TEXTS.logoDecisionTitle}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Card selected={wantsLogo === true} onClick={() => setWantsLogo(true)}>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>{TEXTS.logoDecisionYes}</div>
            <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 3 }}>{TEXTS.logoDecisionYesDesc}</div>
          </Card>
          <Card selected={wantsLogo === false} onClick={() => setWantsLogo(false)}>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>{TEXTS.logoDecisionNo}</div>
            <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 3 }}>{TEXTS.logoDecisionNoDesc}</div>
          </Card>
        </div>
        <div style={{ marginTop: 16 }}>
          <BackNextBar
            onBack={onStepBack}
            onNext={() => setSub(wantsLogo ? "companyName" : "fields")}
            nextLabel={TEXTS.logoDecisionNextBtn}
            nextDisabled={wantsLogo === null}
          />
        </div>
      </div>
    );
  }
  if (sub === "fields") {
    const otherFields = FIELD_DEFINITIONS.filter((d) => d.key !== "companyName");
    const toggleTag = (tag) => {
      setSelectedStyleTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
    };
    return (
      <div>
        {logoPath === "official" && companyMatch && (
          <div style={{ fontSize: 11, color: "var(--stamp)", fontWeight: 600, marginBottom: 10 }}>
            ✓ {TEXTS.companyAlreadyVerifiedNotice(companyMatch.name)}
          </div>
        )}
        <Field label={TEXTS.fieldCompanyLabel}>
          <input style={inputStyle} placeholder={`${TEXTS.fieldCompanyLabel} 입력`} value={fields["companyName"] || ""} onChange={(e) => setFields((f) => ({ ...f, companyName: e.target.value }))} />
        </Field>

        <Card style={{ background: "var(--paper-deep)", border: "none", marginBottom: 14 }}>
          {!styleSuggestion && !styleLoading && (
            <>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 4, lineHeight: 1.5 }}>
                {TEXTS.styleIntro}
              </div>
              <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 10, lineHeight: 1.5 }}>
                {TEXTS.styleIntroPrivacyNote}
              </div>
              <PrimaryButton
                disabled={!fields["companyName"]}
                icon={Wand2}
                onClick={() => onRequestStyle(fields["companyName"])}
              >
                {TEXTS.styleRequestBtn}
              </PrimaryButton>
            </>
          )}
          {styleLoading && (
            <div style={{ fontSize: 12.5, color: "var(--ink-soft)", textAlign: "center", padding: "6px 0" }}>{TEXTS.styleLoadingText}</div>
          )}
          {styleError && <div style={{ fontSize: 11.5, color: "#E23E62", marginTop: 8 }}>{styleError}</div>}
          {styleSuggestion && (
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>
                {TEXTS.styleIndustryPrefix} <span style={{ color: "var(--stamp)" }}>{styleSuggestion.industry}</span>
              </div>
              <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 10 }}>
                {styleSuggestion.source === "cache" ? TEXTS.styleSourceCache : TEXTS.styleSourceAi} {TEXTS.styleCheckHint}
              </div>
              {styleSuggestion.reasons?.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                  {styleSuggestion.reasons.map((reason, i) => (
                    <span key={i} style={{
                      fontSize: 10.5, padding: "4px 9px", borderRadius: 999,
                      background: "rgba(108,76,240,0.08)", color: "var(--stamp)", fontWeight: 600,
                    }}>
                      {reason}
                    </span>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {styleSuggestion.tags.map((tag) => {
                  const checked = selectedStyleTags.includes(tag);
                  return (
                    <label key={tag} onClick={() => toggleTag(tag)} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, cursor: "pointer",
                      border: `1.4px solid ${checked ? "var(--stamp)" : "var(--line)"}`,
                      background: checked ? "rgba(108,76,240,0.06)" : "var(--paper-white)",
                    }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${checked ? "var(--stamp)" : "var(--line)"}`, background: checked ? "var(--stamp)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {checked && <Check size={12} color="#fff" />}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{tag}</span>
                    </label>
                  );
                })}
              </div>
              {(styleSuggestion.color || styleSuggestion.font || styleSuggestion.photoStyle) && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
                  <div style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 8 }}>
                    {TEXTS.aiRecommendExtra(
                      null,
                      LOGO_COLORS.find((c) => c.id === styleSuggestion.color)?.label || null,
                      styleSuggestion.font || null,
                      template === "사진형" ? styleSuggestion.photoStyle : null
                    )}
                  </div>
                  <button
                    onClick={onApplyRecommendation}
                    style={{
                      width: "100%", background: "var(--paper-white)", border: "1.4px solid var(--stamp)", color: "var(--stamp)",
                      borderRadius: 10, fontSize: 12, fontWeight: 700, padding: "9px 0", cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    {TEXTS.aiApplyRecommendationBtn}
                  </button>
                </div>
              )}

              {/* Step 5 (고급 옵션, 기본 흐름에는 포함하지 않음): 목적을 추가로 넣으면 더 세분화된 추천을 받을 수 있어요 */}
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
                <button
                  onClick={() => setPurposeOpen((v) => !v)}
                  style={{
                    display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer",
                    fontFamily: "inherit", fontSize: 11.5, fontWeight: 700, color: "var(--stamp)", padding: 0,
                  }}
                >
                  {purposeOpen ? TEXTS.purposeToggleClose : TEXTS.purposeToggleOpen}
                </button>
                {purposeOpen && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 8 }}>{TEXTS.purposeHint}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                      {PURPOSE_OPTIONS.map((p) => {
                        const sel = selectedPurpose === p;
                        return (
                          <button
                            key={p}
                            onClick={() => setSelectedPurpose(p)}
                            style={{
                              fontSize: 11.5, padding: "7px 11px", borderRadius: 999, cursor: "pointer",
                              border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                              background: sel ? "var(--stamp)" : "var(--paper-white)",
                              color: sel ? "#fff" : "var(--ink)",
                              fontFamily: "inherit", fontWeight: 600,
                            }}
                          >
                            {p}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => onRequestStyle(fields["companyName"], selectedPurpose)}
                      disabled={!selectedPurpose || styleLoading}
                      style={{
                        width: "100%", background: "var(--stamp)", border: "none", color: "#fff",
                        borderRadius: 10, fontSize: 12, fontWeight: 700, padding: "9px 0",
                        cursor: selectedPurpose ? "pointer" : "not-allowed", fontFamily: "inherit",
                        opacity: selectedPurpose ? 1 : 0.5,
                      }}
                    >
                      {TEXTS.purposeRefineBtn}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>

        {otherFields.map((def) => {
          const value = fields[def.key] || "";
          // 개인 메일(gmail/naver 등)을 쓰면 안 되는 건 아니지만 — 회사 인증 기능은
          // 이런 도메인을 아예 인증 대상으로 안 받아줍니다(companyResolver.js 참고).
          // 막지는 않고, 참고할 수 있게 살짝만 안내합니다.
          const showEmailDomainTip = def.key === "email" && value.includes("@") && isPersonalEmailDomain(value.split("@")[1]);
          return (
            <Field key={def.key} label={TEXTS[def.labelKey]}>
              <input style={inputStyle} placeholder={`${TEXTS[def.labelKey]} 입력`} value={value} onChange={(e) => setFields((f) => ({ ...f, [def.key]: e.target.value }))} />
              {showEmailDomainTip && <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 4 }}>{TEXTS.personalEmailTip}</div>}
            </Field>
          );
        })}

        <Card style={{ background: "var(--paper-deep)", border: "none", marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>{TEXTS.cardFinishTitle}</div>

          <label onClick={() => setNameEnglish((v) => (v === null ? "" : v))} style={{ display: "block", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: nameEnglish ? 6 : 0 }}>
              <input type="checkbox" checked={nameEnglish !== ""} readOnly style={{ width: 16, height: 16, accentColor: "var(--stamp)" }} onClick={(e) => { e.stopPropagation(); setNameEnglish((v) => (v ? "" : " ")); }} />
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>{TEXTS.nameEnglishToggle}</span>
            </div>
            {nameEnglish !== "" && (
              <input
                style={inputStyle}
                placeholder={TEXTS.nameEnglishPlaceholder}
                value={nameEnglish.trim()}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setNameEnglish(e.target.value || " ")}
              />
            )}
          </label>

          <div onClick={() => setShowContactIcon((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, cursor: "pointer" }}>
            <input type="checkbox" checked={showContactIcon} readOnly style={{ width: 16, height: 16, accentColor: "var(--stamp)" }} />
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>{TEXTS.contactIconToggle}</span>
          </div>

          <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6 }}>{TEXTS.backgroundStyleLabel}</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {BACKGROUND_STYLE_OPTIONS.map((b) => {
              const sel = backgroundStyle === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setBackgroundStyle(b.id)}
                  style={{
                    fontSize: 11, padding: "6px 10px", borderRadius: 999, cursor: "pointer",
                    border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                    background: sel ? "var(--stamp)" : "var(--paper-white)",
                    color: sel ? "#fff" : "var(--ink)",
                    fontFamily: "inherit", fontWeight: 600,
                  }}
                >
                  {b.label}
                </button>
              );
            })}
          </div>

          <div onClick={() => setQrEnabled((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: qrEnabled ? 8 : 0, cursor: "pointer" }}>
            <input type="checkbox" checked={qrEnabled} readOnly style={{ width: 16, height: 16, accentColor: "var(--stamp)" }} />
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>{TEXTS.qrToggleLabel}</span>
          </div>
          {qrEnabled && (
            <input
              style={inputStyle}
              placeholder={TEXTS.qrUrlPlaceholder}
              value={qrUrl}
              onChange={(e) => setQrUrl(e.target.value)}
            />
          )}
        </Card>

        <BackNextBar onBack={onStepBack} onNext={() => setSub("layout")} nextLabel={TEXTS.aiFieldsNextBtn} />
      </div>
    );
  }
  if (sub === "layout") {
    const cpCheck = validateCP(fields);
    // 2026-08-01: "한 번에 하나씩만 안내하고, 위치는 미리보기에서 직접 드래그하게
    // 해달라"는 요청으로 추가. visibleKinds는 지금 채워진(보여줄 필요가 있는)
    // 항목만 걸러낸 순서 목록이고, currentKind가 지금 안내 중인 항목입니다. 이
    // 값을 CardLayoutPreview(interactiveKind)와 아래 안내 패널이 똑같이 사용하므로
    // "미리보기에서 지금 움직일 수 있는 것"과 "안내 문구가 말하는 것"이 항상 같습니다.
    const logoOptedOut = template === "사진형" ? wantsLogo !== true : logoPath === "none";
    const CONTACT_FILLED_CHECK = {
      mobile: () => !!fields?.mobile?.trim(),
      telephoneFax: () => !!(fields?.telephone?.trim() || fields?.fax?.trim()),
      address: () => !!fields?.address?.trim(),
      email: () => !!fields?.email?.trim(),
      website: () => !!fields?.website?.trim(),
      etc: () => !!fields?.etc?.trim(),
    };
    const hasPhoto = template === "사진형";
    const visibleKinds = patternSelections
      ? [
          ...(hasPhoto ? ["photo"] : []),
          ...ALL_PATTERN_KINDS.filter((kind) => {
            if (kind === "logo" && logoOptedOut) return false;
            if (CONTACT_FILLED_CHECK[kind] && !CONTACT_FILLED_CHECK[kind]()) return false;
            return true;
          }),
        ]
      : [];
    const clampedStepIndex = Math.min(adjustStepIndex, Math.max(visibleKinds.length - 1, 0));
    const currentKind = (!placed && patternSelections && visibleKinds.length > 0) ? visibleKinds[clampedStepIndex] : null;
    const currentKindLabel = currentKind ? (TEXTS.patternKindShortLabel[currentKind] || currentKind) : "";
    const isFirstStep = clampedStepIndex === 0;
    const isLastStep = clampedStepIndex >= visibleKinds.length - 1;
    const nextKindLabel = !isLastStep ? (TEXTS.patternKindShortLabel[visibleKinds[clampedStepIndex + 1]] || "") : "";
    const goToAdjustStep = (idx) => setAdjustStepIndex(Math.min(Math.max(idx, 0), Math.max(visibleKinds.length - 1, 0)));
    const handleDragKindMove = (kind, dxMm, dyMm) => {
      if (kind === "photo") {
        // 2026-08-02: "사진형도 위치를 옮길 수 있게 해달라"는 요청 반영. 다만 사진형은
        // 절반/전체를 차지하는 큰 구도라서, 로고·텍스트처럼 자유롭게 움직이면 오히려
        // 의도한 구도(좌우 절반, 상하 절반 등)가 무너집니다 — 그래서 ±PHOTO_MOVE_LIMIT_MM
        // (미세조정 수준)로만 움직이게 제한합니다.
        setPatternSelections((prev) => {
          const cur = prev.photoFineOffsetMm || { x: 0, y: 0 };
          const clamp = (v) => Math.max(-PHOTO_MOVE_LIMIT_MM, Math.min(PHOTO_MOVE_LIMIT_MM, v));
          return { ...prev, photoFineOffsetMm: { x: clamp(cur.x + dxMm), y: clamp(cur.y + dyMm) } };
        });
        return;
      }
      setPatternSelections((prev) => {
        const fine = prev[`${kind}FineOffsetMm`] || {};
        return { ...prev, [`${kind}FineOffsetMm`]: { x: (fine.x || 0) + dxMm, y: (fine.y || 0) + dyMm } };
      });
    };
    const tiers = ["sm", "md", "lg"];
    const currentLogoTier = patternSelections?.logoSize || "md";
    const stepLogoTier = (dir) => {
      const idx = Math.min(Math.max(tiers.indexOf(currentLogoTier) + dir, 0), tiers.length - 1);
      setPatternSelections((prev) => ({ ...prev, logoSize: tiers[idx] }));
    };
    const currentPointSize = currentKind ? (patternSelections?.[`${currentKind}PointSize`] || POINT_SIZE_DEFAULT[currentKind]) : POINT_SIZE_DEFAULT.company;
    const stepPointSize = (dir) => {
      if (!currentKind) return;
      const next = Math.min(Math.max(currentPointSize + dir, POINT_SIZE_RANGE.min), POINT_SIZE_RANGE.max);
      setPatternSelections((prev) => ({ ...prev, [`${currentKind}PointSize`]: next }));
    };
    // 사진형 배율 조절 — 5%씩, PHOTO_SCALE_RANGE(0.85~1.2) 안에서만.
    const currentPhotoScale = patternSelections?.photoScale || 1;
    const stepPhotoScale = (dir) => {
      const next = Math.round(Math.min(Math.max(currentPhotoScale + dir * 0.05, PHOTO_SCALE_RANGE.min), PHOTO_SCALE_RANGE.max) * 100) / 100;
      setPatternSelections((prev) => ({ ...prev, photoScale: next }));
    };
    return (
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>{TEXTS.aiLayoutTitle}</div>
        <CardLayoutPreview
          templateName={template}
          photoVariant={photoVariant}
          photoFile={photoFile}
          showLogo={template === "사진형" ? wantsLogo === true : logoPath !== "none"}
          fields={fields}
          cardSize={cardSize}
          orientation={frontOrientation}
          qrEnabled={qrEnabled}
          qrUrl={qrUrl}
          nameEnglish={nameEnglish}
          showContactIcon={showContactIcon}
          backgroundStyle={backgroundStyle}
          logoColor={logoColor}
          logoFile={logoFile}
          patternSelections={patternSelections}
          fontFamilyId={fontFamilyId}
          interactiveKind={currentKind}
          onDragKindMove={handleDragKindMove}
          onSelectKind={(kind) => {
            // 2026-08-01: "핸드폰 위치를 옮기다가 마음이 바뀌면, '이전'을 여러 번
            // 누르지 않고 바로 그 항목을 눌러서 옮길 수 있어야 한다"는 요청 반영.
            // 미리보기에서 어떤 요소를 누르든, 안내 단계(adjustStepIndex)를 그
            // 항목으로 즉시 이동시킵니다 — 순서대로 진행하는 것도 여전히 되고,
            // 마음대로 아무거나 먼저 눌러도 됩니다.
            const idx = visibleKinds.indexOf(kind);
            if (idx >= 0) setAdjustStepIndex(idx);
          }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", margin: "10px 0", fontSize: 10, color: "var(--ink-soft)" }}>
          <span>┄ {TEXTS.legendSafeArea}</span>
        </div>
        {!cpCheck.pass && (
          <div style={{
            fontSize: 11, color: "#B45309", background: "#FEF3C7", border: "1px solid #FDE68A",
            borderRadius: 8, padding: "8px 10px", margin: "0 0 10px", lineHeight: 1.5,
          }}>
            {TEXTS.cpCheckWarning(cpCheck.failures)}
          </div>
        )}
        {/* 2026-08-01: "겹쳐 보일 수 있다"는 경고창(overlapCheckWarning)은 제거했습니다 —
            드래그로 자유롭게 위치를 옮기는 지금 방식에서는 이 근사 경고가 오히려
            불안감만 주고 실제 도움은 적다는 피드백 반영. 겹침 자체를 막는 안전장치
            (clampToAllowedRegion)는 그대로 살아있어서 인쇄 자체가 깨지진 않습니다. */}
        {/* 패턴 선택 UI: 사진형은 아직 Pattern Library 대상이 아니라(사진 rect는
            어휘가 없음) 이 카드가 있는 템플릿(이름크게형/회사이름강조형/자유형)에서만
            보여줍니다. 확정(placed) 후에는 잠급니다 — 확정 이후에 값이 계속 바뀌면
            무엇을 확정한 건지 애매해지고, 평점(★)도 확정된 배치 기준이어야 의미가 있습니다.
            2026-08-01: "번호·색 구분 없이도, 한 번에 하나씩만 보여주면 헷갈릴 일이
            없다"는 요청으로 전면 개편 — 모든 항목을 한꺼번에 나열하던 방식에서, 지금
            안내 중인 항목(currentKind) 하나만 보여주고 미리보기에서 직접 드래그하게
            바꿨습니다. 위치는 미리보기 화면에서 손가락/마우스로 옮기고(위 CardLayoutPreview의
            interactiveKind/onDragKindMove), 크기만 이 패널의 버튼이 담당합니다. */}
        {patternSelections && !placed && currentKind && (
          <div style={{ marginBottom: 14 }}>
            <div style={{
              background: "rgba(59,130,246,0.07)", border: `1.5px solid ${SELECTED_ACCENT_COLOR}`,
              borderRadius: 12, padding: "12px 14px", marginBottom: 12,
            }}>
              <div style={{ fontSize: 11, color: "var(--ink-soft)", fontWeight: 700, marginBottom: 4 }}>
                {TEXTS.guidedStepProgress(clampedStepIndex + 1, visibleKinds.length)}
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink)", lineHeight: 1.5 }}>
                ☝️ {TEXTS.guidedDragInstruction(currentKindLabel)}
              </div>
              {currentKind === "photo" && (
                <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.5 }}>
                  {TEXTS.guidedPhotoRangeHint}
                </div>
              )}
              {isLastStep ? (
                <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
                  {TEXTS.guidedAllDoneMessage}
                </div>
              ) : (
                <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
                  {TEXTS.guidedSizeHint}
                </div>
              )}
              <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5, opacity: 0.85 }}>
                💡 {TEXTS.guidedFreeSelectHint}
              </div>
            </div>

            {/* 2026-08-01: "크기조절 문구랑 크게·작게 버튼을 초록색 박스로 묶어달라"는
                요청 반영 — 위치(드래그)와 크기(버튼)가 서로 다른 조작 방식이라는 걸
                색으로도 구분되게 했습니다. */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6, marginBottom: 14,
              background: "rgba(22,163,74,0.08)", border: "1.5px solid #16A34A",
              borderRadius: 10, padding: "8px 10px",
            }}>
              <span style={{ fontSize: 11.5, color: "#15803D", fontWeight: 800 }}>{TEXTS.sizeStepLabel}</span>
              {currentKind === "logo" ? (
                <>
                  <button onClick={() => stepLogoTier(-1)} disabled={currentLogoTier === "sm"} style={{ ...stepperBtn, width: "auto", padding: "0 10px", fontSize: 11, border: "1.5px solid #16A34A", opacity: currentLogoTier === "sm" ? 0.4 : 1 }} aria-label="작게">− 작게</button>
                  <span style={{ fontSize: 11, fontWeight: 700, minWidth: 30, textAlign: "center", color: "#15803D" }}>{TEXTS.sizeTierLabel[currentLogoTier]}</span>
                  <button onClick={() => stepLogoTier(1)} disabled={currentLogoTier === "lg"} style={{ ...stepperBtn, width: "auto", padding: "0 10px", fontSize: 11, border: "1.5px solid #16A34A", opacity: currentLogoTier === "lg" ? 0.4 : 1 }} aria-label="크게">+ 크게</button>
                </>
              ) : currentKind === "photo" ? (
                <>
                  <button onClick={() => stepPhotoScale(-1)} disabled={currentPhotoScale <= PHOTO_SCALE_RANGE.min} style={{ ...stepperBtn, width: "auto", padding: "0 10px", fontSize: 11, fontWeight: 700, color: "var(--ink)", border: "1.5px solid #16A34A", opacity: currentPhotoScale <= PHOTO_SCALE_RANGE.min ? 0.4 : 1 }} aria-label="사진 작게">− 작게</button>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#15803D", minWidth: 40, textAlign: "center" }}>{Math.round(currentPhotoScale * 100)}%</span>
                  <button onClick={() => stepPhotoScale(1)} disabled={currentPhotoScale >= PHOTO_SCALE_RANGE.max} style={{ ...stepperBtn, width: "auto", padding: "0 10px", fontSize: 11, fontWeight: 700, color: "var(--ink)", border: "1.5px solid #16A34A", opacity: currentPhotoScale >= PHOTO_SCALE_RANGE.max ? 0.4 : 1 }} aria-label="사진 크게">+ 크게</button>
                </>
              ) : (
                <>
                  <button onClick={() => stepPointSize(-1)} disabled={currentPointSize <= POINT_SIZE_RANGE.min} style={{ ...stepperBtn, width: "auto", padding: "0 10px", fontSize: 11, fontWeight: 700, color: "var(--ink)", border: "1.5px solid #16A34A", opacity: currentPointSize <= POINT_SIZE_RANGE.min ? 0.4 : 1 }} aria-label="글자 작게">− 작게</button>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#15803D", minWidth: 34, textAlign: "center" }}>{currentPointSize}pt</span>
                  <button onClick={() => stepPointSize(1)} disabled={currentPointSize >= POINT_SIZE_RANGE.max} style={{ ...stepperBtn, width: "auto", padding: "0 10px", fontSize: 11, fontWeight: 700, color: "var(--ink)", border: "1.5px solid #16A34A", opacity: currentPointSize >= POINT_SIZE_RANGE.max ? 0.4 : 1 }} aria-label="글자 크게">+ 크게</button>
                </>
              )}
            </div>

            {/* 이전/다음 — 마지막 항목에서는 "다음" 대신 위 안내 메시지가 아래 확인
                버튼(BackNextBar)을 가리킵니다. */}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => goToAdjustStep(clampedStepIndex - 1)}
                disabled={isFirstStep}
                style={{
                  flex: 1, background: "var(--paper-white)", border: "1.5px solid var(--line)", color: "var(--ink)",
                  borderRadius: 10, fontSize: 12.5, fontWeight: 700, padding: "10px 0", cursor: "pointer",
                  fontFamily: "inherit", opacity: isFirstStep ? 0.4 : 1,
                }}
              >
                {TEXTS.guidedPrevButton}
              </button>
              {!isLastStep && (
                <button
                  onClick={() => goToAdjustStep(clampedStepIndex + 1)}
                  style={{
                    flex: 2, background: "var(--stamp)", border: "none", color: "#fff",
                    borderRadius: 10, fontSize: 12.5, fontWeight: 700, padding: "10px 0", cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {TEXTS.guidedNextButton} {nextKindLabel ? `· ${TEXTS.guidedNextPreview(nextKindLabel)}` : ""}
                </button>
              )}
            </div>
          </div>
        )}
        {/* 서체 선택. 전체 기본 서체 하나 + 회사명·이름·직위는 따로 고를 수 있게 —
            "상호 서체를 별도로", "직위·이름도 서체를 별도로" 요청 반영. 연락처
            항목들은 아직 개별 서체까지는 없고 기본 서체를 같이 씁니다(필요하다는
            신호가 확인되면 그때 확장). */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, marginBottom: 8 }}>{TEXTS.fontPickerTitle}</div>
          <FontPickerRow
            label={TEXTS.fontPickerDefaultLabel}
            selectedId={fontFamilyId.default}
            onSelect={(id) => setFontFamilyId((prev) => ({ ...prev, default: id }))}
          />
          <FontPickerRow
            label={TEXTS.fontPickerKindLabel.company}
            selectedId={fontFamilyId.company}
            allowUseDefault
            onSelect={(id) => setFontFamilyId((prev) => ({ ...prev, company: id }))}
          />
          <FontPickerRow
            label={TEXTS.fontPickerKindLabel.personName}
            selectedId={fontFamilyId.personName}
            allowUseDefault
            onSelect={(id) => setFontFamilyId((prev) => ({ ...prev, personName: id }))}
          />
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-soft)", margin: "0 0 10px" }}>{TEXTS.aiLayoutHint}</div>
        {!placed ? (
          <BackNextBar
            onBack={onStepBack}
            onNext={async () => {
              // 버튼 문구가 "배경 AI로 디자인하기"로 바뀐 만큼, 실제로 시도는 합니다.
              // 다만 실제 이미지 생성 API 키가 아직 없어서(backgroundEngine.js 참고)
              // 지금은 항상 "이용 불가"로 돌아오고, 화면은 그대로 다음 단계로 진행합니다 —
              // 나중에 API가 연결되면 이 호출이 그대로 진짜 배경을 만들어줍니다.
              try {
                await generateBackgroundOptions(styleSuggestion?.industry || null, selectedStyleTags || [], logoColor);
              } catch {
                // 실패해도 디자인 진행 자체를 막지 않음
              }
              setPlaced(true);
            }}
            nextLabel={TEXTS.aiLayoutConfirmBtn}
          />
        ) : (
          <>
            {/* 2026-08-02: "확정한 뒤에 사진 위치가 마음에 안 들어도 다시 옮길 방법이
                안 보인다"는 신고 반영. 사실 위쪽(← 뒤로가기 화살표)을 누르면 잠금이
                풀리는 기능이 이미 있었지만, 눈에 안 띄어서 아무도 못 찾았습니다 —
                여기 눈에 보이는 버튼을 따로 만들었습니다. */}
            <button
              onClick={() => { setPlaced(false); setAdjustStepIndex(0); }}
              style={{
                width: "100%", marginBottom: 14, padding: "10px 0", borderRadius: 10,
                border: "1.4px solid var(--stamp)", background: "rgba(108,76,240,0.06)",
                color: "var(--stamp)", fontWeight: 700, fontSize: 12.5, cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {TEXTS.reopenLayoutBtn}
            </button>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginBottom: 6 }}>{TEXTS.designRatingPrompt}</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setDesignRating(n)}
                    aria-label={`${n}점`}
                    style={{
                      background: "none", border: "none", cursor: "pointer", padding: 2,
                      fontSize: 22, lineHeight: 1, color: (designRating || 0) >= n ? "var(--gold)" : "var(--line)",
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <BackNextBar
              onBack={onStepBack}
              onNext={async () => {
                if (!designRecorded) {
                  recordDesignChoice({
                    industry: styleSuggestion?.industry || null,
                    // v1.1: template/patterns를 뺐습니다 — AI는 이제 구조(프레임)를 추천하지
                    // 않고 색상·글꼴·사진배치(테마)만 추천하므로, "AI가 추천한 템플릿과
                    // 다른가"는 더 이상 비교할 대상이 없습니다. classifier.js도 이에 맞춰
                    // aiRecommended.template이 없으면 그 축은 비교하지 않도록 고쳤습니다.
                    aiRecommended: styleSuggestion ? {
                      color: styleSuggestion.color,
                      font: styleSuggestion.font, photoStyle: styleSuggestion.photoStyle,
                    } : null,
                    finalChosen: { template, color: logoColor, font: logoAdvanced.font, photoStyle: photoVariant, patterns: patternSelections },
                    cpCheck,
                    satisfaction: designRating,
                  });
                  setDesignRecorded(true);
                }
                // 재주문 시 다시 만들 수 있도록 "설계도"(텍스트·선택값)를 저장합니다 —
                // 이건 재주문용이고, 아래 printFileSvg가 실제 인쇄에 넘길 진짜 파일입니다.
                patch({
                  designRecipe: {
                    template, photoVariant, fields, patternSelections, fontFamilyId,
                    backgroundStyle, logoColor, cardSize, nameEnglish, showContactIcon,
                    qrEnabled, qrUrl,
                    // 2026-08-02: "업종특성 맞춘 디자인 캐릭터"·"자유형"에서 고객이
                    // 적은 설명 — 아직 이 내용으로 실제 디자인을 자동 생성하는 기능은
                    // 없지만(로드맵 항목), 주문 기록에는 남겨서 나중에 그 기능이
                    // 생기거나 사람이 참고할 때 쓸 수 있게 합니다.
                    ...((template === "회사이름강조형" || template === "자유형") && designBriefNote.trim() ? { designBriefNote } : {}),
                  },
                });
                // 지금까지 결제까지는 됐지만 정작 "인쇄소에 넘길 실제 파일"이 없었습니다 —
                // 여기서 화면에 보이는 디자인 그대로 실제 물리 치수(mm)의 SVG 파일을
                // 만듭니다. 로고를 업로드했으면 그 이미지도 파일 안에 그대로 포함합니다.
                let logoDataUrl = null;
                if (logoFile?.type?.startsWith("image/")) {
                  try {
                    logoDataUrl = await new Promise((resolve, reject) => {
                      const reader = new FileReader();
                      reader.onload = () => resolve(reader.result);
                      reader.onerror = reject;
                      reader.readAsDataURL(logoFile);
                    });
                  } catch {
                    // 로고 변환 실패해도 나머지 텍스트만으로 인쇄파일은 만듭니다
                  }
                }
                const svg = buildCardSVG({
                  templateName: template, photoVariant, showLogo: template === "사진형" ? wantsLogo === true : logoPath !== "none",
                  fields, cardSize, patternSelections, fontFamilyId, backgroundStyle, logoColor, logoDataUrl,
                  nameEnglish, showContactIcon, qrEnabled, orientation: frontOrientation,
                });
                if (isDoubleSided) {
                  // 양면 인쇄면 뒷면을 아직 안 골랐으니, 여기서는 앞면만 임시로 들고 있다가
                  // backLayout 단계에서 뒷면과 합쳐서 최종 printFileSvg를 만듭니다.
                  patch({ frontSvgDraft: svg, logoDataUrlDraft: logoDataUrl });
                  setSub("backLayout");
                } else {
                  patch({ printFileSvg: svg, printFileName: `card-${Date.now()}.svg` });
                  go("shipping");
                }
              }}
              nextLabel={TEXTS.aiLayoutSubmitBtn}
              nextIcon={Printer}
            />
          </>
        )}
        {/* "결제 완료 후"에만 있던 문의하기를 디자인 미리보기 화면에도 추가 —
            고객이 최종 결제 전에 미리보기를 보고 궁금한 게 생길 수 있으니까요. */}
        <button
          onClick={() => go("inquiry")}
          style={{
            width: "100%", background: "var(--paper-white)", border: "1.5px solid var(--line)", color: "var(--ink)",
            borderRadius: 14, fontSize: 13, fontWeight: 700, padding: "11px 0", cursor: "pointer", fontFamily: "inherit", marginTop: 10,
          }}
        >
          {TEXTS.inquiryBtn}
        </button>
      </div>
    );
  }
  if (sub === "backLayout") {
    return <BackLayoutStep
      backLayoutChoice={backLayoutChoice} setBackLayoutChoice={setBackLayoutChoice}
      onStepBack={onStepBack} order={order} patch={patch} cardSize={cardSize}
      template={template} photoVariant={photoVariant}
      frontOrientation={frontOrientation} backOrientation={backOrientation} setBackOrientation={setBackOrientation}
      logoColor={logoColor} go={go}
    />;
  }
  return null;
}

// UploadBox, MAX_UPLOAD_MB: components/ui.js 로 이동 (Admin 화면에서도 공용으로 씀)

// ==================== data/papers ====================
const PAPERS = [
  // 2026-08-02: "빠른스노우250g는 옵션을 받으면 안 된다"는 요청 반영 — 익일출고를
  // 위해 인쇄방식(단면/양면)만 고를 수 있고, 귀도리·타공·오시·미싱·넘버링 같은
  // 시간이 걸리는 옵션은 아예 못 고르게 막습니다(data/options.js의 availableOptions
  // 참고). 옵션이 필요하면 pa002(스노우지250g, "빠른" 없음)로 안내합니다.
  { code: "pa001", cat: "cat01", name: "빠른스노우250g", sheets: 500, base: 4620, general: 14000, special: 5590, desc: "당일제작가능", restrictedOptions: true },
  { code: "pa002", cat: "cat01", name: "스노우지250g", sheets: 500, base: 4620, general: 14000, special: 5590, choice: "무광코팅,코팅없음", desc: "코팅없음은 넘버링가능(450매,기준가40,000원)" },
  { code: "pa003", cat: "cat01", name: "스노우지300g", sheets: 200, base: 4620, general: 14000, special: 5590, choice: "무광코팅,유광코팅", desc: "고급스러운 광택 옵션 선택 가능", numbering: false },
  { code: "pa004", cat: "cat02", name: "스노우지백색300g무광코팅", sheets: 200, base: 14520, general: 29040, special: 17569, desc: "백색위에 박이나 에폭시가 잘 어울림" },
  { code: "pa005", cat: "cat02", name: "반누보화이트204g", sheets: 200, base: 6050, general: 15000, special: 7321, desc: "부드럽고 따뜻한 질감의 고급지. 잉크가 은은하게 표현됨" },
  { code: "pa006", cat: "cat02", name: "반누보스노우화이트227g", sheets: 200, base: 7050, general: 17000, special: 8531, desc: "반누보보다 더 밝고 깨끗한 느낌. 고급스럽고 차분함" },
  { code: "pa007", cat: "cat02", name: "반누보화이트320g", sheets: 200, base: 11000, general: 22000, special: 13310, desc: "반누보 특유의 질감 + 두꺼운 프리미엄 느낌" },
  { code: "pa008", cat: "cat02", name: "아르미울트라화이트230g", sheets: 300, base: 4620, general: 15000, special: 5590, desc: "무난한 기본형 고급지. 다양한 업종에 적합" },
  { code: "pa009", cat: "cat02", name: "아르미울트라화이트310g", sheets: 200, base: 6600, general: 17000, special: 7986, desc: "은은한 펄(광택) 효과가 있는 특수지. 고급스럽고 화려함" },
  { code: "pa010", cat: "cat02", name: "엑스트라매트백색350g", sheets: 200, base: 8800, general: 19000, special: 10648, desc: "섬유 느낌이 살아있는 독특한 질감. 감성적인 분위기" },
  { code: "pa011", cat: "cat02", name: "랑데뷰내추럴310g", sheets: 200, base: 6600, general: 17000, special: 7986, desc: "가장 인기 있는 프리미엄 고급지. 부드럽고 따뜻한 감성" },
  { code: "pa017", cat: "cat02", name: "아쿠아사틴256g", sheets: 200, base: 17600, general: 35200, special: 21296, desc: "미세한 패턴 질감이 있는 유럽풍 고급지" },
  { code: "pa018", cat: "cat02", name: "인버코트350g", sheets: 200, base: 18700, general: 37400, special: 22627, desc: "반짝이는 펄 효과. 조명에서 고급스럽게 빛남" },
  { code: "pa020", cat: "cat02", name: "베이직백색233g", sheets: 200, base: 5500, general: 16000, special: 6655, desc: "매우 부드러운 촉감. 감성 브랜드·카페 스타일에 적합" },
  { code: "pa021", cat: "cat02", name: "스타드림쿼츠240g", sheets: 200, base: 6600, general: 17000, special: 7986, desc: "골드 펄 느낌이 나는 화려한 특수지" },
  { code: "pa022", cat: "cat02", name: "린넨커버솔라화이트216g", sheets: 200, base: 6050, general: 17000, special: 7321, desc: "매우 두꺼운 최고급지. 고급 브랜드용 추천" },
  { code: "pa024", cat: "cat02", name: "크리스탈펄화이트235g", sheets: 200, base: 6600, general: 17000, special: 7986, desc: "검정색 특수지. 금박/은박과 조합 시 매우 고급스러움" },
  { code: "pa025", cat: "cat02", name: "매쉬멜로우화이트209g", sheets: 200, base: 5500, general: 16000, special: 6655, desc: "물에 강한 합성지. 찢어짐과 습기에 강함" },
  { code: "pa026", cat: "cat02", name: "다이니티골드펄250g", sheets: 200, base: 7700, general: 18000, special: 9317, desc: "친환경 크라프트 느낌. 자연주의·수제 감성", numbering: false },
  { code: "pa027", cat: "cat02", name: "에그쉘엑스트라화이트400g", sheets: 200, base: 7700, general: 18000, special: 9317, desc: "벨벳처럼 부드러운 촉감. 최고급 감성 명함" },
  { code: "pa028", cat: "cat03", name: "매트블랙380g", sheets: 200, base: 11000, general: 22000, special: 13310, desc: "매우 두꺼운 합지 스타일. 존재감 강함", numbering: false },
  { code: "pa029", cat: "cat03", name: "유포지FEB250", sheets: 200, base: 7700, general: 19000, special: 9317, desc: "푸른빛 펄 효과의 화려한 특수지", numbering: false },
  { code: "pa030", cat: "cat03", name: "뉴크라프트보드300g", sheets: 200, base: 6600, general: 18000, special: 7986, desc: "단단하고 깔끔한 초고급 백색지" },
  { code: "pa031", cat: "cat03", name: "벨벳화이트359g", sheets: 200, base: 9900, general: 20000, special: 11979, desc: "은은한 골드톤 특수지. 고급스러운 분위기 강조", numbering: false },
  { code: "pa032", cat: "cat03", name: "듀오화이트400g", sheets: 200, base: 7700, general: 19000, special: 9317, desc: "물에 젖지않는 고급스러움" },
  { code: "pa033", cat: "cat03", name: "블루펄스타250g", sheets: 200, base: 6600, general: 18000, special: 7986, desc: "느껴지는 독특한 텍스추어" },
  { code: "pa035", cat: "cat03", name: "키칼라아이스골드250g", sheets: 200, base: 7700, general: 19000, special: 9317, desc: "최상의 멋스러움" },
  { code: "pa036", cat: "cat03", name: "아트지백색300g", sheets: 200, base: 8800, general: 20000, special: 10648, desc: "매끄럽고 인쇄 발색이 선명한 아트지", numbering: false },
  { code: "pa037", cat: "cat04", name: "PET투명300", sheets: 200, base: 16500, general: 33000, special: 19965, desc: "네귀도리(4mm) 1~4귀 선택가능" },
  { code: "pa038", cat: "cat04", name: "Luxury카드명함화이트", sheets: 200, base: 12100, general: 24200, special: 14641, desc: "네귀도리(4mm) 1~4귀 선택가능" },
  { code: "pa039", cat: "cat04", name: "Luxury카드명함실버", sheets: 200, base: 16500, general: 33000, special: 19965, desc: "네귀도리(4mm) 1~4귀 선택가능" },
  { code: "pa040", cat: "cat04", name: "Luxury카드명함골드", sheets: 200, base: 23100, general: 46200, special: 27951, desc: "네귀도리(4mm) 1~4귀 선택가능" },
  { code: "pa041", cat: "cat05", name: "아르미울트라화이트230g", sheets: 300, base: 11000, general: 22000, special: 13310, desc: "무난한 기본형 고급지" },
  { code: "pa043", cat: "cat05", name: "아쿠아사틴256g", sheets: 200, base: 16500, general: 33000, special: 19965, desc: "미세한 패턴 질감의 유럽풍 고급지" },
  { code: "pa045", cat: "cat05", name: "스노우지백색300g무광코팅", sheets: 200, base: 14520, general: 29040, special: 17569, desc: "백색위에 에폭시가 잘 어울림" },
  { code: "pa047", cat: "cat05", name: "반누보화이트204g", sheets: 200, base: 10450, general: 20900, special: 12645, desc: "부드럽고 따뜻한 질감의 고급지" },
  { code: "pa051", cat: "cat06", name: "아르미울트라화이트230g", sheets: 300, base: 12650, general: 25300, special: 15307, choice: "금박유광,금박무광,은박유광,은박무광", desc: "무난한 기본형 고급지" },
  { code: "pa052", cat: "cat06", name: "아르미울트라화이트310g", sheets: 200, base: 13000, general: 26000, special: 15730, choice: "금박유광,금박무광,은박유광,은박무광", desc: "은은한 펄 효과. 고급스럽고 화려함" },
  { code: "pa055", cat: "cat06", name: "스노우지백색300g무광코팅", sheets: 200, base: 15620, general: 31240, special: 18900, choice: "금박유광,금박무광,은박유광,은박무광", desc: "백색위에 박이 잘 어울림" },
  { code: "pa056", cat: "cat06", name: "반누보화이트204g", sheets: 200, base: 11550, general: 23100, special: 13976, choice: "금박유광,금박무광,은박유광,은박무광", desc: "부드럽고 따뜻한 질감의 고급지" },
  // 2026-08-07: "복권명함"·"멤버십카드" 카테고리 신설에 맞춰 추가 — ⚠️ 실제 원가·
  // 거래처가 확정되지 않아 다른 카테고리 값을 참고한 추정치입니다. 실제 주문을
  // 받기 전에 반드시 정확한 값으로 교체해주세요.
  { code: "pa057", cat: "cat07", name: "스노우지백색300g무광코팅(임시)", sheets: 200, base: 14520, general: 29040, special: 17569, desc: "⚠️ 임시 단가 — 긁는 코팅 실제 원가 확인 후 교체 필요" },
  { code: "pa058", cat: "cat08", name: "PET투명300(임시)", sheets: 200, base: 16500, general: 33000, special: 19965, desc: "⚠️ 임시 단가 — 실제 원가 확인 후 교체 필요" },
];

// ==================== screens/Complete ====================
// 2026-08-07: 서버(ORDER_PROGRESS_STAGES)와 정확히 같은 순서 — 표시용 아이콘만 여기서 따로 붙입니다.
const STAGE_ICONS = [Check, FileText, Printer, Package, Truck, Check];

function Complete({ order, go, grandTotal, category }) {
  const orderNo = order.orderNo || "-";
  // 2026-08-07: "고객이 보는 진행상황이 가짜 로컬 버튼"이었던 것을 실제 서버 조회로
  // 바꿨습니다 — 관리자가 진행상황을 넘기면 이제 여기 그대로 반영됩니다. 실시간
  // 자동 갱신은 아니라서(계속 서버를 두드리면 불필요한 트래픽), "새로고침" 버튼으로
  // 직접 확인하는 방식입니다.
  const [stage, setStage] = useState(0);
  const [expectedDate, setExpectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const refresh = async () => {
    if (!order.orderNo) return;
    setLoading(true);
    try {
      const p = await getOrderProgress(order.orderNo);
      setStage(p.progressStage);
      setExpectedDate(p.expectedPrintDate);
    } catch (err) {
      console.error("진행상황 조회 실패:", err);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };
  React.useEffect(() => { refresh(); }, [order.orderNo]);

  return (
    <div className="app-body">
      <TopBar title={TEXTS.completeTitle} step={7} />
      <div style={{ padding: "10px 18px 16px" }}>
        <Card style={{ textAlign: "center", padding: "22px 16px", marginBottom: 14 }}>
          <div style={{
            width: 54, height: 54, borderRadius: "50%", background: "var(--stamp)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px",
            transform: "rotate(-6deg)",
          }}>
            <Check size={26} />
          </div>
          <div className="serif" style={{ fontSize: 16, fontWeight: 900 }}>{TEXTS.completeHeadline}</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 4 }}>{TEXTS.orderNoLabel} {orderNo}</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "var(--stamp)", marginTop: 10 }}>{won(grandTotal)}</div>
        </Card>

        {order.fileStorageNotice && (
          <div style={{
            fontSize: 11.5, color: "#B45309", background: "#FEF3C7", border: "1px solid #FDE68A",
            borderRadius: 10, padding: "10px 12px", marginBottom: 14, lineHeight: 1.5,
          }}>
            {order.fileStorageNotice}
          </div>
        )}

        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 14 }}>{TEXTS.orderStatusTitle}</div>
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
            <div style={{ position: "absolute", top: 15, left: 20, right: 20, height: 1.5, background: "var(--line)" }} />
            <div style={{ position: "absolute", top: 15, left: 20, height: 1.5, background: "var(--stamp)", width: `${(stage / (ORDER_PROGRESS_STAGES.length - 1)) * 100}%`, maxWidth: "calc(100% - 40px)" }} />
            {ORDER_PROGRESS_STAGES.map((label, i) => {
              const Icon = STAGE_ICONS[i];
              const active = i <= stage;
              return (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 1, flex: 1 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%", background: active ? "var(--stamp)" : "var(--paper-white)",
                    border: `1.5px solid ${active ? "var(--stamp)" : "var(--line)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={14} color={active ? "#fff" : "var(--ink-soft)"} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: active ? "var(--ink)" : "var(--ink-soft)", textAlign: "center" }}>
                    {label}{expectedDate && i === stage && i >= 3 ? ` (${expectedDate})` : ""}
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={refresh} disabled={loading} style={{ ...stepperBtn, width: "100%", marginTop: 16, fontSize: 11.5, fontWeight: 700 }}>
            {loading ? TEXTS.orderStatusRefreshing : TEXTS.orderStatusRefreshBtn}
          </button>
        </Card>

        <Card>
          <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>{TEXTS.orderDetailsTitle}</div>
          <SummaryRow k={TEXTS.summaryCategoryLabel} v={category?.name} />
          <SummaryRow k={TEXTS.orderNoLabel} v={orderNo} />
        </Card>
      </div>
      <div style={{ padding: "8px 18px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
        <PrimaryButton onClick={() => go("home")}>{TEXTS.goHomeBtn}</PrimaryButton>
        <button
          onClick={() => go("inquiry")}
          style={{
            width: "100%", background: "var(--paper-white)", border: "1.5px solid var(--line)", color: "var(--ink)",
            borderRadius: 14, fontSize: 14, fontWeight: 700, padding: "12px 0", cursor: "pointer", fontFamily: "inherit",
          }}
        >
          {TEXTS.inquiryBtn}
        </button>
      </div>
    </div>
  );
}

// ==================== screens/Inquiry ====================
// 주문별 1:1 문의(수정요청) 스레드 저장.
// 스타일 캐시와 달리 이건 개인 요청 내용이라 shared:false(본인만 보는 저장소)를 씁니다.
// 실제 서비스에서는 고객·관리자가 서로 다른 사람이라 이렇게 하면 관리자가 못 보게 되므로,
// 반드시 진짜 백엔드(고객 계정 ↔ 관리자 계정이 같은 스레드를 보는 구조)로 옮겨야 합니다.
// 지금은 프로토타입이라 "관리자 답변"도 같은 사용자가 미리보기 버튼으로 흉내냅니다.
async function loadInquiryThread(orderNo) {
  try {
    const res = await window.storage.get(`inquiry:${orderNo}`, false);
    return res?.value ? JSON.parse(res.value) : [];
  } catch {
    return [];
  }
}

async function saveInquiryThread(orderNo, messages) {
  try {
    await window.storage.set(`inquiry:${orderNo}`, JSON.stringify(messages), false);
  } catch {
    // 저장 실패해도 화면에는 이미 반영돼 있으므로 조용히 무시
  }
}

function Inquiry({ order, go, back }) {
  const orderNo = order.orderNo || "BC24110032"; // 실제 주문이 없을 때(데모 조회)는 예시 주문번호 사용
  const [messages, setMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = React.useRef(null);

  React.useEffect(() => {
    let active = true;
    loadInquiryThread(orderNo).then((msgs) => {
      if (active) { setMessages(msgs); setLoaded(true); }
    });
    return () => { active = false; };
  }, [orderNo]);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const appendMessage = async (sender, content) => {
    const next = [...messages, { sender, text: content, at: Date.now() }];
    setMessages(next);
    await saveInquiryThread(orderNo, next);
  };

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    setText("");
    await appendMessage("customer", trimmed);
    setSending(false);
  };

  const handlePreviewAdminReply = async () => {
    await appendMessage("admin", TEXTS.inquiryDemoAdminReply);
  };

  return (
    <div className="app-body" style={{ display: "flex", flexDirection: "column" }}>
      <TopBar title={TEXTS.inquiryTitle} sub={`${TEXTS.inquiryOrderNoPrefix} ${orderNo}`} onBack={back} go={go} />

      <div style={{ padding: "6px 18px 4px" }}>
        <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 10 }}>{TEXTS.inquiryPrivacyNote}</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        {loaded && messages.length === 0 && (
          <div style={{ fontSize: 12.5, color: "var(--ink-soft)", textAlign: "center", padding: "24px 10px" }}>{TEXTS.inquiryEmpty}</div>
        )}
        {messages.map((m, i) => {
          const isCustomer = m.sender === "customer";
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: isCustomer ? "flex-end" : "flex-start" }}>
              <div style={{ fontSize: 10, color: "var(--ink-soft)", marginBottom: 3, padding: "0 4px" }}>
                {isCustomer ? TEXTS.inquiryCustomerLabel : TEXTS.inquiryAdminLabel}
              </div>
              <div style={{
                maxWidth: "78%", padding: "10px 13px", borderRadius: 14,
                borderBottomRightRadius: isCustomer ? 4 : 14,
                borderBottomLeftRadius: isCustomer ? 14 : 4,
                background: isCustomer ? "var(--stamp)" : "var(--paper-white)",
                color: isCustomer ? "#fff" : "var(--ink)",
                border: isCustomer ? "none" : "1.5px solid var(--line)",
                fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word",
              }}>
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: "12px 18px 6px" }}>
        <div style={{ fontSize: 10, color: "var(--ink-soft)", textAlign: "center", marginBottom: 6 }}>{TEXTS.inquiryPreviewNote}</div>
        <button
          onClick={handlePreviewAdminReply}
          style={{
            width: "100%", background: "var(--paper-deep)", border: "none", color: "var(--stamp)",
            borderRadius: 10, fontSize: 12, fontWeight: 700, padding: "9px 0", cursor: "pointer", fontFamily: "inherit", marginBottom: 10,
          }}
        >
          {TEXTS.inquiryPreviewReplyBtn}
        </button>
      </div>

      <div style={{ padding: "0 18px 18px", display: "flex", gap: 8 }}>
        <input
          style={{ ...inputStyle, flex: 1 }}
          placeholder={TEXTS.inquiryPlaceholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || sending}
          style={{
            width: 64, borderRadius: 10, border: "none",
            background: text.trim() ? "var(--stamp)" : "var(--line)",
            color: text.trim() ? "#fff" : "var(--ink-soft)",
            fontSize: 13, fontWeight: 700, cursor: text.trim() ? "pointer" : "not-allowed", fontFamily: "inherit",
          }}
        >
          {TEXTS.inquirySendBtn}
        </button>
      </div>
    </div>
  );
}

// ==================== domain/company/supabaseAuth ====================
// ====================================================================
// Domain : Company / Supabase Auth
// Responsibility : 진짜 전화번호 인증(가입 1회) + 비밀번호 로그인.
//
// 왜 @supabase/supabase-js 대신 fetch를 직접 쓰는가: 이 미리보기 환경(Claude
// 아티팩트)에서 쓸 수 있는 라이브러리 목록에 supabase-js가 없습니다. 다행히
// Supabase Auth(GoTrue)는 그냥 REST API라서, EmailJS 연동 때와 똑같은 방식
// (raw fetch)으로 그대로 호출할 수 있습니다 — SDK가 하는 일이 결국 이 REST
// 호출을 감싸는 것뿐이라, 기능상 차이는 없습니다.
//
// ⚠️ 설정 필요: 아래 두 값을 실제 프로젝트 값으로 채워야 합니다.
const SUPABASE_URL = "https://wzqgbiedddquaataybvw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ZRboBtWv9S6LxToeORG-zA_oCmYLcjg";
// "비밀 키"(sb_secret_...)는 여기에 절대 넣지 않습니다 — 이건 서버 전용이고,
// 이 파일은 브라우저에서 돌아가는 화면 코드라 넣으면 그대로 노출됩니다.
// ====================================================================

async function authFetch(path, body) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // Supabase는 실패해도 보통 { error_description } 또는 { msg }로 이유를 줍니다.
    throw new Error(data.error_description || data.msg || data.error || `요청 실패 (${res.status})`);
  }
  return data;
}

// 전화번호로 인증코드(SMS)를 보냅니다. 실제로 문자가 나가려면, Supabase 대시보드의
// Authentication → Providers → Phone에서 문자발송 업체(SMS Provider, 예: Twilio,
// 또는 Supabase가 지원하는 다른 업체)를 연결해둬야 합니다 — 이 코드만으로는
// "인증 로직"만 되는 거고, 실제 문자 발송 업체 연결은 별도 설정입니다.
async function sendPhoneOtp(phone) {
  return authFetch("/otp", { phone });
}

// 사용자가 문자로 받은 코드를 입력하면, 그게 맞는지 Supabase에 확인합니다.
// 성공하면 access_token(로그인 세션)을 돌려받습니다 — 이게 "이 사람이 진짜
// 이 번호의 주인임을 증명했다"는 증표입니다.
async function verifyPhoneOtp(phone, token) {
  return authFetch("/verify", { type: "sms", phone, token });
}

// 전화 인증이 끝난 뒤, 그 계정에 비밀번호를 설정합니다(가입 시 1회).
// access_token은 verifyPhoneOtp()가 돌려준 값을 그대로 씁니다.
async function setPasswordAfterVerification(accessToken, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error_description || data.msg || `비밀번호 설정 실패 (${res.status})`);
  return data;
}

// 이후 로그인 — 문자 인증 없이, 전화번호+비밀번호만으로 확인합니다.
async function signInWithPassword(phone, password) {
  return authFetch("/token?grant_type=password", { phone, password });
}

// ==================== screens/Auth ====================
// Supabase는 국제 표준 형식(+82...)을 요구합니다 — "010-1234-5678"처럼 한국식으로
// 입력해도 자동으로 변환해줍니다.
function toE164(krPhone) {
  const digits = (krPhone || "").replace(/\D/g, "");
  if (digits.startsWith("0")) return `+82${digits.slice(1)}`;
  if (digits.startsWith("82")) return `+${digits}`;
  return `+82${digits}`;
}

function Auth({ order, patch, go, back }) {
  const [mode, setMode] = useState("login");
  const [code, setCode] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpAccessToken, setOtpAccessToken] = useState(null);
  const [loginPasswordInput, setLoginPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // 회원 종류를 안 고르면 왜 버튼이 안 눌리는지 알기 어려워서(실제로 이 문제로 막히는 경우가 있었음),
  // 화면에 들어오면 일반회원을 기본값으로 미리 선택해둡니다. 특별회원이 필요하면 직접 눌러서 바꾸면 됩니다.
  React.useEffect(() => {
    if (!order.memberType) patch({ memberType: "general" });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const missingSignupSteps = [];
  if (!order.memberType) missingSignupSteps.push(TEXTS.memberKindLabel);
  if (!order.name) missingSignupSteps.push(TEXTS.nameLabel);
  if (!order.phoneVerified) missingSignupSteps.push(TEXTS.verifiedStamp);
  if (!order.password || order.password.length < 4) missingSignupSteps.push(TEXTS.passwordLabel);
  if (order.memberType === "special" && !order.company) missingSignupSteps.push(TEXTS.companyLabel);
  if (order.memberType === "special" && !order.bizDoc) missingSignupSteps.push(TEXTS.bizDocLabel);
  const canSubmitSignup = missingSignupSteps.length === 0;
  return (
    <div className="app-body">
      <TopBar title={TEXTS.authTitle} onBack={back} step={3} go={go} />
      <div style={{ padding: "6px 18px 16px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["login", "signup"].map((m) => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: "10px 0", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              border: `1.5px solid ${mode === m ? "var(--stamp)" : "var(--line)"}`,
              background: mode === m ? "var(--stamp)" : "var(--paper-white)",
              color: mode === m ? "#fff" : "var(--ink)",
            }}>
              {m === "signup" ? TEXTS.tabSignup : TEXTS.tabLogin}
            </button>
          ))}
        </div>

        {mode === "signup" && (
          <>
            <Field label={TEXTS.memberKindLabel}>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { k: "general", label: TEXTS.memberKindGeneralLabel, d: TEXTS.memberKindGeneralDesc },
                  { k: "special", label: TEXTS.memberKindSpecialLabel, d: TEXTS.memberKindSpecialDesc },
                ].map((m) => (
                  <div key={m.k} onClick={() => patch({ memberType: m.k })} style={{
                    flex: 1, cursor: "pointer", borderRadius: 12, padding: "12px 12px",
                    border: `1.5px solid ${order.memberType === m.k ? "var(--stamp)" : "var(--line)"}`,
                    background: order.memberType === m.k ? "rgba(108,76,240,0.06)" : "var(--paper-white)",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{m.label}</div>
                    <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 3, lineHeight: 1.4 }}>{m.d}</div>
                  </div>
                ))}
              </div>
            </Field>
            {/* 2026-08-02: "특별회원 가입을 누르면 AI디자인이 안 되고 인쇄파일
                업로드만 가능하다는 안내가 필요하다"는 요청 반영 — 기본값은 일반회원
                그대로 두고(위 useEffect), 특별회원을 직접 고른 경우에만 뜹니다. */}
            {order.memberType === "special" && (
              <div style={{
                fontSize: 11.5, color: "#B45309", background: "#FEF3C7", border: "1px solid #FDE68A",
                borderRadius: 10, padding: "10px 12px", marginBottom: 14, lineHeight: 1.5,
              }}>
                {TEXTS.specialMemberNotice}
              </div>
            )}
            <Field label={TEXTS.nameLabel}><input style={inputStyle} placeholder={TEXTS.namePlaceholder} value={order.name} onChange={(e) => patch({ name: e.target.value })} /></Field>
            <Field label={TEXTS.phoneLabel}>
              <div style={{ display: "flex", gap: 8 }}>
                <input style={{ ...inputStyle, flex: 1 }} placeholder={TEXTS.phonePlaceholder} value={order.phone} onChange={(e) => patch({ phone: e.target.value, phoneVerified: false })} />
                <button
                  style={{ ...stepperBtn, width: 80, fontSize: 12, fontWeight: 700 }}
                  disabled={!order.phone || sendingOtp}
                  onClick={async () => {
                    setSendingOtp(true);
                    setOtpError("");
                    try {
                      await sendPhoneOtp(toE164(order.phone));
                      setCode("sent"); // 실제 코드는 사용자 휴대폰으로만 가고 여기선 모릅니다 — Supabase가 검증을 대신 해줍니다.
                    } catch (err) {
                      setOtpError(err.message);
                    } finally {
                      setSendingOtp(false);
                    }
                  }}
                >
                  {sendingOtp ? TEXTS.verifyRequestSending : TEXTS.verifyRequestBtn}
                </button>
              </div>
              {otpError && <div style={{ fontSize: 11, color: "#d64545", marginTop: 4 }}>{otpError}</div>}
              {/* ⚠️ 미리보기 전용 임시 버튼 — 실제 배포 전에는 반드시 지워야 합니다.
                  이 아티팩트 미리보기 환경이 외부 서버 호출(Supabase 등)을 막고 있어서
                  실제 인증을 여기서는 확인할 수 없어, 나머지 화면(디자인·결제 등)을
                  계속 테스트할 수 있도록 건너뛰기만 열어둔 것입니다. 실제 웹사이트로
                  배포되면 이 CSP 제한이 없어져서 진짜 인증이 정상 작동하니, 그때는
                  이 버튼을 지워야 합니다 — 안 지우면 아무나 인증 없이 가입할 수 있게
                  되는 진짜 보안 구멍이 됩니다. */}
              {otpError && (
                <button
                  onClick={() => patch({ phoneVerified: true })}
                  style={{
                    marginTop: 6, width: "100%", background: "none", border: "1.4px dashed var(--ink-soft)",
                    borderRadius: 10, padding: "8px 0", fontSize: 11, color: "var(--ink-soft)", cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {TEXTS.previewSkipVerifyBtn}
                </button>
              )}
            </Field>
            {code && !order.phoneVerified && (
              <Field label={TEXTS.verifyCodeLabel}>
                <div style={{ display: "flex", gap: 8 }}>
                  <input style={{ ...inputStyle, flex: 1 }} placeholder={TEXTS.verifyCodePlaceholder} value={otpInput} onChange={(e) => setOtpInput(e.target.value)} />
                  <button
                    style={{ ...stepperBtn, width: 80, fontSize: 11 }}
                    disabled={!otpInput || verifyingOtp}
                    onClick={async () => {
                      setVerifyingOtp(true);
                      setOtpError("");
                      try {
                        const result = await verifyPhoneOtp(toE164(order.phone), otpInput);
                        setOtpAccessToken(result.access_token || null);
                        patch({ phoneVerified: true });
                      } catch (err) {
                        setOtpError(err.message);
                      } finally {
                        setVerifyingOtp(false);
                      }
                    }}
                  >
                    {verifyingOtp ? TEXTS.verifyChecking : TEXTS.verifyCheckBtn}
                  </button>
                </div>
              </Field>
            )}
            {order.phoneVerified && <Stamp active>{TEXTS.verifiedStamp}</Stamp>}

            {order.phoneVerified && (
              <Field label={TEXTS.passwordLabel}>
                <input
                  type="password" style={inputStyle} placeholder={TEXTS.passwordPlaceholder}
                  value={order.password} onChange={(e) => patch({ password: e.target.value })}
                />
                <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 4 }}>{TEXTS.passwordHint}</div>
              </Field>
            )}

            {order.memberType === "special" && (
              <>
                <div style={{ height: 8 }} />
                <Field label={TEXTS.companyLabel}><input style={inputStyle} placeholder={TEXTS.companyPlaceholder} value={order.company} onChange={(e) => patch({ company: e.target.value })} /></Field>
                <Field label={TEXTS.bizDocLabel}>
                  <UploadBox
                    label={TEXTS.bizDocUploadPrompt}
                    icon={Upload}
                    done={!!order.bizDoc}
                    fileName={order.bizDocFile?.name}
                    accept=".png,.jpg,.jpeg,.pdf"
                    onFile={(f) => patch({ bizDoc: true, bizDocFile: f })}
                  />
                </Field>
                <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 4 }}>{TEXTS.bizDocUploadHint}</div>
              </>
            )}

            <div style={{ marginTop: 10 }}>
              {otpError && <div style={{ fontSize: 11, color: "#d64545", marginBottom: 8 }}>{otpError}</div>}
              <PrimaryButton
                disabled={!canSubmitSignup || sendingOtp}
                onClick={async () => {
                  // 비밀번호를 실제 Supabase 계정에 설정합니다 — 이게 돼야 다음부터
                  // 문자인증 없이 비밀번호로 로그인할 수 있습니다.
                  if (otpAccessToken) {
                    try {
                      await setPasswordAfterVerification(otpAccessToken, order.password);
                    } catch (err) {
                      setOtpError(err.message);
                      return;
                    }
                  }
                  if (order.memberType === "special") {
                    // 특별회원(기업)은 사업자등록증 승인 전까지는 로그인 완료 상태(authed)로 만들지 않습니다.
                    patch({ authed: false });
                    go("pendingApproval");
                  } else {
                    patch({ authed: true });
                    go("design");
                  }
                }}
              >
                {order.memberType === "special" ? TEXTS.signupSubmitSpecial : TEXTS.signupSubmitGeneral}
              </PrimaryButton>
              {!canSubmitSignup && (
                <div style={{ fontSize: 11, color: "var(--ink-soft)", textAlign: "center", marginTop: 8 }}>
                  {TEXTS.missingFieldsHint}{missingSignupSteps.join(", ")}
                </div>
              )}
            </div>
          </>
        )}

        {mode === "login" && (
          <>
            {/* 로그인마다 문자인증을 다시 하면 보낼 때마다 비용이 들고, 실제 앱들도
                이렇게 안 합니다 — 문자인증은 가입 시 "이 번호의 주인이 맞다"를 한 번만
                증명하는 용도고, 그다음부터는 아이디(전화번호)+비밀번호로 로그인합니다. */}
            <Field label={TEXTS.phoneLabel}><input style={inputStyle} placeholder={TEXTS.phonePlaceholder} value={order.phone} onChange={(e) => patch({ phone: e.target.value })} /></Field>
            <Field label={TEXTS.passwordLabel}><input type="password" style={inputStyle} placeholder={TEXTS.passwordLoginPlaceholder} value={loginPasswordInput} onChange={(e) => setLoginPasswordInput(e.target.value)} /></Field>
            {loginError && <div style={{ fontSize: 11, color: "#d64545", marginBottom: 8 }}>{loginError}</div>}
            <PrimaryButton
              disabled={!order.phone || !loginPasswordInput || loggingIn}
              onClick={async () => {
                setLoggingIn(true);
                setLoginError("");
                try {
                  const result = await signInWithPassword(toE164(order.phone), loginPasswordInput);
                  patch({
                    authed: true, phoneVerified: true,
                    memberType: order.memberType || "general", name: order.name || TEXTS.defaultMemberName,
                  });
                  go("design");
                } catch (err) {
                  // ⚠️ 미리보기 전용 폴백 — 실제 배포 전에는 반드시 지워야 합니다.
                  // 이 아티팩트 미리보기 환경이 외부 서버 호출을 막고 있어서, 여기서는
                  // 진짜 서버 응답을 못 받습니다. 대신 지금 이 세션에 남아있는
                  // order.password와 직접 비교해서, 나머지 화면 테스트를 계속할 수
                  // 있게만 열어둡니다 — 이건 진짜 인증이 아니라 세션 안에서만
                  // 의미 있는 임시 비교라, 실제 배포 시엔 반드시 지워야 합니다.
                  if (order.password && loginPasswordInput === order.password) {
                    patch({ authed: true, memberType: order.memberType || "general", name: order.name || TEXTS.defaultMemberName });
                    go("design");
                  } else {
                    setLoginError(err.message || TEXTS.loginPasswordError);
                  }
                } finally {
                  setLoggingIn(false);
                }
              }}
            >
              {loggingIn ? TEXTS.loggingInLabel : TEXTS.loginSubmit}
            </PrimaryButton>
          </>
        )}
      </div>
    </div>
  );
}

function PendingApproval({ order, patch, go, back }) {
  return (
    <div className="app-body">
      <TopBar title={TEXTS.pendingTitle} onBack={back} step={3} go={go} />
      <div style={{ padding: "6px 18px 16px" }}>
        <Card style={{ textAlign: "center", padding: "26px 16px" }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", background: "var(--paper-deep)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px",
          }}>
            <Upload size={22} color="var(--stamp)" />
          </div>
          <div style={{ fontSize: 14.5, fontWeight: 800 }}>{TEXTS.pendingHeadline}</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.6, whiteSpace: "pre-line" }}>
            {TEXTS.pendingBody}
          </div>
        </Card>

        <div style={{ fontSize: 10.5, color: "var(--ink-soft)", textAlign: "center", marginTop: 14 }}>
          {TEXTS.pendingPreviewNote}
        </div>
        <div style={{ marginTop: 8 }}>
          <PrimaryButton onClick={() => patch({ authed: true })} icon={Check}>
            {TEXTS.pendingApproveBtn}
          </PrimaryButton>
        </div>

        {order.authed && (
          <div style={{ marginTop: 10 }}>
            <PrimaryButton onClick={() => go("design")}>{TEXTS.pendingContinueBtn}</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== screens/Admin ====================
// 아주 가벼운 비밀번호 게이트입니다 — 진짜 권한 시스템(관리자 계정 로그인)이 아닙니다.
// 실제 서비스에서는 Auth 화면의 관리자 로그인과 연결해야 합니다. 지금은 프로토타입이라
// 브라우저에 하드코딩된 값과 비교만 합니다 — 이 비밀번호는 보안 장치가 아니라
// "일반회원이 실수로 들어오는 것"을 막는 정도의 문턱입니다.
// 2026-08-04: 비밀번호 확인이 이제 서버(Render)에서 이뤄집니다 — 여기 있던 하드코딩된
// 값은 더 이상 안 쓰입니다. 실제 관리자 비밀번호는 Render 환경변수 ADMIN_PASSWORD에
// 있습니다.

function Admin({ go, back }) {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [busyId, setBusyId] = useState(null);
  // 2026-08-04: 실제 서버 로그인이 되면서 추가 — 서버가 발급한 서명된 토큰을 여기
  // 담아둡니다(브라우저를 새로고침하면 사라짐 — 이 미리보기 환경에선 localStorage를
  // 못 쓰기 때문에 의도적으로 메모리에만 둡니다. 그래서 새로고침하면 재로그인 필요,
  // 이건 이전(비밀번호만 확인) 방식과 동일한 제약입니다).
  const [adminToken, setAdminToken] = useState(null);
  const [loginBusy, setLoginBusy] = useState(false);
  // 2026-08-02: 이 두 줄은 원래 아래 "if (!authed) return (...)" 다음에 있었습니다 —
  // 그러면 로그인 전(authed=false)에는 이 useState들이 아예 호출이 안 되고, 로그인
  // 후(authed=true)에만 호출되어서 같은 컴포넌트인데 렌더마다 훅 호출 개수가
  // 달라지는 문제(Rules of Hooks 위반)가 있었습니다. 지금까지는 우연히 문제가
  // 안 드러났을 수 있지만, 원칙대로 모든 훅은 조건 분기보다 위, 맨 앞에서
  // 무조건 호출되어야 해서 여기로 옮겼습니다.
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registerResult, setRegisterResult] = useState("");
  // 2026-08-02: 관리자가 실제로 "입금확인"을 할 수 있는 기능 — 주문 목록 상태.
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [busyOrderNo, setBusyOrderNo] = useState(null);

  useEffect(() => {
    if (!authed) return;
    (async () => {
      await loadCompanyLibrary(); // 이전 세션에 저장된 것들까지 다 불러온 뒤에 목록을 만듭니다.
      setCompanies([...COMPANY_DOMAIN]);
      setLoading(false);
    })();
  }, [authed]);

  const refreshOrders = async () => {
    setOrdersLoading(true);
    try {
      setOrders(await listOrders(adminToken));
    } finally {
      setOrdersLoading(false);
    }
  };
  useEffect(() => {
    if (!authed) return;
    refreshOrders();
  }, [authed]);

  const handleConfirmDeposit = async (orderNo) => {
    setBusyOrderNo(orderNo);
    try {
      await confirmDeposit(orderNo, adminToken);
      await refreshOrders();
    } catch (err) {
      console.error("입금확인 처리 실패:", err);
    } finally {
      setBusyOrderNo(null);
    }
  };

  // 2026-08-07: 진행상황 6단계 — 주문마다 "인쇄완료" 예정일을 따로 입력받아야 해서,
  // 주문번호별로 입력값을 따로 기억해둡니다.
  const [progressDateInputs, setProgressDateInputs] = useState({});
  const handleAdvanceProgress = async (orderNo, nextStage, expectedPrintDate) => {
    setBusyOrderNo(orderNo);
    try {
      await advanceProgress(orderNo, nextStage, adminToken, expectedPrintDate);
      await refreshOrders();
    } catch (err) {
      console.error("진행상황 변경 실패:", err);
    } finally {
      setBusyOrderNo(null);
    }
  };

  const refresh = () => setCompanies([...COMPANY_DOMAIN]);

  const handleApprove = async (id) => {
    setBusyId(id);
    await updateCompanyStatus(id, "verified", { approvedBy: "admin", token: adminToken });
    refresh();
    setBusyId(null);
  };

  const handleReject = async (id) => {
    setBusyId(id);
    await removeCompany(id, adminToken);
    refresh();
    setBusyId(null);
  };

  if (!authed) {
    return (
      <div className="app-body">
        <TopBar title={TEXTS.adminLoginTitle} onBack={back} go={go} />
        <div style={{ padding: "16px 18px" }}>
          <input
            style={inputStyle}
            type="password"
            placeholder={TEXTS.adminPasswordPlaceholder}
            value={passwordInput}
            onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(""); }}
          />
          {passwordError && <div style={{ fontSize: 11, color: "#d64545", marginTop: 8 }}>{passwordError}</div>}
          <div style={{ marginTop: 14 }}>
            <PrimaryButton
              disabled={!passwordInput || loginBusy}
              onClick={async () => {
                setLoginBusy(true);
                setPasswordError("");
                try {
                  const token = await adminLogin(passwordInput);
                  setAdminToken(token);
                  setAuthed(true);
                } catch (err) {
                  setPasswordError(err.message || TEXTS.adminPasswordWrong);
                } finally {
                  setLoginBusy(false);
                }
              }}
            >
              {TEXTS.adminLoginBtn}
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  const handleRegister = async (formData) => {
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(formData.file);
    });
    const splitList = (str) => str.split(",").map((s) => s.trim()).filter(Boolean);
    const result = await registerCompany({
      name: formData.name,
      aliases: splitList(formData.aliases),
      logo: dataUrl,
      logoType: formData.logoType,
      industry: formData.industry || null,
      homepage: formData.homepage || null,
      officialLogoUrl: formData.officialLogoUrl || null,
      emailDomains: splitList(formData.emailDomains),
      source: "admin_registered", // 관리자가 직접 등록 → 기본 status: verified, qualityGrade: B
    });
    refresh();
    if (result.registered) {
      setRegisterResult(TEXTS.adminRegisterSuccess(result.company.name));
      setShowRegisterForm(false);
    } else if (result.mergedAlias) {
      setRegisterResult(TEXTS.adminRegisterMerged(result.company.name));
    } else {
      setRegisterResult(TEXTS.adminRegisterDuplicate(result.company.name));
    }
  };

  const pending = companies.filter((c) => c.status === "pending");
  const others = companies.filter((c) => c.status !== "pending");

  return (
    <div className="app-body">
      <TopBar title={TEXTS.adminReviewTitle} onBack={back} go={go} />
      <div style={{ padding: "16px 18px" }}>
        {/* 2026-08-02 신규: 실제로 입금확인을 처리할 수 있는 주문 관리 섹션.
            ⚠️ 지금은 Complete.jsx(고객이 보는 화면)가 아직 이 실제 상태를 안 읽고
            예전 방식(로컬 "미리보기" 버튼)을 그대로 씁니다 — 테스트 흐름이 막히지
            않게 하기 위한 의도적 선택입니다. 실 서비스 전환 전 반드시 연결할 것
            (PROJECT_HANDOFF.md에 기록됨). */}
        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>
          {TEXTS.adminOrdersSectionTitle} ({orders.filter((o) => o.status !== ORDER_STATUS.CONFIRMED).length})
        </div>
        {ordersLoading && <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{TEXTS.adminLoading}</div>}
        {!ordersLoading && orders.length === 0 && (
          <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 20 }}>{TEXTS.adminNoOrders}</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {orders.map((o) => {
            const confirmed = o.status === ORDER_STATUS.CONFIRMED;
            const stage = o.progressStage ?? 0;
            const isLastStage = stage >= ORDER_PROGRESS_STAGES.length - 1;
            const nextStage = stage + 1;
            const nextIsPrintDone = nextStage === PRINT_DONE_STAGE_INDEX;
            return (
              <Card key={o.orderNo}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700 }}>{o.orderNo}</div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 3 }}>{TEXTS.adminOrderDepositorLine(o.depositor, o.categoryName)}</div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{TEXTS.adminOrderAmountLine(o.grandTotal)}</div>
                  </div>
                  <div style={{
                    fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, flexShrink: 0,
                    color: confirmed ? "var(--stamp)" : "#B45309",
                    background: confirmed ? "rgba(108,76,240,0.1)" : "#FEF3C7",
                  }}>
                    {o.status}
                  </div>
                </div>
                {!confirmed && (
                  <button
                    disabled={busyOrderNo === o.orderNo}
                    onClick={() => handleConfirmDeposit(o.orderNo)}
                    style={{
                      width: "100%", marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      padding: "9px 0", borderRadius: 10, border: "1.4px solid var(--stamp)", background: "var(--stamp)",
                      color: "#fff", fontWeight: 700, fontSize: 12.5, cursor: "pointer",
                    }}
                  >
                    <Check size={14} /> {TEXTS.adminConfirmDepositBtn}
                  </button>
                )}
                {confirmed && o.confirmedAt && (
                  <div style={{ fontSize: 10, color: "var(--ink-soft)", marginTop: 6 }}>
                    {TEXTS.adminApprovalRecord(o.confirmedBy || "admin", o.confirmedAt)}
                  </div>
                )}
                {/* 2026-08-07: 진행상황 6단계 — "디자인완료"는 이미 자동으로 참이라
                    여기서는 그다음 단계부터 관리자가 하나씩 넘깁니다. 인쇄소·택배사
                    시스템과 연동이 없어서 자동 감지가 불가능합니다. */}
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--line)" }}>
                  <div style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 6 }}>
                    {TEXTS.adminProgressLabel}: <b style={{ color: "var(--ink)" }}>{ORDER_PROGRESS_STAGES[stage]}</b>
                    {o.expectedPrintDate && stage >= PRINT_DONE_STAGE_INDEX ? ` (${o.expectedPrintDate})` : ""}
                  </div>
                  {!isLastStage && (
                    <>
                      {nextIsPrintDone && (
                        <input
                          value={progressDateInputs[o.orderNo] || ""}
                          onChange={(e) => setProgressDateInputs((prev) => ({ ...prev, [o.orderNo]: e.target.value }))}
                          placeholder={TEXTS.adminExpectedDatePlaceholder}
                          style={{ width: "100%", marginBottom: 6, padding: "7px 10px", borderRadius: 8, border: "1px solid var(--line)", fontSize: 12, fontFamily: "inherit" }}
                        />
                      )}
                      <button
                        disabled={busyOrderNo === o.orderNo}
                        onClick={() => handleAdvanceProgress(o.orderNo, nextStage, nextIsPrintDone ? progressDateInputs[o.orderNo] : undefined)}
                        style={{
                          width: "100%", padding: "8px 0", borderRadius: 10, border: "1.4px solid var(--line)",
                          background: "var(--paper-white)", color: "var(--ink)", fontWeight: 700, fontSize: 12, cursor: "pointer",
                        }}
                      >
                        {TEXTS.adminNextStageBtn(ORDER_PROGRESS_STAGES[nextStage])}
                      </button>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* 이메일 발송 자체(EmailJS 연동)가 되는지 회사 인증 절차 없이 확인하는
            관리자 전용 도구. 회사메일이 없어도 테스트할 수 있게 해주던 "테스트회사"
            (gmail.com) 항목은 이제 지웠습니다 — verifyCompanyEmail이 개인 이메일
            도메인을 아예 거부하도록 막아서 그 방법 자체가 더 안 통합니다. 대신 여기서는
            회사 인증 로직을 거치지 않고 sendVerificationEmail을 직접 호출하기 때문에,
            보안 구멍을 만들지 않으면서 "발송이 실제로 되는가"만 확인할 수 있습니다.
            이미 관리자 비밀번호로 접근이 막혀있는 화면이라 안전합니다. */}
        <EmailSendTestTool />
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={() => { setShowRegisterForm((v) => !v); setRegisterResult(""); }}
            style={{ width: "100%", padding: "10px 0", borderRadius: 10, border: "1.4px solid var(--stamp)", background: showRegisterForm ? "var(--stamp)" : "var(--paper-white)", color: showRegisterForm ? "#fff" : "var(--stamp)", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}
          >
            {showRegisterForm ? TEXTS.adminRegisterCloseBtn : TEXTS.adminRegisterOpenBtn}
          </button>
          {showRegisterForm && <RegisterForm onSubmit={handleRegister} />}
          {registerResult && <div style={{ fontSize: 12, color: "var(--stamp)", marginTop: 8 }}>{registerResult}</div>}
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>
          {TEXTS.adminPendingSectionTitle} ({pending.length})
        </div>
        {loading && <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{TEXTS.adminLoading}</div>}
        {!loading && pending.length === 0 && (
          <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 20 }}>{TEXTS.adminNoPending}</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {pending.map((c) => (
            <Card key={c.id}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {c.logo && (
                  <img src={c.logo} alt="" style={{ width: 48, height: 48, objectFit: "contain", background: "var(--paper-deep)", borderRadius: 8, flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>{c.name} <span style={{ fontSize: 10.5, color: "var(--stamp)", fontWeight: 700 }}>{c.qualityGrade}등급</span></div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 2 }}>{TEXTS.adminSourceLabel(c.source)}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  disabled={busyId === c.id}
                  onClick={() => handleApprove(c.id)}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px 0", borderRadius: 10, border: "1.4px solid var(--stamp)", background: "var(--stamp)", color: "#fff", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}
                >
                  <Check size={14} /> {TEXTS.adminApproveBtn}
                </button>
                <button
                  disabled={busyId === c.id}
                  onClick={() => handleReject(c.id)}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px 0", borderRadius: 10, border: "1.4px solid var(--line)", background: "var(--paper-white)", color: "#d64545", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}
                >
                  <X size={14} /> {TEXTS.adminRejectBtn}
                </button>
              </div>
            </Card>
          ))}
        </div>

        {others.length > 0 && (
          <>
            <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>{TEXTS.adminOthersSectionTitle}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {others.map((c) => (
                <div key={c.id} style={{ display: "flex", flexDirection: "column", padding: "8px 4px", fontSize: 12, borderBottom: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span>{c.name}</span>
                    <span style={{ color: "var(--ink-soft)" }}>{c.status}</span>
                  </div>
                  {c.approvedBy && (
                    <div style={{ fontSize: 10, color: "var(--ink-soft)", marginTop: 2 }}>
                      {TEXTS.adminApprovalRecord(c.approvedBy, c.approvedAt)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// 관리자 전용, 회사 인증 로직 없이 EmailJS 발송 자체만 테스트합니다.
function EmailSendTestTool() {
  const [testEmail, setTestEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleTestSend = async () => {
    setStatus("sending");
    setErrorMsg("");
    try {
      const code = generateVerificationCode();
      await sendVerificationEmail(testEmail, code);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || String(err));
    }
  };

  return (
    <Card style={{ marginBottom: 20, background: "var(--paper-deep)", border: "none" }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>{TEXTS.adminEmailTestTitle}</div>
      <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 10, lineHeight: 1.5 }}>{TEXTS.adminEmailTestDesc}</div>
      <input
        style={inputStyle}
        type="email"
        placeholder={TEXTS.adminEmailTestPlaceholder}
        value={testEmail}
        onChange={(e) => { setTestEmail(e.target.value); setStatus(null); }}
      />
      <div style={{ marginTop: 10 }}>
        <PrimaryButton disabled={!testEmail || status === "sending"} onClick={handleTestSend}>
          {status === "sending" ? TEXTS.adminEmailTestSending : TEXTS.adminEmailTestBtn}
        </PrimaryButton>
      </div>
      {status === "sent" && <div style={{ fontSize: 11.5, color: "var(--stamp)", marginTop: 8, fontWeight: 600 }}>{TEXTS.adminEmailTestSuccess}</div>}
      {status === "error" && <div style={{ fontSize: 11.5, color: "#d64545", marginTop: 8 }}>{TEXTS.adminEmailTestFail}: {errorMsg}</div>}
    </Card>
  );
}

// 관리자가 새 회사를 직접 등록하는 폼. registerCompany()를 호출하는 유일한
// "관리자 등록" 진입점입니다 — 계약회원/일반회원 업로드는 Design.jsx 쪽에서
// 이미 registerCompany()를 호출하고 있어서 여기서는 admin_registered 경로만 담당합니다.
function RegisterForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [aliases, setAliases] = useState("");
  const [logoType, setLogoType] = useState(COMPANY_LOGO_TYPES.CORPORATE);
  const [industry, setIndustry] = useState("");
  const [homepage, setHomepage] = useState("");
  const [officialLogoUrl, setOfficialLogoUrl] = useState("");
  const [emailDomains, setEmailDomains] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = name.trim() && file && !submitting;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), aliases, logoType, industry, homepage, officialLogoUrl, emailDomains, file });
      setName(""); setAliases(""); setIndustry(""); setHomepage(""); setOfficialLogoUrl(""); setEmailDomains(""); setFile(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card style={{ marginTop: 10 }}>
      <Field label={TEXTS.adminFormNameLabel}>
        <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder={TEXTS.adminFormNamePlaceholder} />
      </Field>
      <Field label={TEXTS.adminFormAliasesLabel}>
        <input style={inputStyle} value={aliases} onChange={(e) => setAliases(e.target.value)} placeholder={TEXTS.adminFormAliasesPlaceholder} />
      </Field>
      <Field label={TEXTS.adminFormLogoTypeLabel}>
        <select style={inputStyle} value={logoType} onChange={(e) => setLogoType(e.target.value)}>
          {Object.values(COMPANY_LOGO_TYPES).map((t) => (
            <option key={t} value={t}>{TEXTS.adminLogoTypeLabel(t)}</option>
          ))}
        </select>
      </Field>
      <Field label={TEXTS.adminFormIndustryLabel}>
        <input style={inputStyle} value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder={TEXTS.adminFormIndustryPlaceholder} />
      </Field>
      <Field label={TEXTS.adminFormHomepageLabel}>
        <input style={inputStyle} value={homepage} onChange={(e) => setHomepage(e.target.value)} placeholder={TEXTS.adminFormHomepagePlaceholder} />
      </Field>
      <Field label={TEXTS.adminFormOfficialLogoUrlLabel}>
        <input style={inputStyle} value={officialLogoUrl} onChange={(e) => setOfficialLogoUrl(e.target.value)} placeholder={TEXTS.adminFormOfficialLogoUrlPlaceholder} />
      </Field>
      <Field label={TEXTS.adminFormEmailDomainsLabel}>
        <input style={inputStyle} value={emailDomains} onChange={(e) => setEmailDomains(e.target.value)} placeholder={TEXTS.adminFormEmailDomainsPlaceholder} />
      </Field>
      <Field label={TEXTS.adminFormLogoFileLabel}>
        <UploadBox label={TEXTS.adminFormLogoFileLabel} icon={Upload} done={!!file} fileName={file?.name} onFile={setFile} accept=".png,.jpg,.jpeg,.svg" />
      </Field>
      <PrimaryButton disabled={!canSubmit} onClick={handleSubmit}>
        {submitting ? TEXTS.adminFormSubmitting : TEXTS.adminFormSubmitBtn}
      </PrimaryButton>
    </Card>
  );
}

// ==================== screens/Product ====================
function PaperSelect({ order, patch, go, back, category, catPapers, paper }) {
  // 2026-08-02: "코팅 옵션을 직접 골라야 다음으로 못 넘어간다"는 불편 반영 —
  // 용지에 선택지(choice)가 있으면 "무광코팅"을 기본값으로 미리 골라둡니다.
  // 대부분 무광코팅을 쓰시니, 안 바꾸고 그냥 "다음"을 눌러도 되게 했습니다.
  // 물론 아래에서 언제든 다른 코팅으로 바꿀 수 있습니다.
  const defaultChoiceFor = (p) => {
    if (!p.choice) return null;
    const choices = p.choice.split(",").map((c) => c.trim());
    return choices.includes("무광코팅") ? "무광코팅" : choices[0];
  };
  const selectPaper = (p) => {
    const changed = order.paperCode !== p.code; // 실제로 용지가 바뀌었을 때만 옵션 초기화
    patch({
      paperCode: p.code,
      selOptions: changed ? defaultSelOptions(category, p) : order.selOptions,
      paperChoice: changed ? defaultChoiceFor(p) : order.paperChoice,
    });
    if (!p.choice) go("options");
  };
  const selectChoice = (p, c) => {
    const changed = order.paperCode !== p.code || order.paperChoice !== c;
    patch({
      paperCode: p.code,
      selOptions: changed ? defaultSelOptions(category, p) : order.selOptions,
      paperChoice: c,
    });
    go("options");
  };
  const canNext = order.paperCode && (!paper?.choice || order.paperChoice);
  return (
    <div className="app-body">
      <TopBar title={`${category?.name || ""} · ${TEXTS.paperScreenTitleSuffix}`} sub={category?.note} onBack={back} step={1} go={go} />
      <div style={{ padding: "6px 18px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {catPapers.map((p) => {
          const choices = p.choice ? p.choice.split(",").map((c) => c.trim()) : [];
          const isSelected = order.paperCode === p.code;
          return (
            <Card key={p.code} selected={isSelected} onClick={() => selectPaper(p)}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 3, lineHeight: 1.45 }}>{p.desc}</div>
                </div>
                <div style={{ textAlign: "right", minWidth: 84 }}>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "var(--stamp)" }}>{won(order.memberType === "special" ? p.special : p.general)}</div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-soft)" }}>{p.sheets}{TEXTS.sheetsBasisSuffix}</div>
                </div>
              </div>
              {choices.length > 0 && (
                <div style={{ marginTop: 10 }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: "var(--ink)", marginBottom: 6 }}>{TEXTS.paperChoiceLabel}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {choices.map((c) => {
                      const chosen = isSelected && order.paperChoice === c;
                      return (
                        <button
                          key={c}
                          onClick={() => selectChoice(p, c)}
                          style={{
                            fontSize: 11.5, padding: "6px 10px", borderRadius: 999, cursor: "pointer",
                            border: `1.4px solid ${chosen ? "var(--stamp)" : "var(--line)"}`,
                            background: chosen ? "var(--stamp)" : "var(--paper-white)",
                            color: chosen ? "#fff" : "var(--ink)",
                            fontFamily: "inherit", fontWeight: 600,
                          }}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      <div style={{ padding: "4px 18px 18px" }}>
        <PrimaryButton disabled={!canNext} onClick={() => go("options")}>{TEXTS.nextOptions}</PrimaryButton>
      </div>
    </div>
  );
}

function OptionSelect({ order, patch, go, back, category, paper, catOptions, unit, optTotal, goodsTotal }) {
  const printSideOption = catOptions.find((o) => o.code === "OPT001");
  const otherOptions = catOptions.filter((o) => o.code !== "OPT001");
  // 2026-08-01: "기본값이 단면이라 그냥 지나치는 사람이 많다"는 요청으로 추가.
  // 디자인 화면으로 넘어가기 직전, 단면/양면 중 뭘 골랐는지 한 번 더 확인시킵니다 —
  // 꼼꼼히 안 읽고 넘어가는 사람도 이 확인창은 멈춰서 보게 됩니다.
  const [showPrintSideConfirm, setShowPrintSideConfirm] = useState(false);

  const toggleSimple = (code) => {
    const next = { ...order.selOptions };
    if (next[code]) delete next[code]; else next[code] = { choice: null };
    patch({ selOptions: next });
  };
  const setChoice = (o, value) => {
    if (o.multi) {
      const current = order.selOptions[o.code]?.choice;
      const arr = Array.isArray(current) ? current : [];
      const next = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
      patch({ selOptions: { ...order.selOptions, [o.code]: { choice: next } } });
    } else {
      patch({ selOptions: { ...order.selOptions, [o.code]: { choice: value } } });
    }
  };
  const setPrintSide = (value) => {
    patch({ selOptions: { ...order.selOptions, OPT001: { choice: value } } });
  };

  const canNext = !printSideOption || !!order.selOptions.OPT001?.choice;

  return (
    <div className="app-body">
      <TopBar title={TEXTS.optionScreenTitle} sub={`${category?.name} · ${paper?.name}`} onBack={back} step={2} go={go} />
      <div style={{ padding: "6px 18px 4px" }}>
        {category?.note && (
          <Card style={{ background: "var(--paper-deep)", border: "none", marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{TEXTS.categoryNotePrefix} <b style={{ color: "var(--ink)" }}>{category.note}</b> {TEXTS.categoryNoteSuffix}</div>
          </Card>
        )}
        {/* 2026-08-02: "빠른스노우250g는 익일출고를 위해 옵션을 못 받게 해달라"는
            요청 반영 — 인쇄방식(단면/양면)은 그대로 고를 수 있지만, 다른 옵션은
            availableOptions()에서 이미 목록 자체가 안 뜨도록 걸러져 있습니다. 여기서는
            "왜 옵션이 안 보이는지"를 고객에게 설명해줍니다. */}
        {paper?.restrictedOptions && (
          <div style={{
            fontSize: 11.5, color: "#B45309", background: "#FEF3C7", border: "1px solid #FDE68A",
            borderRadius: 10, padding: "10px 12px", marginBottom: 12, lineHeight: 1.5,
          }}>
            {TEXTS.restrictedOptionsNotice}
          </div>
        )}

        {printSideOption && (
          <Card style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{printSideOption.name}</div>
            <div style={{ display: "flex", gap: 8 }} onClick={(e) => e.stopPropagation()}>
              {printSideOption.choice.map((c) => {
                const sel = order.selOptions.OPT001?.choice === c.value;
                return (
                  <button
                    key={c.value}
                    onClick={() => setPrintSide(c.value)}
                    style={{
                      flex: 1, fontSize: 12.5, padding: "10px 8px", borderRadius: 10, cursor: "pointer",
                      border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                      background: sel ? "var(--stamp)" : "var(--paper-white)",
                      color: sel ? "#fff" : "var(--ink)",
                      fontFamily: "inherit", fontWeight: 700,
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </Card>
        )}

        {otherOptions.length === 0 && !printSideOption && (
          <div style={{ fontSize: 13, color: "var(--ink-soft)", padding: "10px 2px" }}>{TEXTS.noOptionsAvailable}</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {otherOptions.map((o) => {
            const checked = !!order.selOptions[o.code];
            const fee = optionFee(o, order.selOptions);
            const feeLabel = fee > 0 ? `+${won(fee)}` : TEXTS.noExtraFee;
            return (
              <Card key={o.code} selected={checked} onClick={() => toggleSimple(o.code)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{o.name}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: fee ? "var(--stamp)" : "var(--ink-soft)" }}>{feeLabel}</span>
                    <div style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${checked ? "var(--stamp)" : "var(--line)"}`, background: checked ? "var(--stamp)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {checked && <Check size={13} color="#fff" />}
                    </div>
                  </div>
                </div>
                {checked && o.choice && (
                  <>
                    {o.multi && <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 8 }}>{TEXTS.multiChoiceHintPrefix}{o.choice.length}{TEXTS.multiChoiceHintSuffix}</div>}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }} onClick={(e) => e.stopPropagation()}>
                      {o.choice.map((c) => {
                        const sel = o.multi
                          ? (Array.isArray(order.selOptions[o.code]?.choice) && order.selOptions[o.code].choice.includes(c.value))
                          : order.selOptions[o.code]?.choice === c.value;
                        return (
                          <button
                            key={c.value}
                            onClick={() => setChoice(o, c.value)}
                            style={{
                              fontSize: 11.5, padding: "6px 10px", borderRadius: 999, cursor: "pointer",
                              border: `1.4px solid ${sel ? "var(--stamp)" : "var(--line)"}`,
                              background: sel ? "var(--stamp)" : "var(--paper-white)",
                              color: sel ? "#fff" : "var(--ink)",
                              fontFamily: "inherit", fontWeight: 600,
                            }}
                          >
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </Card>
            );
          })}
        </div>
        <Field label={TEXTS.setQuantityLabel(paper?.sheets)}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => patch({ sets: Math.max(1, order.sets - 1) })} style={stepperBtn}>−</button>
            <div style={{ fontSize: 16, fontWeight: 700, minWidth: 28, textAlign: "center" }}>{order.sets}</div>
            <button onClick={() => patch({ sets: order.sets + 1 })} style={stepperBtn}>+</button>
          </div>
          {paper?.sheets && order.sets > 1 && (
            <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 6 }}>
              {TEXTS.setQuantityTotalSheets(order.sets, paper.sheets * order.sets)}
            </div>
          )}
          {order.memberType === "general" && (
            <div style={{ marginTop: 8 }}>
              <Stamp active={order.sets >= 3} tone={order.sets >= 3 ? "gold" : "stamp"}>
                {order.sets >= 3 ? TEXTS.freeShipReached : TEXTS.freeShipRemaining(3 - order.sets)}
              </Stamp>
            </div>
          )}
        </Field>
        <Card style={{ background: "var(--paper-deep)", border: "none", marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "var(--ink-soft)" }}>
            <span>{TEXTS.paperLineLabel(order.sets, won(unit))}</span><span>{won(unit * order.sets)}</span>
          </div>
          {optTotal > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "var(--ink-soft)", marginTop: 4 }}>
              <span>{TEXTS.optionLineLabel(order.sets, won(optTotal))}</span><span>{won(optTotal * order.sets)}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 900, marginTop: 8, borderTop: "1px solid var(--line)", paddingTop: 8 }}>
            <span>{TEXTS.goodsTotalLabel}</span><span style={{ color: "var(--stamp)" }}>{won(goodsTotal)}</span>
          </div>
        </Card>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <PrimaryButton
          disabled={!canNext}
          onClick={() => (printSideOption ? setShowPrintSideConfirm(true) : go(order.authed ? "design" : "auth"))}
        >
          {TEXTS.nextPrefix}{order.authed ? TEXTS.nextDesign : TEXTS.nextSignupLogin}
        </PrimaryButton>
        {!canNext && (
          <div style={{ fontSize: 11, color: "var(--ink-soft)", textAlign: "center", marginTop: 8 }}>
            {TEXTS.missingFieldsHint}{printSideOption?.name}
          </div>
        )}
      </div>
      {showPrintSideConfirm && (
        <ConfirmDialog
          title={TEXTS.printSideConfirmTitle}
          message={TEXTS.printSideConfirmMessage(printSideOption?.choice.find((c) => c.value === order.selOptions.OPT001?.choice)?.label || "")}
          cancelLabel={TEXTS.printSideConfirmCancel}
          confirmLabel={TEXTS.printSideConfirmProceed}
          onCancel={() => setShowPrintSideConfirm(false)}
          onConfirm={() => {
            setShowPrintSideConfirm(false);
            go(order.authed ? "design" : "auth");
          }}
        />
      )}
    </div>
  );
}

// stepperBtn: components/ui.js 로 이동 (Home/Auth/Complete에서도 공용으로 씀)

// ==================== App ====================
function App() {
  const [screen, setScreen] = useState("home");
  const [hist, setHist] = useState([]);
  const [order, setOrder] = useState({
    catCode: null, paperCode: null, paperChoice: null, sets: 1,
    selOptions: {},
    memberType: null, name: "", phone: "", phoneVerified: false, password: "", company: "", bizDoc: false, authed: false,
    verifiedCompanies: {}, // { [companyId]: true } — Company Resolution Engine, 1회 이메일 인증 후 재사용
    designMethod: null,
    ship: { name: "", addr: "", phone: "" },
    depositor: "",
    orderNo: null,
  });

  // go("home")을 반복 호출해도 history가 home,home,home... 으로 계속 쌓이던 문제 수정.
  // - 같은 화면으로 다시 이동하는 경우는 무시
  // - home은 앱의 루트이므로 이동 시 history를 초기화 (뒤로가기가 home들을 계속 순회하지 않도록)
  const go = (s) => {
    if (s === screen) return;
    setHist((h) => (s === "home" ? [] : [...h, screen]));
    setScreen(s);
  };
  const back = () => { setHist((h) => { const n = [...h]; const p = n.pop(); if (p) setScreen(p); else setScreen("home"); return n; }); };
  const patch = (p) => setOrder((o) => ({ ...o, ...p }));

  const category = useMemo(() => CATEGORIES.find((c) => c.code === order.catCode), [order.catCode]);
  const paper = useMemo(() => PAPERS.find((p) => p.code === order.paperCode), [order.paperCode]);
  const catPapers = useMemo(() => PAPERS.filter((p) => p.cat === order.catCode), [order.catCode]);
  const catOptions = useMemo(() => availableOptions(category, paper), [category, paper]);

  const unit = paper ? (order.memberType === "special" ? paper.special : paper.general) : 0;
  const optTotal = useMemo(() => Object.entries(order.selOptions).reduce((sum, [code]) => {
    const o = OPTIONS.find((x) => x.code === code);
    return sum + (o ? optionFee(o, order.selOptions) : 0);
  }, 0), [order.selOptions]);
  const freeShip = order.memberType === "general" && order.sets >= 3;
  const shipFee = freeShip ? 0 : 3000;
  const goodsTotal = useMemo(() => (unit + optTotal) * order.sets, [unit, optTotal, order.sets]);
  const grandTotal = useMemo(() => goodsTotal + shipFee, [goodsTotal, shipFee]);

  return (
    <div className="app-outer" style={{ fontFamily: "'Pretendard Variable', Pretendard, -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;500;700&family=Gowun+Dodum&display=swap');
        * { font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif; box-sizing: border-box; }
        html, body, #root { height: 100%; margin: 0; }
        .serif { font-weight: 800; letter-spacing: -0.02em; }

        /* 실제 모바일 화면에서는 앱처럼 화면을 꽉 채우고,
           데스크톱처럼 넓은 화면에서는 가운데 정렬된 카드 형태로 보이게 합니다. */
        .app-outer {
          --paper:#F3F3F8; --paper-deep:#F1F0FB; --paper-white:#FFFFFF; --ink:#17171F; --ink-soft:#8A8A97;
          --stamp:#6C4CF0; --stamp-2:#4C6FFF; --gold:#DB9E1E; --line:#ECECF3; --bg-outer:#E7E7EE;
          min-height: 100dvh; width: 100%; background: var(--bg-outer);
          display: flex; justify-content: center;
        }
        .app-frame {
          width: 100%; max-width: 480px; min-height: 100dvh;
          background: var(--paper); overflow: hidden;
          display: flex; flex-direction: column; color: var(--ink);
        }
        .app-body { flex: 1; overflow-y: auto; padding-bottom: 20px; -webkit-overflow-scrolling: touch; }
        input:focus, textarea:focus { outline: 2px solid var(--stamp); outline-offset: 1px; }
        ::placeholder { color: #b7b6c2; }

        /* 481px 이상(태블릿·데스크톱)에서만 카드처럼 살짝 띄워서 보여줍니다.
           실제 폰 화면(480px 이하)에서는 이 스타일이 적용되지 않고 화면을 꽉 채웁니다. */
        @media (min-width: 481px) {
          .app-outer { padding: 24px 12px; }
          .app-frame {
            min-height: calc(100dvh - 48px);
            border-radius: 28px;
            box-shadow: 0 2px 0 var(--line), 0 24px 60px rgba(20,20,50,0.14);
            border: 1px solid var(--line);
          }
        }
      `}</style>
      {/* ====================================================================
          Domain : Editor / Order
          Version : 1.0
          Responsibility :
            Editor domain  → "design" 화면 (Design/AiFlow) — 실제로 명함을 만드는 경험
            Order domain   → 그 외 전부 (home/lookup/paper/options/auth/shipping/
                              payment/complete/inquiry) — 카테고리 선택부터 결제·배송·
                              사후문의까지 "주문"이라는 상거래 흐름
          이 두 도메인은 화면(스크린) 단위로 이미 자연스럽게 분리돼 있어서
          별도 폴더 구조 없이도 파일 위치 자체가 경계 역할을 하고 있습니다.
      ==================================================================== */}
      <div className="app-frame">
        {screen === "home" && <Home order={order} patch={patch} go={go} />}
        {screen === "lookup" && <OrderLookup order={order} patch={patch} go={go} />}
        {screen === "paper" && <PaperSelect order={order} patch={patch} go={go} back={back} category={category} catPapers={catPapers} paper={paper} />}
        {screen === "options" && <OptionSelect order={order} patch={patch} go={go} back={back} category={category} paper={paper} catOptions={catOptions} unit={unit} optTotal={optTotal} goodsTotal={goodsTotal} />}
        {screen === "auth" && <Auth order={order} patch={patch} go={go} back={back} />}
        {screen === "pendingApproval" && <PendingApproval order={order} patch={patch} go={go} back={back} />}
        {screen === "design" && <Design order={order} patch={patch} go={go} back={back} />}
        {screen === "shipping" && <Shipping order={order} patch={patch} go={go} back={back} freeShip={freeShip} />}
        {screen === "payment" && <Payment order={order} patch={patch} go={go} back={back} paper={paper} category={category} unit={unit} optTotal={optTotal} shipFee={shipFee} goodsTotal={goodsTotal} grandTotal={grandTotal} />}
        {screen === "complete" && <Complete order={order} go={go} grandTotal={grandTotal} category={category} />}
        {screen === "inquiry" && <Inquiry order={order} go={go} back={back} />}
        {screen === "admin" && <Admin go={go} back={back} />}
      </div>
    </div>
  );
}

// ==================== domain/asset/backgroundStyles ====================
// [Asset Domain: Catalog] ── Background Style Object v1.1 ─────
// 재단선 안쪽 카드 배경. 사진 배경형처럼 사진이 전체를 덮는 템플릿에서는 사진에 가려져 안 보일 수 있습니다.
//
// dark 플래그: 이 배경 위에 어두운 텍스트(var(--ink))를 얹으면 잘 안 보이는지 여부.
// gradient(보라→파랑)처럼 짙은 배경에 어두운 텍스트를 그대로 쓰면 글자가 거의 안
// 보이는 문제가 있었습니다 — "사진 배경형" 템플릿에만 있던 흰 텍스트(overlay) 처리를
// 일반 배경색 선택에도 적용하기 위해 이 플래그를 씁니다(렌더러 CardLayoutPreview.jsx
// 참고). 값은 실제 각 배경색을 보고 사람이 판단한 것이지, CSS를 실시간으로 분석해서
// 계산한 게 아닙니다 — gradient처럼 문자열이 단색이 아닌 배경은 자동 계산이 애매해서,
// 대신 이렇게 미리 판단해두는 편이 더 확실합니다.
const BACKGROUND_STYLE_OPTIONS = [
  { id: "white", label: "화이트", css: "var(--paper-white)", dark: false },
  { id: "soft", label: "소프트 컬러", css: "var(--paper-deep)", dark: false },
  { id: "gradient", label: "그라데이션", css: "linear-gradient(135deg, #6C4CF0, #4C6FFF)", dark: true },
];

// ==================== domain/asset/fontFamilies ====================
// [Asset Domain: Catalog] ── Font Family Object v1.0 ────────────────
// 명함에 실제로 렌더링되는 텍스트(회사명·이름·연락처 등)의 서체 카탈로그입니다.
// LOGO_ADVANCED_GROUPS.font(logoTypes.js)와 다른 것입니다 — 그건 "로고를 만들 때
// AI에게 어떤 느낌으로 그려달라고 할지"를 설명하는 문구일 뿐이고, 실제로 카드 위에
// CSS font-family로 적용되지 않았습니다. 이 파일이 처음으로 실제 렌더링에 적용되는
// 서체 선택입니다.
const FONT_OBJECT_VERSION = "1.0";
const FONT_FAMILIES = [
  { id: "thinMyeongjo", label: "가는 명조", family: "'Noto Serif KR', serif", weight: 300 },
  { id: "myeongjo", label: "명조", family: "'Noto Serif KR', serif", weight: 500 },
  { id: "boldMyeongjo", label: "굵은 명조", family: "'Noto Serif KR', serif", weight: 700 },
  { id: "gothic", label: "고딕", family: "'Pretendard', sans-serif", weight: 600 },
  { id: "thinGothic", label: "가는 고딕", family: "'Pretendard', sans-serif", weight: 300 },
  { id: "boldGothic", label: "굵은 고딕", family: "'Pretendard', sans-serif", weight: 700 },
  // "부드러운 고딕": Pretendard의 두께 조절만으로는 낼 수 없는 느낌이라(부드러움은
  // 두께가 아니라 글자 형태 자체의 문제) 실제로 다른 서체(구운 도담 — 둥근 인상의
  // 무료 한글 서체)를 씁니다.
  { id: "softGothic", label: "부드러운 고딕", family: "'Gowun Dodum', sans-serif", weight: 400 },
];
const FONT_FAMILY_DEFAULT = "gothic";

function resolveFontFamily(id) {
  return FONT_FAMILIES.find((f) => f.id === id) || FONT_FAMILIES.find((f) => f.id === FONT_FAMILY_DEFAULT);
}

// ==================== domain/asset/logoColors ====================
// [Asset Domain: Catalog] ── Color Object v1.0 ────────────────
// 지금 화면은 색상 1개만 고르게 되어 있어서, v1.0은 "주색(primary)"만 다룹니다.
// 보조색(secondary)·강조색(accent) 3단계 팔레트는 실제로 화면에서 쓰이게 되는
// 시점(예: 템플릿이 다중 색상 영역을 지원하게 될 때)에 v1.1로 확장 예정 — 지금은 보류.
const COLOR_OBJECT_VERSION = "1.0";
// css 값 추가: 예전엔 라벨만 있고 실제 색상값이 없어서, 색상을 골라도 미리보기에
// 전혀 반영되지 않는 죽은 기능이었습니다 (로고 업로드 시 색상 자동 추출 기능을
// 만들면서 발견). 이제 실제로 미리보기에 반영됩니다.
const LOGO_COLORS = [
  { id: "aiPick", label: "AI 추천", css: null },
  { id: "blue", label: "파랑", css: "#2563EB" },
  { id: "red", label: "빨강", css: "#DC2626" },
  { id: "black", label: "검정", css: "#17171F" },
  { id: "white", label: "흰색", css: "#FFFFFF" },
  { id: "green", label: "초록", css: "#16A34A" },
  { id: "yellow", label: "노랑", css: "#EAB308" },
  { id: "purple", label: "보라", css: "#7C3AED" },
  { id: "gold", label: "금색", css: "#DB9E1E" },
  { id: "silver", label: "은색", css: "#B0B0B8" },
  { id: "multi", label: "여러 색", css: "linear-gradient(135deg, #6C4CF0, #4C6FFF, #DB9E1E)" },
];

// logoColor 값(카탈로그 id 또는 로고에서 추출한 #hex)을 실제 렌더링용 CSS 값으로 변환
function resolveLogoColor(logoColor) {
  if (!logoColor) return "var(--gold)";
  if (logoColor.startsWith("#")) return logoColor; // 업로드한 로고에서 추출한 색
  const found = LOGO_COLORS.find((c) => c.id === logoColor);
  return found?.css || "var(--gold)"; // aiPick이거나 못 찾으면 기본값
}

// ==================== domain/asset/logoConcepts ====================
// [Asset Domain: Catalog] ── Style Object v1.0 ────────────────
// "로고 만들기" 화면에서 고르는 분위기 컨셉. label은 칩에 짧게 보여주고,
// phrase는 실제 AI 요청 문구로 합쳐집니다.
// (참고: 파일 아래쪽 STYLE_TAG_POOL은 "회사명 → 업종 스타일 추천" 기능 전용의
//  별도 어휘 목록입니다 — 용도가 달라 지금은 통합하지 않았습니다. v1.1 후보로 메모.)
const STYLE_OBJECT_VERSION = "1.0";
const LOGO_CONCEPTS = [
  { id: "industry", label: "업종 특징 반영", phrase: "회사명과 업종에 어울리는 특징이 잘 드러나는 로고" },
  { id: "industryColor", label: "업종별 어울리는 색상", phrase: "서비스 업종에 어울리는 색상과 분위기" },
  { id: "future", label: "미래지향적", phrase: "미래지향적이고 세련된 색상과 이미지" },
  { id: "trust", label: "신뢰감·안정감", phrase: "신뢰감 있고 안정적인 느낌" },
  { id: "warm", label: "따뜻함·친근함", phrase: "따뜻하고 친근한 느낌" },
  { id: "minimal", label: "미니멀·심플", phrase: "군더더기 없이 미니멀하고 심플한 형태" },
  { id: "premium", label: "고급스러움", phrase: "고급스럽고 품격 있는 느낌" },
  { id: "trendy", label: "젊고 트렌디", phrase: "젊고 트렌디한 감각" },
];

// ==================== domain/asset/logoTypes ====================
// [Asset Domain: Catalog] ── Logo Object v1.0 ─────────────────
// 속성: 종류(type) · 위치(좌표 시스템 참조) · 크기(TEMPLATE_LAYOUTS의 w 값)
// "색상"은 로고 자체가 아니라 카드 전체의 Color Object를 따릅니다(중복 정의 방지).
const LOGO_OBJECT_VERSION = "1.0";
const LOGO_TYPES = [
  { id: "text", label: "문자형 로고", desc: "회사명만으로 표현" },
  { id: "initial", label: "이니셜 로고", desc: "예: GS, KC" },
  { id: "symbolText", label: "심볼 + 문자형", desc: "가장 많이 사용" },
  { id: "character", label: "캐릭터 로고", desc: "캐릭터 중심" },
  { id: "emblem", label: "엠블럼", desc: "원형 · 방패형" },
  { id: "signature", label: "시그니처", desc: "손글씨 느낌" },
  { id: "abstract", label: "추상 로고", desc: "도형 · 패턴 중심" },
  { id: "mascot", label: "마스코트 로고", desc: "동물 · 캐릭터 마스코트" },
];

// Logo Object의 확장 속성(이미 화면에 구현되어 있어 v1.0에 포함 — 사실상 다음 버전 성격이지만
// "실제 화면에서 쓰이는가?" 기준을 충족하므로 보류하지 않고 포함시켰습니다).
// 대부분의 사용자에게는 판단하기 어려운 영역이라 기본은 전부 "AI 추천"으로 둡니다.
const LOGO_ADVANCED_GROUPS = [
  { key: "icon", label: "아이콘", options: ["AI 추천", "아이콘 없이 텍스트만"] },
  { key: "font", label: "글꼴", options: ["AI 추천", "굵은 글씨", "얇은 글씨", "손글씨", "고딕", "명조", "영문 스타일"] },
  { key: "shape", label: "형태", options: ["AI 추천", "원형", "사각형", "육각형", "가로형", "세로형", "자유형"] },
];
const LOGO_ADVANCED_DEFAULT = { icon: "AI 추천", font: "AI 추천", shape: "AI 추천" };

// ==================== domain/asset/photoVariantSampleImages ====================
// 자동 생성됨 — 사진배치 화면(photoTemplate)의 스타일 카드에 실제 샘플 명함 사진을
// 보여주기 위한 base64 이미지 (600px 폭으로 리사이즈 + JPEG 압축, 각 20~30KB)
// 2026-08-02: 사장님이 직접 올려주신 실제 샘플 4개(가로형 전체) — 왼쪽사진배치형(기타당),
// 오른쪽사진배치형(성형외과), 왼쪽동그라미사진형(원형 캐릭터), 오른쪽동그라미사진형(AI디자인 명함).
//
// ⚠️ templateSampleImages.js와 같은 원칙: 이 샘플들의 텍스트(정당명·병원명 등)는
// 디자인 생성 로직이 절대 참조하지 않습니다 — 오직 레이아웃(사진 위치·모양)만
// 보여주는 용도입니다. 실제 디자인 생성은 고객이 입력한 정보만 참고합니다.
const PHOTO_VARIANT_SAMPLE_IMAGES = {
  "오른쪽동그라미사진형": "data:image/jpeg;base64,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q09lGmb3pO0SrdeVwlNF0OMfDKKjk/NuJA9E4q8UoKJ2xWK66g0uxHssdUiQzMQ6ppKwkqSEqHGSAeSKiLtdtZXm2OW259m4kRHAkLbM/G7BBHIIPUCupUxQc819Yrtd+zSDAs9tVHmtfDqMFt7lkBJBQFE87c+vOK0Z941rcrUu2XHs6+IiuNpbcQqfjeBjzBz1ArqNMUFD1Do53U2hrTDZYTZ7lAS27FZUsrTHWkY7sq5JGMc88gVX5+hNSSoOo73f3mJ99lwfho0eEPClOU5xkDnA6e59a65Sg5z/ACY1FP7NLJp+JJbti1NBq5B5JKw1zkJx5+o889RzUXrHRMyPN0zD09b334NvhSWlLGDhSknBV7qJz99dapQU/smtc6zaFgwbnGXGlNuOlTTnUArJH5Vqay0Vd7rqmDqLT94Zt82NHLGXWt/Hi5HBHRRHIq90oOK670h2gzrdERNuiL62iUlXw8aOlCkHB8ZOBx5ffV11do2ZqzU0FVzmNnTkQd78GgELde5BCj6Y8/TIA5zV1pQcO1V2damt1nXabS4bnZ03FEiJHSnLzOQrdknAAHA88k545q59qlrvk17T87T8Fc1y3TS+6yh0IKgNpAOSODtI++r9Sg5ZfLnq+/wTCu/ZqJMYrC+7VPx4h0OQQfOumwwUxGAWu5IbSC1nOzgeHPt0+6s2KUClKUClKUClKUClKUGOQwzKYWxJaQ6y4Nq23EhSVD0INcy1P2QxHyuRpt4RXDz8K8SWz/qq6p+/IrqNKux+XL1p672J7u7rBdj88LIyhX0UODUeEeZH4V+sXW23m1NPIS42rhSFpBB+oNVG79mmmLkVLTDVCdPO+GvYP93lP5VfJH58KRTux/dXV7h2MvZJtt+48kSo/wDFJ/hUV/M9qQE7bjayPdTn/DWtwc+7sfjTu0gV0D+Z7U2f+ULV/vuf8Fem+x3URUA5dLYhPmUlxR/DaKbg50tCcViIGMngAg5rsdv7F2goKul9fdHmiMylA/FWT+VXGy6B0zZlJcjWxt14f56Se9V+fA+4VPKGnLrDpi7XxtpcSKoMlI/Tu+BH4nr91dH07oC3WwpfnkTpI5G9OG0n2T5/fVwHAAHQdKUudqTGQHHApSlYaKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQf/Z",
  "왼쪽사진배치형": "data:image/jpeg;base64,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",
  "오른쪽사진배치형": "data:image/jpeg;base64,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",
  "왼쪽동그라미사진형": "data:image/jpeg;base64,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",
};

// ==================== domain/asset/styleTags ====================
// 스타일 태그 전체 후보 목록 (AI는 이 안에서만 골라야 함 - 결과가 매번 들쭉날쭉해지는 것을 방지)
const STYLE_TAG_POOL = [
  "따뜻한", "미니멀", "북유럽", "빈티지", "고급스러운", "감각적인",
  "젊은", "깔끔한", "부드러운", "여성스러운", "신뢰감있는", "전문적인",
];

// ==================== domain/asset/templateSampleImages ====================
// 자동 생성됨 — 5개 템플릿 카드에 실제 샘플 명함 사진을 보여주기 위한 base64 이미지
// (원본 크기 690KB → 리사이즈+압축 후 약 40KB로 줄여서 번들 용량에 큰 영향 없게 함)
// 2026-08-02: 사장님이 직접 올려주신 실제 샘플로 3개 교체 — 사진형(호국AI수학학원),
// 캐릭터변환형(캐릭터 전문 명함), 자유형(AI디자인 명함). 이름크게형·회사이름강조형은
// 그대로 유지.
//
// ⚠️ 중요한 원칙(2026-08-02): 이 샘플들은 "레이아웃(요소 배치)이 이렇다"를 보여주기
// 위한 것이지, "이런 디자인 느낌으로 만들어달라"는 참고 대상이 아닙니다. 샘플 안에
// 박혀있는 텍스트(학원명·병원명·정치인 이름 등)는 절대 디자인 생성 로직이 참조하면
// 안 됩니다 — AI 디자인 생성 기능을 나중에 만들 때, 프롬프트에는 오직 고객이 이 화면
// 이후 직접 입력한 정보(회사명·이름·연락처 등)만 넣어야 합니다. 샘플 이미지는 화면에
// "보여주기만" 하고, 그 자체를 코드나 프롬프트가 텍스트로 읽어들이는 경로는 없습니다
// (지금 구조상 이미지는 <img> 태그로 화면에 렌더링될 뿐, OCR이나 텍스트 추출을 거쳐
// 어딘가에 값으로 들어가는 경로 자체가 없어서 이 원칙은 구조적으로 지켜지고 있습니다).
const TEMPLATE_SAMPLE_IMAGES = {
  "이름크게형": "data:image/jpeg;base64,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",
  "회사이름강조형": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHCAkIBgoJCAkMCwoMDxoRDw4ODx8WGBMaJSEnJiQhJCMpLjsyKSw4LCMkM0Y0OD0/QkNCKDFITUhATTtBQj//2wBDAQsMDA8NDx4RER4/KiQqPz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz//wAARCADiAZADASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAEFAgQGAwcI/8QASBAAAQMDAgQDBAkBBQQJBQAAAQACAwQFERIhBhMxQSJRYQcUcZEVFhcjMlJTgaEzJEJDsdFicoLBJTU3VFVzdJLhk8LS8PH/xAAaAQEBAAMBAQAAAAAAAAAAAAAAAQIDBAUG/8QALxEBAAIABgIAAwcEAwAAAAAAAAECAxESEyFRMUEEFCIjMlJhcaHBBTOB8JHR4f/aAAwDAQACEQMRAD8A+vKMDyUogjA8gmB5KUQRgeSYHkpRBCKUQEREBERAREQEREBERAREQEREBERAREQEREBERARSoQEREBERAREQEREBERAREQEREBERAREQEwiyCDHCYWeFBQYoiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIJREQQiKUEIpwoQEREBERAREQEREBERAREQEREBZBYrIFBPZYlZFYFAREQEREBThQpygYTCxkljhYXyvaxg6uccBYmoiEBn5jOSBqLwcjHnlEzhnhMLS+mrYTgV0H/uW3DNFPGHwyMkYf7zHAhWYmPMJW9beJzZYTCyTZRkxwiyRBjhFKIIRSiCEUoghFKIIRSoQEREEoUUIClQpQFCIgIiICKEQSiIgIiICKFKAiIgIiICkFQiCcqERAREQEREBFCIKuYx3inq6Soimp445ANbsDXg9RntsqmesdSztsMTWupHNbFzzu4B3X0yMqyqtN+o6uhjEkDopGtL5GbHB7eY2VSZzQNPDZYHum8AnzgDXvnT6fFdNI9ft/Lzcacpie+M++fu5fy2W8J0bwdFbMfhpKqqukruHKxk1PLqjedngYDv9lwV3Q044bhEcpfUGqmABjjxp2xuvbi3T9Ayauokbp+Of9MrKuJbXETOcSwxPh8Pam9Y02rzxKyt9Y2uoYqlgwJG5Iz0PcfNaX0v/wBM+7aY/d+ZyNerxc3Tqxjy7fFa3BxcbKc9BM7H8Lbbbre5nKbTF3jzzg3xatWc6+uc91z3jTaYh6GBecTCrafcPWmrZJqSslc1odBLKxoHcN6ZWrS3KtEdvlq2QOirS1o5WoOjc5uRnPUbYW1TimEckcbJGx1EjyXOGznOznft3XlQUFIx0MkcVS4RNxCZ3lwYMY8IJ22WDa17dd6mspzK1sb5OU54gbC9pJHQB58JWAvM7LfPNI6CSaPlkwiN8bmanAHId1xnqFtUdDSRQvjpX1ZiZqj5XOdp364Gf5WIo6F9O50ramQTNDQ6V5c4tb4wAc7DbKDJ1dVSPqZYHUsVLTSmNxn1ZcRjUcj8I326rWqr+6mmuUT4mtNPqFPIfwyODQ4tPrv+626mhoJS+d/MDZxqkbHI4NkwM5IHXYLI0NHVwVMctM/l1ThJJr2ycAAjfY4AQb8bi+Jjj1c0H+FKhoDWho6AYCnqUHzv2j+0Gq4UulLQ26npp5ZITLLztR0gnDQMEeR/hdtY7iy72ShuMeA2qhZJgdiRuP2OQvgd6ulpvnHHEVZd6nlwGCWKhOhzwXtAbH0Gw2J/dfQ/YjdffOE5be92ZKCfAGf7j/EP51INzgXjWu4jqr3FWUtNE23t1R8rUC7d3XJP5VzdD7VOI7hG6Sg4V96Y06XOhErwD5EgLy9j/wD1jxd/5f8AzkW97D6umpuGLkaipih/tYP3kgb/AHB5lB78XcW3+L2a0d3ZDJZrhLW8p8encNw7s8d8Aq9vvEd5tHDFmqrdapLvUVMTOdhriQdAOoho7klUHtluNFcOCGGhrIKrlV7GyGGUP0nQ/Y4XYvu8Fi4CgudS4BlPQxuAJ/E7QNLR6k4CDgKL2q8Q18skdFwsKl0RAkEXMcWE+eBt0KuPZpxBd71xJxBBc6180NK/EMbmtAZl7h2GegwuU9i92NHxbU0lcTG66xB8bn7B72uJGPiC75KPZ5W3el9olzitdCKilqK3RWSFpPJj5jvFnO3fz6Iq3reNuLr5ebo3hGmhFBbMl5cxrnPAJ38Xc4JAHYLdm47rrp7I629UjxR3SllZDI6IZAJc3doOdi137bqmfZeL+Er7eafhqlirqW55wQWucwHJB06gQ4BxGTsV73Dhio4X9iFzp64t98qJ45pWtOQzxsAbnvsN/ig+h8EVtTceDLXWV0zpqmaHVJI4AFx1HyVH7T+LLnwrT211qZTvfVSPa4TMLugbjG481aezn/s+sv8A6f8A+4qn9qnC914lp7WLRHE99LJI9/MkDMZDcdevQojl5vaRxhZr5BR8QWinaXN5jqeOLTI9pzjBDjjceXZWXAPGN24k9o1bBUSzQ2/3d8kdHIGnlkFoG+Ae5XH3Klu904ngq+IOJ7TS1UTeUaiGrj1RAZxtHjfJPrurr2XUr6f2o3Jvv30kxlLI331pLmynLDnVk/59kVr8be0+5yXRjOHp6q3wwh0crZI2HW8OO42PZYVPtOusvBEEMFRVRXmGUGesMbNMjCXYA2/3e3ZeHtDDKb2i1kvE0c9dQOZ/Zo6apawsBA0jvpxvkYGeu6qZn1MfssfBV1kbmOuMb6WlM7XyMZofqOnOQCS3/wDSg/QljllqLBbp6h5kmlpYnveQAXOLASdvUreXJezeyVNl4YYKqvdWGrDKhmoH7ppY3wbk9F1qIIiICIiAiIgIiICIiAiIgIiICKEQSihEGjeqWorbZJBSycuVxaQ4uLdgd9wqQGGmtNXb6l7ZLnFDJIXhpcR3BDyPIhdStaS30ck8kz6aN0srCx7yN3NxjC2VvlGUufFwdU6q+fH+P+3IWHiCO3QTsqxPM57wWkOzgY9SvOurqziOsjp6aEtjYctYDkD/AGnFdV9A2n/uEX8/6rep6aClj5dPEyJnkwYW6cakTqrHLkr8JjTSMO9/p/J526kbQUENMw6uWN3fmPc/NZQslhDY2hjo2nZxccgZ6Yx1Xui5pnOc5elWIrERDTgpHRCLVIXhjy4tJ8O5JBHqMpBTyxQ6GtY1+jTrDyd/PBC3EUVrQ0xglY5khcwM0FrgBsOh27/6pHTuZFStJaTCdz+xG3zWyiDUFM4CVuoadDmRD8oPXP77fALOkidEwNdG1uGgZa8uzj4rYRAWpdWVclpq47eWCrfC9sJecNDyMAkrbRB834M9mFDQWqVvE1FS1ta+UlrmvcWtZgYGdu+Svfgvgu48L8bXKrhdT/QtUHCONshL2jVqZtjtuOvdfQUQcB7P+Dblw9XXyS5SU5jrwGx8l5cQMuznIGNnLQj9jFiDgZLlcHN8hoH84X05EHx32icIW/hrgIQWaOpfz6+N0he4vJwx4B2G3VdNfeCzxZYuH2vuM1LFTQxc2Ebte3QMkDs/sCfNd4CR0KION4j9n1tvTrS6mkfb324sja+HqYWnOnPYjs7sSVzXsjp5IeK+KdccjW8wBpkB3+8f3PVfV0yT1JQfGOJJrvY/bDW3uisVVcIxG1rdMT9LsxNaSHAHpuva78bXm9WyW33LgKqlpZca2AzNzg5G4bnqF9hyR0J+aZPmfmgo+CyDwhbtNvfbgIyBSvc4mMBx2Jdv67+a8ePqG43Hgu40lnLve5GjDWuwXtDgXNB9Rn49F0SIPz3Za3g612xlJxFwncJLm3IleS4aj6Aubp+GF0/slttczia5XKjoqm3WCaNzY4Z3E6zkacZ64337ZxlfXCMkZGcdM7qfig+C+0Cl5ntXrXTWequcBjZ9zTlzHO+7buHBp6fBc7faGH3AGj4Rudsk1jM88skjSMHw4LBv+/ZfpzJ8z80yfM/NBXcPAt4btYcCCKOEEEYx4GqxREBERAREQEREBERARFIQQilQgKEUICZXlJM1hwXNB9SjJdXXG/TCTweWFZUGnjY5rQ7U8NJJ2aD3K92nLQTj9l5VMQqKaWFxwJGlufLK14q2nhp2snnZE+JoD2vdgggKczMRDKdOnP22JKljKhkGcyvBcGjsPNey5ua8tbUzCCalpi939esfpJbjYBnUj44G693y3mCD3qKopbhCBqc1jNJI/wBkjqt+zPHppta1eZiZhfItWhrIq6jjqYT4Hjoex8lW1E8dXfJbfUyuijYxpa0O06yfVYVw5mZifS64nLL2uwQehB+BUqnlsjYsyW2olppx0y8uYfQgr3t1wMpNPWhsNZHs9hOzvUeiTSMs6zmztNaxGc+VkihSsAREQFKhEEooRAREQEREBERAREQEREBERAREQEREBERAREQFCIglERAREQFIUKQgLErJYlBBWD5A0HcZA2BKzK0JWHnsDwSwHcf81YjOVjL2yFMTuHOyQCTqxn5dVk2lLckO3K17m24xAT2xzZCwYdTP6OHoexWNrvUFc/kSNdTVjfxU8uzs+nmrauqO4Y6Yjw04bldaCUx3aifNFnwz0rNe3qAorK+rr4XGkifb6RjSZq6qj0ua3vy2nfPqV0CpZQL7WiP8Vspnhz3dqiQdG+rW9/MrZSYzzy/39GWftT262PqdPurYrdTzAvYaiATVE4HV7i7pnOcLS97k4eu81PDXRPaf6jY2aQw9jp6Z+Gy6jibmxW0VlOSJ6V2tpHyK+ZXqaaa4UT5Bh8kGpw6YJbv/AJNK6sP7XKbeJbaW01teZ8RzC/fX07WYa5sQJJbIDpOf8ivDNXX1DRIdc0Y8J8x2x6Lj6OjberzWGfQaelyA6aXRHG0HGTgEkk9guit1U+zVTaOc008GA+DU4uaGnppeMHHxW/ernNaRy4sDXgfa4tc6z+36fy+i07q2ohihdJ7u4Mxq6klaj4H1tZ7hcXBlwgbzaapYMcxvT+O4VfXXeeEWyrY8xwl+HQtB0SDuQSMkj4rpLpRvqo4pqZwZVU7tcLz0Pm0+hC8mmdZ5nl2a63jmIynlVwXaptMxp765oh/w6jpnJ2Bx1+PzXQSzRQwummkayJoyXuOAAquSupqumdFVUbXuH4oZWgjP7rWmtTrvSsinc6GmYMNjBOPLp/qlpjOM2vLlu0l7payZkdKS8PONStFWWexUNoZilY8vIwXvdk//AArNYxxHJaI1TpngREVQRFoX2SoisVdJSF4nZC4sLBlwPoPNBvIuW9/D7jVxUlVXVMTLflmnVrfIZCBpJAz2Geg/ZaVNV3WBlVBPJV86CkpxUvkfqLXc5zZHs23BZkhw6ADuNg7dFx1vr7kXTSPlqJBG+kLgGlzuUXyAu0gZ3YGk4CtbDVz1Vyu5mkc5rJYuW0sczS0xg/hduPP1QXiIiAiIgIiICIiAiIgIiICIiAiIggopRAREQEREBSFCkIBUFSVCDXqTK1gdFFzTkAsyBkfuspY+Y0jOM9V6qFUmM/KujFwjuczp5YHW927MjDmbDb1+K8rhTQVVXTiooJJX6vBURbcryJdnP7brcr6unoqfXUglnQNa3UuWpbxZqAXC52qKrrppnh1SwODjGNyTv2+GT0WytLW5iDPLl0LrUJRoqa2rniPWN8gAPxwAStiYtpqdkdOGsDMANaNgPLC1LbfKS4QRyxuLBIMtzuD+69KuN/OdJjLCBgjstd62r9LbGeLxMvdksVVG6KQYLhgtPf4L55f7NPBdny1bg8HaJzW4GP8A+AD9l2NTVU9LS82plbGM4G+5PouevPGVtfSMp6i2yVOvIaZHackdwRvnG66/hYv5iGmsYlMSIn/yXJwU8dofVvqIRPR1ZxJHq0ua7OQQfitO5c65PZUUtNy6WFmhrWuzoA81hX3iCefkMo5zSuLS1sk3iHbIdgd/NdFaeDKa80oqKK5Nez+8zXlzD3B8P8rpvNsPzJi13MWLUmY49+P+GdDJ9KvZT22WWfmSRySskBDYQ0YDQfn8l9SiaWRMadyGgKh4X4Yp7DT4182dxJL8bD4ftsugXnYl4tbiGyZ4iM88vbF0Ub3anMaXeZCzWs+thZI5hO7Tg4wgrYfNw/4VhlLFsovEVUJ/v/wvRj2vGWHIUyGSIiAoc4NaXOcGgdSTjClV1/ZzLFVs9wjuGpmPdZJRG2TcbFx2Hn+yCYrraZpqp8VdSPkpQWVDhI3MYGSQ4+WxKiS72iCliuMtwo46eoAbHUula1sgGSAHd+/8r4xYrW+nr+IibXbql8LZGTaXiP3Jxa/BiJPjaBsR16fv9B4Fjt1V7MbKLnFSSsbG/Q2pa0t1Bzumrugv4+I+HXTkx3m2mWTAJbUs1O8h136/yt+apoqSpayaengnqCNLXvax0h6DAO58l8XudbRXfgC1V/0fa6O5yXdsZbSQtjOkE/vjp6LL2r1MlXxxO+mbO82ikjex0MRe1jy8Py4j8IwevmAg+1NqIHVL6ds8ZnYA58QeC5oPQkdQF6r55w1WMr/axX1sY8FZZoJxj10FfQ0BERAREQEREBFCIJREQEREBERARQpQEREBERAREQEREBQpUIK+7wc6ikaThrm6XfBcJW8NtpsyUTANQ8IjkLWgEdcDvlfSZGCSNzD0cMLlqlho5MuGCTozjAz29PTPqunBxLV4iWNvH08S560vqLPa20pyY2NDT4NRcR3A65WzDxc6kg5sLTUQtk0SRuy0s9emQeit4aSmqJWPrDrgkAZy3HIB7EHsR0W79Vbd7yJTzSANJYXDDh5HzCtpwrWmbZ5ujCvFcOKXp6/y4K4Vdx4luLPdYyHN2bBGzIHx8vjsqKtoblJcqYzBzmQHUH9vUA999v2X3CGCloKciGKOniaMnQ0NAXzji+stoqGw2mQcwuL3A50lx7AnoD6dyurBxdc6cuIc0WtS8X8phtlrq6EyTw6sdWsOMk9CPLfr8VaW6hpbPQ1FZRiVskZdI8Nk1Od02Gw2wOmFTWibXS69w0uBxpzjbPT4ro6i211Vw7UupcumkjywHILgO3pt0XNbXlNL29/s6sSdHxM3pGUTHP6umtlYyvt8VTE4Pa8fiHf1WxNIIoXyHo0ZXEcL8U0tJRmnusnJc3B1ae523A6b/wArrX1NHWQ6BUtAdv1x/mue9NFtMtUx7iOHO1r4nS+It8WS8kZwMEk/IFV1s45oqqpZTMoJ2SSENDg5rgP5XVQ2ZkUxmhl15aW+L175HwXi+0PN2M74YDTmHTjlAua/cZGB0IKZVj7sMZnPiZzacs894tT3WaV0EjZQ15kbpJGNwDvj4hdBboXwW+GOV5fIGjW4nOSqKiqLi6+CjZQe6W9hIGphOoDuD0GfJdMpaMpSszNcpERFioteuoqa4UclJXQMnp5QA+N4yHb53/cBbCIObdwLwq5jmmxUYBGMhhB/zXu3hKwiz0trlt0U9HSFxhZOS/QXHJ3KvUQc79R+Ff8AwGi/+n/8qwjsVqidWOjoIWmtjEVTsfvGAaQ0+mNlZIgraCw2q21LaihoYoJmwiAPbnIjBzp3PTKskRAREQEREBERBCIiCVCIgIiICIiAiIglERAREQEREBERAUKUQQV4y07ZMnJBPXuD+y91CsCjms72Oc+MiTUe3hLf9d91awvd7q2ScaC1vjz2wvdUfFNfHSULYXE5lO4B3IWyJm/BzMxGblOMLtU14NPA8xxt8TA0998OK5WnYKy0CoqR/aac6HhvcHr/ADg/NdPDSVFwe7SwGoqTiMHYN9fQBaPEdBFwYIoKN3vj6vxSCfAwcY+W3RddotNK0jifOTvriYFY0x74z/38821wrBzLhASR7u6QNdk4BJ7fE+S+nAYGy+acFQ1NyusFfU+FkR0wRNGlrfzED4bZ+K+mLkxbWtf6nNi1ikRWJzcVxRwtJPWOr7bDE6R27mlu4PcgeqoqcXGDXzwS9nVukgfIr6kvOWGKZpbLG14IwchNdbRleM2WF8RfD49OAoeKqmC4cqQtayEhro9P9Qnrv2x28yutt9/pa2d0LnNhftpDnbu9PjuElsNEXCSnhZHIHBxyNQf6OB6r0ns9NNXQVGhrWwgjlhgw7J7rO1sGYyiMnNHPNvKyRQBgYHZSudREUIJWLnNY0ue4NaBkknAClVfEUElRbowyF08cdTFJNC1uoyRtcC4Y7+eO+EFpkZxkdMqGua9ocxwc0jIIOQVxv0LcRamsbCRVGzPp3HUM51tLY8+enIVrZaOujiL4pPcqV1TJIylfTguEZdkDr4M7nHbKC+yPMbHHXusTLG0P1SMHL/Hlw8Px8lzb7TILYYWUniZem1MbcDZnODi8f8OStWqoz7zd6hlnnMhe2OFnI1Mf94XGU7/eeIl2nyAHdB2GRjOduuViJY3aMSMPMGWYcPF8PNUbLfLBZGwZlqaBlG2MUL4G814DQMFxd174/ZU1LbKhjrVptsvPhqnSCV0LWh0fNe7xHrFgO1aQN8gegDt9QGckbdd+ilcI+0cQG0VUL4I3yPuYqZQJzmb+kctOn8OoHbbZoHx7s9T8UBEUICIiAiKUEIpRBClEQEREEYRSiAiIgIiICIiAiIgIiICxc5rG6nuDR5lZLi+JLw5twkp2TRNDXYaHuIOwG4x6539FnSuqVrGqcm5eeKWUkroaZgfpBzJ13xlcSay6XRgq6mpYGvaHsL2ay3I2Gen8bK5s1p+lXuMMoew5D3gENaO4Gd8r24l4a5HulNaoHxwtGQ6Nucvyev8AGy7sKcOkxWPLO2Fh6858NKguzrfDG+GV01Tpw+Qs+ewWtd6uPiGqhqK5rAKZpZnONQz127LqbbwfF7vG+uJbKR4mMJ2+fResPBNBFV84zSSYdqYHtB0egPxVnHwomZiOUtWkaYpOUR+TY4Tp2+4NqWtLWOGmMFuNgcE4/ZX6hrWsY1jRhrRgBSvPvbVbNgIiLEEREBERBW3q7w2enZLNDLNrdpayHSXn4NJBP7ZWM18oYKGlqp5AxlU9rWDU12MnBJIJGkdSc4AXtdLVSXWAR1cQcW/geB4mbgnB7ZwteqsNLMIWwySUccONLKdsbR+LVjdpOM9RnB7hBaAggEEEHoQvCurIaCm59Q7THrYzOR1c4NHX1K9KeEQU8cLSS2NoaCQBsPQAD5AKs4nZbfoh815bJJSQnJjYC7USNI8I6kasjyO/ZBr13Fduo6WKodrfHLNJE1zXNDcsOCdROME9PNbbL7RupKKoxI0Vsb5ImOADsMaXOBGeuAuX4ho7DJRRUFTW10bIamVwdDG1xe5wbIRnHT7xpB2W4GWYU1DSSe9yOipyyOZ72MMLWSFrn5JAySMHGcjsiugq7rFTWdlyMUj4XRiTS0tDg0t1f3iAT6DdeUF+t8sjGOeYS6SWPMwDA10ZGoHJ2PiGB8VTXGstFRaKGinNXFCynjqIJTCCHBrMhpz1OOuBjJAznZeEMFnro6GyNmq+ax8tQWyMjJa4ueHBzT5ODsAA4x1RHQsvMc1BBV0lNNUQytccsdG3Tg431OHkemVNReqSC1UlwIe6GrLBEMtafGMjJcQBsPNUtp+gb7BHbI4ZZjbCzTJUwtLnta7PXHQkbjZdDV22nqaWGAaoGQPD4uRhukgEDAwRjBO2EFUeL7aLdHW6ZzDJVe7DDAfFjOdj0wV6M4no309FMyCpcKxzgxrWguaGu0lxGemT1CwbwhbRbvcnPqHRGV8hOsAkPaGuacDdpAGyl3ClGaOkpxNJilEjWufHG/UHkEghzSOoGEE1HFNFFT0s8UNRUtqYBO1sDQ9wafMZ65yPiFvz3WGKWeMQ1MksMcchjZESXB7i1oGepyN+w7ladbwzR1rKRsssrW0jGsjaxkeMNGO7Dt6dPRbNZZoKyKZkk87TNBHA9zHAEtY4u8sb5IO2CNkGvBxLRVEkLIoqj7+F0sbnNa1rtIyRknt5/h9VlBxFQy0s88jZYI4IXTPMgB8Ic5uxBIdktOMZzthH8PU8lQ2WWqqX6YnRtadAa3LNBIAbt4f7o8OQDjK0rbwZb6KmqKeaoqq2KcMyKiQ+HQSWlpGMblBY2++0dwrjSU+vmiFkztWkYDmhw2zqzhw7Y9VaKpobBTUNTTSxz1D20sXLhjkcC1nhDSc4ySQ0dTjrgK2QSihEEooRBKKEQERQgyRQpQEREBERAREQFGUTCBqwQuMqLDNPcn8yPU1zidRGR8crstITStlLzSc4PUw8KOngo6dsNOwNa0AE43ccdT6rZDlhp9UwsM8xnqHmmVjhThQSihSgIiICIiAiIg0qy4x0lXS074ah76lxbGY49TcgEkE522BP7JBdKGpqWQU1THO54eQYnBwGjTqBI6HxBa9zlpTc7fFK2eSdhfKxkLNWxaYyXHsPGqywWyx2mVklFc45XM1RDMzDnPLYBt1Iwwf8XqEHUKn4kZQOpKd1zjlnhZNltPGzUZXaXdQOuBqd+yuFS8TvpG0cAqqmeneJC+OSCPW5uGuD3EYI0hjnZJ6IKI2az3aFtpirK1rY3tqo5nMAEgaxkfhcQMgAs38/NLrQ2yKGjtctTW5oYnhkgpzIJHEB2AepkA3GPNWFkpLVJX18Eb5KhjWtaYqqnaW6GksbpcRlzAWOA7Zye+VrXBtubc66JlXXQSGAQMjp6UeEDS0shdpyN3tyBtl3ptFeTYLPX1VFTvnuOl0Xu8bXxgNjkDXMwXY2diNxLQdOWgkdFt1VHb7fcaDn1da9zpTJrbExzTM5zgHucG7EukPhG3TbAK87ULXUXWj5NXNMw0uiKOSka2Et06nNb4cNOlw1AdQAD5LcudutX0na6MzupHSyF8NLTsa1r3M8erp4CMY1DBIOFRWWSWzWmb3mCW5O1OFMWTwjELToLR0GhvjaQ0efTY46e3XSnuL6hkDZWugcA9ssZYd9wRnscfH0XKwUVlngpS281Mza6vLGnQ3+0SMwM407Ecv+oME5O+4V5w3DRB1wqKKtlrC+cwyyPaB4o9sZAGojONZyTgb7Ii8REQEREBERBCIiCFOURQERFQUKUQQilFBClEQSihFRKIiAihEEooRBKKEQSihEEooRBKKEQSihEEooUoCKEQU1xjtxv9JJVQyVFW2FwhY2n5uga2nXnB0kHAyqW3WKzQTxyR39kz6SUVLfvIvC5oDC53ppGDnbfOxAxf3GzsrbnS13MY2SnaWgPgbIMFwdkZ6HI6hVx4QpfdhFHVSMIYGBwY3OzAzf5ZRV1Hc6OWqjp4pQ98jdTCwamuGCdnDboFrX6301bStfVVZpI4g5r5MtALHjS9pLthkd+oK1rRw3Da54JW1UkjomloBYADnV/wDkVv3qiZcLXLBJUe7sy15k2wNLg7fptt5hEU0cVnom1stzrYauGeZrh7zEw6nEZaGnq/DXgADoEqbZRyy1zm35kTah7afDeV93gj7kHqG7EaPUrXHC9BFDDA27hro2BjtTYyXMZywRg9DmJuSOm/pjGLhS2RBwhugaRU6y7LC5uknw5z1GvGfUZCitukpra2t51Vc6eUSU3LFLURRM0xt2OlvVrMtJIG3yGM57Tw9WVVLNHURRnluDGU1VobJHpeHABpxjxuJI9cqsruHIYq6Rk11hbRiJ0j6fktdPqLHR6h304f0xjZetXZrLU3Gqjfd2s0iQTsaWN080yAN1dt3O8J32HTJzR6ix8PxU0VVHXyvZTyOmY+OsLvCS52gYd02PTc6VZWmGz2SCqhpq+NsTZgXtlqQeSSA1rdzts3uqqPhyzwaYTXl0wbNBJo0kB8jXHU4b6S1pkxn8xUVPD9quFM2m+mYnxyzOkpmsMRO+vWMg5f8A1HfD13yF1UcRW6nrjSySO1Ndpc8AaQe/fJx3IBA3z0K23XS3MMgdcKRvLfofmdvhd5HfY7Hb0XOCw2s1sM8d2i90dJqbFzQRJpzqaCHYIw52diQCVqwcPUsUtYy6XaBzBEWxlsTWNiiIkaNTjsXffd/TzQdabnQCNr21kDw9rnMDJGuLw3OdIB3xg9FMdyo5KJ9Xz2x07HFr5JToDSDg5J9Vzs/C1DWXAmK5kPjcZHRMDHFuvURsDsCHHt5Y752HW6ibb/d47zExkVUHtc4xuDJ9WoA5O57aT8eqIu3XGhaXB1bTAsYJHZmbsw9HHfpuN/VZ01XTVbXOpKmGdrThxikDwD5HC5ptitstfyjdo5JA/VyByg7mAM1bDfGIx4cYGT5DFzabRDazKYXudzGtaQWgfhLznb/fPyUFkiIgIiICIiAiIgIiICIiAiIgKVyX2hWD9c/JR9oVg/Xd8lu2cTpr3KutRcl9oVg/Xd8k+0Kwfru+SbOJ0blXXKFyX2hWD9d3yT7QrB+u75JsYnRuVdai5L7QrB+ufkn2hWD9c/JNjE6NyvbrUXJfaDYP1z8lP2g2D9c/JNjE6Nyvbq1K5L7QbB+ufkn2g2D9c/JXYxOjdr261Fyf2g2D9c/JPtAsP65+SbGJ0btO3WIuU+0Cw/rn5KPtAsJcAJzv6KbOJ0btO3WIufHF9nx/XCyHF1n/AFwptYnTHfwvxQvkVD9brPn+uFH1us/64+abV+jfwvxQv0XP/W+z/rhSOLrP+uE2r9G/hfihfLCaKOop5IZmh0cjCx7T3BGCFTDiu0EZE6yHFVo/WTat0u9h9qpnAFvFE6nkq6qTXIx7pHEajhpDhnycXFx9StiLgqgjr6Gr94nc+lbGC04xKW/ic71cQwn1YFu/Wm0/rKPrTav1lNu3S71O2tX8Le/3IVtRcHGQxhjsQgZOnSSN9vPp++Nlq1HA8FQHh9c7BIDAIGjDfvBh2CNZxK7xHyG3XNn9aLWf8VZjiW1n/FTbt0btO1dUcHskjrBHWkGclzGmIYaS2Qb46/1N8YzjpkkmbfwoY4i+vqYpKt79b3Q07WtB5mvwg9OwVj9Y7Z+qp+sds/VTbt0btO1VBwTTRvozLVOlbTndnLAa5uoODQM7bt9djjbbHrHwjFDDCIa15mh3bJNE2TUdROXDvsdP7A9lvfWS25/qqfrHbf1U27dG7Tt4W7htluus1fT1bubIABqiGACWF2wON9AxgDGe+Atd3CTXUrYPfQGsDo2H3VmeW5paQfzOwfxH5bnNh9Yrb+qn1ht2f6qbdul3KdvCm4ZpaetiqWSnXHKJBljcnD5H4J6/4uP2CvQqn6w279VZC/W89JQpot0m5TtaotGC7UcpIZKCQMr19/p/zhab4lcOcrTk21jVGcNlFre/0/5wnv8AT/nC1/MYXa6JbKLW9/p/zhPf6f8AOE+Yw+zRZsotb36n/OE9/p/zhX5jD7NFmyi1vf6f84Ue/wBP+dT5jC7NFm0i1fpCn/Mo+kaf8yfM4Xa6LNtFqfSNP+dPpKn/ADKfNYXZos/OhA8gmkeQRF9M8kIGegQNHkERBGB5BMDyCIgYHkEwPIIiCcDyCkAeQREQ0jyCaR5BEQTpHkE0jyCIiGkeQRjRzGbDqiLGywvcBZtAx0CIs5eHAQM9FGBvsiIsscDyQAeSIiNqEDl9F6gDyRFpt5ddPDLGyxwiLFtZjqvdgRFJZw9AskRYskHqiIgkL1aPCiIsGFk3qiJJHlaWr+q//d/5qzRF8p/Vf773fg/7QiIvKdiQpREBERAREQFCIpIhERYyr//Z",
  "사진형": "data:image/jpeg;base64,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",
  "캐릭터변환형": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAFTAlgDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUGAwQHAQII/8QAShAAAQQCAAQDBgQDBQUFBgcAAQACAwQFEQYSITETQVEHFCJhcYEjMkKRFVKhYoKSscEWJDNy0QhDotLhNFNzdLLwFyc1N5PC8f/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAxEQEAAgIBAwEGBAYDAQAAAAAAAQIDESEEEjFBBRNRYXHwIoGh0RQykbHh8SMzQuL/2gAMAwEAAhEDEQA/AOvIiKzUREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARO/ZEBERAREQEREBERAREQEREBERARegE9hteICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIi9AJ7An6IPEXpBB0Ro/NeICJsbI2NjuNr65Hfyu/ZB8ovSNdCNLxAREQEREBERAREQEREBERAREQEREBERAREQFWON8NnstHWdgM+7E+AHmbQd+LsDXb00f3VnVN9qWDx+V4dfcyd6zUixrJJgYHAc5IADTv1IAH1SUS43NxbxHPwoJpc3fMzckGCQTkHl8MnWx5bXRPY/lMhkOJeJ4r96zZZE9vhsmlLgz8Rw6A9ly+elJX9mtGzIC0W8vIWfNrYw3f77/ZX/ANg0T6+e4mhkkMr4/Da557vIe7r91EKwq2S4tyMLrJg49yb5Gl3JF7s5ocQeg3zdPqtvLcTZ2T2ecP3X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",
  "자유형": "data:image/jpeg;base64,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",
};

// ==================== domain/frame/backLayouts ====================
const BACK_LAYOUTS = [
  { id: "logo", label: "로고만", desc: "로고를 크게 가운데 배치해요" },
  { id: "qr", label: "QR만", desc: "QR 코드를 가운데 배치해요 (QR 추가를 켠 경우)" },
  { id: "blank", label: "여백형", desc: "아무것도 넣지 않고 깔끔하게 비워둬요" },
  // 2026-08-01: "뒷면에 경력·홍보문구를 여러 줄로 넣고 싶다. 정렬·서체도 고르고
  // 싶다"는 요청 반영. 앞면 내용과 완전히 독립적인 자유 입력이라 앞은 한글, 뒤는
  // 영어처럼 다르게 쓰는 것도 자연스럽게 됩니다.
  { id: "text", label: "문구형", desc: "여러 줄 문구를 자유롭게 넣고, 정렬·서체도 골라요 (경력·홍보문구 등)" },
  // 경력 나열, 메뉴+사진, 캐릭터, 약도 등 — 뒷면은 앞면보다 훨씬 다양하게 쓰여서
  // 고정된 몇 개 템플릿으로는 다 못 담습니다. 새 "게시판"을 따로 만드는 대신, 이미
  // 있는 "디자이너에게 의뢰하기"(DesignerRequestFlow)와 같은 방식(자유 설명 + 참고
  // 이미지)을 뒷면에도 그대로 재사용합니다.
  { id: "custom", label: "직접 설명하기", desc: "경력·메뉴·캐릭터·약도 등 자유롭게 설명하고 참고 이미지를 올려주세요" },
];

// ==================== domain/frame/templates ====================
// ====================================================================
// Domain : Frame / Templates
// Version : 1.1 — 패턴 조합 기반으로 리팩터링
// Responsibility : Template(배정표) 정의 — 어떤 템플릿에서 로고·회사명·이름·
//                  연락처를 어느 zone에 배치할지. 실물 좌표 변환은 Kernel Domain
//                  (resolveElementPosition)이 담당하고, 여기는 "어느 zone"까지만 정의합니다.
//
// v1.0 → v1.1 변경: 좌표(zone/offsetMm)를 이 파일에 직접 쓰는 대신, Pattern Library
// (domain/pattern/patternLibrary.js)의 patternId 조합으로 표현합니다. 예를 들어
// "이름크게형"은 이제 { logo:"L001", company:"P003", person:"N001", contact:"T002" } 라는
// 조합 자체가 정의이고, 실제 좌표는 buildLayoutFromPatterns()가 그때그때 계산합니다.
// 이렇게 하면 (1) UI의 패턴 선택 화면과 (2) Recorder의 기록과 (3) 여기 템플릿이
// 전부 같은 patternId를 공유하게 되고, (4) validateGrammar()가 이미 좌표를 검사해주기
// 때문에 템플릿 조합이 안전영역을 벗어나는지 여기서 또 신경 쓸 필요가 없습니다.
//
// 정직하게 밝히는 점: 4개 템플릿 모두 기존 v1.0의 정확한 mm 수치를 그대로 재현하지는
// 않았습니다(특히 이름형·로고형은 기존에 회사명·이름·연락처가 한쪽 구석에 세 겹으로
// 쌓여 있었는데, 이 배치는 지금 Pattern Library가 가진 좌표 어휘로는 서로 겹치지 않게
// 재현할 공간이 나오지 않았습니다). 대신 같은 컨셉(이름형=이름이 크게, 로고형=로고가
// 크게)을 유지하면서 겹치지 않는 조합으로 다시 짰습니다. 회사형은 로고 크기를
// md→sm으로 한 단계 줄였습니다(안 그러면 로고와 중앙의 회사명이 겹침).
// ====================================================================

const TEMPLATE_OBJECT_VERSION = "1.2";
const TEMPLATES = ["이름크게형", "회사이름강조형", "자유형"];

// 템플릿 = 패턴 조합. 이 객체 하나가 "이름크게형이 어떤 패턴들의 프리셋인가"에 대한
// 유일한 정의입니다 — UI의 패턴 선택 기본값도, AI 추천의 출발점도 여기를 봅니다.
// v1.2: "person"(이름·직위 묶음)을 position(직위)/personName(이름)으로 나눴습니다 —
// 크기를 따로 조절 못 해서 "직위가 이름보다 작아야 하는데 같이 커진다"는 문제가
// 있었습니다. 기본값 자체도 이름(12.5pt)이 직위(9pt)보다 크게 나오도록 했고
// (POINT_SIZE_DEFAULT 참고), 위치는 직위를 이름 바로 위(작게)에 살짝 띄워뒀습니다.
// "로고형"은 없앴습니다 — 로고를 크게 강조하는 배치는 명함 앞면보다 뒷면에서 흔히
// 쓰인다는 지적에 따라, 앞면 템플릿에서 뺐습니다(뒷면 "로고만" 옵션은 이미 있음).
// v1.3: 전면 재설계 — "회사명·직위·이름·휴대폰번호가 중요하고, 전화·팩스·이메일·
// 주소는 작게 같이 모아둔다"는 실제 명함 관례를 기준으로, 세 템플릿 모두 같은
// 세로 흐름(회사명 → 직위 → 이름 → [여백] → 휴대폰 → 전화·팩스·주소·이메일이 하단에
// 작게 모임)을 따르게 했습니다. 이전엔 템플릿마다 좌표를 따로 손으로 잡다가
// (특히 "회사이름강조형"의 N004 상대배치) 이름과 주소가 겹치는 버그가 있었는데,
// 이번엔 세 템플릿 전부 아래 5개 지점(y=13/36/50/64+연락처그룹)을 공유하고
// x(좌/중/우) 정렬만 다르게 해서, 계산을 한 번만 검증하면 셋 다 안전하다는
// 걸 보장할 수 있습니다. 계산 검증 결과(gap 최소 9%p 이상 확보)는
// PROJECT_HANDOFF.md 또는 커밋 로그에 남겨둘 것.
const TEMPLATE_PATTERN_SELECTIONS = {
  // 이름(사람)이 가장 크게 보이는 배치 — 변호사·회계사·의사처럼 "이 사람"에 대한 신뢰가 중요한 경우에 적합. 좌측 정렬.
  // 2026-08-02: 화면 표시명은 "글자위주(텍스트형)"(TEXTS.templateDisplayLabel)로
  // 바뀌었습니다. 이름은 바뀌었지만 배치 방식 자체는 그대로입니다 — 다만 앞으로
  // "배경 AI 자동 생성"(로드맵 항목, 아직 미구현) 기능을 만들 때는, 이 템플릿에서
  // AI가 넣는 배경 장식은 반드시 단순한 선·색·패턴 수준으로만 제한해야 합니다
  // (복잡한 일러스트·캐릭터 금지 — 그런 건 "업종특성 맞춘 디자인 캐릭터"·"자유형"
  // 몫입니다). 프롬프트를 설계할 때 이 제약을 시스템 프롬프트에 명시할 것.
  "이름크게형": {
    logo: "L001", logoSize: "sm",
    company: "P001", companyFineOffsetMm: { y: 3 },
    position: "N002", positionFineOffsetMm: { y: -6 },
    personName: "N002", personNameFineOffsetMm: { y: 0 },
    ...contactStack("T001"),
  },
  // 회사명이 가장 크게 보이는 배치 — 제조업·건설·법인처럼 회사 자체의 신뢰도가 중요한 경우에 적합. 우측 정렬.
  "회사이름강조형": {
    logo: "L001", logoSize: "md",
    company: "P003", companyFineOffsetMm: { y: 3 },
    position: "N003", positionFineOffsetMm: { y: -6 },
    personName: "N003", personNameFineOffsetMm: { y: 0 },
    ...contactStack("T003"),
  },
  // 특정 업종에 치우치지 않는 균형 잡힌 기본 배치 — 로고 위치만 다르게(중앙 좌측) 해서 "이름크게형"과 구분. 좌측 정렬.
  "자유형": {
    logo: "L004", logoSize: "md",
    company: "P001", companyFineOffsetMm: { y: 3 },
    position: "N002", positionFineOffsetMm: { y: -6 },
    personName: "N002", personNameFineOffsetMm: { y: 0 },
    ...contactStack("T001"),
  },
};

const TEMPLATE_LAYOUTS = Object.fromEntries(
  Object.entries(TEMPLATE_PATTERN_SELECTIONS).map(([name, selections]) => [name, buildLayoutFromPatterns(selections)])
);

// ==================== domain/frame/frameCodes ====================
// ====================================================================
// Domain : Frame Code System (v1, 신규 설계)
// Responsibility : "업종-타입" 조합의 짧은 코드(frameCode)와 실제 템플릿/사진배치를
//                  서로 변환. Recommendation Engine이 template/photoStyle 문자열
//                  대신 frameCode 하나로 결과를 표현할 수 있게 합니다.
//
// 설계 배경 (정직하게): 이전에 "INS-F001" 형태의 스펙이 존재한다고 전달받았지만,
// 실제 프로젝트 문서(Core_Principles.md, Issue_Registry_v1.0.md) 어디에도 없어
// 실재하지 않는 것으로 결론 내렸습니다. 이 파일은 그 스펙을 복원한 게 아니라,
// 지금 실제로 존재하는 값(INDUSTRY_KEYWORDS의 업종, TEMPLATES/PHOTO_TEMPLATES의
// 템플릿명)만 근거로 새로 설계한 v1입니다. "PHOTO_TEMPLATE_03" 같은 존재하지
// 않는 식별자는 쓰지 않고, 실제 템플릿 이름(예: "사진 분할형")을 그대로 가리킵니다.
//
// 형식 : [업종 3자리]-[타입 코드]
//   업종 3자리 — industryDetector.js의 INDUSTRY_KEYWORDS와 1:1 대응. 목록에 없는
//   업종(또는 감지 실패)은 GEN(범용)을 씁니다. 즉 이 파일의 업종 목록은
//   INDUSTRY_KEYWORDS가 늘어나면 함께 늘어나야 합니다 — 둘이 따로 놀면 안 됩니다.
//   타입 코드 — TEMPLATES/PHOTO_TEMPLATES 각 항목과 1:1 대응 (아래 TYPE_CODES).
//
// 정직하게 밝히는 현재 한계: 지금 TEMPLATE_LAYOUTS/getPhotoLayoutFor는
// 업종과 무관하게 전 업종에 동일한 배치를 씁니다 — 즉 "CAF-N"과 "MED-N"은
// 지금은 완전히 같은 레이아웃을 가리킵니다(둘 다 "이름크게형"). frameCode에 업종을
// 넣어두는 이유는 나중에 업종별로 실제 다른 레이아웃을 만들 때(예: 의료업은 신뢰감
// 있는 배치, 카페는 캐주얼한 배치) 이 매핑 하나만 바꾸면 되게 하기 위해서입니다.
// 지금 당장 업종별로 다른 좌표를 만들지는 않습니다 — 실제 필요가 확인된 뒤에.
// ====================================================================


// industryDetector.js의 INDUSTRY_KEYWORDS와 반드시 같은 업종 집합을 유지해야 합니다.
const INDUSTRY_PREFIXES = {
  "카페": "CAF",
  "미용업": "BTY",
  "의료": "MED",
  "교육": "EDU",
  "법률": "LAW",
  "부동산": "REA",
  "스튜디오": "STU",
  "베이커리": "BAK",
  "보험": "INS",
  null: "GEN", // 업종 미감지 시 범용
};

// TEMPLATES/PHOTO_TEMPLATES 각 항목과 1:1 대응하는 타입 코드.
// 템플릿이 늘어나면(TEMPLATES/PHOTO_TEMPLATES에 새 항목 추가) 여기도 같이 추가해야 합니다.
const TYPE_CODES = {
  "이름크게형": "N",
  "회사이름강조형": "C",
  "자유형": "F",
  "왼쪽사진배치형": "PL",
  "오른쪽사진배치형": "PR",
  "왼쪽동그라미사진형": "PCL",
  "오른쪽동그라미사진형": "PCR",
  "사진 상단형": "PT",
  "사진 하단형": "PD",
};
const CODE_TO_TEMPLATE = Object.fromEntries(Object.entries(TYPE_CODES).map(([name, code]) => [code, name]));
const PHOTO_TYPE_CODES = new Set(["PS", "PB", "PR"]);

// 두 맵이 실제 카탈로그(TEMPLATES/PHOTO_TEMPLATES)와 항상 일치하는지 개발 중 바로 드러나도록 확인.
// (배포 코드가 아니라 개발자 실수 방지용 — 프로덕션 성능에 영향 없음)
const ALL_TEMPLATE_NAMES = [...TEMPLATES, ...PHOTO_TEMPLATES];
for (const name of ALL_TEMPLATE_NAMES) {
  if (!TYPE_CODES[name]) {
    // eslint-disable-next-line no-console
    console.warn(`[frameCodes] "${name}" 템플릿에 대응하는 TYPE_CODES가 없습니다.`);
  }
}

// industry(한글, industryDetector.js의 industry 값 또는 null) + template명 → frameCode 문자열.
// photoVariant가 있으면 template 대신 그 값을 사용합니다("사진형"은 그 자체로는 타입이 아니라
// photoVariant 하나가 실제 타입이기 때문).
function buildFrameCode(industry, template, photoVariant = null) {
  const prefix = INDUSTRY_PREFIXES[industry] ?? INDUSTRY_PREFIXES[null];
  const typeName = photoVariant || template;
  const typeCode = TYPE_CODES[typeName];
  if (!typeCode) return null; // 알 수 없는 템플릿명 — 잘못된 frameCode를 만들지 않고 명시적으로 실패
  return `${prefix}-${typeCode}`;
}

// frameCode 문자열 → { industryPrefix, template, photoVariant }.
// getLayoutFor(template, photoVariant)에 그대로 넘길 수 있는 형태로 반환합니다.
function parseFrameCode(frameCode) {
  if (!frameCode || !frameCode.includes("-")) return null;
  const [industryPrefix, typeCode] = frameCode.split("-");
  const typeName = CODE_TO_TEMPLATE[typeCode];
  if (!typeName) return null;
  const isPhoto = PHOTO_TYPE_CODES.has(typeCode);
  return {
    industryPrefix,
    template: isPhoto ? "사진형" : typeName,
    photoVariant: isPhoto ? typeName : null,
  };
}

// ==================== domain/frame/frameResolver ====================
// ====================================================================
// Domain : Frame Resolver
// Version : 1.1
// Responsibility : template(+photoVariant) → 실제 배치표(TEMPLATE_LAYOUTS 또는
//                  getPhotoLayoutFor의 결과)를 반환. CardLayoutPreview가 이 결과로 렌더링합니다.
// ====================================================================



// template이 "사진형"이면 photoVariant 기준으로, 아니면 일반 TEMPLATE_LAYOUTS 기준으로 배치를 가져옵니다.
function getLayoutFor(template, photoVariant) {
  if (template === "사진형") return getPhotoLayoutFor(photoVariant);
  return TEMPLATE_LAYOUTS[template] || TEMPLATE_LAYOUTS[TEMPLATES[0]];
}

// frameCode(예: "CAF-N", "GEN-PS") → 실제 배치표. 존재하지 않는/형식이 잘못된
// frameCode면 null을 반환합니다 — getLayoutFor처럼 조용히 기본값으로 넘어가지 않고,
// 호출한 쪽에서 "이 frameCode는 무효였다"를 알 수 있게 합니다.
function resolveFrameCode(frameCode) {
  const parsed = parseFrameCode(frameCode);
  if (!parsed) return null;
  return {
    ...parsed,
    layout: getLayoutFor(parsed.template, parsed.photoVariant),
  };
}

// ==================== domain/learning/classifier ====================
// ── Recommendation Engine의 세 가지 기억 (Standard / Creative Exception / Invalid Exception) ──
// 아직 STEP 7(Learning System) 전체를 만드는 게 아닙니다. "82%/12%/6%" 같은 통계나
// "예외가 반복되면 새 표준으로 승격" 로직은 실사용 데이터가 쌓여야 의미가 있는데,
// 지금 만들면 검증 안 된 걸 마치 학습된 것처럼 보여주는 셈이라(예전에 뺀 가짜
// "★★★★★ 인기순위"와 같은 문제) 지금은 만들지 않습니다.
// 지금 만드는 건 딱 하나: 나중에 실사용 데이터가 쌓이기 시작하면 바로 쓸 수 있도록
// "기록만 남겨두는 배관(plumbing)"입니다.
//
// 세 갈래로 분류합니다 (CP-001 통과 여부 + AI 추천과 실제 선택의 일치 여부):
//   Standard           : CP-001 통과 + AI 추천과 (거의) 동일한 선택 → 그대로 신뢰할 수 있는 사례
//   Creative Exception : CP-001 통과 + AI 추천과 다른 선택 → "좋은 예외", 나중에 새 표준 후보가 될 수 있음
//   Invalid Exception  : CP-001 실패 (만족도와 무관) → Design OS 입장에서 절대 표준이 되면 안 되는 사례
//
// changeReason(변경 이유)은 스키마에 필드만 만들어두고 지금은 수집하지 않습니다 — "선택지를
// 늘리지 않는다" 원칙에 따라, UI(체크박스 등)는 실사용자가 생겨서 실제로 필요하다고
// 확인된 뒤에 추가합니다.
//
// Knowledge Promotion Rule (KPR, ADR-006 참고): 모든 새로운 디자인은 즉시 표준이 되지 않는다 —
// 기록 → 검증 → 승격 → 표준의 과정을 반드시 거친다. 그래서 각 기록에 status를 붙여둡니다.
//   standard           → "active"    (이미 신뢰할 수 있는 상태)
//   creativeException  → "candidate" (승격 후보, 아직 표준 아님)
//   invalidException   → "archived"  (표준 후보에서 원천 제외)
// 지금 구현하는 건 이 초기값을 매기는 것까지입니다. "candidate가 실제로 몇 건 쌓이면
// approved로 승격, 반대로 오랫동안 안 쌓이면 archived로 강등"하는 실제 판단 로직은
// 아직 없습니다 — 이것도 실사용 데이터가 충분히 쌓여야 의미 있는 판단이라 미룹니다.
function classifyDesignRecord(aiRecommended, finalChosen, cpCheck) {
  if (!cpCheck.pass) return "invalidException";
  if (!aiRecommended) return "standard"; // 추천 자체가 없었으면 비교 대상이 없어 표준으로 간주
  // patterns가 있으면(=이름형/회사형/로고형/자유형처럼 Pattern Library 대상 템플릿이면)
  // company/person/contact/logo 각각의 patternId가 하나라도 다르면 "AI 추천에서
  // 벗어났다"로 봅니다. 예전엔 template/color/font만 비교해서, 같은 템플릿·색상을
  // 쓰면서 회사명 위치만 AI 추천과 다르게 고른 경우를 "표준과 동일"로 잘못 분류했습니다.
  const patternsDeviated = (() => {
    const a = aiRecommended.patterns, f = finalChosen.patterns;
    if (!a || !f) return false; // 사진형처럼 둘 중 하나라도 패턴 조합이 없으면 이 축은 비교하지 않음
    return ["company", "position", "personName", "mobile", "logo"].some((kind) => a[kind] !== f[kind]);
  })();
  const deviated = (aiRecommended.template != null && aiRecommended.template !== finalChosen.template)
    || aiRecommended.color !== finalChosen.color
    || aiRecommended.font !== finalChosen.font
    || (finalChosen.photoStyle != null && aiRecommended.photoStyle !== finalChosen.photoStyle)
    || patternsDeviated;
  return deviated ? "creativeException" : "standard";
}

// ==================== domain/learning/recorder ====================
// 2026-08-04: shared:true → shared:false로 바꿨습니다 — Claude 아티팩트의 "공유
// 데이터 접근" 권한 팝업이 뜨는 원인이었습니다. ⚠️ 다만 이 파일은 원래 "여러
// 사용자의 선택을 모아서 학습 데이터로 쓴다"는 목적이라 shared:true가 의도적으로
// 맞는 설계였습니다 — false로 바꾸면 지금은 사용자마다 각자 자기 기록만 쌓입니다.
// 지금 이 데이터를 실제로 읽어서 뭔가 하는 기능이 아직 없어서(Learning Domain은
// 로드맵 단계) 당장은 문제가 없지만, 나중에 진짜 "여러 사용자 데이터를 모아
// 학습"하는 기능을 만들 때는 이 저장을 (window.storage가 아니라) 실제 서버
// 쪽으로 옮겨서 제대로 모아야 합니다 — PROJECT_HANDOFF.md에도 기록해둘 것.

const KPR_INITIAL_STATUS = { standard: "active", creativeException: "candidate", invalidException: "archived" };

// 뒷면 "직접 설명하기"에서 고른 힌트 태그(회사소개/경력/메뉴/사진/시공사례/지도/QR/기타)를
// 기록합니다. 지금은 이 데이터를 읽어서 %를 계산하는 코드가 없습니다 — patternChoice와
// 같은 이유로, 나중에 "사진형이 41%였다" 같은 실제 통계를 낼 때 바로 쓸 수 있도록
// 기록만 남겨둡니다. industry가 없어도(회사명을 아직 안 정했어도) 태그 자체는 기록합니다 —
// "업종과 무관하게 뒷면 콘텐츠 종류별 비율"을 보고 싶을 수도 있어서, 업종 필수였던
// patternChoice와는 다르게 둡니다.
async function recordBackContentChoice(tags, industry = null) {
  if (!tags || tags.length === 0) return;
  const key = industry ? `backContentChoice:${industry}` : "backContentChoice:GEN";
  try {
    const existing = await window.storage.get(key, false);
    const list = existing?.value ? JSON.parse(existing.value) : [];
    list.push({ tags, at: Date.now() });
    await window.storage.set(key, JSON.stringify(list.slice(-200)), false);
  } catch {
    // 기록 실패해도 사용자 흐름은 막지 않음
  }
}

async function recordDesignChoice({ industry, aiRecommended, finalChosen, cpCheck, satisfaction, changeReason = null }) {
  if (!industry) return; // 업종을 모르면 기록해도 나중에 통계로 쓸 수 없음
  const category = classifyDesignRecord(aiRecommended, finalChosen, cpCheck);
  const bucketNames = { standard: "standardMemory", creativeException: "creativeExceptionMemory", invalidException: "invalidExceptionMemory" };
  const bucket = bucketNames[category];
  const key = `${bucket}:${industry}`;
  const record = {
    aiRecommended, finalChosen, cpCheckPass: cpCheck.pass, cpCheckFailures: cpCheck.failures,
    satisfaction, changeReason, // changeReason: 지금은 항상 null, 스키마만 예약
    status: KPR_INITIAL_STATUS[category], // KPR: candidate/active/archived 중 초기값만 부여, 승격·강등 로직은 미구현
    at: Date.now(),
  };
  try {
    const existing = await window.storage.get(key, false);
    const list = existing?.value ? JSON.parse(existing.value) : [];
    list.push(record);
    const trimmed = list.slice(-200); // 무한정 쌓이지 않도록 최근 200건만 유지
    await window.storage.set(key, JSON.stringify(trimmed), false);
  } catch {
    // 기록 실패해도 사용자 흐름은 막지 않음
  }

  // patternId 단위로도 따로 기록합니다. 위 record는 "이 주문 전체가 표준/예외였는가"를
  // 보려 할 때 쓰고, 이건 "company는 P001을 얼마나 고르는가"처럼 요소 하나만 떼어
  // 집계하려 할 때 매번 record를 전부 파싱하지 않아도 되게 하기 위한 것입니다.
  // (지금 당장 이 값을 읽어서 %를 계산하는 코드는 없습니다 — Learning Phase 2가
  // 실사용 데이터를 근거로 통계를 낼 때 바로 쓸 수 있도록 기록만 남겨둡니다.)
  if (finalChosen.patterns) {
    for (const kind of ["company", "position", "personName", "mobile", "logo"]) {
      const patternId = finalChosen.patterns[kind];
      if (!patternId) continue;
      const patternKey = `patternChoice:${kind}:${industry}`;
      try {
        const existing = await window.storage.get(patternKey, false);
        const list = existing?.value ? JSON.parse(existing.value) : [];
        list.push({
          patternId, aiPatternId: aiRecommended?.patterns?.[kind] || null,
          satisfaction, cpCheckPass: cpCheck.pass, at: Date.now(),
        });
        await window.storage.set(patternKey, JSON.stringify(list.slice(-200)), false);
      } catch {
        // 기록 실패해도 사용자 흐름은 막지 않음
      }
    }
  }
}

// ==================== domain/recommendation/industryDetector ====================
// ====================================================================
// Domain : Recommendation / Industry Detector
// Version : 1.0
// Responsibility : Business-name → industry inference (local keyword match)
//
// Roadmap: 지금은 업종 1개(또는 없음)만 반환하지만, "보험설계사 + 예술가" 같은
// 복합 직업을 반영하려면 나중에 가중치가 있는 여러 업종을 함께 반환해야 합니다.
// 그래서 반환 타입을 처음부터 확장 가능한 형태로 잡아뒀습니다 —
//   { industries: [{ industry, confidence }, ...] }  (지금은 항상 0개 또는 1개, confidence는 항상 1)
// 실제로 복합 업종을 추정하는 로직이 생기면, 이 함수 이름을 detectBusinessProfile()로
// 승격하고 여러 개를 채워 넣으면 됩니다 (호출부는 industries[0]만 이미 쓰고 있어 자연스럽게 이어짐).
// ====================================================================
// 회사명에 흔한 업종 키워드가 있으면 AI 호출 없이 바로 업종을 추측 (비용 절감용 1차 필터)
const INDUSTRY_KEYWORDS = [
  { keys: ["커피", "카페", "로스터리", "브루잉"], industry: "카페" },
  { keys: ["헤어", "미용실", "네일", "뷰티"], industry: "미용업" },
  { keys: ["병원", "의원", "치과", "한의원", "클리닉"], industry: "의료" },
  { keys: ["학원", "교습소", "공부방", "과외"], industry: "교육" },
  { keys: ["법무법인", "변호사", "법률사무소"], industry: "법률" },
  { keys: ["부동산", "공인중개"], industry: "부동산" },
  { keys: ["스튜디오", "포토", "사진관"], industry: "스튜디오" },
  { keys: ["베이커리", "제과", "빵집"], industry: "베이커리" },
  { keys: ["보험", "화재", "해상", "생명보험"], industry: "보험" },
];

function guessIndustryLocally(name) {
  const found = INDUSTRY_KEYWORDS.find((row) => row.keys.some((k) => name.includes(k)));
  return { industries: found ? [{ industry: found.industry, confidence: 1 }] : [] };
}

// ==================== domain/recommendation/recommendationCatalog ====================
// ====================================================================
// Domain : Recommendation / Catalog
// Version : 1.0
// Responsibility : AI 추천이 고를 수 있는 후보 목록 (Asset/Frame Domain 카탈로그에서 파생)
// ====================================================================


const RECOMMENDABLE_TEMPLATES = TEMPLATES; // ["이름크게형","회사이름강조형","자유형"]
const RECOMMENDABLE_COLORS = LOGO_COLORS.filter((c) => c.id !== "aiPick").map((c) => c.id);
const RECOMMENDABLE_FONTS = LOGO_ADVANCED_GROUPS.find((g) => g.key === "font").options.filter((o) => o !== "AI 추천");

// ==================== domain/recommendation/recommendationEngine ====================
// ====================================================================
// Domain : Recommendation Engine
// Version : 1.0
// Responsibility : Industry+purpose → {tags, template, color, font, photoStyle}
//                  recommendation, with shared caching. The prompt-building
// 2026-08-04: 캐시를 shared:true → shared:false로 바꿨습니다 — Claude 아티팩트의
// "공유 데이터 접근" 권한 팝업이 뜨는 원인이었고, 이 캐시는 굳이 다른 사용자와
// 공유될 필요가 없어서(각자 자기 요청에 대한 캐시일 뿐) 개인 저장으로 바꿔도
// 기능상 손해가 없습니다.
//                  logic lives inside getStyleSuggestion() below (this file
//                  doesn't separate Prompt into its own module yet — the
//                  prompt template + JSON schema parsing is small enough to
//                  stay co-located with Recommendation for now; split out
//                  into its own domain if/when it grows past ~1,000 lines).
//
// CP-004 (제안, 번호 확정 필요) : AI는 디자인을 추천할 뿐 결정하지 않는다.
//   (주의: 이전에 이 원칙을 CP-002로 잘못 표기했었습니다. 실제 Core_Principles.md에서
//   CP-002는 이미 "Single Purpose Principle"로, CP-003은 "공식 브랜드 자산은 AI가
//   재창작하지 않는다"로 정의되어 있어 번호가 겹칩니다. 다음 빈 번호로 정정합니다 —
//   최종 번호는 실제 Core_Principles.md를 갖고 계신 분이 확정해야 합니다.)
//   이 엔진의 반환값은 전부 "추천"이지 "확정"이 아닙니다 — 화면(AiFlow)에서
//   사용자가 그대로 받아들이거나, 자유롭게 다른 값으로 바꿀 수 있어야 합니다.
//   이 함수 자체가 order.selOptions 등 확정 상태를 직접 바꾸는 일은 절대 없어야 합니다.
//
// Roadmap:
//   recommendationRules.js  — 지금은 "업종 → 색상/레이아웃" 같은 명시적 규칙 표가 없습니다.
//                             그 판단을 전부 AI 프롬프트(아래 prompt 문자열)에 맡기고 있기
//                             때문입니다. 나중에 특정 업종에 대해 사람이 정한 고정 규칙을
//                             AI보다 우선 적용하고 싶어지면 그때 이 파일이 생깁니다.
//   recommendationScore.js  — 지금은 후보를 여러 개 놓고 점수를 매겨 고르는 로직이 없습니다
//                             (AI가 하나씩만 답변). 여러 후보를 동시에 평가해야 할 필요가
//                             생기거나 STEP 7 Learning이 붙으면 그때 분리합니다.
// ====================================================================





// 프롬프트를 한 곳에 모아둔 객체 — 아직 별도 폴더(prompt/)로 나눌 정도로 여러 개는
// 아니지만(지금은 이거 하나뿐), 문자열을 로직 사이에 흩어두지 않고 이름 붙여
// 꺼내 쓸 수 있게만 정리해둡니다. 프롬프트가 여러 개로 늘어나면 그때 파일로 분리합니다.
const STYLE_PROMPTS = {
  recommendStyle: (companyName, purpose) => `회사명: "${companyName}"${purpose ? `\n명함의 목적: "${purpose}"` : ""}
이 회사의 업종을 한 단어로 추측하고, 아래 후보들 중에서 이 업종${purpose ? "과 목적" : ""}에 가장 잘 어울리는 것을 각각 골라줘.
(주의: 명함의 구조/레이아웃(이름크게형·회사이름강조형·자유형 같은 프레임)은 업종과 무관한 개인 취향 영역이라
여기서 추천하지 않습니다 — 색상·글꼴·분위기만 업종에 맞춰 골라주세요.)
스타일 태그 목록(4개 선택): ${STYLE_TAG_POOL.join(", ")}
색상 후보(1개 선택, id로): ${RECOMMENDABLE_COLORS.join(", ")}
글꼴 후보(1개 선택): ${RECOMMENDABLE_FONTS.join(", ")}
사진 배치 후보(1개 선택, 인물 사진이 있는 경우를 가정): ${PHOTO_TEMPLATES.join(", ")}
반드시 아래 JSON 형식으로만 답변하고 다른 설명은 절대 하지마.
{"industry": "업종", "tags": ["태그1", "태그2", "태그3", "태그4"], "color": "색상 후보 id 중 하나", "font": "글꼴 후보 중 하나", "photoStyle": "사진 배치 후보 중 하나"}`,
};

// 추천 이유(reasons)를 사람이 읽을 수 있는 짧은 문장으로 구성합니다.
// confidence는 실제 채점 모델이 아니라 "근거가 얼마나 직접적인가"에 따른 정직한
// 휴리스틱입니다 (recommendationScore.js가 생기기 전까지의 임시값 — 소수점 둘째자리
// 같은 정밀도는 과장이라 일부러 쓰지 않습니다).
function buildReasons({ industry, localIndustry, tags, source }) {
  const reasons = [];
  reasons.push(localIndustry ? `업종 키워드로 "${industry}" 직접 감지` : `AI가 "${industry}" 업종으로 추정`);
  if (tags?.length) reasons.push(`스타일: ${tags.join(", ")}`);
  reasons.push(source === "cache" ? "이전에 같은 업종에서 추천된 조합 재사용" : "AI 신규 추천");
  return reasons;
}

// 업종별 스타일 태그 추천: 1) 공유 캐시(DB 역할) 조회 → 있으면 즉시 반환(AI 호출 없음)
// 2) 없으면 AI 호출로 업종 추정 + 태그 4개 선택 → 3) 다음 사용자를 위해 공유 캐시에 저장
// 회사명 자체가 아니라 "업종"만 캐시 키로 써서, 다른 상호명이라도 같은 업종이면 캐시를 재사용합니다.
// v1.1: 프레임(템플릿) 추천을 뺐습니다 — 이름크게형/회사이름강조형/자유형 같은 구조 선택은
// 업종과 무관한 개인 취향이라는 결론(2026-07-29) 반영. 업종은 이제 색상·글꼴·태그·
// (사진형을 이미 고른 사람에게는) 사진 배치까지만 관여합니다. 프레임 자체를 어떤 걸
// 쓸지는 사용자가 템플릿 선택 화면에서 직접 고르는 값 그대로 유지됩니다.
// 사진 배치(photoStyle)는 이미 사진형을 선택하고 사진을 올려둔 사용자에게만 "어떤 배치가
// 어울리는지" 보조 추천으로 남겨뒀습니다 — 이것도 구조 선택이라 같은 논리로 뺄 수 있지만,
// 이건 "사진형 안에서 어느 쪽이 사진을 돋보이게 하는가"에 가까워 프레임 전체 선택과는
// 성격이 다르다고 보고 일단 남겨뒀습니다. 필요하면 이것도 뺄 수 있습니다.
async function getStyleSuggestion(companyName, purpose = null) {
  const localProfile = guessIndustryLocally(companyName);
  const localIndustry = localProfile.industries[0]?.industry ?? null;
  const cacheKey = localIndustry ? (purpose ? `bizstyle:${localIndustry}:${purpose}` : `bizstyle:${localIndustry}`) : null;

  if (cacheKey) {
    try {
      const cached = await window.storage.get(cacheKey, false);
      if (cached?.value) {
        const data = JSON.parse(cached.value);
        return {
          industry: localIndustry, tags: data.tags,
          color: data.color || null,
          font: data.font || null, photoStyle: data.photoStyle || null,
          frameCode: buildFrameCode(localIndustry, null, data.photoStyle),
          confidence: 0.85, // 캐시 재사용 — 이전 추천을 그대로 신뢰하되 신규 판단보다는 약간 낮게
          reasons: buildReasons({ industry: localIndustry, localIndustry, tags: data.tags, source: "cache" }),
          purpose, source: "cache",
        };
      }
    } catch {
      // 캐시에 없으면 아래에서 AI 호출로 이어짐
    }
  }

  const prompt = STYLE_PROMPTS.recommendStyle(companyName, purpose);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 350,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
  const cleaned = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);
  const industry = localIndustry || parsed.industry;
  const tags = parsed.tags.filter((t) => STYLE_TAG_POOL.includes(t));
  const color = RECOMMENDABLE_COLORS.includes(parsed.color) ? parsed.color : null;
  const font = RECOMMENDABLE_FONTS.includes(parsed.font) ? parsed.font : null;
  const photoStyle = PHOTO_TEMPLATES.includes(parsed.photoStyle) ? parsed.photoStyle : null;

  // 다음 사용자를 위해 업종(+목적) 기준으로 공유 캐시에 저장 (회사명·개인정보는 저장하지 않음)
  const keyToSave = purpose ? `bizstyle:${industry}:${purpose}` : `bizstyle:${industry}`;
  try {
    await window.storage.set(keyToSave, JSON.stringify({ tags, color, font, photoStyle }), false);
  } catch {
    // 저장 실패해도 이번 추천 결과는 그대로 보여주면 되므로 무시
  }

  return {
    industry, tags, color, font, photoStyle,
    frameCode: buildFrameCode(industry, null, photoStyle),
    confidence: localIndustry ? 0.9 : 0.7, // 로컬 키워드로 업종이 직접 확인됐는지 여부에 따른 휴리스틱
    reasons: buildReasons({ industry, localIndustry, tags, source: "ai" }),
    purpose, source: "ai",
  };
}

// ==================== domain/validation/cpValidator ====================
// ====================================================================
// Domain : Validation / CP Validator
// Responsibility : CP-001("명함은 의사소통 도구다") 충족 여부를 판정.
//                  Kernel(designRules.js)에서 여기로 옮겼습니다 — Kernel은
//                  "규칙을 정의하는 곳", Validation은 "규칙을 적용해 판정하는
//                  곳"으로 역할을 나눴습니다(기능 추가가 아니라 위치 정리).
// ====================================================================
function validateCP(fields) {
  const failures = [];
  if (!fields?.["personName"]?.trim()) failures.push("person");   // 누구인가?
  if (!fields?.["companyName"]?.trim()) failures.push("company"); // 어떤 일을 하는가?
  if (!fields?.["mobile"]?.trim()) failures.push("contact");      // 어떻게 연락하는가?
  return { pass: failures.length === 0, failures };
}

// ==================== domain/validation/marginValidator ====================
// ====================================================================
// Domain : Validation / Margin Validator
// Responsibility : 요소 위치가 Kernel이 정의한 허용 영역(ELEMENT_ALLOWED_REGIONS)
//                  안에 있는지 판정.
//
// 정직하게 밝힐 점: 지금은 clampToAllowedRegion()이 배치 계산 과정에서 항상
// 범위 안으로 강제로 맞춰버리기 때문에("정의"가 이미 "강제 적용"까지 겸하고
// 있음), 이 판정 함수가 실패할 일은 구조적으로 거의 없습니다. 그래도 이 함수를
// 두는 이유는, 나중에 사용자가 직접 드래그로 위치를 조정하는 기능처럼
// clampToAllowedRegion을 거치지 않는 경로가 생겼을 때를 대비한 "마지막 안전망"
// 역할입니다. 지금 당장 실패 케이스를 만들어내는 기능은 없습니다.
// ====================================================================

function validateMargin(kind, x, y) {
  const region = ELEMENT_ALLOWED_REGIONS[kind];
  if (!region) return { pass: true, reason: null }; // 정의된 영역이 없는 종류는 검사 대상이 아님
  const pass = x >= region.xMin && x <= region.xMax && y >= region.yMin && y <= region.yMax;
  return { pass, reason: pass ? null : "out_of_allowed_region", region };
}

// ==================== domain/validation/overlapValidator ====================
// ====================================================================
// Domain : Validation / Overlap Validator
// Responsibility : 두 요소의 위치(%)가 너무 가까워서 겹칠 가능성이 있는지 판정.
//                  Validation 도메인에서 유일하게 "이전"이 아니라 "신설"된
//                  검사입니다 — 지금까지는 이 검사 자체가 없었습니다.
//
// 정직하게 밝힐 한계: 요소들이 실제로 차지하는 폭·높이(bounding box)가
// 지금 데이터 모델에는 없습니다(텍스트 크기는 emphasis로만 정해지고, 정확한
// 렌더링 폭은 폰트·글자 수에 따라 달라져서 미리 알 수 없음). 그래서 정확한
// 사각형 충돌 판정이 아니라, "두 요소의 중심점이 이 정도보다 가까우면 겹칠
// 가능성이 크다"는 근사 판정입니다. 실제로 겹치는지 100% 확정하지는 못합니다.
// ====================================================================

// 요소 크기(emphasis: lg/md/sm)에 따라 대략 필요한 최소 간격(%, 카드 대각선 기준).
// 큰 글씨/로고일수록 차지하는 공간이 넓으니 더 멀리 떨어져 있어야 안전합니다.
const MIN_GAP_PERCENT_BY_EMPHASIS = { lg: 18, md: 14, sm: 10 };

function distancePercent(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// positions: { [kind]: { x, y, emphasis? } } — resolveElementPosition()의 결과에
// emphasis(요소 크기 힌트)를 더해서 넘깁니다. emphasis가 없으면 "md" 기준으로 봅니다.
function validateOverlap(positions) {
  const kinds = Object.keys(positions);
  const conflicts = [];
  for (let i = 0; i < kinds.length; i++) {
    for (let j = i + 1; j < kinds.length; j++) {
      const a = positions[kinds[i]];
      const b = positions[kinds[j]];
      const minGap = Math.max(
        MIN_GAP_PERCENT_BY_EMPHASIS[a.emphasis || "md"],
        MIN_GAP_PERCENT_BY_EMPHASIS[b.emphasis || "md"]
      );
      const distance = distancePercent(a, b);
      if (distance < minGap) {
        conflicts.push({ a: kinds[i], b: kinds[j], distance, minGap });
      }
    }
  }
  return { pass: conflicts.length === 0, conflicts };
}

// ==================== domain/validation/qrValidator ====================
// ====================================================================
// Domain : Validation / QR Validator
// Responsibility : 실제 렌더링될 QR 크기가 Kernel이 정의한 최소 크기
//                  (getQrSizePercent)보다 작지 않은지 판정.
//
// 정직하게 밝힐 점: 지금 렌더러(CardLayoutPreview)는 QR 크기를 항상
// getQrSizePercent()가 반환하는 값 그대로 씁니다 — 사용자가 QR을 더 작게
// 줄이는 기능 자체가 없어서, 이 검사도 지금은 항상 통과합니다. 나중에
// "QR 크기 직접 조절" 같은 기능이 생기면 이 함수가 실제로 실패 케이스를 잡습니다.
// ====================================================================

function validateQrSize(actualSizePercent, mode) {
  const minSize = getQrSizePercent(mode);
  const pass = actualSizePercent >= minSize;
  return { pass, minSize, actualSizePercent };
}

export default App;
