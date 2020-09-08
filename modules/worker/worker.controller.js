const Worker = require('./worker.model');

class WorkerController {
  async generate(data) {
    try {
      const worker = await Worker.create(data);
      
      return worker;
    } catch (e) {
      return new Error("Что-то пошло не так. Попробуйте снова");
    }
  }
}

module.exports = WorkerController; 