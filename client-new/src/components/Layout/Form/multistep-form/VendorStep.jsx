import React from "react";
import { getVendorList } from "../../../../Services/vendorService";
import Formfield from "../FormField/Formfield";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

function VendorStep() {
  const roleOptions = ["user", "vendor"];
  const { watch } = useFormContext();
  const role = watch("role");
  useEffect(() => {
    const fetchVendorList = async () => {
      const vendors = await getVendorList();
      setVendorOptions(vendors);
    };
    fetchVendorList();
  }, []);
  return (
    <>
      <Formfield
        fieldName="role"
        label="Choose your role"
        iconClass="fas fa-user"
        type="select"
        options={roleOptions}
      />

      {role === "vendor" && (
        <Formfield
          fieldName="vendor"
          label="Choose your vendor"
          iconClass="fas fa-store"
          type="select"
          options={vendorOptions}
        />
      )}
    </>
  );
}

export default VendorStep;
