/**
 * MyCityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
  * @swagger
  * /api/v1/mycity:
  *   get:
  *     tags:
  *       - MyCity
  *     summary: This service will offer the MyCity
  *     responses:
  *      200:
  *        description: MyCity data retrived successfully
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  getAllMyCity: (req, res) => {
    const limit = req.param('limit');
    const skip = req.param('skip');
    const startDate = req.param('startDate');
    const endDate = req.param('endDate');
    const price = req.param('price');
    const color = req.param('color');
    const city = req.param('city');
    const status = req.param('status');

    myCityService.sanitizeMyCityPayload({ startDate, endDate, price, color, city, status })
      .then((condition) => {
        return myCityService.getMyCities(condition, limit, skip);
      }).then((results) => {
        return res.ok({ data: results });
      }).catch((err) => {
        sails.log.error('Error occurred while getting my cities', err);
        return res.serverError(err);
      });
  },

  /**
  * @swagger
  * /api/v1/mycity/paginate:
  *   get:
  *     tags:
  *       - MyCity
  *     summary: This service will offer the MyCity
  *     responses:
  *      200:
  *        description: MyCity data retrived with pagination successfully
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  getAllMyCityPaginated: (req, res) => {
    const page = req.param('page');
    const limit = req.param('limit');
    const startDate = req.param('startDate');
    const endDate = req.param('endDate');
    const price = req.param('price');
    const color = req.param('color');
    const city = req.param('city');
    const status = req.param('status');
    const sort = req.param('sort');

    myCityService.sanitizeMyCityPayload({ startDate, endDate, price, color, city, status })
      .then((condition) => {
        return myCityService.getMyCitiesPaginated(condition, page, limit, sort);
      }).then((results) => {
        return res.ok({ data: results });
      }).catch((err) => {
        sails.log.error('Error occurred while getting my cities paginated', err);
        return res.serverError(err);
      });
  },

  /**
  * @swagger
  * /api/v1/mycity:
  *   post:
  *     tags:
  *       - MyCity
  *     summary: This service will create the MyCity
  *     responses:
  *      201:
  *        description: MyCity created successfully
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  createMyCity: (req, res) => {
    const data = req.body;

    myCityService.sanitizeMyCityPayload(data)
      .then((data) => {
        return  MyCity.create(data);
      }).then((results) => {
        return res.created({ data: results });
      }).catch((err) => {
        sails.log.error('Error occurred while creating my city', err);
        return res.serverError(err);
      });
  },

  /**
  * @swagger
  * /api/v1/mycity/{id}:
  *   get:
  *     tags:
  *       - MyCity
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: MyCity Id
  *     summary: This service will retrive the MyCity
  *     responses:
  *      200:
  *        description: MyCity retrived successfully
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  getMyCity: (req, res) => {
    const id = req.param('id');

    MyCity.getById(id)
      .then((result) => {
        return res.ok({ data: result });
      }).catch((err) => {
        sails.log.error('Error occurred while getting my city', err);
        return res.serverError(err);
      });
  },

  /**
  * @swagger
  * /api/v1/mycity/{id}:
  *   put:
  *     tags:
  *       - MyCity
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: MyCity Id
  *     summary: This service will update the MyCity
  *     responses:
  *      200:
  *        description: MyCity updated successfully
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  updateMyCity: (req, res) => {
    const id = req.param('id');
    const data = req.body;

    return MyCity.getById(id)
      .then(() => {
        return myCityService.sanitizeMyCityPayload(data);
      }).then((data) => {
        return MyCity.update(id, data);
      }).then((results) => {
        return res.ok({ data: results });
      }).catch((err) => {
        sails.log.error('Error occurred while updating my city', err);
        return res.serverError(err);
      });
  },

  /**
  * @swagger
  * /api/v1/mycity/{id}:
  *   delete:
  *     tags:
  *       - MyCity
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: MyCity Id
  *     summary: This service will delete the MyCity
  *     responses:
  *      200:
  *        description: MyCity deleted successfully
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  deleteMyCity: (req, res) => {
    const id = req.param('id');

    MyCity.destroy(id)
      .then((result) => {
        return res.ok({ data: result });
      }).catch((err) => {
        sails.log.error('Error occurred while deleting my city', err);
        return res.serverError(err);
      });
  }

};
