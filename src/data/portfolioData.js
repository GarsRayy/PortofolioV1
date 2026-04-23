export const PORTFOLIO_DATA = {
    profile: {
        name: "Garis Rayya Rabbani",
        role: "UI/UX Designer & Data Specialist",
        bio: "Mahasiswa Teknik Informatika ITERA (Semester 6) dengan fokus pada menciptakan pengalaman digital yang bermakna melalui desain UI/UX dan pengolahan data yang strategis.",
        location: "Lampung, Indonesia",
        email: "garisrayyarabbani@example.com",
        socials: {
            github: "https://github.com/GarsRayy",
            linkedin: "https://linkedin.com/in/garisrayya/"
        }
    },
    experience: [
        {
            title: "Asisten Praktikum - Basis Data",
            period: "2024 - Present",
            description: [
                "Membimbing mahasiswa dalam perancangan ERD dan implementasi SQL.",
                "Edukasi keamanan basis data untuk mencegah serangan SQL Injection."
            ]
        },
        {
            title: "Asisten Praktikum - PBO (Java)",
            period: "2024 - Present",
            description: [
                "Implementasi prinsip OOP: Abstraksi, Enkapsulasi, Pewarisan, dan Polimorfisme.",
                "Membimbing pengembangan aplikasi modular berbasis Java."
            ]
        },
        {
            title: "Asisten Praktikum - Struktur Data (C++)",
            period: "2023 - 2024",
            description: [
                "Manajemen memori, penggunaan Pointer, dan struktur data kompleks (Trees, Graphs).",
                "Optimasi algoritma untuk pemrosesan data yang efisien."
            ]
        },
        {
            title: "Asisten Praktikum - DTD & PKS",
            period: "2023 - 2024",
            description: [
                "Otomasi digital menggunakan Google AppScript.",
                "Pengajaran logika pemrograman dasar kepada mahasiswa baru."
            ]
        }
    ],
    techStack: [
        { name: "Figma", category: "Design" },
        { name: "Adobe XD", category: "Design" },
        { name: "React.js", category: "Frontend" },
        { name: "Tailwind CSS", category: "Frontend" },
        { name: "GSAP", category: "Animation" },
        { name: "Framer Motion", category: "Animation" },
        { name: "SQL", category: "Data" },
        { name: "Python", category: "Data" },
        { name: "Java", category: "Backend" },
        { name: "C++", category: "System" },
        { name: "ArcGIS Pro", category: "GIS" },
        { name: "Google AppScript", category: "Automation" }
    ],
    projects: [
        {
            slug: "income-prediction-ann",
            title: "Income Prediction (ANN)",
            category: "Data Science / ANN",
            description: "Optimasi klasifikasi pendapatan menggunakan teknik SMOTE dan Jaringan Saraf Tiruan.",
            challenge: "Ketidakseimbangan data yang signifikan menyebabkan model cenderung bias terhadap kelas mayoritas.",
            solution: "Mengimplementasikan teknik SMOTE untuk oversampling kelas minoritas dan membangun arsitektur ANN yang dioptimalkan.",
            outcome: "Peningkatan akurasi sebesar 15% pada kelas minoritas dan performa model yang lebih stabil secara keseluruhan."
        },
        {
            slug: "pplk-itera-website",
            title: "PPLK ITERA Website",
            category: "Web Development / UI/UX",
            description: "Digitalisasi layanan orientasi untuk 5.000+ mahasiswa baru ITERA.",
            challenge: "Proses orientasi manual yang tidak efisien dan sulit dipantau secara real-time.",
            solution: "Membangun platform digital terintegrasi untuk pendaftaran, materi, dan penugasan mahasiswa baru.",
            outcome: "Sukses melayani 5.000+ mahasiswa baru dengan uptime 99.9% selama periode orientasi."
        },
        {
            slug: "spatial-mapping-kkn",
            title: "Spatial Mapping KKN",
            category: "Data Engineering / GIS",
            description: "Digitalisasi aset desa berbasis ArcGIS Pro selama masa KKN.",
            challenge: "Kurangnya inventarisasi aset desa yang terstruktur dan mudah diakses.",
            solution: "Melakukan pemetaan spasial menggunakan ArcGIS Pro dan mendigitalisasi data aset ke dalam sistem informasi geografis.",
            outcome: "Tersedianya peta digital aset desa yang membantu pemerintah desa dalam perencanaan pembangunan."
        },
        {
            slug: "study-quest",
            title: "Study Quest",
            category: "EdTech / Gamification",
            description: "Gamified learning platform to increase student engagement and retention.",
            challenge: "Traditional learning methods often fail to keep students motivated and engaged over long periods.",
            solution: "Developed a mobile app that integrates RPG-style gamification elements into educational tasks and quizzes.",
            outcome: "Increased user daily active time by 40% during beta testing and improved quiz scores among early adopters."
        },
        {
            slug: "website-hmif-itera-2026",
            title: "Website HMIF ITERA 2026",
            category: "Web Development & UI/UX",
            description: "Wadah digital resmi untuk publikasi kegiatan dan pusat informasi bagi seluruh mahasiswa Informatika ITERA.",
            challenge: "Kebutuhan akan wadah digital resmi untuk publikasi kegiatan dan pusat informasi bagi seluruh mahasiswa Informatika ITERA yang dapat diakses dengan mudah.",
            solution: "Merancang dan mengembangkan antarmuka website organisasi yang responsif, berfokus pada arsitektur informasi yang jelas dan estetika modern.",
            outcome: "Platform fungsional yang sukses memperkuat identitas digital organisasi dan mempermudah akses informasi program kerja bagi anggota HMIF."
        }
    ],
    leadership: [
        {
            organization: "PPLK ITERA 2025",
            role: "Head of UI/UX Website Subdivision",
            period: "2024 - Present"
        },
        {
            organization: "HUMAS IF ITERA",
            role: "Website Team & Content Researcher",
            period: "2023 - Present"
        },
        {
            organization: "UKM Lembaga Pers ITERA",
            role: "Head of Design Division",
            period: "2023 - Present"
        },
        {
            organization: "HMIF ITERA",
            role: "Publication & Documentation Staff",
            period: "2022 - 2023"
        }
    ],
    capabilities: [
        "UI/UX Design",
        "Data Analysis",
        "Data Engineering",
        "Frontend Development",
        "Project Management",
        "Spatial Mapping"
    ]
};

export const CERTIFICATES = [
    { name: 'Dicoding Academy', issuer: 'Certificate of Completion', img: '/images/certificate_placeholder.png' },
    { name: 'Gemini Student Certification', issuer: 'In Progress', img: '/images/certificate_placeholder.png' },
    { name: 'Lead Instructor', issuer: 'UI/UX Division School, VVD PPLK ITERA', img: '/images/certificate_placeholder.png' },
    { name: 'Head of Design Division', issuer: 'UKM Lembaga Pers ITERA', img: '/images/certificate_placeholder.png' },
    { name: 'Public Relations Staff', issuer: 'HUMAS IF ITERA', img: '/images/certificate_placeholder.png' },
    { name: 'Publication & Documentation Staff', issuer: 'HMIF ITERA', img: '/images/certificate_placeholder.png' },
    { name: 'Laboratory Assistant', issuer: 'Database Systems, OOP, DSA, DTD, PKS 1 & 2', img: '/images/certificate_placeholder.png' },
];
