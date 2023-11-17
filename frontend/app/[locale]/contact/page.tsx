import Headers from "@/app/[locale]/components/headers/headers"
import Footer from "@/app/[locale]/components/footers/footer"

const Contact = () => {
    return (
        <div className="bg-gradient-to-tr from-fuchsia-50 via-purple-300 to-cyan-300">
            <Headers />
            {/* Contact */}
            <div className="flex flex-col md:flex-row justify-between md:mb-5 pt-16 px-2 z-10">
                Page des contacts
            </div>
            <Footer />
        </div>
  )
}

export default Contact