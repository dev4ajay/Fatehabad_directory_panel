import React , { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { BaseUrl } from "../../BaseUrl";
function YourComponent() {
  const [categories, setCategories] = useState([]);
  const [category, setcategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCategories, setTotalItems] = useState(1);
  const [totalpage ,setTotalPage] = useState("")
  const [pageLimit, setPageLimit] = useState(10);
  async function fetchData() {
    try {
      const response = await fetch(`${BaseUrl}/categories?page=${currentPage}&limit=${pageLimit}`);
      const data = await response.json();
      setCategories(data.categories);
      setTotalItems(data.totalCategories);
      console.log(data);
      setTotalPage(data.totalPages)
      
 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData(currentPage ,pageLimit);
  }, [currentPage ,pageLimit]);
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [editedCategory, setEditedCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const handleEditClose = () => setEditShow(false);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleEditShow = (id) => {
    setEditShow(true); 
    setCategoryId(id._id);
    setEditedCategory(id.name);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = category;
    const data = { name };

    try {
      const response = await axios.post(
        `${BaseUrl}/categories`,
        data
      );
      console.log(response);
      if (response.status === 201) {
        toast.success("Category Create Successfully.");
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
        `${BaseUrl}/categories/${categoryId}`
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Category Deleted Successfully");
        fetchData();
      } else {
        console.error("Delete request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `${BaseUrl}/categories/${categoryId}`,
        {
          name: editedCategory,
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Category Updated Successfully.");
        handleEditClose();
        fetchData();
      }
    } catch (error) {
      console.error("Error editing category:", error);
      // Handle network errors or other issues related to the request
    }
  };
  return (
    <section>
      {" "}
      <div className="container mt-4 ">

        <div className="d-flex align-items-center justify-content-space-between">
        <div className="d-flex  mt-3 mb-2 ms-4 me-4 gap-2">
          <div>Show</div>
          <div>
            <select
              id="cars"
              name="cars"
              value={pageLimit}
              onChange={(e) => setPageLimit(e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
          </div>
          <div>entries</div>
        </div>
          <div>
            <h3 className="mb-4">Category</h3>
          </div>
          <div>
            <button onClick={handleShow} className="btn btn-success">
              Add Category
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th style={{ width: "40%" }}>Action</th>
              {/* Add more table headers if needed */}
            </tr>
          </thead>
          <tbody>
          {categories.length === 0 ? (
              <p className="ms-3 mt-3">No Data Found !</p>
            ) : (
            categories.map((category, index) => (
              <tr key={category.id}>
                <td> {(currentPage -1)*pageLimit + index + 1 }</td>
                <td>{category.name}</td>
              
                <td>

                  <button
                    className="btn btn-danger me-3 mt-4 mb-3"
                    onClick={() => handleDelete(category._id)}
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    className="btn btn-primary me-3 mt-4 mb-3"
                    onClick={() => handleEditShow(category)}
                  >
                    <EditIcon  />
                  </button>
                  <Link
                    to={`/sub-Category-list/${category._id}`}
                    className="btn btn-dark me-3 mt-4 mb-3"
                  >
                    Sub-Category
                  </Link>
                </td>
                {/* Add more table cells based on your data */}
              </tr>
             ))
            )}
          </tbody>
        </table>
        <div className="mt-3 mb-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="ms-0"style={{border:'none' ,borderRadius:'5%' ,width:'150px' ,height:'40px'  ,boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        >
          Previous
        </button>
        <span className="ms-2">Page {currentPage} of {totalCategories}</span>
        <button className=" ms-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalpage}
          style={{border:'none' ,borderRadius:'5%' ,width:'150px' ,height:'40px'  ,boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
        >
          Next
        </button>
      </div>
        <div></div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="col-md-8">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Your Category Name"
                  id="name"
                  onChange={(e) => setcategory(e.target.value)}
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
      <Modal show={editShow}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="col-md-8">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Your Category Name"
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-success" onClick={handleEdit}>
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

export default YourComponent;
