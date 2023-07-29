/**
 * StatusController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
  * @swagger
  * /api/v1/status:
  *   get:
  *     tags:
  *       - Status
  *     summary: This service will offer the Status
  *     responses:
  *      200:
  *        description: Status data retrived successfully
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  getAllStatus: (req, res) => {
    Status.find()
      .then((results) => {
        return res.ok({ data: results });
      }).catch((err) => {
        return res.serverError(err);
      });
  }

};
