import { useState } from 'react';

function App() {
  // Initial list of products
  const initialProducts = [
    {
      id: 101,
      name: 'Mechanical Gaming Keyboard',
      category: 'Electronics',
      price: 3499,
      stock: 18,
      lastUpdated: '10:00 AM',
    },
    {
      id: 102,
      name: 'Wireless Ergonomic Vertical Mouse',
      category: 'Accessories',
      price: 1899,
      stock: 25,
      lastUpdated: '10:15 AM',
    },
    {
      id: 103,
      name: '24-Inch IPS Full HD Monitor',
      category: 'Electronics',
      price: 11499,
      stock: 12,
      lastUpdated: '10:30 AM',
    },
    {
      id: 104,
      name: 'Noise Cancelling Over-Ear Headphones',
      category: 'Audio',
      price: 5999,
      stock: 8,
      lastUpdated: '10:45 AM',
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [notification, setNotification] = useState('');

  // Form state for editing
  const [editForm, setEditForm] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
  });

  // STEP 1: Select product for editing
  const handleSelectProduct = (product) => {
    setSelectedProductId(product.id);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
    setNotification(`Selected "${product.name}" for editing.`);
  };

  // STEP 2: Handle input changes in edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // STEP 3: UPDATE OPERATION - Mutate array immutably using .map()
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    if (!editForm.name.trim() || !editForm.price || !editForm.stock) {
      alert('Please fill out all fields.');
      return;
    }

    const updatedList = products.map((prod) => {
      if (prod.id === selectedProductId) {
        return {
          ...prod,
          name: editForm.name.trim(),
          category: editForm.category,
          price: Number(editForm.price),
          stock: Number(editForm.stock),
          lastUpdated: new Date().toLocaleTimeString(),
          isRecentlyUpdated: true,
        };
      }
      return prod;
    });

    setProducts(updatedList);
    setNotification(`Product "${editForm.name}" updated successfully!`);
    setSelectedProductId(null); // Clear selection

    setTimeout(() => {
      setNotification('');
    }, 4000);
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setSelectedProductId(null);
    setEditForm({ name: '', category: 'Electronics', price: '', stock: '' });
    setNotification('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-slate-800">
              ProductAdmin<span className="text-amber-700">.</span>
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
              U5-PRAC 3
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">
            CRUD: Update Operation
          </span>
        </div>
      </header>

      {/* Lab Banner */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-600 gap-1">
          <div>
            <span className="font-semibold text-slate-800">Practical 8 (Unit 5 Prac 3):</span> Product Management (Select & Update Operation)
          </div>
          <div className="text-amber-800 font-medium">
            ● Unit 5 – CRUD Operations
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Notification Alert */}
        {notification && (
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg flex justify-between items-center">
            <span>ℹ {notification}</span>
            <button onClick={() => setNotification('')} className="font-bold hover:underline">
              ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Edit Form Panel */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded border ${
                selectedProductId
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {selectedProductId ? `Editing Product #${selectedProductId}` : 'No Product Selected'}
              </span>
              <h2 className="text-xl font-bold text-slate-800 mt-2">
                {selectedProductId ? 'Update Product Details' : 'Select a Product to Edit'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {selectedProductId
                  ? 'Modify values below and click "Save Changes" to update state.'
                  : 'Click the "Edit" button next to any product in the table to load its details.'}
              </p>
            </div>

            {selectedProductId ? (
              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Audio">Audio</option>
                    <option value="Office Supplies">Office Supplies</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      min="1"
                      value={editForm.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Stock Units <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      required
                      min="0"
                      value={editForm.stock}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 bg-amber-700 text-white rounded-md text-sm font-medium hover:bg-amber-800 transition shadow-xs"
                  >
                    ✓ Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="py-2 px-4 bg-slate-100 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-200 transition border border-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 border border-dashed border-slate-300 rounded-lg text-center text-xs text-slate-500">
                👈 Select an existing product from the table to begin editing.
              </div>
            )}
          </div>

          {/* Product Table */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">
                Products Inventory ({products.length})
              </h2>
              <span className="text-xs text-slate-500 font-mono">Action: Edit / Update</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="p-3 border-b border-slate-200">Product</th>
                    <th className="p-3 border-b border-slate-200">Category</th>
                    <th className="p-3 border-b border-slate-200">Price</th>
                    <th className="p-3 border-b border-slate-200">Stock</th>
                    <th className="p-3 border-b border-slate-200 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  {products.map((prod) => {
                    const isSelected = prod.id === selectedProductId;
                    return (
                      <tr
                        key={prod.id}
                        className={
                          isSelected
                            ? 'bg-amber-50/80 font-medium'
                            : prod.isRecentlyUpdated
                            ? 'bg-emerald-50/40'
                            : 'hover:bg-slate-50'
                        }
                      >
                        <td className="p-3">
                          <div className="font-semibold text-slate-800">{prod.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            ID: #{prod.id} • Updated: {prod.lastUpdated}
                          </div>
                        </td>
                        <td className="p-3">{prod.category}</td>
                        <td className="p-3 font-semibold text-slate-800">₹{prod.price.toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700">
                            {prod.stock} left
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleSelectProduct(prod)}
                            className={`px-3 py-1 rounded text-xs font-medium transition ${
                              isSelected
                                ? 'bg-amber-700 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                            }`}
                          >
                            {isSelected ? 'Editing' : 'Edit'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        React Practical 8 (Unit 5 Prac 3) | CRUD: Update Operation
      </footer>
    </div>
  );
}

export default App;
