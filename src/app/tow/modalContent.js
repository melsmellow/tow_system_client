import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function ModalForm() {
  const modalType = localStorage.getItem("modalType");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("itemToEdit"));
    const { year, make, model, color, vin, licenseNo, licenseState, towDate } =
      data;

    if (modalType === "edit") {
      setFormData({
        year,
        make,
        model,
        color,
        vin,
        licenseNo,
        licenseState,
        towDate,
      });
    } else {
      setFormData({});
    }
  }, []);

  useEffect(() => {
    let data = JSON.stringify(formData);
    localStorage.setItem("itemToAdd", data);
  }, [formData]);
  return (
    <FormControl>
      <FormLabel>Year</FormLabel>
      <Input
        type="text"
        value={formData.year}
        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
      />
      <FormLabel>Make</FormLabel>
      <Input
        type="text"
        value={formData.make}
        onChange={(e) => setFormData({ ...formData, make: e.target.value })}
      />
      <FormLabel>Model</FormLabel>
      <Input
        type="text"
        value={formData.model}
        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
      />
      <FormLabel>Color</FormLabel>
      <Input
        type="text"
        value={formData.color}
        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
      />
      <FormLabel>VIN</FormLabel>
      <Input
        type="text"
        value={formData.vin}
        onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
      />
      <FormLabel>License Number</FormLabel>
      <Input
        type="text"
        value={formData.licenseNo}
        onChange={(e) =>
          setFormData({ ...formData, licenseNo: e.target.value })
        }
      />
      <FormLabel>License State</FormLabel>
      <Input
        type="text"
        value={formData.licenseState}
        onChange={(e) =>
          setFormData({ ...formData, licenseState: e.target.value })
        }
      />
      <FormLabel>Tow Date</FormLabel>
      <Input
        type="date"
        value={formData.towDate}
        onChange={(e) => setFormData({ ...formData, towDate: e.target.value })}
      />
    </FormControl>
  );
}

export default ModalForm;
