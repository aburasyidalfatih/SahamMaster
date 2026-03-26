import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Info, Book, PenTool, Plus, Trash2, Search, ArrowRight, DollarSign, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { TradeLog, GlossaryTerm } from '../types';
import { GLOSSARY_DATA } from '../constants';

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'calculator' | 'chart' | 'journal' | 'glossary'>('calculator');

  // --- CALCULATOR STATE ---
  const [modal, setModal] = useState<number>(10000000);
  const [targetPercent, setTargetPercent] = useState<number>(10);
  const [period, setPeriod] = useState<number>(12);
  const [feeBeli, setFeeBeli] = useState<number>(0.15);
  const [feeJual, setFeeJual] = useState<number>(0.25);

  // --- JOURNAL STATE ---
  const [trades, setTrades] = useState<TradeLog[]>([]);
  const [newTrade, setNewTrade] = useState<Partial<TradeLog>>({
    stockCode: '',
    buyPrice: 0,
    lots: 0,
    status: 'OPEN',
    notes: ''
  });
  const [isAddingTrade, setIsAddingTrade] = useState(false);

  // --- GLOSSARY STATE ---
  const [searchTerm, setSearchTerm] = useState('');

  // Load Journal from Local Storage
  useEffect(() => {
    const savedTrades = localStorage.getItem('sahamMasterJournal');
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades));
    }
  }, []);

  const saveTrades = (updatedTrades: TradeLog[]) => {
    setTrades(updatedTrades);
    localStorage.setItem('sahamMasterJournal', JSON.stringify(updatedTrades));
  };

  const calculateCompound = () => {
    const data = [];
    let currentCapital = modal;
    for (let i = 1; i <= period; i++) {
      const profit = currentCapital * (targetPercent / 100);
      currentCapital += profit;
      data.push({
        period: `Bulan ${i}`,
        modal: Math.round(currentCapital)
      });
    }
    return data;
  };

  const calculateFee = () => {
    const totalBeli = modal * (feeBeli / 100);
    const totalJual = modal * (feeJual / 100);
    const breakEvenIncrease = ((feeBeli + feeJual) / (100 - feeJual)) * 100;
    return {
      feeBeliNominal: totalBeli,
      feeJualNominal: totalJual, 
      breakEven: breakEvenIncrease
    };
  };

  // --- JOURNAL FUNCTIONS ---
  const handleAddTrade = () => {
    if (!newTrade.stockCode || !newTrade.buyPrice || !newTrade.lots) return;

    const trade: TradeLog = {
      id: Date.now().toString(),
      stockCode: newTrade.stockCode.toUpperCase(),
      buyDate: new Date().toISOString(),
      buyPrice: Number(newTrade.buyPrice),
      lots: Number(newTrade.lots),
      status: 'OPEN',
      notes: newTrade.notes || '',
    };

    saveTrades([trade, ...trades]);
    setNewTrade({ stockCode: '', buyPrice: 0, lots: 0, status: 'OPEN', notes: '' });
    setIsAddingTrade(false);
  };

  const handleCloseTrade = (id: string, sellPrice: number) => {
    const updatedTrades = trades.map(t => {
      if (t.id === id) {
        const buyVal = t.buyPrice * t.lots * 100;
        const sellVal = sellPrice * t.lots * 100;
        const pnl = sellVal - buyVal; 
        const pnlPercent = ((sellPrice - t.buyPrice) / t.buyPrice) * 100;
        
        return {
          ...t,
          sellPrice,
          status: pnl >= 0 ? 'WIN' : 'LOSS',
          pnl,
          pnlPercent
        } as TradeLog;
      }
      return t;
    });
    saveTrades(updatedTrades);
  };

  const handleDeleteTrade = (id: string) => {
    if(confirm('Hapus log ini?')) {
        saveTrades(trades.filter(t => t.id !== id));
    }
  }

  // --- GLOSSARY FILTER ---
  const filteredGlossary = GLOSSARY_DATA.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartData = calculateCompound();
  const feeData = calculateFee();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 md:space-y-6 pb-24 md:pb-0 px-1">
      
      {/* Navigation Tabs - Ensuring full width and horizontal scroll without breaking layout */}
      <div className="sticky top-14 md:top-0 z-30 bg-slate-50/95 backdrop-blur-sm pt-2 pb-2 md:pb-0 w-full overflow-hidden">
        <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2 scrollbar-hide w-full">
          <button
            onClick={() => setActiveTool('calculator')}
            className={`flex-none flex items-center px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-sm border ${
              activeTool === 'calculator' 
              ? 'bg-blue-600 text-white border-blue-600 shadow-blue-200' 
              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Kalkulator
          </button>
          <button
            onClick={() => setActiveTool('chart')}
            className={`flex-none flex items-center px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-sm border ${
              activeTool === 'chart' 
              ? 'bg-blue-600 text-white border-blue-600 shadow-blue-200' 
              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Simulasi
          </button>
          <button
            onClick={() => setActiveTool('journal')}
            className={`flex-none flex items-center px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-sm border ${
              activeTool === 'journal' 
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-200' 
              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <PenTool className="w-4 h-4 mr-2" />
            Jurnal
          </button>
          <button
            onClick={() => setActiveTool('glossary')}
            className={`flex-none flex items-center px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-sm border ${
              activeTool === 'glossary' 
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-200' 
              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Book className="w-4 h-4 mr-2" />
            Kamus
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 min-h-[400px] w-full box-border">
        
        {/* === TOOL: CALCULATOR === */}
        {activeTool === 'calculator' && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Kalkulator Transaksi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Modal Awal (Rp)</label>
                  <input 
                    type="number" 
                    value={modal} 
                    onChange={(e) => setModal(Number(e.target.value))} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-[16px] font-medium appearance-none"
                    placeholder="Contoh: 10000000"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Fee Beli (%)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={feeBeli} 
                      onChange={(e) => setFeeBeli(Number(e.target.value))} 
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-[16px] appearance-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Fee Jual (%)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={feeJual} 
                      onChange={(e) => setFeeJual(Number(e.target.value))} 
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-[16px] appearance-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 md:p-5 rounded-xl space-y-4 border border-blue-100 overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                  <span className="text-gray-600 font-medium text-sm">Total Fee Broker</span>
                  <span className="font-bold text-red-500 text-lg break-all">Rp {feeData.feeBeliNominal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 border-t border-blue-200 pt-3">
                  <span className="text-gray-800 font-bold text-sm">Titik Impas (BEP)</span>
                  <span className="font-black text-2xl text-blue-700">{feeData.breakEven.toFixed(2)}%</span>
                </div>
                <div className="text-xs text-blue-600 bg-white/60 p-3 rounded-lg flex items-start leading-relaxed shadow-inner">
                   <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                   <span>Saham harus naik minimal <strong className="font-bold">{feeData.breakEven.toFixed(2)}%</strong> agar Anda tidak rugi biaya admin sekuritas.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === TOOL: CHART === */}
        {activeTool === 'chart' && (
          <div className="space-y-6 animate-in fade-in">
             <h2 className="text-lg md:text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Simulasi Cuan</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Target/Bulan (%)</label>
                  <input 
                    type="number" 
                    value={targetPercent} 
                    onChange={(e) => setTargetPercent(Number(e.target.value))} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-[16px] appearance-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Durasi (Bulan)</label>
                  <input 
                    type="number" 
                    value={period} 
                    onChange={(e) => setPeriod(Number(e.target.value))} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-[16px] appearance-none"
                  />
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <label className="block text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Estimasi Aset Akhir</label>
                  <div className="text-lg md:text-xl font-black text-green-700 break-words md:break-normal">
                    Rp {chartData[chartData.length-1]?.modal.toLocaleString('id-ID')}
                  </div>
                </div>
             </div>

             <div className="h-64 w-full bg-slate-50 rounded-xl p-2 border border-slate-100 overflow-hidden relative">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                   <XAxis dataKey="period" hide />
                   <YAxis tickFormatter={(val) => `${(val/1000000).toFixed(0)}Jt`} width={35} tick={{fontSize: 10}} />
                   <Tooltip 
                      formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`} 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                   />
                   <Line type="monotone" dataKey="modal" stroke="#2563eb" strokeWidth={3} dot={{r: 3, fill: '#2563eb', strokeWidth: 1.5, stroke: '#fff'}} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </div>
        )}

        {/* === TOOL: JOURNAL === */}
        {activeTool === 'journal' && (
            <div className="space-y-6 animate-in fade-in">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">Jurnal Trading</h2>
                    <button 
                        onClick={() => setIsAddingTrade(!isAddingTrade)}
                        className={`px-3 py-2 rounded-lg text-sm font-bold flex items-center shadow-sm transition-colors ${isAddingTrade ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                    >
                        {isAddingTrade ? <><X className="w-4 h-4 mr-1" /> Batal</> : <><Plus className="w-4 h-4 mr-1" /> Catat</>}
                    </button>
                </div>

                {isAddingTrade && (
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-indigo-700 ml-1">Kode Saham</label>
                            <input 
                                placeholder="Contoh: BBCA" 
                                value={newTrade.stockCode}
                                onChange={e => setNewTrade({...newTrade, stockCode: e.target.value})}
                                className="w-full px-3 py-3 rounded-lg border border-indigo-200 uppercase font-bold text-[16px] focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
                            />
                        </div>
                        <div className="space-y-1">
                             <label className="text-xs font-bold text-indigo-700 ml-1">Harga Beli</label>
                             <input 
                                placeholder="0" 
                                type="number"
                                value={newTrade.buyPrice || ''}
                                onChange={e => setNewTrade({...newTrade, buyPrice: Number(e.target.value)})}
                                className="w-full px-3 py-3 rounded-lg border border-indigo-200 text-[16px] focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
                            />
                        </div>
                        <div className="space-y-1">
                             <label className="text-xs font-bold text-indigo-700 ml-1">Jml Lot</label>
                             <input 
                                placeholder="0" 
                                type="number"
                                value={newTrade.lots || ''}
                                onChange={e => setNewTrade({...newTrade, lots: Number(e.target.value)})}
                                className="w-full px-3 py-3 rounded-lg border border-indigo-200 text-[16px] focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
                            />
                        </div>
                        <div className="space-y-1 sm:col-span-2 md:col-span-1">
                             <label className="text-xs font-bold text-indigo-700 ml-1">Catatan</label>
                             <input 
                                placeholder="Alasan beli..." 
                                value={newTrade.notes}
                                onChange={e => setNewTrade({...newTrade, notes: e.target.value})}
                                className="w-full px-3 py-3 rounded-lg border border-indigo-200 text-[16px] focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
                            />
                        </div>
                        <button onClick={handleAddTrade} className="col-span-1 sm:col-span-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold shadow-md active:scale-95 transition-transform mt-2">
                            Simpan ke Jurnal
                        </button>
                    </div>
                )}

                {/* Mobile Card View Only for best responsive results */}
                <div className="space-y-3">
                    {trades.length === 0 && <p className="text-center text-gray-400 py-12 border-2 border-dashed border-gray-100 rounded-2xl bg-slate-50 font-medium">Belum ada catatan trading.</p>}
                    {trades.map((trade) => (
                        <div key={trade.id} className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white relative">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-700 mr-3">
                                        {trade.stockCode.substring(0,2)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 leading-none">{trade.stockCode}</h3>
                                        <p className="text-xs text-slate-400 mt-1">{new Date(trade.buyDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                     {trade.status === 'OPEN' ? (
                                         <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold">OPEN</span>
                                    ) : (
                                        <div className={`text-right ${trade.status === 'WIN' ? 'text-green-600' : 'text-red-600'}`}>
                                            <p className="font-bold text-sm">{trade.pnlPercent?.toFixed(1)}%</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                                <div className="bg-slate-50 p-2 rounded-lg">
                                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Harga Beli</span>
                                    <strong className="text-slate-700">{trade.buyPrice.toLocaleString()}</strong>
                                </div>
                                <div className="bg-slate-50 p-2 rounded-lg">
                                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Lot</span>
                                    <strong className="text-slate-700">{trade.lots}</strong>
                                </div>
                                <div className="bg-slate-50 p-2 rounded-lg col-span-2">
                                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Value</span>
                                    <strong className="text-slate-700">Rp {(trade.buyPrice * trade.lots * 100).toLocaleString()}</strong>
                                </div>
                                {trade.sellPrice && (
                                     <div className={`p-2 rounded-lg col-span-2 ${trade.status === 'WIN' ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
                                        <span className={`text-[10px] uppercase font-bold block ${trade.status === 'WIN' ? 'text-green-600' : 'text-red-600'}`}>Profit/Loss</span>
                                        <strong className={`${trade.status === 'WIN' ? 'text-green-700' : 'text-red-700'}`}>Rp {trade.pnl?.toLocaleString()}</strong>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                {trade.status === 'OPEN' && (
                                    <button 
                                        onClick={() => {
                                            const price = prompt('Harga Jual?');
                                            if(price) handleCloseTrade(trade.id, Number(price));
                                        }}
                                        className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg text-sm font-bold shadow-md active:scale-95 transition-transform"
                                    >
                                        Jual (Tutup Posisi)
                                    </button>
                                )}
                                <button onClick={() => handleDeleteTrade(trade.id)} className="px-3 py-2 bg-slate-100 text-slate-400 rounded-lg hover:bg-red-100 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* === TOOL: GLOSSARY === */}
        {activeTool === 'glossary' && (
             <div className="space-y-6 animate-in fade-in w-full overflow-hidden">
                {/* Search Bar */}
                <div className="sticky top-0 bg-white z-10 py-2">
                    <div className="relative">
                        <input 
                            type="text"
                            placeholder="Cari istilah (Contoh: ARA, HAKA)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-[16px] shadow-sm appearance-none"
                        />
                        <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredGlossary.length === 0 ? (
                        <p className="col-span-2 text-center text-gray-400 py-8">Istilah tidak ditemukan.</p>
                    ) : (
                        filteredGlossary.map((item, idx) => (
                            <div key={idx} className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 hover:border-emerald-300 transition-colors w-full box-border">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-800">{item.term}</h3>
                                    <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
                                        {item.category}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.definition}</p>
                            </div>
                        ))
                    )}
                </div>
             </div>
        )}

      </div>
    </div>
  );
};

export default Tools;