import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.jobHistoyCtrl.findAll)
router.get('/:ids',indexCtrl.jobHistoyCtrl.findOne)
router.post('/',indexCtrl.jobHistoyCtrl.create)
router.put('/:id',indexCtrl.jobHistoyCtrl.update)
router.delete('/:id',indexCtrl.jobHistoyCtrl.deleted)
router.get('/query/:id',indexCtrl.jobHistoyCtrl.querySQL)

export default router