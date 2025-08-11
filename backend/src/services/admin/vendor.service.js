const vendor = require("../../model/vendor");
const Event = require("../../model/event");

const createVendor = async (vendorData) => {
  if (await vendor.findOne({ name: vendorData.name })) {
    throw new Error("Vendor with the same name exists ");
  } else {
    const vendorDb = new vendor(vendorData);
    vendorDb
      .save()
      .then(() => {
        console.log("vendor created");
      })
      .catch((err) => {
        console.log(err);
      });
    return vendorDb;
  }
};

const updateVendor = async (vendorId, vendorData) => {
  // find vendor to be updated
  const vendorDb = vendor.findById(vendorId);

  if (!vendorDb) {
    throw new Error(` vendor with id ${vendorId} not found`);
  }
  vendor.findOneAndUpdate(
    { _id: vendorId },
    { $set: vendorData },
    { new: true }
  );
};

const deleteVendor = async (vendorId) => {
  const deletedVendor = await vendor.deleteMany({ _id: vendorId });
  return deletedVendor.deletedCount > 0;
};

const getAllVendors = async () => {
  return await vendor.find({});
};

// get all events of a vendor
const getVendorEvents = async (vendorId) => {
  return await Event.find({
    vendor: vendorId,
  });
};

getVendorsLogo = async (vendorId) =>{
  return await vendor.findById(vendorId).select('logo');
}
module.exports = {
  createVendor,
  getAllVendors,
  getVendorEvents,
  updateVendor,
  deleteVendor,
  getVendorsLogo
};
