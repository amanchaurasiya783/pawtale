"use client";
import { useState } from "react";

export default function AddProductForm() {
  const initialState = {
    name: "",
    description: "",
    skuID: "",
    price: "",
    mrp: "",
    discount: "",
    images: [""],
    category: "",
    quantity: 0,
  };
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const handleAddProduct = async () => {
      try {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log("Result:", result);

        if (response.ok) {
          console.log(result.message);
          setFormData(initialState);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Failed to add product", error);
      }
    };
    handleAddProduct();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter product description"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">SKU ID</label>
          <input
            type="text"
            name="skuID"
            value={formData.skuID}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter SKU ID"
            required
          />
        </div>

        <div className="flex gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter price"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">MRP</label>
            <input
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter MRP"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Discount</label>
            <input
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter discount"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Images</label>
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                placeholder={`Image URL ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Image
          </button>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter category"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter quantity"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}
