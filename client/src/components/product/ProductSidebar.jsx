import { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

import "../styles/product/ProductSidebar.css";

const categories = [
  "All Products",
  "Clothing",
  "Hoodie",
  "Jersey",
  "Mug",
  "Bottle",
  "Accessory",
];

const prices = [
  "All Prices",
  "Under ₹500",
  "₹500 - ₹1000",
  "₹1000 - ₹2000",
  "Above ₹2000",
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const colors = [
  "#111827",
  "#ffffff",
  "#2563EB",
  "#EF4444",
  "#16A34A",
];

function ProductSidebar({
  category,
  setCategory,
  priceRange,
  setPriceRange,
  clearFilters,
}) {

  const [open,setOpen]=useState("category");

  return (

    <aside className="product-sidebar">

      <div className="sidebar-card">

        <div className="sidebar-top">

          <h3>Filters</h3>

          <button
            onClick={clearFilters}
            className="clear-btn"
          >
            Clear
          </button>

        </div>

        {/* Category */}

        <div className="sidebar-item">

          <button
            className="sidebar-title"
            onClick={()=>setOpen(open==="category"?"":"category")}
          >

            Categories

            {
              open==="category"
              ?<FiChevronUp/>
              :<FiChevronDown/>
            }

          </button>

          {
            open==="category"&&(

              <div className="sidebar-content">

                {
                  categories.map((cat)=>{

                    const value=
                      cat==="All Products"
                      ?""
                      :cat;

                    return(

                      <button
                        key={cat}
                        className={
                          category===value
                          ?"filter-chip active"
                          :"filter-chip"
                        }
                        onClick={()=>setCategory(value)}
                      >
                        {cat}
                      </button>

                    );

                  })
                }

              </div>

            )
          }

        </div>

        {/* Price */}

        <div className="sidebar-item">

          <button
            className="sidebar-title"
            onClick={()=>setOpen(open==="price"?"":"price")}
          >

            Price

            {
              open==="price"
              ?<FiChevronUp/>
              :<FiChevronDown/>
            }

          </button>

          {
            open==="price"&&(

              <div className="sidebar-content">

                <button
                  className={priceRange===""?"filter-chip active":"filter-chip"}
                  onClick={()=>setPriceRange("")}
                >
                  All Prices
                </button>

                <button
                  className={priceRange==="under500"?"filter-chip active":"filter-chip"}
                  onClick={()=>setPriceRange("under500")}
                >
                  Under ₹500
                </button>

                <button
                  className={priceRange==="500to1000"?"filter-chip active":"filter-chip"}
                  onClick={()=>setPriceRange("500to1000")}
                >
                  ₹500 - ₹1000
                </button>

                <button
                  className={priceRange==="1000to2000"?"filter-chip active":"filter-chip"}
                  onClick={()=>setPriceRange("1000to2000")}
                >
                  ₹1000 - ₹2000
                </button>

                <button
                  className={priceRange==="above2000"?"filter-chip active":"filter-chip"}
                  onClick={()=>setPriceRange("above2000")}
                >
                  Above ₹2000
                </button>

              </div>

            )
          }

        </div>

        {/* Size */}

        <div className="sidebar-item">

          <button
            className="sidebar-title"
            onClick={()=>setOpen(open==="size"?"":"size")}
          >

            Size

            {
              open==="size"
              ?<FiChevronUp/>
              :<FiChevronDown/>
            }

          </button>

          {
            open==="size"&&(

              <div className="size-grid">

                {
                  sizes.map(size=>(

                    <button
                      key={size}
                      className="size-chip"
                    >
                      {size}
                    </button>

                  ))
                }

              </div>

            )
          }

        </div>

        {/* Color */}

        <div className="sidebar-item">

          <button
            className="sidebar-title"
            onClick={()=>setOpen(open==="color"?"":"color")}
          >

            Colors

            {
              open==="color"
              ?<FiChevronUp/>
              :<FiChevronDown/>
            }

          </button>

          {
            open==="color"&&(

              <div className="color-grid">

                {
                  colors.map(color=>(

                    <span
                      key={color}
                      className="color-circle"
                      style={{background:color}}
                    />

                  ))
                }

              </div>

            )
          }

        </div>

      </div>

    </aside>

  );

}

export default ProductSidebar;