import Health from "../models/health.mjs";
import express from "express"
const router = express.Router()
import mongoose from 'mongoose'

router.post("/health", async (req, res) => {
    try {
        const health = await Health.create(req.body);
        res.status(200).json(health)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//get all health, or get health by zip
router.get("/health", async (req, res) => {
    try {
      // Retrieve health based on the ZIP code (if provided)
      const zip = req.query.zip;
      const health = zip ? await Health.find({ zip: zip }) : await Health.find();
  
      // Render the "health  page with the list of health 
      res.render("health", { health: health });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: "health document not available" });
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
  
  //get one college - send to showpage
  router.get("/college/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await College.findById(id)
      .then((result) => {
        console.log(result);
        res.render("showPage", { college: result });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  //delete a college item
  router.delete("/college/:id", (req, res) => {
    const id = req.params.id;
    College.findByIdAndDelete(id)
      .then((result) => {
        res.json({ redirect: "/college" });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  //update a college item
  router.patch("/college/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const college = await College.findOneAndUpdate(
        { _id: new ObjectId(id) },
        req.body,
        { new: true }
      );
      console.log(college);
  
      res.json({ college });
    } catch (error) {
      console.log(error);
    }
  });


export default router