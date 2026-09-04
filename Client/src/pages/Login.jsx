import React, { useState } from 'react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-white p-4'>
      <div className='w-full max-w-5xl bg-white rounded-[28px] overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[520px]'>

        {/* LEFT - Illustration Card */}
        <div
          className='relative flex-1 bg-[#526DB2] p-6 md:p-8 flex flex-col justify-between md:[clip-path:polygon(0_0,100%_0,94%_100%,0%_100%)]'
        >
          {/* Sign up button */}
          <div className='flex justify-end'>
            <button className='border border-white/70 text-white px-5 py-1.5 rounded-full text-xs hover:bg-white/10 transition'>
              Sign up
            </button>
          </div>

          {/* SVG Illustration */}
          <div className='flex-1 flex items-center justify-center my-4'>
            <svg viewBox="0 0 300 220" className="w-4/5 max-w-[280px] md:max-w-[300px]">
              <ellipse cx="150" cy="205" rx="120" ry="8" fill="#43598F" />
              <rect x="60" y="150" width="150" height="14" rx="4" fill="#DDE3F2" />
              <rect x="75" y="120" width="60" height="35" rx="3" fill="#fff" opacity="0.9" />
              <rect x="140" y="128" width="40" height="24" rx="2" fill="#F2A25C" />

              {/* Person 1 - yellow */}
              <g>
                <ellipse cx="98" cy="90" rx="16" ry="17" fill="#F0AE85" />
                <path d="M83 84 Q98 68 113 84 L113 92 Q98 82 83 92 Z" fill="#2A2A2A" />
                <rect x="60" y="105" width="76" height="55" rx="14" fill="#F4B942" />
                <rect x="66" y="112" width="10" height="40" rx="4" fill="#E8A62F" />
                <circle cx="70" cy="120" r="3" fill="#C88A1E" />
                <circle cx="70" cy="132" r="3" fill="#C88A1E" />
                <rect x="95" y="108" width="35" height="14" rx="6" fill="#E8A62F" />
                <path d="M108 118 L128 128" stroke="#2A2A2A" strokeWidth="4" strokeLinecap="round" />
              </g>

              {/* Person 2 - blue hoodie */}
              <g>
                <ellipse cx="153" cy="70" rx="17" ry="18" fill="#8B5A2B" />
                <path d="M137 62 Q153 44 169 62 L169 68 Q153 55 137 68 Z" fill="#E8B84B" />
                <rect x="128" y="86" width="50" height="68" rx="16" fill="#6E7FC9" />
                <rect x="128" y="86" width="50" height="24" rx="16" fill="#5C6DBB" />
                <path d="M148 116 L158 128" stroke="#2A2A2A" strokeWidth="4" strokeLinecap="round" />
                <circle cx="159" cy="129" r="4" fill="#2A2A2A" />
              </g>

              {/* Person 3 - pink */}
              <g>
                <ellipse cx="215" cy="88" rx="16" ry="17" fill="#3A2A22" />
                <path d="M199 78 Q215 60 231 78 L231 100 Q225 84 215 84 Q205 84 199 100 Z" fill="#1C1C1C" />
                <rect x="188" y="104" width="55" height="60" rx="16" fill="#E38FA6" />
                <rect x="192" y="140" width="47" height="24" rx="10" fill="#EDE6D8" />
                <path d="M198 130 L212 142" stroke="#3A2A22" strokeWidth="4" strokeLinecap="round" />
                <rect x="203" y="128" width="16" height="20" rx="2" fill="#F4B942" />
              </g>
            </svg>
          </div>

          {/* Heading + subtext */}
          <div>
            <h1 className='text-white text-2xl md:text-[28px] font-bold leading-tight mb-2'>
              Welcome to Your Digital<br />Classroom.
            </h1>
            <p className='text-white/85 text-xs md:text-sm leading-relaxed'>
              Log in to access your courses, track progress, and keep growing every day.
            </p>
          </div>
        </div>

        {/* RIGHT - Login Form */}
        <div className='flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center'>
          <h2 className='text-2xl md:text-[26px] font-bold text-[#1A1A1A] mb-1.5'>
            Welcome Back
          </h2>
          <p className='text-xs md:text-sm text-[#8A8A8A] mb-6'>
            Log in to access your courses, track progress, and keep growing every day.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <label className='text-sm font-medium text-[#333] block mb-1.5'>
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className='w-full h-11 mb-4 rounded-[10px] border border-[#E3E3E3] px-4 text-sm outline-none focus:border-[#526DB2] transition'
            />

            <label className='text-sm font-medium text-[#333] block mb-1.5'>
              Password
            </label>
            <div className='relative mb-3'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className='w-full h-11 rounded-[10px] border border-[#E3E3E3] px-4 pr-10 text-sm outline-none focus:border-[#526DB2] transition'
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm'
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className='flex justify-between items-center mb-6 flex-wrap gap-2'>
              <label className='flex items-center gap-1.5 text-xs text-[#666] cursor-pointer'>
                <input type="checkbox" className='w-3.5 h-3.5' />
                Remember me
              </label>
              <span className='text-xs text-[#666] cursor-pointer hover:text-[#526DB2] transition'>
                Forgot password?
              </span>
            </div>

            <button
              type="button"
              className='w-full h-[46px] bg-white border-[1.5px] border-[#1A1A1A] rounded-[10px] text-sm font-medium flex items-center justify-center gap-2 text-[#1A1A1A] hover:bg-gray-50 transition'
            >
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.2 5.2C40.9 36.3 44 30.7 44 24c0-1.3-.1-2.7-.4-3.5z" />
              </svg>
              Login with Google
            </button>

            <div className='flex items-center gap-3 my-4'>
              <div className='flex-1 h-px bg-[#E3E3E3]' />
              <span className='text-[11px] text-gray-400'>or</span>
              <div className='flex-1 h-px bg-[#E3E3E3]' />
            </div>

            <button
              type="submit"
              className='w-full h-[46px] bg-[#526DB2] text-white rounded-[10px] text-sm font-medium hover:bg-[#455C99] transition-colors'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login