const VendorService = require("../services/admin/vendor.service");
const vendorValidation = require("../validations/vendor.validations");
const path = require("path");

exports.createVendor = async (req, res) => {
  const vendorData = {
    ...req.body,
    created_by: req.user._id,
    logo: req.file.filename,
  };
  const { error, value } = vendorValidation.validateCreatedVendor(vendorData);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  const vendor = await VendorService.createVendor(vendorData);
  res.status(200).json({ message: "vendor successfully created", vendor: vendor.name });
};

exports.updateVendor = async (req, res) => {
  const vendorData = { ...req.body, logo: req.file.filename };
  const { error, value } = vendorValidation.validateUpdatedVendor(vendorData);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  const vendor = await VendorService.updateVendor(vendorData);
  res.status(200).json({ message: "vendor successfully created", vendor });
};
exports.deleteVendor = async (req, res) => {
  const deleted = await VendorService.deleteVendor(req.params.vendorId);
  res
    .status(deleted ? 200 : 400)
    .json(
      deleted
        ? "Vendor successfully deleted"
        : `Vendor with id ${req.params.vendorId} could not be deleted`
    );
};

exports.getAllVendors = async (req, res) => {
  const vendors = await VendorService.getAllVendors();
  res.status(200).json(vendors);
};
exports.getVendorsImage = async (req, res) => {
  const logoUrl = await VendorService.getVendorsLogo();
  const logoPath = path.resolve("src", "images", logoUrl);
  res.sendFile(logoPath);
};
