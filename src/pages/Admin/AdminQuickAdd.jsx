import React, { useState, useEffect } from "react";
import api from "../../utils/api.js";
import {
  Package,
  FolderPlus,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Tag,
  Layers,
  ImagePlus,
} from "lucide-react";

export default function AdminQuickAdd() {
  const [categories, setCategories] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [catForm, setCatForm] = useState({
    name: "",
    description: "",
    level: "main",
    parent: "",
  });
  const [catLoading, setCatLoading] = useState(false);
  const [catMessage, setCatMessage] = useState(null);

  const [selectedMainCatFilter, setSelectedMainCatFilter] = useState(""); // فلتر التصنيف الرئيسي للمنتجات
  const [prodForm, setProdForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [prodLoading, setProdLoading] = useState(false);
  const [prodMessage, setProdMessage] = useState(null);

  const fetchCategories = async () => {
    try {
      setIsLoadingData(true);
      const res = await api.get("/category");

      let fetchedData = res.data?.data || res.data;
      if (!Array.isArray(fetchedData)) {
        fetchedData = [];
      }
      setCategories(fetchedData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const safeCategories = Array.isArray(categories) ? categories : [];
  const mainCategories = safeCategories.filter((c) => c.level === "main");
  const subCategories = safeCategories.filter((c) => c.level === "sub");

  const filteredSubCategories = selectedMainCatFilter
    ? subCategories.filter(
        (c) =>
          c.parent === selectedMainCatFilter ||
          c.parent?._id === selectedMainCatFilter ||
          c.parent?.id === selectedMainCatFilter,
      )
    : subCategories;

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setCatLoading(true);
    setCatMessage(null);

    try {
      const payload = {
        name: catForm.name,
        description: catForm.description,
        level: catForm.level,
      };

      if (catForm.level === "sub") {
        if (!catForm.parent) throw new Error("Please select a parent category");
        payload.parent = catForm.parent;
      }

      await api.post("/category", payload);
      setCatMessage({ type: "success", text: "Category added successfully!" });

      setCatForm({ ...catForm, name: "", description: "" });
      fetchCategories();

      setTimeout(() => setCatMessage(null), 3000);
    } catch (error) {
      setCatMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to add category",
      });
    } finally {
      setCatLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setProdLoading(true);
    setProdMessage(null);

    try {
      if (!imageFile) throw new Error("Please select a product image");
      if (!prodForm.categoryId) throw new Error("Please select a subcategory");

      const prodRes = await api.post("/products", {
        name: prodForm.name,
        description: prodForm.description,
        price: Number(prodForm.price),
        categoryId: prodForm.categoryId,
      });

      const newProduct =
        prodRes.data?.data || prodRes.data?.product || prodRes.data;
      const productId = newProduct?._id || newProduct?.id;

      if (!productId) throw new Error("Product created but ID not returned");

      const formData = new FormData();
      formData.append("image", imageFile);

      await api.post(`/products/${productId}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProdMessage({
        type: "success",
        text: "Product and image added successfully!",
      });

      setProdForm({ name: "", description: "", price: "", categoryId: "" });
      setSelectedMainCatFilter("");
      setImageFile(null);
      if (document.getElementById("imageInput")) {
        document.getElementById("imageInput").value = "";
      }

      setTimeout(() => setProdMessage(null), 3000);
    } catch (error) {
      setProdMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to add product",
      });
    } finally {
      setProdLoading(false);
    }
  };

  const inputStyles =
    "w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200";
  const labelStyles = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
            <FolderPlus className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Quick Add Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your store's categories and products smoothly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2 border-b pb-4">
              <Layers className="text-blue-500" size={24} />
              Step 1: Categories
            </h2>

            {catMessage && (
              <div
                className={`p-4 rounded-lg mb-6 flex items-start gap-3 ${catMessage.type === "success" ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
              >
                {catMessage.type === "success" ? (
                  <CheckCircle2 className="shrink-0 mt-0.5" size={20} />
                ) : (
                  <AlertCircle className="shrink-0 mt-0.5" size={20} />
                )}
                <p className="text-sm font-medium">{catMessage.text}</p>
              </div>
            )}

            <form onSubmit={handleCategorySubmit} className="space-y-5">
              <div>
                <label className={labelStyles}>1. Select Category Level</label>
                <select
                  className={inputStyles}
                  value={catForm.level}
                  onChange={(e) =>
                    setCatForm({
                      ...catForm,
                      level: e.target.value,
                      parent: "",
                    })
                  }
                >
                  <option value="main">
                    Main Category (e.g., Electronics)
                  </option>
                  <option value="sub">Sub Category (e.g., Phones)</option>
                </select>
              </div>

              {catForm.level === "sub" && (
                <div className="animate-in fade-in duration-300">
                  <label className={labelStyles}>
                    Select Parent (Main Category)
                  </label>
                  <select
                    required
                    className={inputStyles}
                    value={catForm.parent}
                    onChange={(e) =>
                      setCatForm({ ...catForm, parent: e.target.value })
                    }
                    disabled={isLoadingData || mainCategories.length === 0}
                  >
                    <option value="">-- Choose Main Category --</option>
                    {mainCategories.map((c) => (
                      <option key={c._id || c.id} value={c._id || c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {mainCategories.length === 0 && !isLoadingData && (
                    <p className="text-xs text-red-500 mt-1">
                      Please create a Main Category first.
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className={labelStyles}>Category Name</label>
                <input
                  type="text"
                  required
                  placeholder={
                    catForm.level === "main"
                      ? "e.g., Electronics"
                      : "e.g., Smart Phones"
                  }
                  className={inputStyles}
                  value={catForm.name}
                  onChange={(e) =>
                    setCatForm({ ...catForm, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className={labelStyles}>Description</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Brief description..."
                  className={`${inputStyles} resize-none`}
                  value={catForm.description}
                  onChange={(e) =>
                    setCatForm({ ...catForm, description: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={catLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {catLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <FolderPlus size={20} />
                )}
                {catLoading ? "Saving..." : "Save Category"}
              </button>
            </form>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2 border-b pb-4">
              <Package className="text-orange-500" size={24} />
              Step 2: Add Product
            </h2>

            {prodMessage && (
              <div
                className={`p-4 rounded-lg mb-6 flex items-start gap-3 ${prodMessage.type === "success" ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
              >
                {prodMessage.type === "success" ? (
                  <CheckCircle2 className="shrink-0 mt-0.5" size={20} />
                ) : (
                  <AlertCircle className="shrink-0 mt-0.5" size={20} />
                )}
                <p className="text-sm font-medium">{prodMessage.text}</p>
              </div>
            )}

            <form onSubmit={handleProductSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                <div>
                  <label className={labelStyles}>
                    1. Filter by Main Category
                  </label>
                  <select
                    className={inputStyles.replace(
                      "focus:ring-blue-500",
                      "focus:ring-orange-500",
                    )}
                    value={selectedMainCatFilter}
                    onChange={(e) => {
                      setSelectedMainCatFilter(e.target.value);
                      setProdForm({ ...prodForm, categoryId: "" }); // تفريغ الفرعي لما نغير الرئيسي
                    }}
                  >
                    <option value="">All Main Categories</option>
                    {mainCategories.map((c) => (
                      <option key={c._id || c.id} value={c._id || c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelStyles}>
                    2. Select Sub Category{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className={inputStyles.replace(
                      "focus:ring-blue-500",
                      "focus:ring-orange-500",
                    )}
                    value={prodForm.categoryId}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, categoryId: e.target.value })
                    }
                    disabled={filteredSubCategories.length === 0}
                  >
                    <option value="">-- Choose Subcategory --</option>
                    {filteredSubCategories.map((c) => (
                      <option key={c._id || c.id} value={c._id || c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {filteredSubCategories.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">
                      No subcategories found here.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelStyles}>Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. iPhone 15 Pro"
                    className={inputStyles.replace(
                      "focus:ring-blue-500",
                      "focus:ring-orange-500",
                    )}
                    value={prodForm.name}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className={labelStyles}>Price ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className={`${inputStyles.replace("focus:ring-blue-500", "focus:ring-orange-500")} pl-10`}
                      value={prodForm.price}
                      onChange={(e) =>
                        setProdForm({ ...prodForm, price: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelStyles}>Description</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Detailed product description..."
                  className={`${inputStyles.replace("focus:ring-blue-500", "focus:ring-orange-500")} resize-none`}
                  value={prodForm.description}
                  onChange={(e) =>
                    setProdForm({ ...prodForm, description: e.target.value })
                  }
                ></textarea>
              </div>

              <div>
                <label className={labelStyles}>Product Image</label>
                <div className="mt-1">
                  <label
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 ${imageFile ? "border-orange-400 bg-orange-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400"}`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                      {imageFile ? (
                        <>
                          <ImagePlus className="w-10 h-10 mb-3 text-orange-500" />
                          <p className="text-sm font-semibold text-orange-600 truncate max-w-[200px] md:max-w-xs">
                            {imageFile.name}
                          </p>
                          <p className="text-xs text-orange-400 mt-1">
                            Click to change image
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-600">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG or WEBP
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="imageInput"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      required
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={prodLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {prodLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Package size={20} />
                )}
                {prodLoading ? "Processing..." : "Save Product & Upload"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
