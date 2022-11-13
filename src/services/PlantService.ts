

import AppDataSource from '../data-source';
import Plant from '../models/interfaces/Plant';


class PlantService {
    
     getAll (): Promise<void> {
console.log('PlantServices');
// A terme il y aura une requete vers la BDD qui peut prendre du temps donc asynchrone
        return AppDataSource.query('SELECT * from plant');
    }
    getById (id: number): Promise<Plant> {
        return AppDataSource.query(`SELECT plant from plant where plant.id =${id}`);
    }

    createNewPlant(newPlant:Plant) : Promise<Plant> {
return AppDataSource.query(`insert into plant (name,unitprice_ati,quantity,category,rating,url_picture) values ('${newPlant.name}',${newPlant.unitprice_ati},${newPlant.quantity},'${newPlant.category}',${newPlant.rating},'${newPlant.url_picture}');`)
    }

    updateById (id:number,changes:Plant): Promise<Plant> {
        return AppDataSource.query(`UPDATE plant set name='${changes.name}',unitprice_ati=${changes.unitprice_ati},quantity=${changes.quantity},category='${changes.category}',rating=${changes.rating},url_picture='${changes.url_picture}' where id=${id}`);
    }
    deleteOnePlant (id: number): Promise<void> {
        return AppDataSource.query(`DELETE FROM plant WHERE id=${id}`);
}}

export default PlantService;