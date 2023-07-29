/**
 * HealthcheckController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
  * @swagger
  * /api/v1/healthcheck:
  *   get:
  *     tags:
  *       - Healthcheck
  *     summary: This service will offer the healthcheck
  *     responses:
  *      200:
  *        description: Health check perfromed successfully
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  healthCheck: function(req, res) {
    return res.ok({
      message: 'Healthy enough...'
    });
  }

};
