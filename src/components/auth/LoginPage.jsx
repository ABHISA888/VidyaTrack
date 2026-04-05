import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Loader2, User, Lock, Mail, ChevronRight, School, Globe, BarChart2 } from 'lucide-react';

const LoginPage = () => {
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ role: 'DEO', password: '' });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        // Artificial delay for premium feel
        setTimeout(() => {
            const result = login({ role: 'DEO', password: credentials.password });
            if (!result.success) {
                setError(result.message);
                setIsSubmitting(false);
            }
        }, 1500);
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center relative overflow-hidden font-ibm">
            {/* Design Elements: Decorative Background Bubbles */}
            <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-navy/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-150px] right-[-150px] w-128 h-128 bg-saffron/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal/5 rounded-full blur-[120px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#1A3356 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}></div>

            <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(26,51,86,0.2)] overflow-hidden m-4 relative z-10 border border-white/40">
                
                {/* Left Side: Branding and Info */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-navy to-[#2B4E80] p-12 text-white flex flex-col justify-between relative group">
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 p-8">
                        <Globe className="text-saffron opacity-40 animate-spin-slow" size={120} />
                    </div>
                    
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                <School className="text-saffron" size={24} />
                            </div>
                            <span className="font-syne font-extrabold text-2xl tracking-tighter uppercase whitespace-nowrap">VidyaTrack <span className="text-saffron">AI</span></span>
                        </div>
                        
                        <div className="mt-20">
                            <h1 className="text-5xl font-syne font-extrabold leading-tight mb-6 transform group-hover:translate-x-2 transition-transform duration-500">
                                Empowering Higher <br/>
                                <span className="text-saffron">Education</span> Intelligence.
                            </h1>
                            <p className="text-navy-100 text-lg opacity-80 max-w-md font-medium leading-relaxed">
                                Secure gateway for District Education Officers to access state-level learning assessments, risk scores, and tactical interventions.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className="flex -space-x-3 mb-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`w-10 h-10 rounded-full border-2 border-navy bg-gray-${i*200} shadow-lg flex items-center justify-center text-[10px] font-bold overflow-hidden`}>
                                     <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="DEO" className="w-full h-full object-cover" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-navy bg-saffron shadow-lg flex items-center justify-center text-[10px] font-bold">+120 DEOs</div>
                        </div>
                        <p className="text-xs font-syne uppercase tracking-widest text-saffron font-bold">Trusted by departments across MP Govt.</p>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 p-12 lg:p-20 bg-white flex flex-col justify-center relative">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-12">
                            <h2 className="text-3xl font-syne font-extrabold text-navy uppercase tracking-tighter mb-2">Systems Login</h2>
                            <p className="text-gray-400 font-medium tracking-tight">Access your district intelligence dashboard.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 border border-red-100 animate-shake">
                                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">!</div>
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-syne font-extrabold uppercase tracking-[.2em] text-navy/60 ml-4">Credential Level</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:text-saffron transition-colors">
                                        <User size={18} />
                                    </div>
                                    <select 
                                        name="role"
                                        value={credentials.role}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-5 py-5 bg-gray-50 border-2 border-transparent border-b-gray-100 rounded-[24px] focus:outline-none focus:border-saffron/20 focus:bg-white focus:ring-4 focus:ring-saffron/5 transition-all text-sm font-bold text-navy appearance-none"
                                    >
                                        <option value="DEO">District Education Officer (DEO)</option>
                                        <option value="STATE">State Admin (Review Only)</option>
                                        <option value="COLLECTOR">Collector General</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-syne font-extrabold uppercase tracking-[.2em] text-navy/60 ml-4">Access Key</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:text-saffron transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input 
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-5 py-5 bg-gray-50 border-2 border-transparent border-b-gray-100 rounded-[24px] focus:outline-none focus:border-saffron/20 focus:bg-white focus:ring-4 focus:ring-saffron/5 transition-all text-sm font-bold text-navy placeholder:text-gray-300"
                                        required
                                    />
                                </div>
                                <p className="text-[10px] font-bold text-saffron/60 ml-4">Access Key: deo123</p>
                            </div>

                            <div className="flex items-center justify-between px-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-gray-200 text-saffron focus:ring-saffron/20 transition-all cursor-pointer" />
                                    <span className="text-xs font-bold text-navy/60 group-hover:text-navy transition-colors">Remember terminal</span>
                                </label>
                                <a href="#" className="text-xs font-bold text-saffron hover:underline underline-offset-4 decoration-2">Forgot Key?</a>
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-navy text-white rounded-[24px] py-6 flex items-center justify-center gap-3 font-syne font-extrabold text-[12px] uppercase tracking-[.3em] shadow-[0_20px_40px_-10px_rgba(26,51,86,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(26,51,86,0.4)] hover:bg-[#152946] active:scale-[0.98] transition-all disabled:opacity-70 group overflow-hidden relative"
                            >
                                <span className="relative z-10">{isSubmitting ? 'Verifying Gateway...' : 'Initiate Secure Access'}</span>
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin relative z-10" size={20} />
                                ) : (
                                    <ChevronRight className="group-hover:translate-x-1 transition-transform relative z-10" size={20} />
                                )}
                                
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                            </button>
                        </form>
                        
                        <div className="mt-12 text-center">
                            <p className="text-[10px] font-syne font-extrabold uppercase tracking-[.2em] text-gray-400">Government Intelligence Protocol v4.0.2</p>
                        </div>
                    </div>
                    
                    {/* Tiny stats at bottom */}
                    <div className="absolute bottom-6 left-12 right-12 flex justify-between items-center text-[10px] text-gray-300 font-bold uppercase tracking-widest hidden lg:flex">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                           Secure Connection Active
                        </div>
                        <div className="flex items-center gap-2">
                           <BarChart2 size={12} />
                           Real-time Analytics Enabled
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
