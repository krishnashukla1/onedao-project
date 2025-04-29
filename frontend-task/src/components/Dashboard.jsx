import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please log in.');
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get('http://localhost:5000/products', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(res.data.products || res.data);
                console.log("Products from API:", res.data.products||res.data);
            } catch (err) {
                const message = err?.response?.data?.message || 'Failed to fetch products';
                setError(message);

                if (err?.response?.status === 403) {
                    navigate('/login');
                }
            }
        };

        fetchProducts();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* ----------------------- */}
            <div className="w-64 bg-black text-white p-6">
            
                <h2 className="text-xl font-bold mb-6">Main Menu</h2>
                <ul>
                    {[
                        ['📊', 'Dashboard'],
                        ['📦', 'Orders'],
                        ['🚗', 'Rides'],
                        ['👥', 'Clients'],
                        ['👤', 'Drivers'],
                        ['🌍', 'Live map'],
                        ['🚙', 'Car classes'],
                        ['🏢', 'Branches'],
                        ['⚙️', 'Moderators'],
                        ['🛠️', 'Settings'],
                    ].map(([icon, label], i) => (
                        <li className="mb-4" key={i}>
                            <a href="#" className="flex items-center space-x-2">
                                <span>{icon}</span>
                                <span>{label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleLogout}
                    className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>

                      {/* ----------------------- */}

            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Good morning, Krishna! 🌞</h1>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                        Knowledge base
                    </button>
                </div>

                           {/* ----------------------- */}

                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        ['Total Orders', '1,234'],
                        ['Total Earnings', '$56,789'],
                        ['Portfolio', '45'],
                    ].map(([label, value], i) => (
                        <div key={i} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">{label}</h3>
                            <p className="text-2xl font-bold">{value}</p>
                        </div>
                    ))}
                </div>

               
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
                        {error}
                    </div>
                )}

                         {/* ----------------------- */}

                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <h3 className="text-lg font-semibold mb-4">Progress Score</h3>
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <img
                            src="https://img.freepik.com/free-vector/infographic-timeline-design-template_23-2149141543.jpg"
                            alt="Graph Placeholder"
                            className="h-full object-contain"
                        />
                    </div>
                </div>

                           {/* ---------DRIVER-------------- */}

                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <h3 className="text-lg font-semibold mb-4">Top Drivers</h3>
                    <ul>
                        {[
                            ['Sachin', 5, '$98'],
                            ['Rahul', 5, '$15'],
                            ['Saurav', 5, '$23'],
                        ].map(([name, orders, income], i) => (
                            <li
                                key={i}
                                className="flex justify-between py-2 border-b last:border-b-0"
                            >
                                <span>{name}</span>
                                <span>Orders: {orders}</span>
                                <span>{income}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                         {/* ----------PRODUCT TABLE------------- */}

                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Products</h3>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 text-left">User</th>
                                <th className="p-2 text-left">Car Comfort</th>
                                <th className="p-2 text-left">Order Timed</th>
                                <th className="p-2 text-left">Start Location</th>
                                <th className="p-2 text-left">Finish Location</th>
                                <th className="p-2 text-left">Income</th>
                            </tr>
                        </thead>
                        <tbody>

                            {Array.isArray(products) && products.length > 0 ? (
                                products.map((product, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2">{product.name}</td>
                                        <td className="p-2">{product.description || 'N/A'}</td>
                                        <td className="p-2">{new Date().toLocaleDateString()}</td>
                                        <td className="p-2">Start Location</td>
                                        <td className="p-2">Finish Location</td>
                                        <td className="p-2">${product.price}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-4 text-center text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

