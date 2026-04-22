import PageHeader from "../components/PageHeader";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";

export default function Dashboard() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <PageHeader />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">

                {/* Orders */}
                <div className="group flex items-center gap-5 bg-white px-5 py-5 rounded-xl shadow 
                hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1 
                transition-all duration-200 cursor-pointer">

                    <div className="bg-green-500 text-white p-5 rounded-full text-3xl 
                    group-hover:scale-110 transition">
                        <FaShoppingCart />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">75</h2>
                        <p className="text-sm text-gray-400">Total Orders</p>
                    </div>

                </div>

                {/* Delivered */}
                <div className="group flex items-center gap-5 bg-white px-5 py-5 rounded-xl shadow 
                hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1 
                transition-all duration-200 cursor-pointer">

                    <div className="bg-blue-500 text-white p-5 rounded-full text-3xl 
                    group-hover:scale-110 transition">
                        <FaTruck />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">175</h2>
                        <p className="text-sm text-gray-400">Total Delivered</p>
                    </div>

                </div>

                {/* Canceled */}
                <div className="group flex items-center gap-5 bg-white px-5 py-5 rounded-xl shadow 
                hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1 
                transition-all duration-200 cursor-pointer">

                    <div className="bg-red-500 text-white p-5 rounded-full text-3xl 
                    group-hover:scale-110 transition">
                        <FaBan />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">40</h2>
                        <p className="text-sm text-gray-400">Total Canceled</p>
                    </div>

                </div>

                {/* Revenue */}
                <div className="group flex items-center gap-5 bg-white px-5 py-5 rounded-xl shadow 
                hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1 
                transition-all duration-200 cursor-pointer">

                    <div className="bg-yellow-500 text-white p-5 rounded-full text-3xl 
                    group-hover:scale-110 transition">
                        <FaDollarSign />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Rp.128</h2>
                        <p className="text-sm text-gray-400">Total Revenue</p>
                    </div>

                </div>

            </div>
        </div>
    );
}