import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
 

  async function Products() {
    try {
      let res = await axios.get("https://dummyjson.com/products");
      console.log(res.data.products);
      setData(res.data.products);
    
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Products();
  }, []);

  

  return (
    <div>
      <input
        type="text"
        placeholder="search products..."
      />
      <table>
        <tr>
         
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Brand</th>
        </tr>

        {data.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>₹ {item.price}</td>
              <td>{item.brand}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
