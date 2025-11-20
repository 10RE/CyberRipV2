import React, { useState } from 'react';
import { PlayerState, FuneralData } from '../types';

// --- INTRO ---
export const IntroView: React.FC<{ onStart: () => void }> = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center text-center space-y-6 p-4">
            <div className="space-y-2">
                <h1 className="text-3xl text-[#e4b85d] drop-shadow-md tracking-widest font-bold">CyberRip</h1>
                <p className="text-gray-400 text-xs uppercase tracking-widest">The 8-Bit Funeral Home</p>
            </div>
            
            <div className="text-sm text-gray-300 max-w-md leading-loose bg-black/20 p-4 rounded border border-gray-700 shadow-inner">
                <p className="mb-4 font-bold text-white">Welcome, Director.</p>
                <p className="mb-4">
                    The digital afterlife is booming. Your job is to attend services, manage the queue, and ensure everyone gets a "proper" send-off.
                </p>
                <ul className="text-left list-disc pl-6 space-y-2 text-xs text-gray-400">
                    <li>Use <span className="text-yellow-400 font-bold">[WASD]</span> to walk around.</li>
                    <li>Press <span className="text-yellow-400 font-bold">[F]</span> to interact with objects.</li>
                    <li>Visit the <span className="text-blue-400 font-bold">Receptionist</span> to schedule new funerals.</li>
                    <li>Take a seat in the pews to pay your respects.</li>
                </ul>
            </div>

            <button 
                onClick={onStart}
                className="px-8 py-3 bg-[#d32f2f] text-white font-bold text-lg rounded hover:bg-[#b71c1c] border-b-4 border-[#880e4f] active:border-b-0 active:translate-y-1 transition-all shadow-lg"
            >
                ENTER CHAPEL
            </button>
        </div>
    );
};

// --- CUSTOMIZATION ---
export const CustomizationForm: React.FC<{
    player: PlayerState, 
    setPlayer: React.Dispatch<React.SetStateAction<PlayerState>>, 
    close: () => void
}> = ({player, setPlayer, close}) => {
    
    const updateColor = (part: keyof typeof player.appearance, val: string) => {
        setPlayer(p => ({...p, appearance: {...p.appearance, [part]: val}}));
    };

    const colors = ['#e4b85d', '#333333', '#d32f2f', '#388e3c', '#1976d2', '#5d4037', '#f44336', '#ffeb3b', '#ffffff', '#000000'];

    return (
        <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* LIVE PREVIEW */}
            <div className="flex flex-col items-center justify-center bg-[#2d2d2d] p-4 rounded border-2 border-gray-600 min-w-[120px] self-center md:self-start shadow-inner">
                <h3 className="text-gray-400 text-[10px] mb-4 uppercase tracking-widest">Preview</h3>
                <div className="relative w-16 h-20 scale-150 mb-4">
                    <div className="absolute bottom-0 left-4 w-8 h-10">
                         <div className="absolute bottom-0 left-1 w-6 h-4 rounded-b-sm" style={{backgroundColor: player.appearance.pantsColor}}></div>
                         <div className="absolute bottom-4 left-1 w-6 h-4 rounded-t-sm" style={{backgroundColor: player.appearance.shirtColor}}></div>
                         <div className="absolute bottom-7 left-1.5 w-5 h-5 rounded-sm z-10" style={{backgroundColor: player.appearance.skinColor}}></div>
                         {player.appearance.hasHat && (
                             <>
                                 <div className="absolute bottom-10 left-0 w-8 h-2 rounded-sm z-20" style={{backgroundColor: player.appearance.hatColor}}></div>
                                 <div className="absolute bottom-11 left-2 w-4 h-2 rounded-t-sm z-20" style={{backgroundColor: player.appearance.hatColor}}></div>
                             </>
                         )}
                         <div className="absolute top-3 left-2.5 w-1 h-1 bg-black z-30"></div>
                         <div className="absolute top-3 right-2.5 w-1 h-1 bg-black z-30"></div>
                    </div>
                </div>
            </div>

            {/* CONTROLS */}
            <div className="flex-1 space-y-4 w-full">
                 {['shirtColor', 'pantsColor', 'hatColor'].map((part) => (
                     <div key={part}>
                         <label className="block text-xs text-gray-400 uppercase mb-1 tracking-wider">{part.replace('Color', '')}</label>
                         <div className="flex flex-wrap gap-1">
                             {colors.map(c => (
                                 <button 
                                    key={c} 
                                    onClick={() => updateColor(part as any, c)}
                                    className={`w-6 h-6 rounded-sm border-2 transition-transform hover:scale-110 ${player.appearance[part as keyof typeof player.appearance] === c ? 'border-white scale-110 ring-1 ring-white' : 'border-transparent hover:border-gray-500'}`}
                                    style={{backgroundColor: c}}
                                 />
                             ))}
                         </div>
                     </div>
                 ))}
                 
                 <div className="pt-2 border-t border-gray-700">
                     <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-700/50 p-1 rounded">
                         <input 
                            type="checkbox" 
                            checked={player.appearance.hasHat} 
                            onChange={e => setPlayer(p => ({...p, appearance: {...p.appearance, hasHat: e.target.checked}}))}
                            className="accent-yellow-500 w-4 h-4"
                         />
                         <span className="text-sm text-gray-300">Wear Hat</span>
                     </label>
                 </div>

                 <button onClick={close} className="w-full mt-4 bg-[#388e3c] text-white py-2 rounded text-xs uppercase tracking-wider hover:bg-[#2e7d32] border-b-4 border-[#1b5e20] active:border-b-0 active:translate-y-1">
                     Confirm Style
                 </button>
            </div>
        </div>
    );
};

// --- APPLICATION FORM ---
export const ApplicationForm: React.FC<{ onSubmit: (name: string, cause: string) => Promise<void> }> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [cause, setCause] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !cause) return;
        setLoading(true);
        await onSubmit(name, cause);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs text-gray-400 uppercase mb-1 tracking-wider">Deceased Name (Thing/Person)</label>
                <input 
                    autoFocus
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-yellow-500 outline-none placeholder-gray-600"
                    placeholder="e.g. My Motivation"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    maxLength={30}
                />
            </div>
            <div>
                <label className="block text-xs text-gray-400 uppercase mb-1 tracking-wider">Cause of Death</label>
                <input 
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-yellow-500 outline-none placeholder-gray-600"
                    placeholder="e.g. Excessive Doomscrolling"
                    value={cause}
                    onChange={e => setCause(e.target.value)}
                    maxLength={50}
                />
            </div>
            <button 
                disabled={loading || !name || !cause}
                className="w-full bg-[#d32f2f] text-white py-3 rounded font-bold border-b-4 border-[#9a0007] active:border-b-0 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#c62828] transition-colors"
            >
                {loading ? 'PROCESSING...' : 'SUBMIT APPLICATION'}
            </button>
        </form>
    );
};

// --- NOTICE BOARD ---
export const NoticeBoardView: React.FC<{ history: FuneralData[], queue: FuneralData[] }> = ({ history, queue }) => {
    return (
        <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            <div>
                <h3 className="text-[#e4b85d] border-b border-[#e4b85d] pb-1 mb-2 uppercase text-xs tracking-widest sticky top-0 bg-[#1a1a1a] py-1">Upcoming</h3>
                {queue.length === 0 ? (
                    <p className="text-gray-500 text-xs italic p-2">No services scheduled.</p>
                ) : (
                    <ul className="space-y-2">
                        {queue.map(f => (
                            <li key={f.id} className="bg-gray-700/50 p-2 rounded text-xs border border-gray-600">
                                <div className="font-bold text-white">{f.deceasedName}</div>
                                <div className="text-gray-400 text-[10px]">Cause: {f.causeOfDeath}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <h3 className="text-gray-500 border-b border-gray-600 pb-1 mb-2 uppercase text-xs tracking-widest sticky top-0 bg-[#1a1a1a] py-1">Past Services</h3>
                 {history.length === 0 ? (
                    <p className="text-gray-500 text-xs italic p-2">The books are empty.</p>
                ) : (
                    <ul className="space-y-2">
                        {history.map(f => (
                            <li key={f.id} className="bg-gray-800/50 p-2 rounded text-xs border-l-2 border-gray-600">
                                <div className="font-bold text-gray-400 line-through decoration-2 decoration-red-900">{f.deceasedName}</div>
                                <div className="text-[10px] text-gray-500 italic line-clamp-2 mt-1">"{f.eulogy}"</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};