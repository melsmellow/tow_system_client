"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import {
  Button,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import ModalForm from "./modalContent";

function page() {
  let modalType = localStorage.getItem("modalType");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const fetchData = () => {
    // api call to get the data
    axios.get("http://localhost:5000/get").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = () => {
    let dataToPass = JSON.parse(localStorage.getItem("itemToAdd"));
    let id = JSON.parse(localStorage.getItem("itemToEdit"));

    if (modalType === "edit") {
      axios
        .put(`http://localhost:5000/${id._id}/update`, dataToPass)
        .then((res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Data has been updated!",
          });
          window.location.reload();
        });
    } else {
      // add a logic for add
      axios.post("http://localhost:5000/create", dataToPass).then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Data has been added!",
        });
        window.location.reload();
      });
    }
  };

  const handleSearch = () => {
    console.log("search button trigger");
    const cloneData = structuredClone(data);
    const result = [];

    // loop the array of data
    data.map((item, idx) => {
      for (const key in data[idx]) {
        if (
          item[key].toString().toLowerCase().includes(searchInput.toLowerCase())
        ) {
          result.push(cloneData[idx]);
        }
      }
    });
    setData(result);
  };

  const handleAddClick = () => {
    localStorage.setItem("modalType", "add");
    onOpen();
  };
  // edit function
  const handleEditClick = (e, item) => {
    e.preventDefault();
    let itemToEdit = JSON.stringify(item);
    localStorage.setItem("itemToEdit", itemToEdit);
    localStorage.setItem("modalType", "edit");
    onOpen();
  };

  const handleDeleteClick = (e, id) => {
    e.preventDefault();
    // insert api call here
    Swal.fire({
      title: "Are you sure you want to delete this?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/${id}/delete`).then((res) => {
          Swal.fire("Deleted successfully!", "", "success");
        });
        window.location.reload();
      }
    });
  };
  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
      }}
    >
      <div style={{ marginTop: "2rem" }}>
        <div style={{ position: "absolute", right: "50px" }}>
          <Flex gap={3}>
            <Input
              size="sm"
              type="text"
              width="250px"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <IconButton icon={<AddIcon />} onClick={handleAddClick} />
            <IconButton onClick={handleSearch} icon={<SearchIcon />} />
          </Flex>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          width: "90vw",
          transform: "translate(-50%, -10%)",
          maxHeight: "50vh",
          overflow: "hidden",
        }}
      >
        <table id="table-data">
          <thead>
            <tr>
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>Color</th>
              <th>VIN</th>
              <th>License No</th>
              <th>License state</th>
              <th>Tow Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.year}</td>
                  <td>{item.make}</td>
                  <td>{item.model}</td>
                  <td>{item.color}</td>
                  <td>{item.vin}</td>
                  <td>{item.licenseNo}</td>
                  <td>{item.licenseState}</td>
                  <td>{item.towDate.toString()}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <IconButton
                        onClick={(e) => handleEditClick(e, item)}
                        colorScheme="green"
                        aria-label="Edit"
                        fontSize={"15px"}
                        size="sm"
                        icon={<EditIcon />}
                      />
                      <IconButton
                        colorScheme="red"
                        aria-label="Delete"
                        fontSize={"15px"}
                        size="sm"
                        onClick={(e) => handleDeleteClick(e, item._id)}
                        icon={<DeleteIcon />}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalType === "edit" ? "Edit Data" : "Add Data"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalForm />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default page;
