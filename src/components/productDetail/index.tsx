import {
  LoadingOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Image, Rate, Tag } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetailComponent() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProductById = async (id: string) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      console.log(data);
      setProduct(data);
    } catch (error: any) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full ">
        <LoadingOutlined className="text-blue text-[40px]" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center w-full">
          <img
            src={product?.thumbnail}
            alt={product?.title}
            className="rounded-2xl shadow-lg w-full  object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product?.title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {product?.category} • {product?.brand}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Rate disabled allowHalf defaultValue={product?.rating} />
            <span className="text-sm text-gray-600">{product?.rating} / 5</span>
          </div>

          <div className="mt-4">
            <span className="text-2xl font-semibold text-green-600">
              ${product?.price}
            </span>
            <span className="ml-2 text-sm text-gray-500 line-through">
              $
              {(
                product?.price +
                (product?.price * product?.discountPercentage) / 100
              ).toFixed(2)}
            </span>
            <span className="ml-2 text-sm text-red-500">
              -{product?.discountPercentage}%
            </span>
          </div>

          <p className="mt-2 text-sm flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                product?.availabilityStatus === "In Stock"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product?.availabilityStatus}
            </span>

            {/* Stock Count */}
            <span className="text-gray-600">{product?.stock} available</span>
          </p>

          <p className="mt-4 text-gray-700">{product?.description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {product?.tags?.map((tag: string, index: number) => (
              <Tag key={index} color="blue">
                {tag}
              </Tag>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <TruckOutlined className="text-blue-500" />{" "}
              {product.shippingInformation}
            </p>
            <p className="flex items-center gap-2">
              <SafetyCertificateOutlined className="text-red-500" />{" "}
              {product.warrantyInformation}
            </p>
            <p className="flex items-center gap-2">
              <SyncOutlined className="text-indigo-500" />{" "}
              {product.returnPolicy}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700">Scan QR Code</h3>
            <Image
              width={100}
              src={product?.meta?.qrCode}
              alt="QR Code"
              className="rounded-md shadow"
            />
            <p className="text-xs text-gray-500 mt-1">
              Scan to view this product on your phone
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Customer Reviews
        </h2>
        <div className="space-y-4">
          {product.reviews.map((review: any, index: number) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-black">{review.reviewerName}</p>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>

              <p className="text-xs text-gray-400">{review.reviewerEmail}</p>

              <div className="flex items-center mt-2">
                <Rate disabled defaultValue={review.rating} />
                <span className="ml-2 text-sm text-gray-600">
                  {review.rating}/5
                </span>
              </div>

              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
