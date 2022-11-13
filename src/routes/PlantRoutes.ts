import { Router } from "express";
import PlantController from "../Controllers/PlantController";

const plantRouter = Router();

const plantController = new PlantController();

plantRouter.get("/", (req, res) => {
  plantController.getAll(req, res);
});
plantRouter.get("/:id",(req, res) => {
  plantController.getById(req, res);
})
plantRouter.put("/:id",(req,res)=>{
  plantController.updateOnePlant(req,res);
})
plantRouter.post("/", (req, res) => {
 plantController.createNewPlant(req,res);
 })
 plantRouter.delete("/:id", (req, res) =>
   plantController.deleteOnePlant(req, res)
 );
 
// plantRouter.get("/:id", (req, res) => {
//   plantController.getOnePlant(req, res);
// });









export default plantRouter;
