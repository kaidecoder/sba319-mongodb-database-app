import express from "express"
const router = express.Router();
import College from "../models/college.mjs"


router.get("/help", (req, res) => {
  res.render("getAJob")
})
//create a new college  in the formNOTE: get?
router.get("/create", (req, res) => {
    res.render("createResource");
  });

//add a new college
router.post("/college", async (req, res) => {
    try {
        const college = await College.create(req.body);
        res.status(200).json(college)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})   

//get all colleges, or get college by zip
router.get("/college", async (req, res) => {
    try {
      // Retrieve college based on the ZIP code (if provided)
      const zip = req.query.zip;
      const colleges = zip ? await College.find({ zip: zip }) : await College.find();
  
      // Render the "college" page with the list of colleges
      res.render("colleges", { colleges: colleges });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: "college document not available" });
    }
  });

  //get one college - send to showpage
router.get("/college/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await College.findById(id)
      .then((result) => {
        console.log(result);
        res.render("showCollege", { college: result });
      })
      .catch((error) => {
        console.log(error);
      });
  });

export default router