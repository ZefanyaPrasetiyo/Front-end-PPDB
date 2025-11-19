import Image from "next/image";

const logos = [
  { img: "/images/partner/panasonic.png", bg: "bg-white" },
  { img: "/images/partner/pionicon.jpeg", bg: "bg-[#0A6E7C]" },
  { img: "/images/partner/md.jpg", bg: "bg-white" },
  { img: "/images/partner/mdata.jpeg", bg: "bg-[#034E82]" },
  { img: "/images/partner/bei.jpeg", bg: "bg-[#132F55]" },
  { img: "/images/partner/Biznet.jpg", bg: "bg-white" },
  { img: "/images/partner/Toaa.jpeg", bg: "bg-white" },
  { img: "/images/partner/mvnet.png", bg: "bg-[#1B9BA4]" },
];

function PartnerLogo({ img, bg }) {
  return (
    <div
      className={`w-20 h-20 md:w-32 md:h-32 rounded-full ${bg} flex items-center justify-center shadow-lg hover:scale-110 transition overflow-hidden`}
    >
      <Image
        src={img}
        alt="logo"
        width={70}
        height={70}
        className="object-contain w-10 md:w-20"
      />
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            Kami bekerja sama dengan{" "}
            <span className="text-[#173E67]">mitra terpercaya</span>
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed max-w-md">
            Untuk memastikan kualitas pembelajaran dan kesiapan siswa menghadapi
            dunia kerja, kami berkolaborasi dengan berbagai perusahaan dan
            organisasi profesional demi peluang dan pengalaman relevan.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="px-5 py-3 rounded-lg font-medium bg-[#173E67] text-white hover:bg-[#13314f] transition">
              Hubungi Kami
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {logos.map((item, i) => (
            <PartnerLogo key={i} img={item.img} bg={item.bg} />
          ))}
        </div>
      </div>
    </section>
  );
}
