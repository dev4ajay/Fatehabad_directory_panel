import React from 'react'
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "../../BaseUrl";
function Business() {

    const [businesses, setBusiness] = useState([]);
   

  async function fetchData() {
    try {
      const response = await fetch(`${BaseUrl}/businesses/allbusinesses`);
      const data = await response.json();
      console.log(data ,"<><><");
      setBusiness(data.businesses);
    
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section>
    {" "}
    <div className="container mt-4 ">
      <div className="d-flex align-items-center justify-content-space-between">
      
          <h3 className="mb-4">Business Lisitng</h3>
       
       
      </div>
     
      <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Details</th>

            </tr>
          </thead>
          <tbody>
           { businesses.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>
                    Name :- {category.Name}
                    <br />
                    Business Name :- {category.businessName}
                    <br />
                    Description :- {category.description}
                    <br />
                    Business Category :- {category.BusinessCategory}
                    <br />
                    Mobile :- {category.mobileNo}
                    <br />
                    Email :- {category.email} <br />
                    Website Url :- {category.websiteUrl} <br />
                    Whatsapp No :- {category.WhatsappNo}
                  </td>

               
                </tr>
              )
            )}
          </tbody>
        </table> 

    </div>
  
   
     
       
     
   
  </section>
  )
}

export default Business