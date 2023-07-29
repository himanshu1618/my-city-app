/**
 * CityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
  * @swagger
  * /api/v1/city:
  *   get:
  *     tags:
  *       - City
  *     summary: This service will offer the City
  *     responses:
  *      200:
  *        description: City data retrived successfully
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  getAllCity: (req, res) => {
    City.find()
      .then((results) => {
        return res.ok({ data: results });
      }).catch((err) => {
        return res.serverError(err);
      });
  }

};
