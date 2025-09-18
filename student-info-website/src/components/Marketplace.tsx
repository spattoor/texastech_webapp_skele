import React, { useState } from 'react';

export interface MarketplaceItem {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  image?: string;
  contact: string;
}

const initialItems: MarketplaceItem[] = [
  {
    id: 1,
    title: 'CS 2365 Textbook',
    description: 'Clean copy, used for one semester.',
    price: '$40',
    category: 'Textbooks',
    image: '',
    contact: 'saiabhinav@ttu.edu',
  },
  {
    id: 2,
    title: 'Bike - Schwinn',
    description: 'Good condition, includes lock.',
    price: '$120',
    category: 'Bikes',
    image: '',
    contact: 'vishwa@ttu.edu',
  },
];

const categories = ['Textbooks', 'Bikes', 'Furniture', 'Electronics', 'Other'];

const Marketplace: React.FC = () => {
  const [items, setItems] = useState<MarketplaceItem[]>(initialItems);
  const [form, setForm] = useState<Partial<MarketplaceItem>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm({ ...form, image: ev.target?.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category || !form.contact) return;
    if (editingId !== null) {
      setItems(items.map(item => item.id === editingId ? { ...item, ...form, id: editingId } as MarketplaceItem : item));
      setEditingId(null);
    } else {
      setItems([...items, { ...form, id: Date.now() } as MarketplaceItem]);
    }
    setForm({});
  };

  const handleEdit = (id: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setForm(item);
      setEditingId(id);
    }
  };

  const handleDelete = (id: number) => {
    setItems(items.filter(i => i.id !== id));
    if (editingId === id) {
      setForm({});
      setEditingId(null);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ color: '#CC0000', textAlign: 'center', marginBottom: 16 }}>Marketplace</h2>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 24 }}>
        <input name="title" value={form.title || ''} onChange={handleChange} placeholder="Item Title" style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 6, border: '1px solid #CC0000' }} />
        <textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 6, border: '1px solid #CC0000' }} />
        <input name="price" value={form.price || ''} onChange={handleChange} placeholder="Price" style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 6, border: '1px solid #CC0000' }} />
        <select name="category" value={form.category || ''} onChange={handleChange} style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 6, border: '1px solid #CC0000' }}>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input name="contact" value={form.contact || ''} onChange={handleChange} placeholder="Contact Email" style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 6, border: '1px solid #CC0000' }} />
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: 8 }} />
        <button type="submit" style={{ background: '#CC0000', color: 'white', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>{editingId !== null ? 'Update Listing' : 'Add Listing'}</button>
      </form>
      <div>
        {items.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#555' }}>No items listed yet.</p>
        ) : (
          items.map(item => (
            <div key={item.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 20, marginBottom: 16, display: 'flex', gap: 16 }}>
              {item.image && <img src={item.image} alt={item.title} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }} />}
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#CC0000', marginBottom: 4 }}>{item.title}</h3>
                <div style={{ color: '#555', marginBottom: 4 }}>{item.description}</div>
                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.price}</div>
                <div style={{ color: '#555', marginBottom: 4 }}>Category: {item.category}</div>
                <div style={{ color: '#555', marginBottom: 4 }}>Contact: <a href={`mailto:${item.contact}`} style={{ color: '#CC0000', textDecoration: 'underline' }}>{item.contact}</a></div>
                <button onClick={() => handleEdit(item.id)} style={{ background: '#CC0000', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 'bold', cursor: 'pointer', marginRight: 8 }}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ background: '#fff', color: '#CC0000', border: '1px solid #CC0000', borderRadius: 6, padding: '6px 14px', fontWeight: 'bold', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Marketplace;
