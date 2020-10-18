const Worker = require('./worker.model');

class WorkerController {
  static async generate(data) {
    try {
      const worker = await Worker.create(data);
      return worker;
    } catch (e) {
      console.log(e)
    }
  }


}

module.exports = WorkerController; 