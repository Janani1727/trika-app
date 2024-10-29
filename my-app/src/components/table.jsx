import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  async function Products() {
    try {
      let res = await axios.get("https://dummyjson.com/products");
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
  }

  function filterData(searchData) {
    if (searchData === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((prod) =>
        prod.title.toLowerCase().includes(searchData.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }

  useEffect(() => {
    filterData(searchData);
    setCurrentPage(1);  
  }, [searchData, data]);

  function handleCheck(id) {
    setCheckedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  function deleteAll() {
    const remainingItems = filteredData.filter(
      (item) => !checkedItems.includes(item.id)
    );
    setFilteredData(remainingItems);
    setCheckedItems([]); 
  }

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / limit);
  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextTwoPages = () => {
    if (currentPage + 2 <= totalPages) setCurrentPage(currentPage + 2);
  };

  const prevTwoPages = () => {
    if (currentPage - 2 >= 1) setCurrentPage(currentPage - 2);
  };

  return (
    <div>
    <h2>Trika Technologies</h2>
      <input
        onChange={(e) => search(e.target.value)}
        value={searchData}
        type="text"
        placeholder="search products..."
      />
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const allChecked = isChecked
                    ? filteredData.map((item) => item.id)
                    : [];
                  setCheckedItems(allChecked);
                }}
              />
            </th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr
              key={item.id}
              style={{
                backgroundColor: checkedItems.includes(item.id)
                  ? "lightgray"
                  : "white",
              }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item.id)}
                  onChange={() => handleCheck(item.id)}
                />
              </td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>₹ {item.price}</td>
              <td>{item.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex">
        <div>
          <button className="select" onClick={deleteAll}>
            Delete Selected
          </button>
        </div>

        <div className="pagination">
          <button onClick={prevTwoPages} disabled={currentPage <= 2}>
            ««
          </button>
          <button onClick={prevPage} disabled={currentPage === 1}>
            «
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            »
          </button>
          <button
            onClick={nextTwoPages}
            disabled={currentPage >= totalPages - 1}
          >
            »»
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
