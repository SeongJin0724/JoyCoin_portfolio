// frontend/src/lib/i18n.ts

export type Locale = "en" | "ko";

export const translations = {
  en: {
    // Common
    home: "Home",
    login: "Login",
    logout: "Logout",
    signup: "Sign Up",
    myPage: "My Page",
    buy: "Participate",
    admin: "Admin",
    loading: "Loading...",
    confirm: "Confirm",
    cancel: "Cancel",
    save: "Save",
    close: "Close",
    copy: "Copy",
    copied: "Copied!",

    // Auth
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    username: "Username",
    center: "Center",
    selectCenter: "Select Center",
    referralCode: "Referral Code",
    optional: "Optional",
    loginSuccess: "Login successful",
    loginFailed: "Invalid email or password",
    signupSuccess: "Registration successful",
    passwordMinLength: "Password must be at least 12 characters",
    passwordMismatch: "Passwords do not match",
    usernameRequired: "Username is required",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",

    // Participate
    buyJoycoin: "Request JOY Allocation",
    fixedRate: "Fixed Rate",
    selectAmount: "Select Amount",
    addAmount: "Add Amount",
    orderSummary: "Order Summary",
    quantity: "Quantity",
    pricePerJoy: "Price per JOY",
    total: "Total",
    proceedPayment: "Request Allocation",
    senderName: "Sender Name (Wallet Name)",
    senderNamePlaceholder: "Enter the name on your wallet",
    senderNameHelp: "Enter the name that will appear when you send USDT",

    // Deposit
    depositPending: "Deposit Pending",
    depositApproved: "Deposit Approved",
    depositRejected: "Deposit Rejected",
    depositHistory: "Deposit History",
    noDeposits: "No deposit history",
    totalDeposits: "Total Deposits",
    totalAmount: "Total Amount",
    completedTx: "Completed",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    chain: "Chain",
    address: "Address",
    amount: "Amount",
    requestTime: "Request Time",
    status: "Status",

    // Payment Modal
    paymentConfirm: "Payment Confirmation",
    sendUsdtTo: "Send USDT to this address",
    requestId: "Request ID",
    confirmed: "I have sent the payment",
    paymentNote: "After sending, the admin will verify and approve your deposit.",

    // My Page
    myInfo: "My Info",
    myReferralCode: "My Referral Code",
    totalJoy: "Total JOY",
    totalPoints: "Total Points",
    referralRewardRemaining: "Referral Rewards Left",
    referralRewardDesc: "10% bonus points on your next participation",
    quickMenu: "Quick Menu",

    // Notifications
    notifications: "Notifications",
    noNotifications: "No notifications",
    markAllRead: "Mark all as read",

    // Admin
    adminPanel: "Admin Panel",
    adminSystemTitle: "System Control",
    depositManagement: "Deposit Management",
    approve: "Approve",
    reject: "Reject",
    user: "User",
    adminNotes: "Admin Notes",

    // Admin – Tabs
    tabDeposits: "Deposit Requests",
    tabUsers: "User Management",
    tabProducts: "Product Management",
    tabSectors: "Sector Fee Settings",

    // Admin – Stats
    statTotalUsers: "Total Users",
    statTotalDeposits: "Total Deposits",
    statPending: "Pending",
    statApproved: "Approved",
    statTotalUsdt: "Total USDT",

    // Admin – Deposit table
    searchDepositPlaceholder: "Search by email, username, ID…",
    allSectors: "All Sectors",
    filterAll: "All",
    filterPending: "Pending",
    filterApproved: "Approved",
    filterRejected: "Rejected",
    colSector: "Sector",
    colNetwork: "Network",
    colJoyQty: "JOY Qty",
    colRequestDate: "Date",
    colAction: "Action",
    noDepositsMsg: "No deposit requests",
    noSearchResultMsg: "No results found",
    actualAmountLabel: "Actual",
    approveAction: "Approve",
    rejectAction: "Reject",
    statusCompleted: "Done",
    statusRejectedLabel: "Rejected",
    approveSuccess: "Approved. Please send JOY to the user!",
    rejectSuccess: "Deposit request rejected.",

    // Admin – User tab
    statAllUsers: "All Users",
    statAdmins: "Admins",
    statBanned: "Banned",
    searchUsersPlaceholder: "Search by email or username…",
    colEmail: "Email",
    colUsernameLabel: "Username",
    colRole: "Role",
    colJoinDate: "Join Date",
    roleAdminLabel: "Admin",
    roleSectorManager: "Sector Mgr",
    roleUserLabel: "User",
    statusActive: "Active",
    banAction: "Ban",
    unbanAction: "Unban",
    promoteAction: "Promote",
    demoteAction: "Demote",

    // Admin – Product tab
    productMgmt: "Product Management",
    addProductBtn: "+ Add Product",
    editProductTitle: "Edit Product",
    newProductTitle: "Add New Product",
    productNameLabel: "Product Name",
    priceUsdtLabel: "Price (USDT)",
    priceKrwLabel: "Price (KRW)",
    discountRateLabel: "Discount (%)",
    descriptionLabel: "Description",
    deactivateBtn: "Deactivate",
    activateBtn: "Activate",
    inactiveLabel: "Inactive",
    editBtn: "Edit",
    addBtn: "Add",

    // Admin – Sector / Rate tab
    joyRateSettings: "JOY Rate Settings",
    joyUsdtRate: "JOY / USDT Exchange Rate",
    joyRateDesc: "1 USDT = ? JOY (manual until listed)",
    changeBtn: "Change",
    referralBonusSettings: "Referral Bonus Settings",
    referralBonusPercent: "Referral Bonus Percent",
    referralBonusDesc: "N% points on referral's USDT payment",
    sectorFeeSettings: "Sector Fee Settings",

    // Admin – Login
    loginFailedPrefix: "Login failed: ",
    serverConnectFailed: "Server connection failed",
    verifying: "VERIFYING...",
    enterDashboard: "ENTER DASHBOARD",

    // Admin – Referrers
    noReferrersMsg: "No referrer data",
    colReferrerEmail: "Referrer Email",
    colInvitedUsers: "Invited Users",
    colTotalRewards: "Total Rewards (P)",

    // Admin – Toast / misc
    notAdminError: "This account does not have admin access.",
    copyWalletSuccess: "Wallet address copied.",
    noCopyTarget: "No address to copy.",
    copyFailed: "Failed to copy.",

    // Footer
    footer: "© 2024 JOYCOIN GLOBAL FOUNDATION • SECURED BY BLOCKCHAIN",
  },

  ko: {
    // Common
    home: "홈",
    login: "로그인",
    logout: "로그아웃",
    signup: "회원가입",
    myPage: "마이페이지",
    buy: "참여하기",
    admin: "관리자",
    loading: "로딩 중...",
    confirm: "확인",
    cancel: "취소",
    save: "저장",
    close: "닫기",
    copy: "복사",
    copied: "복사됨!",

    // Auth
    email: "이메일",
    password: "비밀번호",
    confirmPassword: "비밀번호 확인",
    username: "이름 / 닉네임",
    center: "센터",
    selectCenter: "센터 선택",
    referralCode: "추천인 코드",
    optional: "선택",
    loginSuccess: "로그인 성공",
    loginFailed: "이메일 또는 비밀번호가 올바르지 않습니다",
    signupSuccess: "회원가입이 완료되었습니다",
    passwordMinLength: "비밀번호는 12자 이상이어야 합니다",
    passwordMismatch: "비밀번호가 일치하지 않습니다",
    usernameRequired: "이름을 입력해 주세요",
    alreadyHaveAccount: "이미 계정이 있으신가요?",
    dontHaveAccount: "계정이 없으신가요?",

    // Participate
    buyJoycoin: "JOY 참여 요청",
    fixedRate: "고정 환율",
    selectAmount: "시작 수량 선택",
    addAmount: "수량 추가",
    orderSummary: "주문 요약",
    quantity: "수량",
    pricePerJoy: "JOY당 가격",
    total: "총액",
    proceedPayment: "참여 요청",
    senderName: "입금자명 (지갑 실명)",
    senderNamePlaceholder: "지갑에 등록된 이름을 입력하세요",
    senderNameHelp: "USDT 전송 시 표시되는 이름을 입력하세요",

    // Deposit
    depositPending: "입금 대기중",
    depositApproved: "입금 완료",
    depositRejected: "입금 거부됨",
    depositHistory: "입금 내역",
    noDeposits: "입금 내역이 없습니다",
    totalDeposits: "총 입금 건수",
    totalAmount: "총 입금액",
    completedTx: "완료된 거래",
    pending: "대기중",
    approved: "입금완료",
    rejected: "거부됨",
    chain: "체인",
    address: "주소",
    amount: "금액",
    requestTime: "요청시간",
    status: "상태",

    // Payment Modal
    paymentConfirm: "입금 확인",
    sendUsdtTo: "USDT를 이 주소로 전송하세요",
    requestId: "요청번호",
    confirmed: "입금했습니다",
    paymentNote: "관리자가 입금을 확인하면 상태가 '입금완료'로 변경됩니다.",

    // My Page
    myInfo: "내 정보",
    myReferralCode: "내 추천인 코드",
    totalJoy: "보유 JOY",
    totalPoints: "보유 포인트",
    referralRewardRemaining: "남은 추천 보상",
    referralRewardDesc: "다음 참여 시 결제금액의 10% 포인트 적립",
    quickMenu: "빠른 메뉴",

    // Notifications
    notifications: "알림",
    noNotifications: "알림이 없습니다",
    markAllRead: "모두 읽음",

    // Admin
    adminPanel: "관리자 패널",
    adminSystemTitle: "총관리자 시스템",
    depositManagement: "입금 관리",
    approve: "승인",
    reject: "거부",
    user: "사용자",
    adminNotes: "관리자 메모",

    // Admin – Tabs
    tabDeposits: "입금 요청 관리",
    tabUsers: "사용자 관리",
    tabProducts: "상품 관리",
    tabSectors: "섹터 기여분 설정",

    // Admin – Stats
    statTotalUsers: "총 유저",
    statTotalDeposits: "총 입금건",
    statPending: "대기중",
    statApproved: "승인완료",
    statTotalUsdt: "총 USDT",

    // Admin – Deposit table
    searchDepositPlaceholder: "이메일, 유저명, ID로 검색…",
    allSectors: "전체 섹터",
    filterAll: "전체",
    filterPending: "대기",
    filterApproved: "승인",
    filterRejected: "거절",
    colSector: "섹터",
    colNetwork: "네트워크",
    colJoyQty: "JOY 수량",
    colRequestDate: "요청일시",
    colAction: "액션",
    noDepositsMsg: "입금 요청이 없습니다",
    noSearchResultMsg: "검색 결과가 없습니다",
    actualAmountLabel: "실제",
    approveAction: "승인",
    rejectAction: "거절",
    statusCompleted: "완료",
    statusRejectedLabel: "거절됨",
    approveSuccess: "승인 완료. 사용자에게 JOY 코인을 전송하세요!",
    rejectSuccess: "입금 요청이 거절되었습니다.",

    // Admin – User tab
    statAllUsers: "전체 유저",
    statAdmins: "관리자",
    statBanned: "차단됨",
    searchUsersPlaceholder: "이메일 또는 유저명으로 검색…",
    colEmail: "이메일",
    colUsernameLabel: "유저명",
    colRole: "권한",
    colJoinDate: "가입일",
    roleAdminLabel: "관리자",
    roleSectorManager: "섹터매니저",
    roleUserLabel: "유저",
    statusActive: "정상",
    banAction: "차단",
    unbanAction: "해제",
    promoteAction: "승격",
    demoteAction: "강등",

    // Admin – Product tab
    productMgmt: "상품 패키지 관리",
    addProductBtn: "+ 새 상품",
    editProductTitle: "상품 수정",
    newProductTitle: "새 상품 추가",
    productNameLabel: "상품명",
    priceUsdtLabel: "가격 (USDT)",
    priceKrwLabel: "가격 (KRW)",
    discountRateLabel: "할인율 (%)",
    descriptionLabel: "설명",
    deactivateBtn: "비활성화",
    activateBtn: "활성화",
    inactiveLabel: "비활성",
    editBtn: "수정",
    addBtn: "추가",

    // Admin – Sector / Rate tab
    joyRateSettings: "JOY 시세 설정",
    joyUsdtRate: "JOY / USDT 환율",
    joyRateDesc: "1 USDT = ? JOY (거래소 상장 전까지 수동 조정)",
    changeBtn: "변경",
    referralBonusSettings: "추천인 보너스 설정",
    referralBonusPercent: "추천 보너스 퍼센트",
    referralBonusDesc: "추천인이 JOY 참여 시 결제 USDT의 N% 포인트 적립",
    sectorFeeSettings: "섹터별 기여분 설정",

    // Admin – Login
    loginFailedPrefix: "로그인 실패: ",
    serverConnectFailed: "서버 연결 실패",
    verifying: "확인 중...",
    enterDashboard: "대시보드 입장",

    // Admin – Referrers
    noReferrersMsg: "추천인 데이터가 없습니다",
    colReferrerEmail: "추천인 이메일",
    colInvitedUsers: "초대한 유저",
    colTotalRewards: "총 보상 (P)",

    // Admin – Toast / misc
    notAdminError: "관리자 계정이 아닙니다.",
    copyWalletSuccess: "지갑주소를 복사했습니다.",
    noCopyTarget: "복사할 주소가 없습니다.",
    copyFailed: "복사에 실패했습니다.",

    // Footer
    footer: "© 2024 JOYCOIN GLOBAL FOUNDATION • SECURED BY BLOCKCHAIN",
  },
};

export type TranslationKey = keyof typeof translations.en;

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || translations.en[key] || key;
}
