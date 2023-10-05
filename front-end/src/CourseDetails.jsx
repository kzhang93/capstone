import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CartContext } from './CartContext';

const CourseDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const history = useHistory();
  const { id } = useParams();

  const handleAddToCart = () => {
    addToCart({ courseId: id, quantity });
    history.push('/cart');
  };

  return (
    <div>
      {/* ...课程详细信息... */}
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      </label>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default CourseDetails;
