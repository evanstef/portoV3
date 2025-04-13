import sembilan from "../../public/project-sembilan.png";
import empat from "../../public/project-empat.png";
import enam from "../../public/project-enam.png";
import tujuh from "../../public/project-tujuh.png";
import sepuluh from "../../public/project-sepuluh.png";
import netflix from "../../public/Screenshot 2024-06-12 085200.png";
import spill from "../../public/spill-post.png";
import bangkahire from "../../public/bangka-hire.png";
import {
  SiFramer,
  SiNextdotjs,
  SiTailwindcss,
  SiWebgl,
  SiPrisma,
  SiNodedotjs,
  SiNestjs,
  SiMysql,
  SiTypescript,
  SiShadcnui,
  SiAxios,
  SiSupabase,
  SiDaisyui,
  SiLaravel,
  SiAlpinedotjs,
  SiJavascript,
  SiPhp,
  SiReactquery,
} from "react-icons/si";

export const data = [
  {
    id: 11,
    title: "Bangka Hire",
    image: bangkahire,
    description:
      "Bangka Hire merupakan platform pencarian kerja online seperti linkedin, glints dan lain sebagainya namun ini khusus daerah bangka yang kita kembangkan saya, haikel ilham hakim dan taufik hidayat sebagai UI/UX designnya",
    link: "https://bangka-hire.ekel.dev/",
    source: "private",
    tech: [
      SiTypescript,
      SiTailwindcss,
      SiShadcnui,
      SiFramer,
      SiNextdotjs,
      SiReactquery,
      SiAxios,
      SiPrisma,
      SiSupabase,
    ],
    collab: "haikelz",
  },
  {
    id: 10,
    title: "Spill Post",
    image: spill,
    description:
      "Spill Post merupakan salah satu platform medsos yang mirip seperti twitter instagram dll, yang saya kembangkan sendiri untuk project independen saya yang sekarang masiih dalam tahap pengembangan dan kedepan nya semoga bisa lebih baik lagi",
    link: "https://spill-post.vercel.app/",
    source: "https://github.com/evanstef/Spill-Post",
    tech: [
      SiJavascript,
      SiPhp,
      SiLaravel,
      SiAlpinedotjs,
      SiTailwindcss,
      SiMysql,
    ],
  },
  {
    id: 5,
    title: "API Books",
    image: sepuluh,
    description:
      "API buku yang saya buat sendiri yang mana datanya lebih dari 500+ title buku untuk sekarang hanya ada novel saja semoga kedepannya bisa makin bertambah bersumber dari salah satu website buku yaitu https://www.goodreads.com/",
    link: "https://evan-movie-search.vercel.app/",
    source: "https://github.com/evanstef/nest-books-api",
    tech: [SiNestjs, SiNodedotjs, SiMysql, SiPrisma],
  },
  {
    id: 7,
    title: "Sekaben Camp",
    image: tujuh,
    description:
      "Sekaben Camp merupakan jasa sewa alat-alat camping yang ada di Bangka Belitung ini merupakan website company profile dari perusahaan Sekaben Camp, Sekaben camp merupakan salah satu bisa di bilang startup di bidang penyewaan jasa alat camping dengan memanfaatkan wisata alam yang banyak di daerah Bangka Belitung sehingga memungkinkan untuk membuka usaha sewa alat camping karena Bangka terkenal akan pantai,bukit,hutan dan wisata alam lainnya jadi buat temen-temen yang hobi camping tidak perlu bingung jika tidak punya alat camping Sekaben Camp bisa menjadi pilihan dan yang pasti dengan harga yang terjangkau. tantangan dalam mengelola website ini adalah soal SEO nya awalnya saya ingin menggunakkan domain bawaan vercel dengan menggunakkan DNS provider cloudflare namun sangat sulit untuk mengkonekan si cloudflare ke vercel jadi saya memutuskan untuk membeli domain .my.id karena harganya murah sehingga website bisa di daftarkan di google search console dan SEO nya berjalan",
    link: "https://sekabencampid.my.id/",
    source: "https://github.com/evanstef/Sekaben-camp",
    tech: [SiNextdotjs, SiDaisyui, SiFramer, SiTailwindcss, SiTypescript],
  },
  {
    id: 8,
    title: "Netflix Clone",
    image: netflix,
    description:
      "Website ini merupakan website netflix clone seperti hal nya netflix namun bedanya website ini hanya untuk mencari film - film bukan buat streaming filmnya dan juga semua film yang anda cari bisa anda tambahkan ke wishlist anda namun dengan catatan jika ingin membuka website ini harus login dulu",
    link: "https://netflix-clone-evan.vercel.app/",
    source: "https://github.com/evanstef/Netflix-Clone",
    tech: [
      SiNextdotjs,
      SiTailwindcss,
      SiShadcnui,
      SiFramer,
      SiAxios,
      SiTypescript,
      SiSupabase,
      SiPrisma,
    ],
  },
  {
    id: 9,
    title: "Animation 3D Model Web",
    image: sembilan,
    description:
      "mengimplementasikan desain web 3D yang sudah saya pelajari hanya untuk sekedar latihan saja cara membuat web 3D jadi mungkin kedepannya saya akan membuat website yang ada unsur 3D saya menggunakkan webstie skectfab.com untuk mencari asset 3D model yang saya mau kendala saat membuat website ini adalah setup webgi yang agak rumit, namun saya ada kendala di bagian preview mode sehingga user bisa merotate 3d model tersebut pada saat di development masih berjalan lancar namun setelah naik ke production user tidak bisa merotate 3d model tersebut jadi, untuk sementara saya masih menonaktifkan fitur tersebut. dan mencoba debugging terlebih dahulu",
    link: "https://vortex-gt-8.vercel.app/",
    source: "https://github.com/evanstef/Animation-Web-3D",
    tech: [SiNextdotjs, SiTailwindcss, SiFramer, SiWebgl, SiTypescript],
  },
  {
    id: 6,
    title: "Diary App",
    image: enam,
    description:
      "Web App Untuk menulis semua diary dan saling sharing kepada semua user yang ada, dengan menggunakkan supabase sebagai database untuk menampung semua data usernya tantangan dalam membuat website ini adalah saya masih mengalami error setelah kita mengcreate diary dan kemudian di redirect ke halaman my diary terjadi erro page not found padahal saat saya jalankan di mode development tidak terjadi kesalahan sama sekali dan ini juga hasil pembelajaran saya mengikuti kursus dari Bang Dea Afrizal Special thanks To Bang Dea Afrizal",
    link: "https://diary-app-lec.vercel.app/",
    source: "https://github.com/evanstef/Diary-App",
    tech: [
      SiNextdotjs,
      SiSupabase,
      SiDaisyui,
      SiTailwindcss,
      SiFramer,
      SiTypescript,
    ],
  },

  {
    id: 4,
    title: "Rawg clone",
    image: empat,
    description:
      "website pencarian semua game game baik dari yang lama maupun game yang baru keluar serta mendapatkan detail dari game tersebut saya menggunakkan metode consume API yang saya ambil API nya dari rawg io dan website ini dibuat dengan menggunakkan framework nextJs, tantangan dalam membuat website ini saya tidak bisa mengambil data trailer data masing masing data game yang tersedia sehingga saya hardcode di bagian trailer game jadi data yang ada di bagian trailer game tidak terupdate harus di update secara manual",
    link: "https://rawg-io-clone-peach.vercel.app/",
    source: "https://github.com/evanstef/rawg-io-clone",
    tech: [SiNextdotjs, SiTailwindcss, SiTypescript, SiFramer, SiAxios],
  },
];
