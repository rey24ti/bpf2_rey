import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
  // 1. Inisialisasi state dataForm (Menggantikan state terpisah)
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
  });

  // 2. Inisialisasi Handle perubahan nilai input secara general
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // 3. Ubah pemanggilan state menggunakan dataForm.searchTerm
  const _searchTerm = dataForm.searchTerm.toLowerCase();
const _selectedTag = dataForm.selectedTag.toString();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    // Ubah pemanggilan state menggunakan dataForm.selectedTag
    const matchesTag = _selectedTag
      ? framework.tags.includes(_selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Framework Explorer 🚀
        </h1>

        <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4">
          {/* Update Input: Tambah properti name dan gunakan handleChange */}
          <input
            name="searchTerm"
            type="text"
            placeholder="Search framework..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={dataForm.searchTerm}
          />

          {/* Update Select: Tambah properti name dan gunakan handleChange */}
          <select
            name="selectedTag"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={dataForm.selectedTag}
          >
            <option value="">All Tags</option>
            {allTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Card List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredFrameworks.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600 mb-3">{item.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFrameworks.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No frameworks found 😢
          </p>
        )}
      </div>
    </div>
  );
}