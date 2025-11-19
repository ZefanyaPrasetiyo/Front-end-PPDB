import Navbar from "../components/Landing/navbarLanding"
import Hero from "../components/Landing/heroSectionLanding"
import Features from "../components/Landing/InformasiLanding"
import Jurusan from "../components/Landing/konsentrasiKeahlian"
import TrustedSection from "../components/Landing/partner"
import FaqAccordion from "../components/Landing/Faq"
import Cta from "../components/Landing/Cta"
import Footer from "../components/Landing/footer"

export default function Landing() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Features/>
    <Jurusan/>
    <TrustedSection/>
    <FaqAccordion/>
    <Cta/>
    <Footer/>
    </>
  );
}
