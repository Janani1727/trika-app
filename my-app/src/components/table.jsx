import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState([]);


  async function Products() {
    try {
      let res = await axios.get("https://dummyjson.com/products");
      console.log(res.data.products);
      setData(res.data.products);
      setFilteredData(res.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Products();
  }, []);

  function search(e) {
    setSearchData(e);
    // console.log(e);
  }

  function filterData(searchData) {
    if (searchData === "") {
      setFilteredData(data);
    } else {
        setTimeout(()=>{
            const filtered = data.filter((prod) =>
                prod.title.toLowerCase()
               .includes(searchData.toLowerCase())
              );
              setFilteredData(filtered);
        },2000)
      
    }
  }

  useEffect(() => {
    filterData(searchData);
  }, [searchData, data]);


 

  return (
    <div>
      <input
        onChange={(e) => search(e.target.value)}
        value={searchData}
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

        {filteredData.map((item) => {
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

