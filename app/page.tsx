import { sendOTP } from "@/actions/actions";

export default function Home() {
  async function handleSubmit(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    await sendOTP(email);
  }

  return (
    <div className="min-h-screen bg-[#110e1a] text-[#D3D3FF] antialiased flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden selection:bg-[#9400D3] selection:text-white">
      
      {/* BACKGROUND BRAND GLOWS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#9400D3]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-[#ED80E9]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* PLATFORM BRANDING */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#D8BFD8]/5 border border-[#D8BFD8]/15 mb-3 shadow-inner">
            <span className="text-xl">🎬</span>
          </div>
          <h1 className="text-3xl font-black tracking-wider uppercase bg-gradient-to-r from-[#D3D3FF] via-[#ED80E9] to-[#9400D3] bg-clip-text text-transparent">
            CineTrack
          </h1>
          <p className="text-[#D3D3FF]/40 text-xs mt-1 uppercase tracking-widest font-semibold">
            Motion Picture Archive Log
          </p>
        </div>

        {/* AUTHENTICATION FORM CARD */}
        <div className="bg-[#D8BFD8]/5 border border-[#D8BFD8]/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r from-[#D3D3FF] via-[#ED80E9] to-[#9400D3]">
          
          <div className="mb-6">
            <h2 className="text-base font-bold uppercase tracking-wide text-[#D3D3FF]">
              Gate / Authentication
            </h2>
            <p className="text-[#D3D3FF]/50 text-xs mt-0.5">
              Enter your address below to receive a secure access key token.
            </p>
          </div>

          <form action={handleSubmit} className="space-y-4">
            
            {/* EMAIL ADRESS FIELD */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D3D3FF]/50 mb-1.5">
                Account Email Adress
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  required
                  className="w-full bg-[#161324] border border-[#D8BFD8]/20 rounded-md pl-3 pr-10 py-2.5 text-sm text-[#D3D3FF] placeholder-[#D3D3FF]/20 focus:outline-none focus:border-[#ED80E9] focus:ring-1 focus:ring-[#ED80E9] transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none text-xs">
                  ✉️
                </span>
              </div>
            </div>

            {/* TRANSMIT KEY TRIGGER */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center bg-[#9400D3] hover:bg-[#ED80E9] text-white font-black text-xs uppercase tracking-wider h-11 rounded-md transition-all shadow-md shadow-[#9400D3]/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                Transmit Access Key
              </button>
            </div>

          </form>
        </div>

        {/* METADATA FOOTNOTE FOOTER */}
        <p className="text-center text-[10px] text-[#D3D3FF]/30 mt-6 uppercase tracking-wider font-medium">
          Secure, passwordless verification protocol.
        </p>

      </div>
    </div>
  );
}
