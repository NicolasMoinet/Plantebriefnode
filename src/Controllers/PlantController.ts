import {Request,Response} from 'express';
// import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Any } from 'typeorm';
import PlantService from '../services/PlantService';
import Plant from '../models/interfaces/Plant';



class PlantController {
  
  // getById(req: Request<{ id: string; }, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) {
  //   throw new Error("Method not implemented.");
  // }
  private plantService = new PlantService();

  async getAll(req: Request, res: Response) {
    // console.log('PlanController')

    try {
      const plants = await this.plantService.getAll();
      res.send({ status: "ok", data: plants });
    } catch (error) {
      res.status(500).send({ status: "failed", message: error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;

    if (!paramId) {
      res.status(404).send({
        status: "failed",
        data: { error: "Parametres invalides" },
      });
      return;
    }
    try {
      const id = parseInt(paramId);
      const plant = await this.plantService.getById(id);
      res.send({ status: "ok", data: plant });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "Failed", data: { error: error?.message || error } });
    }


  }
  async createNewPlant(req:Request,res:Response): Promise<void>{
const newPlant: Plant={...req.body,
    };
    
    if (
      !newPlant.name ||
      newPlant.unitprice_ati === undefined ||
      newPlant.quantity === undefined ||
      newPlant.category === undefined ||
      newPlant.rating === undefined ||
      newPlant.url_picture===undefined
      ) {
      res.status(400).send({
        status: 'FAILED',
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'unitprice_ati', 'quantity','category','rating','url_picture'"
        },
      });
      return;
    }

    try {
      await this.plantService.createNewPlant(newPlant);
      res.status(201).send({
        status: 'OK',
        message: `New plant created`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async updateOnePlant(req: Request, res: Response): Promise<void> {
    const changes: Plant = {
      ...req.body,
    };
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    } else if (!changes.name || !changes.unitprice_ati || !changes.quantity|| !changes.category ||!changes.rating ||!changes.url_picture) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'unitprice_ati', 'quantity','categories','rating','url_picture'",
        },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
    await this.plantService.updateById(id, changes);
      res.status(201).send({
        status: "OK",
        message: `Plant with id ${id} updated`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  async deleteOnePlant(req: Request, res: Response): Promise<void> {
  const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.plantService.deleteOnePlant(id);
      res
        .status(200)
        .send({ status: 'OK', message: `Plant with id ${id} removed` });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  

}}



export default PlantController;