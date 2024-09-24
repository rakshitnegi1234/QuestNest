const mongoose = require("mongoose");
const idata = require("./data.js");

const Listing = require("../Models/Listing.js");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Questnest');
}

main().then(()=>
{
    console.log(`connected  successfully`);
})
.catch(err => console.log(err));

const initDB = async()=>
{
    await Listing.deleteMany({});
    idata.data = idata.data.map((obj)=> ({...obj, owner:"66f05068af9808375e2aeac5"}));
    await Listing.insertMany(idata.data);  
}
initDB();
