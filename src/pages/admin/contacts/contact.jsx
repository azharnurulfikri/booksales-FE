import React, { useEffect, useState } from 'react';
import { getContacts } from '../../../_services/contacts'; 

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data.data || data); 
      } catch (error) {
        console.error("Gagal mengambil data pesan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    // Mengubah container luar menjadi p-0 karena padding luar sudah di-handle oleh layout utama admin
    <div className="p-0 font-sans relative">
      
      {/* Header Admin Panel */}
      <div className="mb-8 pb-6 border-b border-gray-800/60">
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Daftar <span className="text-indigo-400">Pesan Masuk</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Berikut adalah pesan dari pengunjung toko BookSales.
        </p>
      </div>

      {loading ? (
        // Loading State dengan Spinner custom yang sinkron tema gelap
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-7 w-7 border-2 border-indigo-500 border-t-transparent"></div>
        </div>
      ) : (
        // Rangka Konstruksi Tabel: Transparan, Borderless, dengan backing warna gelap pekat
        <div className="bg-transparent relative overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400 border-collapse">
              <thead className="text-xs text-gray-500 uppercase bg-gray-950/40 border-b border-gray-800/40">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold tracking-wider">No</th>
                  <th scope="col" className="px-6 py-4 font-bold tracking-wider">Nama</th>
                  <th scope="col" className="px-6 py-4 font-bold tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-4 font-bold tracking-wider">Pesan</th>
                  <th scope="col" className="px-6 py-4 font-bold tracking-wider">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-24 text-center text-gray-500 text-xs tracking-wide">
                      Belum ada pesan masuk di dalam sistem database.
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact, index) => (
                    <tr key={contact.id} className="hover:bg-gray-900/30 transition-colors duration-200">
                      <td className="px-6 py-4.5 text-xs font-mono text-gray-600">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="px-6 py-4.5 font-bold text-gray-200 whitespace-nowrap">
                        {contact.name}
                      </td>
                      <td className="px-6 py-4.5 text-gray-400 font-medium text-xs font-mono">
                        {contact.email}
                      </td>
                      {/* Sel pembatas text pesan dengan max-width agar layout tetap proporsional */}
                      <td className="px-6 py-4.5 text-gray-400 max-w-xs truncate text-xs sm:text-sm font-normal" title={contact.message}>
                        {contact.message}
                      </td>
                      <td className="px-6 py-4.5 text-gray-500 text-xs font-medium whitespace-nowrap">
                        {new Date(contact.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;