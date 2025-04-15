import React, { useState } from 'react';
import './QuotationGenerator.css';

const QuotationGenerator = () => {
  const [clientInfo, setClientInfo] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: ''
  });

  const [projectInfo, setProjectInfo] = useState({
    title: '',
    description: '',
    startDate: '',
    duration: '',
    location: ''
  });

  const [items, setItems] = useState([
    { id: 1, description: 'Labor costs', quantity: 1, unitPrice: 0, amount: 0 },
    { id: 2, description: 'Material costs', quantity: 1, unitPrice: 0, amount: 0 }
  ]);

  const [taxRate, setTaxRate] = useState(5);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const addNewItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    setItems([...items, { id: newId, description: '', quantity: 1, unitPrice: 0, amount: 0 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() - discount;
  };

  const generateQuotation = () => {
    // In a real app, this would save to database and generate PDF
    const quotationData = {
      clientInfo,
      projectInfo,
      items,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      discount,
      total: calculateTotal(),
      notes,
      date: new Date().toLocaleDateString()
    };
    
    console.log('Quotation generated:', quotationData);
    alert('Quotation generated successfully!');
  };

  return (
    <div className="quotation-generator">
      <h2>Quotation Generator</h2>
      
      <div className="form-section">
        <h3>Client Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Client Name</label>
            <input type="text" name="name" value={clientInfo.name} onChange={handleClientChange} />
          </div>
          <div className="form-group">
            <label>Company</label>
            <input type="text" name="company" value={clientInfo.company} onChange={handleClientChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={clientInfo.email} onChange={handleClientChange} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" value={clientInfo.phone} onChange={handleClientChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea name="address" value={clientInfo.address} onChange={handleClientChange}></textarea>
        </div>
      </div>

      <div className="form-section">
        <h3>Project Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Project Title</label>
            <input type="text" name="title" value={projectInfo.title} onChange={handleProjectChange} />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input type="date" name="startDate" value={projectInfo.startDate} onChange={handleProjectChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Duration (days)</label>
            <input type="number" name="duration" value={projectInfo.duration} onChange={handleProjectChange} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={projectInfo.location} onChange={handleProjectChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Project Description</label>
          <textarea name="description" value={projectInfo.description} onChange={handleProjectChange}></textarea>
        </div>
      </div>

      <div className="form-section">
        <h3>Quotation Items</h3>
        <table className="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price (SAR)</th>
              <th>Amount (SAR)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  <input 
                    type="text" 
                    value={item.description} 
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} 
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value))} 
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    value={item.unitPrice} 
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value))} 
                  />
                </td>
                <td>{item.amount.toFixed(2)}</td>
                <td>
                  <button onClick={() => removeItem(item.id)} className="remove-btn">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addNewItem} className="add-item-btn">
          <i className="fas fa-plus"></i> Add Item
        </button>
      </div>

      <div className="form-section totals-section">
        <div className="form-row">
          <div className="form-group">
            <label>Tax Rate (%)</label>
            <input 
              type="number" 
              value={taxRate} 
              onChange={(e) => setTaxRate(parseFloat(e.target.value))} 
            />
          </div>
          <div className="form-group">
            <label>Discount (SAR)</label>
            <input 
              type="number" 
              value={discount} 
              onChange={(e) => setDiscount(parseFloat(e.target.value))} 
            />
          </div>
        </div>
        
        <div className="totals-display">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>{calculateSubtotal().toFixed(2)} SAR</span>
          </div>
          <div className="total-row">
            <span>Tax ({taxRate}%):</span>
            <span>{calculateTax().toFixed(2)} SAR</span>
          </div>
          <div className="total-row">
            <span>Discount:</span>
            <span>-{discount.toFixed(2)} SAR</span>
          </div>
          <div className="total-row grand-total">
            <span>Total:</span>
            <span>{calculateTotal().toFixed(2)} SAR</span>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Additional Notes</h3>
        <textarea 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
          placeholder="Terms and conditions, payment details, etc."
        ></textarea>
      </div>

      <div className="action-buttons">
        <button onClick={generateQuotation} className="generate-btn">
          Generate Quotation
        </button>
        <button className="preview-btn">
          Preview PDF
        </button>
        <button className="save-draft-btn">
          Save Draft
        </button>
      </div>
    </div>
  );
};

export default QuotationGenerator;