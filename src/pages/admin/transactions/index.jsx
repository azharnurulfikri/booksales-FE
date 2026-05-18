import { useState, useEffect } from "react";
import { getTransaction } from "../../../_services/transactions"; 

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getTransaction();
                if (Array.isArray(response)) {
                    setTransactions(response);
                } else {
                    setTransactions([]); 
                }
            } catch (error) {
                console.error("Gagal mengambil data transaksi:", error);
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <section className="p-1">
            <div className="flex flex-col md:flex-row items-center justify-between pb-5 mb-5 border-b border-gray-800/60">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Book Orders & Transactions</h2>
                    <p className="text-xs text-gray-400 mt-1">Daftar pesanan buku masuk dari berbagai user/customer</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-950/40 border-b border-gray-800/60">
                        <tr>
                            <th scope="col" className="px-6 py-4 w-16 text-center">No</th>
                            <th scope="col" className="px-6 py-4">No. Pesanan</th>
                            <th scope="col" className="px-6 py-4">Nama Pembeli</th>
                            <th scope="col" className="px-6 py-4">Detail Buku</th>
                            <th scope="col" className="px-6 py-4 text-center">Total Harga</th>
                            <th scope="col" className="px-6 py-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/30">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500 font-medium">
                                    Memuat data pesanan buku...
                                </td>
                            </tr>
                        ) : transactions.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500 font-medium">
                                    Belum ada pesanan atau transaksi masuk.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((trx, index) => (
                                <tr key={trx.id} className="hover:bg-gray-900/40 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-center text-gray-500">{index + 1}</td>
                                    
                                    <td className="px-6 py-4 font-mono text-xs font-bold text-indigo-400">
                                        {trx.order_number}
                                    </td>
                                    
                                    <td className="px-6 py-4 font-bold text-white">
                                        {trx.user?.name || "User Tidak Ditemukan"}
                                    </td>
                                    
                                    <td className="px-6 py-4">
                                        <div className="text-gray-200 font-medium">
                                            {trx.book?.title || "Buku Telah Dihapus"}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-0.5">
                                            {trx.quantity || 1} pcs x Rp {Number(trx.book?.price || 0).toLocaleString("id-ID")}
                                        </div>
                                    </td>
                                    
                                    {/* FIX FINAL: Di sini kita suruh React yang ngitung paksa hasilnya */}
                                    <td className="px-6 py-4 text-center font-bold text-emerald-400">
                                        Rp {Number((trx.quantity || 1) * (trx.book?.price || 0)).toLocaleString("id-ID")}
                                    </td>
                                    
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md border ${
                                            trx.status === 'success' || trx.status === 'completed'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : trx.status === 'pending'
                                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                                        }`}>
                                            {trx.status || 'pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}