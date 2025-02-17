const carModel = require('../models/carSchema');
module.exports.getAllCars = async (req,res)=>{
        try {
            const carList = await carModel.find();
            if (!carList || carList.length ===0 ){
                throw new Error("Aucune voiture trouvé")
            }

            res.status(200).json(carList);
        } catch (error) {
            res.status(500).json({message : error.message});
        }
}
module.exports.getCarById = async (req,res)=>{
    try {
        const { id } = req.params
        const car = await carModel.findById(id);
        if (!car || car.length ===0 ){
            throw new Error(" voiture introuvable")
        }

        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}
module.exports.deleteCarById = async (req,res)=>{
    try {
        const { id } = req.params
        const carById = await carModel.findByIdAndDelete(id);
        if (!carById || carById ===0 ){
            throw new Error(" l'identifiant du véhicule soit introuvable ou incorrect ")
        }
        res.status(200).json(carById);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}
module.exports.AddCar = async (req,res)=>{
    try {
        const { model , prix , matricule, kilométrage } = req.body;

        if (!model & prix & !matricule & !kilométrage ){
            throw new Error("erreur data ")
        }
        const car = await carModel.create
        ({ model,prix,matricule,kilométrage});
        
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

module.exports.UpdateCar = async (req,res)=>{
    try {
        const id  = req.params.id
        const { model , prix , matricule, kilométrage } = req.body;

        const carById = await carModel.findById(id);

        if (!carById){
            throw new Error(" voiture introuvable")
        }
        if (!model & prix & !matricule & !kilométrage ){
            throw new Error("erreur data ")
        }

        const updated = await carModel.findByIdAndUpdate(id,{
            $set: {model,prix,matricule,kilométrage},
    })
        
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}