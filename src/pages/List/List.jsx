import React from 'react';
import "./List.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = React.useState([]);

  const deleteItem = async (id) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { foodId: id });
      if (response.data.success) {
        toast.success(response.data.message);
        // Refresh list after deletion
        fetchList();
      } else {
        toast.error("Error deleting item");
      }
    } catch (error) {
      toast.error("Server error while deleting item");
      console.error(error);
    }
  };

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Server error while fetching list");
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchList();
  }, [url]);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div className="list-table-format" key={item._id}>
            <img src={url + item.imageUrl} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <button onClick={() => deleteItem(item._id)} className='delete'>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;




