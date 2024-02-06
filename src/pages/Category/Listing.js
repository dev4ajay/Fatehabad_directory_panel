import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { BaseUrl } from "../../BaseUrl";
function Listing() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  async function fetchData() {
    try {
      const response = await fetch(`${BaseUrl}/listings/${id}`);
      const data = await response.json();
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [editedCategory, setEditedCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = (id) => {
    setEditShow(true);
    setCategoryId(id._id);
    setEditedCategory(id.name);
    const selected = categories.find((listing) => listing._id === id._id);
    console.log(selected);
    if (selected) {
      setCategory(selected.name || "");
      setBusinessName(selected.businessName || "");
      setDescription(selected.description || "");
      setAddress(selected.address || "");
      setMobile(selected.mobile || "");
      setEmail(selected.email || "");
      setWebsiteUrl(selected.websiteUrl || "");
      setWhatsappNo(selected.whatsappNo || "");
      // ... set other fields
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${BaseUrl}/listings`, {
        name: category,
        businessName,
        description,
        address,
        mobile,
        email,
        websiteUrl,
        whatsappNo,
        SubCatgoriesId: id,
      });
      console.log(response);
      if (response.status === 201) {
        toast.success("Listing Create Successfully.");
        handleClose();
        fetchData();
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error:", error.message);
      }
    }
  };
  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(
        `${BaseUrl}/listings/${categoryId}`
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Listing Deleted Successfully");
        fetchData();
      } else {
        console.error("Delete request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const resposne = await axios.put(
        `${BaseUrl}/listings/${categoryId}`,
        {
          name: category,
          businessName,
          description,
          address,
          mobile,
          email,
          websiteUrl,
          whatsappNo,
          subCategoryId: id,
        }
      );
      console.log(resposne);
      if (resposne.status === 200) {
        toast.success("Listing Updated Successfully.");
        handleEditClose();
        fetchData();
      }
      // Handle success/update UI
    } catch (error) {
      console.error("Error updating listing:", error);
      // Handle errors
    }
  };
  return (
    <section>
      {" "}
     
        <div className="container mt-4  " style={{overflowX:'scroll'}}>
        <div className="d-flex align-items-center justify-content-space-between">
          <div>
            <h3 className="mb-4">Listing</h3>
          </div>
          <div>
            <button onClick={handleShow} className="btn btn-success">
            Add Listing
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Details</th>
              <th style={{ width: "40%" }}>Action</th>
           
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <p className="mt-3 ms-3">Not Listing Found</p>
            ) : (
              categories.map((category, index) => (
                    
                        <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>
                    Name :- {category.name}
                    <br />
                    Business Name :- {category.businessName}
                    <br />
                    Description :- {category.description}
                    <br />
                    Address :- {category.address}
                    <br />
                    Mobile :- {category.mobile}
                    <br />
                    Email :- {category.email} <br />
                    Website Url :- {category.websiteUrl} <br />
                    Whatsapp No :- {category.whatsappNo}
                  </td>

                  <td>
                    <button
                      className="btn btn-danger me-3 mb-3 mt-4"
                      onClick={() => handleDelete(category._id)}
                    >
                      <DeleteIcon />
                    </button>
                  
                    
                    <button
                      className="btn btn-primary me-3 mt-4 mb-3"
                      onClick={() => handleEditShow(category)}
                    >
                      <EditIcon />
                    </button>
                  </td>
                </tr>
               
              ))
            )}
          </tbody>
        </table>

        <div></div>
      </div>
      <Modal show={show} onHide={handleClose} className="listing">
        <Modal.Header closeButton>
          <Modal.Title>Create Lisitng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="col-md-12">
              <Form.Group
                className="mb-3 d-flex gap-3"
                controlId="categoryName"
              >
                <div className="w-50">
                  {" "}
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="w-50">
                  {" "}
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
              </Form.Group>

              {/* Business Name */}

              {/* Description */}
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 d-flex gap-3" controlId="address">
                <div className="w-50">
                  {" "}
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="w-50">
                  {" "}
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3 d-flex gap-3" controlId="email">
                <div className="w-50">
                  {" "}
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-50">
                  {" "}
                  <Form.Label>WhatsApp No.</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter WhatsApp No."
                    value={whatsappNo}
                    onChange={(e) => setWhatsappNo(e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="websiteUrl">
                <Form.Label>Website URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Website URL"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={editShow}  className="listing">
        <Modal.Header closeButton>
          <Modal.Title>Edit Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="col-md-12">
              <Form.Group
                className="mb-3 d-flex gap-3"
                controlId="categoryName"
              >
                <div className="w-50">
                  {" "}
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="w-50">
                  {" "}
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
              </Form.Group>

              {/* Business Name */}

              {/* Description */}
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"

                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 d-flex gap-3" controlId="address">
                <div className="w-50">
                  {" "}
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="w-50">
                  {" "}
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3 d-flex gap-3" controlId="email">
                <div className="w-50">
                  {" "}
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-50">
                  {" "}
                  <Form.Label>WhatsApp No.</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter WhatsApp No."
                    value={whatsappNo}
                    onChange={(e) => setWhatsappNo(e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="websiteUrl">
                <Form.Label>Website URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Website URL"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-success" onClick={handleUpdate}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default Listing;
