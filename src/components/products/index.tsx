import { LoadingOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Product {
  id: number
  title: string
  description: string
  price: number
  brand: string
  thumbnail: string
  category: string
  rating: number
}

export default function ProductsComponent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const navigate = useNavigate()

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://dummyjson.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const result = await response.json();
            setProducts(result.products);
        } catch (error) {
            console.error("Error while fetching products:", error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-gray-600"><LoadingOutlined /></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-600">Error: {error}</div>
            </div>
        );
    }

    const productDetail = (id: number) => {
        navigate(`/products/productsdetails/${id}`)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-left">
                    Our Products
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((item) => (
                        <div 
                            key={item.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            onClick={() => productDetail(item.id)}
                        >
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src={item.thumbnail} 
                                    alt={item.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1 mr-3">
                                        {item.title}
                                    </h3>
                                    <span className="text-lg font-bold text-green-600">
                                        ${item.price}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">Brand:</span> {item.brand}
                                </div>
                                <div className="text-sm text-gray-600 mb-3 line-clamp-3">
                                    {item.description}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500 capitalize">
                                        {item.category}
                                    </span>
                                    <div className="flex items-center">
                                        <span className="text-yellow-500">★</span>
                                        <span className="text-sm text-gray-600 ml-1">
                                            {item.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
