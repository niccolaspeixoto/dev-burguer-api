import * as Yup from 'yup'

class ProductController {
  async store(req, res) {

    const schema = Yup.object({
        name: Yup.string().required(),
        price: Yup.number().required(),
        category: Yup.string().required()
    })

    try { //validando os dados
      schema.validateSync(req.body, { abortEarly: false, strict: true }); //validando o body com as informações certas do jeito que a model está esperando.
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    return res.status(201).json({ ok: true });
  }
}

export default new ProductController();
