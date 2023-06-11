import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const department = await req.context.models.departments.findAll();
    return res.send(department);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const department = await req.context.models.departments.findOne({
      where: { department_id: req.params.ids },
    });
    return res.send(department);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const department = await req.context.models.departments.create({
        department_name : req.body.country_name,
        manager_id : req.body.manager_id,
        location_id: req.body.location_id
    });
    return res.send(department);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const department = await req.context.models.departments.update(
      {
        department_name : req.body.country_name,
        manager_id : req.body.manager_id,
        location_id: req.body.location_id
      },
      { returning: true, where: { department_id: req.params.id } }
    );
    return res.send(department);
  } catch (error) {
    return res.send(error)
  }
};

const deleted = async(req,res) => {
    try {
        const department = await req.context.models.departments.destroy({
            where:{department_id : req.params.id}
        })
        return res.send('delete '+department+' row')
    } catch (error) {
        return res.send(error)
    }
}

const querySQL = async(req,res) => {
    try {
        await sequelize.query('select * from departments where department_id = :id',
        {replacements : {id : req.params.id},type : sequelize.QueryTypes.SELECT}
        ).then(result => {
            return res.send(result)
        })
    } catch (error) {
        return res.send(error)
    }
}
export default {
  findAll,
  findOne,
  create,
  update,
  deleted,
  querySQL
};
