"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // GET TOKEN DIRECTLY FROM LOCAL STORAGE
  const getToken = () => {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem("token");
  };

  // GET PRODUCTS
  const fetchProducts = async () => {
    const token = getToken();

    console.log("JWT Token:", token);

    if (!token) {
      console.log("No JWT token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Products response:", response.status);

      if (response.status === 401 || response.status === 403) {
        console.log("JWT rejected by backend");

        localStorage.removeItem("token");

        alert("Your login session is invalid. Please login again.");

        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      console.log("Products:", data);

      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // LOAD PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  // CREATE PRODUCT
  const addProduct = async () => {
    const token = getToken();

    if (!token) {
      alert("Please login first");
      return;
    }

    if (!name || !price || !quantity) {
      alert("Please fill all fields");
      return;
    }

    const product = {
      name: name,
      price: Number(price),
      quantity: Number(quantity),
    };

    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");

        alert("Your login session is invalid.");

        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      setName("");
      setPrice("");
      setQuantity("");

      fetchProducts();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id: number) => {
    const token = getToken();

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");

        alert("Your login session is invalid.");

        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8">Product Management</h1>

      {/* ADD PRODUCT */}

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <div className="flex gap-3">
          <input
            className="border p-2"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button
            onClick={addProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* PRODUCT TABLE */}

      <h2 className="text-xl font-semibold mb-4">Products</h2>

      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border p-3">ID</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Price</th>
            <th className="border p-3">Quantity</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-3">{product.id}</td>

              <td className="border p-3">{product.name}</td>

              <td className="border p-3">Rs. {product.price}</td>

              <td className="border p-3">{product.quantity}</td>

              <td className="border p-3">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
