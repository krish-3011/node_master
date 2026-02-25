import mongoose from "mongoose"

const db = mongoose.connect("mongodb://localhost:27017")
.then(() => console.log("db connected succesfully"))
.catch(err => {
    console.log(err)
})

export default db