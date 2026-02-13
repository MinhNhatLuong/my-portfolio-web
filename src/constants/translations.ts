/**
 * This file defines the translation type structure and exports the dictionaries object,
 * which contains all UI text strings for supported languages (English, Vietnamese, Japanese).
 * Used for switching languages dynamically across the application.
 * You can add or edit in which language that you like
 */
type Translation = {
  navbar: {
    home: string;
    about: string;
    portfolio: string;
    gallery: string;
    contact: string;
    language: string;
    theme: string;
  };
  home: {
    greeting: string;
    description: string;
    btnCode: string;
    btnGallery: string;
    roles: string[];
  };
  about: {
    title: string;
    subtitle: string;
    tableOfContents: string;
    infoTitle: string;
    role: string;
    location: string;
    status: string;
    nationality: string;
    languages: string;
    techLanguages: string;
    techFrameworks: string;
    techDatabases: string;
    techTools: string;
    native: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewCode: string;
    viewDemo: string;
    techStack: string;
    archiveTitle: string;
    archiveSubtitle: string;
    filterTech: string;
    resetFilters: string;
    newest: string;
    oldest: string;
  };
  gallery: {
    title: string;
    subtitleExplore: string;
    subtitleAlbums: string;
    explore: string;
    albums: string;
    loadMore: string;
    back: string;
    photosCount: string;
    newest: string;
    oldest: string;
  };
  contact: {
    title: string;
    subtitle: string;
    workTitle: string;
    socialTitle: string;
    socialDesc: string;
    copyEmail: string;
    copied: string;
    downloadCV: string;
    emailLabel: string;
    phoneLabel: string;
  };
  // The more section, the more you add
};

export const dictionaries: Record<"en" | "vi" | "ja", Translation> = {
  en: {
    navbar: {
      home: "Home",
      about: "About",
      portfolio: "Portfolio",
      gallery: "Gallery",
      contact: "Contact",
      language: "Language",
      theme: "Theme",
    },
    home: {
      greeting: "Hi, I'm Asahi.",
      description:
        "I build software & capture moments. Welcome to my digital garden.",
      btnCode: "See my Code",
      btnGallery: "View Gallery",
      roles: [
        "Software Engineer",
        "Photographer",
        "Tech Enthusiast",
        "Storyteller",
      ],
    },
    about: {
      title: "About Me",
      subtitle: "Get to know me better.",
      tableOfContents: "Contents",
      infoTitle: "General Info",
      role: "Role",
      location: "Location",
      status: "Status",
      nationality: "Nationality",
      languages: "Languages",
      techLanguages: "Languages",
      techFrameworks: "Frameworks",
      techDatabases: "Database / Cloud",
      techTools: "Tools",
      native: "Native",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Here are some of the projects I've worked on.",
      viewCode: "Source",
      viewDemo: "Live Demo",
      techStack: "Tech Stack",
      archiveTitle: "All Projects",
      archiveSubtitle: "Explore my entire coding journey.",
      filterTech: "Filter by Tech",
      resetFilters: "Reset Filters",
      newest: "Newest First",
      oldest: "Oldest First",
    },
    gallery: {
      title: "Visual Gallery",
      subtitleExplore: "Lost in random moments.",
      subtitleAlbums: "Curated collections.",
      explore: "Explore",
      albums: "Albums",
      loadMore: "Load More Photos",
      back: "Back to Albums",
      photosCount: "photos",
      newest: "Newest",
      oldest: "Oldest",
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Let's build something amazing together.",
      workTitle: "Work & Contact",
      socialTitle: "Social Network",
      socialDesc:
        "Follow me on social media to see my photography works and coding journey.",
      copyEmail: "Copy Email",
      copied: "Copied!",
      downloadCV: "Download CV / Resume",
      emailLabel: "Email",
      phoneLabel: "Phone",
    },
  },
  vi: {
    navbar: {
      home: "Trang chủ",
      about: "Giới thiệu",
      portfolio: "Dự án IT",
      gallery: "Nhiếp ảnh",
      contact: "Liên hệ",
      language: "Ngôn ngữ",
      theme: "Giao diện",
    },
    home: {
      greeting: "Chào, tôi là Asahi.",
      description:
        "Tôi viết phần mềm & lưu giữ khoảnh khắc. Chào mừng đến với khu vườn số của tôi.",
      btnCode: "Xem Code",
      btnGallery: "Xem Ảnh",
      roles: [
        "Kỹ sư phần mềm",
        "Nhiếp ảnh gia",
        "Người yêu công nghệ",
        "Người kể chuyện",
      ],
    },
    about: {
      title: "Giới thiệu",
      subtitle: "Hiểu thêm về tôi và hành trình phát triển.",
      tableOfContents: "Mục lục",
      infoTitle: "Thông tin chung",
      role: "Chức danh",
      location: "Nơi sống",
      status: "Trạng thái",
      nationality: "Quốc tịch",
      languages: "Ngôn ngữ",
      techLanguages: "Ngôn ngữ lập trình",
      techFrameworks: "Frameworks & Thư viện",
      techDatabases: "Cơ sở dữ liệu / Cloud",
      techTools: "Công cụ & Khác",
      native: "Bản ngữ",
    },
    projects: {
      title: "Dự án Nổi bật",
      subtitle: "Dưới đây là một số dự án tôi đã thực hiện.",
      viewCode: "Mã nguồn",
      viewDemo: "Xem Demo",
      techStack: "Công nghệ",
      archiveTitle: "Kho Lưu Trữ",
      archiveSubtitle: "Toàn bộ hành trình lập trình của tôi.",
      filterTech: "Lọc Công nghệ",
      resetFilters: "Xóa bộ lọc",
      newest: "Mới nhất",
      oldest: "Cũ nhất",
    },
    gallery: {
      title: "Thư viện Ảnh",
      subtitleExplore: "Lạc lối trong những khoảnh khắc ngẫu nhiên.",
      subtitleAlbums: "Những bộ sưu tập được chọn lọc.",
      explore: "Khám phá",
      albums: "Album",
      loadMore: "Xem thêm ảnh",
      back: "Quay lại",
      photosCount: "ảnh",
      newest: "Mới nhất",
      oldest: "Cũ nhất",
    },
    contact: {
      title: "Liên Hệ",
      subtitle: "Hãy cùng nhau tạo nên những điều tuyệt vời.",
      workTitle: "Công việc & Liên lạc",
      socialTitle: "Mạng xã hội",
      socialDesc:
        "Theo dõi tôi trên mạng xã hội để xem các tác phẩm nhiếp ảnh và hành trình lập trình.",
      copyEmail: "Sao chép Email",
      copied: "Đã chép!",
      downloadCV: "Tải CV / Hồ sơ",
      emailLabel: "Email",
      phoneLabel: "Điện thoại",
    },
  },
  ja: {
    navbar: {
      home: "ホーム",
      about: "私について",
      portfolio: "ポートフォリオ",
      gallery: "ギャラリー",
      contact: "連絡先",
      language: "言語",
      theme: "テーマ",
    },
    home: {
      greeting: "こんにちは、アサヒです。",
      description:
        "ソフトウェアを作り、瞬間を切り取る。私のデジタルガーデンへようこそ。",
      btnCode: "コードを見る",
      btnGallery: "ギャラリーを見る",
      roles: [
        "ソフトウェアエンジニア",
        "フォトグラファー",
        "技術愛好家",
        "ストーリーテラー",
      ],
    },
    about: {
      title: "私について",
      subtitle: "私をもっと知ってください。",
      tableOfContents: "目次",
      infoTitle: "基本情報",
      role: "職名",
      location: "所在地",
      status: "ステータス",
      nationality: "国籍",
      languages: "言語",
      techLanguages: "プログラミング言語",
      techFrameworks: "フレームワーク",
      techDatabases: "データベース / クラウド",
      techTools: "ツール / その他",
      native: "ネイティブ",
    },
    projects: {
      title: "注目のプロジェクト",
      subtitle: "これまでに取り組んだプロジェクトの一部です。",
      viewCode: "ソース",
      viewDemo: "デモを見る",
      techStack: "技術スタック",
      archiveTitle: "プロジェクト一覧",
      archiveSubtitle: "私のコーディングの旅のすべて。",
      filterTech: "技術でフィルタ",
      resetFilters: "リセット",
      newest: "新しい順",
      oldest: "古い順",
    },
    gallery: {
      title: "ビジュアルギャラリー",
      subtitleExplore: "ランダムな瞬間に迷い込む。",
      subtitleAlbums: "厳選されたコレクション。",
      explore: "探索",
      albums: "アルバム",
      loadMore: "もっと見る",
      back: "アルバムに戻る",
      photosCount: "枚",
      newest: "新しい順",
      oldest: "古い順",
    },
    contact: {
      title: "お問い合わせ",
      subtitle: "一緒に素晴らしいものを作りましょう。",
      workTitle: "お仕事・連絡先",
      socialTitle: "ソーシャルネットワーク",
      socialDesc:
        "写真作品やコーディングの旅を見るために、SNSでフォローしてください。",
      copyEmail: "メールをコピー",
      copied: "コピーしました！",
      downloadCV: "履歴書をダウンロード",
      emailLabel: "メール",
      phoneLabel: "電話番号",
    },
  },
};