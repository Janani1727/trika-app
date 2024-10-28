// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./table.css";

// const Table = () => {
//   const [data, setData] = useState([]);
//   const [searchData, setSearchData] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [checked, setChecked] = useState([]);

//   async function Products() {
//     try {
//       let res = await axios.get("https://dummyjson.com/products");
//       // console.log(res.data.products);
//       setData(res.data.products);
//       setFilteredData(res.data.products);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     Products();
//   }, []);

//   function search(e) {
//     setSearchData(e);
//     // console.log(e);
//   }

//   function filterData(searchData) {
//     if (searchData === "") {
//       setFilteredData(data);
//     } else {
//       setTimeout(() => {
//         const filtered = data.filter((prod) =>
//           prod.title.toLowerCase().includes(searchData.toLowerCase())
//         );
//         setFilteredData(filtered);
//       }, 2000);
//     }
//   }

//   useEffect(() => {
//     filterData(searchData);
//   }, [searchData, data]);

//   function check() {
//     checked.push(data);
//   }

//   function deleteAll(){
//      console.log("del")
//   }
  

//   return (
//     <div>
//       <button onClick={deleteAll}>delete</button>
//       <input
//         onChange={(e) => search(e.target.value)}
//         value={searchData}
//         type="text"
//         placeholder="search products..."
//       />
//       <table>
//         <tr>
//           <th>
//             <input onClick={() => check()} type="checkbox" name="" id="" />
//           </th>
//           <th>Title</th>
//           <th>Description</th>
//           <th>Price</th>
//           <th>Brand</th>
//         </tr>

//         {filteredData.map((item) => {
//           return (
//             <tr key={item.id}>
//               <td>
//                 <input type="checkbox" name="" id="" />
//               </td>
//               <td>{item.title}</td>
//               <td>{item.description}</td>
//               <td>₹ {item.price}</td>
//               <td>{item.brand}</td>
//             </tr>
//           );
//         })}
//       </table>
//     </div>
//   );
// };

// export default Table;



import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]); 

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
   
    const remainingItems = filteredData.filter(item => !checkedItems.includes(item.id));
    setFilteredData(remainingItems);
    setCheckedItems([]);
  }

  return (
    <div>
      <button onClick={deleteAll}>Delete Selected</button>
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
                  const allChecked = isChecked ? filteredData.map(item => item.id) : [];
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
          {filteredData.map((item) => (
            <tr key={item.id}>
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
    </div>
  );
};

export default Table;
