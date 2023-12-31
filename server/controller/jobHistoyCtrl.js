import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const jobHistory = await req.context.models.job_history.findAll();
    return res.send(jobHistory);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const jobHistory = await req.context.models.job_history.findOne({
      where: { employee_id: req.params.ids },
    });
    return res.send(jobHistory);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const jobHistory = await req.context.models.job_history.create({
        employee_id : req.body.employee_id,
        start_date : req.body.start_date,
        end_date: req.body.end_date,
        job_id: req.body.job_id,
        department_id: req.body.department_id
    });
    return res.send(jobHistory);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const jobHistory = await req.context.models.job_history.update(
      {
        employee_id : req.body.employee_id,
        start_date : req.body.start_date,
        end_date: req.body.end_date,
        job_id: req.body.job_id,
        department_id: req.body.department_id
      },
      { returning: true, where: { employee_id: req.params.id } }
    );
    return res.send(jobHistory);
  } catch (error) {
    return res.send(error)
  }
};

const deleted = async(req,res) => {
    try {
        const jobHistory = await req.context.models.job_history.destroy({
            where:{employee_id : req.params.id}
        })
        return res.send('delete '+jobHistory+' row')
    } catch (error) {
        return res.send(error)
    }
}

const querySQL = async(req,res) => {
    try {
        await sequelize.query('select * from job_history where employee_id = :id',
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
