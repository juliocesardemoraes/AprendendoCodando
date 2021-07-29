import Class from "../../models/Class";
import dbConnect from "../../util/mongodb";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const classObject = await Class.findById(id);

        if (!classObject) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: classObject });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const classObject = await Class.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        if (!classObject) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: classObject });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const classObjectDeleted = await Class.deleteOne({ _id: id });
        if (!classObjectDeleted) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: classObjectDeleted });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
